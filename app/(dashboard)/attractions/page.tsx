"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { toast, Toaster } from "sonner";
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
import { AttractionsByRegionChart } from "@/components/charts/attractions-by-region-chart";
import { QuickStatsCard } from "@/components/charts/quick-stats-card";
import { GrowthTrendChart } from "@/components/charts/growth-trend-chart";
import { ContentDistributionChart } from "@/components/charts/content-distribution-chart";
import {
  attractionSchema,
  type AttractionFormData,
} from "@/lib/schemas/attraction-schema";
import { BasicInfoTab } from "@/components/attraction/tabs/basic-info-tab";
import { ContactTab } from "@/components/attraction/tabs/contact-tab";
import { DetailsTab } from "@/components/attraction/tabs/details-tab";
import { SlideCardTab } from "@/components/attraction/tabs/slidecard-tab";
import { BlogsTab } from "@/components/attraction/tabs/blogs-tab";
import { DataTable } from "@/components/data-table/data-table";
import {
  createBasicInfoColumns,
  type Destination,
} from "@/components/data-table/columns/basic-info-columns";
import { createContactColumns } from "@/components/data-table/columns/contact-columns";
import { createDetailsColumns } from "@/components/data-table/columns/details-columns";
import {
  createSlideCardColumns,
  type SlideCardRow,
} from "@/components/data-table/columns/slidecard-columns";
import {
  createBlogsColumns,
  type BlogRow,
} from "@/components/data-table/columns/blogs-columns";

const defaultFormValues: AttractionFormData = {
  title: { en: "", ka: "" },
  src: "",
  modalSrc: "",
  additionalDescription: { en: "", ka: "" },
  region: { en: "", ka: "" },
  city: { en: "", ka: "" },
  description: { en: "", ka: "" },
  name: { en: "", ka: "" },
  address: "",
  phone: "",
  website: "",
  workingHours: {
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  },
  anotherSection: {
    image: "",
    name1: { en: "", ka: "" },
    name2: { en: "", ka: "" },
    name4: { en: "", ka: "" },
    name5: { en: "", ka: "" },
    description: { en: "", ka: "" },
    description2: { en: "", ka: "" },
    description3: { en: "", ka: "" },
    description4: { en: "", ka: "" },
    description5: { en: "", ka: "" },
  },
  slideCard: [],
  blogs: [],
};

export default function CreateAttractionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const form = useForm<AttractionFormData>({
    resolver: zodResolver(attractionSchema),
    mode: "onSubmit",
    defaultValues: defaultFormValues,
  });

  const {
    fields: slideCardFields,
    append: appendSlideCard,
    remove: removeSlideCard,
  } = useFieldArray({
    control: form.control,
    name: "slideCard",
  });

  const {
    fields: blogFields,
    append: appendBlog,
    remove: removeBlog,
  } = useFieldArray({
    control: form.control,
    name: "blogs",
  });

  // Fetch destinations on mount
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingTable(true);
        const response = await fetch(
          "https://nest-travel-api.vercel.app/api/v1/slider/destination"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        const data: Destination[] = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        toast.error("შეცდომა მონაცემების ჩატვირთვაში");
      } finally {
        setLoadingTable(false);
      }
    };

    fetchDestinations();
  }, []);

  // Edit functionality
  const handleEdit = async (id: number) => {
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://nest-travel-api.vercel.app/api/v1";
      const response = await fetch(`${backendUrl}/slider/destination/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch destination");
      }
      const data = await response.json();
      // Populate form with data
      form.reset({
        ...data,
        slideCard: data.slideCard || [],
        blogs: data.blogs || [],
      });
      setEditingId(id);
      toast.success("რედაქტირების რეჟიმი აქტიურია");
    } catch (error) {
      console.error("Error fetching for edit:", error);
      toast.error(
        "შეცდომა მონაცემების რედაქტირებისას: " + (error as Error).message
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://nest-travel-api.vercel.app/api/v1";
      const response = await fetch(`${backendUrl}/slider/destination/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete destination");
      }

      toast.success("Attraction წაშლილია წარმატებით!");
      // Refresh table after deletion
      const fetchDestinations = async () => {
        const res = await fetch(
          "https://nest-travel-api.vercel.app/api/v1/slider/destination"
        );
        if (res.ok) {
          const newData: Destination[] = await res.json();
          setDestinations(newData);
        }
      };
      fetchDestinations();
    } catch (error) {
      console.error("Error deleting destination:", error);
      toast.error(
        "შეცდომა attraction-ის წაშლისას: " + (error as Error).message
      );
    }
    setDeleteId(null);
  };

  const onSubmit = async (data: AttractionFormData) => {
    setIsSubmitting(true);
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://nest-travel-api.vercel.app/api/v1";
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${backendUrl}/slider/destination/${editingId}`
        : `${backendUrl}/slider/destination`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status} – ${errorData}`
        );
      }

      const result = await response.json();
      console.log(
        `[Frontend] ${editingId ? "Updated" : "Created"} successfully:`,
        result
      );

      // Reset form to default values
      form.reset(defaultFormValues);
      setEditingId(null);

      toast.success(
        editingId
          ? "Attraction განახლებულია წარმატებით!"
          : "Attraction შექმნილია წარმატებით!"
      );

      // Refresh table after creation/update
      const fetchDestinations = async () => {
        const res = await fetch(
          "https://nest-travel-api.vercel.app/api/v1/slider/destination"
        );
        if (res.ok) {
          const newData: Destination[] = await res.json();
          setDestinations(newData);
        }
      };
      fetchDestinations();
    } catch (error) {
      console.error("[Frontend] Error:", error);
      toast.error(
        "შეცდომა მონაცემების შენახვისას: " + (error as Error).message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshDestinations = async () => {
    try {
      setLoadingTable(true);
      const response = await fetch(
        "https://nest-travel-api.vercel.app/api/v1/slider/destination"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }
      const data: Destination[] = await response.json();
      setDestinations(data);
      toast.success("მონაცემები განახლდა");
    } catch (error) {
      console.error("Error fetching destinations:", error);
      toast.error("შეცდომა მონაცემების ჩატვირთვაში");
    } finally {
      setLoadingTable(false);
    }
  };

  const chartData = {
    byRegion: destinations.reduce((acc, dest) => {
      const region = dest.region.en || "Unknown";
      const existing = acc.find((item) => item.region === region);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ region, count: 1 });
      }
      return acc;
    }, [] as { region: string; count: number }[]),
    overview: [
      { name: "Total", value: destinations.length },
      {
        name: "With Blogs",
        value: destinations.filter((d) => d.blogs && d.blogs.length > 0).length,
      },
      {
        name: "With Places",
        value: destinations.filter((d) => d.slideCard && d.slideCard.length > 0)
          .length,
      },
    ],
    trend: [
      { month: "Jan", attractions: Math.floor(destinations.length * 0.6) },
      { month: "Feb", attractions: Math.floor(destinations.length * 0.7) },
      { month: "Mar", attractions: Math.floor(destinations.length * 0.75) },
      { month: "Apr", attractions: Math.floor(destinations.length * 0.85) },
      { month: "May", attractions: Math.floor(destinations.length * 0.9) },
      { month: "Jun", attractions: destinations.length },
    ],
  };

  const basicInfoColumns = createBasicInfoColumns({
    onEdit: handleEdit,
    onDelete: setDeleteId,
  });

  const contactColumns = createContactColumns({
    onEdit: handleEdit,
    onDelete: setDeleteId,
  });

  const detailsColumns = createDetailsColumns({
    onEdit: handleEdit,
    onDelete: setDeleteId,
  });

  const slideCardColumns = createSlideCardColumns({
    onEdit: handleEdit,
    onDelete: setDeleteId,
  });

  const blogsColumns = createBlogsColumns({
    onEdit: handleEdit,
    onDelete: setDeleteId,
  });

  const slideCardData: SlideCardRow[] = destinations.flatMap((destination) =>
    destination.slideCard.map((slideCard, index) => ({
      destinationId: destination.id,
      slideCardId: slideCard.id || index + 1,
      titleEn: slideCard.title.en,
      src: slideCard.src,
    }))
  );

  const blogsData: BlogRow[] = destinations.flatMap((destination) =>
    destination.blogs.map((blog, index) => ({
      destinationId: destination.id,
      blogId: blog.id || index + 1,
      titleEn: blog.title.en,
      img: blog.img,
    }))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto p-4 md:p-4 lg:p-4 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {editingId ? "Edit Attraction" : "Create Attraction"}
          </h1>
          <p className="text-muted-foreground">
            {editingId
              ? "Update existing attraction"
              : "Add a new attraction with bilingual support"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AttractionsByRegionChart data={chartData.byRegion} />
          <QuickStatsCard data={chartData.overview} />
          <GrowthTrendChart data={chartData.trend} />
          <ContentDistributionChart data={chartData.overview} />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-auto">
                <TabsTrigger value="basic" className="text-sm">
                  Basic
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-sm">
                  Contact
                </TabsTrigger>
                <TabsTrigger value="details" className="text-sm">
                  Details
                </TabsTrigger>
                <TabsTrigger value="slidecard" className="text-sm">
                  Places
                </TabsTrigger>
                <TabsTrigger value="blogs" className="text-sm">
                  Blogs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <BasicInfoTab control={form.control} />
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Existing Basic Info
                  </h3>
                  {loadingTable ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : (
                    <DataTable
                      columns={basicInfoColumns}
                      data={destinations}
                      searchKey="title.en"
                      searchPlaceholder="Search by title..."
                      onRefresh={refreshDestinations}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6 mt-6">
                <ContactTab control={form.control} />
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Existing Contact Info
                  </h3>
                  {loadingTable ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : (
                    <DataTable
                      columns={contactColumns}
                      data={destinations}
                      searchKey="name.en"
                      searchPlaceholder="Search by name..."
                      onRefresh={refreshDestinations}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-6">
                <DetailsTab control={form.control} />
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Existing Details Info
                  </h3>
                  {loadingTable ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : (
                    <DataTable
                      columns={detailsColumns}
                      data={destinations}
                      searchKey="anotherSection.name1.en"
                      searchPlaceholder="Search by name..."
                      onRefresh={refreshDestinations}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="slidecard" className="space-y-6 mt-6">
                <SlideCardTab
                  control={form.control}
                  slideCardFields={slideCardFields}
                  appendSlideCard={appendSlideCard}
                  removeSlideCard={removeSlideCard}
                />
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Existing Slide Cards
                  </h3>
                  {loadingTable ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : (
                    <DataTable
                      columns={slideCardColumns}
                      data={slideCardData}
                      searchKey="titleEn"
                      searchPlaceholder="Search by title..."
                      onRefresh={refreshDestinations}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="blogs" className="space-y-6 mt-6">
                <BlogsTab
                  control={form.control}
                  blogFields={blogFields}
                  appendBlog={appendBlog}
                  removeBlog={removeBlog}
                />
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Existing Blogs</h3>
                  {loadingTable ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-muted-foreground">Loading...</div>
                    </div>
                  ) : (
                    <DataTable
                      columns={blogsColumns}
                      data={blogsData}
                      searchKey="titleEn"
                      searchPlaceholder="Search by title..."
                      onRefresh={refreshDestinations}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset(defaultFormValues);
                  setEditingId(null);
                }}
                disabled={isSubmitting}
              >
                {editingId ? "Cancel Edit" : "Reset Form"}
              </Button>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting
                  ? "Saving..."
                  : editingId
                  ? "Update Attraction"
                  : "Create Attraction"}
              </Button>
            </div>
          </form>
        </Form>

        <AlertDialog
          open={deleteId !== null}
          onOpenChange={() => setDeleteId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this attraction? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Toaster />
    </div>
  );
}
