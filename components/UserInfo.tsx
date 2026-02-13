"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { signOutUser } from "@/redux/slices/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function UserInfo() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }

  if (!user.username) {
    return null;
  }

  return (
    <div
      onClick={handleSignOut}
      className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer mb-4"
    >
      <div className="flex items-center space-x-3">
        <Image
          src={user.photoUrl || "/assets/profile-pic.png"}
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="hidden xl:block">
          <p className="font-bold text-sm">{user.name}</p>
          <p className="text-gray-500 text-xs">@{user.username}</p>
        </div>
      </div>
      <EllipsisHorizontalIcon className="w-5 h-5 hidden xl:block" />
    </div>
  );
}
