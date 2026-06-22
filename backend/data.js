const bcrypt = require('bcryptjs');

const products = [
  {
    id: 'p1',
    name: 'Smartphone X12',
    category: 'Phone',
    price: 799,
    image: 'https://via.placeholder.com/400x300?text=Smartphone+X12',
    description: 'Premium 6.5-inch OLED display, 128GB storage, dual camera system.',
    stock: 25
  },
  {
    id: 'p2',
    name: 'UltraBook Pro 14',
    category: 'Laptop',
    price: 1299,
    image: 'https://via.placeholder.com/400x300?text=UltraBook+Pro+14',
    description: 'Lightweight laptop with 16GB RAM, 512GB SSD, and long battery life.',
    stock: 18
  },
  {
    id: 'p3',
    name: 'NoiseCancel 700',
    category: 'Headphones',
    price: 199,
    image: 'https://via.placeholder.com/400x300?text=NoiseCancel+700',
    description: 'Wireless noise-canceling headphones with 30-hour battery life.',
    stock: 40
  },
  {
    id: 'p4',
    name: '4K Smart TV 55"',
    category: 'TV',
    price: 699,
    image: 'https://via.placeholder.com/400x300?text=4K+Smart+TV+55',
    description: '55-inch 4K UHD smart TV with HDR and built-in streaming apps.',
    stock: 12
  },
  {
    id: 'p5',
    name: 'Gaming Console Z',
    category: 'Console',
    price: 499,
    image: 'https://via.placeholder.com/400x300?text=Gaming+Console+Z',
    description: 'Next-gen console with 4K gaming, fast loading, and exclusive titles.',
    stock: 30
  }
];

const users = [
  {
    id: 'u1',
    name: 'Demo User',
    email: 'demo@example.com',
    passwordHash: bcrypt.hashSync('password123', 10)
  }
];

const carts = {
  u1: [
    { productId: 'p1', quantity: 1 }
  ]
};

module.exports = {
  products,
  users,
  carts
};
