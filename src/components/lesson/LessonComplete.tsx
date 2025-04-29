import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface LessonCompleteProps {
  onNextLesson: () => void;
}

export default function LessonComplete({ onNextLesson }: LessonCompleteProps) {
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#FCD34D', '#60A5FA', '#34D399'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-4xl">🎓</div>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Lesson Complete!
        </h2>
        <p className="mb-6 text-gray-600">
          Congratulations! You&apos;ve completed all milestones in this lesson.
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full rounded bg-gray-300 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-200"
          >
            Return to Dashboard
          </button>
          <button
            onClick={onNextLesson}
            className="w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Next Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
