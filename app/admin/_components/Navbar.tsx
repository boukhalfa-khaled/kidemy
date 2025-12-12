import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b  py-1.5 px-4 flex items-center justify-between ">
      {/* LEFT */}
      <div className="flex items-center ">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 flex-end ">
        <Link href={"/dashboard"}>Dashboard</Link>
        <ModeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
