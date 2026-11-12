export const mockDashboardData = {
  summaryStats: [
    {
      id: 'overall-readiness',
      label: 'Career Readiness Index',
      value: '82%',
      subtext: 'High market alignment for Entry-level',
      trend: '+12% from initial scan',
      color: 'indigo'
    },
    {
      id: 'verified-skills',
      label: 'Verified Tech Skills',
      value: '14 Skills',
      subtext: 'Demonstrated in projects & tests',
      trend: 'Top 15% among freshers',
      color: 'emerald'
    },
    {
      id: 'tests-taken',
      label: 'Technical Assessments',
      value: '1 Completed',
      subtext: 'Average score: 86.7%',
      trend: '15/15 questions analyzed',
      color: 'blue'
    },
    {
      id: 'role-match',
      label: 'Top Role Fit',
      value: '88% Match',
      subtext: 'Data Analyst Role',
      trend: '4 matching job titles',
      color: 'amber'
    }
  ],
  readinessProgress: {
    percentage: 82,
    target: 90,
    statusText: 'Strong Entry-Level Candidate',
    milestones: [
      { name: 'Resume Parsed & Validated', completed: true },
      { name: 'Skill Gap Evaluated', completed: true },
      { name: 'Technical Assessment Cleared', completed: true },
      { name: 'Portfolio Project Showcase', completed: true },
      { name: 'Production Cloud Deployment Practice', completed: false }
    ]
  },
  previousAnalyses: [
    {
      id: 'ana-101',
      filename: 'Alex_Johnson_Resume_2024.pdf',
      date: 'Oct 24, 2024',
      topRole: 'Data Analyst',
      score: 88,
      status: 'Active Evaluation'
    },
    {
      id: 'ana-102',
      filename: 'Alex_SWE_Internship_CV.pdf',
      date: 'Sep 12, 2024',
      topRole: 'Python Developer',
      score: 74,
      status: 'Archived'
    },
    {
      id: 'ana-103',
      filename: 'Alex_Johnson_ML_Draft.docx',
      date: 'Aug 04, 2024',
      topRole: 'ML Engineer',
      score: 71,
      status: 'Archived'
    }
  ],
  topJobRecommendations: [
    {
      id: 'role-1',
      title: 'Data Analyst',
      matchScore: 88,
      level: 'Fresher / Entry-Level',
      demand: 'Very High',
      color: 'emerald',
      bgColor: 'bg-emerald-500'
    },
    {
      id: 'role-2',
      title: 'ML Engineer',
      matchScore: 79,
      level: 'Junior / Associate',
      demand: 'High',
      color: 'amber',
      bgColor: 'bg-amber-500'
    },
    {
      id: 'role-3',
      title: 'Data Scientist',
      matchScore: 75,
      level: 'Associate',
      demand: 'Medium-High',
      color: 'indigo',
      bgColor: 'bg-indigo-500'
    }
  ]
};
