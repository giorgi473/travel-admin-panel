"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash2,
  Loader2,
  RefreshCw,
  Clock,
  Activity,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Search,
  X,
  ArrowUpDown,
} from "lucide-react";
import { getTours, deleteTour } from "@/actions/tours-actions";
import Image from "next/image";
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
import { AddProductDrawer } from "./add-product-drawer";
import { Input } from "@/components/ui/input";

interface Tour {
  id: string;
  title: {
    en: string;
    ka: string;
  };
  image: string;
  description: {
    en: string;
    ka: string;
  };
  duration: {
    en: string;
    ka: string;
  };
  activities: {
    en: string;
    ka: string;
  };
  currency: {
    en: string;
    ka: string;
  };
  popularTours?: Array<{
    title: { en: string; ka: string };
    image: string;
    mapLink: string;
    description: { en: string; ka: string };
  }>;
}

const ITEMS_PER_PAGE = 5;

type SortOrder = "asc" | "desc";
type SortBy = "title" | "duration" | "activities";

export const ToursTable: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedTours, setSelectedTours] = useState<Set<string>>(new Set());

  const fetchTours = async () => {
    setLoading(true);
    const result = await getTours();
    if (result.success && result.data) {
      setTours(result.data);
      setCurrentPage(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    const result = await deleteTour(deleteId);
    if (result.success) {
      setTours(tours.filter((tour) => tour.id !== deleteId));
      setCurrentPage(1);
    }
    setDeleting(false);
    setDeleteId(null);
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
  };

  const handleEditClose = () => {
    setEditingTour(null);
  };

  const handleEditSuccess = () => {
    fetchTours(); // Refresh after update
    handleEditClose();
  };

  const handleSort = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleBulkDelete = async () => {
    const toursToDelete = Array.from(selectedTours);
    setDeleting(true);

    for (const tourId of toursToDelete) {
      await deleteTour(tourId);
    }

    setTours(tours.filter((tour) => !selectedTours.has(tour.id)));
    setSelectedTours(new Set());
    setDeleting(false);
    setCurrentPage(1);
  };

  const toggleSelectTour = (tourId: string) => {
    const newSelected = new Set(selectedTours);
    if (newSelected.has(tourId)) {
      newSelected.delete(tourId);
    } else {
      newSelected.add(tourId);
    }
    setSelectedTours(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedTours.size === currentTours.length) {
      setSelectedTours(new Set());
    } else {
      setSelectedTours(new Set(currentTours.map((tour) => tour.id)));
    }
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.title.ka.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTours = [...filteredTours].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "title":
        aValue = a.title.en.toLowerCase();
        bValue = b.title.en.toLowerCase();
        break;
      case "duration":
        aValue = a.duration.en;
        bValue = b.duration.en;
        break;
      case "activities":
        aValue = a.activities.en.toLowerCase();
        bValue = b.activities.en.toLowerCase();
        break;
      default:
        return 0;
    }
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedTours.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTours = sortedTours.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12 md:py-16 min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-center p-6">
          <div className="rounded-full bg-muted/50 p-3 sm:p-4 mb-4 flex items-center justify-center">
            <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">
            No tours yet
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            Get started by adding your first tour using the form above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Tours
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your tour listings ({tours.length} total)
            </p>
          </div>
          <div className="flex gap-2 flex-col lg:flex-row lg:items-center w-full lg:w-auto">
            {selectedTours.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={deleting}
                className="gap-2 flex-1 lg:flex-none"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete ({selectedTours.size})</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTours}
              className="w-full lg:w-auto gap-2 self-start lg:self-auto bg-transparent flex-1 lg:flex-none"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="ძებნა სათაურით..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-10 w-full"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="hidden lg:block rounded-xl border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/40 to-muted/20 hover:bg-muted/40 border-b border-border/50">
                <TableHead className="w-[50px] py-4">
                  <Checkbox
                    checked={
                      selectedTours.size === currentTours.length &&
                      currentTours.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all tours"
                  />
                </TableHead>
                <TableHead className="w-[120px] py-4">Image</TableHead>
                <TableHead className="min-w-[200px] py-4">
                  <button
                    onClick={() => handleSort("title")}
                    className="group flex items-center gap-2 font-semibold hover:text-primary transition-colors text-left w-full"
                  >
                    <span>Title</span>
                    <ArrowUpDown
                      className={`h-4 w-4 transition-all ${
                        sortBy === "title"
                          ? "text-primary"
                          : "opacity-40 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                </TableHead>
                <TableHead className="min-w-[160px] py-4">
                  <button
                    onClick={() => handleSort("duration")}
                    className="group flex items-center gap-2 font-semibold hover:text-primary transition-colors text-left w-full"
                  >
                    <span>Duration</span>
                    <ArrowUpDown
                      className={`h-4 w-4 transition-all ${
                        sortBy === "duration"
                          ? "text-primary"
                          : "opacity-40 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                </TableHead>
                <TableHead className="min-w-[160px] py-4">
                  <button
                    onClick={() => handleSort("activities")}
                    className="group flex items-center gap-2 font-semibold hover:text-primary transition-colors text-left w-full"
                  >
                    <span>Activities</span>
                    <ArrowUpDown
                      className={`h-4 w-4 transition-all ${
                        sortBy === "activities"
                          ? "text-primary"
                          : "opacity-40 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                </TableHead>
                <TableHead className="min-w-[140px] py-4">Price</TableHead>
                <TableHead className="text-right w-[140px] py-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTours.map((tour) => (
                <TableRow
                  key={tour.id}
                  className="hover:bg-muted/50 transition-all duration-200 border-b border-border/30 data-[state=selected]:bg-primary/5"
                >
                  <TableCell className="py-4">
                    <Checkbox
                      checked={selectedTours.has(tour.id)}
                      onCheckedChange={() => toggleSelectTour(tour.id)}
                      aria-label={`Select ${tour.title.en}`}
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-border/50 bg-gradient-to-br from-muted to-muted/50 shadow-sm">
                      <Image
                        src={
                          tour.image || "/placeholder.svg?height=80&width=80"
                        }
                        alt={tour.title.en}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1 max-w-[250px]">
                      <p
                        className="font-semibold text-sm leading-tight text-foreground truncate"
                        title={tour.title.en}
                      >
                        {tour.title.en}
                      </p>
                      <p
                        className="text-xs text-muted-foreground truncate"
                        title={tour.title.ka}
                      >
                        {tour.title.ka}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 max-w-[160px]">
                      <Clock className="h-4 w-4 text-blue-500/60 flex-shrink-0" />
                      <span
                        className="text-sm font-medium truncate"
                        title={tour.duration.en}
                      >
                        {tour.duration.en}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 max-w-[160px]">
                      <Activity className="h-4 w-4 text-green-500/60 flex-shrink-0" />
                      <span
                        className="text-sm truncate"
                        title={tour.activities.en}
                      >
                        {tour.activities.en}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      // variant="secondary"
                      className="font-semibold bg-primary/10 text-gray-600 dark:text-gray-200 hover:bg-primary/20 whitespace-nowrap"
                    >
                      {tour.currency.en}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tour)}
                        className="hover:text-primary hover:bg-primary/10 h-8 px-2 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(tour.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-2 sm:px-3 py-4 border-t bg-muted/30 rounded-b-xl">
            <p className="text-sm text-muted-foreground hidden sm:block">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="gap-1 h-9 px-3"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="gap-1 h-9 px-3"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentTours.map((tour) => (
              <Card
                key={tour.id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 ${
                  selectedTours.has(tour.id) ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="relative w-full h-40 sm:h-48 bg-gradient-to-br from-muted to-muted/50">
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedTours.has(tour.id)}
                      onCheckedChange={() => toggleSelectTour(tour.id)}
                      aria-label={`Select ${tour.title.en}`}
                    />
                  </div>
                  <Image
                    src={tour.image || "/placeholder.svg?height=200&width=400"}
                    alt={tour.title.en}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3
                      className="font-semibold text-base sm:text-lg leading-tight line-clamp-2"
                      title={tour.title.en}
                    >
                      {tour.title.en}
                    </h3>
                    <p
                      className="text-xs sm:text-sm text-muted-foreground truncate"
                      title={tour.title.ka}
                    >
                      {tour.title.ka}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500/60 flex-shrink-0" />
                      <span
                        className="truncate flex-1"
                        title={tour.duration.en}
                      >
                        {tour.duration.en}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-500/60 flex-shrink-0" />
                      <span
                        className="truncate flex-1"
                        title={tour.activities.en}
                      >
                        {tour.activities.en}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary/60 flex-shrink-0" />
                      <Badge
                        variant="secondary"
                        className="font-semibold bg-primary/10 text-primary"
                      >
                        {tour.currency.en}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(tour)}
                      className="flex-1 h-9"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(tour.id)}
                      className="flex-1 h-9"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 px-2 sm:px-3 py-3 bg-muted/30 rounded-xl">
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3 flex-1 sm:flex-none"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="h-9 px-3 flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="sm:max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg">
              Delete Tour?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This action cannot be undone. This will permanently delete the
              tour from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} className="h-8">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8"
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

      {editingTour && (
        <AddProductDrawer
          open={true}
          onOpenChange={handleEditClose}
          tour={editingTour}
          onUpdate={handleEditSuccess}
        />
      )}
    </>
  );
};
