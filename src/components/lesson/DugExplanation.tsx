import { useEffect, useState } from 'react';

import type { Milestone } from '@/types/lesson';

const avatars = [
  { id: 'owl', name: 'Owl', image: '/avatars/owl.webp' },
  { id: 'penguin', name: 'Penguin', image: '/avatars/penguin.avif' },
  { id: 'cat', name: 'Cat', image: '/avatars/cat.webp' },
  { id: 'bird', name: 'Bird', image: '/avatars/bird.avif' },
  { id: 'panda', name: 'Panda', image: '/avatars/panda.jpg' },
  { id: 'pet', name: 'Pet', image: '/avatars/pet.jpg' },
];

interface DugExplanationProps {
  milestone: Milestone;
  needsAdditionalHelp: boolean;
}

export default function DugExplanation({
  milestone,
  needsAdditionalHelp,
}: DugExplanationProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedContent, setDisplayedContent] = useState('');
  const [companionAvatar, setCompanionAvatar] = useState('/avatars/owl.webp');
  const [companionName, setCompanionName] = useState('Learning Companion');

  useEffect(() => {
    // Get the selected companion from localStorage
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      const selectedAvatar = avatars.find((a) => a.id === parsed.avatar);
      if (selectedAvatar) {
        setCompanionAvatar(selectedAvatar.image);
        setCompanionName(selectedAvatar.name);
      }
    }
  }, []);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedContent('');

    const content = needsAdditionalHelp
      ? `Let me explain this in a different way. ${milestone.content}`
      : milestone.content;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content[index]);
        index += 1;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [milestone, needsAdditionalHelp]);

  return (
    <div className="flex items-start space-x-4">
      <div className="relative size-20 shrink-0">
        <img
          src={companionAvatar}
          alt={companionName}
          className={`h-20 object-cover ${isTyping ? 'animate-bounce' : ''}`}
        />
        {isTyping && (
          <div className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>

      <div className="relative flex-1 rounded-lg bg-blue-50 p-4">
        <div className="absolute left-0 top-4 -translate-x-2">
          <div className="size-0 border-y-8 border-r-8 border-blue-50 border-y-transparent" />
        </div>

        <p className="text-gray-700">
          {displayedContent}
          {isTyping && (
            <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-gray-700" />
          )}
        </p>
      </div>
    </div>
  );
}
