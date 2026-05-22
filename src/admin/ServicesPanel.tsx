import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Doc } from '../../convex/_generated/dataModel';
import { inputClass, labelClass, btnPrimary, btnGhost, btnDanger, card, isAuthError } from './ui';

function ServiceRow({
  row,
  adminKey,
  onAuthError,
}: {
  row: Doc<'services'>;
  adminKey: string;
  onAuthError: () => void;
}) {
  const update = useMutation(api.services.update);
  const remove = useMutation(api.services.remove);
  const [number, setNumber] = useState(row.number);
  const [name, setName] = useState(row.name);
  const [description, setDescription] = useState(row.description);
  const [status, setStatus] = useState('');

  async function save() {
    setStatus('Saving…');
    try {
      await update({ adminKey, id: row._id, number, name, description, order: row.order });
      setStatus('Saved ✓');
    } catch (e) {
      if (isAuthError(e)) onAuthError();
      else setStatus('Error');
    }
  }

  async function del() {
    if (!confirm(`Delete service "${name}"?`)) return;
    try {
      await remove({ adminKey, id: row._id });
    } catch (e) {
      if (isAuthError(e)) onAuthError();
    }
  }

  return (
    <div className={card}>
      <div className="flex gap-3">
        <label className="flex flex-col gap-1.5 w-20">
          <span className={labelClass}>No.</span>
          <input value={number} onChange={(e) => setNumber(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 flex-1">
          <span className={labelClass}>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Description</span>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClass} resize-none`}
        />
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

export default function ServicesPanel({
  adminKey,
  onAuthError,
}: {
  adminKey: string;
  onAuthError: () => void;
}) {
  const rows = useQuery(api.services.list);
  const create = useMutation(api.services.create);

  if (!rows) return <p className="text-white/40">Loading…</p>;

  async function add() {
    const order = rows && rows.length ? Math.max(...rows.map((r) => r.order)) + 1 : 0;
    try {
      await create({
        adminKey,
        number: String(order + 1).padStart(2, '0'),
        name: 'New service',
        description: '',
        order,
      });
    } catch (e) {
      if (isAuthError(e)) onAuthError();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Services ({rows.length})</h2>
        <button className={btnGhost} onClick={add}>+ Add service</button>
      </div>
      {rows.map((row) => (
        <ServiceRow key={row._id} row={row} adminKey={adminKey} onAuthError={onAuthError} />
      ))}
    </div>
  );
}
