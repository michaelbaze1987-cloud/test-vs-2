import { updateStorefrontSettingsAction } from "@/actions/admin/update-storefront-settings";
import type { StorefrontConfig } from "@/lib/storefront-config";

type StorefrontSettingsFormProps = {
  config: StorefrontConfig;
};

export function StorefrontSettingsForm({ config }: StorefrontSettingsFormProps) {
  return (
    <form action={updateStorefrontSettingsAction} className="panel-grid gap-6">
      <section className="glass-panel space-y-5 p-6">
        <div>
          <p className="section-kicker">Identite</p>
          <h2 className="section-title">Configuration de la boutique</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Nom de la boutique
            <input className="field" name="storeName" defaultValue={config.storeName} required />
          </label>

          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Slogan
            <input className="field" name="slogan" defaultValue={config.slogan} required />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Emplacement
            <input className="field" name="location" defaultValue={config.location} required />
          </label>

          <label className="space-y-2 text-sm font-medium">
            URL du logo
            <input className="field" name="logoUrl" type="url" defaultValue={config.logoUrl} placeholder="https://..." />
          </label>

          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Charger un logo
            <input className="field file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/15 file:px-4 file:py-2 file:text-cyan-100" name="logoFile" type="file" accept="image/*" />
          </label>

          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Vitesse du slideshow hero (millisecondes)
            <input
              className="field"
              name="heroAutoplayMs"
              type="number"
              min={2500}
              max={12000}
              step={500}
              defaultValue={config.heroAutoplayMs}
            />
          </label>
        </div>
      </section>

      <section className="glass-panel space-y-5 p-6">
        <div>
          <p className="section-kicker">Visuels hero</p>
          <h2 className="section-title">Bannieres et ambiance</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/30 p-4">
              <p className="text-sm font-medium text-slate-100">Banniere {index + 1}</p>
              <img
                src={config.bannerUrls[index] || "https://placehold.co/800x500/0f172a/e2e8f0?text=Banner"}
                alt={`Banniere ${index + 1}`}
                className="h-36 w-full rounded-2xl object-cover"
              />
              <input className="field" name={`bannerUrl${index + 1}`} defaultValue={config.bannerUrls[index] ?? ""} placeholder="https://..." />
              <input className="field file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/15 file:px-4 file:py-2 file:text-cyan-100" name={`bannerFile${index + 1}`} type="file" accept="image/*" />
            </div>
          ))}
        </div>

        <button className="btn btn-primary" type="submit">
          Enregistrer la configuration
        </button>
      </section>
    </form>
  );
}
