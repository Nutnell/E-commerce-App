import React, { useState } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';

interface LandingPageProps {
  onEnterStore: () => void;
}

export default function LandingPage({ onEnterStore }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => setEmail(''), 2000);
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-brand">
          <span className="brand-text">Luxe Studio</span>
        </div>
        <div className="nav-actions">
          <button className="nav-button" onClick={onEnterStore}>
            Browse Store
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <p className="hero-subtitle">Curated Collection</p>
            <h1 className="hero-heading">
              Discover Timeless<br />Elegance
            </h1>
            <p className="hero-description">
              Handpicked premium products for the discerning customer. Quality, craft, and sophistication in every item.
            </p>
            <button 
              className="hero-cta-button" 
              onClick={onEnterStore}
            >
              Explore Collection
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="hero-visual">
            <div className="visual-accent accent-1"></div>
            <div className="visual-accent accent-2"></div>
            <div className="visual-accent accent-3"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Check size={28} />
            </div>
            <h3 className="feature-title">Curated Selection</h3>
            <p className="feature-description">
              Every item is carefully selected for quality and design
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Star size={28} />
            </div>
            <h3 className="feature-title">Premium Quality</h3>
            <p className="feature-description">
              Sourced from the finest brands and artisans worldwide
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ArrowRight size={28} />
            </div>
            <h3 className="feature-title">Seamless Shopping</h3>
            <p className="feature-description">
              Effortless browsing and checkout for the modern customer
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="landing-testimonials">
        <h2 className="section-heading">What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-filled" />
              ))}
            </div>
            <p className="testimonial-text">
              &quot;The attention to detail is remarkable. Every purchase has been exceptional.&quot;
            </p>
            <p className="testimonial-author">— Alexandra M.</p>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-filled" />
              ))}
            </div>
            <p className="testimonial-text">
              &quot;A curated collection that truly understands luxury and sophistication.&quot;
            </p>
            <p className="testimonial-author">— James R.</p>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-filled" />
              ))}
            </div>
            <p className="testimonial-text">
              &quot;Shopping here feels like an experience, not just a transaction.&quot;
            </p>
            <p className="testimonial-author">— Sarah T.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="cta-content">
          <h2 className="cta-heading">Ready to Explore?</h2>
          <p className="cta-description">
            Step into our carefully curated world of premium products
          </p>
          <button 
            className="cta-button" 
            onClick={onEnterStore}
          >
            Enter Store
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="landing-newsletter">
        <div className="newsletter-content">
          <h2 className="newsletter-heading">Stay in the Loop</h2>
          <p className="newsletter-description">
            Get updates on new collections and exclusive offers
          </p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button 
                type="submit" 
                className={`newsletter-submit ${emailSubmitted ? 'submitted' : ''}`}
              >
                {emailSubmitted ? (
                  <Check size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </div>
          </form>
          {emailSubmitted && (
            <p className="success-message">Thanks for subscribing!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p className="footer-text">&copy; 2024 Luxe Studio. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
