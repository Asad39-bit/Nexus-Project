import { LayoutDashboard, Calendar, PenTool, KeyRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: PenTool, label: 'Signature', path: '/signature' },
  { icon: KeyRound, label: 'Password', path: '/password' },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Nexus<span className="text-blue-600">Project</span></span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon className="w-5 h-5 stroke-[1.5]" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm">
            US
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">User</span>
            <span className="text-xs text-slate-500">user@nexus.app</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
