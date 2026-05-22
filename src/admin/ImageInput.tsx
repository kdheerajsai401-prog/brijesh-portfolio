import { useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { inputClass, labelClass } from './ui';

// A reusable image field: paste a URL directly, or upload a file which is
// stored in Convex storage and its resolved URL written back via onChange.
export default function ImageInput({
  value,
  onChange,
  adminKey,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  adminKey: string;
  label?: string;
}) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const resolveUrl = useMutation(api.files.resolveUrl);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const postUrl = await generateUploadUrl({ adminKey });
      const res = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      const json = await res.json();
      const url = await resolveUrl({
        adminKey,
        storageId: json.storageId as Id<'_storage'>,
      });
      if (url) onChange(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className={labelClass}>{label}</span>}
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-16 w-16 rounded-lg object-cover border border-white/10 flex-shrink-0"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-white/5 border border-white/10 flex-shrink-0" />
        )}
        <div className="flex-1 flex flex-col gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL"
            className={inputClass}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="self-start text-xs text-white/60 hover:text-white underline-offset-2 hover:underline disabled:opacity-40"
          >
            {busy ? 'Uploading…' : 'Upload a file instead'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      </div>
    </div>
  );
}
