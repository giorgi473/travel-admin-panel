"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

interface AddProductDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProductDrawer: React.FC<AddProductDrawerProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen max-h-screen">
        <div className="flex flex-col h-full">
          <DrawerHeader className="flex flex-row items-center justify-between border-b">
            <DrawerTitle className="text-sm">Add New Product</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="p-4">
            <div className="space-y-4">
              <p className="text-sm">Your product form content goes here...</p>
            </div>
          </div>

          <DrawerFooter className="border-t">
            <div className="flex gap-2 justify-end">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  size={"sm"}
                  className="text-xs bg-transparent"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button size={"sm"} className="text-xs">
                Save Product
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
