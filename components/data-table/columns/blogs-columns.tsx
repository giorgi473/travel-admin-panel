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

export type BlogRow = {
  destinationId: number;
  blogId: number;
  titleEn: string;
  img: string;
};

interface ColumnActions {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const createBlogsColumns = ({
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<BlogRow>[] => [
  {
    accessorKey: "destinationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination ID" />
    ),
  },
  {
    accessorKey: "blogId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blog ID" />
    ),
  },
  {
    accessorKey: "titleEn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title (EN)" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.original.titleEn}>
        {row.original.titleEn}
      </div>
    ),
  },
  {
    accessorKey: "img",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate" title={row.original.img}>
        {row.original.img}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const destinationId = row.original.destinationId;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(destinationId)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(destinationId)}
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
