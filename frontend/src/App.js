import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function App() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    } else {
      setCartCount(0);
    }
  }, [user]);

  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/cart/${userId}`);
      const count = response.data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  return (
    <div className="app-shell">
      <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/product/:id" element={<Product user={user} onCartUpdate={() => user && fetchCart(user.id)} />} />
          <Route path="/cart" element={<Cart user={user} onCartUpdate={() => user && fetchCart(user.id)} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/checkout" element={<Checkout user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
