import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type StorefrontConfig = {
  storeName: string;
  slogan: string;
  location: string;
  logoUrl: string;
  bannerUrls: string[];
  heroAutoplayMs: number;
  updatedAt: string;
};

const configPath = path.join(process.cwd(), "data", "storefront.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

const defaultConfig: StorefrontConfig = {
  storeName: "Petits Lutins Malin",
  slogan: "Le dropshipping electronique premium, rapide et intelligent.",
  location: "Lyon, France",
  logoUrl: "",
  bannerUrls: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1600&auto=format&fit=crop",
  ],
  heroAutoplayMs: 4500,
  updatedAt: new Date().toISOString(),
};

async function ensureParentDirs() {
  await mkdir(path.dirname(configPath), { recursive: true });
  await mkdir(uploadsDir, { recursive: true });
}

export async function getStorefrontConfig(): Promise<StorefrontConfig> {
  await ensureParentDirs();

  try {
    const raw = await readFile(configPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<StorefrontConfig>;

    return {
      ...defaultConfig,
      ...parsed,
      heroAutoplayMs:
        typeof parsed.heroAutoplayMs === "number" && Number.isFinite(parsed.heroAutoplayMs)
          ? parsed.heroAutoplayMs
          : defaultConfig.heroAutoplayMs,
      bannerUrls:
        parsed.bannerUrls && parsed.bannerUrls.length > 0
          ? parsed.bannerUrls.filter(Boolean)
          : defaultConfig.bannerUrls,
    };
  } catch {
    await saveStorefrontConfig(defaultConfig);
    return defaultConfig;
  }
}

export async function saveStorefrontConfig(
  input: StorefrontConfig,
): Promise<StorefrontConfig> {
  await ensureParentDirs();
  const nextConfig = {
    ...input,
    heroAutoplayMs: Math.min(12000, Math.max(2500, Math.round(input.heroAutoplayMs))),
    bannerUrls: input.bannerUrls.filter(Boolean).slice(0, 4),
    updatedAt: new Date().toISOString(),
  };

  await writeFile(configPath, JSON.stringify(nextConfig, null, 2), "utf8");
  return nextConfig;
}

export async function saveUploadedAsset(file: File, prefix: string) {
  if (!file || file.size === 0) {
    return "";
  }

  await ensureParentDirs();

  const extension =
    file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase() : ".bin";
  const safePrefix = prefix.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
  const filename = `${safePrefix}-${Date.now()}${extension}`;
  const targetPath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(targetPath, buffer);

  return `/uploads/${filename}`;
}
