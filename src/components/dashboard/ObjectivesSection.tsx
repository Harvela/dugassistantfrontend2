interface ObjectivesSectionProps {
  className?: string;
}

const mockObjectives = [
  {
    id: 1,
    title: 'Complete Basic Addition',
    description: 'Solve 10 addition problems with numbers up to 20',
    progress: 3,
    total: 10,
  },
  {
    id: 2,
    title: 'Learn New Vocabulary',
    description: 'Learn and practice 5 new words',
    progress: 2,
    total: 5,
  },
];

export default function ObjectivesSection({
  className = '',
}: ObjectivesSectionProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow ${className}`}>
      <h2 className="mb-4 text-xl font-semibold">Today&apos;s Objectives</h2>

      <div className="space-y-4">
        {mockObjectives.map((objective) => (
          <div
            key={objective.id}
            className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
          >
            <h3 className="font-medium text-gray-900">{objective.title}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {objective.description}
            </p>

            <div className="mt-3">
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900">
                  {objective.progress}/{objective.total}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{
                    width: `${(objective.progress / objective.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
