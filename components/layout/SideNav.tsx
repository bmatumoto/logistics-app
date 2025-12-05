import { signOut } from "@/auth";
import Link from "next/link";
import NavLinks from "@/components/ui/NavLinks";
import Logo from "@/components/ui/Logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 font-sans">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-(--custom-yellow) p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-(--custom-red) p-3 text-sm font-medium hover:bg-stone-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
