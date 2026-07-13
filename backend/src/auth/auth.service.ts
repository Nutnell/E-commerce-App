import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';

const JWT_SECRET = 'ecommerce-app-secret-key-12345';
const HASH_SALT = 'ecommerce-salt-987';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  hashPassword(password: string): string {
    return crypto.createHmac('sha256', HASH_SALT).update(password).digest('hex');
  }

  generateToken(payload: { id: string; email: string }): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
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
      return JSON.parse(decodedBody);
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
    user.passwordHash = this.hashPassword(password);

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

    const expectedHash = this.hashPassword(password);
    if (user.passwordHash !== expectedHash) {
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
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    // Generate simulated reset password token and save
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    await this.usersRepository.save(user);

    return {
      message: 'Reset password link has been sent to your email',
      resetToken, // Return reset token so client can display or verify easily
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
    };
  }

  async loginWithGoogle(credential: string) {
    if (!credential) {
      throw new BadRequestException('Credential token is required');
    }
    try {
      const parts = credential.split('.');
      if (parts.length < 2) {
        throw new BadRequestException('Invalid credential token format');
      }
      const decodedBody = Buffer.from(parts[1], 'base64url').toString('utf8');
      const payload = JSON.parse(decodedBody);
      
      const email = payload.email;
      const name = payload.name || email.split('@')[0];
      
      if (!email) {
        throw new BadRequestException('Email not found in credential payload');
      }

      let user = await this.usersRepository.findOne({ where: { email } });
      if (!user) {
        // Sign up new Google user
        user = new User();
        user.name = name;
        user.email = email;
        // Placeholder password for Google users
        user.passwordHash = this.hashPassword(`google-oauth-placeholder-${crypto.randomBytes(8).toString('hex')}`);
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
