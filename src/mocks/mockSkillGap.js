export const mockSkillGapData = {
  'data-analyst': {
    roleTitle: 'Data Analyst',
    matchScore: 88,
    skillsHave: [
      'SQL (PostgreSQL / MySQL)',
      'Python (Pandas, NumPy)',
      'Data Cleaning & Preprocessing',
      'Tableau Basics',
      'Exploratory Data Analysis',
      'Git & Version Control',
      'Descriptive Statistics'
    ],
    missingSkills: [
      'A/B Testing Methodologies',
      'Advanced Excel (VBA, Power Query)',
      'Snowflake / BigQuery Warehouse Querying',
      'dbt (Data Build Tool)'
    ],
    skillsToImprove: [
      { skill: 'Tableau Advanced Calculations & LOD', currentLevel: 65, targetLevel: 90 },
      { skill: 'Statistical Hypothesis Testing (p-values, Chi-Square)', currentLevel: 58, targetLevel: 85 },
      { skill: 'SQL Window Functions & Performance Tuning', currentLevel: 72, targetLevel: 95 },
      { skill: 'Data Storytelling & Executive Presentations', currentLevel: 60, targetLevel: 85 }
    ],
    learningAreas: [
      {
        id: 'la-1',
        topic: 'A/B Testing & Controlled Experimentation',
        whyItMatters: 'Top tech employers require junior analysts to calculate sample size, control for variance, and avoid common p-hacking pitfalls when testing product features.',
        suggestedResources: [
          { name: 'Udacity Free Course: A/B Testing by Google', type: 'Course', duration: '3 weeks', free: true },
          { name: 'Trustworthy Online Controlled Experiments (Kohavi et al.)', type: 'Book / Reference', duration: 'Self-paced', free: false }
        ]
      },
      {
        id: 'la-2',
        topic: 'Modern Cloud Data Warehousing (BigQuery / Snowflake)',
        whyItMatters: 'Modern businesses store multi-gigabyte transactional tables in cloud warehouses rather than standalone local databases.',
        suggestedResources: [
          { name: 'Google Cloud Skills Boost: BigQuery for Analysts', type: 'Hands-on Labs', duration: '12 hours', free: true },
          { name: 'dbt Fundamentals Certification', type: 'Certification Course', duration: '5 hours', free: true }
        ]
      },
      {
        id: 'la-3',
        topic: 'Advanced Tableau Level of Detail (LOD) Expressions',
        whyItMatters: 'Complex cohort analysis and fixed benchmark calculations in enterprise dashboards require mastery of INCLUDE, EXCLUDE, and FIXED expressions.',
        suggestedResources: [
          { name: 'Tableau Official Blueprint & Free Video Tutorials', type: 'Official Docs', duration: '8 hours', free: true },
          { name: 'Maven Analytics: Tableau Desktop Specialist Prep', type: 'Course', duration: '14 hours', free: false }
        ]
      }
    ]
  },
  'ml-engineer': {
    roleTitle: 'ML Engineer',
    matchScore: 79,
    skillsHave: [
      'Python',
      'Scikit-Learn',
      'Pandas & NumPy',
      'Supervised Learning Algorithms',
      'Data Preprocessing & Scaling',
      'Git'
    ],
    missingSkills: [
      'Model Deployment (Docker & Kubernetes)',
      'CI/CD for ML (MLOps pipelines)',
      'MLflow / Weights & Biases Experiment Tracking',
      'Deep Learning Frameworks (PyTorch / TensorFlow)'
    ],
    skillsToImprove: [
      { skill: 'FastAPI / Flask Model Serving', currentLevel: 55, targetLevel: 85 },
      { skill: 'Feature Engineering & Dimension Reduction (PCA)', currentLevel: 68, targetLevel: 90 },
      { skill: 'Handling High-Cardinality & Imbalanced Data', currentLevel: 70, targetLevel: 88 }
    ],
    learningAreas: [
      {
        id: 'la-ml-1',
        topic: 'Dockerizing Machine Learning Models with FastAPI',
        whyItMatters: 'Translating a Jupyter notebook prototype into a scalable microservice container is a primary qualification for fresher ML Engineers.',
        suggestedResources: [
          { name: 'Full Stack Deep Learning Course', type: 'Free Course', duration: '4 weeks', free: true },
          { name: 'FastAPI Official Tutorial: Production Deployments', type: 'Tutorial', duration: '6 hours', free: true }
        ]
      },
      {
        id: 'la-ml-2',
        topic: 'PyTorch Deep Learning Fundamentals',
        whyItMatters: 'Most enterprise computer vision and modern LLM pipelines leverage PyTorch tensors, autograd, and neural network modules.',
        suggestedResources: [
          { name: 'DeepLearning.AI: Deep Learning Specialization', type: 'Course', duration: '4 weeks', free: false },
          { name: 'PyTorch 60-Minute Blitz & Official Tutorials', type: 'Lab', duration: '5 hours', free: true }
        ]
      }
    ]
  },
  'data-scientist': {
    roleTitle: 'Data Scientist',
    matchScore: 75,
    skillsHave: [
      'Python',
      'Exploratory Data Analysis',
      'Basic Machine Learning',
      'SQL Querying',
      'Matplotlib & Seaborn'
    ],
    missingSkills: [
      'Bayesian Statistics & Markov Chains',
      'Time-Series Forecasting (ARIMA / Prophet)',
      'Causal Inference & Econometrics',
      'Natural Language Processing (NLP transformers)'
    ],
    skillsToImprove: [
      { skill: 'Mathematical Statistics & Probability Theory', currentLevel: 62, targetLevel: 90 },
      { skill: 'Hypothesis Testing & Power Analysis', currentLevel: 55, targetLevel: 85 },
      { skill: 'Unsupervised Clustering & Anomaly Detection', currentLevel: 60, targetLevel: 85 }
    ],
    learningAreas: [
      {
        id: 'la-ds-1',
        topic: 'Time-Series Modeling & Forecasting',
        whyItMatters: 'Businesses demand forecasting demand, revenue, and customer traffic using seasonal decomposition and autoregressive models.',
        suggestedResources: [
          { name: 'Forecasting: Principles and Practice (Hyndman)', type: 'Online Free Textbook', duration: 'Self-paced', free: true },
          { name: 'Statsmodels & Prophet in Python Workshop', type: 'Hands-on Project', duration: '8 hours', free: true }
        ]
      }
    ]
  },
  'python-developer': {
    roleTitle: 'Python Developer',
    matchScore: 68,
    skillsHave: [
      'Core Python Syntax',
      'Data Structures (Lists, Dictionaries, Sets)',
      'File I/O & JSON parsing',
      'Basic OOP Principles',
      'Git Version Control'
    ],
    missingSkills: [
      'Django / FastAPI Production Architecture',
      'Asynchronous Programming (asyncio, Celery)',
      'Unit Testing & Pytest Fixtures',
      'Redis Caching & Message Queues'
    ],
    skillsToImprove: [
      { skill: 'Object-Oriented Design Patterns & SOLID', currentLevel: 58, targetLevel: 85 },
      { skill: 'Relational Database Modeling & SQLAlchemy ORM', currentLevel: 64, targetLevel: 88 },
      { skill: 'Algorithm Complexity & Big-O Optimization', currentLevel: 60, targetLevel: 85 }
    ],
    learningAreas: [
      {
        id: 'la-py-1',
        topic: 'Asynchronous Python & Web Services',
        whyItMatters: 'High-throughput web backends require non-blocking I/O with coroutines, event loops, and Redis caching.',
        suggestedResources: [
          { name: 'Real Python: Async IO in Python Complete Walkthrough', type: 'Tutorial', duration: '6 hours', free: true },
          { name: 'Test-Driven Development with Pytest & FastAPI', type: 'Course', duration: '10 hours', free: false }
        ]
      }
    ]
  }
};
