import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Package,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
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
  { titleKey: "settings" as TranslationKey, url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem("zento-auth");
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-4">
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
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{t(item.titleKey)}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        {!collapsed && (
          <>
            <SidebarSeparator className="my-4" />
            <div className="flex flex-col items-center px-4 py-3">
              <Avatar className="h-16 w-16 border-2 border-primary/30 mb-3">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  ZU
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-sidebar-primary-foreground text-sm">
                Zento User
              </p>
              <p className="text-[11px] text-sidebar-foreground/50 mt-0.5">
                admin@zento.app
              </p>
            </div>

            <SidebarSeparator className="my-2" />

            {/* Help Section */}
            <div className="flex flex-col items-center px-4 py-4 text-center">
              <HelpCircle className="h-8 w-8 text-primary/60 mb-2" />
              <p className="text-sm font-medium text-sidebar-primary-foreground">
                {t("help")}
              </p>
              <p className="text-[11px] text-sidebar-foreground/50 mt-1 leading-relaxed">
                ¿Necesitas ayuda?
              </p>
              <button className="mt-3 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                Contacto
              </button>
            </div>
          </>
        )}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t("logOut")}
              onClick={handleLogout}
              className="hover:bg-sidebar-accent text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>{t("logOut")}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
