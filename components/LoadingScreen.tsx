"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/userSlice";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";
import { RootState } from "@/redux/store";

export default function LoadingScreen() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.loading.loadingScreenOpen,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email || "",
            name: currentUser.displayName || "User",
            username: currentUser.email?.split("@")[0] || "user",
            photoUrl: currentUser.photoURL || "/assets/profile-pic.png",
          }),
        );
      }

      // Close loading screen after checking auth
      setTimeout(() => {
        dispatch(closeLoadingScreen());
      }, 1000);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-[#FF4B2B] border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
      </div>
    </div>
  );
}
