import { 
  LayoutDashboard, 
  Wrench, 
  BarChart3, 
  Users, 
  Settings,
  Package,
  Calendar,
  FolderOpen,
  Building2,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
];

const maintenanceItems = [
  { title: "Requests", url: "/maintenance", icon: Wrench },
  { title: "Calendar", url: "/maintenance/calendar", icon: Calendar },
];

const inventoryItems = [
  { title: "Equipment", url: "/equipment", icon: Package },
  { title: "Categories", url: "/equipment/categories", icon: FolderOpen },
];

const settingsItems = [
  { title: "Work Centers", url: "/settings/work-centers", icon: Building2 },
  { title: "Teams", url: "/settings/teams", icon: Users },
  { title: "Reporting", url: "/reporting", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const renderNavGroup = (label: string, items: typeof mainNavItems) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <NavLink 
                  to={item.url} 
                  className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-accent"
                  activeClassName="bg-primary text-primary-foreground"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground font-bold">
            GG
          </div>
          {!collapsed && (
            <span className="font-semibold text-foreground">GearGuard</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {renderNavGroup("Overview", mainNavItems)}
        {renderNavGroup("Maintenance", maintenanceItems)}
        {renderNavGroup("Inventory", inventoryItems)}
        {renderNavGroup("Configuration", settingsItems)}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
