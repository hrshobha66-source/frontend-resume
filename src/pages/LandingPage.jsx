import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  Target,
  CheckCircle,
  HelpCircle,
  Download,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FileText,
      title: 'Resume Parsing',
      description: 'Extracts your academic background, technical skills, verified certifications, internships, and project details in seconds without manual entry.',
      badge: 'Step 1'
    },
    {
      icon: Briefcase,
      title: 'Job Role Prediction',
      description: 'Calculates objective match percentages for high-demand fresher roles like Data Analyst (88%), ML Engineer (79%), and Python Developer.',
      badge: 'Step 2'
    },
    {
      icon: Target,
      title: 'Skill Gap Analysis',
      description: 'Categorizes skills you have, missing industry requisites, and competencies to improve with interactive proficiency gauges.',
      badge: 'Step 3'
    },
    {
      icon: HelpCircle,
      title: 'Technical Assessment',
      description: '15 targeted MCQs evaluating Python, SQL, ML, Data Structures, and Statistics to scientifically measure hands-on domain competency.',
      badge: 'Step 4'
    },
    {
      icon: Download,
      title: 'Career Report',
      description: 'Generates an end-to-end PDF report with an overall readiness score, hiring verdict, and personalized actionable next steps.',
      badge: 'Step 5'
    },
    {
      icon: BookOpen,
      title: 'Learning Recommendations',
      description: 'Curated roadmaps, free industry bootcamps, and benchmark resources to bridge your specific missing skills before technical interviews.',
      badge: 'Continuous'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      desc: 'Drop your PDF or DOCX file (up to 5MB). Our intelligent parser scans skills, projects, and education instantly.'
    },
    {
      number: '02',
      title: 'Review Extracted Profile',
      desc: 'Verify and fine-tune your extracted technical stack and achievements with one-click inline editing.'
    },
    {
      number: '03',
      title: 'Complete 15-Min Test',
      desc: 'Answer 15 randomized domain MCQs across Python, SQL, ML, Data Structures, and Statistics.'
    },
    {
      number: '04',
      title: 'Export Readiness Report',
      desc: 'Receive your hiring verdict, benchmarked role matches, and download a presentation-ready PDF report.'
    }
  ];

  const targetRoles = [
    { name: 'Data Analyst', match: '88% Match', tag: 'Top Fresher Fit', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-800' },
    { name: 'ML Engineer', match: '79% Match', tag: 'High Growth', color: 'border-amber-200 bg-amber-50/50 text-amber-800' },
    { name: 'Data Scientist', match: '75% Match', tag: 'Analytical Fit', color: 'border-indigo-200 bg-indigo-50/50 text-indigo-800' },
    { name: 'Python Developer', match: '68% Match', tag: 'Solid Baseline', color: 'border-orange-200 bg-orange-50/50 text-orange-800' }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 lg:pb-24 bg-gradient-to-b from-indigo-50/60 via-white to-slate-50">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-xs font-semibold text-indigo-800 shadow-xs animate-fadeIn">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI-Powered Career Readiness For College Graduates & Freshers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Bridging the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-brand-500">College Degrees</span> & Industry Hiring
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload your resume to discover real-time job role compatibility, isolate technical skill gaps, validate your competencies with interactive assessments, and export a recruiter-ready career report.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to={isAuthenticated ? "/upload" : "/signup"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-600/25" icon={ArrowRight} iconPosition="right">
                Start Free Career Assessment
              </Button>
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Trust stats strip */}
          <div className="pt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-200/80 text-left">
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-card">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">88%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Top Fresher Role Fit</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-card">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">15 MCQs</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Domain Verification</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-card">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Frontend Mock Architecture</div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-200/60 shadow-card">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">PDF</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Downloadable Final Report</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              Project Introduction
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Fresher Career Readiness Needs Precision AI
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Over 70% of engineering graduates struggle during campus placements not because of a lack of talent, but because generic resumes fail to articulate relevant technical competency, and students lack objective clarity on what hiring managers actually test.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>CareerPulse AI</strong> transforms this journey: from extracting raw resume bullet points into verified competency entities, predicting matching job roles, pinpointing missing skills with precision roadmaps, to validating technical knowledge through hands-on assessments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero guesswork in skill requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent scoring benchmarks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tailored for entry-level developers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>One-click PDF portfolio export</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">Live Pipeline Simulation</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>[PARSER]</span> <span>Alex_Johnson_Resume_2024.pdf parsed</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-300">
                <span>[SKILLS]</span> <span>14 technical entities detected</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <span>[MATCH]</span> <span>Data Analyst role aligned (88%)</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <span>[TEST]</span> <span>15 MCQs evaluated (86.7% Score)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <span>[REPORT]</span> <span>Final Career Readiness Index: 82%</span>
              </div>
            </div>
            <div className="pt-2">
              <Link to="/dashboard">
                <Button variant="secondary" size="sm" className="w-full text-indigo-950 font-semibold" icon={ChevronRight} iconPosition="right">
                  Open Interactive Prototype
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Feature Cards */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md inline-block">
            Comprehensive Suite
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Six Built-in Modules for Complete Placement Readiness
          </h2>
          <p className="text-slate-600 text-base">
            Everything a fresher needs to transition from campus projects to industry employment, modularly connected in a unified workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hoverEffect className="group">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4-Step "How It Works" */}
      <section id="how-it-works" className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-3 py-1 rounded-md">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              How CareerPulse AI Works
            </h2>
            <p className="text-slate-400 text-base">
              A streamlined, friction-free journey from raw resume to actionable career insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative space-y-4 bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80">
                <div className="text-4xl font-black text-indigo-400/30">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link to={isAuthenticated ? "/upload" : "/signup"}>
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                Test the Pipeline Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Target Roles Evaluated */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
              Job Market Benchmarks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Target Fresher Roles Evaluated
            </h2>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View full role breakdown <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetRoles.map((role, idx) => (
            <div key={idx} className={`p-6 rounded-xl border ${role.color} shadow-card space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">{role.tag}</span>
                <span className="text-sm font-extrabold">{role.match}</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{role.name}</h4>
              <p className="text-xs text-slate-600">
                Evaluated against entry-level job descriptions and requisite Fresher skill stacks.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-brand-500 p-8 sm:p-14 text-white text-center space-y-6 shadow-xl shadow-indigo-500/20">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Discover Your Placement Readiness?
          </h2>
          <p className="text-indigo-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            No backend configuration, no credit card required. Experience the fully interactive prototype powered by clean client-side mock intelligence.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isAuthenticated ? "/upload" : "/signup"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-indigo-50 font-bold shadow-md">
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10">
                View Sample Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
