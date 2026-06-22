import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, cartCount, onLogout }) {
  return (
    <header className="navbar">
      <div>
        <Link to="/" style={{ fontWeight: '700', fontSize: '1.15rem' }}>
          ElectroShop
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button className="button secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
