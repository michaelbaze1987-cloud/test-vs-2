import { unstable_cache } from "next/cache";

import {
  getAllCategories as getAllCategoriesFromStore,
  getAllProducts as getAllProductsFromStore,
  getFeaturedProducts as getFeaturedProductsFromStore,
  getProductBySlug as getProductBySlugFromStore,
  getProductsByCategorySlug as getProductsByCategorySlugFromStore,
} from "@/lib/mock-store";

export const getFeaturedProducts = unstable_cache(
  async () => {
    return getFeaturedProductsFromStore();
  },
  ["featured-products"],
  { revalidate: 300, tags: ["products"] },
);

export const getAllProducts = unstable_cache(
  async () => {
    return getAllProductsFromStore();
  },
  ["all-products"],
  { revalidate: 300, tags: ["products"] },
);

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    return getProductBySlugFromStore(slug);
  },
  ["product-by-slug"],
  { revalidate: 300, tags: ["products"] },
);

export const getAllCategories = unstable_cache(
  async () => {
    return getAllCategoriesFromStore();
  },
  ["all-categories"],
  { revalidate: 1800, tags: ["categories"] },
);

export const getProductsByCategorySlug = unstable_cache(
  async (slug: string) => {
    return getProductsByCategorySlugFromStore(slug);
  },
  ["products-by-category"],
  { revalidate: 300, tags: ["products", "categories"] },
);
