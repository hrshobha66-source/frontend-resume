import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FileCheck2,
  Briefcase,
  GitCompare,
  HelpCircle,
  Award,
  FileText,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  User,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Resume', path: '/upload', icon: UploadCloud },
    { name: 'Resume Analysis', path: '/analysis', icon: FileCheck2 },
    { name: 'Job Recommendations', path: '/jobs', icon: Briefcase },
    { name: 'Skill Gap Analysis', path: '/skill-gap', icon: GitCompare },
    { name: 'Technical Assessment', path: '/assessment', icon: HelpCircle },
    { name: 'Assessment Result', path: '/result', icon: Award },
    { name: 'Career Report', path: '/report', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90
          flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-base">
              CareerPulse <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">AI</span>
            </span>
          </NavLink>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User preview card in sidebar */}
        <div className="px-4 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-sm shadow-xs">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-slate-900 truncate">
                {user?.name || 'Fresher Candidate'}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1 truncate">
                <GraduationCap className="w-3 h-3 shrink-0 text-indigo-500" />
                Class of 2024
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Flow quick guide badge */}
        <div className="p-4 mx-3 mb-3 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Evaluation Pipeline
          </div>
          <p className="text-[11px] text-indigo-700 leading-snug">
            Upload Resume → Verify Analysis → Target Roles → Skill Gap → Take Test → Final Report
          </p>
        </div>

        {/* Footer logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main layout container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Status: Assessment Ready
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold text-slate-800 leading-tight">
                {user?.name || 'Alex Johnson'}
              </span>
              <span className="text-xs text-slate-500">
                {user?.email || 'alex.johnson@fresherhub.edu'}
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="hidden sm:inline-flex text-xs py-1.5"
            >
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
