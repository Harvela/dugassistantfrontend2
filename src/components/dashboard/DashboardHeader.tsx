interface DashboardHeaderProps {
  nickname: string;
  avatar: string;
}

export default function DashboardHeader({
  nickname,
  avatar,
}: DashboardHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="size-16 overflow-hidden rounded-full">
        <img
          src={avatar}
          alt={`${nickname}'s avatar`}
          className="size-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-900">
          {getGreeting()}, {nickname}!
        </h1>
        <p className="text-gray-600">Ready to learn something new today?</p>
      </div>
    </div>
  );
}
