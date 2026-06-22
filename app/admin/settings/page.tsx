export const metadata = {
  title: "Admin Parametres",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Parametres de la boutique</h1>
      <div className="card space-y-2 p-5 text-sm text-slate-600">
        <p>Ce module est pret pour brancher:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>cles Stripe/Resend/Cloudinary;</li>
          <li>marges globales et taxes;</li>
          <li>parametrage multi-devise et multi-langue.</li>
        </ul>
      </div>
    </div>
  );
}
