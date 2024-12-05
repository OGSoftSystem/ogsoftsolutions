
const IntroCard = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col space-y-1 w-fit intro-text-bg p-4 rounded-md cursor-pointer relative mt-2 sm:mt-0">
      <h4 className="p-text max-w-[42ch] md:max-w-[45ch] lg:max-w-[55ch]">
        {text}
      </h4>

    </div>
  );
};

export default IntroCard;
