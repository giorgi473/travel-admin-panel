"use client";

import { Bell, Search, Upload, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";

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
    return firstName ? firstName.charAt(0).toUpperCase() : "U";
  };

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
          setUsername(data.username || "");
          setEmail(data.email || "");
          if (data.avatar) {
            setAvatar(data.avatar);
          }
        }
      } catch (error) {
        console.error(error);
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
    <>
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
                <Image
                  src={avatar}
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
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-start gap-3 p-3 select-none">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 select-none">
                {avatar ? (
                  <Image
                    src={avatar}
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
              <div className="space-y-1">
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
                <span className="flex gap-2 justify-between w-full mt-2">
                  <AlertDialog open={profileOpen} onOpenChange={setProfileOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-3"
                      >
                        <Settings className="w-3 h-3 mr-1" /> Manage Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Manage Account</AlertDialogTitle>
                      </AlertDialogHeader>
                      <Card>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Profile Picture
                            </Label>
                            <div className="flex flex-col items-center space-y-3">
                              <div className="h-24 w-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                {avatar ? (
                                  <Image
                                    src={avatar}
                                    alt="current avatar"
                                    width={96}
                                    height={96}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-primary rounded-full flex items-center justify-center text-white text-lg font-medium">
                                    {getInitials()}
                                  </div>
                                )}
                              </div>
                              <Button
                                type="button"
                                onClick={handleAvatarClick}
                                disabled={loading}
                                className="gap-2 w-full max-w-xs"
                                size="sm"
                              >
                                <Upload className="h-4 w-4" />
                                {loading ? "Uploading..." : "Change Avatar"}
                              </Button>
                              <p className="text-xs text-muted-foreground text-center">
                                Images only (JPG, PNG, GIF). Max size: 5MB.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-3"
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
