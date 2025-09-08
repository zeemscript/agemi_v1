import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Searchbox from "@/components/atoms/dashboard/Searchbox";
import { useRouter } from "next/navigation";
import UserCard from "@/components/atoms/dashboard/UserCard";

const searchParams = ["Courses", " Books", " Spaces", " Authors"];

const NavHeader = () => {
  const router = useRouter();

  const handleSearch = (term) => {
    if (term && term.trim()) {
      router.push(`/dashboard/search/${encodeURIComponent(term.trim())}`);
    }
  };
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D1526] backdrop-blur-md border-b border-accent">
      <div className="flex h-14 items-center px-4 md:px-6 gap-4 justify-between">
        {/* Left: Sidebar + Search */}
        <div className="flex items-center gap-3 flex-1">
          <SidebarTrigger />

        </div>

        {/* Right: Bell */}
        <div className="flex items-center space-x-4">
          <Searchbox
            placeholder={searchParams}
            className="max-w-[300px]"
            onSearch={handleSearch}
          />
          <UserCard />
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
