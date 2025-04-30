import React from 'react';

interface ProgressTrackerProps {
  currentXP: number;
  levelXP: number;
  milestoneProgress: number;
  currentLevel: number;
  recentXPGain?: number;
}

export default function ProgressTracker({
  currentXP,
  levelXP,
  milestoneProgress,
  currentLevel,
  recentXPGain,
}: ProgressTrackerProps) {
  return (
    <div className="mb-2 rounded-lg bg-white p-2 shadow-sm md:mb-6 md:p-4">
      <div className="mb-2 flex items-center justify-between md:mb-4">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-900 md:text-lg">
            Level {currentLevel}
          </h3>
          <p className="text-[10px] text-gray-600 md:text-sm">
            {currentXP} / {levelXP} XP to next level
          </p>
        </div>
        {recentXPGain && (
          <div className="animate-bounce rounded-full bg-green-100 px-2 py-1 text-[10px] text-green-800 md:px-3 md:text-sm">
            +{recentXPGain} XP
          </div>
        )}
      </div>

      {/* Overall XP Progress */}
      <div className="mb-2 md:mb-4">
        <div className="mb-1 flex justify-between text-[10px] md:text-sm">
          <span className="text-gray-600">Overall Progress</span>
          <span className="text-gray-900">
            {Math.round((currentXP / levelXP) * 100)}%
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-gray-200 md:h-2">
          <div
            className="h-1 rounded-full bg-blue-500 transition-all duration-500 md:h-2"
            style={{ width: `${(currentXP / levelXP) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Milestone Progress */}
      <div>
        <div className="mb-1 flex justify-between text-[10px] md:text-sm">
          <span className="text-gray-600">Current Milestone</span>
          <span className="text-gray-900">{milestoneProgress}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-gray-200 md:h-2">
          <div
            className="h-2 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${milestoneProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
