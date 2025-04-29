import { useRouter } from 'next/router';
import { useState } from 'react';

import AgeAndInterests from '@/components/onboarding/AgeAndInterests';
import DugIntroduction from '@/components/onboarding/DugIntroduction';
import LanguageSelection from '@/components/onboarding/LanguageSelection';
import NicknameSelection from '@/components/onboarding/NicknameSelection';

import AvatarSelection from '../components/onboarding/AvatarSelection';

type OnboardingStep =
  | 'avatar'
  | 'nickname'
  | 'language'
  | 'interests'
  | 'introduction';

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('avatar');
  const [onboardingData, setOnboardingData] = useState({
    avatar: '',
    nickname: '',
    language: 'en',
    age: '',
    interests: [] as string[],
  });

  const steps: OnboardingStep[] = [
    'avatar',
    'nickname',
    'language',
    'interests',
    'introduction',
  ];

  const handleNext = (data: Partial<typeof onboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));

    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    } else {
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      router.push('/dashboard');
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      if (prevStep) {
        setCurrentStep(prevStep);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'avatar':
        return <AvatarSelection onNext={handleNext} />;
      case 'nickname':
        return <NicknameSelection onNext={handleNext} onPrev={handlePrev} />;
      case 'language':
        return <LanguageSelection onNext={handleNext} onPrev={handlePrev} />;
      case 'interests':
        return <AgeAndInterests onNext={handleNext} onPrev={handlePrev} />;
      case 'introduction':
        return (
          <DugIntroduction onNext={() => handleNext({})} onPrev={handlePrev} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 md:mb-20">
            <div className="relative flex items-center justify-between">
              {/* Background lines */}
              <div className="absolute left-0 top-1/2 flex w-full justify-between px-[22px]">
                {[...Array(steps.length - 1)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-0.5 flex-1 ${
                      steps.indexOf(currentStep) > i
                        ? 'bg-blue-500'
                        : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex size-6 items-center justify-center rounded-full text-sm font-medium md:size-10 md:text-lg ${
                    steps.indexOf(currentStep) >= index
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          {renderStep()}

          {currentStep !== 'introduction' && (
            <div className="mt-8 flex w-full justify-between gap-4">
              <div className="w-1/2">
                {currentStep !== 'avatar' && (
                  <button
                    onClick={handlePrev}
                    className="w-full rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
              </div>
              <div
                className={`${currentStep === 'avatar' ? 'hidden' : 'w-1/2'}`}
              >
                <button
                  onClick={() => handleNext({})}
                  className="w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
