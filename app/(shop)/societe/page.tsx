export const metadata = {
  title: "La societe",
};

export default function SocietePage() {
  return (
    <section className="glass-panel mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <p className="section-kicker">Entreprise</p>
        <h1 className="section-title text-white">La societe</h1>
      </div>

      <div className="space-y-5 text-sm leading-7 text-slate-300">
        <p>
          TechBoutik developpe une approche e-commerce orientee performance pour la distribution
          de produits electroniques et high-tech. L'objectif est de proposer une experience client
          claire, un catalogue agile et une logistique adaptee aux contraintes du dropshipping.
        </p>

        <p>
          La societe structure ses activites autour de trois axes: selection produit,
          orchestration fournisseurs et suivi client. Cela permet d'ajuster rapidement le
          catalogue aux tendances du marche tout en conservant un pilotage operationnel centralise.
        </p>

        <p>
          Les equipes travaillent avec des partenaires marketplaces et fournisseurs afin de
          maintenir une offre competitive sur les accessoires IT, les objets connectes et les
          produits mobiles.
        </p>
      </div>
    </section>
  );
}
