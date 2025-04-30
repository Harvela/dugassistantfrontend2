import React, { useEffect, useState } from 'react';

import withMainLayout from '@/components/layout/withMainLayout';

const avatars = [
  { id: 'owl', name: 'Owl', image: '/avatars/owl.webp' },
  { id: 'penguin', name: 'Penguin', image: '/avatars/penguin.avif' },
  { id: 'cat', name: 'Cat', image: '/avatars/cat.webp' },
  { id: 'bird', name: 'Bird', image: '/avatars/bird.avif' },
  { id: 'panda', name: 'Panda', image: '/avatars/panda.jpg' },
  { id: 'pet', name: 'Pet', image: '/avatars/pet.jpg' },
];

const languages = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'it', name: 'Italian', flag: '🇮🇹' },
  { id: 'pt', name: 'Portuguese', flag: '🇵🇹' },
];

interface Evolution {
  name: string;
  outfit: string;
}

type CompanionEvolution = {
  [key: number]: Evolution;
};

const companionEvolution: CompanionEvolution = {
  1: { name: 'Novice', outfit: '/avatars/evolution/novice.png' },
  5: { name: 'Apprentice', outfit: '/avatars/evolution/apprentice.png' },
  10: { name: 'Scholar', outfit: '/avatars/evolution/scholar.png' },
  15: { name: 'Master', outfit: '/avatars/evolution/master.png' },
  20: { name: 'Sage', outfit: '/avatars/evolution/sage.png' },
};

function SettingsPage() {
  const [userData, setUserData] = useState({
    avatar: '',
    language: 'en',
    level: 1,
    xp: 0,
    nickname: '',
    profilePicture: '',
  });

  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      setUserData((prev) => ({
        ...prev,
        avatar: parsed.avatar || '',
        language: parsed.language || 'en',
        nickname: parsed.nickname || '',
        profilePicture: parsed.profilePicture || '',
      }));
      setSelectedAvatar(parsed.avatar || '');
      setSelectedLanguage(parsed.language || 'en');
      setNickname(parsed.nickname || '');
      setProfilePicture(parsed.profilePicture || '');
    }
  }, []);

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      const updated = { ...parsed, nickname: newNickname };
      localStorage.setItem('onboardingData', JSON.stringify(updated));
    }
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
        const onboardingData = localStorage.getItem('onboardingData');
        if (onboardingData) {
          const parsed = JSON.parse(onboardingData);
          const updated = { ...parsed, profilePicture: base64String };
          localStorage.setItem('onboardingData', JSON.stringify(updated));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      const updated = { ...parsed, avatar: avatarId };
      localStorage.setItem('onboardingData', JSON.stringify(updated));
    }
  };

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId);
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsed = JSON.parse(onboardingData);
      const updated = { ...parsed, language: languageId };
      localStorage.setItem('onboardingData', JSON.stringify(updated));
    }
  };

  const getCurrentEvolution = (level: number) => {
    const evolutionLevels = Object.keys(companionEvolution)
      .map(Number)
      .sort((a, b) => b - a);

    for (const reqLevel of evolutionLevels) {
      if (level >= reqLevel) {
        return companionEvolution[reqLevel];
      }
    }
    return companionEvolution[1];
  };

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-8">Settings</h1> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Profile Section */}
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-[14px] font-semibold md:mb-4 md:text-xl">
            Profile Settings
          </h2>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-2 md:space-y-4">
              <div className="relative">
                <div className="size-20 overflow-hidden rounded-full bg-gray-100 md:size-32">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-gray-400">
                      <svg
                        className="size-8 md:size-12"
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
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                >
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <p className="text-[12px] text-gray-500 md:text-sm">
                Click the camera icon to change your profile picture
              </p>
            </div>

            {/* Nickname */}
            <div className="w-full space-y-2 md:space-y-4">
              <div>
                <label
                  htmlFor="nickname"
                  className="block text-[12px] font-medium text-gray-700 md:text-sm"
                >
                  Nickname
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => handleNicknameChange(e.target.value)}
                    className="block w-full rounded-md border-gray-300 p-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm md:p-2"
                    placeholder="Enter your nickname"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Language Selection */}
        <section className="rounded-lg bg-white p-2 shadow-sm md:p-4">
          <h2 className="mb-2 text-[14px] font-semibold md:mb-4 md:text-xl">
            Learning Language
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {languages.map((language) => (
              <div
                key={language.id}
                className={`cursor-pointer rounded-lg border-2 p-2 transition-all md:p-4 ${
                  selectedLanguage === language.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleLanguageChange(language.id)}
              >
                <div className="mb-2 text-center text-xl md:text-4xl">
                  {language.flag}
                </div>
                <p className="text-center text-[12px] font-medium md:text-base">
                  {language.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Avatar Selection */}
        <section className="rounded-lg bg-white p-2 shadow-sm md:p-4">
          <h2 className="mb-2 text-[14px] font-semibold md:mb-4 md:text-xl">
            Learning Companion
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`cursor-pointer rounded-lg border-2 p-2 transition-all md:p-4 ${
                  selectedAvatar === avatar.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleAvatarChange(avatar.id)}
              >
                <div className="mx-auto mb-2 size-12 md:size-16">
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="size-full object-contain"
                  />
                </div>
                <p className="text-center text-[12px] font-medium md:text-base">
                  {avatar.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Companion Evolution */}
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-row items-center justify-between gap-4">
            <h2 className="text-[14px] font-semibold md:text-xl">
              Companion Evolution
            </h2>
            <div className="rounded-lg bg-blue-100 p-3">
              <p className="text-[12px] text-blue-800 md:text-sm">
                Level {userData.level} -{' '}
                {getCurrentEvolution(userData.level)?.name || 'Novice'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
            {Object.entries(companionEvolution).map(([level, evolution]) => (
              <div
                key={level}
                className={`rounded-lg p-2 md:p-4 ${
                  userData.level >= Number(level)
                    ? 'border border-gray-300 bg-white shadow-sm'
                    : 'bg-gray-50 opacity-90'
                }`}
              >
                <div className="relative mx-auto mb-2 size-12 md:size-16">
                  {userData.level < Number(level) && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50">
                      <svg
                        className="size-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  )}
                  <img
                    src={evolution.outfit}
                    alt={evolution.name}
                    className="size-full object-contain"
                  />
                </div>
                <p className="text-center text-[12px] font-medium md:text-base">
                  {evolution.name}
                </p>
                <p className="text-center text-[12px] text-gray-500 md:text-sm">
                  Level {level}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default withMainLayout(SettingsPage);
