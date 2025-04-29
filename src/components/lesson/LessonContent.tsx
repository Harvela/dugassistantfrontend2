import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { AdditionalContent, Milestone } from '@/types/lesson';

interface LessonContentProps {
  milestone: Milestone;
  needsAdditionalHelp: boolean;
}

export default function LessonContent({
  milestone,
  needsAdditionalHelp,
}: LessonContentProps) {
  const [additionalContent, setAdditionalContent] =
    useState<AdditionalContent | null>(null);

  useEffect(() => {
    if (needsAdditionalHelp) {
      // TODO: In real implementation, this would be an API call to get AI-suggested content
      setAdditionalContent({
        type: 'image',
        url: '/lesson-content/addition-visual.png',
        description: `Visual representation of ${milestone.title}`,
      });
    } else {
      setAdditionalContent(null);
    }
  }, [needsAdditionalHelp, milestone.title]);

  const renderContent = () => {
    if (!additionalContent) return null;

    switch (additionalContent.type) {
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={additionalContent.url}
              className="size-full rounded-lg"
              allowFullScreen
            />
          </div>
        );
      case 'image':
      case 'illustration':
        return (
          <div className="relative h-64">
            <Image
              src={additionalContent.url}
              alt={additionalContent.description}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        );
      default:
        return (
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-gray-600">Content type not supported</p>
          </div>
        );
    }
  };

  return (
    <div className="mt-8">
      {additionalContent && (
        <div className="rounded-lg bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Additional Help: {milestone.title}
          </h3>
          {renderContent()}
          <p className="mt-2 text-sm text-gray-600">
            {additionalContent.description}
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Interactive Examples for {milestone.title}
        </h3>
        {/* TODO: Add interactive examples based on the milestone content */}
        <div className="rounded-lg bg-gray-50 p-6">
          <p className="text-gray-600">{milestone.content}</p>
        </div>
      </div>
    </div>
  );
}
