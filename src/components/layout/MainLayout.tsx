import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const avatars = [
  { id: 'owl', name: 'Owl', image: '/avatars/owl.webp' },
  { id: 'penguin', name: 'Penguin', image: '/avatars/penguin.avif' },
  { id: 'cat', name: 'Cat', image: '/avatars/cat.webp' },
  { id: 'bird', name: 'Bird', image: '/avatars/bird.avif' },
  { id: 'panda', name: 'Panda', image: '/avatars/panda.jpg' },
  { id: 'pet', name: 'Pet', image: '/avatars/pet.jpg' },
];

const pageTitles: { [key: string]: string | ((params: any) => string) } = {
  '/dashboard': 'Courses Dashboard',
  '/settings': 'Settings',
  '/bookmarks': 'My Bookmarks',
  '/trending': 'Trending Courses',
  '/help': 'Help Center',
  '/completed': 'Completed Courses',
  '/lesson/[id]': (params) => {
    const lessonTitles: { [key: string]: string } = {
      '1': 'Basic Mathematics',
      '2': 'English Vocabulary',
      '3': 'Science Basics',
    };
    return lessonTitles[params.id] || `Lesson ${params.id}`;
  },
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [companionData, setCompanionData] = useState<{
    avatar: string;
    nickname: string;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currentPath = router.pathname;
    const titleValue = pageTitles[currentPath];

    if (typeof titleValue === 'function') {
      setPageTitle(titleValue(router.query));
    } else {
      setPageTitle(titleValue || 'Dashboard');
    }
  }, [router.pathname, router.query]);

  useEffect(() => {
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      setCompanionData({
        avatar: parsed.avatar,
        nickname: parsed.nickname || 'Learning Companion',
      });
    }
  }, []);

  const selectedAvatar = companionData?.avatar
    ? avatars.find((a) => a.id === companionData.avatar)
    : null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative md:block ${isMobileMenuOpen ? 'block' : 'hidden'} z-50 h-full w-20 bg-white shadow-sm transition-all duration-300 ease-in-out md:w-64`}
      >
        <div className="p-3 md:p-6">
          <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
            <div className="flex size-10 items-center justify-center rounded-full bg-indigo-600">
              <span className="text-xl font-bold text-white">O</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">Dug-Tutor</h1>
              <p className="text-sm text-gray-500">Learning with Fun</p>
            </div>
          </div>

          <nav className="space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 text-indigo-600 md:justify-start"
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="hidden font-medium md:inline">My Courses</span>
            </Link>

            <Link
              href="/bookmarks"
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 md:justify-start"
            >
              <svg
                className="size-6"
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
              <span className="hidden md:inline">Bookmarks</span>
            </Link>

            <Link
              href="/trending"
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 md:justify-start"
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="hidden md:inline">Trending Courses</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 md:justify-start"
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden md:inline">Help Articles</span>
              <span className="ml-auto hidden rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 md:inline">
                6
              </span>
            </Link>

            <Link
              href="/completed"
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 md:justify-start"
            >
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden md:inline">Completed Courses</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 md:justify-start"
            >
              <svg
                className="size-6"
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
              <span className="hidden md:inline">Settings</span>
            </Link>
          </nav>

          {/* Learning Companion Section - Desktop Only */}
          <div className="mt-8 hidden md:block">
            <h2 className="flex items-center text-lg font-semibold">
              My Learning Companion
            </h2>
            <div className="mt-4 space-y-4">
              {selectedAvatar ? (
                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-2">
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={selectedAvatar.image}
                      alt={selectedAvatar.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div></div>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gray-200">
                    <svg
                      className="size-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Select Companion
                    </p>
                    <p className="text-sm text-gray-500">Complete onboarding</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out md:ml-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 md:px-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="-ml-2 p-2 md:hidden"
              >
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-[18px] font-semibold md:text-2xl">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-6">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search Dashboard"
                  className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <svg
                  className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Profile and Learning Companion */}
              <div className="flex items-center gap-2 md:gap-4">
                {/* Learning Companion - Mobile Only */}
                <div className="md:hidden">
                  {selectedAvatar ? (
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 animate-bounce overflow-hidden">
                        <img
                          src={selectedAvatar.image}
                          alt={selectedAvatar.name}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-sm font-medium">
                          {selectedAvatar.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-10 animate-pulse items-center justify-center bg-gray-200">
                      <svg
                        className="size-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Notifications */}
                <button className="relative p-2">
                  <svg
                    className="size-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </button>
                {/* Profile */}
                <button className="size-10 rounded-full bg-gray-200"></button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-200 p-3 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
