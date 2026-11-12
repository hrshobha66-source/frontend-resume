import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileText,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useResume } from '../context/ResumeContext';
import { mockAssessmentQuestions } from '../mocks/mockAssessment';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { assessmentResult, assessmentAnswers, resetAssessment } = useResume();
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const {
    totalQuestions = 15,
    score = 13,
    percentage = 86.7,
    correctCount = 13,
    incorrectCount = 2,
    completionDate = 'Today',
    subjectScores = [],
    improvementAreas = []
  } = assessmentResult;

  const toggleQuestionReview = (id) => {
    setExpandedQuestionId(prev => prev === id ? null : id);
  };

  const handleRetakeTest = () => {
    resetAssessment();
    navigate('/assessment');
  };

  // SVG circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Step 6: Scorecard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Technical Assessment Result
          </h1>
          <p className="text-sm text-slate-500">
            Comprehensive evaluation across Python, SQL, ML, Data Structures, and Statistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={RotateCcw} onClick={handleRetakeTest}>
            Retake Test
          </Button>
          <Link to="/report">
            <Button variant="primary" icon={FileText} iconPosition="right" className="shadow-md shadow-indigo-600/20">
              Generate Final Career Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Scorecard Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Circular Progress & Overall Score */}
        <Card className="lg:col-span-5 border-slate-200/90 shadow-soft flex flex-col justify-center items-center text-center p-6 sm:p-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Overall Assessment Score
          </h3>

          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-slate-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-indigo-600 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {percentage}%
              </span>
              <span className="text-xs font-bold text-slate-500">
                {score} / {totalQuestions} Correct
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 pt-4 border-t border-slate-100 w-full text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{correctCount} Correct</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-rose-700">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>{incorrectCount} Incorrect</span>
            </div>
          </div>
        </Card>

        {/* Subject Breakdown Chart */}
        <Card className="lg:col-span-7 border-slate-200/90 shadow-soft">
          <CardHeader
            title="Subject-Wise Performance"
            subtitle="Percentage scored across the 5 tested fresher technical domains."
          />
          <CardContent>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectScores}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="subject"
                    tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    unit="%"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '0.75rem',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`${val}%`, 'Proficiency']}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]} barSize={32}>
                    {subjectScores.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.percentage >= 80 ? '#10b981' : entry.percentage >= 60 ? '#6366f1' : '#f59e0b'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Areas Requiring Improvement */}
      <Card className="border-amber-200/90 bg-amber-50/20 shadow-soft">
        <CardHeader
          title="Areas Requiring Improvement"
          subtitle="Concepts where questions were answered incorrectly or flagged as weak."
        />
        <CardContent className="space-y-3">
          {improvementAreas.length === 0 ? (
            <p className="text-xs text-slate-500">Perfect score! No specific weak spots detected.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvementAreas.map((area, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {area.subject}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{area.topic}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 block mb-0.5">Recommendation:</strong>
                    {area.recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Expandable Per-Question Review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Detailed Per-Question Review (15 Questions)
          </h2>
          <span className="text-xs text-slate-500">Click any question to view analysis</span>
        </div>

        <div className="space-y-2.5">
          {mockAssessmentQuestions.map((q, idx) => {
            const userChoiceIndex = assessmentAnswers[q.id];
            const isAnswered = userChoiceIndex !== undefined;
            const isCorrect = userChoiceIndex === q.correctOptionIndex;
            const isExpanded = expandedQuestionId === q.id;

            return (
              <Card key={q.id} className="border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleQuestionReview(q.id)}
                  className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Q{idx + 1}.</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {q.subject}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 truncate mt-0.5">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {isCorrect ? '+1 Point' : '0 Points'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-slate-50/70 border-t border-slate-100 space-y-4 animate-fadeIn">
                    <div className="text-sm font-bold text-slate-900">
                      {q.question}
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = userChoiceIndex === oIdx;
                        const isRightAnswer = q.correctOptionIndex === oIdx;

                        let style = 'bg-white border-slate-200 text-slate-700';
                        if (isRightAnswer) {
                          style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                        } else if (isChosen && !isRightAnswer) {
                          style = 'bg-rose-50 border-rose-300 text-rose-900 font-semibold ring-1 ring-rose-300';
                        }

                        return (
                          <div key={oIdx} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${style}`}>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs w-5 font-bold">
                                {['A', 'B', 'C', 'D'][oIdx]}.
                              </span>
                              <span>{opt}</span>
                            </div>
                            <div>
                              {isRightAnswer && (
                                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                                  Correct Answer
                                </span>
                              )}
                              {isChosen && !isRightAnswer && (
                                <span className="text-[10px] uppercase font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950">
                      <span className="font-bold text-indigo-900 block mb-0.5">Explanation:</span>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Next CTA to Report */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
        <div>
          <h3 className="text-lg font-bold">Complete Career Readiness Report is Ready</h3>
          <p className="text-xs text-slate-400">
            Synthesizing your resume entities, job predictions, skill gaps, and assessment scores into a downloadable PDF report.
          </p>
        </div>

        <Link to="/report" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" icon={ArrowRight} iconPosition="right">
            Open Final Career Report
          </Button>
        </Link>
      </div>
    </div>
  );
};
