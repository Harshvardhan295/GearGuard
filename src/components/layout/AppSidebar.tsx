import { 
  LayoutDashboard, 
  Wrench, 
  BarChart3, 
  Users, 
  Settings,
  Package,
  Calendar,
  FolderOpen,
  Building2
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
  useSidebar,
} from "@/components/ui/sidebar";

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

  const renderNavGroup = (label: string, items: any[]) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 px-4">{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <NavLink 
                  to={item.url} 
                  className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200 rounded-lg mx-2 hover:bg-accent group"
                  activeClassName="bg-primary text-primary-foreground shadow-sm"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r bg-card">
      <SidebarHeader className="h-16 flex items-center border-b px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs shadow-lg ring-4 ring-primary/10">
            GG
          </div>
          {!collapsed && (
            <span className="font-bold tracking-tight text-foreground">GearGuard</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-6">
        {renderNavGroup("Overview", mainNavItems)}
        {renderNavGroup("Maintenance", maintenanceItems)}
        {renderNavGroup("Inventory", inventoryItems)}
        {renderNavGroup("Configuration", settingsItems)}
      </SidebarContent>
      {/* Footer removed for a cleaner look */}
    </Sidebar>
  );
}