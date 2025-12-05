"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CubeIcon, HomeIcon, TruckIcon } from "@heroicons/react/20/solid";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: CubeIcon },
  { name: "Local", href: "/dashboard/location", icon: HomeIcon },
  { name: "Movimentação", href: "/dashboard/record", icon: TruckIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-stone-900 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-yellow-100 text-yellow-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
