"use client";

import React, { useRef } from "react";

interface Props {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  shape?: "square" | "circle";
  width?: number;
  height?: number;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  shape = "square",
  width = 120,
  height = 120,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    if (data.url) {
      onChange(data.url);
    } else {
      alert("Image upload failed.");
    }
  };

  return (
    <div style={{ marginBlock: 10 }}>
      {label && <label style={{ fontWeight: 600 }}>{label}</label>}

      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
        {value ? (
          <img
            src={value}
            alt="Uploaded"
            style={{
              width,
              height,
              borderRadius: shape === "circle" ? "50%" : 16,
              objectFit: "cover",
              border: "1px solid var(--text)",
            }}
          />
        ) : (
          <div
            style={{
              width,
              height,
              background: "#f4f4f4",
              border: "2px dashed var(--text)",
              borderRadius: shape === "circle" ? "50%" : 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: 12,
            }}
          >
            No image
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm rounded-full border px-4 py-1 hover:opacity-80 transition"
            style={{ borderColor: "var(--text)", color: "var(--text)" }}
          >
            {value ? "Replace Image" : "Upload Image"}
          </button>

          {value && (
            <button
              onClick={() => onChange("")}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </div>
      </div>
    </div>
  );
}
