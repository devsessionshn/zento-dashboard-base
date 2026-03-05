import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Bell,
  FileText,
  HelpCircle,
  LogOut,
  ChevronDown,
  Package,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import zentoIcon from "@/assets/zento-icon.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

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
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNav = [
  { titleKey: "overview" as TranslationKey, url: "/", icon: LayoutDashboard },
  { titleKey: "users" as TranslationKey, url: "/users", icon: Users },
  { titleKey: "inventory" as TranslationKey, url: "/inventory", icon: Package },
];

const bottomNav = [
  { titleKey: "settings" as TranslationKey, url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-3 flex items-center justify-center">
        {collapsed && (
          <img src={zentoIcon} alt="Zento" className="h-8 w-8 object-contain" />
        )}
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-[10px] tracking-widest">
            {t("menu")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild tooltip={t(item.titleKey)}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="group hover:bg-sidebar-accent hover:text-white"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 transition-colors group-hover:text-white" />
                      {!collapsed && <span>{t(item.titleKey)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNav.map((item) => (
            <SidebarMenuItem key={item.titleKey}>
              <SidebarMenuButton asChild tooltip={t(item.titleKey)}>
                <NavLink
                  to={item.url}
                  className="group hover:bg-sidebar-accent hover:text-white"
                  activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                >
                  <item.icon className="h-4 w-4 transition-colors group-hover:text-white" />
                  {!collapsed && <span>{t(item.titleKey)}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator />

        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8 border border-sidebar-border">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    ZU
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sidebar-primary-foreground text-sm leading-tight">
                    Zento User
                  </p>
                  <p className="text-[11px] text-sidebar-foreground/50">
                    admin@zento.app
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-sidebar-foreground/50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
              <DropdownMenuItem>{t("accountSettings")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                {t("logOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
