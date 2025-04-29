import type { Milestone } from '@/types/lesson';

interface MilestoneProgressProps {
  milestones: Milestone[];
  currentIndex: number;
}

function getMilestoneStyle(index: number, currentIndex: number): string {
  if (index < currentIndex) {
    return 'bg-green-500 text-white';
  }
  if (index === currentIndex) {
    return 'bg-blue-500 text-white';
  }
  return 'bg-gray-200 text-gray-600';
}

function getMilestoneTitleStyle(index: number, currentIndex: number): string {
  if (index < currentIndex) {
    return 'text-green-600';
  }
  if (index === currentIndex) {
    return 'text-blue-600';
  }
  return 'text-gray-600';
}

function getMilestoneStatus(index: number, currentIndex: number): string {
  if (index < currentIndex) {
    return 'Completed';
  }
  if (index === currentIndex) {
    return 'In Progress';
  }
  return 'Upcoming';
}

export default function MilestoneProgress({
  milestones,
  currentIndex,
}: MilestoneProgressProps) {
  return (
    <div className="relative mt-4 rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Lesson Progress</h2>
      <div className="flex flex-col space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-center gap-4">
            {/* Milestone indicator and line */}
            <div className="flex flex-col items-center">
              <div
                className={`flex size-8 items-center justify-center rounded-full ${getMilestoneStyle(
                  index,
                  currentIndex,
                )}`}
              >
                {milestone.completed ? (
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index !== milestones.length - 1 && (
                <div className="relative h-8 w-0.5 bg-gray-200">
                  <div
                    className="absolute left-0 top-0 w-full bg-green-500 transition-all duration-300"
                    style={{
                      height: `${index < currentIndex ? '100' : '0'}%`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Milestone title and status */}
            <div className="flex-1">
              <h3
                className={`font-medium ${getMilestoneTitleStyle(
                  index,
                  currentIndex,
                )}`}
              >
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-500">
                {getMilestoneStatus(index, currentIndex)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
