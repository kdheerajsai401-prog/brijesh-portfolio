import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { inputClass, labelClass, btnPrimary, card, isAuthError } from './ui';

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: 'hero_greeting', label: 'Hero greeting' },
  { key: 'hero_name', label: 'Hero name' },
  { key: 'hero_tagline', label: 'Hero tagline', multiline: true },
  { key: 'about_text', label: 'About paragraph', multiline: true },
  { key: 'instagram_username', label: 'Instagram username' },
  { key: 'instagram_followers', label: 'Instagram follower count' },
  { key: 'instagram_profile_url', label: 'Instagram profile URL' },
  { key: 'contact_email', label: 'Contact email (receives inquiries)' },
  { key: 'contact_intro', label: 'Contact intro line', multiline: true },
];

export default function ContentPanel({
  adminKey,
  onAuthError,
}: {
  adminKey: string;
  onAuthError: () => void;
}) {
  const data = useQuery(api.content.getAll);
  const setContent = useMutation(api.content.set);
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (data && draft === null) setDraft(data);
  }, [data, draft]);

  if (!data || draft === null) {
    return <p className="text-white/40">Loading…</p>;
  }

  const dirty = FIELDS.filter(
    (f) => (draft[f.key] ?? '') !== (data[f.key] ?? ''),
  );

  async function saveAll() {
    setStatus('Saving…');
    try {
      for (const f of dirty) {
        await setContent({ adminKey, key: f.key, value: draft![f.key] ?? '' });
      }
      setStatus(`Saved ${dirty.length} change(s) ✓`);
    } catch (e) {
      if (isAuthError(e)) onAuthError();
      else setStatus('Error saving');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Site text</h2>
        <div className="flex items-center gap-3">
          {status && <span className="text-xs text-white/50">{status}</span>}
          <button
            className={btnPrimary}
            onClick={saveAll}
            disabled={dirty.length === 0}
          >
            Save{dirty.length ? ` (${dirty.length})` : ''}
          </button>
        </div>
      </div>

      <div className={card}>
        {FIELDS.map((f) => (
          <label key={f.key} className="flex flex-col gap-1.5">
            <span className={labelClass}>{f.label}</span>
            {f.multiline ? (
              <textarea
                rows={3}
                value={draft[f.key] ?? ''}
                onChange={(e) =>
                  setDraft({ ...draft, [f.key]: e.target.value })
                }
                className={`${inputClass} resize-none`}
              />
            ) : (
              <input
                value={draft[f.key] ?? ''}
                onChange={(e) =>
                  setDraft({ ...draft, [f.key]: e.target.value })
                }
                className={inputClass}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
