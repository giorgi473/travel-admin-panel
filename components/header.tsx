"use client";

import { Search, Upload, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return firstName ? firstName.charAt(0).toUpperCase() : "GK";
  };

  const getAccessToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  };

  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const accessToken = getAccessToken();
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
          setUsername(data.username || "");
          setEmail(data.email || "");
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

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const accessToken = getAccessToken();

      if (!accessToken) {
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

        setProfileOpen(false);
      }
    } catch (error) {
      throw new Error(error as any);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-2 sm:gap-4 border-b bg-background px-2 sm:px-4 lg:px-6">
        <SidebarTrigger />
        <div className="hidden sm:flex flex-1">
          <form className="w-full max-w-md">
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
        <div className="flex-1 sm:hidden" />
        <ModeToggle />
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
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover select-none"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
                  {getInitials()}
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[calc(100vw-2rem)] sm:w-80"
          >
            <div className="flex items-start gap-3 p-3 select-none">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 select-none">
                {avatar ? (
                  <Image
                    src={avatar || "/placeholder.svg"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover select-none"
                  />
                ) : (
                  <div className="h-full w-full bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {getInitials()}
                  </div>
                )}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{username}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {email}
                </p>
                <span className="flex flex-col sm:flex-row gap-2 sm:justify-between w-full mt-2">
                  <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-3 bg-transparent w-full sm:w-auto"
                      >
                        <Settings className="w-3 h-3 mr-1" /> Manage Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100vw-2rem)] sm:w-full sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Manage Account</DialogTitle>
                        <DialogDescription>
                          Update your profile picture and account information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 py-1">
                        <Avatar className="h-20 w-20 flex-shrink-0">
                          <AvatarImage
                            src={avatar || undefined}
                            alt="Profile picture"
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-primary text-white text-xl">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1 text-center sm:text-left w-full sm:w-auto min-w-0">
                          <p className="text-sm font-medium mb-1 truncate">
                            {username}
                          </p>
                          <p className="text-sm font-medium text-gray-500 truncate">
                            {email}
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-full sm:w-auto">
                          <Button
                            type="button"
                            onClick={handleAvatarClick}
                            disabled={loading}
                            size="xs"
                            variant={"outline"}
                            className="gap-2 text-xs w-full sm:w-auto"
                          >
                            <Upload className="h-4 w-4" />
                            {loading ? "Uploading..." : "Change"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-3 bg-transparent w-full sm:w-auto"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-3 h-3 mr-1" /> Sign out
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
    </>
  );
}
