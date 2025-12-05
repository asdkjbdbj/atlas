import { Home, Gauge, Database, FolderKanban, LayoutDashboard, Menu, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState, Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false); // usado para mobile bottom menu

  const menuItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Database, label: 'Datalake', path: '/datalake' },
    { icon: FolderKanban, label: 'Projetos', path: '/projects' },
    { icon: Gauge, label: 'Cockpit', path: '/cockpit' },
  ];

  return (
    <>
      {/* Mobile bottom-center button */}
      <button
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setIsOpen((s) => !s)}
        className="fixed z-50 p-3 text-white -translate-x-1/2 border rounded-full shadow-lg bottom-6 left-1/2 lg:hidden bg-slate-800/90 border-white/5"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar / floating icons menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed z-50 -translate-x-1/2 bottom-20 left-1/2 lg:hidden">
            <div className="flex items-center gap-3 p-2 border rounded-full shadow-xl bg-slate-900/95 border-white/5">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                      isActive ? 'bg-violet-500/20 text-violet-400' : 'bg-transparent text-slate-300 hover:bg-white/5'
                    }`
                  }
                  title={item.label}
                >
                  <item.icon size={18} />
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:z-40
          bg-gradient-to-b from-slate-900/90 to-slate-950/90
          border-r border-white/10
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className={`flex flex-col h-full ${isCollapsed ? 'p-3' : 'p-6'}`}>
          <div className="flex items-center mb-8 gap-9">
            <div className={`${isCollapsed ? 'w-full flex justify-center' : 'flex items-center gap-3'}`}>
              <Calendar size={24} className="flex mt-1 text-2xl text-violet-400" />
              {!isCollapsed && (
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text">
                    Atlas
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">Agenda Inteligente</p>
                </div>
              )}
            </div>

            {/* Collapse toggle - floating at mid-right of sidebar */}
            <button
              aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              onClick={() => setIsCollapsed((s) => !s)}
              className="absolute right-0 hidden p-2 translate-x-1/2 -translate-y-1/2 rounded-full shadow-md lg:inline-flex top-1/2 bg-slate-800/60 text-slate-200 hover:bg-slate-800/80"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsOpen(false);
                }}
                className={({ isActive }) => {
                  const base = `flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 px-8 py-4'} rounded-xl transition-all ${isCollapsed ? 'px-4 py-4' : 'px-4 py-3'}`;
                  const activeCls = 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white shadow-lg shadow-violet-500/20';
                  const inactiveCls = `text-slate-400 hover:text-white ${isCollapsed ? 'hover:bg-transparent' : 'hover:bg-slate-800/80'} border border-transparent`;
                  return `${base} ${isActive ? activeCls : inactiveCls}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className={isActive ? 'text-violet-400' : 'text-slate-400'} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}