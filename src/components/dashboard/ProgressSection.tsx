interface ProgressSectionProps {
  level: number;
  xp: number;
  badges: string[];
}

const XP_PER_LEVEL = 1000;

export default function ProgressSection({
  level,
  xp,
  badges,
}: ProgressSectionProps) {
  const xpToNextLevel = XP_PER_LEVEL - (xp % XP_PER_LEVEL);
  const progressPercentage = ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Your Progress</h2>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-gray-600">
              Level {level}
            </span>
            <span className="text-sm font-medium text-gray-600">{xp} XP</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {xpToNextLevel} XP until next level
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-medium">Your Badges</h3>
          <div className="flex flex-wrap gap-3">
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex size-12 items-center justify-center rounded-full bg-yellow-100"
                  title={`${badge} Badge`}
                >
                  <span className="text-2xl">🏆</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No badges yet. Keep learning!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
