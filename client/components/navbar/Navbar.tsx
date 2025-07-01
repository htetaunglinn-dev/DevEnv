"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import BlackLogo from "@/public/BlackLogo.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import { discoverData, contributeData } from "@/data/sidemenu";

//icons
import { IoNotificationsOutline } from "react-icons/io5";
import { CalendarIcon } from "@radix-ui/react-icons";
import { CgMenuGridO } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Input } from "../ui/input";
import { useStore } from "@/store/store";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const setSearchText = useStore((state) => state.setSearchText);
  const searchText = useStore((state) => state.searchText);
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
  };

  return (
    <nav className="flex items-center justify-between border-b px-5 py-2">
      <div>
        <Link href="/">
          <Image
            className="hidden dark:block "
            src={WhiteLogo}
            width={108}
            alt="DevEnvLogo"
          />
          <Image
            className="block dark:hidden"
            src={BlackLogo}
            width={108}
            alt="DevEnvLogo"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-3">
        {isAuthenticated ? (
          <>
            <Input
              name="search"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search"
              autoComplete="off"
              className="w-36 focus-visible:ring-gray-100/20 md:w-60"
            />
            <Button
              className="hidden md:block"
              type="button"
              onClick={() => router.push("/post-article")}
              variant="outline"
            >
              New post
            </Button>
            <ModeToggle />
            {/* Mobile Side Drawer */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="px-3 py-3 md:hidden" variant={"outline"}>
                    <CgMenuGridO />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto p-0">
                  <div className="mt-10 h-[calc(100vh-52px)] flex-col  justify-between p-6 md:flex">
                    <section id="menu-section">
                      {/* Discover */}
                      <div className="flex flex-col dark:text-white/80">
                        <h2 className="text-xs dark:text-white/60">Discover</h2>
                        <ul className="my-4">
                          {discoverData.map((item) => (
                            <Link key={item.title} href={item.link}>
                              <SheetClose asChild>
                                <li
                                  className={`flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 `}
                                >
                                  {item.icon}
                                  <span>{item.title}</span>
                                </li>
                              </SheetClose>
                            </Link>
                          ))}
                        </ul>
                      </div>
                      {/* Contribute */}
                      <div className="mt-10 flex flex-col dark:text-white/80">
                        <h2 className="text-xs dark:text-white/60">
                          Contribute
                        </h2>
                        <ul className="my-4">
                          {contributeData.map((item) => (
                            <Link key={item.title} href={item.link}>
                              <SheetClose asChild>
                                <li
                                  className={`flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 `}
                                >
                                  {item.icon}
                                  <span>{item.title}</span>
                                </li>
                              </SheetClose>
                            </Link>
                          ))}
                        </ul>
                      </div>
                      {/* Manage */}
                      <div className="mt-10 flex flex-col dark:text-white/80">
                        <h2 className="text-xs dark:text-white/60">Manage</h2>
                        <ul className="my-4">
                          {/* {manageData.map((item, index) => (
                            <Link key={item.title} href={item.link}>
                              <SheetClose asChild>
                                <li
                                  className={`flex cursor-pointer items-center gap-4 rounded-md p-2 hover:bg-gray-200/20 `}
                                >
                                  {item.icon}
                                  <span>{item.title}</span>
                                </li>
                              </SheetClose>
                            </Link>
                          ))} */}
                        </ul>
                      </div>
                    </section>
                    <footer className="flex items-center justify-start py-4 dark:text-white/80">
                      <div className="flex cursor-pointer items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            width={36}
                            className="inline-block rounded-lg"
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            {user?.firstName?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="mb-1 text-xs">
                            {user?.firstName
                              ? `${user.firstName} ${user.lastName}`
                              : "User"}
                          </p>
                          <p className="text-xs">{user?.email}</p>
                        </div>
                      </div>
                    </footer>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="hidden md:block" variant="outline">
                  <IoNotificationsOutline />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                className="w-80"
                align={"center"}
                sideOffset={7}
              >
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage
                      width={50}
                      src="https://github.com/vercel.png"
                    />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">
                      Next.js is the best framework ever. Awesome
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Created December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="hidden cursor-pointer md:block">
                  <AvatarImage
                    width={36}
                    className="inline-block rounded-lg"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName
                        ? `${user.firstName} ${user.lastName}`
                        : "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                >
                  <RiLogoutBoxRLine className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <ModeToggle />
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="hidden md:block"
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="hidden bg-blue-600 text-white hover:bg-blue-700 md:block"
            >
              Sign Up
            </Button>
            {/* Mobile auth buttons */}
            <div className="flex gap-2 md:hidden">
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                size="sm"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
