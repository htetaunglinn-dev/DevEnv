"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { discoverData, contributeData, manageData } from "@/data/sidemenu";

//icons
import { BiSolidLeftArrow } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";

const SideDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const setSearchMenu = useStore((state) => state.setSearchMenu);
  const searchMenu = useStore((state) => state.searchMenu);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchMenu(value);
  };

  return (
    <ScrollArea
      className={`${isExpanded ? "w-68" : "w-fit"} border-r border-gray-300/50 dark:border-gray-300/10 `}
    >
      <div className="hidden h-[calc(100vh-52px)] flex-col justify-between p-4 md:flex">
        <section id="menu-section">
          <div className=" flex items-center justify-between gap-2">
            <div className={`${isExpanded ? "w-full" : "hidden"}`}>
              <Input
                name="search"
                value={searchMenu}
                onChange={handleSearch}
                placeholder="Search"
                autoComplete="off"
                className=" focus-visible:ring-gray-100/20 "
              />
            </div>
            <button
              className="rounded-md p-2 shadow-md dark:border dark:border-gray-100/10"
              onClick={handleToggleExpand}
            >
              {
                <BiSolidLeftArrow
                  size={20}
                  className={`transition dark:text-white ${isExpanded ? "" : "rotate-180"}`}
                />
              }
            </button>
          </div>
          {/* Discover */}
          <div className="mt-10 flex flex-col dark:text-white/80">
            <h2 className="text-xs dark:text-white/60">Discover</h2>
            <ul className="my-4 flex flex-col gap-2">
              {discoverData.map((item, index) => (
                <Link key={item.title} href={item.link}>
                  <li
                    className={`flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${isExpanded ? "w-full" : "w-fit"} ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}}`}
                  >
                    {item.icon}
                    <span className={`${isExpanded ? "w-full" : "hidden w-0"}`}>
                      {item.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* Contribute */}
          <div className="mt-10 flex flex-col dark:text-white/80">
            <h2 className="text-xs dark:text-white/60">Contribute</h2>
            <ul className="my-4 flex flex-col gap-2">
              {contributeData.map((item, index) => (
                <Link key={item.title} href={item.link}>
                  <li
                    className={`flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${isExpanded ? "w-full" : "w-fit"} ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}`}
                  >
                    {item.icon}
                    <span className={`${isExpanded ? "w-full" : "hidden w-0"}`}>
                      {item.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* Manage */}
          {/* <div className="mt-10 flex flex-col dark:text-white/80">
            <h2 className="text-xs dark:text-white/60">Manage</h2>
            <ul className="my-4 flex flex-col gap-2">
              {manageData.map((item, index) => (
                <Link key={item.title} href={item.link}>
                  <li
                    className={`flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${isExpanded ? "w-full" : "w-fit"} ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}}`}
                  >
                    {item.icon}
                    <span className={`${isExpanded ? "w-full" : "hidden w-0"}`}>
                      {item.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div> */}
        </section>
        <footer className="flex items-center justify-between py-4 dark:text-white/80">
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar>
              <AvatarImage
                width={36}
                className="inline-block rounded-lg"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isExpanded ? (
              <div>
                <p className="mb-1 text-xs">Htet Aung Linn</p>
                <p className="text-xs">Software Developer</p>
              </div>
            ) : null}
          </div>
          {isExpanded ? (
            <button className="rounded-md p-2 shadow-md dark:border dark:border-gray-100/10">
              <RiLogoutBoxRLine size={20} className="dark:text-white" />
            </button>
          ) : null}
        </footer>
      </div>
    </ScrollArea>
  );
};

export default SideDrawer;
