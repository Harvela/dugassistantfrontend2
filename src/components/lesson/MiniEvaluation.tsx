import { useState } from 'react';

import type { Question } from '@/types/lesson';

interface MiniEvaluationProps {
  questions: Question[];
  onComplete: (passed: boolean) => void;
  attempt: number;
}

function getOptionClassName(
  submitted: boolean,
  option: string,
  correctAnswer: string,
  selectedAnswer: string | undefined,
): string {
  const baseClasses =
    'w-full rounded-[5px] md:rounded-lg p-2 md:p-3 text-[12px] md:text-base text-left transition-colors';

  if (submitted) {
    if (option === correctAnswer) {
      return `${baseClasses} bg-green-100 text-green-700`;
    }
    if (option === selectedAnswer) {
      return `${baseClasses} bg-red-100 text-red-700`;
    }
    return `${baseClasses} bg-white text-gray-500`;
  }

  if (option === selectedAnswer) {
    return `${baseClasses} bg-blue-100 text-blue-700`;
  }

  return `${baseClasses} bg-white text-gray-700 hover:bg-gray-100`;
}

function getSubmitButtonClassName(
  isComplete: boolean,
  submitted: boolean,
): string {
  const baseClasses =
    'rounded-[5px] md:rounded-lg md:px-6 md:py-3 px-3 py-1 text-[14px] md:text-base font-medium';

  if (isComplete && !submitted) {
    return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`;
  }

  return `${baseClasses} cursor-not-allowed bg-gray-200 text-gray-500`;
}

export default function MiniEvaluation({
  questions,
  onComplete,
  attempt,
}: MiniEvaluationProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(
      (q) => answers[q.id] === q.correctAnswer,
    ).length;

    const passThreshold = Math.ceil(totalQuestions * 0.7); // 70% to pass
    const passed = correctAnswers >= passThreshold;

    setSubmitted(true);
    setTimeout(() => {
      onComplete(passed);
    }, 2000);
  };

  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div>
      <div className="mb-2 md:mb-6">
        <h2 className="text-[14px] font-semibold text-gray-900 md:text-xl">
          Quick Check {attempt > 1 ? `(Attempt ${attempt})` : ''}
        </h2>
        <p className="mt-1 text-[12px] md:text-gray-600">
          Let&apos;s make sure you understood the concept
        </p>
      </div>

      <div className="space-y-2 md:space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="rounded-lg bg-gray-50 p-2 md:p-6">
            <p className="mb-2 text-[12px] font-medium text-gray-900 md:mb-4 md:text-base">
              {question.question}
            </p>

            <div className="space-y-2 md:space-y-4">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(question.id, option)}
                  disabled={submitted}
                  className={getOptionClassName(
                    submitted,
                    option,
                    question.correctAnswer,
                    answers[question.id],
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end md:mt-8">
        <button
          onClick={handleSubmit}
          disabled={!isComplete || submitted}
          className={getSubmitButtonClassName(isComplete, submitted)}
        >
          {submitted ? 'Processing...' : 'Submit Answers'}
        </button>
      </div>
    </div>
  );
}
