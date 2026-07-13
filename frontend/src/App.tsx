import React, { useState, useEffect, useRef } from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Star,
  ChevronLeft,
  Sun,
  Moon,
  Check,
  X,
  ArrowRight
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  isNew: boolean;
  isSale: boolean;
  category: string;
}

const MOCK_PRODUCTS: Product[] = [
  // ---- Sale / Summer Sale Products ----
  {
    id: 1,
    name: 'Evening Dress',
    brand: 'Dorothy Perkins',
    price: 12.0,
    originalPrice: 15.0,
    discountPercent: 20,
    rating: 5.0,
    ratingCount: 10,
    imageUrl: '/assets/evening_dress_product.png',
    isNew: false,
    isSale: true,
    category: 'dresses',
  },
  {
    id: 2,
    name: 'Sport Dress',
    brand: 'Sitlly',
    price: 19.0,
    originalPrice: 22.0,
    discountPercent: 15,
    rating: 5.0,
    ratingCount: 10,
    imageUrl: '/assets/sport_dress_product.png',
    isNew: false,
    isSale: true,
    category: 'dresses',
  },
  {
    id: 5,
    name: 'Denim Jacket',
    brand: 'Mango',
    price: 29.0,
    originalPrice: 45.0,
    discountPercent: 35,
    rating: 4.5,
    ratingCount: 18,
    imageUrl: '/assets/product_denim_jacket.png',
    isNew: false,
    isSale: true,
    category: 'jackets',
  },
  {
    id: 6,
    name: 'Wrap Dress',
    brand: 'H&M',
    price: 24.0,
    originalPrice: 38.0,
    discountPercent: 37,
    rating: 4.0,
    ratingCount: 22,
    imageUrl: '/assets/product_wrap_dress.png',
    isNew: false,
    isSale: true,
    category: 'dresses',
  },
  {
    id: 7,
    name: 'Leather Bag',
    brand: 'Zara',
    price: 35.0,
    originalPrice: 55.0,
    discountPercent: 36,
    rating: 4.5,
    ratingCount: 31,
    imageUrl: '/assets/product_leather_bag.png',
    isNew: false,
    isSale: true,
    category: 'accessories',
  },
  {
    id: 8,
    name: 'Platform Sneakers',
    brand: 'Nike',
    price: 59.0,
    originalPrice: 89.0,
    discountPercent: 34,
    rating: 5.0,
    ratingCount: 45,
    imageUrl: '/assets/product_sneakers.png',
    isNew: false,
    isSale: true,
    category: 'shoes',
  },
  // ---- New / Trending Products ----
  {
    id: 3,
    name: 'Striped Top',
    brand: 'Dorothy Perkins',
    price: 15.0,
    rating: 4.5,
    ratingCount: 5,
    imageUrl: '/assets/new_product_1.png',
    isNew: true,
    isSale: false,
    category: 'tops',
  },
  {
    id: 4,
    name: 'White T-Shirt',
    brand: 'Sitlly',
    price: 12.0,
    rating: 4.0,
    ratingCount: 3,
    imageUrl: '/assets/new_product_2.png',
    isNew: true,
    isSale: false,
    category: 'tops',
  },
  {
    id: 9,
    name: 'Summer Blouse',
    brand: 'Zara',
    price: 22.0,
    rating: 4.5,
    ratingCount: 14,
    imageUrl: '/assets/product_summer_blouse.png',
    isNew: true,
    isSale: false,
    category: 'tops',
  },
  {
    id: 10,
    name: 'Maxi Skirt',
    brand: 'Mango',
    price: 28.0,
    rating: 4.0,
    ratingCount: 8,
    imageUrl: '/assets/product_maxi_skirt.png',
    isNew: true,
    isSale: false,
    category: 'skirts',
  },
  {
    id: 11,
    name: 'Linen Pants',
    brand: 'H&M',
    price: 32.0,
    rating: 4.5,
    ratingCount: 19,
    imageUrl: '/assets/product_linen_pants.png',
    isNew: true,
    isSale: false,
    category: 'pants',
  },
  {
    id: 12,
    name: 'Knit Sweater',
    brand: 'Dorothy Perkins',
    price: 26.0,
    rating: 5.0,
    ratingCount: 12,
    imageUrl: '/assets/product_knit_sweater.png',
    isNew: true,
    isSale: false,
    category: 'sweaters',
  },
];

const SLIDE_LABELS = ['Trending', 'Summer Sale', 'New Collection'];

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'bag' | 'favorites' | 'profile'>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // Authentication State
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot_password'>('login');

  // Form inputs
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');

  // Form error and UI feedback states
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recover user profile session on load/token change
  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [token]);
  
  // Viewport width tracking for responsive slider (3-2-1 layout)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 769;
  const isTablet = viewportWidth >= 769 && viewportWidth < 1024;
  const isDesktopView = viewportWidth >= 1024;
  
  // Theme state: defaults to system preference, falls back to localStorage if set
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme attribute to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync theme with system changes if no manual override is stored
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };
  
  // Custom Drag/Swipe State
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Track viewport for conditional rendering
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener('change', handler as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener('change', handler as (e: MediaQueryListEvent) => void);
  }, []);

  // Fetch products from NestJS
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('Backend offline, using high-fidelity mock data:', err);
      });
  }, []);

  // Validation Helpers
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidName = (name: string) => {
    return name.trim().length >= 2;
  };

  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  // Submit Handlers
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!isValidName(signupForm.name)) {
      setAuthError('Name must be at least 2 characters long');
      return;
    }
    if (!isValidEmail(signupForm.email)) {
      setAuthError('Please enter a valid email address');
      return;
    }
    if (!isValidPassword(signupForm.password)) {
      setAuthError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setSignupForm({ name: '', email: '', password: '' });
      setAuthSuccess('Registration successful!');
    } catch (err: any) {
      setAuthError(err.message || 'An error occurred during sign up');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!isValidEmail(loginForm.email)) {
      setAuthError('Please enter a valid email address');
      return;
    }
    if (!loginForm.password) {
      setAuthError('Password is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setLoginForm({ email: '', password: '' });
      setAuthSuccess('Login successful!');
    } catch (err: any) {
      setAuthError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!isValidEmail(forgotEmail)) {
      setAuthError('Not a valid email address. Should be your@email.com');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }
      setAuthSuccess('Reset password link has been sent to your email');
      setForgotEmail('');
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setAuthError(null);
    setAuthSuccess(null);
    setAuthView('login');
  };

  const toggleFavorite = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Touch handlers for swipe (mobile/tablet only)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isDesktopView) return; // No swipe on wide desktop
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDesktopView || dragStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX;
    
    const maxIdx = isMobile ? 2 : isTablet ? 1 : 0;
    if ((currentSlide === 0 && diff > 0) || (currentSlide === maxIdx && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (isDesktopView || dragStartX === null) return;
    setIsDragging(false);
    
    const sliderWidth = sliderRef.current?.clientWidth || 388;
    const threshold = sliderWidth * 0.15;
    const maxIdx = isMobile ? 2 : isTablet ? 1 : 0;

    if (dragOffset < -threshold && currentSlide < maxIdx) {
      setCurrentSlide(currentSlide + 1);
    } else if (dragOffset > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    
    setDragOffset(0);
    setDragStartX(null);
  };

  // Mouse handlers for swipe (testing/tablet support)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDesktopView) return;
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDesktopView || dragStartX === null || !isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartX;
    
    const maxIdx = isMobile ? 2 : isTablet ? 1 : 0;
    if ((currentSlide === 0 && diff > 0) || (currentSlide === maxIdx && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDesktopView || dragStartX === null) return;
    setIsDragging(false);
    
    const sliderWidth = sliderRef.current?.clientWidth || 388;
    const threshold = sliderWidth * 0.15;

    if (dragOffset < -threshold && currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    } else if (dragOffset > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    
    setDragOffset(0);
    setDragStartX(null);
  };

  const jumpToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  // Calculate sliding transforms (mobile/tablet swipe carousel)
  const sliderWidth = sliderRef.current?.clientWidth || 388;
  const currentTranslateX = -currentSlide * (100 / 3);
  const dragTranslatePercent = sliderWidth > 0 ? (dragOffset / (sliderWidth * 3)) * 100 : 0;
  const transformStyle = {
    transform: `translateX(${currentTranslateX + dragTranslatePercent}%)`,
    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.1, 0.76, 0.55, 0.94)'
  };

  const newProducts = products.filter(p => p.isNew);
  const saleProducts = products.filter(p => p.isSale);

  // Render Stars Component
  const renderStars = (rating: number, count: number) => {
    return (
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="star-icon" fill={i < Math.floor(rating) ? 'currentColor' : 'none'} />
        ))}
        <span>({count})</span>
      </div>
    );
  };

  return (
    <div className="app-layout">

      {/* ========= TOP HEADER (Desktop / Tablet) ========= */}
      <header className="top-header">
        <a href="/" className="header-brand" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
          E-Shop
        </a>

        <nav className="header-nav">
          <button 
            className={`header-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <HomeIcon className="header-nav-icon" />
            Home
          </button>
          <button 
            className={`header-nav-item ${activeTab === 'shop' ? 'active' : ''}`}
            onClick={() => setActiveTab('shop')}
          >
            <Search className="header-nav-icon" />
            Shop
          </button>
          <button 
            className={`header-nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart className="header-nav-icon" />
            Favorites
          </button>
        </nav>

        <div className="header-search-box">
          <Search className="header-search-icon" />
          <input 
            className="header-search-input" 
            type="text" 
            placeholder="Search products..." 
          />
        </div>

        <div className="header-actions">
          <button 
            className="header-action-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === 'light' ? <Moon className="header-action-icon" /> : <Sun className="header-action-icon" />}
          </button>
          <button 
            className={`header-action-btn ${activeTab === 'bag' ? 'active' : ''}`}
            onClick={() => setActiveTab('bag')}
            title="Shopping Bag"
          >
            <ShoppingBag className="header-action-icon" />
          </button>
          <button 
            className={`header-action-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            title="My Profile"
          >
            <User className="header-action-icon" />
          </button>
        </div>
      </header>

      {/* ========= DESKTOP SLIDE TABS (Home view only) ========= */}
      {activeTab === 'home' && (
        <div className="desktop-slide-tabs">
          {SLIDE_LABELS.map((label, idx) => (
            <button
              key={idx}
              className={`slide-tab ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => jumpToSlide(idx)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ========= MOBILE SWIPE INDICATORS ========= */}
      {activeTab === 'home' && (
        <div className="slider-indicator">
          {[0, 1, 2].map((idx) => (
            <div 
              key={idx} 
              className={`indicator-dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => jumpToSlide(idx)}
            />
          ))}
        </div>
      )}

      {/* ========= MAIN CONTENT AREA ========= */}
      <div className="app-content">
        {activeTab === 'home' ? (
          <div 
            ref={sliderRef}
            className="home-slider" 
            style={isDesktop ? undefined : transformStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {/* ================= SLIDE 1 (Trending) ================= */}
            <div 
              className="home-slide" 
              style={isDesktop ? { display: currentSlide === 0 ? 'flex' : 'none', width: '100%' } : undefined}
            >
              <div className="hero-banner trending-banner">
                <div className="banner-images-track">
                  <div className="banner-image left" style={{ backgroundImage: "url('/assets/trending_banner_left.png')" }} />
                  <div className="banner-image center" style={{ backgroundImage: "url('/assets/trending_banner_center.png')" }} />
                  <div className="banner-image right" style={{ backgroundImage: "url('/assets/fashion_sale_banner.png')" }} />
                </div>
                <div className="hero-content">
                  <h1 className="hero-title">Fashion<br />sale</h1>
                  <button className="hero-button">Check</button>
                </div>
              </div>

              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-wrap">
                    <h2 className="section-title">New</h2>
                    <span className="section-subtitle">You've never seen it before!</span>
                  </div>
                  <a href="#view-all" className="section-link" onClick={(e) => {e.preventDefault(); setActiveTab('shop');}}>View all</a>
                </div>

                <div className="products-scroll">
                  {newProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" draggable="false" />
                        <span className="tag-badge badge-new">NEW</span>
                        <button 
                          className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                          onClick={(e) => toggleFavorite(product.id, e)}
                        >
                          <Heart className="favorite-icon" />
                        </button>
                      </div>
                      <div className="product-meta">
                        {renderStars(product.rating, product.ratingCount)}
                        <span className="product-brand">{product.brand}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-pricing">
                          <span className="price-current">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= SLIDE 2 (Summer Sale) ================= */}
            <div 
              className="home-slide" 
              style={isDesktop ? { display: currentSlide === 1 ? 'flex' : 'none', width: '100%' } : undefined}
            >
              <div className="hero-banner street-clothes">
                <div className="banner-images-track">
                  <div className="banner-image left" style={{ backgroundImage: "url('/assets/summer_banner_left.png')" }} />
                  <div className="banner-image center" style={{ backgroundImage: "url('/assets/summer_banner_center.png')" }} />
                  <div className="banner-image right" style={{ backgroundImage: "url('/assets/street_clothes_banner.png')" }} />
                </div>
                <div className="hero-content">
                  <h1 className="hero-title" style={{ fontSize: isDesktopView ? '54px' : '38px' }}>Street clothes</h1>
                </div>
              </div>

              <div className="section-container">
                <div className="section-header">
                  <div className="section-title-wrap">
                    <h2 className="section-title">Sale</h2>
                    <span className="section-subtitle">Super summer sale</span>
                  </div>
                  <a href="#view-all" className="section-link" onClick={(e) => {e.preventDefault(); setActiveTab('shop');}}>View all</a>
                </div>

                <div className="products-scroll">
                  {saleProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" draggable="false" />
                        <span className="tag-badge badge-discount">-{product.discountPercent}%</span>
                        <button 
                          className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                          onClick={(e) => toggleFavorite(product.id, e)}
                        >
                          <Heart className="favorite-icon" />
                        </button>
                      </div>
                      <div className="product-meta">
                        {renderStars(product.rating, product.ratingCount)}
                        <span className="product-brand">{product.brand}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-pricing">
                          <span className="price-original">${product.originalPrice}</span>
                          <span className="price-current sale-price">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional New section from Main 2 */}
                <div className="section-header" style={{ marginTop: '16px' }}>
                  <div className="section-title-wrap">
                    <h2 className="section-title">New</h2>
                    <span className="section-subtitle">You've never seen it before!</span>
                  </div>
                  <a href="#view-all" className="section-link" onClick={(e) => {e.preventDefault(); setActiveTab('shop');}}>View all</a>
                </div>
                <div className="products-scroll">
                  {newProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-img-wrapper">
                        <img src={product.imageUrl} alt={product.name} className="product-image" draggable="false" />
                        <span className="tag-badge badge-new">NEW</span>
                        <button 
                          className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                          onClick={(e) => toggleFavorite(product.id, e)}
                        >
                          <Heart className="favorite-icon" />
                        </button>
                      </div>
                      <div className="product-meta">
                        {renderStars(product.rating, product.ratingCount)}
                        <span className="product-brand">{product.brand}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-pricing">
                          <span className="price-current">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= SLIDE 3 (New Collection) ================= */}
            <div 
              className="home-slide" 
              style={isDesktop ? { display: currentSlide === 2 ? 'flex' : 'none', width: '100%' } : undefined}
            >
              <div className="grid-container">
                <div className="grid-top-banner new-collection-banner">
                  <div className="banner-images-track">
                    <div className="banner-image left" style={{ backgroundImage: "url('/assets/new_collection_banner_left.png')" }} />
                    <div className="banner-image center" style={{ backgroundImage: "url('/assets/new_collection_banner_center.png')" }} />
                    <div className="banner-image right" style={{ backgroundImage: "url('/assets/new_collection_banner.png')" }} />
                  </div>
                  <h2 className="grid-top-title">New collection</h2>
                </div>

                <div className="grid-bottom-row">
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/sport_dress_product.png')" }}
                      onClick={() => setCurrentSlide(1)}
                    >
                      <h4 className="grid-block-title">Summer<br />sale</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/black_collection_banner.png')" }}
                      onClick={() => setCurrentSlide(1)}
                    >
                      <h4 className="grid-block-title">Black</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/mens_hoodies_banner.png')" }}
                    >
                      <h4 className="grid-block-title">Men's<br />hoodies</h4>
                    </div>
                  </div>
                </div>

                <div className="grid-bottom-row" style={{ flexDirection: 'row-reverse' }}>
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/product_knit_sweater.png')" }}
                    >
                      <h4 className="grid-block-title">Winter<br />knitwear</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/product_leather_bag.png')" }}
                    >
                      <h4 className="grid-block-title">Accessories</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/product_sneakers.png')" }}
                    >
                      <h4 className="grid-block-title">Footwear</h4>
                    </div>
                  </div>
                </div>

                <div className="grid-bottom-row">
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/evening_dress_product.png')" }}
                    >
                      <h4 className="grid-block-title">Formal<br />wear</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/product_denim_jacket.png')" }}
                    >
                      <h4 className="grid-block-title">Denim</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/product_wrap_dress.png')" }}
                    >
                      <h4 className="grid-block-title">Dresses</h4>
                    </div>
                  </div>
                </div>

                {/* Row 4 (Pattern 4 - Inverted) */}
                <div className="grid-bottom-row" style={{ flexDirection: 'row-reverse' }}>
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_sportswear.png')" }}
                    >
                      <h4 className="grid-block-title">Sportswear</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_swimwear.png')" }}
                    >
                      <h4 className="grid-block-title">Swimwear</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/cat_loungewear.png')" }}
                    >
                      <h4 className="grid-block-title">Loungewear</h4>
                    </div>
                  </div>
                </div>

                {/* Row 5 (Pattern 5 - Standard) */}
                <div className="grid-bottom-row">
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_activewear.png')" }}
                    >
                      <h4 className="grid-block-title">Activewear</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_outerwear.png')" }}
                    >
                      <h4 className="grid-block-title">Outerwear</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/cat_jeanswear.png')" }}
                    >
                      <h4 className="grid-block-title">Jeanswear</h4>
                    </div>
                  </div>
                </div>

                {/* Row 6 (Pattern 6 - Inverted) */}
                <div className="grid-bottom-row" style={{ flexDirection: 'row-reverse' }}>
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_urbanwear.png')" }}
                    >
                      <h4 className="grid-block-title">Urban<br />wear</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_accessories_hats.png')" }}
                    >
                      <h4 className="grid-block-title">Summer<br />hats</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/cat_cargo.png')" }}
                    >
                      <h4 className="grid-block-title">Cargo<br />style</h4>
                    </div>
                  </div>
                </div>

                {/* Row 7 (Pattern 7 - Standard) */}
                <div className="grid-bottom-row">
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_sleepwear.png')" }}
                    >
                      <h4 className="grid-block-title">Sleepwear</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_beachwear.png')" }}
                    >
                      <h4 className="grid-block-title">Beachwear</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/cat_partywear.png')" }}
                    >
                      <h4 className="grid-block-title">Party<br />wear</h4>
                    </div>
                  </div>
                </div>

                {/* Row 8 (Pattern 8 - Inverted) */}
                <div className="grid-bottom-row" style={{ flexDirection: 'row-reverse' }}>
                  <div className="grid-col-left">
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_cardigans.png')" }}
                    >
                      <h4 className="grid-block-title">Cardigans</h4>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: "url('/assets/cat_officestyle.png')" }}
                    >
                      <h4 className="grid-block-title">Office<br />style</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: "url('/assets/cat_vintage.png')" }}
                    >
                      <h4 className="grid-block-title">Vintage<br />style</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'profile' ? (
          /* Profile / Authentication View Stack */
          <div className="auth-wrapper">
            {user ? (
              /* Logged In View */
              <div className="placeholder-tab" style={{ gap: '24px', padding: '24px 0', alignItems: 'center' }}>
                <div className="profile-card">
                  <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="profile-info">
                    <span className="profile-name">{user.name}</span>
                    <span className="profile-email">{user.email}</span>
                  </div>
                </div>

                <div style={{
                  width: '100%',
                  maxWidth: '400px',
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  textAlign: 'left'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)', marginBottom: '8px' }}>
                    Settings
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--light-gray)'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>Dark Mode</span>
                      <span style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '2px' }}>
                        {localStorage.getItem('theme') ? 'Manual override active' : 'Following system default'}
                      </span>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      style={{
                        background: theme === 'dark' ? 'var(--accent)' : 'var(--light-gray)',
                        border: 'none',
                        borderRadius: '24px',
                        width: '56px',
                        height: '30px',
                        padding: '3px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {theme === 'dark' ? <Moon size={14} color="var(--accent)" /> : <Sun size={14} color="#FFBA49" />}
                      </div>
                    </button>
                  </div>
                  
                  {!localStorage.getItem('theme') ? (
                    <p style={{ fontSize: '11px', color: 'var(--gray)', fontStyle: 'italic' }}>
                      App is automatically matching your operating system color theme. Toggle above to override manually.
                    </p>
                  ) : (
                    <button
                      onClick={() => {
                        localStorage.removeItem('theme');
                        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--accent)',
                        color: 'var(--accent)',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        alignSelf: 'flex-start',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(219, 48, 34, 0.08)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      Reset to System Default
                    </button>
                  )}
                </div>

                <button 
                  className="profile-logout-btn"
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              /* Auth Pages */
              <div style={{ width: '100%' }}>
                {authView === 'login' && (
                  <div>
                    <div className="auth-header">
                      <button className="auth-back-btn" onClick={() => setActiveTab('home')}>
                        <ChevronLeft size={28} />
                      </button>
                      <h2 className="auth-title">Login</h2>
                    </div>

                    <form className="auth-form" onSubmit={handleLogin}>
                      {authError && <div className="auth-error-msg">{authError}</div>}
                      {authSuccess && <div style={{ color: '#2AA952', fontSize: '12px', textAlign: 'left' }}>{authSuccess}</div>}
                      
                      <div className="auth-card">
                        <div className="auth-input-container">
                          <span className="auth-input-label">Email</span>
                          <input 
                            className="auth-input"
                            type="email"
                            placeholder="Enter your email"
                            value={loginForm.email}
                            onChange={(e) => {
                              setLoginForm({ ...loginForm, email: e.target.value });
                              setAuthError(null);
                            }}
                            required
                          />
                        </div>
                        {isValidEmail(loginForm.email) && (
                          <div className="auth-validation-icon">
                            <Check className="auth-validation-tick" size={20} />
                          </div>
                        )}
                      </div>

                      <div className="auth-card">
                        <div className="auth-input-container">
                          <span className="auth-input-label">Password</span>
                          <input 
                            className="auth-input"
                            type="password"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => {
                              setLoginForm({ ...loginForm, password: e.target.value });
                              setAuthError(null);
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="auth-redirect-link" onClick={() => { setAuthView('forgot_password'); setAuthError(null); setAuthSuccess(null); }}>
                        Forgot your password?
                        <span className="auth-link-arrow"><ArrowRight size={16} /></span>
                      </div>

                      <div className="auth-btn-container">
                        <button className="auth-button" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Logging in...' : 'LOGIN'}
                        </button>
                      </div>

                      <div className="auth-redirect-link" style={{ justifyContent: 'center', marginTop: '16px' }} onClick={() => { setAuthView('signup'); setAuthError(null); setAuthSuccess(null); }}>
                        Don't have an account? Sign up
                        <span className="auth-link-arrow"><ArrowRight size={16} /></span>
                      </div>
                    </form>

                    <div className="auth-social-section">
                      <span className="auth-social-title">Or login with social account</span>
                      <div className="auth-social-buttons">
                        <button className="auth-social-btn">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                          </svg>
                        </button>
                        <button className="auth-social-btn">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#3B5998" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {authView === 'signup' && (
                  <div>
                    <div className="auth-header">
                      <button className="auth-back-btn" onClick={() => { setAuthView('login'); setAuthError(null); setAuthSuccess(null); }}>
                        <ChevronLeft size={28} />
                      </button>
                      <h2 className="auth-title">Sign up</h2>
                    </div>

                    <form className="auth-form" onSubmit={handleSignup}>
                      {authError && <div className="auth-error-msg">{authError}</div>}
                      {authSuccess && <div style={{ color: '#2AA952', fontSize: '12px', textAlign: 'left' }}>{authSuccess}</div>}

                      <div className="auth-card">
                        <div className="auth-input-container">
                          <span className="auth-input-label">Name</span>
                          <input 
                            className="auth-input"
                            type="text"
                            placeholder="Enter your name"
                            value={signupForm.name}
                            onChange={(e) => {
                              setSignupForm({ ...signupForm, name: e.target.value });
                              setAuthError(null);
                            }}
                            required
                          />
                        </div>
                        {isValidName(signupForm.name) && (
                          <div className="auth-validation-icon">
                            <Check className="auth-validation-tick" size={20} />
                          </div>
                        )}
                      </div>

                      <div className="auth-card">
                        <div className="auth-input-container">
                          <span className="auth-input-label">Email</span>
                          <input 
                            className="auth-input"
                            type="email"
                            placeholder="Enter your email"
                            value={signupForm.email}
                            onChange={(e) => {
                              setSignupForm({ ...signupForm, email: e.target.value });
                              setAuthError(null);
                            }}
                            required
                          />
                        </div>
                        {isValidEmail(signupForm.email) && (
                          <div className="auth-validation-icon">
                            <Check className="auth-validation-tick" size={20} />
                          </div>
                        )}
                      </div>

                      <div className="auth-card">
                        <div className="auth-input-container">
                          <span className="auth-input-label">Password</span>
                          <input 
                            className="auth-input"
                            type="password"
                            placeholder="Create password (min 6 chars)"
                            value={signupForm.password}
                            onChange={(e) => {
                              setSignupForm({ ...signupForm, password: e.target.value });
                              setAuthError(null);
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="auth-redirect-link" onClick={() => { setAuthView('login'); setAuthError(null); setAuthSuccess(null); }}>
                        Already have an account?
                        <span className="auth-link-arrow"><ArrowRight size={16} /></span>
                      </div>

                      <div className="auth-btn-container">
                        <button className="auth-button" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Registering...' : 'SIGN UP'}
                        </button>
                      </div>
                    </form>

                    <div className="auth-social-section">
                      <span className="auth-social-title">Or sign up with social account</span>
                      <div className="auth-social-buttons">
                        <button className="auth-social-btn">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                          </svg>
                        </button>
                        <button className="auth-social-btn">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="#3B5998" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {authView === 'forgot_password' && (
                  <div>
                    <div className="auth-header">
                      <button className="auth-back-btn" onClick={() => { setAuthView('login'); setAuthError(null); setAuthSuccess(null); }}>
                        <ChevronLeft size={28} />
                      </button>
                      <h2 className="auth-title">Forgot password</h2>
                    </div>

                    <p className="auth-info-text">
                      Please, enter your email address. You will receive a link to create a new password via email.
                    </p>

                    <form className="auth-form" onSubmit={handleForgotPassword}>
                      {authSuccess && <div style={{ color: '#2AA952', fontSize: '12px', textAlign: 'left', marginBottom: '8px' }}>{authSuccess}</div>}

                      <div className={`auth-card ${authError ? 'error-state' : ''}`}>
                        <div className="auth-input-container">
                          <span className="auth-input-label">Email</span>
                          <input 
                            className="auth-input"
                            type="text"
                            placeholder="Enter your email"
                            value={forgotEmail}
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                              setAuthError(null);
                            }}
                            required
                          />
                        </div>
                        {authError && (
                          <div className="auth-validation-icon">
                            <X className="auth-validation-cross" size={20} />
                          </div>
                        )}
                      </div>
                      
                      {authError && (
                        <span className="auth-error-msg">
                          {authError}
                        </span>
                      )}

                      <div className="auth-btn-container">
                        <button className="auth-button" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Sending...' : 'SEND'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Placeholder for other tabs */
          <div className="placeholder-tab">
            <div className="placeholder-tab-icon">
              {activeTab}
            </div>
            <h2 className="placeholder-tab-title">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Screen
            </h2>
            <p className="placeholder-tab-desc">
              This tab is interactive! It will be fully populated and implemented in its respective milestone.
            </p>
            <button 
              className="hero-button" 
              style={{ marginTop: '24px' }}
              onClick={() => setActiveTab('home')}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      {/* ========= BOTTOM NAVIGATION (Mobile Only) ========= */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <HomeIcon className="nav-icon" />
          Home
        </button>
        <button 
          className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          <Search className="nav-icon" />
          Shop
        </button>
        <button 
          className={`nav-item ${activeTab === 'bag' ? 'active' : ''}`}
          onClick={() => setActiveTab('bag')}
        >
          <ShoppingBag className="nav-icon" />
          Bag
        </button>
        <button 
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart className="nav-icon" />
          Favorites
        </button>
        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="nav-icon" />
          Profile
        </button>
      </nav>
    </div>
  );
}
