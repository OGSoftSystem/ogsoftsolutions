export const PublicationSkeleton = () => {
  return (
    <div className="min-w-[200px] max-w-[200px] p-4 animate-pulse">
      <div className="w-full h-6 bg-gray-200" />
      <div className="min-h-[150px]">
        <div className="h-20 w-full bg-gray-200" />
      </div>
      <div className="flex space-x-2 items-center">
        <div className="w-full h-6 bg-gray-200" />
        <div className="w-full h-6 bg-gray-200" />
        <div className="w-full h-6 bg-gray-200" />
      </div>
    </div>
  );
};

export const IntroCardSkeleton = () => {
  return (
    <div className="w-20 h-20 animate-pulse">
      <div className="p-text max-w-[42ch] md:max-w-[45ch] lg:max-w-[55ch] bg-gray-200" />
    </div>
  );
};

export const ReviewSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 z-20 animate-pulse">
      <div className="h-6 w-full md:w-[250px] bg-gray-200" />
      <div className="h-6 w-full md:w-[250px] bg-gray-200" />
    </div>
  );
};
