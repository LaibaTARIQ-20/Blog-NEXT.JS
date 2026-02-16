"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;

    // Remove any existing theme classes
    root.classList.remove("light", "dark");

    // Add the current theme
    if (theme === "dark") {
      root.classList.add("dark");
    }

    console.log("Theme applied:", theme); // Debug log
  }, [theme]);

  return <>{children}</>;
}
