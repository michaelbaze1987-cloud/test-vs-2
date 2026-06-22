import Link from "next/link";

import type { StorefrontConfig } from "@/lib/storefront-config";

type StorefrontFooterProps = {
  config: StorefrontConfig;
};

const partnerLinks = [
  { label: "AliExpress", href: "https://www.aliexpress.com" },
  { label: "Temu", href: "https://www.temu.com" },
  { label: "Amazon", href: "https://www.amazon.com" },
  { label: "Fournisseurs prives", href: "/partenaires" },
];

export function StorefrontFooter({ config }: StorefrontFooterProps) {
  return (
    <footer className="dark-surface mt-16 border-t border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <section className="space-y-4">
          <div>
            <p className="section-kicker">{config.location}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{config.storeName}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">{config.slogan}</p>
          </div>
          <p className="text-sm text-slate-400">
            Boutique e-commerce specialisee en electronique, accessoires IT et produits
            high-tech en dropshipping, avec suivi de commande et administration centralisee.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Boutique</h3>
          <nav className="space-y-2 text-sm text-slate-300">
            <Link className="block hover:text-white" href="/products">
              Catalogue
            </Link>
            <Link className="block hover:text-white" href="/cart">
              Panier
            </Link>
            <Link className="block hover:text-white" href="/orders">
              Suivi des commandes
            </Link>
            <Link className="block hover:text-white" href="/societe">
              La societe
            </Link>
          </nav>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Informations</h3>
          <nav className="space-y-2 text-sm text-slate-300">
            <Link className="block hover:text-white" href="/mentions-legales">
              Mentions legales
            </Link>
            <Link className="block hover:text-white" href="/conditions-generales-de-vente">
              Conditions generales de vente
            </Link>
            <Link className="block hover:text-white" href="/politique-de-confidentialite">
              Politique de confidentialite
            </Link>
            <Link className="block hover:text-white" href="/retours-et-remboursements">
              Retours et remboursements
            </Link>
            <Link className="block hover:text-white" href="/faq">
              FAQ / Support
            </Link>
            <Link className="block hover:text-white" href="/partenaires">
              Partenaires
            </Link>
          </nav>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Partenaires</h3>
          <div className="space-y-2 text-sm text-slate-300">
            {partnerLinks.map((partner) => (
              <a
                key={partner.label}
                className="block hover:text-white"
                href={partner.href}
                target={partner.href.startsWith("http") ? "_blank" : undefined}
                rel={partner.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {partner.label}
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="tech-divider" />

      <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {config.storeName}. Tous droits reserves.</p>
        <p>Emplacement de reference: {config.location}. Activite e-commerce et dropshipping high-tech.</p>
      </div>
    </footer>
  );
}
