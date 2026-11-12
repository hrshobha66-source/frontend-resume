import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Send,
  RotateCcw,
  Clock,
  Layers
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { mockAssessmentQuestions } from '../mocks/mockAssessment';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Modal } from '../components/Modal';

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const { assessmentAnswers, setAnswer, evaluateAssessment } = useResume();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = mockAssessmentQuestions.length;
  const currentQuestion = mockAssessmentQuestions[currentIndex];
  const selectedOption = assessmentAnswers[currentQuestion.id];

  // Count answered questions
  const answeredCount = mockAssessmentQuestions.filter(
    (q) => assessmentAnswers[q.id] !== undefined
  ).length;

  const unansweredCount = totalQuestions - answeredCount;

  const handleSelectOption = (optionIndex) => {
    setAnswer(currentQuestion.id, optionIndex);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      evaluateAssessment();
      setIsSubmitting(false);
      setSubmitModalOpen(false);
      navigate('/result');
    }, 600);
  };

  const subjectBadges = {
    Python: 'bg-blue-50 text-blue-700 border-blue-200',
    SQL: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Machine Learning': 'bg-purple-50 text-purple-700 border-purple-200',
    'Data Structures': 'bg-amber-50 text-amber-700 border-amber-200',
    Statistics: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            Step 5: Assessment
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Technical Competency Assessment
          </h1>
          <p className="text-sm text-slate-500">
            15 curated multiple-choice questions evaluating core fresher foundations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            icon={Send}
            iconPosition="right"
            onClick={() => setSubmitModalOpen(true)}
            className="shadow-sm shadow-indigo-600/20"
          >
            Submit Assessment
          </Button>
        </div>
      </div>

      {/* Progress & Stats Bar */}
      <Card className="border-slate-200/90 shadow-2xs">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="text-indigo-600 font-bold">{answeredCount}</span> of {totalQuestions} answered
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {Math.round((answeredCount / totalQuestions) * 100)}% Completed
            </span>
          </div>
          <ProgressBar
            value={answeredCount}
            max={totalQuestions}
            color="indigo"
            size="sm"
            showPercentage={false}
          />
        </CardContent>
      </Card>

      {/* Main Question Card (One question per screen) */}
      <Card className="border-slate-200 shadow-soft">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg bg-indigo-600 text-white">
                Q{currentIndex + 1}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${subjectBadges[currentQuestion.subject] || 'bg-slate-100 text-slate-700'}`}>
                {currentQuestion.subject}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Single Choice
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Radio Options */}
          <div className="space-y-3" role="radiogroup" aria-label={`Question ${currentIndex + 1}`}>
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <label
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 select-none
                    ${isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600 shadow-2xs'
                      : 'border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50/80 bg-white'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={optIdx}
                    checked={isSelected}
                    onChange={() => handleSelectOption(optIdx)}
                    className="sr-only"
                  />

                  {/* Letter badge / check circle */}
                  <div
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors
                      ${isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}
                  >
                    {optionLetters[optIdx]}
                  </div>

                  <span className={`text-sm leading-snug flex-1 ${isSelected ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            icon={ChevronLeft}
          >
            Previous
          </Button>

          <span className="text-xs text-slate-400 font-medium">
            Question {currentIndex + 1} of {totalQuestions}
          </span>

          {currentIndex < totalQuestions - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              icon={ChevronRight}
              iconPosition="right"
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSubmitModalOpen(true)}
              icon={Send}
              iconPosition="right"
            >
              Finish & Review
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Question Navigator (Numbered buttons colored answered / unanswered / current) */}
      <Card className="border-slate-200/90 shadow-2xs">
        <CardHeader
          title="Question Navigator"
          subtitle="Click any question number to jump directly."
        />
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {mockAssessmentQuestions.map((q, idx) => {
              const isCurrent = currentIndex === idx;
              const isAnswered = assessmentAnswers[q.id] !== undefined;

              let btnStyle = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';
              if (isCurrent) {
                btnStyle = 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300 font-black shadow-xs';
              } else if (isAnswered) {
                btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 font-bold';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    w-10 h-10 rounded-xl border text-xs flex items-center justify-center transition-all duration-150
                    ${btnStyle}
                  `}
                  aria-label={`Go to question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Navigator Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-indigo-600 inline-block" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-100 border border-emerald-300 inline-block" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-slate-100 border border-slate-200 inline-block" />
              <span>Unanswered ({unansweredCount})</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        title="Submit Technical Assessment?"
        description="Are you ready to submit your answers and view your performance scorecard?"
        confirmText="Confirm & Submit"
        onConfirm={handleConfirmSubmit}
        isConfirmLoading={isSubmitting}
      >
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Questions:</span>
              <span className="font-bold text-slate-900">{totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700 font-medium">Answered Questions:</span>
              <span className="font-bold text-emerald-700">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-700 font-medium">Unanswered Questions:</span>
              <span className="font-bold text-rose-700">{unansweredCount}</span>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You have <strong>{unansweredCount} unanswered questions</strong>. Any unanswered questions will be marked as incorrect.
              </span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
