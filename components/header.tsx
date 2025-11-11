"use client";

import { Bell, Search, Upload, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to get initials
  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return firstName ? firstName.charAt(0).toUpperCase() : "U";
  };

  // Load user data from API on mount
  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!accessToken) {
          setAvatarLoading(false);
          return;
        }

        const response = await fetch(
          `https://nest-travel-api.vercel.app/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setUsername(data.username || ""); // Assuming API returns 'username'
          setEmail(data.email || ""); // Assuming API returns 'email'
          if (data.avatar) {
            setAvatar(data.avatar);
          }
        }
      } catch (error) {
        throw new Error(error as any);
      } finally {
        setAvatarLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (!accessToken) {
        alert("No access token found");
        return;
      }

      const response = await fetch(
        `https://nest-travel-api.vercel.app/api/v1/auth/me/upload-avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setAvatar(data.user.avatar);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        user.avatar = data.user.avatar;
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      alert("Error: " + String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-2 lg:px-2">
      <SidebarTrigger />

      <div className="flex-1">
        <form className="max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-muted/50 pl-8"
            />
          </div>
        </form>
      </div>
      <ModeToggle />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full overflow-hidden h-10 w-10"
          >
            {avatarLoading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover select-none"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
                {getInitials()}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {/* Custom user info header like Clerk */}
          <div className="flex items-start gap-3 p-3 select-none">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 select-none">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover select-none"
                />
              ) : (
                <div className="h-full w-full bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {getInitials()}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{username}</p>
              <p className="text-xs text-muted-foreground mb-2">{email}</p>
              <span className="flex gap-4 justify-between w-full">
                <Button
                  variant={"outline"}
                  size={"xs"}
                  className="text-xs cursor-pointer px-5"
                >
                  <Settings size={5} className="w-3 h-3" /> Manage account
                </Button>
                <Button
                  variant={"outline"}
                  size={"xs"}
                  className="text-xs cursor-pointer px-5"
                  onClick={handleLogout}
                >
                  <LogOut size={5} className="w-3 h-3" /> Sign out
                </Button>
              </span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleAvatarClick} disabled={loading}>
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Uploading..." : "Change Avatar"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        aria-label="Upload avatar"
      />
    </header>
  );
}
