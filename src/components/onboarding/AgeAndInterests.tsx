import { useState } from 'react';

interface AgeAndInterestsProps {
  onNext: (data: { age: string; interests: string[] }) => void;
  onPrev: () => void;
}

const ageGroups = [
  { id: '5-8', label: '5-8 years' },
  { id: '9-12', label: '9-12 years' },
  { id: '13-15', label: '13-15 years' },
  { id: '16+', label: '16+ years' },
];

const subjects = [
  { id: 'math', label: 'Mathematics' },
  { id: 'science', label: 'Science' },
  { id: 'history', label: 'History' },
  { id: 'geography', label: 'Geography' },
  { id: 'language', label: 'Languages' },
  { id: 'art', label: 'Art' },
  { id: 'music', label: 'Music' },
  { id: 'sports', label: 'Sports' },
];

export default function AgeAndInterests({ onNext }: AgeAndInterestsProps) {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId],
    );
    onNext({ age: selectedAge, interests: selectedInterests });
  };

  return (
    <div className="text-center">
      <h2 className="mb-3 text-lg font-bold md:mb-6 md:text-3xl">
        Tell Us About Yourself
      </h2>
      <p className="mb-4 text-[14px] text-gray-600 md:mb-8 md:text-lg">
        Help us personalize your learning experience
      </p>

      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h3 className="mb-3 text-[16px] font-semibold md:mb-4 md:text-xl">
            Select Your Age Group
          </h3>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            {ageGroups.map((age) => (
              <div
                key={age.id}
                className={`cursor-pointer rounded-lg border-2 p-2 transition-all md:p-4 ${
                  selectedAge === age.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-blue-100 hover:border-blue-300'
                }`}
                onClick={() => {
                  setSelectedAge(age.id);
                  setError('');
                }}
              >
                <p className="font-medium">{age.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-[16px] font-semibold md:mb-4 md:text-xl">
            Select Your Interests
          </h3>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className={`cursor-pointer rounded-lg border-2 p-2 transition-all md:p-4 ${
                  selectedInterests.includes(subject.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-blue-100 hover:border-blue-300'
                }`}
                onClick={() => {
                  handleInterestToggle(subject.id);
                  setError('');
                }}
              >
                <p className="font-medium">{subject.label}</p>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="mb-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
