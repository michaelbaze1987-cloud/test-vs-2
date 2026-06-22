import Link from "next/link";

import { HeroSlideshow } from "@/components/storefront/hero-slideshow";
import { getAllCategories, getFeaturedProducts } from "@/lib/catalog";
import { getStorefrontConfig } from "@/lib/storefront-config";

export default async function HomePage() {
  const [featuredProducts, categories, config] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
    getStorefrontConfig(),
  ]);

  return (
    <section className="space-y-10">
      <HeroSlideshow
        storeName={config.storeName}
        slogan={config.slogan}
        slides={config.bannerUrls}
        autoplayMs={config.heroAutoplayMs}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-kicker">Selection</p>
            <h2 className="section-title text-white">Produits a la une</h2>
          </div>
          <Link href="/products" className="text-sm font-medium text-cyan-200">
            Tout voir
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article key={product.id} className="glass-panel overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="h-52 w-full object-cover" />
              <div className="space-y-3 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">{product.category.name}</p>
                <h3 className="line-clamp-2 text-lg font-semibold text-white">{product.name}</h3>
                <p className="text-sm text-slate-300">{product.description.slice(0, 84)}...</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-cyan-200">{Number(product.price).toFixed(2)} EUR</p>
                  <Link href={`/products/${product.slug}`} className="btn btn-secondary text-sm">
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel space-y-4 p-6">
        <div>
          <p className="section-kicker">Navigation</p>
          <h2 className="section-title text-white">Explorer les categories</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass-panel p-6">
          <p className="section-kicker">Operations</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Sourcing agile</h3>
          <p className="mt-2 text-sm text-slate-300">
            Catalogue pilotable par fournisseur avec marge et visuels administrables sans base.
          </p>
        </div>
        <div className="glass-panel p-6">
          <p className="section-kicker">Experience</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Parcours client clarifie</h3>
          <p className="mt-2 text-sm text-slate-300">
            Panier, paiement puis suivi de commande visible de la preparation a la livraison.
          </p>
        </div>
        <div className="glass-panel p-6">
          <p className="section-kicker">Identite</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Branding administrable</h3>
          <p className="mt-2 text-sm text-slate-300">
            Logo, slogan, localisation et bannieres modifiables directement depuis l'administration.
          </p>
        </div>
      </div>
    </section>
  );
}
