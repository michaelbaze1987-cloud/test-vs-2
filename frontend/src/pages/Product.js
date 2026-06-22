import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function Product({ user, onCartUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`).then((response) => setProduct(response.data)).catch(console.error);
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_URL}/cart/${user.id}/add`, { productId: product.id, quantity });
      onCartUpdate();
      setError('Product added to cart successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to add product to cart.');
    }
  };

  if (!product) {
    return <section className="page">Loading product...</section>;
  }

  return (
    <section className="page">
      {error && <div className="alert">{error}</div>}
      <div className="grid">
        <div className="card">
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <h2>{product.name}</h2>
          <p className="text-muted">Category: {product.category}</p>
          <p>{product.description}</p>
          <p className="card-title">${product.price.toFixed(2)}</p>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
          <button className="button" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
