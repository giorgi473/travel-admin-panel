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

export const createContactColumns = ({
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
    id: "name.en",
    accessorFn: (row) => row.name.en,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (EN)" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.original.name.en}>
        {row.original.name.en}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate" title={row.original.address}>
        {row.original.address}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.original.website}>
        {row.original.website}
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
