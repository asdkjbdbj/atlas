import { Home, Gauge, Database, FolderKanban, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Gauge, label: 'Cockpit', path: '/cockpit' },
    { icon: Database, label: 'Datalake', path: '/datalake' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg backdrop-blur-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-screen z-40
          backdrop-blur-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90
          border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 w-64
        `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Atlas
            </h1>
            <p className="text-sm text-slate-400 mt-1">Agenda Pessoal</p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white shadow-lg shadow-violet-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className={isActive ? 'text-violet-400' : ''} />
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-slate-400 mb-1">Versão</p>
              <p className="text-sm font-medium text-white">1.0.0</p>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
