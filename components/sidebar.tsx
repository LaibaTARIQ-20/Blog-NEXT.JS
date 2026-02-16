"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SidebarLink from "./SidebarLink";
import UserInfo from "./UserInfo";
import ThemeToggle from "./ThemeToggle";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="hidden lg:flex flex-col h-screen sticky top-0 w-[275px] px-2 xl:pl-8 xl:pr-4 py-2 dark:border-r dark:border-gray-700">
      {/* Logo & Theme Toggle */}
      <div className="flex items-center justify-between p-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] flex items-center justify-center">
          <span className="text-white text-2xl font-bold">B</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <SidebarLink text="Home" Icon={HomeIcon} />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        {user.username && (
          <>
            <SidebarLink text="Notifications" Icon={BellIcon} />
            <SidebarLink text="Messages" Icon={EnvelopeIcon} />
            <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarLink text="Lists" Icon={ClipboardIcon} />
            <SidebarLink text="Profile" Icon={UserIcon} />
            <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </nav>

      {/* User Info at bottom */}
      {user.username && <UserInfo />}
    </div>
  );
}
