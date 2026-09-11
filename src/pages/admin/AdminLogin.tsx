import React, { useState } from 'react';
import { Lock, Sparkles, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const { login, settings } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoginWithCreds = async (u: string, p: string) => {
    setLoading(true);
    setError(null);

    const cleanUser = u.trim();
    const cleanPass = p.trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });
      const data = await res.json();

      if (data.success && data.token) {
        login(data.token, data.user);
        onSuccess();
      } else {
        setError(data.error || data.message || 'Invalid username/email or password');
      }
    } catch (err: any) {
      setError('Connection failed. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLoginWithCreds(username, password);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#0B1A30] to-[#152E54] text-white p-6 sm:p-8 border-b-2 border-amber-400 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-serif-heading">Admin Management Portal</h2>
          <p className="text-xs text-slate-300 mt-1">
            Jit Prime MPC Company &bull; Monojit Dey
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admin Username or Email
              </label>
              <input
                type="text"
                required
                placeholder="admin or monojitdey189@gmail.com"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Back to Website
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Verifying...' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Credential Hint & 1-Click Access */}
          <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl text-[11px] text-amber-950 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Instant 1-Click Login:</span>
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full font-semibold">Authorized</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setUsername('admin');
                  setPassword('admin123');
                  handleLoginWithCreds('admin', 'admin123');
                }}
                className="w-full text-left p-2 rounded-xl bg-white border border-amber-300 hover:border-amber-500 hover:bg-amber-100/50 transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <p className="font-bold text-slate-900 text-xs flex items-center justify-between">
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-3 h-3 text-amber-600" />
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">admin / admin123</p>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setUsername('monojit');
                  setPassword('jitprime85219');
                  handleLoginWithCreds('monojit', 'jitprime85219');
                }}
                className="w-full text-left p-2 rounded-xl bg-white border border-amber-300 hover:border-amber-500 hover:bg-amber-100/50 transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <p className="font-bold text-slate-900 text-xs flex items-center justify-between">
                  <span>Monojit Dey (Owner)</span>
                  <ArrowRight className="w-3 h-3 text-amber-600" />
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">monojit / jitprime85219</p>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
