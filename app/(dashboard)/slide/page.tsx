// "use client";

// import type React from "react";
// import { AdminSidebar } from "@/components/admin-sidebar";
// import { AdminHeader } from "@/components/admin-header";
// import { SidebarProvider } from "@/components/sidebar-provider";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Plus, Loader2, Upload, X } from "lucide-react";
// import { createSlide } from "@/actions/slider-actions";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

// const englishRegex = /^[A-Za-z0-9\s.,!?'-]*$/;
// const georgianRegex = /^[ა-ჰ0-9\s.,!?'-]*$/;

// const formSchema = z.object({
//   image: z
//     .instanceof(File)
//     .refine((file) => file.size > 0, "სურათი აუცილებელია")
//     .refine(
//       (file) => file.size <= 5 * 1024 * 1024,
//       "სურათი უნდა იყოს 5MB-ზე ნაკლები"
//     )
//     .refine(
//       (file) =>
//         [
//           "image/jpeg",
//           "image/jpg",
//           "image/png",
//           "image/webp",
//           "image/svg+xml",
//           "image/gif",
//         ].includes(file.type),
//       "დაშვებულია მხოლოდ JPG, PNG, WebP, SVG, GIF ფორმატები"
//     ),
//   titleEn: z
//     .string()
//     .min(1, "English title is required")
//     .regex(englishRegex, "Please use only English characters"),
//   titleKa: z
//     .string()
//     .min(1, "ქართული სათაური აუცილებელია")
//     .regex(georgianRegex, "გთხოვთ, გამოიყენოთ მხოლოდ ქართული სიმბოლოები"),
//   descriptionEn: z
//     .string()
//     .optional()
//     .refine(
//       (value) => !value || englishRegex.test(value),
//       "Please use only English characters"
//     ),
//   descriptionKa: z
//     .string()
//     .optional()
//     .refine(
//       (value) => !value || georgianRegex.test(value),
//       "გთხოვთ, გამოიყენოთ მხოლოდ ქართული სიმბოლოები"
//     ),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function DashboardPage() {
//   const [saving, setSaving] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       image: new File([], ""),
//       titleEn: "",
//       titleKa: "",
//       descriptionEn: "",
//       descriptionKa: "",
//     },
//   });

//   const handleEnglishInput = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: any
//   ) => {
//     const value = e.target.value;
//     if (!value || englishRegex.test(value)) {
//       field.onChange(value);
//     } else {
//       toast.error("Only English characters are allowed");
//     }
//   };

//   const handleGeorgianInput = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: any
//   ) => {
//     const value = e.target.value;
//     if (!value || georgianRegex.test(value)) {
//       field.onChange(value);
//     } else {
//       toast.error("მხოლოდ ქართული სიმბოლოები");
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       console.log("📸 File selected:", file.name, file.type, file.size);
//       form.setValue("image", file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//         console.log("✅ Image preview created");
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     form.setValue("image", new File([], ""));
//     setImagePreview(null);
//     console.log("🗑️ Image removed");
//   };

//   const onSubmit = async (values: FormValues) => {
//     console.log("=== 🚀 Form Submit START ===");
//     console.log("Form values:", {
//       titleEn: values.titleEn,
//       titleKa: values.titleKa,
//       descriptionEn: values.descriptionEn,
//       descriptionKa: values.descriptionKa,
//       imageSize: values.image.size,
//     });

//     setSaving(true);

//     try {
//       const reader = new FileReader();

//       reader.onloadend = async () => {
//         const base64Image = reader.result as string;
//         console.log("✅ Base64 created, length:", base64Image.length);

//         const slideData = {
//           src: base64Image,
//           title: {
//             en: values.titleEn,
//             ka: values.titleKa,
//           },
//           description: {
//             en: values.descriptionEn || "",
//             ka: values.descriptionKa || "",
//           },
//         };

//         console.log("📤 Calling createSlide action...");
//         const result = await createSlide(slideData);

//         console.log("📥 Action result:", result);

//         if (!result.success) {
//           toast.error(result.error || "შეცდომა");
//           setSaving(false);
//           return;
//         }

//         toast.success("✅ სლაიდი წარმატებით შეიქმნა!");
//         form.reset();
//         setImagePreview(null);
//         setSaving(false);

//         console.log("=== ✨ Form Submit END (SUCCESS) ===");
//       };

//       reader.onerror = (error) => {
//         console.error("❌ FileReader error:", error);
//         toast.error("სურათის წაკითხვა ვერ მოხერხდა");
//         setSaving(false);
//       };

//       reader.readAsDataURL(values.image);
//     } catch (error) {
//       console.error("❌ Submit error:", error);
//       toast.error("შეცდომა");
//       setSaving(false);
//     }
//   };

//   return (
//     <SidebarProvider>
//       <div className="flex h-screen bg-background">
//         <AdminSidebar />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <AdminHeader />
//           <main className="flex-1 overflow-y-auto">
//             <div className="p-8">
//               <div className="mb-8">
//                 <h1 className="text-3xl font-bold">ახალი სლაიდის დამატება</h1>
//                 <p className="text-muted-foreground">შექმენით ახალი სლაიდი</p>
//               </div>
//               <section>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Plus className="h-5 w-5" />
//                       ახალი სლაიდი
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Form {...form}>
//                       <form
//                         onSubmit={form.handleSubmit(onSubmit)}
//                         className="space-y-6"
//                       >
//                         <FormField
//                           control={form.control}
//                           name="image"
//                           render={({
//                             field: { value, onChange, ...field },
//                           }) => (
//                             <FormItem>
//                               <FormLabel>
//                                 სურათი<span className="text-red-500">*</span>
//                               </FormLabel>
//                               <FormControl>
//                                 <div className="space-y-4">
//                                   {!imagePreview ? (
//                                     <label
//                                       htmlFor="image-upload"
//                                       className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
//                                     >
//                                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                         <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
//                                         <p className="mb-2 text-sm text-muted-foreground">
//                                           <span className="font-semibold">
//                                             დააჭირეთ ასატვირთად
//                                           </span>
//                                         </p>
//                                         <p className="text-xs text-muted-foreground">
//                                           JPG, PNG, WebP, SVG, GIF (MAX 5MB)
//                                         </p>
//                                       </div>
//                                       <input
//                                         id="image-upload"
//                                         type="file"
//                                         className="hidden"
//                                         accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml,image/gif"
//                                         onChange={handleFileChange}
//                                         {...field}
//                                       />
//                                     </label>
//                                   ) : (
//                                     <div className="relative w-full max-w-md">
//                                       <img
//                                         src={imagePreview}
//                                         alt="Preview"
//                                         className="w-full h-48 object-cover rounded-lg border"
//                                       />
//                                       <Button
//                                         type="button"
//                                         variant="destructive"
//                                         size="icon"
//                                         className="absolute top-2 right-2"
//                                         onClick={handleRemoveImage}
//                                       >
//                                         <X className="h-4 w-4" />
//                                       </Button>
//                                     </div>
//                                   )}
//                                 </div>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <FormField
//                             control={form.control}
//                             name="titleEn"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>
//                                   Title (English)
//                                   <span className="text-red-500">*</span>
//                                 </FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder="Enter title in English"
//                                     {...field}
//                                     onChange={(e) =>
//                                       handleEnglishInput(e, field)
//                                     }
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name="titleKa"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>
//                                   სათაური (ქართული)
//                                   <span className="text-red-500">*</span>
//                                 </FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder="შეიყვანეთ სათაური"
//                                     {...field}
//                                     onChange={(e) =>
//                                       handleGeorgianInput(e, field)
//                                     }
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <FormField
//                             control={form.control}
//                             name="descriptionEn"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Description (English)</FormLabel>
//                                 <FormControl>
//                                   <Textarea
//                                     placeholder="Enter description"
//                                     className="h-24 resize-none"
//                                     {...field}
//                                     onChange={(e) =>
//                                       handleEnglishInput(e, field)
//                                     }
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={form.control}
//                             name="descriptionKa"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>აღწერა (ქართული)</FormLabel>
//                                 <FormControl>
//                                   <Textarea
//                                     placeholder="შეიყვანეთ აღწერა"
//                                     className="h-24 resize-none"
//                                     {...field}
//                                     onChange={(e) =>
//                                       handleGeorgianInput(e, field)
//                                     }
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                         <div className="flex gap-3 pt-4">
//                           <Button
//                             type="submit"
//                             disabled={saving}
//                             className="min-w-[200px]"
//                           >
//                             {saving && (
//                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             )}
//                             <Plus className="mr-2 h-4 w-4" />
//                             {saving ? "მიმდინარეობს..." : "სლაიდის შექმნა"}
//                           </Button>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => {
//                               form.reset();
//                               setImagePreview(null);
//                             }}
//                             disabled={saving}
//                           >
//                             გასუფთავება
//                           </Button>
//                         </div>
//                       </form>
//                     </Form>
//                   </CardContent>
//                 </Card>
//               </section>
//             </div>
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

"use client";

import type React from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { SidebarProvider } from "@/components/sidebar-provider";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Loader2,
  Upload,
  X,
  Trash2,
  Eye,
  Pencil,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
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

const englishRegex = /^[A-Za-z0-9\s.,!?'-]*$/;
const georgianRegex = /^[ა-ჰ0-9\s.,!?'-]*$/;

const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.size > 0, "სურათი აუცილებელია")
    .refine(
      (file) => file.size === 0 || file.size <= 5 * 1024 * 1024,
      "სურათი უნდა იყოს 5MB-ზე ნაკლები"
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
      "დაშვებულია მხოლოდ JPG, PNG, WebP, SVG, GIF ფორმატები"
    ),
  titleEn: z
    .string()
    .min(1, "English title is required")
    .regex(englishRegex, "Please use only English characters"),
  titleKa: z
    .string()
    .min(1, "ქართული სათაური აუცილებელია")
    .regex(georgianRegex, "გთხოვთ, გამოიყენოთ მხოლოდ ქართული სიმბოლოები"),
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
      "გთხოვთ, გამოიყენოთ მხოლოდ ქართული სიმბოლოები"
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

    if (diffInMinutes < 1) return "ახლახან";
    if (diffInMinutes < 60) return `${diffInMinutes} წუთის წინ`;
    if (diffInHours < 24) return `${diffInHours} საათის წინ`;
    if (diffInDays < 7) return `${diffInDays} დღის წინ`;

    return new Intl.DateTimeFormat("ka-GE", {
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
        toast.error("მონაცემების ჩატვირთვა ვერ მოხერხდა");
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      toast.error("შეცდომა მონაცემების ჩატვირთვისას");
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
      toast.error("Only English characters are allowed");
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
      toast.error("მხოლოდ ქართული სიმბოლოები");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("📸 File selected:", file.name, file.type, file.size);
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        console.log("✅ Image preview created");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("image", new File([], ""));
    setImagePreview(null);
    console.log("🗑️ Image removed");
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      const result = await deleteSlide(id);
      if (result.success) {
        toast.success("სლაიდი წარმატებით წაიშალა");
        await fetchSlides();
      } else {
        toast.error(result.error || "წაშლა ვერ მოხერხდა");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("შეცდომა წაშლისას");
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
      return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1 text-primary" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 text-primary" />
    );
  };

  const onSubmit = async (values: FormValues) => {
    console.log("=== 🚀 Form Submit START ===");
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
          // განახლება
          result = await updateSlide(editingSlide.id, slideData);
          if (result.success) {
            toast.success("✅ სლაიდი წარმატებით განახლდა!");
          }
        } else {
          // ახალი შექმნა
          result = await createSlide(slideData);
          if (result.success) {
            toast.success("✅ სლაიდი წარმატებით შეიქმნა!");
          }
        }

        if (!result.success) {
          toast.error(result.error || "შეცდომა");
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
        console.error("❌ FileReader error:", error);
        toast.error("სურათის წაკითხვა ვერ მოხერხდა");
        setSaving(false);
      };

      // თუ სურათი არ შეიცვალა რედაქტირებისას, გამოიყენე არსებული
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
          toast.success("✅ სლაიდი წარმატებით განახლდა!");
          form.reset();
          setImagePreview(null);
          setIsEditMode(false);
          setEditingSlide(null);
          await fetchSlides();
        } else {
          toast.error(result.error || "შეცდომა");
        }
        setSaving(false);
        return;
      }

      reader.readAsDataURL(values.image);
    } catch (error) {
      console.error("❌ Submit error:", error);
      toast.error("შეცდომა");
      setSaving(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* ახალი სლაიდის დამატება */}
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold">
                    {isEditMode
                      ? "სლაიდის რედაქტირება"
                      : "ახალი სლაიდის დამატება"}
                  </h1>
                  <p className="text-muted-foreground">
                    {isEditMode
                      ? "განაახლეთ სლაიდის ინფორმაცია"
                      : "შექმენით ახალი სლაიდი"}
                  </p>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {isEditMode ? (
                        <>
                          <Pencil className="h-5 w-5" />
                          სლაიდის რედაქტირება
                        </>
                      ) : (
                        <>
                          <Plus className="h-5 w-5" />
                          ახალი სლაიდი
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="image"
                          render={({
                            field: { value, onChange, ...field },
                          }) => (
                            <FormItem>
                              <FormLabel>
                                სურათი
                                {!isEditMode && (
                                  <span className="text-red-500">*</span>
                                )}
                                {isEditMode && (
                                  <span className="text-xs text-muted-foreground ml-2">
                                    (არჩევითი - არ შეცვალოთ არსებული სურათი)
                                  </span>
                                )}
                              </FormLabel>
                              <FormControl>
                                <div className="space-y-4">
                                  {!imagePreview ? (
                                    <label
                                      htmlFor="image-upload"
                                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                                    >
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground">
                                          <span className="font-semibold">
                                            დააჭირეთ ასატვირთად
                                          </span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
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
                                    <div className="relative w-full max-w-md">
                                      <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={handleRemoveImage}
                                      >
                                        <X className="h-4 w-4" />
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
                                <FormLabel>
                                  Title (English)
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter title in English"
                                    {...field}
                                    onChange={(e) =>
                                      handleEnglishInput(e, field)
                                    }
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
                                <FormLabel>
                                  სათაური (ქართული)
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="შეიყვანეთ სათაური"
                                    {...field}
                                    onChange={(e) =>
                                      handleGeorgianInput(e, field)
                                    }
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
                                <FormLabel>Description (English)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter description"
                                    className="h-24 resize-none"
                                    {...field}
                                    onChange={(e) =>
                                      handleEnglishInput(e, field)
                                    }
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
                                <FormLabel>აღწერა (ქართული)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="შეიყვანეთ აღწერა"
                                    className="h-24 resize-none"
                                    {...field}
                                    onChange={(e) =>
                                      handleGeorgianInput(e, field)
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="submit"
                            disabled={saving}
                            className="min-w-[200px]"
                          >
                            {saving && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isEditMode ? (
                              <>
                                <Pencil className="mr-2 h-4 w-4" />
                                {saving ? "მიმდინარეობს..." : "განახლება"}
                              </>
                            ) : (
                              <>
                                <Plus className="mr-2 h-4 w-4" />
                                {saving ? "მიმდინარეობს..." : "სლაიდის შექმნა"}
                              </>
                            )}
                          </Button>
                          {isEditMode && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleCancelEdit}
                              disabled={saving}
                            >
                              <X className="mr-2 h-4 w-4" />
                              გაუქმება
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
                          >
                            გასუფთავება
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              {/* სლაიდების ცხრილი */}
              <div>
                <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">არსებული სლაიდები</h2>
                    <p className="text-muted-foreground">
                      სულ: {slides.length} სლაიდი
                      {searchQuery &&
                        ` • ნაპოვნია: ${filteredAndSortedSlides.length}`}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ძებნა სათაურით ან აღწერით..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchSlides}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "განახლება"
                      )}
                    </Button>
                  </div>
                </div>
                <Card>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : slides.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        სლაიდები ვერ მოიძებნა
                      </div>
                    ) : filteredAndSortedSlides.length === 0 ? (
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          "{searchQuery}" - ძებნის შედეგები არ მოიძებნა
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => setSearchQuery("")}
                        >
                          გასუფთავება
                        </Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">სურათი</TableHead>
                            <TableHead>
                              <button
                                onClick={() => handleSort("title")}
                                className="flex items-center hover:text-foreground transition-colors font-medium"
                              >
                                სათაური
                                <SortIcon field="title" />
                              </button>
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">
                              აღწერა
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              <button
                                onClick={() => handleSort("createdAt")}
                                className="flex items-center hover:text-foreground transition-colors font-medium"
                              >
                                შექმნილია
                                <SortIcon field="createdAt" />
                              </button>
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              <button
                                onClick={() => handleSort("updatedAt")}
                                className="flex items-center hover:text-foreground transition-colors font-medium"
                              >
                                განახლდა
                                <SortIcon field="updatedAt" />
                              </button>
                            </TableHead>
                            <TableHead className="text-right">
                              მოქმედებები
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAndSortedSlides.map((slide) => (
                            <TableRow
                              key={slide.id}
                              className={`group hover:bg-muted/50 ${
                                isEditMode && editingSlide?.id === slide.id
                                  ? "bg-primary/5 border-l-4 border-primary"
                                  : ""
                              }`}
                            >
                              <TableCell>
                                <div className="relative">
                                  <img
                                    src={slide.src}
                                    alt={slide.title.en}
                                    className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="space-y-1">
                                  <div className="max-w-[200px] truncate font-medium">
                                    {slide.title.en}
                                  </div>
                                  <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                                    {slide.title.ka}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="space-y-1">
                                  <div className="max-w-[200px] truncate text-sm">
                                    {slide.description.en || "-"}
                                  </div>
                                  <div className="max-w-[200px] truncate text-xs text-muted-foreground">
                                    {slide.description.ka || "-"}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500" />
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(slide.createdAt)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(slide.updatedAt)}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(slide)}
                                    disabled={deleting || isEditMode}
                                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setDeleteId(slide.id)}
                                    disabled={deleting || isEditMode}
                                    className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
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
            </div>
          </main>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>დარწმუნებული ხართ?</AlertDialogTitle>
            <AlertDialogDescription>
              ეს მოქმედება შეუქცევადია. სლაიდი სამუდამოდ წაიშლება მონაცემთა
              ბაზიდან.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>გაუქმება</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              წაშლა
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
