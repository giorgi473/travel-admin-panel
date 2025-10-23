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
import type { Destination } from "./basic-info-columns";

interface ColumnActions {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const createDetailsColumns = ({
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
    id: "anotherSection.name1.en",
    accessorFn: (row) => row.anotherSection.name1.en,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name 1 (EN)" />
    ),
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate"
        title={row.original.anotherSection.name1.en}
      >
        {row.original.anotherSection.name1.en}
      </div>
    ),
  },
  {
    id: "anotherSection.description.en",
    accessorFn: (row) => row.anotherSection.description.en,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description 1 (EN)" />
    ),
    cell: ({ row }) => (
      <div
        className="max-w-[250px] truncate"
        title={row.original.anotherSection.description.en}
      >
        {row.original.anotherSection.description.en}
      </div>
    ),
  },
  {
    id: "anotherSection.image",
    accessorFn: (row) => row.anotherSection.image,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate"
        title={row.original.anotherSection.image}
      >
        {row.original.anotherSection.image}
      </div>
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
