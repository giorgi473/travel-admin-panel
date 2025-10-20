"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Plus,
  Loader2,
  Upload,
  X,
  Trash2,
  Pencil,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  createSlide,
  getAllSlides,
  deleteSlide,
  updateSlide,
} from "@/actions/slider-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const englishRegex = /^[A-Za-z0-9\s.,!?'-]*$/;
const georgianRegex = /^[ა-ჰ0-9\s.,!?'-]*$/;

const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.size > 0, "Image is required")
    .refine(
      (file) => file.size === 0 || file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        file.size === 0 ||
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      "Only JPG, PNG, WebP, SVG, GIF formats allowed"
    ),
  titleEn: z
    .string()
    .min(1, "English title is required")
    .regex(englishRegex, "Please use only English characters"),
  titleKa: z
    .string()
    .min(1, "Georgian title is required")
    .regex(georgianRegex, "Please use only Georgian characters"),
  descriptionEn: z
    .string()
    .optional()
    .refine(
      (value) => !value || englishRegex.test(value),
      "Please use only English characters"
    ),
  descriptionKa: z
    .string()
    .optional()
    .refine(
      (value) => !value || georgianRegex.test(value),
      "Please use only Georgian characters"
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface Slide {
  id: number;
  src: string;
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export default function DashboardPage() {
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<
    "title" | "createdAt" | "updatedAt"
  >("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: new File([], ""),
      titleEn: "",
      titleKa: "",
      descriptionEn: "",
      descriptionKa: "",
    },
  });

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const result = await getAllSlides();
      if (result.success && Array.isArray(result.data)) {
        setSlides(result.data);
      } else {
        toast.error("Failed to load data");
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleEnglishInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: any
  ) => {
    const value = e.target.value;
    if (!value || englishRegex.test(value)) {
      field.onChange(value);
    } else {
      toast.error("Only English characters allowed");
    }
  };

  const handleGeorgianInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: any
  ) => {
    const value = e.target.value;
    if (!value || georgianRegex.test(value)) {
      field.onChange(value);
    } else {
      toast.error("Only Georgian characters allowed");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("image", new File([], ""));
    setImagePreview(null);
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      const result = await deleteSlide(id);
      if (result.success) {
        toast.success("Slide deleted successfully");
        await fetchSlides();
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setIsEditMode(true);
    setImagePreview(slide.src);
    form.setValue("titleEn", slide.title.en);
    form.setValue("titleKa", slide.title.ka);
    form.setValue("descriptionEn", slide.description.en || "");
    form.setValue("descriptionKa", slide.description.ka || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingSlide(null);
    setIsEditMode(false);
    form.reset();
    setImagePreview(null);
  };

  const handleSort = (field: "title" | "createdAt" | "updatedAt") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedSlides = slides
    .filter((slide) => {
      const query = searchQuery.toLowerCase();
      return (
        slide.title.en.toLowerCase().includes(query) ||
        slide.title.ka.toLowerCase().includes(query) ||
        slide.description.en?.toLowerCase().includes(query) ||
        slide.description.ka?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === "title") {
        comparison = a.title.en.localeCompare(b.title.en);
      } else if (sortField === "createdAt") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        comparison = dateA - dateB;
      } else if (sortField === "updatedAt") {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        comparison = dateA - dateB;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    );
  };

  const getAnalyticsData = () => {
    const now = new Date();
    const last7Days = new Array(7).fill(0).map((_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count: 0,
      };
    });

    slides.forEach((slide) => {
      if (slide.createdAt) {
        const createdDate = new Date(slide.createdAt);
        const daysDiff = Math.floor(
          (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysDiff >= 0 && daysDiff < 7) {
          last7Days[6 - daysDiff].count++;
        }
      }
    });

    const totalSlides = slides.length;
    const last24h = slides.filter((s) => {
      if (!s.createdAt) return false;
      const diff = now.getTime() - new Date(s.createdAt).getTime();
      return diff < 24 * 60 * 60 * 1000;
    }).length;

    const last7DaysCount = slides.filter((s) => {
      if (!s.createdAt) return false;
      const diff = now.getTime() - new Date(s.createdAt).getTime();
      return diff < 7 * 24 * 60 * 60 * 1000;
    }).length;

    const withDescription = slides.filter(
      (s) => s.description.en || s.description.ka
    ).length;
    const withoutDescription = totalSlides - withDescription;

    return {
      chartData: last7Days,
      stats: {
        total: totalSlides,
        last24h,
        last7Days: last7DaysCount,
        withDescription,
        withoutDescription,
      },
    };
  };

  const analytics = getAnalyticsData();
  const COLORS = ["#ef4444", "#ef4444"];

  const pieData = [
    {
      name: "With Description",
      value: analytics.stats.withDescription,
      color: COLORS[0],
    },
    {
      name: "Without Description",
      value: analytics.stats.withoutDescription,
      color: COLORS[1],
    },
  ];

  const onSubmit = async (values: FormValues) => {
    setSaving(true);

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        const slideData = {
          src: base64Image,
          title: {
            en: values.titleEn,
            ka: values.titleKa,
          },
          description: {
            en: values.descriptionEn || "",
            ka: values.descriptionKa || "",
          },
        };

        let result;
        if (isEditMode && editingSlide) {
          result = await updateSlide(editingSlide.id, slideData);
          if (result.success) {
            toast.success("Slide updated successfully");
          }
        } else {
          result = await createSlide(slideData);
          if (result.success) {
            toast.success("Slide created successfully");
          }
        }

        if (!result.success) {
          toast.error(result.error || "Error");
          setSaving(false);
          return;
        }

        form.reset();
        setImagePreview(null);
        setIsEditMode(false);
        setEditingSlide(null);
        setSaving(false);
        await fetchSlides();
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast.error("Failed to read image");
        setSaving(false);
      };

      if (isEditMode && values.image.size === 0 && editingSlide) {
        const slideData = {
          src: editingSlide.src,
          title: {
            en: values.titleEn,
            ka: values.titleKa,
          },
          description: {
            en: values.descriptionEn || "",
            ka: values.descriptionKa || "",
          },
        };

        const result = await updateSlide(editingSlide.id, slideData);
        if (result.success) {
          toast.success("Slide updated successfully");
          form.reset();
          setImagePreview(null);
          setIsEditMode(false);
          setEditingSlide(null);
          await fetchSlides();
        } else {
          toast.error(result.error || "Error");
        }
        setSaving(false);
        return;
      }

      reader.readAsDataURL(values.image);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error");
      setSaving(false);
    }
  };

  return (
    <div className="p-4 mx-auto space-y-8">
      {/* Analytics Dashboard */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Slide statistics and analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Total Slides
              </CardDescription>
              <CardTitle className="text-3xl font-semibold">
                {analytics.stats.total}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Overall count</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Last 24 Hours
              </CardDescription>
              <CardTitle className="text-3xl font-semibold">
                {analytics.stats.last24h}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">New slides</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Last 7 Days
              </CardDescription>
              <CardTitle className="text-3xl font-semibold">
                {analytics.stats.last7Days}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Weekly activity</p>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">
                With Description
              </CardDescription>
              <CardTitle className="text-3xl font-semibold">
                {analytics.stats.withDescription}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                {analytics.stats.total > 0
                  ? `${Math.round(
                      (analytics.stats.withDescription /
                        analytics.stats.total) *
                        100
                    )}%`
                  : "0%"}{" "}
                complete
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Last 7 Days Activity
              </CardTitle>
              <CardDescription className="text-xs">
                Daily slide additions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Content Completeness
              </CardTitle>
              <CardDescription className="text-xs">
                Description statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Slide" : "Add New Slide"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEditMode ? "Update slide information" : "Create a new slide"}
          </p>
        </div>
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {isEditMode ? (
                <>
                  <Pencil className="h-4 w-4" />
                  Edit Slide
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  New Slide
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Image
                        {!isEditMode && <span className="text-red-500">*</span>}
                        {isEditMode && (
                          <span className="text-xs text-gray-400 ml-2">
                            (optional - keep existing image)
                          </span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {!imagePreview ? (
                            <label
                              htmlFor="image-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50"
                            >
                              <div className="flex flex-col items-center justify-center">
                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  Click to upload
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  JPG, PNG, WebP, SVG, GIF (MAX 5MB)
                                </p>
                              </div>
                              <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml,image/gif"
                                onChange={handleFileChange}
                                {...field}
                              />
                            </label>
                          ) : (
                            <div className="relative w-full max-w-sm">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7"
                                onClick={handleRemoveImage}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="titleEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Title (English)
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter title in English"
                            {...field}
                            onChange={(e) => handleEnglishInput(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="titleKa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Title (Georgian)
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter title"
                            {...field}
                            onChange={(e) => handleGeorgianInput(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="descriptionEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Description (English)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter description"
                            className="h-20 resize-none"
                            {...field}
                            onChange={(e) => handleEnglishInput(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="descriptionKa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          Description (Georgian)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter description"
                            className="h-20 resize-none"
                            {...field}
                            onChange={(e) => handleGeorgianInput(e, field)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" disabled={saving} size="sm">
                    {saving && (
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    )}
                    {isEditMode ? (
                      <>
                        <Pencil className="mr-2 h-3 w-3" />
                        {saving ? "Updating..." : "Update"}
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-3 w-3" />
                        {saving ? "Creating..." : "Create Slide"}
                      </>
                    )}
                  </Button>
                  {isEditMode && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={saving}
                      size="sm"
                    >
                      <X className="mr-2 h-3 w-3" />
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setImagePreview(null);
                    }}
                    disabled={saving}
                    size="sm"
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <div>
        <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">All Slides</h2>
            <p className="text-sm text-gray-500">
              Total: {slides.length} slides
              {searchQuery && ` • Found: ${filteredAndSortedSlides.length}`}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              <Input
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSlides}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                "Refresh"
              )}
            </Button>
          </div>
        </div>
        <Card className="border">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : slides.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No slides found
              </div>
            ) : filteredAndSortedSlides.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 text-sm">
                  No results for "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("title")}
                        className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                      >
                        Title
                        <SortIcon field="title" />
                      </button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <button
                        onClick={() => handleSort("createdAt")}
                        className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                      >
                        Created
                        <SortIcon field="createdAt" />
                      </button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <button
                        onClick={() => handleSort("updatedAt")}
                        className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                      >
                        Updated
                        <SortIcon field="updatedAt" />
                      </button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedSlides.map((slide) => (
                    <TableRow
                      key={slide.id}
                      className={`${
                        isEditMode && editingSlide?.id === slide.id
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <TableCell>
                        <img
                          src={slide.src}
                          alt={slide.title.en}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="space-y-0.5">
                          <div className="text-sm max-w-48 truncate">
                            {slide.title.en}
                          </div>
                          <div className="text-xs text-gray-500 max-w-48 truncate">
                            {slide.title.ka}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="space-y-0.5">
                          <div className="text-sm max-w-48 truncate">
                            {slide.description.en || "-"}
                          </div>
                          <div className="text-xs text-gray-500 max-w-48 truncate">
                            {slide.description.ka || "-"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-xs text-gray-500">
                          {formatDate(slide.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-xs text-gray-500">
                          {formatDate(slide.updatedAt)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(slide)}
                            disabled={deleting || isEditMode}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(slide.id)}
                            disabled={deleting || isEditMode}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The slide will be permanently
              deleted from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
