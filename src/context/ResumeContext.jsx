import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMockResumeData } from '../mocks/mockResumeData';
import { mockAssessmentQuestions, defaultMockResult } from '../mocks/mockAssessment';

const ResumeContext = createContext(null);

const RESUME_STORAGE_KEY = 'ai_resume_data';
const ASSESSMENT_STORAGE_KEY = 'ai_assessment_result';
const SELECTED_ROLE_KEY = 'ai_selected_job_role';

export const ResumeProvider = ({ children }) => {
  // Resume data
  const [resumeData, setResumeData] = useState(() => {
    try {
      const stored = localStorage.getItem(RESUME_STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialMockResumeData;
    } catch (e) {
      return initialMockResumeData;
    }
  });

  // Uploaded file state
  const [uploadedFile, setUploadedFile] = useState({
    name: 'Alex_Johnson_Resume_2024.pdf',
    size: 1420500, // ~1.4 MB
    type: 'application/pdf',
    lastModifiedDate: new Date().toLocaleDateString()
  });

  // Selected Target Job Role
  const [selectedRole, setSelectedRole] = useState(() => {
    try {
      return localStorage.getItem(SELECTED_ROLE_KEY) || 'data-analyst';
    } catch (e) {
      return 'data-analyst';
    }
  });

  // Assessment answers state: { [qId]: optionIndex }
  const [assessmentAnswers, setAssessmentAnswers] = useState({
    1: 1, // correct
    2: 2, // correct
    3: 0, // correct
    4: 0, // correct
    5: 2, // correct
    6: 1, // correct
    7: 2, // correct
    8: 1, // incorrect (selected 1 instead of 0)
    9: 1, // correct
    10: 1, // correct
    11: 2, // correct
    12: 2, // correct
    13: 1, // correct
    14: 0, // incorrect (selected 0 instead of 1)
    15: 1  // correct
  });

  // Assessment results
  const [assessmentResult, setAssessmentResult] = useState(() => {
    try {
      const stored = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultMockResult;
    } catch (e) {
      return defaultMockResult;
    }
  });

  // Sync resumeData to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error(e);
    }
  }, [resumeData]);

  // Sync selectedRole
  useEffect(() => {
    try {
      localStorage.setItem(SELECTED_ROLE_KEY, selectedRole);
    } catch (e) {
      console.error(e);
    }
  }, [selectedRole]);

  // Sync assessment result
  useEffect(() => {
    try {
      localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(assessmentResult));
    } catch (e) {
      console.error(e);
    }
  }, [assessmentResult]);

  // Update answer for single question
  const setAnswer = (questionId, optionIndex) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Submit and calculate final assessment score
  const evaluateAssessment = () => {
    let correct = 0;
    const subjectBreakdown = {};

    mockAssessmentQuestions.forEach((q) => {
      const userChoice = assessmentAnswers[q.id];
      const isCorrect = userChoice === q.correctOptionIndex;
      if (isCorrect) correct += 1;

      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { correct: 0, total: 0 };
      }
      subjectBreakdown[q.subject].total += 1;
      if (isCorrect) {
        subjectBreakdown[q.subject].correct += 1;
      }
    });

    const totalQuestions = mockAssessmentQuestions.length;
    const scorePct = Math.round((correct / totalQuestions) * 1000) / 10;

    const subjectScores = Object.entries(subjectBreakdown).map(([subject, stats]) => ({
      subject,
      score: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));

    // Find weak areas (where correct < total)
    const improvementAreas = [];
    mockAssessmentQuestions.forEach(q => {
      if (assessmentAnswers[q.id] !== q.correctOptionIndex) {
        improvementAreas.push({
          subject: q.subject,
          topic: q.question.substring(0, 60) + '...',
          recommendation: q.explanation
        });
      }
    });

    const result = {
      totalQuestions,
      score: correct,
      percentage: scorePct,
      correctCount: correct,
      incorrectCount: totalQuestions - correct,
      timeTakenMinutes: 12,
      completionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      subjectScores,
      improvementAreas: improvementAreas.length > 0 ? improvementAreas : [
        { subject: 'Advanced ML', topic: 'Ensemble Tuning', recommendation: 'Continue practicing hyperparameter optimization.' }
      ]
    };

    setAssessmentResult(result);
    return result;
  };

  // Reset entire flow or assessment
  const resetAssessment = () => {
    setAssessmentAnswers({});
  };

  // Update specific section of resume data
  const updateResumeSection = (sectionKey, updatedContent) => {
    setResumeData(prev => ({
      ...prev,
      [sectionKey]: updatedContent
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateResumeSection,
        uploadedFile,
        setUploadedFile,
        selectedRole,
        setSelectedRole,
        assessmentAnswers,
        setAnswer,
        evaluateAssessment,
        resetAssessment,
        assessmentResult
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
