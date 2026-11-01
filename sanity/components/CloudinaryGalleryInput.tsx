"use client";

import { useCallback, useId, useState } from "react";
import { set, unset, type ArrayOfObjectsInputProps } from "sanity";

type CloudinaryImageValue = {
  _key: string;
  _type: "cloudinaryImage";
  url: string;
  publicId: string;
  width: number;
  height: number;
  alt: string;
};

type SignResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  uploadPreset?: string;
  allowedFormats: string;
  maxFileSizeBytes: number;
};

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  borderRadius: 4,
  border: "1px solid #c92c62",
  background: "#e8457c",
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

/**
 * Custom array input for the `images` field on a Kit document. Uploads go
 * straight to Cloudinary (signed server-side via /api/cloudinary/sign) and
 * the resulting asset data is written into this array — Sanity only ever
 * stores the delivery URL and metadata, never the binary. Built with plain
 * HTML rather than @sanity/ui's layout primitives to avoid fighting their
 * generic prop typing for what is a small, self-contained control.
 */
export function CloudinaryGalleryInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange } = props;
  const items = value as unknown as CloudinaryImageValue[];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  const persist = useCallback(
    (next: CloudinaryImageValue[]) => {
      onChange(next.length > 0 ? set(next) : unset());
    },
    [onChange],
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setUploading(true);
      setError(null);

      try {
        const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
        if (signRes.status === 401) throw new Error("Your session has expired — please sign in again.");
        if (signRes.status === 429) throw new Error("Too many upload requests. Please wait a moment.");
        if (!signRes.ok) throw new Error("Could not get an upload signature.");
        const sign: SignResponse = await signRes.json();

        const allowedExtensions = sign.allowedFormats.split(",");
        const uploaded: CloudinaryImageValue[] = [];
        for (const file of Array.from(fileList)) {
          const extension = file.name.split(".").pop()?.toLowerCase();
          if (!extension || !allowedExtensions.includes(extension)) {
            throw new Error(`${file.name}: only ${sign.allowedFormats} images are allowed.`);
          }
          if (file.size > sign.maxFileSizeBytes) {
            throw new Error(`${file.name} is too large (max ${Math.round(sign.maxFileSizeBytes / (1024 * 1024))}MB).`);
          }

          const formData = new FormData();
          formData.append("file", file);
          formData.append("api_key", sign.apiKey);
          formData.append("timestamp", String(sign.timestamp));
          formData.append("signature", sign.signature);
          formData.append("folder", sign.folder);
          formData.append("allowed_formats", sign.allowedFormats);
          if (sign.uploadPreset) formData.append("upload_preset", sign.uploadPreset);

          const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
            { method: "POST", body: formData },
          );
          if (!uploadRes.ok) throw new Error(`Upload failed for ${file.name}.`);
          const uploadData = await uploadRes.json();

          uploaded.push({
            _key: randomKey(),
            _type: "cloudinaryImage",
            url: uploadData.secure_url,
            publicId: uploadData.public_id,
            width: uploadData.width,
            height: uploadData.height,
            alt: "",
          });
        }

        persist([...items, ...uploaded]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setUploading(false);
      }
    },
    [items, persist],
  );

  const updateAlt = (key: string, alt: string) => {
    persist(items.map((item) => (item._key === key ? { ...item, alt } : item)));
  };

  const remove = (key: string) => {
    persist(items.filter((item) => item._key !== key));
  };

  const move = (key: string, direction: -1 | 1) => {
    const index = items.findIndex((item) => item._key === key);
    const nextIndex = index + direction;
    if (index === -1 || nextIndex < 0 || nextIndex >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(nextIndex, 0, moved!);
    persist(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 12,
          border: "1px solid #e2e2e2",
          borderRadius: 4,
        }}
      >
        <label htmlFor={inputId} style={{ ...buttonStyle, opacity: uploading ? 0.6 : 1 }}>
          {uploading ? "Uploading…" : "Upload images"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          disabled={uploading}
          onChange={(event) => {
            void handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
        {error ? <span style={{ fontSize: 12, color: "#c92c62" }}>{error}</span> : null}
      </div>

      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: "#848484" }}>No images yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
          }}
        >
          {items.map((item, index) => (
            <div key={item._key} style={{ border: "1px solid #e2e2e2", borderRadius: 4, padding: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- Studio-only preview, not part of the Next.js app */}
              <img
                src={item.url}
                alt={item.alt}
                style={{ width: "100%", height: 96, objectFit: "cover", borderRadius: 4 }}
              />
              <input
                type="text"
                placeholder="Alt text"
                value={item.alt}
                onChange={(event) => updateAlt(item._key, event.currentTarget.value)}
                style={{ width: "100%", marginTop: 8, fontSize: 12, padding: "4px 6px" }}
              />
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(item._key, -1)}
                  style={{ fontSize: 12 }}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => move(item._key, 1)}
                  style={{ fontSize: 12 }}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(item._key)}
                  style={{ fontSize: 12, color: "#c92c62", marginLeft: "auto" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
