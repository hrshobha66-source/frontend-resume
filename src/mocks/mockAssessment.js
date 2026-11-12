export const mockAssessmentQuestions = [
  // --- PYTHON (Q1 - Q3) ---
  {
    id: 1,
    subject: 'Python',
    question: 'In Python, what is the output of `bool([False])`?',
    options: [
      'False',
      'True',
      'TypeError',
      'None'
    ],
    correctOptionIndex: 1,
    explanation: 'Any non-empty list in Python evaluates to True in a boolean context, even if its single element is False.'
  },
  {
    id: 2,
    subject: 'Python',
    question: 'Which built-in Python function is commonly used with iterables to produce index-item pairs without maintaining a manual counter variable?',
    options: [
      'zip()',
      'map()',
      'enumerate()',
      'range()'
    ],
    correctOptionIndex: 2,
    explanation: '`enumerate()` adds a counter to an iterable and returns it as an enumerate object yielding tuples of (index, item).'
  },
  {
    id: 3,
    subject: 'Python',
    question: 'What is the time complexity of looking up a key in a standard Python dictionary in average conditions?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    correctOptionIndex: 0,
    explanation: 'Python dictionaries are implemented as hash tables with open addressing, providing average O(1) time complexity for key lookups.'
  },

  // --- SQL (Q4 - Q6) ---
  {
    id: 4,
    subject: 'SQL',
    question: 'What is the difference between `WHERE` and `HAVING` clauses in SQL?',
    options: [
      '`WHERE` filters rows before grouping/aggregation; `HAVING` filters aggregated groups.',
      '`HAVING` applies to individual rows; `WHERE` applies to aggregated rows.',
      '`WHERE` can only be used with JOINs; `HAVING` works without JOINs.',
      'There is no functional difference; they are interchangeable aliases.'
    ],
    correctOptionIndex: 0,
    explanation: '`WHERE` filters rows before any GROUP BY operations take place. `HAVING` is evaluated after GROUP BY to filter groups created by aggregate functions.'
  },
  {
    id: 5,
    subject: 'SQL',
    question: 'Which SQL window function assigns sequential integers starting at 1, but gives identical ranks to ties while skipping subsequent rank numbers?',
    options: [
      'DENSE_RANK()',
      'ROW_NUMBER()',
      'RANK()',
      'NTILE()'
    ],
    correctOptionIndex: 2,
    explanation: '`RANK()` gives identical values the same rank and leaves gaps in the ranking sequence (e.g., 1, 2, 2, 4), unlike `DENSE_RANK()` which has no gaps (1, 2, 2, 3).'
  },
  {
    id: 6,
    subject: 'SQL',
    question: 'Which SQL statement performs a LEFT JOIN where rows with no match in the right table result in NULL values for right table columns?',
    options: [
      'INNER JOIN',
      'LEFT OUTER JOIN',
      'FULL OUTER JOIN',
      'CROSS JOIN'
    ],
    correctOptionIndex: 1,
    explanation: 'A `LEFT OUTER JOIN` returns all records from the left table and the matched records from the right table, filling with NULL when no match exists.'
  },

  // --- MACHINE LEARNING (Q7 - Q9) ---
  {
    id: 7,
    subject: 'Machine Learning',
    question: 'Which metric is most appropriate for evaluating a binary classification model when the dataset has severe class imbalance (e.g., 99% negative, 1% positive)?',
    options: [
      'Accuracy',
      'Mean Absolute Error (MAE)',
      'ROC-AUC or Precision-Recall AUC (PR-AUC)',
      'R-Squared'
    ],
    correctOptionIndex: 2,
    explanation: 'Accuracy is misleading on imbalanced datasets because predicting the majority class yields 99% accuracy. PR-AUC and ROC-AUC focus on true positive and false positive trade-offs.'
  },
  {
    id: 8,
    subject: 'Machine Learning',
    question: 'What is the primary role of L1 Regularization (Lasso) compared to L2 Regularization (Ridge)?',
    options: [
      'L1 encourages sparse coefficients by driving less important feature weights exactly to zero.',
      'L1 only scales gradients and never drives coefficients to zero.',
      'L1 prevents all multi-collinearity without feature selection.',
      'L1 is used exclusively for unsupervised neural networks.'
    ],
    correctOptionIndex: 0,
    explanation: 'L1 adds the absolute value of coefficients to the loss penalty, creating a diamond-shaped constraint region that drives non-informative weights to 0, performing automatic feature selection.'
  },
  {
    id: 9,
    subject: 'Machine Learning',
    question: 'In supervised learning, what does high variance in a model indicate?',
    options: [
      'Underfitting: the model is too simple and misses underlying trends.',
      'Overfitting: the model has learned the training noise and fails to generalize to test data.',
      'The learning rate is too low to converge.',
      'The dataset has no numerical features.'
    ],
    correctOptionIndex: 1,
    explanation: 'High variance means the model is overly sensitive to the training samples (overfitting), capturing noise rather than the underlying pattern, leading to poor generalization.'
  },

  // --- DATA STRUCTURES (Q10 - Q12) ---
  {
    id: 10,
    subject: 'Data Structures',
    question: 'Which data structure follows the First-In, First-Out (FIFO) principle and is commonly used for Breadth-First Search (BFS)?',
    options: [
      'Stack',
      'Queue',
      'Heap',
      'Binary Search Tree'
    ],
    correctOptionIndex: 1,
    explanation: 'A Queue adheres to FIFO and is the standard structure for exploring graph and tree nodes level-by-level in Breadth-First Search.'
  },
  {
    id: 11,
    subject: 'Data Structures',
    question: 'What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST)?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n^2)'
    ],
    correctOptionIndex: 2,
    explanation: 'If a BST degenerates into a skewed linked-list-like structure (all elements inserted in sorted order), the worst-case search becomes O(n).'
  },
  {
    id: 12,
    subject: 'Data Structures',
    question: 'Which of the following sorting algorithms guarantees an O(n log n) time complexity in all cases (worst, average, and best)?',
    options: [
      'QuickSort',
      'BubbleSort',
      'MergeSort',
      'InsertionSort'
    ],
    correctOptionIndex: 2,
    explanation: 'MergeSort divides the array into halves and merges them in O(n) per level with log n levels, guaranteeing O(n log n) across best, average, and worst cases.'
  },

  // --- STATISTICS (Q13 - Q15) ---
  {
    id: 13,
    subject: 'Statistics',
    question: 'According to the Central Limit Theorem (CLT), what happens to the distribution of sample means as sample size n becomes sufficiently large?',
    options: [
      'It mirrors the original population shape, even if skewed or bimodal.',
      'It approaches a normal (Gaussian) distribution, regardless of the population distribution shape.',
      'The variance of the sample means increases proportionally to n.',
      'The mean becomes equal to zero in all circumstances.'
    ],
    correctOptionIndex: 1,
    explanation: 'The Central Limit Theorem guarantees that the distribution of sample means approximates a normal distribution as the sample size n increases (typically n >= 30), irrespective of the population shape.'
  },
  {
    id: 14,
    subject: 'Statistics',
    question: 'In hypothesis testing, what is a Type I error?',
    options: [
      'Failing to reject the null hypothesis when it is actually false (false negative).',
      'Rejecting the null hypothesis when it is actually true (false positive).',
      'Using a two-tailed test instead of a one-tailed test.',
      'Calculating an incorrect standard deviation.'
    ],
    correctOptionIndex: 1,
    explanation: 'A Type I error (denoted by alpha) occurs when an investigator rejects the null hypothesis even though the null hypothesis is true (a false positive finding).'
  },
  {
    id: 15,
    subject: 'Statistics',
    question: 'Which measure of central tendency is least sensitive to extreme outliers in a skewed dataset?',
    options: [
      'Mean',
      'Median',
      'Standard Deviation',
      'Root Mean Square'
    ],
    correctOptionIndex: 1,
    explanation: 'The median represents the middle value of ordered observations and is resistant (robust) to extreme outliers, unlike the arithmetic mean which is pulled toward skew.'
  }
];

export const defaultMockResult = {
  totalQuestions: 15,
  score: 13,
  percentage: 86.7,
  correctCount: 13,
  incorrectCount: 2,
  timeTakenMinutes: 14,
  completionDate: 'Just now',
  subjectScores: [
    { subject: 'Python', score: 3, total: 3, percentage: 100 },
    { subject: 'SQL', score: 3, total: 3, percentage: 100 },
    { subject: 'ML', score: 2, total: 3, percentage: 66.7 },
    { subject: 'Data Structures', score: 3, total: 3, percentage: 100 },
    { subject: 'Statistics', score: 2, total: 3, percentage: 66.7 },
  ],
  improvementAreas: [
    {
      subject: 'Statistics',
      topic: 'Type I vs Type II Hypothesis Testing Errors',
      recommendation: 'Review alpha/beta risks and confusion matrix mappings in experimental statistical analysis.'
    },
    {
      subject: 'Machine Learning',
      topic: 'Regularization Penalty Mechanics (L1 vs L2)',
      recommendation: 'Practice mathematical formulations of Lasso vs Ridge geometric constraints.'
    }
  ]
};
