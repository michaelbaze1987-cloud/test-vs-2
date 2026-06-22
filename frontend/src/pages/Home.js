import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((response) => setProducts(response.data)).catch(console.error);
  }, []);

  return (
    <section className="page">
      <div className="shop-banner">
        <div>
          <h1>Electronics designed for your lifestyle.</h1>
          <p>Discover phones, laptops, headphones, consoles, and more in one storefront.</p>
        </div>
        <img src="https://via.placeholder.com/420x320?text=Electronics+Deals" alt="Electronics" style={{ borderRadius: '24px', width: '100%', maxWidth: '420px' }} />
      </div>

      <h2>Featured products</h2>
      <div className="grid">
        {products.map((product) => (
          <article key={product.id} className="card">
            <img src={product.image} alt={product.name} />
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-text">{product.description}</p>
              <p className="text-muted">${product.price.toFixed(2)}</p>
              <Link className="button" to={`/product/${product.id}`}>
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
