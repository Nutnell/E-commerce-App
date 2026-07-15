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
  subcategory?: string;
  gender?: string;
  colors?: string;
  sizes?: string;
}

const MOCK_PRODUCTS: Product[] = [
  // ==========================================
  // WOMEN'S PRODUCTS
  // ==========================================
  { id: 1, name: 'Evening Dress', brand: 'Dorothy Perkins', price: 12.0, originalPrice: 15.0, discountPercent: 20, rating: 5.0, ratingCount: 10, imageUrl: '/assets/evening_dress_product.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'dresses', gender: 'women', colors: 'black,red,white', sizes: 'S,M,L' },
  { id: 2, name: 'Sport Dress', brand: 'Sitlly', price: 19.0, originalPrice: 22.0, discountPercent: 15, rating: 5.0, ratingCount: 10, imageUrl: '/assets/sport_dress_product.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'dresses', gender: 'women', colors: 'black,blue', sizes: 'XS,S,M' },
  { id: 3, name: 'Wrap Dress', brand: 'H&M', price: 24.0, originalPrice: 38.0, discountPercent: 37, rating: 4.0, ratingCount: 22, imageUrl: '/assets/product_wrap_dress.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'dresses', gender: 'women', colors: 'red,white,tan', sizes: 'S,M,L,XL' },
  { id: 4, name: 'Striped Top', brand: 'Dorothy Perkins', price: 15.0, rating: 4.5, ratingCount: 5, imageUrl: '/assets/new_product_1.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'tops', gender: 'women', colors: 'black,white,red', sizes: 'XS,S,M,L' },
  { id: 5, name: 'White T-Shirt', brand: 'Sitlly', price: 12.0, rating: 4.0, ratingCount: 3, imageUrl: '/assets/new_product_2.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'tops', gender: 'women', colors: 'white,grey', sizes: 'S,M,L' },
  { id: 6, name: 'Summer Blouse', brand: 'Zara', price: 22.0, rating: 4.5, ratingCount: 14, imageUrl: '/assets/product_summer_blouse.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'blouses', gender: 'women', colors: 'white,tan,red', sizes: 'XS,S,M' },
  { id: 7, name: 'Maxi Skirt', brand: 'Mango', price: 28.0, rating: 4.0, ratingCount: 8, imageUrl: '/assets/product_maxi_skirt.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'skirts', gender: 'women', colors: 'black,tan,blue', sizes: 'S,M,L' },
  { id: 8, name: 'Pleated Mini Skirt', brand: 'Zara', price: 18.0, rating: 4.3, ratingCount: 11, imageUrl: '/assets/cat_partywear.png', isNew: false, isSale: false, category: 'clothes', subcategory: 'skirts', gender: 'women', colors: 'black,red,white', sizes: 'XS,S,M' },
  { id: 9, name: 'Linen Pants', brand: 'H&M', price: 32.0, rating: 4.5, ratingCount: 19, imageUrl: '/assets/product_linen_pants.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'pants', gender: 'women', colors: 'tan,white,grey', sizes: 'M,L,XL' },
  { id: 10, name: 'Skinny Fit Jeans', brand: 'Zara', price: 34.0, originalPrice: 45.0, discountPercent: 24, rating: 4.2, ratingCount: 9, imageUrl: '/assets/cat_jeanswear.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'jeans', gender: 'women', colors: 'blue,black', sizes: 'S,M,L,XL' },
  { id: 11, name: 'Knit Sweater', brand: 'Dorothy Perkins', price: 26.0, rating: 5.0, ratingCount: 12, imageUrl: '/assets/product_knit_sweater.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'sweaters', gender: 'women', colors: 'grey,black,red', sizes: 'S,M,L,XL' },
  { id: 12, name: 'Denim Jacket', brand: 'Mango', price: 29.0, originalPrice: 45.0, discountPercent: 35, rating: 4.5, ratingCount: 18, imageUrl: '/assets/product_denim_jacket.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'outerwear', gender: 'women', colors: 'blue,grey,black', sizes: 'M,L,XL' },
  { id: 13, name: 'Denim Shorts', brand: 'H&M', price: 16.0, rating: 4.1, ratingCount: 7, imageUrl: '/assets/cat_beachwear.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'shorts', gender: 'women', colors: 'blue,white', sizes: 'XS,S,M' },
  { id: 14, name: 'Platform Sneakers', brand: 'Nike', price: 59.0, originalPrice: 89.0, discountPercent: 34, rating: 5.0, ratingCount: 45, imageUrl: '/assets/product_sneakers.png', isNew: false, isSale: true, category: 'shoes', subcategory: 'sneakers', gender: 'women', colors: 'white,black,blue', sizes: 'S,M,L' },
  { id: 15, name: 'Casual Sandals', brand: 'Zara', price: 24.0, rating: 4.4, ratingCount: 11, imageUrl: '/assets/cat_beachwear.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'sandals', gender: 'women', colors: 'tan,white', sizes: 'S,M,L' },
  { id: 16, name: 'Red Stiletto Heels', brand: 'Dorothy Perkins', price: 45.0, originalPrice: 55.0, discountPercent: 18, rating: 4.8, ratingCount: 15, imageUrl: '/assets/cat_partywear.png', isNew: false, isSale: true, category: 'shoes', subcategory: 'heels', gender: 'women', colors: 'red,black', sizes: 'S,M,L' },
  { id: 17, name: 'Warm Leather Boots', brand: 'Mango', price: 89.0, rating: 4.7, ratingCount: 20, imageUrl: '/assets/cat_outerwear.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'boots', gender: 'women', colors: 'black,tan', sizes: 'M,L' },
  { id: 18, name: 'Ballet Flats', brand: 'H&M', price: 22.0, rating: 4.3, ratingCount: 14, imageUrl: '/assets/cat_loungewear.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'flats', gender: 'women', colors: 'black,tan,red', sizes: 'S,M,L' },
  { id: 19, name: 'Leather Handbag', brand: 'Zara', price: 35.0, originalPrice: 55.0, discountPercent: 36, rating: 4.5, ratingCount: 31, imageUrl: '/assets/product_leather_bag.png', isNew: false, isSale: true, category: 'accessories', subcategory: 'bags', gender: 'women', colors: 'black,tan,grey', sizes: 'M' },
  { id: 20, name: 'Straw Sun Hat', brand: 'H&M', price: 15.0, rating: 4.3, ratingCount: 6, imageUrl: '/assets/cat_accessories_hats.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'hats', gender: 'women', colors: 'tan,white', sizes: 'M' },
  { id: 21, name: 'Retro Sunglasses', brand: 'Mango', price: 29.0, rating: 4.6, ratingCount: 14, imageUrl: '/assets/cat_vintage.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'sunglasses', gender: 'women', colors: 'black,brown', sizes: 'M' },
  { id: 22, name: 'Silk Scarf', brand: 'Dorothy Perkins', price: 18.0, rating: 4.5, ratingCount: 7, imageUrl: '/assets/cat_cardigans.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'scarves', gender: 'women', colors: 'red,tan,black', sizes: 'M' },
  { id: 23, name: 'Gold Pendant Necklace', brand: 'Mango', price: 14.0, rating: 4.7, ratingCount: 18, imageUrl: '/assets/cat_partywear.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'jewelry', gender: 'women', colors: 'gold', sizes: 'M' },

  // ==========================================
  // MEN'S PRODUCTS
  // ==========================================
  { id: 30, name: 'Casual Check Shirt', brand: 'Jack & Jones', price: 24.0, rating: 4.5, ratingCount: 16, imageUrl: '/assets/mens_check_shirt.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'shirts', gender: 'men', colors: 'blue,white', sizes: 'M,L,XL' },
  { id: 31, name: 'Basic Crew Tee', brand: 'adidas Originals', price: 15.0, rating: 4.6, ratingCount: 30, imageUrl: '/assets/mens_tshirt_plain.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'tshirts', gender: 'men', colors: 'white,black,grey', sizes: 'M,L,XL' },
  { id: 32, name: 'Classic Polo Shirt', brand: 'Tommy Hilfiger', price: 35.0, rating: 4.8, ratingCount: 24, imageUrl: '/assets/mens_polo_shirt.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'polo', gender: 'men', colors: 'blue,white,red', sizes: 'M,L,XL' },
  { id: 33, name: 'Premium Red Hoodie', brand: 'adidas Originals', price: 39.0, originalPrice: 49.0, discountPercent: 20, rating: 4.9, ratingCount: 22, imageUrl: '/assets/mens_hoodies_banner.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'hoodies', gender: 'men', colors: 'red,black,grey', sizes: 'M,L,XL' },
  { id: 34, name: 'Grey Zip Hoodie', brand: 'Nike', price: 44.0, rating: 4.7, ratingCount: 19, imageUrl: '/assets/mens_hoodie_grey.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'hoodies', gender: 'men', colors: 'grey,black', sizes: 'M,L,XL' },
  { id: 35, name: 'Bomber Jacket', brand: 'Jack & Jones', price: 55.0, originalPrice: 72.0, discountPercent: 24, rating: 4.7, ratingCount: 28, imageUrl: '/assets/mens_bomber_jacket.png', isNew: false, isSale: true, category: 'clothes', subcategory: 'jackets', gender: 'men', colors: 'green,black,blue', sizes: 'M,L,XL' },
  { id: 36, name: 'Casual Blazer', brand: 'Tommy Hilfiger', price: 85.0, rating: 4.8, ratingCount: 15, imageUrl: '/assets/mens_blazer.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'jackets', gender: 'men', colors: 'blue,black,grey', sizes: 'M,L,XL' },
  { id: 37, name: 'Classic Cargo Pants', brand: 's.Oliver', price: 35.0, rating: 4.2, ratingCount: 8, imageUrl: '/assets/cat_cargo.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'pants', gender: 'men', colors: 'black,grey', sizes: 'M,L,XL' },
  { id: 38, name: 'Slim Fit Chinos', brand: 'Tommy Hilfiger', price: 38.0, rating: 4.5, ratingCount: 16, imageUrl: '/assets/mens_chinos.png', isNew: false, isSale: false, category: 'clothes', subcategory: 'pants', gender: 'men', colors: 'tan,black,blue', sizes: 'M,L,XL' },
  { id: 39, name: 'Slim Fit Denim Jeans', brand: 'Jack & Jones', price: 45.0, rating: 4.4, ratingCount: 19, imageUrl: '/assets/cat_jeanswear.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'jeans', gender: 'men', colors: 'blue,black', sizes: 'M,L,XL' },
  { id: 40, name: 'Chino Shorts', brand: 'Tommy Hilfiger', price: 22.0, rating: 4.5, ratingCount: 14, imageUrl: '/assets/mens_shorts_chino.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'shorts', gender: 'men', colors: 'blue,tan,black', sizes: 'M,L,XL' },
  { id: 41, name: 'Cotton Joggers', brand: 'Nike', price: 32.0, rating: 4.6, ratingCount: 20, imageUrl: '/assets/mens_joggers.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'joggers', gender: 'men', colors: 'grey,black', sizes: 'M,L,XL' },
  { id: 42, name: 'Men Canvas Sneakers', brand: 'Nike', price: 49.0, rating: 4.8, ratingCount: 40, imageUrl: '/assets/product_sneakers.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'sneakers', gender: 'men', colors: 'black,white', sizes: 'M,L,XL' },
  { id: 43, name: 'Chelsea Leather Boots', brand: 'Tommy Hilfiger', price: 79.0, originalPrice: 99.0, discountPercent: 20, rating: 4.8, ratingCount: 18, imageUrl: '/assets/mens_leather_boots.png', isNew: false, isSale: true, category: 'shoes', subcategory: 'boots', gender: 'men', colors: 'brown,black', sizes: 'M,L,XL' },
  { id: 44, name: 'Suede Loafers', brand: 'Tommy Hilfiger', price: 52.0, rating: 4.6, ratingCount: 14, imageUrl: '/assets/mens_loafers.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'loafers', gender: 'men', colors: 'tan,black', sizes: 'M,L,XL' },
  { id: 45, name: 'Performance Running Shoes', brand: 'Nike', price: 65.0, originalPrice: 85.0, discountPercent: 24, rating: 4.9, ratingCount: 35, imageUrl: '/assets/mens_running_shoes.png', isNew: false, isSale: true, category: 'shoes', subcategory: 'running', gender: 'men', colors: 'black,blue,white', sizes: 'M,L,XL' },
  { id: 46, name: 'Classic Silver Watch', brand: 'Tommy Hilfiger', price: 89.0, originalPrice: 120.0, discountPercent: 26, rating: 4.9, ratingCount: 42, imageUrl: '/assets/mens_watch.png', isNew: false, isSale: true, category: 'accessories', subcategory: 'watches', gender: 'men', colors: 'silver,black', sizes: 'M' },
  { id: 47, name: 'Leather Bifold Wallet', brand: 'Tommy Hilfiger', price: 32.0, rating: 4.7, ratingCount: 26, imageUrl: '/assets/mens_wallet.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'wallets', gender: 'men', colors: 'brown,black', sizes: 'M' },
  { id: 48, name: 'Canvas Backpack', brand: 'Nike', price: 42.0, rating: 4.6, ratingCount: 20, imageUrl: '/assets/mens_backpack.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'backpacks', gender: 'men', colors: 'blue,black,grey', sizes: 'M' },
  { id: 49, name: 'Casual Leather Belt', brand: 's.Oliver', price: 19.0, rating: 4.5, ratingCount: 12, imageUrl: '/assets/mens_wallet.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'belts', gender: 'men', colors: 'black,tan', sizes: 'M,L' },
  { id: 50, name: 'Aviator Sunglasses', brand: 'Tommy Hilfiger', price: 35.0, rating: 4.7, ratingCount: 16, imageUrl: '/assets/cat_vintage.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'sunglasses', gender: 'men', colors: 'gold,black', sizes: 'M' },
  { id: 51, name: 'Classic Sport Cap', brand: 'adidas Originals', price: 12.0, rating: 4.3, ratingCount: 8, imageUrl: '/assets/cat_accessories_hats.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'hats', gender: 'men', colors: 'black,blue', sizes: 'M' },

  // ==========================================
  // KIDS' PRODUCTS
  // ==========================================
  { id: 60, name: 'Kids Fun Graphic Tee', brand: 'H&M', price: 9.0, rating: 4.5, ratingCount: 6, imageUrl: '/assets/new_product_2.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'tops', gender: 'kids', colors: 'red,blue,white', sizes: 'XS,S' },
  { id: 61, name: 'Girls Floral Dress', brand: 'H&M', price: 15.0, rating: 4.7, ratingCount: 10, imageUrl: '/assets/evening_dress_product.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'dresses', gender: 'kids', colors: 'pink,white,blue', sizes: 'XS,S' },
  { id: 62, name: 'Girls Tutu Skirt', brand: 'H&M', price: 12.0, rating: 4.6, ratingCount: 7, imageUrl: '/assets/product_maxi_skirt.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'skirts', gender: 'kids', colors: 'pink,white', sizes: 'XS,S' },
  { id: 63, name: 'Kids Cargo Jeans', brand: 'Mango', price: 22.0, rating: 4.1, ratingCount: 4, imageUrl: '/assets/cat_jeanswear.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'jeans', gender: 'kids', colors: 'blue', sizes: 'XS,S' },
  { id: 64, name: 'Kids Cargo Shorts', brand: 'H&M', price: 10.0, rating: 4.4, ratingCount: 5, imageUrl: '/assets/cat_activewear.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'shorts', gender: 'kids', colors: 'tan,blue,grey', sizes: 'XS,S' },
  { id: 65, name: 'Kids Pullover Hoodie', brand: 'Nike', price: 25.0, rating: 4.8, ratingCount: 12, imageUrl: '/assets/mens_hoodie_grey.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'hoodies', gender: 'kids', colors: 'grey,blue,red', sizes: 'XS,S' },
  { id: 66, name: 'Kids Light Jacket', brand: 'H&M', price: 28.0, rating: 4.5, ratingCount: 7, imageUrl: '/assets/product_denim_jacket.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'jackets', gender: 'kids', colors: 'blue,green', sizes: 'XS,S' },
  { id: 67, name: 'Kids Cargo Pants', brand: 'Mango', price: 18.0, rating: 4.3, ratingCount: 5, imageUrl: '/assets/cat_cargo.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'pants', gender: 'kids', colors: 'grey,tan', sizes: 'XS,S' },
  { id: 68, name: 'Kids Knit Sweater', brand: 'H&M', price: 20.0, rating: 4.5, ratingCount: 6, imageUrl: '/assets/product_knit_sweater.png', isNew: true, isSale: false, category: 'clothes', subcategory: 'sweaters', gender: 'kids', colors: 'red,blue,grey', sizes: 'XS,S' },
  { id: 69, name: 'Kids Running Sneakers', brand: 'Nike', price: 29.0, rating: 4.9, ratingCount: 15, imageUrl: '/assets/product_sneakers.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'sneakers', gender: 'kids', colors: 'white,red,blue', sizes: 'XS,S' },
  { id: 70, name: 'Kids Summer Sandals', brand: 'H&M', price: 14.0, rating: 4.4, ratingCount: 7, imageUrl: '/assets/cat_beachwear.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'sandals', gender: 'kids', colors: 'blue,red,white', sizes: 'XS,S' },
  { id: 71, name: 'Kids Rain Boots', brand: 'H&M', price: 20.0, rating: 4.7, ratingCount: 9, imageUrl: '/assets/mens_leather_boots.png', isNew: true, isSale: false, category: 'shoes', subcategory: 'boots', gender: 'kids', colors: 'yellow,blue,red', sizes: 'XS,S' },
  { id: 72, name: 'Kids School Backpack', brand: 'Nike', price: 22.0, rating: 4.8, ratingCount: 14, imageUrl: '/assets/mens_backpack.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'backpacks', gender: 'kids', colors: 'blue,red,black', sizes: 'S' },
  { id: 73, name: 'Kids Baseball Cap', brand: 'Nike', price: 8.0, rating: 4.4, ratingCount: 6, imageUrl: '/assets/cat_accessories_hats.png', isNew: true, isSale: false, category: 'accessories', subcategory: 'hats', gender: 'kids', colors: 'red,blue,black', sizes: 'S' },
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

  // Google OAuth 2.0 simulation
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleCustomEmail, setGoogleCustomEmail] = useState('');

  // Form inputs
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');

  // Form error and UI feedback states
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recover user profile session on load/token change
  const [sessionChecking, setSessionChecking] = useState(!!token);

  useEffect(() => {
    if (token) {
      setSessionChecking(true);
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
          setSessionChecking(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setSessionChecking(false);
        });
    } else {
      setUser(null);
      setSessionChecking(false);
    }
  }, [token]);
  
  // Load products list from backend on mount
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching products from backend:', err);
      });
  }, []);
  
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
  // Catalog & Browsing State (Milestone 3)
  const [shopView, setShopView] = useState<'categories' | 'subcategories' | 'catalog'>('categories');
  const [selectedGenderTab, setSelectedGenderTab] = useState<'women' | 'men' | 'kids'>('women');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  
  // Sort States
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'reviews' | 'price_asc' | 'price_desc'>('newest');

  // Filter States
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [brandFilterActive, setBrandFilterActive] = useState(false);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');

  const [activeFilters, setActiveFilters] = useState({
    priceRange: [0, 200] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    category: 'All',
    brands: [] as string[],
  });

  const [tempFilters, setTempFilters] = useState({
    priceRange: [0, 200] as [number, number],
    colors: [] as string[],
    sizes: [] as string[],
    category: 'All',
    brands: [] as string[],
  });

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

  // Google OAuth 2.0 Simulation Helpers
  const base64urlEncode = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
    return window.btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const generateMockGoogleIdToken = (name: string, email: string) => {
    const headerStr = JSON.stringify({ alg: 'RS256', kid: 'mock-key' });
    const payloadStr = JSON.stringify({
      iss: 'https://accounts.google.com',
      aud: 'mock-client-id',
      sub: 'mock-google-user-id-' + email.split('@')[0],
      email: email,
      email_verified: true,
      name: name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    });
    return `${base64urlEncode(headerStr)}.${base64urlEncode(payloadStr)}.mock-signature`;
  };

  const handleGoogleLogin = async (name: string, email: string) => {
    setAuthError(null);
    setAuthSuccess(null);
    setIsSubmitting(true);
    setShowGoogleModal(false);

    try {
      const mockCredential = generateMockGoogleIdToken(name, email);
      const res = await fetch('http://localhost:3000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: mockCredential }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthSuccess('Google login successful!');
    } catch (err: any) {
      setAuthError(err.message || 'Failed to authenticate with Google');
    } finally {
      setIsSubmitting(false);
    }
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

  if (sessionChecking) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--background)',
        color: 'var(--primary)',
        fontFamily: 'var(--font-sans)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--light-gray)',
          borderTop: '4px solid var(--accent)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <span style={{ fontSize: '14px', fontWeight: 500 }}>Connecting to E-Shop...</span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-layout">
        {/* Render standard header but only showing brand name and theme toggle, no search, no nav, no bag */}
        <header className="top-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
          <span className="header-brand" style={{ cursor: 'default' }}>E-Shop</span>
          <div className="header-actions">
            <button 
              className="header-action-btn"
              onClick={toggleTheme}
              title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === 'light' ? <Moon className="header-action-icon" /> : <Sun className="header-action-icon" />}
            </button>
          </div>
        </header>

        <div className="tab-content" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="auth-wrapper" style={{ padding: '40px 16px' }}>
            <div style={{ width: '100%' }}>
              {authView === 'login' && (
                <div>
                  <div className="auth-header">
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
                      <button className="auth-social-btn" type="button" onClick={() => setShowGoogleModal(true)}>
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
                      <button className="auth-social-btn" type="button" onClick={() => setShowGoogleModal(true)}>
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
          </div>
        </div>

        {/* ========= GOOGLE ACCOUNT CHOOSER MODAL (Milestone 2.0) ========= */}
        {showGoogleModal && (
          <div className="google-modal-overlay" onClick={() => setShowGoogleModal(false)}>
            <div className="google-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="google-modal-header">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <h3>Sign in with Google</h3>
                <p>to continue to E-Shop</p>
              </div>
              
              <div className="google-accounts-list">
                <div 
                  className="google-account-item"
                  onClick={() => handleGoogleLogin('Nutnell User', 'nutnell@gmail.com')}
                >
                  <div className="google-avatar-circle">N</div>
                  <div className="google-account-details">
                    <span className="google-account-name">Nutnell User</span>
                    <span className="google-account-email">nutnell@gmail.com</span>
                  </div>
                </div>

                <div 
                  className="google-account-item"
                  onClick={() => handleGoogleLogin('John Doe', 'johndoe@gmail.com')}
                >
                  <div className="google-avatar-circle" style={{ backgroundColor: '#34A853' }}>J</div>
                  <div className="google-account-details">
                    <span className="google-account-name">John Doe</span>
                    <span className="google-account-email">johndoe@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="google-custom-section">
                <span className="google-custom-title">Use another email address:</span>
                <div className="google-custom-row">
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    value={googleCustomEmail}
                    className="google-custom-input"
                    onChange={(e) => setGoogleCustomEmail(e.target.value)}
                  />
                  <button 
                    disabled={!googleCustomEmail.includes('@')}
                    className="google-custom-btn"
                    onClick={() => {
                      const localPart = googleCustomEmail.split('@')[0];
                      const capitalizedName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
                      handleGoogleLogin(capitalizedName, googleCustomEmail);
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
              
              <button className="google-modal-close" onClick={() => setShowGoogleModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

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
                        <button className="auth-social-btn" type="button" onClick={() => setShowGoogleModal(true)}>
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
                        <button className="auth-social-btn" type="button" onClick={() => setShowGoogleModal(true)}>
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
        ) : activeTab === 'shop' ? (
          /* Shop / Catalog tab view */
          <div style={{ width: '100%' }}>
            {/* ========= 1. Categories Page ========= */}
            {shopView === 'categories' && (
              <div>
                <header className="categories-header">
                  <button className="header-icon-btn" onClick={() => setActiveTab('home')}>
                    <ChevronLeft size={24} />
                  </button>
                  <span className="header-title-text">Categories</span>
                  <button className="header-icon-btn">
                    <Search size={20} />
                  </button>
                </header>

                <div className="gender-tabs-container">
                  {(['women', 'men', 'kids'] as const).map((gender) => (
                    <button
                      key={gender}
                      className={`gender-tab-btn ${selectedGenderTab === gender ? 'active' : ''}`}
                      onClick={() => setSelectedGenderTab(gender)}
                    >
                      {gender.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="sales-banner-card">
                  <span className="sales-banner-title">SUMMER SALES</span>
                  <span className="sales-banner-subtitle">Up to 50% off</span>
                </div>

                <div className="categories-list-wrapper">
                  {(selectedGenderTab === 'men'
                    ? [
                        { name: 'New', img: '/assets/mens_bomber_jacket.png' },
                        { name: 'Clothes', img: '/assets/mens_check_shirt.png' },
                        { name: 'Shoes', img: '/assets/mens_leather_boots.png' },
                        { name: 'Accesories', img: '/assets/mens_watch.png' },
                      ]
                    : selectedGenderTab === 'kids'
                    ? [
                        { name: 'New', img: '/assets/mens_hoodie_grey.png' },
                        { name: 'Clothes', img: '/assets/cat_jeanswear.png' },
                        { name: 'Shoes', img: '/assets/product_sneakers.png' },
                        { name: 'Accesories', img: '/assets/mens_backpack.png' },
                      ]
                    : [
                        { name: 'New', img: '/assets/cat_cardigans.png' },
                        { name: 'Clothes', img: '/assets/evening_dress_product.png' },
                        { name: 'Shoes', img: '/assets/product_sneakers.png' },
                        { name: 'Accesories', img: '/assets/product_leather_bag.png' },
                      ]
                  ).map((cat) => (
                    <div 
                      key={cat.name} 
                      className="category-row-card"
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setShopView('subcategories');
                      }}
                    >
                      <span className="category-row-title">{cat.name}</span>
                      <div className="category-row-img" style={{ backgroundImage: `url('${cat.img}')` }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========= 2. Subcategories Page ========= */}
            {shopView === 'subcategories' && (
              <div>
                <header className="categories-header">
                  <button className="header-icon-btn" onClick={() => setShopView('categories')}>
                    <ChevronLeft size={24} />
                  </button>
                  <span className="header-title-text">{selectedCategory}</span>
                  <button className="header-icon-btn">
                    <Search size={20} />
                  </button>
                </header>

                <div className="subcategories-list-container">
                  <button 
                    className="view-all-pill-button"
                    onClick={() => {
                      setSelectedSubcategory('All');
                      setShopView('catalog');
                    }}
                  >
                    VIEW ALL ITEMS
                  </button>
                  <span className="choose-category-title">Choose category</span>
                  
                  <div className="subcategories-vertical-list">
                    {(() => {
                      const matchingProducts = products.filter((p) => {
                        // 1. Gender check
                        if ((p.gender || 'women') !== selectedGenderTab) return false;
                        
                        // 2. Category check
                        if (selectedCategory === 'Clothes') {
                          return p.category === 'clothes';
                        }
                        if (selectedCategory === 'Shoes') {
                          return p.category === 'shoes';
                        }
                        if (selectedCategory === 'Accesories' || selectedCategory === 'Accessories') {
                          return p.category === 'accessories';
                        }
                        if (selectedCategory === 'New') {
                          return p.isNew;
                        }
                        return true;
                      });

                      // Extract unique subcategories
                      const uniqueSubs = Array.from(new Set(
                        matchingProducts
                          .map(p => p.subcategory)
                          .filter((sub): sub is string => !!sub && sub !== 'other')
                      ));

                      // Helper to capitalize/format subcategory labels for display
                      const getSubcategoryLabel = (sub: string) => {
                        if (sub === 'shirts') return 'Shirts & Blouses';
                        if (sub === 'sweaters') return 'Cardigans & Sweaters';
                        if (sub === 'outerwear') return 'Outerwear & Jackets';
                        return sub.charAt(0).toUpperCase() + sub.slice(1);
                      };

                      if (uniqueSubs.length === 0) {
                        return (
                          <div style={{ color: 'var(--gray)', padding: '24px 0', textAlign: 'center', fontSize: '14px' }}>
                            No subcategories available for this selection
                          </div>
                        );
                      }

                      return uniqueSubs.map((subcat) => (
                        <div
                          key={subcat}
                          className="subcategory-item-row"
                          onClick={() => {
                            setSelectedSubcategory(subcat);
                            setShopView('catalog');
                          }}
                        >
                          {getSubcategoryLabel(subcat)}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ========= 3. Catalog Page (List or Grid View) ========= */}
            {shopView === 'catalog' && (() => {
              // 1. Get filtered products
              const filtered = products.filter((p) => {
                // Gender check
                if ((p.gender || 'women') !== selectedGenderTab) return false;

                // Category check (Main Category)
                if (selectedCategory === 'Clothes') {
                  if (p.category !== 'clothes') return false;
                } else if (selectedCategory === 'Shoes') {
                  if (p.category !== 'shoes') return false;
                } else if (selectedCategory === 'Accesories' || selectedCategory === 'Accessories') {
                  if (p.category !== 'accessories') return false;
                } else if (selectedCategory === 'New') {
                  if (!p.isNew) return false;
                }

                // Subcategory check
                if (selectedSubcategory && selectedSubcategory !== 'All') {
                  if ((p.subcategory || 'other') !== selectedSubcategory) return false;
                }

                // Price range filter
                if (p.price < activeFilters.priceRange[0] || p.price > activeFilters.priceRange[1]) return false;

                // Color filter
                if (activeFilters.colors.length > 0) {
                  const hasColor = activeFilters.colors.some(c => (p.colors || '').toLowerCase().includes(c.toLowerCase()));
                  if (!hasColor) return false;
                }

                // Size filter
                if (activeFilters.sizes.length > 0) {
                  const hasSize = activeFilters.sizes.some(s => (p.sizes || '').toUpperCase().includes(s.toUpperCase()));
                  if (!hasSize) return false;
                }

                // Brand filter
                if (activeFilters.brands.length > 0) {
                  if (!activeFilters.brands.includes(p.brand)) return false;
                }

                // Search query
                if (searchQuery.trim() !== '') {
                  const query = searchQuery.toLowerCase();
                  const matchesName = p.name.toLowerCase().includes(query);
                  const matchesBrand = p.brand.toLowerCase().includes(query);
                  if (!matchesName && !matchesBrand) return false;
                }

                return true;
              });

              // 2. Sort products
              const sorted = [...filtered].sort((a, b) => {
                if (sortBy === 'price_asc') return a.price - b.price;
                if (sortBy === 'price_desc') return b.price - a.price;
                if (sortBy === 'popular') return b.ratingCount - a.ratingCount;
                if (sortBy === 'reviews') return b.ratingCount - a.ratingCount;
                if (sortBy === 'newest') {
                  if (a.isNew && !b.isNew) return -1;
                  if (!a.isNew && b.isNew) return 1;
                  return b.id - a.id;
                }
                return 0;
              });

              // Get sorting title label
              const getSortLabel = () => {
                if (sortBy === 'popular') return 'Popular';
                if (sortBy === 'newest') return 'Newest';
                if (sortBy === 'reviews') return 'Customer review';
                if (sortBy === 'price_asc') return 'Price: lowest to high';
                if (sortBy === 'price_desc') return 'Price: highest to low';
                return 'Newest';
              };

              const subName = selectedSubcategory || 'All';

              return (
                <div>
                  <header className="catalog-header">
                    <button className="header-icon-btn" onClick={() => setShopView('subcategories')}>
                      <ChevronLeft size={24} />
                    </button>
                    <span className="header-title-text">
                      {subName === 'All' 
                        ? selectedCategory 
                        : (subName === 'shirts' 
                            ? 'Shirts & Blouses' 
                            : subName === 'sweaters' 
                            ? 'Cardigans & Sweaters' 
                            : subName === 'outerwear' 
                            ? 'Outerwear & Jackets' 
                            : subName.charAt(0).toUpperCase() + subName.slice(1))}
                    </span>
                    <button className="header-icon-btn">
                      <Search size={20} />
                    </button>
                  </header>

                  <div className="catalog-controls-container">
                    <div className="subcategories-pills-slider">
                      <button 
                        className={`subcategory-pill-btn ${selectedSubcategory === 'All' ? 'active' : ''}`}
                        onClick={() => setSelectedSubcategory('All')}
                      >
                        All
                      </button>
                      {(() => {
                        const matchingProducts = products.filter((p) => {
                          if ((p.gender || 'women') !== selectedGenderTab) return false;
                          if (selectedCategory === 'Clothes') return p.category === 'clothes';
                          if (selectedCategory === 'Shoes') return p.category === 'shoes';
                          if (selectedCategory === 'Accesories' || selectedCategory === 'Accessories') return p.category === 'accessories';
                          if (selectedCategory === 'New') return p.isNew;
                          return true;
                        });

                        const uniqueSubs = Array.from(new Set(
                          matchingProducts
                            .map(p => p.subcategory)
                            .filter((sub): sub is string => !!sub && sub !== 'other')
                        ));

                        const getSubcategoryLabel = (sub: string) => {
                          if (sub === 'shirts') return 'Shirts & Blouses';
                          if (sub === 'sweaters') return 'Cardigans & Sweaters';
                          if (sub === 'outerwear') return 'Outerwear & Jackets';
                          return sub.charAt(0).toUpperCase() + sub.slice(1);
                        };

                        return uniqueSubs.map((subcat) => (
                          <button
                            key={subcat}
                            className={`subcategory-pill-btn ${selectedSubcategory === subcat ? 'active' : ''}`}
                            onClick={() => setSelectedSubcategory(subcat)}
                          >
                            {getSubcategoryLabel(subcat)}
                          </button>
                        ));
                      })()}
                    </div>

                    <div className="controls-toolbar-row">
                      <button 
                        className="control-item-trigger"
                        onClick={() => {
                          setTempFilters({ ...activeFilters });
                          setShowFilterScreen(true);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="4" y1="21" x2="4" y2="14" />
                          <line x1="4" y1="10" x2="4" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12" y2="3" />
                          <line x1="20" y1="21" x2="20" y2="16" />
                          <line x1="20" y1="12" x2="20" y2="3" />
                          <line x1="1" y1="14" x2="7" y2="14" />
                          <line x1="9" y1="8" x2="15" y2="8" />
                          <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                        Filters
                      </button>

                      <button className="control-item-trigger" onClick={() => setShowSortSheet(true)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 16 3 21 8 21" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                          <polyline points="21 8 21 3 16 3" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                        </svg>
                        {getSortLabel()}
                      </button>

                      <button className="layout-toggle-btn" onClick={() => setLayoutMode(layoutMode === 'grid' ? 'list' : 'grid')}>
                        {layoutMode === 'grid' ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Empty State */}
                  {sorted.length === 0 ? (
                    <div className="empty-catalog-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <h3 className="empty-state-title">No matches found</h3>
                      <p className="empty-state-desc">We couldn't find any products fitting these search criteria. Try adjusting or resetting filters.</p>
                      <button 
                        className="empty-state-reset-btn"
                        onClick={() => {
                          setActiveFilters({
                            priceRange: [0, 200],
                            colors: [],
                            sizes: [],
                            category: 'All',
                            brands: [],
                          });
                          setSearchQuery('');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : layoutMode === 'grid' ? (
                    /* Grid Layout format */
                    <div className="catalog-grid-feed">
                      {sorted.map((prod) => (
                        <div key={prod.id} className="catalog-grid-card">
                          <div className="grid-card-img-wrapper">
                            <img src={prod.imageUrl} alt={prod.name} className="grid-card-img" />
                            {prod.isSale && prod.discountPercent && (
                              <span className="discount-badge-red">-{prod.discountPercent}%</span>
                            )}
                            {prod.isNew && !prod.isSale && (
                              <span className="new-badge-black">NEW</span>
                            )}
                            <button 
                              className={`favorite-circle-btn ${favorites.includes(prod.id) ? 'active' : ''}`}
                              onClick={(e) => toggleFavorite(prod.id, e)}
                            >
                              <Heart className="heart-icon" />
                            </button>
                          </div>
                          <div className="grid-card-meta">
                            {renderStars(prod.rating, prod.ratingCount)}
                            <span className="brand-label-text">{prod.brand}</span>
                            <h3 className="product-title-text">{prod.name}</h3>
                            <div className="price-row-wrap">
                              {prod.isSale && prod.originalPrice ? (
                                <>
                                  <span className="price-discount">${prod.price}</span>
                                  <span className="price-old">${prod.originalPrice}</span>
                                </>
                              ) : (
                                <span className="price-regular">${prod.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List Layout format */
                    <div className="catalog-list-feed">
                      {sorted.map((prod) => (
                        <div key={prod.id} className="catalog-list-card">
                          <div className="list-card-img-wrapper">
                            <img src={prod.imageUrl} alt={prod.name} className="list-card-img" />
                            {prod.isSale && prod.discountPercent && (
                              <span className="discount-badge-red">-{prod.discountPercent}%</span>
                            )}
                          </div>
                          <div className="list-card-meta">
                            <div className="list-card-header">
                              <span className="brand-label-text">{prod.brand}</span>
                              <h3 className="list-card-title-text">{prod.name}</h3>
                              {renderStars(prod.rating, prod.ratingCount)}
                            </div>
                            <div className="price-row-wrap">
                              {prod.isSale && prod.originalPrice ? (
                                <>
                                  <span className="price-discount">${prod.price}</span>
                                  <span className="price-old">${prod.originalPrice}</span>
                                </>
                              ) : (
                                <span className="price-regular">${prod.price}</span>
                              )}
                            </div>
                            <button 
                              className={`list-card-favorite-btn ${favorites.includes(prod.id) ? 'active' : ''}`}
                              onClick={(e) => toggleFavorite(prod.id, e)}
                            >
                              <Heart className="heart-icon" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
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

      {/* ========= SORT BY BOTTOM SHEET (Milestone 3) ========= */}
      {showSortSheet && (
        <div className="sort-sheet-overlay" onClick={() => setShowSortSheet(false)}>
          <div className="sort-sheet-card" onClick={(e) => e.stopPropagation()}>
            <div className="sort-sheet-handle" />
            <h3 className="sort-sheet-title">Sort by</h3>
            <div className="sort-options-list">
              {[
                { value: 'popular', label: 'Popular' },
                { value: 'newest', label: 'Newest' },
                { value: 'reviews', label: 'Customer review' },
                { value: 'price_asc', label: 'Price: lowest to high' },
                { value: 'price_desc', label: 'Price: highest to low' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  className={`sort-option-row ${sortBy === opt.value ? 'active' : ''}`}
                  onClick={() => {
                    setSortBy(opt.value as any);
                    setShowSortSheet(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button className="sort-sheet-cancel-btn" onClick={() => setShowSortSheet(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ========= FILTERS OVERLAY SCREEN (Milestone 3) ========= */}
      {showFilterScreen && (
        <div className="filters-overlay-wrapper">
          <div className="filters-overlay-backdrop" onClick={() => setShowFilterScreen(false)} />
          <div className="filters-overlay-card">
            
            {/* --- SUB-SCREEN: Brand Selection Checklist --- */}
            {brandFilterActive ? (
              <div className="brand-filter-subscreen">
                <header className="filters-overlay-header">
                  <button className="header-icon-btn" onClick={() => setBrandFilterActive(false)}>
                    <ChevronLeft size={24} />
                  </button>
                  <span className="header-title-text">Brand</span>
                  <div style={{ width: '36px' }} /> {/* empty spacing */}
                </header>

                <div className="brand-search-wrapper">
                  <div className="brand-search-box">
                    <Search size={16} className="brand-search-icon" />
                    <input 
                      type="text" 
                      className="brand-search-input" 
                      placeholder="Search" 
                      value={brandSearchQuery}
                      onChange={(e) => setBrandSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="brand-checklist-scroll">
                  {[
                    'Dorothy Perkins',
                    'Sitlly',
                    'Mango',
                    'H&M',
                    'Zara',
                    'Nike',
                    'adidas Originals',
                    'Jack & Jones',
                    's.Oliver'
                  ]
                    .filter(b => b.toLowerCase().includes(brandSearchQuery.toLowerCase()))
                    .map((brandName) => {
                      const isSelected = tempFilters.brands.includes(brandName);
                      return (
                        <div 
                          key={brandName}
                          className={`brand-checklist-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (isSelected) {
                              setTempFilters({
                                ...tempFilters,
                                brands: tempFilters.brands.filter(b => b !== brandName)
                              });
                            } else {
                              setTempFilters({
                                ...tempFilters,
                                brands: [...tempFilters.brands, brandName]
                              });
                            }
                          }}
                        >
                          <span className="brand-name-text">{brandName}</span>
                          <div className="brand-checkbox">
                            {isSelected && <Check size={14} color="#FFF" />}
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="sticky-filter-bottom-bar">
                  <button className="filter-btn-discard" onClick={() => setBrandFilterActive(false)}>
                    Back
                  </button>
                  <button className="filter-btn-apply" onClick={() => setBrandFilterActive(false)}>
                    Apply
                  </button>
                </div>
              </div>
            ) : (
              /* --- MAIN SCREEN: Filter Form Details --- */
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <header className="filters-overlay-header">
                  <button className="header-icon-btn" onClick={() => setShowFilterScreen(false)}>
                    <X size={24} />
                  </button>
                  <span className="header-title-text">Filters</span>
                  <div style={{ width: '36px' }} /> {/* empty spacing */}
                </header>

                <div className="filters-scroll-area">
                  {/* Section 1: Price Range */}
                  <div>
                    <h4 className="filters-section-title">Price range</h4>
                    <div className="price-range-inputs">
                      <div className="price-range-box">${tempFilters.priceRange[0]}</div>
                      <span style={{ color: 'var(--gray)' }}>-</span>
                      <div className="price-range-box">${tempFilters.priceRange[1]}</div>
                    </div>
                    <div style={{ padding: '0 8px' }}>
                      <input 
                        type="range"
                        min="0"
                        max="200"
                        value={tempFilters.priceRange[1]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setTempFilters({
                            ...tempFilters,
                            priceRange: [tempFilters.priceRange[0], val]
                          });
                        }}
                        style={{ width: '100%', accentColor: 'var(--accent)' }}
                      />
                    </div>
                  </div>

                  {/* Section 2: Colors */}
                  <div>
                    <h4 className="filters-section-title">Colors</h4>
                    <div className="color-swatches-grid">
                      {[
                        { name: 'black', hex: '#222222' },
                        { name: 'white', hex: '#FFFFFF' },
                        { name: 'red', hex: '#DB3022' },
                        { name: 'blue', hex: '#1F51FF' },
                        { name: 'grey', hex: '#9B9B9B' },
                        { name: 'tan', hex: '#D2B48C' }
                      ].map((col) => {
                        const isSelected = tempFilters.colors.includes(col.name);
                        return (
                          <div
                            key={col.name}
                            className={`color-swatch-circle ${isSelected ? 'selected' : ''}`}
                            style={{ backgroundColor: col.hex }}
                            onClick={() => {
                              if (isSelected) {
                                setTempFilters({
                                  ...tempFilters,
                                  colors: tempFilters.colors.filter(c => c !== col.name)
                                });
                              } else {
                                setTempFilters({
                                  ...tempFilters,
                                  colors: [...tempFilters.colors, col.name]
                                });
                              }
                            }}
                            title={col.name}
                          >
                            {col.name === 'white' && isSelected && <Check size={16} color="#000" />}
                            {col.name !== 'white' && isSelected && <Check size={16} color="#FFF" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 3: Sizes */}
                  <div>
                    <h4 className="filters-section-title">Sizes</h4>
                    <div className="sizes-grid-options">
                      {['XS', 'S', 'M', 'L', 'XL'].map((sz) => {
                        const isSelected = tempFilters.sizes.includes(sz);
                        return (
                          <button
                            key={sz}
                            type="button"
                            className={`size-square-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              if (isSelected) {
                                setTempFilters({
                                  ...tempFilters,
                                  sizes: tempFilters.sizes.filter(s => s !== sz)
                                });
                              } else {
                                setTempFilters({
                                  ...tempFilters,
                                  sizes: [...tempFilters.sizes, sz]
                                });
                              }
                            }}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Category */}
                  <div>
                    <h4 className="filters-section-title">Category</h4>
                    <div className="category-filter-options">
                      {['All', 'Women', 'Men', 'Boys', 'Girls'].map((catName) => {
                        const isSelected = tempFilters.category === catName;
                        return (
                          <button
                            key={catName}
                            type="button"
                            className={`category-filter-capsule ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              setTempFilters({
                                ...tempFilters,
                                category: catName
                              });
                            }}
                          >
                            {catName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 5: Brand Link */}
                  <div className="brand-filter-trigger-row" onClick={() => { setBrandSearchQuery(''); setBrandFilterActive(true); }}>
                    <div className="brand-trigger-details">
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)' }}>Brand</span>
                      <span className="brand-trigger-subtext">
                        {tempFilters.brands.length > 0 ? tempFilters.brands.join(', ') : 'All brands'}
                      </span>
                    </div>
                    <ArrowRight size={18} color="var(--gray)" />
                  </div>
                </div>

                <div className="sticky-filter-bottom-bar">
                  <button 
                    className="filter-btn-discard" 
                    onClick={() => {
                      setTempFilters({
                        priceRange: [0, 200],
                        colors: [],
                        sizes: [],
                        category: 'All',
                        brands: [],
                      });
                    }}
                  >
                    Discard
                  </button>
                  <button 
                    className="filter-btn-apply"
                    onClick={() => {
                      setActiveFilters({ ...tempFilters });
                      setShowFilterScreen(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========= GOOGLE ACCOUNT CHOOSER MODAL (Milestone 2.0) ========= */}
      {showGoogleModal && (
        <div className="google-modal-overlay" onClick={() => setShowGoogleModal(false)}>
          <div className="google-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="google-modal-header">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <h3>Sign in with Google</h3>
              <p>to continue to E-Shop</p>
            </div>
            
            <div className="google-accounts-list">
              <div 
                className="google-account-item"
                onClick={() => handleGoogleLogin('Nutnell User', 'nutnell@gmail.com')}
              >
                <div className="google-avatar-circle">N</div>
                <div className="google-account-details">
                  <span className="google-account-name">Nutnell User</span>
                  <span className="google-account-email">nutnell@gmail.com</span>
                </div>
              </div>

              <div 
                className="google-account-item"
                onClick={() => handleGoogleLogin('John Doe', 'johndoe@gmail.com')}
              >
                <div className="google-avatar-circle" style={{ backgroundColor: '#34A853' }}>J</div>
                <div className="google-account-details">
                  <span className="google-account-name">John Doe</span>
                  <span className="google-account-email">johndoe@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="google-custom-section">
              <span className="google-custom-title">Use another email address:</span>
              <div className="google-custom-row">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={googleCustomEmail}
                  className="google-custom-input"
                  onChange={(e) => setGoogleCustomEmail(e.target.value)}
                />
                <button 
                  disabled={!googleCustomEmail.includes('@')}
                  className="google-custom-btn"
                  onClick={() => {
                    const localPart = googleCustomEmail.split('@')[0];
                    const capitalizedName = localPart.charAt(0).toUpperCase() + localPart.slice(1);
                    handleGoogleLogin(capitalizedName, googleCustomEmail);
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
            
            <button className="google-modal-close" onClick={() => setShowGoogleModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
