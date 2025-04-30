import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Celebration from '@/components/gamification/Celebration';
import ProgressTracker from '@/components/gamification/ProgressTracker';
import withMainLayout from '@/components/layout/withMainLayout';
import DugExplanation from '@/components/lesson/DugExplanation';
import DynamicContent from '@/components/lesson/DynamicContent';
import LessonComplete from '@/components/lesson/LessonComplete';
import LessonContent from '@/components/lesson/LessonContent';
import MilestoneProgress from '@/components/lesson/MilestoneProgress';
import MiniEvaluation from '@/components/lesson/MiniEvaluation';

interface Milestone {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  evaluation?: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  };
  difficultyDetected?: boolean;
  dynamicContent?: {
    type: 'video' | 'image' | 'illustration';
    url: string;
  };
  environmentInteraction?: {
    prompt: string;
    expectedResponse: string;
  };
}

interface LessonState {
  currentMilestoneIndex: number;
  showEvaluation: boolean;
  evaluationAttempts: number;
  needsAdditionalHelp: boolean;
  milestones: Milestone[];
  showDynamicContent: boolean;
  showEnvironmentInteraction: boolean;
  xp: number;
  level: number;
  showCelebration: boolean;
  recentXPGain: number;
}

interface MockLesson {
  milestones: Milestone[];
}

interface MockLessons {
  [key: string]: MockLesson;
}

const XP_PER_MILESTONE = 50;
const XP_PER_LEVEL = 200;

function LessonPage() {
  const router = useRouter();
  const { id: lessonId } = router.query;

  const [lessonState, setLessonState] = useState<LessonState>({
    currentMilestoneIndex: 0,
    showEvaluation: false,
    evaluationAttempts: 0,
    needsAdditionalHelp: false,
    milestones: [],
    showDynamicContent: false,
    showEnvironmentInteraction: false,
    xp: 0,
    level: 1,
    showCelebration: false,
    recentXPGain: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Debug log
    console.log('Current lessonId:', lessonId);

    if (typeof lessonId === 'string') {
      const mockLessons: MockLessons = {
        '1': {
          milestones: [
            {
              id: 1,
              title: 'Introduction to Addition',
              content:
                "Let's start by understanding what addition means. Addition is the process of combining numbers to find their total. Think of it as counting all items together!",
              completed: false,
              evaluation: {
                questions: [
                  {
                    id: 1,
                    question: 'What is 2 + 3?',
                    options: ['4', '5', '6', '7'],
                    correctAnswer: '5',
                  },
                ],
              },
            },
            {
              id: 2,
              title: 'Adding Single Digits',
              content:
                "Now let's practice adding single-digit numbers. Remember, you can count on your fingers or use objects to help you count!",
              completed: false,
              evaluation: {
                questions: [
                  {
                    id: 1,
                    question: 'What is 4 + 5?',
                    options: ['8', '9', '10', '7'],
                    correctAnswer: '9',
                  },
                ],
              },
            },
          ],
        },
        '2': {
          milestones: [
            {
              id: 1,
              title: 'Basic English Words',
              content:
                "Let's learn some common English words that we use every day. We'll start with emotions and feelings.",
              completed: false,
              evaluation: {
                questions: [
                  {
                    id: 1,
                    question: 'What is the opposite of "happy"?',
                    options: ['Sad', 'Angry', 'Tired', 'Excited'],
                    correctAnswer: 'Sad',
                  },
                ],
              },
            },
          ],
        },
        '3': {
          milestones: [
            {
              id: 1,
              title: 'What is Science?',
              content:
                'Science is how we study and understand the world around us. It helps us answer questions about nature, space, and everything we see!',
              completed: false,
              evaluation: {
                questions: [
                  {
                    id: 1,
                    question: 'What does science help us understand?',
                    options: [
                      'Video games',
                      'The world around us',
                      'Movies',
                      'Sports',
                    ],
                    correctAnswer: 'The world around us',
                  },
                ],
              },
            },
          ],
        },
      };

      // Debug log
      console.log('Looking for lesson:', lessonId);

      const lessonData = mockLessons[lessonId];

      // Debug log
      console.log('Found lesson data:', lessonData);

      if (lessonData) {
        setLessonState((prev) => ({
          ...prev,
          milestones: lessonData.milestones,
        }));
      }
      setIsLoading(false);
    }
  }, [lessonId]);

  const handleEvaluationComplete = (passed: boolean) => {
    if (passed) {
      // Calculate XP gain
      const xpGain = XP_PER_MILESTONE - lessonState.evaluationAttempts * 10;

      // Update state with new XP and show celebration
      setLessonState((prev) => ({
        ...prev,
        currentMilestoneIndex: prev.currentMilestoneIndex + 1,
        showEvaluation: false,
        evaluationAttempts: 0,
        needsAdditionalHelp: false,
        showDynamicContent: false,
        showEnvironmentInteraction: false,
        xp: prev.xp + xpGain,
        level: Math.floor((prev.xp + xpGain) / XP_PER_LEVEL) + 1,
        showCelebration: true,
        recentXPGain: xpGain,
        milestones: prev.milestones.map((m, i) =>
          i === prev.currentMilestoneIndex ? { ...m, completed: true } : m,
        ),
      }));
    } else {
      setLessonState((prev) => ({
        ...prev,
        showEvaluation: false,
        evaluationAttempts: prev.evaluationAttempts + 1,
        needsAdditionalHelp: true,
        showDynamicContent: true,
      }));
    }
  };

  const handleCelebrationComplete = () => {
    setLessonState((prev) => ({
      ...prev,
      showCelebration: false,
      recentXPGain: 0,
    }));
  };

  const startEvaluation = () => {
    setLessonState((prev) => ({
      ...prev,
      showEvaluation: true,
    }));
  };

  const handleEnvironmentInteraction = (response: string) => {
    const currentMilestone =
      lessonState.milestones[lessonState.currentMilestoneIndex];
    if (
      currentMilestone?.environmentInteraction?.expectedResponse === response
    ) {
      setLessonState((prev) => ({
        ...prev,
        showEnvironmentInteraction: false,
      }));
    }
  };

  const handleNextLesson = () => {
    const nextLessonId = String(Number(lessonId) + 1);
    router.push(`/lesson/${nextLessonId}`);
  };

  if (isLoading) {
    return <div>Loading lesson...</div>;
  }

  const currentMilestone =
    lessonState.milestones[lessonState.currentMilestoneIndex];

  if (!currentMilestone) {
    return <LessonComplete onNextLesson={handleNextLesson} />;
  }

  const milestoneProgress =
    (lessonState.currentMilestoneIndex / lessonState.milestones.length) * 100;

  return (
    <div className="mx-auto">
      <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-8">
        <div className="w-full md:w-4/5">
          <div className="rounded-lg bg-white p-3 shadow-sm md:p-6">
            {lessonState.showEvaluation ? (
              <MiniEvaluation
                questions={currentMilestone.evaluation?.questions || []}
                onComplete={handleEvaluationComplete}
                attempt={lessonState.evaluationAttempts + 1}
              />
            ) : (
              <>
                <DugExplanation
                  milestone={currentMilestone}
                  needsAdditionalHelp={lessonState.needsAdditionalHelp}
                />

                <LessonContent
                  milestone={currentMilestone}
                  needsAdditionalHelp={lessonState.needsAdditionalHelp}
                />

                {lessonState.showDynamicContent &&
                  currentMilestone.dynamicContent && (
                    <DynamicContent content={currentMilestone.dynamicContent} />
                  )}

                {lessonState.showEnvironmentInteraction &&
                  currentMilestone.environmentInteraction && (
                    <div className="mt-4 rounded-lg bg-blue-50 p-2 md:p-4">
                      <p className="mb-2 text-[12px] md:text-base">
                        {currentMilestone.environmentInteraction.prompt}
                      </p>
                      <input
                        type="text"
                        className="w-full rounded border p-2 text-[12px] md:text-base"
                        placeholder="Your response..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleEnvironmentInteraction(
                              (e.target as HTMLInputElement).value,
                            );
                          }
                        }}
                      />
                    </div>
                  )}

                <div className="mt-4 flex justify-end md:mt-8">
                  <button
                    onClick={startEvaluation}
                    className="rounded-[5px] bg-blue-500 px-3 py-1 text-[14px] font-medium text-white transition-colors hover:bg-blue-600 md:rounded-lg md:px-6 md:py-3 md:text-base"
                  >
                    Check Understanding
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="size-full md:w-1/5">
          <ProgressTracker
            currentXP={lessonState.xp}
            levelXP={XP_PER_LEVEL}
            milestoneProgress={milestoneProgress}
            currentLevel={lessonState.level}
            recentXPGain={lessonState.recentXPGain}
          />
          <MilestoneProgress
            milestones={lessonState.milestones}
            currentIndex={lessonState.currentMilestoneIndex}
          />
        </div>

        {lessonState.showCelebration && (
          <Celebration
            xpGained={lessonState.recentXPGain}
            badgeProgress={{
              current: lessonState.currentMilestoneIndex + 1,
              total: lessonState.milestones.length,
              badgeName: 'Lesson Completion',
            }}
            onComplete={handleCelebrationComplete}
          />
        )}
      </div>
    </div>
  );
}

export default withMainLayout(LessonPage);
