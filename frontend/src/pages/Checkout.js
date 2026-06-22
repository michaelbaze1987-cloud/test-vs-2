import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_1234567890');

function CheckoutForm({ user, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    axios.get(`${API_URL}/cart/${user.id}`).then((response) => setCart(response.data)).catch(console.error);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/payment/checkout`, {
        userId: user.id,
        paymentMethodId: paymentMethod.id
      });
      if (response.data.success) {
        setMessage('Payment completed successfully. Thank you for your order!');
        onSuccess();
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Payment processing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page form-card">
      <h2>Checkout</h2>
      <p>Total payment amount: ${cart.total.toFixed(2)}</p>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card details</label>
          <div style={{ padding: '1rem', border: '1px solid #d1d5db', borderRadius: '12px', background: '#f8fafc' }}>
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          </div>
        </div>
        <button className="button" type="submit" disabled={loading || !stripe}>
          {loading ? 'Processing…' : 'Pay now'}
        </button>
      </form>
    </section>
  );
}

function Checkout({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleSuccess = () => {
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm user={user} onSuccess={handleSuccess} />
    </Elements>
  );
}

export default Checkout;
