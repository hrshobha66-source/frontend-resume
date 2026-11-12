import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Briefcase,
  FileText,
  Target,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Calendar,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { mockJobRoles } from '../mocks/mockJobs';
import { mockSkillGapData } from '../mocks/mockSkillGap';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { exportReportToPDF } from '../utils/pdfExport';

export const ReportPage = () => {
  const { user } = useAuth();
  const { resumeData, selectedRole, assessmentResult, uploadedFile } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  const activeRoleData = mockSkillGapData[selectedRole] || mockSkillGapData['data-analyst'];

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportNotice('Generating high-resolution printable PDF report...');
    try {
      await exportReportToPDF('career-report-document', `${(user?.name || 'Fresher').replace(/\s+/g, '_')}_Career_Readiness_Report.pdf`);
      setExportNotice('Report downloaded successfully!');
      setTimeout(() => setExportNotice(''), 3000);
    } catch (err) {
      console.error(err);
      setExportNotice('PDF generation failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Action Bar (Not printed in PDF) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Final Step: Executive Deliverable
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Fresher Career Readiness Report
          </h1>
          <p className="text-sm text-slate-500">
            Synthesized evaluation of resume keywords, role alignments, and technical test scorecard.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint} className="hidden sm:inline-flex">
            Print
          </Button>
          <Button
            variant="primary"
            icon={Download}
            onClick={handleDownloadPDF}
            isLoading={isExporting}
            className="shadow-md shadow-indigo-600/20"
          >
            Download PDF Report
          </Button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* PRINTABLE REPORT DOCUMENT CONTAINER */}
      <div
        id="career-report-document"
        className="bg-white rounded-2xl border border-slate-300 shadow-soft-lg p-6 sm:p-12 space-y-10 text-slate-800"
      >
        {/* Document Header Banner */}
        <div className="border-b-2 border-indigo-600 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                CP
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">CAREERPULSE AI</h2>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Fresher Readiness Benchmark Report</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Verified Candidate Assessment Dossier generated for campus placements and entry-level recruiting.
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 text-xs">
            <div><span className="text-slate-400 font-semibold">Report ID:</span> <span className="font-mono font-bold text-slate-700">CP-2024-FRESHER-{Date.now().toString().slice(-4)}</span></div>
            <div><span className="text-slate-400 font-semibold">Date of Evaluation:</span> <span className="font-medium text-slate-700">{assessmentResult.completionDate}</span></div>
            <div><span className="text-slate-400 font-semibold">Source File:</span> <span className="font-medium text-slate-700">{uploadedFile?.name || 'Alex_Johnson_Resume_2024.pdf'}</span></div>
            <div><span className="text-slate-400 font-semibold">Candidate Status:</span> <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED FRESHER</span></div>
          </div>
        </div>

        {/* SECTION 5 (FEATURED AT TOP): CAREER READINESS SUMMARY & VERDICT */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 rounded-xl border border-indigo-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded">
                Executive Synthesis
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Career Readiness Summary & Hiring Verdict
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-500 block font-medium">Composite Readiness Index</span>
                <span className="text-3xl font-black text-indigo-600">82%</span>
              </div>
            </div>
          </div>

          <ProgressBar value={82} color="emerald" size="lg" label="Overall Readiness Score" />

          {/* Verdict Box */}
          <div className="p-4 rounded-xl bg-white border border-emerald-300 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Official Verdict: STRONG ENTRY-LEVEL HIRE (High Placement Alignment)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Candidate demonstrates strong core analytical foundations in SQL and Python, complemented by solid hands-on project artifacts. Minor bridge areas exist in production deployment (FastAPI/Docker) and advanced A/B testing methodologies, which can be acquired within 3–4 weeks.
            </p>
          </div>

          {/* Next Steps for Candidate */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recommended Next Action Steps for the Candidate:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-700 block">1. Strengthen Missing Tooling</span>
                <p className="text-slate-600">Complete foundational tutorials in A/B testing and Cloud Data Warehousing (BigQuery).</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-700 block">2. Deploy Live Demo</span>
                <p className="text-slate-600">Package the Telecom Churn project as a public FastAPI web service on Render/Fly.io.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-indigo-700 block">3. Target Tier-1 Applications</span>
                <p className="text-slate-600">Apply confidently to Data Analyst and Junior Analytics roles where match exceeds 85%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: RESUME ANALYSIS SUMMARY */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              1. Resume Analysis Summary
            </h3>
            <span className="text-xs text-slate-500 font-medium">Extracted Profile Entities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 text-sm">{resumeData.personalInfo.fullName}</div>
              <p className="text-slate-600">{resumeData.personalInfo.email} • {resumeData.personalInfo.phone}</p>
              <p className="text-slate-600">{resumeData.personalInfo.location}</p>
              <div className="pt-2 text-slate-500 leading-relaxed italic border-t border-slate-200">
                "{resumeData.personalInfo.summary}"
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Academic Qualifications:</span>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="pb-1">
                  <div className="font-semibold text-slate-800">{edu.degree}</div>
                  <div className="text-slate-500">{edu.institution} ({edu.startYear} - {edu.endYear}) • GPA: <strong className="text-emerald-700">{edu.gpa}</strong></div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Technical Skills */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Extracted Technical Skills ({resumeData.technicalSkills.length} Entities):
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {resumeData.technicalSkills.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: RECOMMENDED JOB ROLES */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              2. Recommended Job Roles
            </h3>
            <span className="text-xs text-slate-500 font-medium">Ranked by Fresher Market Fit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {mockJobRoles.map((role) => (
              <div key={role.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{role.title}</span>
                  <span className="font-black text-indigo-600">{role.matchPercentage}%</span>
                </div>
                <ProgressBar value={role.matchPercentage} showPercentage={false} size="sm" />
                <p className="text-[11px] text-slate-500 line-clamp-2">{role.description}</p>
                <div className="text-[10px] text-slate-400 pt-1 font-semibold">
                  Demand: {role.marketDemand}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: SKILL GAP RESULTS */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              3. Skill Gap Results (Target: {activeRoleData.roleTitle})
            </h3>
            <span className="text-xs text-slate-500 font-medium">Domain Gap Analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-900 uppercase tracking-wider block">Skills You Have:</span>
              <ul className="space-y-1 text-emerald-800">
                {activeRoleData.skillsHave.map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2">
              <span className="font-bold text-rose-900 uppercase tracking-wider block">Missing Skills:</span>
              <ul className="space-y-1 text-rose-800">
                {activeRoleData.missingSkills.map((s, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
              <span className="font-bold text-amber-900 uppercase tracking-wider block">Skills to Improve:</span>
              <div className="space-y-2 pt-1">
                {activeRoleData.skillsToImprove.map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] text-amber-900 font-semibold">
                      <span className="truncate pr-1">{item.skill}</span>
                      <span>{item.currentLevel}%</span>
                    </div>
                    <ProgressBar value={item.currentLevel} size="sm" color="amber" showPercentage={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ASSESSMENT PERFORMANCE */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              4. Technical Assessment Performance
            </h3>
            <span className="text-xs text-slate-500 font-medium">15 Standardized Domain Questions</span>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Test Scorecard</span>
              <div className="text-2xl font-black text-slate-900">
                {assessmentResult.percentage}% ({assessmentResult.correctCount} of {assessmentResult.totalQuestions} Questions Correct)
              </div>
              <p className="text-slate-500">Evaluated on Python, SQL, ML, Data Structures, and Statistics.</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              {assessmentResult.subjectScores.map((subj, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 text-center min-w-[80px]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{subj.subject}</span>
                  <span className="text-sm font-extrabold text-indigo-600">{subj.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Official Report Sign-off Footer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              CP
            </div>
            <span>CareerPulse AI Placement Readiness Benchmark System</span>
          </div>

          <div className="text-right">
            <span>Verified Algorithmic Evaluation • End of Official Dossier</span>
          </div>
        </div>
      </div>
    </div>
  );
};
