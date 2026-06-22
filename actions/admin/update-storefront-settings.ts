"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/auth-guards";
import {
  getStorefrontConfig,
  saveStorefrontConfig,
  saveUploadedAsset,
} from "@/lib/storefront-config";

export async function updateStorefrontSettingsAction(formData: FormData) {
  await requireRole("ADMIN");

  const current = await getStorefrontConfig();

  const logoFile = formData.get("logoFile");
  const bannerFile1 = formData.get("bannerFile1");
  const bannerFile2 = formData.get("bannerFile2");
  const bannerFile3 = formData.get("bannerFile3");

  const uploadedLogo =
    logoFile instanceof File && logoFile.size > 0
      ? await saveUploadedAsset(logoFile, "store-logo")
      : "";

  const uploadedBannerUrls = await Promise.all(
    [bannerFile1, bannerFile2, bannerFile3].map(async (entry, index) => {
      if (entry instanceof File && entry.size > 0) {
        return saveUploadedAsset(entry, `banner-${index + 1}`);
      }

      return "";
    }),
  );

  const manualBannerUrls = [
    String(formData.get("bannerUrl1") ?? "").trim(),
    String(formData.get("bannerUrl2") ?? "").trim(),
    String(formData.get("bannerUrl3") ?? "").trim(),
  ].filter(Boolean);

  const nextBannerUrls = [...uploadedBannerUrls.filter(Boolean), ...manualBannerUrls];

  await saveStorefrontConfig({
    ...current,
    storeName: String(formData.get("storeName") ?? current.storeName).trim() || current.storeName,
    slogan: String(formData.get("slogan") ?? current.slogan).trim() || current.slogan,
    location: String(formData.get("location") ?? current.location).trim() || current.location,
    logoUrl: uploadedLogo || String(formData.get("logoUrl") ?? "").trim() || current.logoUrl,
    bannerUrls: nextBannerUrls.length > 0 ? nextBannerUrls : current.bannerUrls,
    heroAutoplayMs: Number(formData.get("heroAutoplayMs") ?? current.heroAutoplayMs),
    updatedAt: current.updatedAt,
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/settings");
}
