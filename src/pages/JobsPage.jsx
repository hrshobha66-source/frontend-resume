import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  TrendingUp,
  Target,
  ArrowRight,
  Info,
  DollarSign,
  CheckCircle,
  Sparkles,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { mockJobRoles, mockJobChartData } from '../mocks/mockJobs';
import { useResume } from '../context/ResumeContext';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { getScoreBadgeStyle } from '../utils/formatters';

export const JobsPage = () => {
  const navigate = useNavigate();
  const { selectedRole, setSelectedRole } = useResume();

  const handleSelectRoleAndProceed = (roleId) => {
    setSelectedRole(roleId);
    navigate('/skill-gap');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Step 3: Market Fit
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Recommended Job Roles
          </h1>
          <p className="text-sm text-slate-500">
            Roles ranked by compatibility against your verified resume skills and fresher hiring rubrics.
          </p>
        </div>

        <Link to="/skill-gap">
          <Button variant="secondary" icon={Target} iconPosition="right">
            Proceed to Skill Gap Analysis
          </Button>
        </Link>
      </div>

      {/* Mandatory Prompt Note */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-900 flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold block">Illustrative scores for frontend design only.</span>
          <span>
            Match percentages are generated using calibrated mock heuristics matching fresher coursework and project attributes against junior market requisites.
          </span>
        </div>
      </div>

      {/* Recharts Bar Chart Summary */}
      <Card className="border-slate-200/90 shadow-soft">
        <CardHeader
          title="Role Compatibility Overview"
          subtitle="Visual comparison of your candidate match score versus general market demand index."
        />
        <CardContent>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockJobChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="role"
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
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
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(value) => [`${value}%`, 'Score']}
                />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Bar
                  dataKey="match"
                  name="Your Resume Match"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
                <Bar
                  dataKey="marketScore"
                  name="Market Demand Index"
                  fill="#94a3b8"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Role Recommendation Cards List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Ranked Roles (Sorted by Match)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockJobRoles.map((role) => {
            const badge = getScoreBadgeStyle(role.matchPercentage);
            const isSelected = selectedRole === role.id;

            return (
              <Card
                key={role.id}
                hoverEffect
                className={`border transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-indigo-600 border-indigo-600 shadow-soft-lg'
                    : 'border-slate-200/90'
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Title and Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                        {isSelected && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                            Active Target
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {role.openingsCount}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block text-sm font-extrabold px-3 py-1 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {role.matchPercentage}% Match
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="space-y-1">
                    <ProgressBar
                      value={role.matchPercentage}
                      color={
                        role.matchPercentage >= 80 ? 'emerald' :
                        role.matchPercentage >= 70 ? 'amber' : 'orange'
                      }
                      size="md"
                      showPercentage={false}
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>Baseline</span>
                      <span className={badge.text}>{badge.label}</span>
                      <span>Target: 90%+</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Key Skills Tags */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold text-slate-700">Core Evaluated Skills:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {role.keySkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fresher Compensation & Demand Info */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Avg Fresher Band</span>
                      <span className="font-bold text-slate-800">{role.avgSalaryFresher}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Hiring Velocity</span>
                      <span className="font-bold text-emerald-600">{role.marketDemand}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3">
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      className="w-full"
                      onClick={() => handleSelectRoleAndProceed(role.id)}
                      icon={Target}
                      iconPosition="left"
                    >
                      {isSelected ? 'Inspect Skill Gap (Selected)' : `Analyze Skill Gap for ${role.title}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
