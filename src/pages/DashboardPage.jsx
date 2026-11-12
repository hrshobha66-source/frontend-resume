import React from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { mockDashboardData } from '../mocks/mockDashboard';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { getScoreBadgeStyle } from '../utils/formatters';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { uploadedFile } = useResume();
  const { summaryStats, readinessProgress, previousAnalyses, topJobRecommendations } = mockDashboardData;

  const statIcons = [TrendingUp, CheckCircle2, Award, Briefcase];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Alex'}!
            </h1>
            <span className="text-xl">🚀</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here is your live AI resume evaluation, market alignment, and technical readiness report.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/upload">
            <Button variant="primary" icon={UploadCloud}>
              Upload New Resume
            </Button>
          </Link>
          <Link to="/report">
            <Button variant="outline" icon={FileText}>
              View Full Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Upload Resume Hero Card */}
      <Card className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white border-0 shadow-soft-lg overflow-hidden relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,theme(colors.indigo.500),transparent_70%)] opacity-30 pointer-events-none" />
        <CardContent className="p-6 sm:p-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Resume Analysis Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Current Active Resume: <span className="text-indigo-200">{uploadedFile?.name || 'Alex_Johnson_Resume_2024.pdf'}</span>
            </h2>
            <p className="text-indigo-100/80 text-xs sm:text-sm leading-relaxed">
              Extracted 14 skills, 3 projects, and matched with top junior roles. Proceed with the guided assessment to upgrade your placement readiness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link to="/analysis">
              <Button className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-indigo-50 font-semibold shadow-md">
                Verify Extracted Data
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10" icon={UploadCloud}>
                Re-upload File
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Career Progress Summary (Stat Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Career Progress Summary</h2>
          <span className="text-xs text-slate-500 font-medium">Updated today</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <Card key={stat.id} hoverEffect className="border-slate-200/90">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.subtext}</div>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 pt-1 border-t border-slate-100">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Overall Readiness Progress Bar Card */}
      <Card className="border-slate-200/90">
        <CardHeader
          title="Overall Placement Readiness"
          subtitle="Holistic score based on resume keyword density, verified projects, and technical test marks."
          action={
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {readinessProgress.statusText}
            </span>
          }
        />
        <CardContent className="space-y-6">
          <ProgressBar
            value={readinessProgress.percentage}
            label="Current Composite Readiness"
            color="emerald"
            size="lg"
          />

          {/* Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {readinessProgress.milestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 ${
                  m.completed
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${m.completed ? 'text-emerald-600' : 'text-slate-300'}`} />
                <span className="truncate">{m.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Section: Top Job Recommendations & Previous Analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top 3 Job Recommendations */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Top Job Role Recommendations
            </h2>
            <Link to="/jobs" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {topJobRecommendations.map((job) => {
              const badgeStyle = getScoreBadgeStyle(job.matchScore);
              return (
                <Card key={job.id} hoverEffect className="p-4 sm:p-5 border-slate-200">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                        <p className="text-xs text-slate-500">{job.level} • Demand: {job.demand}</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                        {job.matchScore}% Match
                      </span>
                    </div>

                    <ProgressBar
                      value={job.matchScore}
                      showPercentage={false}
                      color={job.matchScore >= 80 ? 'emerald' : job.matchScore >= 70 ? 'amber' : 'orange'}
                      size="sm"
                    />

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <Link to="/skill-gap" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
                        Inspect Skill Gap <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-slate-400">Target Level Fit</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Previous Analyses List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Previous Resume Analyses
            </h2>
            <Link to="/upload" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              + New Scan
            </Link>
          </div>

          <Card className="border-slate-200">
            <div className="divide-y divide-slate-100">
              {previousAnalyses.map((item) => {
                const badgeStyle = getScoreBadgeStyle(item.score);
                return (
                  <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.filename}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="font-medium text-slate-700">{item.topRole}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                          {item.score}% Score
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.status}</div>
                      </div>

                      <Link to="/analysis">
                        <Button variant="ghost" size="sm" className="p-2">
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <CardFooter className="justify-center text-xs text-slate-500">
              Showing 3 evaluated resume scans. Click any item to inspect details.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
