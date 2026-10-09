import { z } from "zod";
import { isAdmin } from "@/lib/auth";
import { isCloudinaryConfigured, signUpload } from "@/lib/cloudinary";

const body = z.object({ kind: z.enum(["image", "cv", "video"]) });

/** Returns a short-lived signature so the browser can upload straight to Cloudinary. */
export async function POST(request: Request) {
  // proxy.ts already blocks anonymous requests; check again here (defence in depth).
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Only accept same-origin calls from the admin UI.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!isCloudinaryConfigured()) {
    return Response.json(
      { error: "Uploads are not set up yet: add the CLOUDINARY_* environment variables." },
      { status: 503 }
    );
  }

  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });

  return Response.json(signUpload(parsed.data.kind), {
    headers: { "Cache-Control": "no-store" },
  });
}
