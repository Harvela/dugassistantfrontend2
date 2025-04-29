import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:px-24 md:py-12">
      {/* Header */}
      <header className="mb-24 flex items-center justify-between">
        <div className="text-lg font-bold text-[#2563EB] md:text-2xl">
          DUG TUTOR
        </div>
        <div className="space-x-2">
          <Link
            href="/"
            locale="fr"
            className="text-[#2563EB] hover:text-blue-700"
          >
            FR
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/"
            locale="en"
            className="text-gray-600 hover:text-gray-900"
          >
            EN
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-start">
        {/* Left Section */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-row items-center  gap-4">
            <div>
              <h1 className="text-[1.5rem] font-bold leading-tight text-[#1E293B] md:text-[3.75rem]">
                Bienvenue sur
                <br />
                Dug Assistant
              </h1>
              <p className="my-4 text-[14px] text-[#2563EB] md:my-8 md:text-2xl">
                Une nouvelle façon d&apos;apprendre
                <br />
                grâce à un assistant dédié aux étudiants
              </p>
            </div>
            <div className="relative size-[200px] md:hidden">
              <Image
                src="/avatars/mascot.png"
                alt="Dug Assistant Mascot"
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="animate-bounce"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16 space-y-4">
            <div className="flex flex-row gap-4 md:gap-8">
              <div className="flex w-[50%] flex-col items-center justify-center gap-2 rounded-lg bg-blue-100 p-4">
                <h3 className="mb-3 font-semibold text-[#1E293B]">
                  1. Choisis ton avatar
                </h3>
                <Image
                  src="/avatars/cat.webp"
                  alt="Avatar selection"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center gap-2 rounded-lg bg-blue-100 p-4">
                <h3 className="mb-3 font-semibold text-[#1E293B]">
                  2. Apprends à ton rythme
                </h3>
                <div className="flex size-16 items-center justify-center rounded-lg bg-[#2563EB]">
                  <svg
                    className="size-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex w-[100%] flex-row justify-between rounded-lg bg-blue-100 px-8 py-4">
              <div>
                <h3 className="mb-3 font-semibold text-[#1E293B]">
                  3. Échange avec l&apos;IA
                </h3>
                <div className="ml-4 space-y-1.5">
                  <div className="h-1.5 w-32 rounded bg-gray-100"></div>
                  <div className="h-1.5 w-16 rounded bg-gray-100"></div>
                </div>
              </div>
              <button
                onClick={handleGetStarted}
                className="rounded-lg bg-[#2563EB] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 md:px-8"
              >
                Commencer
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Mascot */}
        <div className="hidden w-1/2 items-start justify-center pt-12 md:flex">
          <div className="relative size-[600px]">
            <Image
              src="/avatars/mascot.png"
              alt="Dug Assistant Mascot"
              fill
              style={{ objectFit: 'contain' }}
              priority
              className="animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
