"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Package,
  ShoppingCart,
  Bell,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  items?: { title: string; url: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
    items: [
      { title: "Slide", url: "/slide" },
      { title: "Attractions", url: "/attractions" },
      { title: "Revenue", url: "/analytics/revenue" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "/users",
  },
  {
    title: "Products",
    icon: Package,
    url: "/products",
    items: [
      { title: "All Products", url: "/products/all" },
      { title: "Categories", url: "/products/categories" },
      { title: "Inventory", url: "/products/inventory" },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "/orders",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "/reports",
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/notifications",
  },
];

const settingsItems: MenuItem[] = [
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
    items: [
      { title: "General", url: "/settings/general" },
      { title: "Security", url: "/settings/security" },
      { title: "Integrations", url: "/settings/integrations" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const currentPath = pathname || "/";

  const isItemActive = (item: MenuItem): boolean => {
    if (item.items) {
      const hasActiveSub = isAnySubItemActive(item);
      return !hasActiveSub && currentPath === item.url;
    }
    if (currentPath === "/" && item.url === "/dashboard") {
      return true;
    }
    return currentPath.startsWith(item.url);
  };

  const isSubItemActive = (url: string): boolean => {
    return currentPath.startsWith(url) || currentPath === url;
  };

  const isAnySubItemActive = (item: MenuItem): boolean => {
    return item.items?.some((subItem) => isSubItemActive(subItem.url)) || false;
  };

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    [...menuItems, ...settingsItems].forEach((item) => {
      if (item.items && isAnySubItemActive(item)) {
        initialState[item.title] = true;
      }
    });
    return initialState;
  });

  useEffect(() => {
    setOpenStates((prev) => {
      const newState = { ...prev };
      [...menuItems, ...settingsItems].forEach((item) => {
        if (item.items) {
          const hasActiveSub = isAnySubItemActive(item);
          newState[item.title] = hasActiveSub;
        }
      });
      return newState;
    });
  }, [pathname]);

  const toggleOpen = (title: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getOpenState = (item: MenuItem) => {
    return openStates[item.title] ?? false;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex gap-2 mt-0.5 mb-5">
            <Image
              src={"/logo/logo.svg"}
              alt="image logo"
              width={39}
              height={39}
            />
            <span className="text-lg">Admin Panel</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.items ? (
                    <Collapsible asChild open={getOpenState(item)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isItemActive(item)}
                            onClick={() => toggleOpen(item.title)}
                            className="group rounded-lg data-[active=true]:border-l-4 data-[active=true]:border-red-500"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="space-y-1 mt-2">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubItemActive(subItem.url)}
                                  className="rounded-lg data-[active=true]:border-l-4 data-[active=true]:border-red-500"
                                >
                                  <Link href={subItem.url}>
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isItemActive(item)}
                        className="rounded-lg data-[active=true]:border-l-4 data-[active=true]:border-red-500"
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {settingsItems.map((item) => (
                <Collapsible key={item.title} asChild open={getOpenState(item)}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={isItemActive(item)}
                        onClick={() => toggleOpen(item.title)}
                        className="group rounded-lg data-[active=true]:border-l-4 data-[active=true]:border-red-500"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubItemActive(subItem.url)}
                              className="rounded-lg data-[active=true]:border-l-4 data-[active=true]:border-red-500"
                            >
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
