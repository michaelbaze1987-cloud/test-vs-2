export const metadata = {
  title: "Politique de confidentialite",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <section className="glass-panel mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <p className="section-kicker">Protection des donnees</p>
        <h1 className="section-title text-white">Politique de confidentialite</h1>
      </div>

      <div className="space-y-5 text-sm leading-7 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">Donnees collectees</h2>
          <p>
            TechBoutik peut collecter des donnees d'identification, des informations de contact,
            des details de commande ainsi que des donnees techniques liees a la navigation afin
            d'assurer le bon fonctionnement du site et le suivi des achats.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Finalites</h2>
          <p>
            Ces donnees sont utilisees pour gerer les commandes, repondre aux demandes clients,
            ameliorer l'experience utilisateur, prevenir la fraude et garantir le suivi logistique.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Conservation</h2>
          <p>
            En mode demonstration, certaines donnees peuvent etre stockees localement a des fins
            de configuration et de test. En production, les donnees seraient conservees pendant la
            duree necessaire a l'execution des obligations contractuelles et legales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Droits des utilisateurs</h2>
          <p>
            Conformement a la reglementation applicable, chaque utilisateur peut demander l'acces,
            la rectification, la suppression ou la limitation du traitement de ses donnees, sous
            reserve des obligations legales de conservation.
          </p>
        </section>
      </div>
    </section>
  );
}
