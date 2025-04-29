import confetti from 'canvas-confetti';
import React, { useEffect } from 'react';

interface CelebrationProps {
  xpGained: number;
  badgeProgress?: {
    current: number;
    total: number;
    badgeName: string;
  };
  onComplete?: () => void;
}

export default function Celebration({
  xpGained,
  badgeProgress,
  onComplete,
}: CelebrationProps) {
  useEffect(() => {
    // Trigger confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#FCD34D', '#60A5FA', '#34D399'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Call onComplete after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-opacity/50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="animate-bounce-once mx-4 w-full max-w-sm rounded-lg bg-white p-8 text-center">
        <div className="mb-4 text-4xl">🎉</div>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">Great job!</h3>
        <p className="mb-4 text-gray-600">You&apos;ve earned {xpGained} XP!</p>

        {badgeProgress && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-600">
              Progress towards {badgeProgress.badgeName}
            </p>
            <div className="mb-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-yellow-500 transition-all duration-500"
                style={{
                  width: `${(badgeProgress.current / badgeProgress.total) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {badgeProgress.current} / {badgeProgress.total}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
