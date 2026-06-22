import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function Cart({ user, onCartUpdate }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/${user.id}`);
      setCart(response.data);
    } catch (err) {
      setError('Unable to load cart.');
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.post(`${API_URL}/cart/${user.id}/remove`, { productId });
      fetchCart();
      onCartUpdate();
    } catch (err) {
      setError('Unable to remove item.');
      console.error(err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.post(`${API_URL}/cart/${user.id}/update`, { productId, quantity });
      fetchCart();
      onCartUpdate();
    } catch (err) {
      setError('Unable to update quantity.');
      console.error(err);
    }
  };

  if (!user) {
    return <section className="page">Redirecting to login...</section>;
  }

  return (
    <section className="page">
      <h2>Your cart</h2>
      {error && <div className="alert">{error}</div>}
      {cart.items.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Browse products.</Link></p>
      ) : (
        <>
          {cart.items.map((line) => (
            <div key={line.product.id} className="cart-item">
              <img src={line.product.image} alt={line.product.name} />
              <div>
                <h3>{line.product.name}</h3>
                <p className="text-muted">${line.product.price.toFixed(2)} each</p>
                <div className="form-group">
                  <label htmlFor={`qty-${line.product.id}`}>Quantity</label>
                  <input
                    id={`qty-${line.product.id}`}
                    type="number"
                    min="1"
                    value={line.quantity}
                    onChange={(e) => updateQuantity(line.product.id, Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <button className="button secondary" onClick={() => removeItem(line.product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div>
              <h3>Total</h3>
              <p>${cart.total.toFixed(2)}</p>
            </div>
            <Link className="button" to="/checkout">
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
