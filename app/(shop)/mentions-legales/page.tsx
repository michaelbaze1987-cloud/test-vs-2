export const metadata = {
  title: "Mentions legales",
};

export default function MentionsLegalesPage() {
  return (
    <section className="glass-panel mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <p className="section-kicker">Informations legales</p>
        <h1 className="section-title text-white">Mentions legales</h1>
      </div>

      <div className="space-y-5 text-sm leading-7 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">Editeur du site</h2>
          <p>
            Le site TechBoutik est exploite a titre de demonstration e-commerce par la societe
            TechBoutik SAS, specialisee dans la vente a distance de produits electroniques et IT.
          </p>
          <p>
            Siege social: 18 rue de l'Innovation, 69002 Lyon, France.
            <br />
            Email de contact: contact@techboutik.example
            <br />
            Directeur de la publication: Administration TechBoutik.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Hebergement</h2>
          <p>
            L'application est hebergee sur une infrastructure cloud compatible Next.js. En mode
            demonstration, certaines donnees sont conservees localement afin de permettre la
            configuration du storefront sans base de donnees relationnelle.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Propriete intellectuelle</h2>
          <p>
            L'ensemble des contenus presents sur le site, incluant la charte graphique, les
            textes, visuels, logos et structures fonctionnelles, est protege par le droit de la
            propriete intellectuelle. Toute reproduction ou reutilisation non autorisee est
            interdite.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Responsabilite</h2>
          <p>
            TechBoutik s'efforce d'assurer l'exactitude des informations diffusees sur ses fiches
            produits. Toutefois, des ecarts peuvent subsister en raison des mises a jour des
            fournisseurs partenaires. Les informations contractuelles applicables sont precisees au
            moment de la commande.
          </p>
        </section>
      </div>
    </section>
  );
}
