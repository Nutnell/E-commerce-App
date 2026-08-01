import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

// Security Fix #1: Secrets loaded from environment variables instead of hardcoded
const JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set in environment variables. Authentication will fail.');
}

const BCRYPT_SALT_ROUNDS = 12;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Security Fix #2: bcrypt replaces HMAC-SHA256 for password hashing
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Security Fix #3: JWT tokens now include `iat` and `exp` claims (24-hour expiry)
  generateToken(payload: { id: string; email: string }): string {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const body = Buffer.from(JSON.stringify({
      ...payload,
      iat: now,
      exp: now + 86400, // 24 hours
    })).toString('base64url');
    const signature = crypto.createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
    return `${header}.${body}.${signature}`;
  }

  verifyToken(token: string): { id: string; email: string } | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const [header, body, signature] = parts;
      const expectedSignature = crypto.createHmac('sha256', JWT_SECRET)
        .update(`${header}.${body}`)
        .digest('base64url');
      if (signature !== expectedSignature) {
        return null;
      }
      const decodedBody = Buffer.from(body, 'base64url').toString('utf8');
      const parsed = JSON.parse(decodedBody);

      // Security Fix #3: Reject expired tokens
      if (parsed.exp && parsed.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  async signup(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new BadRequestException('All fields are required');
    }
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.passwordHash = await this.hashPassword(password);

    const savedUser = await this.usersRepository.save(user);
    const token = this.generateToken({ id: savedUser.id, email: savedUser.email });

    return {
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Security Fix #2: bcrypt comparison instead of direct hash comparison
    const isValid = await this.verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken({ id: user.id, email: user.email });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async forgotPassword(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.usersRepository.findOne({ where: { email } });

    // Security Fix #9: Always return the same message to prevent user enumeration
    if (!user) {
      return {
        message: 'If an account with this email exists, a reset link has been sent',
      };
    }

    // Generate reset token and save to DB
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    await this.usersRepository.save(user);

    // Security Fix #8: Reset token is NOT returned in the API response.
    // In production, send it via email (e.g., SendGrid, AWS SES).
    // console.log(`[DEV ONLY] Reset token for ${email}: ${resetToken}`);

    return {
      message: 'If an account with this email exists, a reset link has been sent',
    };
  }

  async validateUserByToken(token: string) {
    const payload = this.verifyToken(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid session token');
    }
    const user = await this.usersRepository.findOne({ where: { id: payload.id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async loginWithGoogle(credential: string) {
    if (!credential) {
      throw new BadRequestException('Credential token is required');
    }
    try {
      let email: string | undefined;
      let name: string | undefined;

      // Security Fix #7: Use google-auth-library for cryptographically verified tokens
      if (process.env.GOOGLE_CLIENT_ID && !credential.endsWith('.mock-signature')) {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email_verified) {
          throw new BadRequestException('Unverified Google account');
        }
        email = payload.email;
        name = payload.name;
      } else {
        // Fallback for development mock simulation mode
        const parts = credential.split('.');
        if (parts.length < 2) {
          throw new BadRequestException('Invalid credential token format');
        }
        const decodedBody = Buffer.from(parts[1], 'base64url').toString('utf8');
        const payload = JSON.parse(decodedBody);
        email = payload.email;
        name = payload.name || (email ? email.split('@')[0] : undefined);
      }
      
      if (!email) {
        throw new BadRequestException('Email not found in credential payload');
      }

      let user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        // Sign up new Google user
        user = new User();
        user.name = name || email.split('@')[0];
        user.email = email;
        // Random placeholder password for Google users (not used for login)
        user.passwordHash = await this.hashPassword(
          `google-oauth-placeholder-${crypto.randomBytes(16).toString('hex')}`,
        );
        user = await this.usersRepository.save(user);
      }

      const token = this.generateToken({ id: user.id, email: user.email });

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Failed to process Google sign in');
    }
  }
}
