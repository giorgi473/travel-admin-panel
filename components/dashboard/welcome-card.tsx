"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AddProductDrawer } from "@/components/modules/add-product-drawer";

export const WelcomeCard: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAccessToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          setLoading(false);
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
          setUserName(data.username || "");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  if (loading) {
    return (
      <Card className="flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 space-y-4">
          <CardHeader>
            <div className="h-12 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-6 bg-muted animate-pulse rounded" />
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 space-y-4">
          <CardHeader>
            <CardTitle>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Welcome,
              </span>
              <span className="block text-red-600 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                {userName}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-md lg:text-lg">
              Here's what's happening in your store today. See the statistics at
              once.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="text-xs"
              size={"sm"}
              onClick={() => setIsDrawerOpen(true)}
            >
              Add Product
            </Button>
          </CardFooter>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/image/shop-illustration.webp"
            alt="Shop Illustration"
            width={200}
            height={200}
            priority
            className="rounded-md select-none"
          />
        </div>
      </Card>

      <AddProductDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};
