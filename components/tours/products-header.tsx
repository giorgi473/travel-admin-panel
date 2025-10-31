"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddProductDrawer } from "@/components/tours/add-product-drawer";

export const ProductsHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-md lg:text-md font-semibold text-gray-600 dark:text-gray-300">
          Products
        </span>
        <Button
          size={"sm"}
          className="text-xs"
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Product
        </Button>
      </div>

      <AddProductDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
};
