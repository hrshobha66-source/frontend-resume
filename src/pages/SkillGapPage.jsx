import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Target,
  Sparkles,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { mockSkillGapData } from '../mocks/mockSkillGap';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';

export const SkillGapPage = () => {
  const navigate = useNavigate();
  const { selectedRole, setSelectedRole } = useResume();

  // Safeguard if selectedRole key isn't in mockSkillGapData
  const activeRoleKey = mockSkillGapData[selectedRole] ? selectedRole : 'data-analyst';
  const roleData = mockSkillGapData[activeRoleKey];

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Top Header & Role Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Step 4: Diagnostics
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Skill Gap Analysis
          </h1>
          <p className="text-sm text-slate-500">
            Comparing your verified competencies against industry entry-level benchmarks.
          </p>
        </div>

        {/* Role Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="role-select" className="text-xs font-bold uppercase text-slate-600 whitespace-nowrap">
            Target Role:
          </label>
          <div className="relative">
            <select
              id="role-select"
              value={activeRoleKey}
              onChange={handleRoleChange}
              className="appearance-none bg-white border border-slate-300 rounded-xl px-4 py-2.5 pr-9 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 shadow-sm cursor-pointer"
            >
              <option value="data-analyst">Data Analyst (88% Match)</option>
              <option value="ml-engineer">ML Engineer (79% Match)</option>
              <option value="data-scientist">Data Scientist (75% Match)</option>
              <option value="python-developer">Python Developer (68% Match)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Role Summary Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-blue-50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Benchmarking for {roleData.roleTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Based on 4,200+ active junior postings, your resume qualifies for <strong>{roleData.skillsHave.length} required competencies</strong> with <strong>{roleData.missingSkills.length} key gaps</strong> to bridge.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Match Alignment</span>
            <span className="text-2xl font-black text-indigo-600">{roleData.matchScore}%</span>
          </div>
        </div>
      </div>

      {/* 3 Categories: Skills You Have, Missing Skills, Skills to Improve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. SKILLS YOU HAVE (GREEN CHIPS) */}
        <Card className="border-emerald-200/90 shadow-soft">
          <CardHeader
            className="bg-emerald-50/50"
            title="Skills You Have"
            subtitle="Verified in your projects & education"
            action={
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {roleData.skillsHave.length} Detected
              </span>
            }
          />
          <CardContent className="space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              These competencies give you immediate baseline leverage in technical screens.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {roleData.skillsHave.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 2. MISSING SKILLS (RED CHIPS) */}
        <Card className="border-rose-200/90 shadow-soft">
          <CardHeader
            className="bg-rose-50/50"
            title="Missing Skills"
            subtitle="Critical keywords not detected in resume"
            action={
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                {roleData.missingSkills.length} Missing
              </span>
            }
          />
          <CardContent className="space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              High-priority tools or methodologies frequently tested by hiring managers for this position.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {roleData.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold shadow-2xs"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. SKILLS TO IMPROVE (YELLOW CHIPS WITH BARS) */}
        <Card className="border-amber-200/90 shadow-soft">
          <CardHeader
            className="bg-amber-50/50"
            title="Skills to Improve"
            subtitle="Needs deeper hands-on proficiency"
            action={
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                {roleData.skillsToImprove.length} In Progress
              </span>
            }
          />
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              You possess academic foundation here; elevate proficiency to reach benchmark standards.
            </p>
            <div className="space-y-3.5 pt-1">
              {roleData.skillsToImprove.map((item, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-amber-50/40 border border-amber-200/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="truncate pr-2">{item.skill}</span>
                    <span className="text-amber-700 shrink-0 font-bold">{item.currentLevel}% / {item.targetLevel}%</span>
                  </div>
                  <ProgressBar
                    value={item.currentLevel}
                    color="amber"
                    size="sm"
                    showPercentage={false}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Current</span>
                    <span>Target Placement Standard</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Learning Areas (Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Recommended Learning Areas & Resources
            </h2>
            <p className="text-xs text-slate-500">
              Curated roadmap tailored to bridge your exact gaps for {roleData.roleTitle}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleData.learningAreas.map((area) => (
            <Card key={area.id} hoverEffect className="border-slate-200/90 flex flex-col justify-between">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md w-fit">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High Impact Topic</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {area.topic}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 block mb-0.5">Why it matters:</strong>
                  {area.whyItMatters}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Suggested Resources:
                  </div>
                  <div className="space-y-2">
                    {area.suggestedResources.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{res.name}</p>
                          <p className="text-[11px] text-slate-500">{res.type} • {res.duration}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                          res.free ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {res.free ? 'Free' : 'Premium'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA to Technical Assessment */}
      <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>Next Phase: Objective Skill Verification</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Ready to Validate Your Knowledge with Technical MCQs?
          </h3>
          <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
            Take a 15-question adaptive assessment across Python, SQL, ML, Data Structures, and Statistics to calibrate your readiness index.
          </p>
        </div>

        <Link to="/assessment" className="w-full sm:w-auto shrink-0">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-indigo-50 font-bold shadow-md"
            icon={ArrowRight}
            iconPosition="right"
          >
            Start Technical Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
};
