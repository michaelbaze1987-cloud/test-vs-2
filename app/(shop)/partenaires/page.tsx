export const metadata = {
  title: "Partenaires",
};

const partners = [
  {
    name: "AliExpress",
    role: "Marketplace et sourcing catalogue",
    description:
      "Utilise pour identifier des references electroniques, accessoires mobiles et lots a forte rotation.",
  },
  {
    name: "Temu",
    role: "Sourcing prix competitif",
    description:
      "Permet d'elargir l'offre sur les accessoires et les produits a cycle court avec un positionnement tarifaire agressif.",
  },
  {
    name: "Amazon fournisseurs",
    role: "Fournisseurs et cross-check qualite",
    description:
      "Mobilise pour comparer les fiches, verifier les tendances et identifier certains fournisseurs complementaires.",
  },
  {
    name: "Fournisseurs prives",
    role: "Approvisionnement specialise",
    description:
      "Intervenants privilegies pour des gammes plus techniques ou des conditions logistiques ciblees.",
  },
];

export default function PartenairesPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="section-kicker">Reseau supply</p>
        <h1 className="section-title text-white">Partenaires</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          TechBoutik s'appuie sur un ecosysteme de partenaires marketplaces, fournisseurs et
          circuits prives pour faire evoluer son catalogue et maintenir un bon niveau de reactivite.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {partners.map((partner) => (
          <article key={partner.name} className="glass-panel space-y-3 p-6">
            <p className="section-kicker">{partner.role}</p>
            <h2 className="text-2xl font-semibold text-white">{partner.name}</h2>
            <p className="text-sm leading-7 text-slate-300">{partner.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
