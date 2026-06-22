export type Role = "CUSTOMER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SupplierProduct = {
  id: string;
  productId: string;
  supplier: string;
  externalId: string;
  costPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
};

export type ProductView = Product & {
  category: Category;
  supplierProduct: SupplierProduct | null;
};

export type CartItemView = CartItem & {
  product: ProductView;
};

export type CartView = Cart & {
  items: CartItemView[];
};

export type OrderView = Order & {
  user: Pick<User, "id" | "name" | "email" | "role">;
  items: Array<OrderItem & { product: ProductView }>;
};
