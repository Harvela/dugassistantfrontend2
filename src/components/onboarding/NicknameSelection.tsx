import { useState } from 'react';

interface NicknameSelectionProps {
  onNext: (data: { nickname: string }) => void;
  onPrev: () => void;
}

export default function NicknameSelection({ onNext }: NicknameSelectionProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }

    if (nickname.length < 2) {
      setError('Nickname must be at least 2 characters long');
      return;
    }

    onNext({ nickname: nickname.trim() });
  };

  return (
    <div className="text-center">
      <h2 className="mb-3 text-lg font-bold md:mb-6 md:text-3xl">
        What Should We Call You?
      </h2>
      <p className="mb-4 text-[14px] text-gray-600 md:mb-8 md:text-lg">
        Choose a fun nickname for your learning journey
      </p>

      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="mb-4">
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError('');
            }}
            placeholder="Enter your nickname"
            className={`w-full rounded-lg border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
}
