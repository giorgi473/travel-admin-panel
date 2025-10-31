"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  PieChart,
  Gift,
  ParkingCircle,
  BarChart,
  MessageCircle,
  X,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: 3566,
    icon: <PieChart className="w-10 h-10" />,
    rightIcon: <BarChart className="w-8 h-8" />,
  },
  {
    label: "Total Orders",
    value: 959,
    icon: <Gift className="w-10 h-10" />,
    rightIcon: <PieChart className="w-8 h-8" />,
  },
  {
    label: "Total Products",
    value: 50,
    icon: <ParkingCircle className="w-10 h-10" />,
    rightIcon: <BarChart className="w-8 h-8" />,
  },
  {
    label: "Total Category",
    value: 8,
    icon: <MessageCircle className="w-10 h-10" />,
    rightIcon: <BarChart className="w-8 h-8" />,
  },
];

const userName = "Giorgi Kavtaradze";

const Page: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="p-4 mx-auto space-y-8">
      <Card className="flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 space-y-4">
          <CardHeader>
            <CardTitle>
              <span className="block text-3xl font-semibold">Welcome,</span>
              <span className="block text-red-600 text-3xl font-semibold">
                {userName}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Here's what's happening in your store today. See the statistics at
              once.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsDrawerOpen(true)}>Add Product</Button>
          </CardFooter>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/image/shop-illustration.webp"
            alt="Shop Illustration"
            width={200}
            height={200}
            priority
            className="rounded-md"
          />
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="rounded-lg shadow-md text-gray-600 dark:text-white p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>{stat.icon}</div>
                <div className="flex flex-col justify-center ml-4">
                  <span className="text-lg">{stat.label}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              </div>
              <div className="flex items-center ml-auto">{stat.rightIcon}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl">Products</span>
        <Button onClick={() => setIsDrawerOpen(true)}>Add Product</Button>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-screen max-h-screen">
          <div className="flex flex-col h-full">
            <DrawerHeader className="flex flex-row items-center justify-between border-b">
              <DrawerTitle>Add New Product</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="p-4">
              <div className="space-y-4">
                <p className="">Your product form content goes here...</p>
              </div>
            </div>

            <DrawerFooter className="border-t">
              <div className="flex gap-2 justify-end">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button>Save Product</Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Page;
