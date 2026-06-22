export const metadata = {
  title: "Retours et remboursements",
};

export default function RetoursEtRemboursementsPage() {
  return (
    <section className="glass-panel mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <p className="section-kicker">Service client</p>
        <h1 className="section-title text-white">Retours et remboursements</h1>
      </div>

      <div className="space-y-5 text-sm leading-7 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">Demande de retour</h2>
          <p>
            Toute demande de retour doit etre effectuee dans un delai raisonnable apres reception
            du produit. Le client doit preciser le numero de commande, le motif du retour et, si
            necessaire, joindre des photos du produit concerne.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Conditions d'acceptation</h2>
          <p>
            Les retours sont examines selon l'etat du produit, le motif invoque et les politiques
            du fournisseur. Les articles endommages, non conformes ou defectueux sont traites en
            priorite avec le support logistique partenaire.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Remboursement</h2>
          <p>
            Lorsqu'un remboursement est accepte, celui-ci est effectue via le moyen de paiement
            utilise lors de la commande, dans les meilleurs delais possibles selon le prestataire
            de paiement et les verifications necessaires.
          </p>
        </section>
      </div>
    </section>
  );
}
