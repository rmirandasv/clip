import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SharedData, type NavItem } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { BookOpen, Folder } from "lucide-react";
import AppLogo from "./app-logo";

const footerNavItems: NavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/laravel/react-starter-kit",
    icon: Folder,
  },
  {
    title: "Documentation",
    href: "https://laravel.com/docs/starter-kits#react",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { directories } = usePage<SharedData>().props;
  console.log("directories", directories);
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route("dashboard")} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain directories={directories} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  );
}
