import { useState } from 'react';
import { useAdminKey } from './useAdminKey';
import AdminLogin from './AdminLogin';
import ContentPanel from './ContentPanel';
import ServicesPanel from './ServicesPanel';
import ProjectsPanel from './ProjectsPanel';
import GalleryPanel from './GalleryPanel';

const TABS = ['Text', 'Services', 'Projects', 'Gallery'] as const;
type Tab = (typeof TABS)[number];

export default function AdminApp() {
  const { adminKey, login, logout } = useAdminKey();
  const [tab, setTab] = useState<Tab>('Text');

  if (!adminKey) return <AdminLogin onLogin={login} />;

  const onAuthError = () => {
    alert('Session invalid — please log in again.');
    logout();
  };
  const panelProps = { adminKey, onAuthError };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0C0C0C]/90 px-5 py-4 backdrop-blur">
        <h1 className="font-bold whitespace-nowrap">Brijesh CMS</h1>
        <nav className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                tab === t
                  ? 'bg-white text-black font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 whitespace-nowrap">
          <a
            href="/"
            className="text-sm text-white/60 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            View site ↗
          </a>
          <button onClick={logout} className="text-sm text-white/60 hover:text-white">
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8">
        {tab === 'Text' && <ContentPanel {...panelProps} />}
        {tab === 'Services' && <ServicesPanel {...panelProps} />}
        {tab === 'Projects' && <ProjectsPanel {...panelProps} />}
        {tab === 'Gallery' && <GalleryPanel {...panelProps} />}
      </main>
    </div>
  );
}
