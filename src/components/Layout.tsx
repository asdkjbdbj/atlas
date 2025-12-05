import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} min-h-screen`}>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}