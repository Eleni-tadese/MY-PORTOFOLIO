import { v2 as cloudinary } from "cloudinary";

/** Server-only Cloudinary helpers. Credentials come from environment variables. */

export type UploadKind = "image" | "cv" | "video";

const FOLDERS: Record<UploadKind, { folder: string; resourceType: "image" | "raw" | "video" }> = {
  image: { folder: "portfolio/images", resourceType: "image" },
  cv: { folder: "portfolio/cv", resourceType: "raw" },
  video: { folder: "portfolio/videos", resourceType: "video" },
};

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/** Signature for a direct browser → Cloudinary upload into a fixed folder. */
export function signUpload(kind: UploadKind) {
  configure();
  const { folder, resourceType } = FOLDERS[kind];
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    process.env.CLOUDINARY_API_SECRET as string
  );
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    folder,
    resourceType,
    timestamp,
    signature,
  };
}

/** Best-effort delete of assets that are no longer referenced. */
export async function destroyAssets(publicIds: (string | null | undefined)[], kind: UploadKind = "image") {
  const ids = publicIds.filter((id): id is string => Boolean(id));
  if (!ids.length || !isCloudinaryConfigured()) return;
  configure();
  const { resourceType } = FOLDERS[kind];
  await Promise.allSettled(
    ids.map((id) => cloudinary.uploader.destroy(id, { resource_type: resourceType, invalidate: true }))
  );
}
