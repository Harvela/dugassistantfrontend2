interface DynamicContentProps {
  content: {
    type: 'video' | 'image' | 'illustration';
    url: string;
  };
}

export default function DynamicContent({ content }: DynamicContentProps) {
  return (
    <div className="mt-4 rounded-lg bg-gray-50 p-2 md:p-4">
      {content.type === 'video' && (
        <video src={content.url} controls className="w-full rounded-lg" />
      )}
      {content.type === 'image' && (
        <img
          src={content.url}
          alt="Learning aid"
          className="w-full rounded-lg"
        />
      )}
      {content.type === 'illustration' && (
        <img
          src={content.url}
          alt="Illustration"
          className="w-full rounded-lg"
        />
      )}
    </div>
  );
}
