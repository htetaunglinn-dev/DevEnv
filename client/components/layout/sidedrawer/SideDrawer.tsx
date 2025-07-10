"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { discoverData, contributeData } from "@/data/sidemenu";
import { generateAvatarUrl } from "@/utils/avatarUtils";

//icons
import { BiSolidLeftArrow } from "react-icons/bi";

const SideDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();

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
    <TooltipProvider>
      <ScrollArea
        className={`${isExpanded ? "w-72" : "w-16"} hidden border-r border-gray-300/50 transition-all duration-300 ease-in-out dark:border-gray-300/10 md:block`}
      >
        <div className="flex h-[calc(100vh-52px)] flex-col justify-between p-4">
          <section id="menu-section">
            <div className="flex items-center justify-between gap-2">
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
              {!isExpanded ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="rounded-md p-2 shadow-md dark:border dark:border-gray-100/10"
                      onClick={handleToggleExpand}
                    >
                      <BiSolidLeftArrow
                        size={20}
                        className="rotate-180 transition dark:text-white"
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="ml-2">
                    <p>Expand sidebar</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <button
                  className="rounded-md p-2 shadow-md dark:border dark:border-gray-100/10"
                  onClick={handleToggleExpand}
                >
                  <BiSolidLeftArrow
                    size={20}
                    className="transition dark:text-white"
                  />
                </button>
              )}
            </div>
            {/* Discover */}
            <div className="mt-10 flex flex-col dark:text-white/80">
              <h2
                className={`text-xs dark:text-white/60 ${isExpanded ? "block" : "hidden"}`}
              >
                Discover
              </h2>
              <ul className="my-4 flex flex-col gap-2">
                {discoverData.map((item) => (
                  <Link key={item.title} href={item.link}>
                    {!isExpanded ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <li
                            className={`flex w-fit cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}`}
                          >
                            {item.icon}
                          </li>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <li
                        className={`flex w-full cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}`}
                      >
                        {item.icon}
                        <span className="w-full">{item.title}</span>
                      </li>
                    )}
                  </Link>
                ))}
              </ul>
            </div>
            {/* Contribute */}
            <div className="mt-10 flex flex-col dark:text-white/80">
              <h2
                className={`text-xs dark:text-white/60 ${isExpanded ? "block" : "hidden"}`}
              >
                Contribute
              </h2>
              <ul className="my-4 flex flex-col gap-2">
                {contributeData.map((item) => (
                  <Link key={item.title} href={item.link}>
                    {!isExpanded ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <li
                            className={`flex w-fit cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}`}
                          >
                            {item.icon}
                          </li>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <li
                        className={`flex w-full cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 ${pathname === item.link ? "bg-gray-200/60 dark:bg-gray-100/5" : ""}`}
                      >
                        {item.icon}
                        <span className="w-full">{item.title}</span>
                      </li>
                    )}
                  </Link>
                ))}
              </ul>
            </div>
            {/* Manage */}
            {/* <div className="mt-10 flex flex-col dark:text-white/80">
            <h2 className="text-xs dark:text-white/60">Manage</h2>
            <ul className="my-4 flex flex-col gap-2">
              {manageData.map((item) => (
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
          <footer className="flex items-center justify-start py-4 dark:text-white/80">
            <div className="flex cursor-pointer items-center gap-2">
              <Avatar>
                <AvatarImage
                  width={36}
                  className="inline-block rounded-lg"
                  src={generateAvatarUrl(user?.firstName, user?.lastName, 36)}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              {isExpanded ? (
                <div>
                  <p className="mb-1 text-xs">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : "User"}
                  </p>
                  <p className="text-xs">{user?.email}</p>
                </div>
              ) : null}
            </div>
          </footer>
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
};

export default SideDrawer;
