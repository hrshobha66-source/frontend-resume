export const initialMockResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@fresherhub.edu',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/alex-johnson-tech',
    github: 'github.com/alexj-dev',
    portfolio: 'alexjohnson.dev',
    summary: 'Aspiring Data & AI professional with hands-on foundational experience in Python, SQL, statistical modeling, and data visualization. Proven ability to build end-to-end analytics pipelines, clean complex datasets, and create predictive machine learning models.'
  },
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'National Institute of Engineering',
      location: 'Austin, TX',
      startYear: '2020',
      endYear: '2024',
      gpa: '3.82 / 4.0',
      highlights: 'Dean’s List, Finalist in National University Hackathon 2023, Lead of Campus Data Science Club.'
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (Science & Math)',
      institution: 'Westwood Senior Academy',
      location: 'Austin, TX',
      startYear: '2018',
      endYear: '2020',
      gpa: '94.6%',
      highlights: 'High Distinction in Mathematics and Computer Applications.'
    }
  ],
  technicalSkills: [
    'Python',
    'SQL (PostgreSQL / MySQL)',
    'Pandas & NumPy',
    'Scikit-Learn',
    'Data Visualization (Matplotlib, Seaborn)',
    'Tableau & Power BI',
    'Git & GitHub',
    'REST APIs',
    'Basic Docker',
    'Data Cleaning & Preprocessing',
    'Jupyter Notebooks',
    'Exploratory Data Analysis (EDA)'
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Customer Churn Prediction Engine',
      description: 'Engineered an end-to-end classification pipeline predicting customer turnover for a telecom dataset with 10,000+ entries. Applied SMOTE for class imbalance, tested Random Forest and XGBoost, achieving an 87% ROC-AUC score.',
      techStack: ['Python', 'Scikit-Learn', 'Pandas', 'XGBoost', 'Streamlit'],
      link: 'github.com/alexj-dev/customer-churn-ml'
    },
    {
      id: 'proj-2',
      title: 'E-Commerce Sales Performance Dashboard',
      description: 'Extracted, cleaned, and synthesized transaction logs using SQL CTEs and window functions. Built interactive Tableau dashboards visualizing MRR, cohort retention, and customer lifetime value (LTV).',
      techStack: ['SQL', 'Tableau', 'PostgreSQL', 'Excel'],
      link: 'github.com/alexj-dev/ecommerce-analytics-tableau'
    },
    {
      id: 'proj-3',
      title: 'Automated Financial News Sentiment Classifier',
      description: 'Scraped daily news articles using BeautifulSoup and evaluated market sentiment using VADER and fine-tuned DistilBERT models. Streamed output to a local dashboard.',
      techStack: ['Python', 'BeautifulSoup', 'NLTK', 'Transformers', 'FastAPI'],
      link: 'github.com/alexj-dev/finance-news-sentiment'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google Career Certificates / Coursera',
      issueDate: 'May 2024',
      credentialId: 'COURSERA-GDA-982341'
    },
    {
      id: 'cert-2',
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 2024',
      credentialId: 'AWS-CCP-487219'
    },
    {
      id: 'cert-3',
      title: 'SQL for Data Science Bootcamp',
      issuer: 'UC Davis Online',
      issueDate: 'Aug 2023',
      credentialId: 'UCD-SQL-22019'
    }
  ],
  internships: [
    {
      id: 'exp-1',
      role: 'Junior Data Analyst Intern',
      organization: 'Apex Retail Analytics',
      duration: 'Jun 2023 – Aug 2023 (3 mos)',
      location: 'Remote',
      contributions: [
        'Optimized weekly marketing reporting queries in PostgreSQL, reducing query execution time by 35%.',
        'Built automated Python scripts to clean promotional sales data across 45 retail stores.',
        'Presented bi-weekly cohort churn insights to senior marketing managers using Tableau.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Undergraduate Research Assistant (AI Lab)',
      organization: 'Department of Computing, NIE',
      duration: 'Jan 2023 – May 2023 (5 mos)',
      location: 'On-Campus',
      contributions: [
        'Assisted professor in labeling and annotating biomedical image datasets for segmentation experiments.',
        'Conducted literature reviews on lightweight vision transformers and summarized findings in lab seminars.'
      ]
    }
  ]
};
