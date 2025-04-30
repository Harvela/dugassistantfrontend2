import { useRouter } from 'next/router';

const mockLessons = [
  {
    id: '1',
    title: 'Basic Mathematics',
    progress: 60,
    nextLesson: 'Subtraction Basics',
    description: 'Learn the fundamentals of addition and basic math operations',
  },
  {
    id: '2',
    title: 'English Vocabulary',
    progress: 30,
    nextLesson: 'Common Phrases',
    description: 'Build your English vocabulary with essential words',
  },
  {
    id: '3',
    title: 'Science Basics',
    progress: 0,
    nextLesson: 'Introduction to Biology',
    description: 'Discover the fascinating world of science',
  },
  {
    id: '4',
    title: 'Physics Basics',
    progress: 0,
    nextLesson: 'Introduction to Physics',
    description: 'Discover the fascinating world of physics',
  },
  {
    id: '5',
    title: 'Chemistry Basics',
    progress: 0,
    nextLesson: 'Introduction to Chemistry',
    description: 'Discover the fascinating world of chemistry',
  },
  {
    id: '6',
    title: 'Biology Basics',
    progress: 0,
    nextLesson: 'Introduction to Biology',
    description: 'Discover the fascinating world of biology',
  },
  {
    id: '7',
    title: 'History Basics',
    progress: 0,
    nextLesson: 'Introduction to History',
    description: 'Discover the fascinating world of history',
  },
];

export default function LessonsList() {
  const router = useRouter();

  const handleLessonClick = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow md:p-6">
      <h2 className="mb-2 text-[16px] font-semibold md:mb-4 md:text-xl">
        Your Lessons
      </h2>

      <div className="relative">
        <div className="scrollbar-hide -mx-6 flex overflow-x-auto px-6 pb-4">
          <div className="flex snap-x snap-mandatory gap-4">
            {mockLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="w-[calc(28.57%-12px)] min-w-[90px] flex-none cursor-pointer snap-start rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100 md:min-w-[180px]"
                onClick={() => handleLessonClick(lesson.id)}
              >
                <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                <p className="mt-1 text-[12px] text-gray-600 md:text-sm">
                  {lesson.description}
                </p>

                <div className="mt-2">
                  <div className="mb-1 flex justify-between text-[12px] md:text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">{lesson.progress}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-gray-200 md:h-2">
                    <div
                      className="h-1 rounded-full bg-blue-500 transition-all duration-300 md:h-2"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>

                {lesson.progress < 100 && (
                  <p className="mt-2 text-[12px] text-gray-600 md:text-sm">
                    Next: {lesson.nextLesson}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gradient fade effect on the right */}
        <div className="pointer-events-none absolute bottom-4 right-0 top-0 w-24 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}
