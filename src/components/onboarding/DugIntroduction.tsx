import { useEffect, useState } from 'react';

interface DugIntroductionProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function DugIntroduction({ onNext }: DugIntroductionProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="mx-auto size-24 md:size-48">
            <img
              src="/avatars/mascot.png"
              alt="Dug the Learning Companion"
              className="size-full animate-bounce object-contain"
            />
          </div>

          <h2 className="mb-3 text-lg font-bold md:mb-6 md:text-3xl">
            Welcome to Your Learning Journey!
          </h2>

          {showMessage && (
            <div className="space-y-4 rounded-lg bg-white p-6 text-left shadow-lg">
              <p className="text-md md:text-lg">
                Hi there! I&apos;m Dug, your friendly learning companion.
                I&apos;m here to make your learning journey fun and exciting!
              </p>
              <p className="text-md md:text-lg">
                Together, we&apos;ll explore new topics, solve interesting
                problems, and discover amazing things every day.
              </p>
              <p className="text-md md:text-lg">
                Are you ready to start this amazing adventure? Let&apos;s go!
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
