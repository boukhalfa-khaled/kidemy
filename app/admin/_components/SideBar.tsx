"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Book,
  BookOpen,
  GraduationCap,
  Home,
  Settings,
  User,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  // { title: "Home", url: "/", icon: Home },
  { title: "Users", url: "/admin/users", icon: User },
  { title: "Students", url: "/admin/students", icon: GraduationCap },
  { title: "Teachers", url: "/admin/teachers", icon: UserCheck },
  { title: "Parents", url: "/admin/parents", icon: UserPlus },
  { title: "Grades", url: "/admin/grades", icon: BookOpen },
  { title: "Chapters", url: "/admin/chapters", icon: Book },
  { title: "Lessons", url: "/admin/lessons", icon: BookOpen },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const AppSidebar = () => {
  const pathname = usePathname(); // get current route

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Home /> Header
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Check if the current path starts with the item's url
                const isActive = pathname?.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} passHref>
                      <SidebarMenuButton isActive={isActive}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings /> Footer
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
