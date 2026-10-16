import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCartWishlist } from '../context/CartWishlistContext';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authMode, closeAuthModal, openAuthModal, login, register, loginWithGoogle } = useAuth();
  const { cart, wishlist } = useCartWishlist();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const isLogin = authMode === 'login';

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    const res = await loginWithGoogle();
    setGoogleLoading(false);
    if (!res.success) {
      setError(res.message || 'Google authentication failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const res = await login(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.message || 'Invalid email or password');
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      const res = await register(name, email, password, phone);
      setLoading(false);
      if (!res.success) {
        setError(res.message || 'Failed to create account');
      }
    }
  };

  const fillDemoAccount = () => {
    setEmail('abhishek@neekwatches.com');
    setPassword('neek1234');
    if (!isLogin) {
      setName('Abhishek Kumar');
      setPhone('9876543210');
    }
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 max-w-md w-full rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a1128] via-[#001f54] to-[#0a1128] p-6 pb-5 border-b border-slate-800 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs">
              NW
            </div>
            <span className="font-['Cinzel',serif] text-base font-bold text-amber-400 tracking-wider">
              NEEK HOROLOGY
            </span>
          </div>

          <h3 className="font-['Cinzel',serif] text-xl font-bold text-white">
            {isLogin ? 'Sign In to Your Account' : 'Create Neek Collector Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Synchronize your watch cart & wishlist across all your devices
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-slate-950/80 p-1 rounded-xl mt-4 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setError('');
                openAuthModal('login');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isLogin
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setError('');
                openAuthModal('register');
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Google One-Click Authentication Button */}
        <div className="px-6 pt-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer border border-slate-200 active:scale-98"
          >
            {/* Google Logo SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Signing in with Google...' : 'Continue with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] text-slate-400 uppercase font-semibold tracking-wider absolute">
              or with email & password
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          
          {/* Name Field (Register only) */}
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Abhishek Kumar"
                  className="w-full text-xs p-3 pl-9 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 text-white"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full text-xs p-3 pl-9 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 text-white"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs p-3 pl-9 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 text-white"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Phone Field (Optional for Register) */}
          {!isLogin && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full text-xs p-3 pl-9 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 text-white"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isLogin ? 'Sign In to Neek' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>

          {/* Quick Auto-fill Helper */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
            <button
              type="button"
              onClick={fillDemoAccount}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-fill Sample Details</span>
            </button>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              256-Bit SSL Protected
            </span>
          </div>

        </form>

      </div>
    </div>
  );
};
