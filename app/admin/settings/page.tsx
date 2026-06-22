import { StorefrontSettingsForm } from "@/components/admin/storefront-settings-form";
import { getStorefrontConfig } from "@/lib/storefront-config";

export const metadata = {
  title: "Admin Parametres",
};

export default async function AdminSettingsPage() {
  const config = await getStorefrontConfig();

  return (
    <div className="space-y-6">
      <div>
        <p className="section-kicker">Back office</p>
        <h1 className="section-title text-3xl">Parametres de la boutique</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Configurez l'identite de marque, les bannieres du storefront et le contexte de
          votre boutique sans base de donnees. Les donnees sont conservees localement.
        </p>
      </div>

      <StorefrontSettingsForm config={config} />
    </div>
  );
}
