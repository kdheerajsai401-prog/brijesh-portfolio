import { useState, type FormEvent } from 'react';
import { inputClass, btnPrimary } from './ui';

export default function AdminLogin({
  onLogin,
}: {
  onLogin: (key: string) => void;
}) {
  const [value, setValue] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onLogin(value.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0C0C] px-6">
      <form onSubmit={submit} className="w-full max-w-sm flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Brijesh CMS</h1>
          <p className="text-sm text-white/40 mt-1">Enter your admin password</p>
        </div>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Admin password"
          className={inputClass}
          autoFocus
        />
        <button type="submit" className={btnPrimary}>
          Enter
        </button>
      </form>
    </div>
  );
}
