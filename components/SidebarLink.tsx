"use client";

interface SidebarLinkProps {
  text: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export default function SidebarLink({ text, Icon, badge }: SidebarLinkProps) {
  return (
    <div className="flex items-center space-x-3 px-3 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer w-fit relative">
      <Icon className="w-7 h-7 dark:text-white" />
      <span className="text-xl hidden xl:inline dark:text-white">{text}</span>

      {badge !== undefined && badge > 0 && (
        <span className="absolute top-1 left-5 bg-[#FF4B2B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </div>
  );
}
