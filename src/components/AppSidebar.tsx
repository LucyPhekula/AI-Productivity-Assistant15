import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  ListChecks,
  Search,
  MessageSquare,
  HardHat,
  Scale,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const tools = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/planner", label: "AI Task Planner", icon: ListChecks },
  { to: "/research", label: "AI Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
] as const;

const safety = [
  { to: "/hazards", label: "Safety Hazards", icon: HardHat },
  { to: "/rights", label: "Know Your Rights", icon: Scale },
] as const;

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-black text-primary-foreground">
            W
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight">WISE WIZARD</span>
            <span className="block text-xs text-sidebar-foreground/70">Assistant</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to} activeOptions={{ exact: item.to === "/" }}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Workplace Protection</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {safety.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <p className="text-xs font-bold text-primary">
          We fight for your rights your voice is heard
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
