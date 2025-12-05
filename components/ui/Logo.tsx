import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Logo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-stone-900 gap-2`}
    >
      <PaperAirplaneIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px] front-semibold">ZYX</p>
    </div>
  );
}
