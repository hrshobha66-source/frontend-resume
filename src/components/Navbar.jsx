import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, Menu, X, LayoutDashboard, FileText, CheckCircle2, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Roles Evaluated', href: '/#roles' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight flex items-center gap-1.5">
                CareerPulse <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">AI</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">Fresher Readiness Engine</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Auth Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Log out"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                    {user?.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{user?.name}</div>
                    <div className="text-xs text-slate-500">{user?.email}</div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="primary" className="w-full" icon={LayoutDashboard}>
                    Open Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  icon={LogOut}
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
