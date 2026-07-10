import React, { useState, useEffect, useRef } from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Star,
  Wifi,
  Battery
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
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'bag' | 'favorites' | 'profile'>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Custom Drag/Swipe State
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const toggleFavorite = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX;
    
    // Prevent dragging out of bounds too easily
    if ((currentSlide === 0 && diff > 0) || (currentSlide === 2 && diff < 0)) {
      setDragOffset(diff * 0.3); // add resistance
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragStartX === null) return;
    setIsDragging(false);
    
    const sliderWidth = sliderRef.current?.clientWidth || 388;
    const threshold = sliderWidth * 0.2; // 20% swipe threshold

    if (dragOffset < -threshold && currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    } else if (dragOffset > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    
    setDragOffset(0);
    setDragStartX(null);
  };

  // Mouse handlers for swipe (Desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null || !isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartX;
    
    if ((currentSlide === 0 && diff > 0) || (currentSlide === 2 && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (dragStartX === null) return;
    setIsDragging(false);
    
    const sliderWidth = sliderRef.current?.clientWidth || 388;
    const threshold = sliderWidth * 0.2;

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

  // Calculate sliding transforms
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
    <div className="device-shell">
      <div className="device-notch"></div>
      
      {/* Dynamic Status Bar Colors depending on hero backgrounds */}
      <div className={`device-status-bar ${currentSlide === 1 ? '' : 'white-text'}`}>
        <span>9:41</span>
        <div className="status-bar-icons">
          <Wifi size={14} style={{ marginRight: 2 }} />
          <Battery size={18} />
        </div>
      </div>

      {/* Swipeable View Indicators */}
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

      {/* Main Content Area */}
      <div className="app-content">
        {activeTab === 'home' ? (
          <div 
            ref={sliderRef}
            className="home-slider" 
            style={transformStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {/* ================= SLIDE 1 (Main page.png) ================= */}
            <div className="home-slide">
              <div 
                className="hero-banner"
                style={{ backgroundImage: `url('/assets/fashion_sale_banner.png')` }}
              >
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

            {/* ================= SLIDE 2 (Main 2.png) ================= */}
            <div className="home-slide">
              <div 
                className="hero-banner"
                style={{ backgroundImage: `url('/assets/street_clothes_banner.png')` }}
              >
                <div className="hero-content">
                  <h1 className="hero-title" style={{ fontSize: '38px' }}>Street clothes</h1>
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

            {/* ================= SLIDE 3 (Main 3.png) ================= */}
            <div className="home-slide">
              <div className="grid-container">
                <div 
                  className="grid-top-banner"
                  style={{ backgroundImage: `url('/assets/new_collection_banner.png')` }}
                >
                  <h2 className="grid-top-title">New collection</h2>
                </div>

                <div className="grid-bottom-row">
                  <div className="grid-col-left">
                    <div className="grid-block block-text">
                      <h3>Summer<br />sale</h3>
                    </div>
                    <div 
                      className="grid-block image-block"
                      style={{ backgroundImage: `url('/assets/black_collection_banner.png')` }}
                    >
                      <h4 className="grid-block-title">Black</h4>
                    </div>
                  </div>
                  <div className="grid-col-right">
                    <div 
                      className="grid-block image-block block-right-full"
                      style={{ backgroundImage: `url('/assets/mens_hoodies_banner.png')` }}
                    >
                      <h4 className="grid-block-title">Men's<br />hoodies</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Mockup details for other tabs */
          <div style={{ padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', height: '100%' }}>
            <div style={{ fontSize: '72px', opacity: 0.1, fontWeight: 800, textTransform: 'uppercase' }}>
              {activeTab}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--primary)' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Screen
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '14px', maxWidth: '280px' }}>
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

      {/* Persistent Bottom Navigation Bar */}
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
