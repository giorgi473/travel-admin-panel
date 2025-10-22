import { MenuItem } from "@/types/types";
import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const menuItems: MenuItem[] = [
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

export const settingsItems: MenuItem[] = [
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
