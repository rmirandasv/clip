import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { Folder, Home } from "lucide-react";
import CreateDirectoryModal from "./create-directory-modal";

export function NavMain({ directories = [] }: { directories: string[] }) {
  const page = usePage();
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Directories</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={route("dashboard")} prefetch>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {directories.map((directory) => (
          <SidebarMenuItem key={directory}>
            <SidebarMenuButton asChild isActive={page.url.startsWith(directory)} tooltip={{ children: directory }}>
              <Link href={route("directories.show", directory)} prefetch>
                <Folder className="h-4 w-4" />
                <span>{directory}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuItem>
            <CreateDirectoryModal sidebar />
          </SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
