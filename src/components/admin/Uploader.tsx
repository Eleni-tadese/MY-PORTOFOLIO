"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

type Kind = "image" | "cv" | "video";

const LIMITS: Record<Kind, { accept: string; maxMB: number; types: string[] }> = {
  image: { accept: "image/png,image/jpeg,image/webp,image/avif", maxMB: 8, types: ["image/png", "image/jpeg", "image/webp", "image/avif"] },
  cv: { accept: "application/pdf", maxMB: 10, types: ["application/pdf"] },
  video: { accept: "video/mp4,video/webm", maxMB: 50, types: ["video/mp4", "video/webm"] },
};

export type Uploaded = { url: string; publicId: string };

/** Uploads straight to Cloudinary using a short-lived signature from our server. */
export default function Uploader({
  kind,
  label,
  onUploaded,
  multiple = false,
}: {
  kind: Kind;
  label: string;
  onUploaded: (file: Uploaded) => void;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const limits = LIMITS[kind];

  async function uploadOne(file: File) {
    if (!limits.types.includes(file.type)) throw new Error(`${file.name}: unsupported file type`);
    if (file.size > limits.maxMB * 1024 * 1024) throw new Error(`${file.name}: larger than ${limits.maxMB} MB`);

    const res = await fetch("/api/admin/upload-signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind }),
    });
    const sig = await res.json();
    if (!res.ok) throw new Error(sig.error ?? "Could not start the upload");

    const form = new FormData();
    form.append("file", file);
    form.append("api_key", sig.apiKey);
    form.append("timestamp", String(sig.timestamp));
    form.append("signature", sig.signature);
    form.append("folder", sig.folder);

    const up = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`, {
      method: "POST",
      body: form,
    });
    const data = await up.json();
    if (!up.ok) throw new Error(data.error?.message ?? "Upload failed");
    onUploaded({ url: data.secure_url, publicId: data.public_id });
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    setError("");
    try {
      for (const f of files) await uploadOne(f);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={limits.accept}
        multiple={multiple}
        onChange={onChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm text-fg transition-colors hover:border-lime hover:text-lime disabled:opacity-60"
      >
        {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Upload size={15} aria-hidden />}
        {busy ? "Uploading…" : label}
      </button>
      <p className="mt-1 text-xs text-subtle">
        {kind === "cv" ? "PDF" : kind === "video" ? "MP4 or WebM" : "PNG, JPG, WebP or AVIF"}, up to {limits.maxMB} MB
      </p>
      {error && (
        <p role="alert" className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
