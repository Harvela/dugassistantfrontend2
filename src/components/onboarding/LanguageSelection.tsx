import { useState } from 'react';

interface LanguageSelectionProps {
  onNext: (data: { language: string }) => void;
  onPrev: () => void;
}

const languages = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageSelection({ onNext }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    onNext({ language: languageId });
  };

  return (
    <div className="text-center">
      <h2 className="mb-3 text-lg font-bold md:mb-6 md:text-3xl">
        Choose Your Language
      </h2>
      <p className="mb-4 text-[14px] text-gray-600 md:mb-8 md:text-lg">
        Select your preferred language for learning
      </p>

      <div className="mx-auto">
        <div className="mb-8 grid grid-cols-2 gap-4">
          {languages.map((language) => (
            <div
              key={language.id}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                selectedLanguage === language.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-blue-100 hover:border-blue-300'
              }`}
              onClick={() => handleSelect(language.id)}
            >
              <div className="mb-2 text-4xl">{language.flag}</div>
              <p className="font-medium">{language.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
