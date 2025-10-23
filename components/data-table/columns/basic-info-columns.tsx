"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/column-header";

export interface Destination {
  id: number;
  title: { en: string; ka: string };
  src: string;
  modalSrc: string;
  additionalDescription: { en: string; ka: string };
  region: { en: string; ka: string };
  city: { en: string; ka: string };
  description: { en: string; ka: string };
  name: { en: string; ka: string };
  address: string;
  phone: string;
  website: string;
  workingHours: { [key: string]: string };
  anotherSection: {
    name1: { en: string; ka: string };
    description: { en: string; ka: string };
    image: string;
    name2: { en: string; ka: string };
    description2: { en: string; ka: string };
  };
  slideCard: Array<{
    id: number;
    title: { en: string; ka: string };
    src: string;
  }>;
  blogs: Array<{
    id: number;
    title: { en: string; ka: string };
    img: string;
  }>;
  createdAt: string;
}

interface ColumnActions {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const createBasicInfoColumns = ({
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<Destination>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    id: "title.en",
    accessorFn: (row) => row.title.en,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title (EN)" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.original.title.en}>
        {row.original.title.en}
      </div>
    ),
  },
  {
    id: "region.en",
    accessorFn: (row) => row.region.en,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region (EN)" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate" title={row.original.region.en}>
        {row.original.region.en}
      </div>
    ),
  },
  {
    id: "city.en",
    accessorFn: (row) => row.city.en,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City (EN)" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate" title={row.original.city.en}>
        {row.original.city.en}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const destination = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(destination.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(destination.id)}
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
