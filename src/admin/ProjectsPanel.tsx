import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Doc } from '../../convex/_generated/dataModel';
import ImageInput from './ImageInput';
import { inputClass, labelClass, btnPrimary, btnGhost, btnDanger, card, isAuthError } from './ui';

function ProjectRow({
  row,
  adminKey,
  onAuthError,
}: {
  row: Doc<'projects'>;
  adminKey: string;
  onAuthError: () => void;
}) {
  const update = useMutation(api.projects.update);
  const remove = useMutation(api.projects.remove);
  const [number, setNumber] = useState(row.number);
  const [category, setCategory] = useState(row.category);
  const [name, setName] = useState(row.name);
  const [col1a, setCol1a] = useState(row.col1a);
  const [col1b, setCol1b] = useState(row.col1b);
  const [col2, setCol2] = useState(row.col2);
  const [status, setStatus] = useState('');

  async function save() {
    setStatus('Saving…');
    try {
      await update({ adminKey, id: row._id, number, category, name, col1a, col1b, col2, order: row.order });
      setStatus('Saved ✓');
    } catch (e) {
      if (isAuthError(e)) onAuthError();
      else setStatus('Error');
    }
  }

  async function del() {
    if (!confirm(`Delete project "${name}"?`)) return;
    try {
      await remove({ adminKey, id: row._id });
    } catch (e) {
      if (isAuthError(e)) onAuthError();
    }
  }

  return (
    <div className={card}>
      <div className="flex gap-3 flex-wrap">
        <label className="flex flex-col gap-1.5 w-20">
          <span className={labelClass}>No.</span>
          <input value={number} onChange={(e) => setNumber(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
          <span className={labelClass}>Category</span>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 flex-1 min-w-[120px]">
          <span className={labelClass}>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <ImageInput label="Small image (top)" value={col1a} onChange={setCol1a} adminKey={adminKey} />
        <ImageInput label="Small image (bottom)" value={col1b} onChange={setCol1b} adminKey={adminKey} />
        <ImageInput label="Large image" value={col2} onChange={setCol2} adminKey={adminKey} />
      </div>
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

export default function ProjectsPanel({
  adminKey,
  onAuthError,
}: {
  adminKey: string;
  onAuthError: () => void;
}) {
  const rows = useQuery(api.projects.list);
  const create = useMutation(api.projects.create);

  if (!rows) return <p className="text-white/40">Loading…</p>;

  async function add() {
    const order = rows && rows.length ? Math.max(...rows.map((r) => r.order)) + 1 : 0;
    try {
      await create({
        adminKey,
        number: String(order + 1).padStart(2, '0'),
        category: 'Category',
        name: 'New project',
        col1a: '',
        col1b: '',
        col2: '',
        order,
      });
    } catch (e) {
      if (isAuthError(e)) onAuthError();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects ({rows.length})</h2>
        <button className={btnGhost} onClick={add}>+ Add project</button>
      </div>
      {rows.map((row) => (
        <ProjectRow key={row._id} row={row} adminKey={adminKey} onAuthError={onAuthError} />
      ))}
    </div>
  );
}
