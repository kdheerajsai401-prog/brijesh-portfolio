import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Doc } from '../../convex/_generated/dataModel';
import ImageInput from './ImageInput';
import { inputClass, labelClass, btnPrimary, btnGhost, btnDanger, card, isAuthError } from './ui';

function GalleryRow({
  row,
  adminKey,
  onAuthError,
}: {
  row: Doc<'galleryImages'>;
  adminKey: string;
  onAuthError: () => void;
}) {
  const update = useMutation(api.gallery.update);
  const remove = useMutation(api.gallery.remove);
  const [src, setSrc] = useState(row.src);
  const [alt, setAlt] = useState(row.alt);
  const [status, setStatus] = useState('');

  async function save() {
    setStatus('Saving…');
    try {
      await update({ adminKey, id: row._id, src, alt, order: row.order });
      setStatus('Saved ✓');
    } catch (e) {
      if (isAuthError(e)) onAuthError();
      else setStatus('Error');
    }
  }

  async function del() {
    if (!confirm('Delete this gallery image?')) return;
    try {
      await remove({ adminKey, id: row._id });
    } catch (e) {
      if (isAuthError(e)) onAuthError();
    }
  }

  return (
    <div className={card}>
      <ImageInput label="Photo" value={src} onChange={setSrc} adminKey={adminKey} />
      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Caption / alt text</span>
        <input value={alt} onChange={(e) => setAlt(e.target.value)} className={inputClass} />
      </label>
      <div className="flex items-center justify-between">
        {status ? <span className="text-xs text-white/50">{status}</span> : <span />}
        <div className="flex gap-2">
          <button className={btnDanger} onClick={del}>Delete</button>
          <button className={btnPrimary} onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPanel({
  adminKey,
  onAuthError,
}: {
  adminKey: string;
  onAuthError: () => void;
}) {
  const rows = useQuery(api.gallery.list);
  const create = useMutation(api.gallery.create);

  if (!rows) return <p className="text-white/40">Loading…</p>;

  async function add() {
    const order = rows && rows.length ? Math.max(...rows.map((r) => r.order)) + 1 : 0;
    try {
      await create({ adminKey, src: '', alt: 'New photo', order });
    } catch (e) {
      if (isAuthError(e)) onAuthError();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Gallery ({rows.length})</h2>
        <button className={btnGhost} onClick={add}>+ Add photo</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {rows.map((row) => (
          <GalleryRow key={row._id} row={row} adminKey={adminKey} onAuthError={onAuthError} />
        ))}
      </div>
    </div>
  );
}
