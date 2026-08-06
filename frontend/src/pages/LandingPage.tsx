import React from 'react';
import { ArrowRight, Star, TrendingUp, Zap, Award } from 'lucide-react';

const landingStyles = {
  page: {
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
    color: '#ffffff',
    overflowX: 'hidden',
    minHeight: '100vh',
    paddingBottom: '2rem',
  } as React.CSSProperties,
  nav: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
    background: 'rgba(15, 15, 15, 0.5)',
    borderBottom: '1px solid #333333',
    padding: '1rem 0',
  } as React.CSSProperties,
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    cursor: 'pointer',
  } as React.CSSProperties,
  logoIcon: {
    width: '2rem',
    height: '2rem',
    background: 'linear-gradient(135deg, #DB3022, #ff5544)',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#ffffff',
  } as React.CSSProperties,
  btnPrimary: {
    padding: '0.75rem 1.5rem',
    background: '#DB3022',
    color: '#ffffff',
    fontWeight: 600,
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  } as React.CSSProperties,
  hero: {
    position: 'relative',
    padding: '4rem 0',
    overflow: 'hidden',
  } as React.CSSProperties,
  heroContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    alignItems: 'center',
  } as React.CSSProperties,
  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
  } as React.CSSProperties,
  badge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: 'rgba(219, 48, 34, 0.1)',
    border: '1px solid rgba(219, 48, 34, 0.3)',
    borderRadius: '9999px',
    width: 'fit-content',
  } as React.CSSProperties,
  badgeText: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#DB3022',
    margin: 0,
  } as React.CSSProperties,
  heroDescription: {
    fontSize: '1.125rem',
    color: '#b0b0b0',
    lineHeight: 1.6,
    maxWidth: '500px',
    margin: 0,
  } as React.CSSProperties,
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #333333',
  } as React.CSSProperties,
  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  } as React.CSSProperties,
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#DB3022',
    margin: 0,
  } as React.CSSProperties,
  statLabel: {
    fontSize: '0.875rem',
    color: '#b0b0b0',
    margin: 0,
  } as React.CSSProperties,
  features: {
    padding: '4rem 0',
    background: 'rgba(26, 26, 26, 0.5)',
    borderTop: '1px solid #333333',
    borderBottom: '1px solid #333333',
  } as React.CSSProperties,
  featuresContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  } as React.CSSProperties,
  featuresHeader: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  } as React.CSSProperties,
  featureSectionTitle: {
    fontSize: 'clamp(2rem, 5vw, 2.75rem)',
    fontWeight: 800,
    margin: '0 0 0.5rem 0',
  } as React.CSSProperties,
  featuresSectionSubtitle: {
    fontSize: '1.125rem',
    color: '#b0b0b0',
    margin: 0,
  } as React.CSSProperties,
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  } as React.CSSProperties,
  featureCard: {
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #333333',
    borderRadius: '1rem',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
  featureIcon: {
    width: '3rem',
    height: '3rem',
    background: 'linear-gradient(135deg, #DB3022, #ff5544)',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  } as React.CSSProperties,
  featureCardH3: {
    fontSize: '1.125rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0',
    color: '#ffffff',
  } as React.CSSProperties,
  featureCardP: {
    fontSize: '0.925rem',
    color: '#b0b0b0',
    margin: 0,
    lineHeight: 1.5,
  } as React.CSSProperties,
  products: {
    padding: '4rem 0',
  } as React.CSSProperties,
  productsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  } as React.CSSProperties,
  productsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  } as React.CSSProperties,
  productsTitle: {
    fontSize: 'clamp(2rem, 5vw, 2.75rem)',
    fontWeight: 800,
    margin: '0 0 0.5rem 0',
  } as React.CSSProperties,
  productsSubtitle: {
    fontSize: '1rem',
    color: '#b0b0b0',
    margin: 0,
  } as React.CSSProperties,
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  } as React.CSSProperties,
  productCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid #333333',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,
  productImage: {
    position: 'relative' as const,
    width: '100%',
    height: '180px',
    background: 'linear-gradient(135deg, rgba(219, 48, 34, 0.1), rgba(219, 48, 34, 0.05))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as React.CSSProperties,
  productEmoji: {
    fontSize: '3rem',
    transition: 'transform 0.3s ease',
  } as React.CSSProperties,
  productBadge: {
    position: 'absolute' as const,
    top: '0.75rem',
    right: '0.75rem',
    background: '#DB3022',
    color: '#ffffff',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 700,
  } as React.CSSProperties,
  productInfo: {
    padding: '1rem',
  } as React.CSSProperties,
  productInfoH3: {
    fontWeight: 700,
    margin: '0 0 0.25rem 0',
    fontSize: '0.95rem',
    color: '#ffffff',
  } as React.CSSProperties,
  productCategory: {
    fontSize: '0.8rem',
    color: '#b0b0b0',
    margin: '0 0 0.75rem 0',
  } as React.CSSProperties,
  productFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  productPrice: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#DB3022',
  } as React.CSSProperties,
  productRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.85rem',
    color: '#b0b0b0',
  } as React.CSSProperties,
  cta: {
    padding: '4rem 0',
    borderTop: '1px solid #333333',
  } as React.CSSProperties,
  ctaContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 1.5rem',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  } as React.CSSProperties,
  ctaTitle: {
    fontSize: 'clamp(2rem, 5vw, 2.75rem)',
    fontWeight: 800,
    margin: 0,
  } as React.CSSProperties,
  ctaDescription: {
    fontSize: '1.125rem',
    color: '#b0b0b0',
    margin: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,
  footer: {
    padding: '2rem 1.5rem',
    background: 'rgba(15, 15, 15, 0.8)',
    borderTop: '1px solid #333333',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: '0.925rem',
    color: '#b0b0b0',
    margin: 0,
  } as React.CSSProperties,
} as const;

const features = [
  {
    icon: TrendingUp,
    title: 'Curated Selection',
    description: 'Handpicked products from trusted brands and suppliers',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Quick checkout and fast shipping to your doorstep',
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: '100% authentic products with guarantee',
  },
  {
    icon: Star,
    title: 'Customer Love',
    description: 'Trusted by thousands with 4.9★ ratings',
  },
];

const trendingProducts = [
  { name: 'Elegant Watch', category: 'Accessories', price: 129, rating: 4.8, emoji: '⌚', badge: 'Popular' },
  { name: 'Premium Headphones', category: 'Audio', price: 199, rating: 4.9, emoji: '🎧', badge: 'New' },
  { name: 'Fashion Jacket', category: 'Clothing', price: 159, rating: 4.7, emoji: '🧥' },
  { name: 'Smart Sunglasses', category: 'Eyewear', price: 149, rating: 4.8, emoji: '😎', badge: 'Sale' },
];

export default function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div style={landingStyles.page}>
      {/* Navigation */}
      <nav style={landingStyles.nav}>
        <div style={landingStyles.navContent}>
          <div style={landingStyles.logo}>
            <div style={landingStyles.logoIcon}><span>N</span></div>
            <span>Nutnell</span>
          </div>
          <button style={landingStyles.btnPrimary} onClick={() => onNavigate('shop')}>
            Enter Store
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={landingStyles.hero}>
        <div style={landingStyles.heroContainer}>
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={landingStyles.badge}><p style={landingStyles.badgeText}>Discover Premium Shopping</p></div>
              <h1 style={landingStyles.heroTitle}>
                Your Premium <span style={{ background: 'linear-gradient(135deg, #DB3022, #ff5544)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Marketplace</span>
              </h1>
              <p style={landingStyles.heroDescription}>
                Experience curated products with exceptional quality, seamless checkout, and personalized recommendations all in one elegant platform.
              </p>
            </div>

            <div style={landingStyles.heroButtons}>
              <button style={landingStyles.btnPrimary} onClick={() => onNavigate('shop')}>
                Shop Now <ArrowRight size={20} />
              </button>
              <button style={{ ...landingStyles.btnPrimary, background: 'transparent', border: '2px solid rgba(219, 48, 34, 0.5)', color: '#ffffff' }}>
                Learn More
              </button>
            </div>

            <div style={landingStyles.stats}>
              <div style={landingStyles.stat}><p style={landingStyles.statValue}>10K+</p><p style={landingStyles.statLabel}>Products</p></div>
              <div style={landingStyles.stat}><p style={landingStyles.statValue}>50K+</p><p style={landingStyles.statLabel}>Customers</p></div>
              <div style={landingStyles.stat}><p style={landingStyles.statValue}>4.9★</p><p style={landingStyles.statLabel}>Ratings</p></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #333333', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', marginTop: i % 2 ? '2rem' : 0 }}>
                <div style={{ width: '100%', height: '120px', background: 'linear-gradient(135deg, rgba(219, 48, 34, 0.2), rgba(219, 48, 34, 0.05))', borderRadius: '0.5rem', marginBottom: '0.75rem' }}></div>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>{['Premium Selection', 'Fast Delivery', 'Best Prices', 'Secure Payment'][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={landingStyles.features}>
        <div style={landingStyles.featuresContainer}>
          <div style={landingStyles.featuresHeader}>
            <h2 style={landingStyles.featureSectionTitle}>Why Choose Nutnell?</h2>
            <p style={landingStyles.featuresSectionSubtitle}>Experience shopping like never before</p>
          </div>
          <div style={landingStyles.featuresGrid}>
            {features.map((feature, idx) => (
              <div key={idx} style={landingStyles.featureCard}>
                <div style={landingStyles.featureIcon}><feature.icon size={24} color="#ffffff" /></div>
                <h3 style={landingStyles.featureCardH3}>{feature.title}</h3>
                <p style={landingStyles.featureCardP}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={landingStyles.products}>
        <div style={landingStyles.productsContainer}>
          <div style={landingStyles.productsHeader}>
            <div>
              <h2 style={landingStyles.productsTitle}>Trending Now</h2>
              <p style={landingStyles.productsSubtitle}>Discover our most popular items</p>
            </div>
          </div>
          <div style={landingStyles.productsGrid}>
            {trendingProducts.map((product, idx) => (
              <div key={idx} style={landingStyles.productCard}>
                <div style={landingStyles.productImage}>
                  <div style={landingStyles.productEmoji}>{product.emoji}</div>
                  {product.badge && <div style={landingStyles.productBadge}>{product.badge}</div>}
                </div>
                <div style={landingStyles.productInfo}>
                  <h3 style={landingStyles.productInfoH3}>{product.name}</h3>
                  <p style={landingStyles.productCategory}>{product.category}</p>
                  <div style={landingStyles.productFooter}>
                    <span style={landingStyles.productPrice}>${product.price}</span>
                    <div style={landingStyles.productRating}><Star size={16} fill="#DB3022" /><span>{product.rating}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={landingStyles.cta}>
        <div style={landingStyles.ctaContainer}>
          <h2 style={landingStyles.ctaTitle}>Ready to Shop?</h2>
          <p style={landingStyles.ctaDescription}>Join thousands of satisfied customers and start your shopping journey today</p>
          <button style={landingStyles.btnPrimary} onClick={() => onNavigate('shop')}>
            Enter the Store <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={landingStyles.footer}>
        <p style={landingStyles.footerText}>&copy; 2024 Nutnell. All rights reserved. | Premium Shopping Experience</p>
      </footer>
    </div>
  );
}
