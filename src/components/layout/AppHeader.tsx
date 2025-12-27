import { Bell, Search, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = "Dashboard" }: AppHeaderProps) {
  return (
    <header className="glass-header h-16 px-4 lg:px-8 flex items-center justify-between border-b shadow-xs">
      <div className="flex items-center gap-6">
        <SidebarTrigger className="lg:hidden" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search maintenance logs..." 
            className="w-72 pl-10 h-9 bg-background/50 border-muted/20 focus:bg-background focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-1 border-l pl-3 ml-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-accent rounded-full">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive ring-2 ring-background"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-2 hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                    MA
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">Mitchell Admin</p>
                  <p className="text-xs text-muted-foreground">admin@gearguard.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-2 cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:bg-destructive/5 py-2 cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}