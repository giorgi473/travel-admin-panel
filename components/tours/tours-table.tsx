// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Trash2,
//   Loader2,
//   RefreshCw,
//   Clock,
//   Activity,
//   DollarSign,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { getTours, deleteTour } from "@/actions/tours-actions";
// import Image from "next/image";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// interface Tour {
//   id: string;
//   title: {
//     en: string;
//     ka: string;
//   };
//   image: string;
//   description: {
//     en: string;
//     ka: string;
//   };
//   duration: {
//     en: string;
//     ka: string;
//   };
//   activities: {
//     en: string;
//     ka: string;
//   };
//   currency: {
//     en: string;
//     ka: string;
//   };
// }

// const ITEMS_PER_PAGE = 10;

// export const ToursTable: React.FC = () => {
//   const [tours, setTours] = useState<Tour[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchTours = async () => {
//     setLoading(true);
//     const result = await getTours();
//     if (result.success && result.data) {
//       setTours(result.data);
//       setCurrentPage(1);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const handleDelete = async () => {
//     if (!deleteId) return;

//     setDeleting(true);
//     const result = await deleteTour(deleteId);
//     if (result.success) {
//       setTours(tours.filter((tour) => tour.id !== deleteId));
//       setCurrentPage(1);
//     }
//     setDeleting(false);
//     setDeleteId(null);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(tours.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentTours = tours.slice(startIndex, endIndex);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-16">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         </div>
//       </div>
//     );
//   }

//   if (tours.length === 0) {
//     return (
//       <Card className="border-dashed">
//         <CardContent className="flex flex-col items-center justify-center py-16 text-center">
//           <div className="rounded-full bg-muted p-4 mb-4">
//             <Activity className="h-8 w-8 text-muted-foreground" />
//           </div>
//           <h3 className="font-semibold text-lg mb-2">No tours yet</h3>
//           <p className="text-muted-foreground text-sm max-w-sm">
//             Get started by adding your first tour using the form above.
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">Tours</h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             Manage your tour listings ({tours.length} total)
//           </p>
//         </div>
//         <Button variant="outline" size="sm" onClick={fetchTours}>
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Refresh
//         </Button>
//       </div>

//       <div className="hidden lg:block rounded-lg border bg-card shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-muted/50">
//               <TableHead className="w-[120px]">Image</TableHead>
//               <TableHead className="min-w-[180px]">Title</TableHead>
//               <TableHead className="min-w-[140px]">Duration</TableHead>
//               <TableHead className="min-w-[140px]">Activities</TableHead>
//               <TableHead className="min-w-[120px]">Price</TableHead>
//               <TableHead className="text-right w-[100px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentTours.map((tour) => (
//               <TableRow
//                 key={tour.id}
//                 className="hover:bg-muted/50 transition-colors"
//               >
//                 <TableCell>
//                   <div className="relative w-16 h-12 rounded-sm overflow-hidden border bg-muted">
//                     <Image
//                       src={tour.image || "/placeholder.svg?height=80&width=80"}
//                       alt={tour.title.en}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="space-y-1 max-w-[200px]">
//                     <p
//                       className="font-medium leading-tight truncate"
//                       title={tour.title.en}
//                     >
//                       {tour.title.en}
//                     </p>
//                     <p
//                       className="text-sm text-muted-foreground truncate"
//                       title={tour.title.ka}
//                     >
//                       {tour.title.ka}
//                     </p>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2 max-w-[140px]">
//                     <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="text-sm truncate" title={tour.duration.en}>
//                       {tour.duration.en}
//                     </span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2 max-w-[140px]">
//                     <Activity className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span
//                       className="text-sm truncate"
//                       title={tour.activities.en}
//                     >
//                       {tour.activities.en}
//                     </span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="secondary" className="font-semibold">
//                     {tour.currency.en}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setDeleteId(tour.id)}
//                     className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/30">
//           <p className="text-sm text-muted-foreground">
//             Page {currentPage} of {totalPages}
//           </p>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="lg:hidden space-y-4">
//         <div className="grid gap-4 sm:grid-cols-2">
//           {currentTours.map((tour) => (
//             <Card
//               key={tour.id}
//               className="overflow-hidden hover:shadow-md transition-shadow"
//             >
//               <div className="relative w-full h-48 bg-muted">
//                 <Image
//                   src={tour.image || "/placeholder.svg?height=200&width=400"}
//                   alt={tour.title.en}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <CardContent className="p-4 space-y-3">
//                 <div>
//                   <h3
//                     className="font-semibold text-lg leading-tight line-clamp-2 mb-1"
//                     title={tour.title.en}
//                   >
//                     {tour.title.en}
//                   </h3>
//                   <p
//                     className="text-sm text-muted-foreground truncate"
//                     title={tour.title.ka}
//                   >
//                     {tour.title.ka}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="truncate" title={tour.duration.en}>
//                       {tour.duration.en}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Activity className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="truncate" title={tour.activities.en}>
//                       {tour.activities.en}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <Badge variant="secondary" className="font-semibold">
//                       {tour.currency.en}
//                     </Badge>
//                   </div>
//                 </div>

//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => setDeleteId(tour.id)}
//                   className="w-full"
//                 >
//                   <Trash2 className="h-4 w-4 mr-2" />
//                   Delete Tour
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="flex items-center justify-between gap-2 px-2">
//           <p className="text-sm text-muted-foreground">
//             Page {currentPage} of {totalPages}
//           </p>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Tour?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the
//               tour from your database.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDelete}
//               disabled={deleting}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               {deleting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 "Delete"
//               )}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };

"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Trash2,
  Loader2,
  Search,
  X,
  Settings2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { getTours, deleteTour } from "@/actions/tours-actions";

interface Tour {
  id: string;
  title: { en: string; ka: string };
  image: string;
  description: { en: string; ka: string };
  duration: { en: string; ka: string };
  activities: { en: string; ka: string };
  currency: { en: string; ka: string };
}

const SortableHeader = ({
  label,
  onClick,
  isSorted,
}: {
  label: string;
  onClick: () => void;
  isSorted: "asc" | "desc" | false;
}) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 font-semibold hover:text-primary transition-colors"
  >
    {label}
    <ArrowUpDown
      className={`h-4 w-4 transition-all ${
        isSorted ? "text-primary" : "opacity-40 group-hover:opacity-60"
      }`}
    />
  </button>
);

const TourImageCell = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-muted to-muted/50 shadow-sm">
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      className="object-cover transition-transform hover:scale-105"
    />
  </div>
);

export const ToursTable: React.FC = () => {
  const [data, setData] = React.useState<Tour[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [deleting, setDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchTours = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getTours();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (err) {
      setError("Failed to load tours");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleDelete = React.useCallback(async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      setError(null);
      await deleteTour(deleteId);
      setData((prev) => prev.filter((tour) => tour.id !== deleteId));
    } catch (err) {
      setError("Failed to delete tour");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }, [deleteId]);

  const handleDeleteSelected = React.useCallback(async () => {
    try {
      setDeleting(true);
      setError(null);
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);

      await Promise.all(selectedRows.map((id) => deleteTour(id)));
      setData((prev) => prev.filter((tour) => !selectedRows.includes(tour.id)));
      setRowSelection({});
    } catch (err) {
      setError("Failed to delete selected tours");
    } finally {
      setDeleting(false);
    }
  }, []);

  const columns: ColumnDef<Tour>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="rounded border-border/50"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="rounded border-border/50"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <TourImageCell
          src={row.getValue("image") as string}
          alt={row.original.title.en}
        />
      ),
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <SortableHeader
          label="Title"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isSorted={column.getIsSorted()}
        />
      ),
      cell: ({ row }) => (
        <div className="space-y-1 max-w-xs">
          <p
            className="font-semibold text-sm leading-tight text-foreground truncate"
            title={row.original.title.en}
          >
            {row.original.title.en}
          </p>
          <p
            className="text-xs text-muted-foreground truncate"
            title={row.original.title.ka}
          >
            {row.original.title.ka}
          </p>
        </div>
      ),
      minSize: 180,
    },
    {
      accessorKey: "duration",
      header: ({ column }) => (
        <SortableHeader
          label="Duration"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isSorted={column.getIsSorted()}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500/60" />
          <span className="text-sm font-medium">
            {row.original.duration.en}
          </span>
        </div>
      ),
      minSize: 120,
    },
    {
      accessorKey: "activities",
      header: ({ column }) => (
        <SortableHeader
          label="Activities"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isSorted={column.getIsSorted()}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
          <span className="text-sm">{row.original.activities.en}</span>
        </div>
      ),
      minSize: 120,
    },
    {
      accessorKey: "currency",
      header: "Price",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className="font-semibold bg-primary/10 text-primary hover:bg-primary/20"
        >
          {row.original.currency.en}
        </Badge>
      ),
      enableSorting: false,
      size: 100,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteId(row.original.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 60,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const searchValue =
    (table.getColumn("title")?.getFilterValue() as string) ?? "";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading tours...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="border-dashed">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="rounded-full bg-muted/50 p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No tours yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            Get started by adding your first tour using the form above.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Tours</h2>
          <p className="text-sm text-muted-foreground">
            Manage your {data.length} tour listings
            {table.getState().columnFilters.length > 0 &&
              ` • ${table.getFilteredRowModel().rows.length} results`}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchTours}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="ძებნა სათაურით..."
            value={searchValue}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
          />
          {searchValue && (
            <button
              onClick={() => table.getColumn("title")?.setFilterValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 items-center w-full sm:w-auto">
          {selectedRows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={deleting}
              className="gap-2 flex-1 sm:flex-none"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete ({selectedRows.length})
                </>
              )}
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings2 className="h-4 w-4" />
                Columns
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden transition-all hover:shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gradient-to-r from-muted/40 to-muted/20 hover:bg-muted/40 border-border/50"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="py-3.5 px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors border-border/30 data-[state=selected]:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.columnDef.size }}
                      className="py-3 px-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  No tours found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-1 py-4">
        <div className="text-xs font-medium text-muted-foreground">
          {selectedRows.length > 0 ? (
            <span className="text-primary font-semibold">
              {selectedRows.length} row(s) selected
            </span>
          ) : (
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="gap-1"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="gap-1"
          >
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The tour will be permanently deleted
              from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
