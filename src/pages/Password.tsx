import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Lock, ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

export function Password() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const result = zxcvbn(password);
  const score = result.score; // 0-4
  
  const strengthLabels = ['Terrible', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  
  // Progress bar segments
  const segments = [0, 1, 2, 3];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security Auditing</h1>
        <p className="text-slate-500 mt-1">Check the strength of potential passwords locally.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password Analyzer
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400 stroke-[1.5]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm"
              placeholder="Enter a password to test..."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {password && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Strength: <span className="font-bold">{strengthLabels[score]}</span></span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Score: {score}/4
                </span>
              </div>
              <div className="flex gap-1 h-1.5">
                {segments.map((segment) => (
                  <div 
                    key={segment}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      segment < score ? strengthColors[score] : (score > 0 && segment === 0 ? strengthColors[score] : 'bg-slate-200')
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {(result.feedback.warning || result.feedback.suggestions.length > 0) && (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                {result.feedback.warning && (
                  <div className="flex items-start gap-2 text-orange-800 mb-3 text-sm font-medium">
                    <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{result.feedback.warning}</p>
                  </div>
                )}
                
                {result.feedback.suggestions.length > 0 && (
                  <div className="pl-7">
                    <ul className="list-disc list-outside text-sm text-orange-700 space-y-1">
                      {result.feedback.suggestions.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {score === 4 && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex items-center gap-3">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-green-800">
                  Excellent! This password is very difficult to crack.
                </p>
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4" />
                <p>Estimated crack time: <span className="font-semibold text-slate-700">{result.crack_times_display.offline_slow_hashing_1e4_per_second}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
