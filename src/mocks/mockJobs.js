export const mockJobRoles = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    matchPercentage: 88,
    tier: 'high',
    badgeColor: 'emerald',
    progressColor: 'bg-emerald-500',
    description: 'Transform complex business datasets into clear actionable insights using SQL, statistical analysis, and interactive dashboards like Tableau and Power BI. High match due to your strong SQL, Pandas, and portfolio projects.',
    keySkills: ['SQL', 'Python', 'Tableau', 'Data Cleaning', 'Exploratory Data Analysis', 'Statistical Inference'],
    avgSalaryFresher: '$68,000 - $82,000 / yr',
    marketDemand: 'Very High',
    openingsCount: '4,200+ active junior positions',
    responsibilities: [
      'Write optimized SQL queries to query relational databases and data warehouses.',
      'Build executive dashboards tracking KPIs, churn, and operational metrics.',
      'Collaborate with business stakeholders to translate questions into data queries.'
    ]
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    matchPercentage: 79,
    tier: 'medium',
    badgeColor: 'amber',
    progressColor: 'bg-amber-500',
    description: 'Build, fine-tune, and deploy machine learning models and predictive pipelines into production environments. Good foundational machine learning experience with Scikit-learn and classification algorithms.',
    keySkills: ['Scikit-Learn', 'Python', 'Model Evaluation', 'FastAPI', 'Docker', 'Feature Engineering'],
    avgSalaryFresher: '$78,000 - $96,000 / yr',
    marketDemand: 'High',
    openingsCount: '2,800+ active junior positions',
    responsibilities: [
      'Preprocess unstructured and tabular datasets for training supervised models.',
      'Evaluate model drift, precision, recall, and ROC-AUC curves.',
      'Containerize inference endpoints using FastAPI and Docker.'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    matchPercentage: 75,
    tier: 'medium',
    badgeColor: 'amber',
    progressColor: 'bg-amber-500',
    description: 'Combine advanced mathematics, predictive modeling, and experimental design to extract deep signals and discover business trends from big data.',
    keySkills: ['Probability & Statistics', 'Hypothesis Testing', 'Python', 'Machine Learning', 'Data Storytelling'],
    avgSalaryFresher: '$75,000 - $92,000 / yr',
    marketDemand: 'High',
    openingsCount: '3,100+ active junior positions',
    responsibilities: [
      'Design A/B tests and statistical hypothesis tests for product features.',
      'Formulate mathematical models to simulate business scenarios.',
      'Communicate complex analytical findings to non-technical leaders.'
    ]
  },
  {
    id: 'python-developer',
    title: 'Python Developer',
    matchPercentage: 68,
    tier: 'lower',
    badgeColor: 'orange',
    progressColor: 'bg-orange-500',
    description: 'Design robust backend services, data scraping utilities, and automation scripts using core Python, RESTful API frameworks, and relational databases.',
    keySkills: ['Core Python', 'Object-Oriented Programming', 'REST APIs', 'SQL', 'FastAPI/Django', 'Unit Testing'],
    avgSalaryFresher: '$65,000 - $80,000 / yr',
    marketDemand: 'Steady',
    openingsCount: '5,500+ active junior positions',
    responsibilities: [
      'Write modular, testable, and clean Python backend services.',
      'Integrate third-party RESTful APIs and handle batch ETL workflows.',
      'Implement data structures and algorithms with optimal time complexity.'
    ]
  }
];

export const mockJobChartData = [
  { role: 'Data Analyst', match: 88, marketScore: 92, fill: '#10b981' },
  { role: 'ML Engineer', match: 79, marketScore: 85, fill: '#f59e0b' },
  { role: 'Data Scientist', match: 75, marketScore: 80, fill: '#6366f1' },
  { role: 'Python Developer', match: 68, marketScore: 78, fill: '#f97316' },
];
