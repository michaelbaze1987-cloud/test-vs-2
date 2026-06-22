export const metadata = {
  title: "FAQ",
};

const faqs = [
  {
    question: "Quels sont les delais de livraison ?",
    answer:
      "Les delais varient selon le fournisseur et la destination. Le suivi de commande vous permet d'observer l'avancement entre preparation, expedition et livraison.",
  },
  {
    question: "Puis-je modifier ma commande apres paiement ?",
    answer:
      "Une modification est parfois possible tant que la commande n'est pas encore en preparation. Il convient de contacter le support au plus vite.",
  },
  {
    question: "Comment suivre mon colis ?",
    answer:
      "Depuis la rubrique Mes commandes, vous pouvez visualiser le statut de votre commande et l'etape logistique actuelle.",
  },
  {
    question: "Que faire si un produit est defectueux ?",
    answer:
      "Contactez le support avec votre numero de commande, une description precise du probleme et des photos si possible afin d'accelerer la prise en charge.",
  },
];

export default function FaqPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="section-kicker">Support client</p>
        <h1 className="section-title text-white">FAQ</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Retrouvez les reponses aux questions les plus frequentes sur les commandes,
          paiements, livraisons et retours.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="glass-panel p-6">
            <h2 className="text-lg font-semibold text-white">{faq.question}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
