import { Users, Calendar, CheckSquare, Activity } from 'lucide-react';

const stats = [
  { label: 'Total Events', value: '24', icon: Calendar, trend: '+12%', colorClasses: 'bg-blue-50 text-blue-600' },
  { label: 'Active Tasks', value: '12', icon: CheckSquare, trend: '+5%', colorClasses: 'bg-green-50 text-green-600' },
  { label: 'Team Members', value: '8', icon: Users, trend: '0%', colorClasses: 'bg-indigo-50 text-indigo-600' },
  { label: 'Platform Activity', value: '84%', icon: Activity, trend: '+14%', colorClasses: 'bg-purple-50 text-purple-600' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.colorClasses}`}>
                <stat.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 leading-none">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-slate-500'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="flex items-center justify-center h-48 text-slate-400">
            Chart or activity flow would go here...
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-start">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Review project proposal {i}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Due today at 4PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
