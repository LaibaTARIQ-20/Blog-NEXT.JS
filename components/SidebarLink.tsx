"use client";

interface SidebarLinkProps {
  text: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export default function SidebarLink({ text, Icon }: SidebarLinkProps) {
  return (
    <div className="flex items-center space-x-3 px-3 py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer w-fit">
      <Icon className="w-7 h-7" />
      <span className="text-xl hidden xl:inline">{text}</span>
    </div>
  );
}
