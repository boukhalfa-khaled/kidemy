import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/SideBar";
import Navbar from "./_components/Navbar";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-background">
        <Navbar />
        <div className="p-2 sm:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
