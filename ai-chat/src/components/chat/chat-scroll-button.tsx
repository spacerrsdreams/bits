import { ChevronDown } from "lucide-react";

type Props = {
  scrollToBottom: () => void;
};

export const ChatScrollButton = ({ scrollToBottom }: Props) => {
  return (
    <button
      onClick={scrollToBottom}
      className="fixed right-8 bottom-24 z-10 rounded-full bg-gray-200 p-2 shadow-lg transition-all hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      aria-label="Scroll to bottom"
    >
      <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
    </button>
  );
};
