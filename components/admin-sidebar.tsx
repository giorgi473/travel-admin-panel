"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  Settings,
  BarChart3,
  Package,
  Sliders,
} from "lucide-react";
import { useSidebar } from "@/components/sidebar-provider";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Slide", href: "/slide", icon: Sliders },
  { name: "Tours", href: "/tours", icon: MapPin },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Travelers", href: "/travelers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={close} />
      )}

      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
          isOpen
            ? "w-64 translate-x-0"
            : "w-64 md:w-16 -translate-x-full md:translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center gap-3 border-b border-border px-6",
            !isOpen && "md:px-3"
          )}
        >
          {isOpen ? (
            <>
              <div className="items-center justify-center shrink-0 hidden md:flex">
                <Image
                  src={"/logo/logo.svg"}
                  alt="image"
                  width={38}
                  height={38}
                />
              </div>
              <h1 className="text-xl font-semibold text-foreground whitespace-nowrap md:flex hidden">
                Tourism Admin
              </h1>
            </>
          ) : (
            <div className="hidden md:flex items-center justify-center w-full">
              <Image
                src={"/logo/logo.svg"}
                alt="image"
                width={38}
                height={38}
              />
            </div>
          )}
        </div>
        <nav
          className={cn(
            "flex-1 space-y-1 py-4",
            isOpen ? "px-3" : "px-3 md:px-2"
          )}
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    close();
                  }
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  !isOpen && "md:justify-center md:px-2"
                )}
                title={!isOpen ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn("whitespace-nowrap", !isOpen && "md:hidden")}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        <div
          className={cn("border-t border-border p-4", !isOpen && "md:hidden")}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary shrink-0" />
            <div className={cn("flex-1 min-w-0", !isOpen && "md:hidden")}>
              <p className="text-sm font-medium text-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-muted-foreground truncate">
                admin@tourism.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
