export const metadata = {
  title: "Conditions generales de vente",
};

export default function ConditionsGeneralesDeVentePage() {
  return (
    <section className="glass-panel mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <p className="section-kicker">Cadre contractuel</p>
        <h1 className="section-title text-white">Conditions generales de vente</h1>
      </div>

      <div className="space-y-5 text-sm leading-7 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">Objet</h2>
          <p>
            Les presentes CGV regissent les ventes conclues a distance entre TechBoutik et tout
            client achetant un produit via la boutique en ligne.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Produits et disponibilite</h2>
          <p>
            Les produits proposes concernent principalement l'electronique grand public, les
            accessoires IT et les produits connectes. Les stocks affiches peuvent evoluer selon les
            disponibilites des fournisseurs de dropshipping.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Prix et paiement</h2>
          <p>
            Les prix sont affiches en euros TTC sauf mention contraire. Le paiement est exigible a
            la commande. En environnement de production, le paiement pourra etre securise via un
            prestataire tel que Stripe.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Livraison</h2>
          <p>
            Les delais de livraison dependent de l'acheminement par les partenaires logistiques et
            les fournisseurs. Un suivi de commande est mis a disposition du client depuis son
            espace commande lorsque celui-ci est disponible.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Retours et reclamations</h2>
          <p>
            Toute reclamation relative a un produit recu endommage ou non conforme doit etre adressee
            dans un delai raisonnable avec preuves a l'appui. Les modalites precises de retour et de
            remboursement sont traitees au cas par cas selon la nature du produit et le fournisseur.
          </p>
        </section>
      </div>
    </section>
  );
}
