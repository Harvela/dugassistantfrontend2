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
    <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Level {currentLevel}
          </h3>
          <p className="text-sm text-gray-600">
            {currentXP} / {levelXP} XP to next level
          </p>
        </div>
        {recentXPGain && (
          <div className="animate-bounce rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            +{recentXPGain} XP
          </div>
        )}
      </div>

      {/* Overall XP Progress */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-gray-600">Overall Progress</span>
          <span className="text-gray-900">
            {Math.round((currentXP / levelXP) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentXP / levelXP) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Milestone Progress */}
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-gray-600">Current Milestone</span>
          <span className="text-gray-900">{milestoneProgress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${milestoneProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
