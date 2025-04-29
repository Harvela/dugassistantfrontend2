import { useState } from 'react';

interface AvatarSelectionProps {
  onNext: (data: { avatar: string }) => void;
}

const avatars = [
  { id: 'owl', name: 'Owl', image: '/avatars/owl.webp' },
  { id: 'penguin', name: 'Penguin', image: '/avatars/penguin.avif' },
  { id: 'cat', name: 'Cat', image: '/avatars/cat.webp' },
  { id: 'bird', name: 'Bird', image: '/avatars/bird.avif' },
  { id: 'panda', name: 'Panda', image: '/avatars/panda.jpg' },
  { id: 'pet', name: 'Pet', image: '/avatars/pet.jpg' },
];

export default function AvatarSelection({ onNext }: AvatarSelectionProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const handleSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
  };

  const handleContinue = () => {
    if (selectedAvatar) {
      onNext({ avatar: selectedAvatar });
    }
  };

  return (
    <div className="text-center">
      <h2 className="mb-3 text-lg font-bold md:mb-6 md:text-3xl">
        Choose Your Learning Companion
      </h2>
      <p className="mb-4 text-[14px] text-gray-600 md:mb-8 md:text-lg">
        Select a friendly companion to join you on your learning journey
      </p>

      <div className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className={`cursor-pointer rounded-lg border-2 p-2 transition-all md:p-4 ${
              selectedAvatar === avatar.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-blue-100 hover:border-blue-300'
            }`}
            onClick={() => handleSelect(avatar.id)}
          >
            <div className="mx-auto mb-2 size-16 md:size-24">
              <img
                src={avatar.image}
                alt={avatar.name}
                className="size-full object-contain"
              />
            </div>
            <p className="font-medium">{avatar.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedAvatar}
        className={`w-full rounded-lg px-6 py-3 font-medium transition-colors ${
          selectedAvatar
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'cursor-not-allowed bg-gray-200 text-gray-500'
        }`}
      >
        Continue
      </button>
    </div>
  );
}
