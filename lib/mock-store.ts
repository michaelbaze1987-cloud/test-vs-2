import { demoUsers } from "@/lib/demo-users";
import type { Role } from "@/types/domain";

export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SupplierProduct = {
  id: string;
  supplier: string;
  externalId: string;
  costPrice: number;
  productId: string;
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

export type ProductWithRelations = Product & {
  category: Category;
  supplierProduct: SupplierProduct | null;
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

export type CartWithRelations = Cart & {
  items: Array<CartItem & { product: ProductWithRelations }>;
};

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
};

export type Order = {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderWithRelations = Order & {
  user: { id: string; name: string; email: string; role: Role; createdAt: Date };
  items: Array<OrderItem & { product: ProductWithRelations }>;
};

export type OrderTimelineStep = {
  status: OrderStatus;
  label: string;
  description: string;
  at: Date;
  reached: boolean;
  current: boolean;
};

const now = () => new Date();
const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const categories: Category[] = [
  {
    id: "cat-phones",
    name: "Smartphones",
    slug: "smartphones",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "cat-accessories",
    name: "Accessoires IT",
    slug: "accessoires-it",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    createdAt: now(),
    updatedAt: now(),
  },
];

const products: Product[] = [
  {
    id: "prod-1",
    name: "Smartphone Nova X",
    slug: "smartphone-nova-x",
    description: "Smartphone 5G 256 Go avec ecran OLED 6.7 pouces.",
    price: 599,
    stock: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    categoryId: "cat-phones",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-2",
    name: "Casque Orbit ANC",
    slug: "casque-orbit-anc",
    description: "Casque bluetooth reduction active de bruit, autonomie 36h.",
    price: 129,
    stock: 240,
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    categoryId: "cat-audio",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "prod-3",
    name: "Hub USB-C 8-en-1",
    slug: "hub-usb-c-8-en-1",
    description: "Hub aluminium avec HDMI 4K, ethernet et PD 100W.",
    price: 59,
    stock: 340,
    imageUrl:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=1200&auto=format&fit=crop",
    isActive: true,
    categoryId: "cat-accessories",
    createdAt: now(),
    updatedAt: now(),
  },
];

const supplierProducts: SupplierProduct[] = [
  {
    id: "sup-1",
    supplier: "AliExpress",
    externalId: "AX-1001",
    costPrice: 420,
    productId: "prod-1",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "sup-2",
    supplier: "Temu",
    externalId: "TM-8741",
    costPrice: 76,
    productId: "prod-2",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "sup-3",
    supplier: "Amazon Supplier",
    externalId: "AMZ-2122",
    costPrice: 31,
    productId: "prod-3",
    createdAt: now(),
    updatedAt: now(),
  },
];

const carts: Cart[] = [];
const cartItems: CartItem[] = [];
const orders: Order[] = [];
const orderItems: OrderItem[] = [];

function toProductWithRelations(product: Product): ProductWithRelations {
  const category = categories.find((item) => item.id === product.categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  const supplierProduct =
    supplierProducts.find((item) => item.productId === product.id) ?? null;

  return {
    ...product,
    category,
    supplierProduct,
  };
}

export function getFeaturedProducts() {
  return products
    .filter((item) => item.isActive)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8)
    .map(toProductWithRelations);
}

export function getAllProducts() {
  return products
    .filter((item) => item.isActive)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map(toProductWithRelations);
}

export function getAdminProducts() {
  return products
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map(toProductWithRelations);
}

export function getProductBySlug(slug: string) {
  const product = products.find((item) => item.slug === slug && item.isActive);
  return product ? toProductWithRelations(product) : null;
}

export function getProductById(id: string) {
  const product = products.find((item) => item.id === id);
  return product ? toProductWithRelations(product) : null;
}

export function getAdminProductById(id: string) {
  return getProductById(id);
}

export function getAllCategories() {
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
}

export function getProductsByCategorySlug(slug: string) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    return [];
  }

  return products
    .filter((item) => item.isActive && item.categoryId === category.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map(toProductWithRelations);
}

export function createOrGetCategory(name: string, slug: string) {
  const existing = categories.find((item) => item.slug === slug);
  if (existing) {
    return existing;
  }

  const category: Category = {
    id: uid(),
    name,
    slug,
    createdAt: now(),
    updatedAt: now(),
  };

  categories.push(category);
  return category;
}

export function createProduct(input: {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryName: string;
  categorySlug: string;
  supplier: string;
  supplierExternalId: string;
  costPrice: number;
}) {
  const category = createOrGetCategory(input.categoryName, input.categorySlug);

  const product: Product = {
    id: uid(),
    name: input.name,
    slug: input.slug,
    description: input.description,
    imageUrl: input.imageUrl,
    price: input.price,
    stock: input.stock,
    isActive: true,
    categoryId: category.id,
    createdAt: now(),
    updatedAt: now(),
  };

  const supplierProduct: SupplierProduct = {
    id: uid(),
    supplier: input.supplier,
    externalId: input.supplierExternalId,
    costPrice: input.costPrice,
    productId: product.id,
    createdAt: now(),
    updatedAt: now(),
  };

  products.push(product);
  supplierProducts.push(supplierProduct);

  return toProductWithRelations(product);
}

export function updateProduct(
  productId: string,
  input: {
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    categoryName: string;
    categorySlug: string;
    supplier: string;
    supplierExternalId: string;
    costPrice: number;
  },
) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const category = createOrGetCategory(input.categoryName, input.categorySlug);

  product.name = input.name;
  product.slug = input.slug;
  product.description = input.description;
  product.imageUrl = input.imageUrl;
  product.price = input.price;
  product.stock = input.stock;
  product.categoryId = category.id;
  product.updatedAt = now();

  const existingSupplier = supplierProducts.find((item) => item.productId === product.id);

  if (existingSupplier) {
    existingSupplier.supplier = input.supplier;
    existingSupplier.externalId = input.supplierExternalId;
    existingSupplier.costPrice = input.costPrice;
    existingSupplier.updatedAt = now();
  } else {
    supplierProducts.push({
      id: uid(),
      supplier: input.supplier,
      externalId: input.supplierExternalId,
      costPrice: input.costPrice,
      productId: product.id,
      createdAt: now(),
      updatedAt: now(),
    });
  }

  return toProductWithRelations(product);
}

export function deleteProduct(productId: string) {
  const index = products.findIndex((item) => item.id === productId);
  if (index === -1) {
    return;
  }

  products.splice(index, 1);

  const supplierIndex = supplierProducts.findIndex((item) => item.productId === productId);
  if (supplierIndex !== -1) {
    supplierProducts.splice(supplierIndex, 1);
  }

  for (let i = cartItems.length - 1; i >= 0; i -= 1) {
    if (cartItems[i]?.productId === productId) {
      cartItems.splice(i, 1);
    }
  }
}

function getOrCreateCart(userId: string): Cart {
  const existing = carts.find((item) => item.userId === userId);
  if (existing) {
    return existing;
  }

  const cart: Cart = {
    id: uid(),
    userId,
    createdAt: now(),
    updatedAt: now(),
  };

  carts.push(cart);
  return cart;
}

export function addToCart(userId: string, productId: string, quantity: number) {
  const cart = getOrCreateCart(userId);
  cart.updatedAt = now();

  const item = cartItems.find(
    (entry) => entry.cartId === cart.id && entry.productId === productId,
  );

  if (item) {
    item.quantity += quantity;
    item.updatedAt = now();
    return item;
  }

  const newItem: CartItem = {
    id: uid(),
    cartId: cart.id,
    productId,
    quantity,
    createdAt: now(),
    updatedAt: now(),
  };

  cartItems.push(newItem);
  return newItem;
}

export function updateCartQuantity(userId: string, cartItemId: string, quantity: number) {
  const cart = carts.find((entry) => entry.userId === userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cartItems.find(
    (entry) => entry.id === cartItemId && entry.cartId === cart.id,
  );

  if (!item) {
    throw new Error("Cart item not found");
  }

  item.quantity = quantity;
  item.updatedAt = now();
}

export function removeFromCart(userId: string, cartItemId: string) {
  const cart = carts.find((entry) => entry.userId === userId);
  if (!cart) {
    return;
  }

  const index = cartItems.findIndex(
    (entry) => entry.id === cartItemId && entry.cartId === cart.id,
  );

  if (index !== -1) {
    cartItems.splice(index, 1);
  }
}

export function getCartByUserId(userId: string): CartWithRelations | null {
  const cart = carts.find((entry) => entry.userId === userId);
  if (!cart) {
    return null;
  }

  const items = cartItems
    .filter((entry) => entry.cartId === cart.id)
    .map((entry) => {
      const product = getProductById(entry.productId);
      if (!product) {
        throw new Error("Product not found in cart");
      }

      return {
        ...entry,
        product,
      };
    });

  return {
    ...cart,
    items,
  };
}

export function createOrderFromCart(userId: string) {
  const cart = getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw new Error("Le panier est vide");
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const order: Order = {
    id: uid(),
    userId,
    total,
    status: "PENDING",
    createdAt: now(),
    updatedAt: now(),
  };

  orders.push(order);

  for (const item of cart.items) {
    orderItems.push({
      id: uid(),
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
      createdAt: now(),
    });
  }

  for (let i = cartItems.length - 1; i >= 0; i -= 1) {
    if (cartItems[i]?.cartId === cart.id) {
      cartItems.splice(i, 1);
    }
  }

  return order;
}

function resolveOrderStatus(order: Order): OrderStatus {
  if (order.status === "CANCELLED") {
    return "CANCELLED";
  }

  const elapsed = Date.now() - order.createdAt.getTime();

  if (elapsed >= 1000 * 60 * 60 * 24 * 4) {
    return "DELIVERED";
  }

  if (elapsed >= 1000 * 60 * 60 * 24 * 2) {
    return "SHIPPED";
  }

  if (elapsed >= 1000 * 60 * 30) {
    return "PROCESSING";
  }

  return "PENDING";
}

export function getOrderTimeline(order: Order) {
  const currentStatus = resolveOrderStatus(order);
  const base = order.createdAt.getTime();

  const steps: Array<Omit<OrderTimelineStep, "reached" | "current">> = [
    {
      status: "PENDING",
      label: "Commande confirmee",
      description: "Votre paiement a ete enregistre et la commande est creee.",
      at: new Date(base),
    },
    {
      status: "PROCESSING",
      label: "En preparation",
      description: "Le fournisseur prepare votre colis et verifie la disponibilite.",
      at: new Date(base + 1000 * 60 * 30),
    },
    {
      status: "SHIPPED",
      label: "En cours d'acheminement",
      description: "Le colis a ete confie au transporteur international.",
      at: new Date(base + 1000 * 60 * 60 * 24 * 2),
    },
    {
      status: "DELIVERED",
      label: "Livree",
      description: "La commande a ete marquee comme livree a destination.",
      at: new Date(base + 1000 * 60 * 60 * 24 * 4),
    },
  ];

  const currentIndex = steps.findIndex((step) => step.status === currentStatus);

  return steps.map((step, index) => ({
    ...step,
    reached: index <= currentIndex,
    current: index === currentIndex,
  }));
}

export function listOrders(): OrderWithRelations[] {
  return orders
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((order) => {
      const resolvedStatus = resolveOrderStatus(order);
      const user = demoUsers.find((entry) => entry.id === order.userId);
      const mappedUser = user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          }
        : {
            id: order.userId,
            name: "Utilisateur inconnu",
            email: "unknown@demo.local",
            role: "CUSTOMER" as Role,
            createdAt: now(),
          };

      const items = orderItems
        .filter((entry) => entry.orderId === order.id)
        .map((entry) => {
          const product = getProductById(entry.productId);
          if (!product) {
            throw new Error("Product missing for order item");
          }

          return {
            ...entry,
            product,
          };
        });

      return {
        ...order,
        status: resolvedStatus,
        user: mappedUser,
        items,
      };
    });
}

export function listOrdersByUser(userId: string) {
  return listOrders().filter((order) => order.user.id === userId);
}

export function listCustomers() {
  return demoUsers.filter((entry) => entry.role === "CUSTOMER");
}

export function getAdminStats() {
  return {
    products: products.filter((item) => item.isActive).length,
    orders: orders.length,
    customers: listCustomers().length,
  };
}
