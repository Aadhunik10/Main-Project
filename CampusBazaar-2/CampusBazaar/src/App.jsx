import './App.css'
import React, { useEffect, useState } from 'react'
import Allitems from './components/Allitems'
import { Navigate, Route, Routes } from 'react-router-dom';
import Signuppage from './components/Signuppage'
import Loginpage from './components/Loginpage'
import Homepage from './components/Homepage'
import Cart from './components/Cart';
import SellProduct from './components/SellProduct';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function normalizeProduct(product) {
  const imageUrl = product.image && product.image.startsWith('/') ? `${API_BASE_URL}${product.image}` : product.image;
  const listedDate = product.listed_at ? new Date(product.listed_at).toLocaleDateString('en-GB') : '';

  return {
    ...product,
    image: imageUrl,
    listedDate,
    sellerPhone: product.phone || '',
  };
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('campusBazaarLoggedIn') === 'true';
  });
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [cartPulse, setCartPulse] = useState(false);
  const [notification, setNotification] = useState('No notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/`);
      const data = await response.json();
      setProducts(data.map(normalizeProduct));
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (product) => {
    setProducts((previousProducts) => [normalizeProduct(product), ...previousProducts]);
  };

  const handleProductDeleted = async (productId) => {
    const token = localStorage.getItem('campusBazaarToken');
    if (!token) {
      setNotification('Login required to delete item');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setProducts((existingProducts) => existingProducts.filter((product) => product.id !== productId));
      setNotification('Product removed');
    } catch (err) {
      console.error('Unable to delete product:', err);
      setNotification('Unable to delete product');
    }
  };

  const handleLogin = () => {
    localStorage.setItem('campusBazaarLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('campusBazaarLoggedIn');
    localStorage.removeItem('campusBazaarToken');
    setIsAuthenticated(false);
    setNotification('No notifications');
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setNotification(`${product.name} is already in cart`);
      return;
    }

    setCartItems((existingCart) => [...existingCart, { ...product, quantity: 1 }]);

    setCartPulse(true);
    setNotification(`Added ${product.name} to cart`);

    window.setTimeout(() => {
      setCartPulse(false);
    }, 700);
  };

  const toggleFavorite = (productId) => {
    setFavoriteIds((existingFavorites) => {
      if (existingFavorites.includes(productId)) {
        return existingFavorites.filter((id) => id !== productId);
      }

      return [...existingFavorites, productId];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((existingCart) => existingCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((existingCart) =>
      existingCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  };

  const checkoutCart = () => {
    if (cartItems.length === 0) {
      setNotification('Cart is empty');
      return;
    }

    setCartItems([]);
    setNotification('Purchase successful');
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Loginpage onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/" element={
          <Homepage
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            products={products}
            cartItems={cartItems}
            favoriteIds={favoriteIds}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onCheckout={checkoutCart}
            cartPulse={cartPulse}
            notification={notification}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            onDeleteProduct={handleProductDeleted}
          />
        } />
        <Route path="/cart" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
              onCheckout={checkoutCart}
              notification={notification}
              setNotification={setNotification}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              cartPulse={cartPulse}
              favoriteIds={favoriteIds}
            />
          </ProtectedRoute>
        } />
        <Route path="/sellproduct" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SellProduct onProductAdded={handleProductAdded} />
          </ProtectedRoute>
        } />
        <Route path="/allitems" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Allitems
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              products={products}
              cartItems={cartItems}
              favoriteIds={favoriteIds}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              cartPulse={cartPulse}
              notification={notification}
              onCheckout={checkoutCart}
              onSetNotification={setNotification}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
              onDeleteProduct={handleProductDeleted}
            />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
