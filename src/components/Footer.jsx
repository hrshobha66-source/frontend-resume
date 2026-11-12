import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">CareerPulse AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering college graduates and career starters with instant resume parsing, precise skill gap diagnostics, and adaptive technical readiness assessments.
            </p>
            <div className="text-xs text-slate-500">
              Frontend-only demonstration. Mock data pipeline.
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/upload" className="hover:text-white transition-colors">Resume Upload & Parser</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Job Role Matcher</Link></li>
              <li><Link to="/skill-gap" className="hover:text-white transition-colors">Skill Gap Analyzer</Link></li>
              <li><Link to="/assessment" className="hover:text-white transition-colors">Technical Assessment</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors">Career Readiness Report</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Target Roles</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-300">Data Analyst</span> <span className="text-xs text-emerald-400 font-medium ml-1">88% Top Fit</span></li>
              <li><span className="text-slate-300">Machine Learning Engineer</span></li>
              <li><span className="text-slate-300">Data Scientist</span></li>
              <li><span className="text-slate-300">Python Backend Developer</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Freshers</h4>
            <p className="text-xs text-slate-400 mb-3">
              Crafted with modern UI standards, high accessibility (WCAG), responsive layouts, and zero external backend latency.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-xs bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md text-indigo-300">
                React 18 + Tailwind v3
              </span>
              <span className="text-xs bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md text-emerald-300">
                Mock Data Ready
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CareerPulse AI. AI-Based Resume Analysis and Career Readiness Assessment for Freshers.</p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Built for aspiring engineers</span>
            <span>•</span>
            <span className="text-indigo-400 font-medium">Illustrative scores for frontend design only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
