import React from 'react';

import LessonsList from '@/components/dashboard/LessonsList';
import withMainLayout from '@/components/layout/withMainLayout';

function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Hello Nicole, welcome back!
        </h1>
        <p className="text-sm text-gray-600">
          Continue your learning journey where you left off.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Your Courses Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <span className="rounded bg-indigo-600 px-2 py-1 text-xs text-white">
                  PREMIUM
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="size-6 rounded-full bg-gray-200"></div>
                <span>26 courses</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 hover:bg-gray-100">
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button className="rounded-lg p-2 hover:bg-gray-100">
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <LessonsList />
        </div>

        {/* Activity Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Daily Learning Activity</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>21 Nov 21 - 28 Nov 21</span>
                <button className="rounded p-1 hover:bg-gray-100">
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex h-60 items-center justify-center text-gray-400">
              Chart will be implemented here
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Weekly Status</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>From 12 Oct - 24 Nov</span>
                <button className="rounded p-1 hover:bg-gray-100">
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex h-60 items-center justify-center text-gray-400">
              Chart will be implemented here
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>
                <span className="font-medium">Minimum</span>
                <p>4 Hrs</p>
              </div>
              <div className="text-right">
                <span className="font-medium">Maximum</span>
                <p>8 Hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withMainLayout(DashboardPage);
