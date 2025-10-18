"use client";

import type React from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";
import { SidebarProvider } from "@/components/sidebar-provider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2, Upload, X } from "lucide-react";
import { createSlide } from "@/actions/slider-actions";
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

const englishRegex = /^[A-Za-z0-9\s.,!?'-]*$/;
const georgianRegex = /^[ა-ჰ0-9\s.,!?'-]*$/;

const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "სურათი აუცილებელია")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "სურათი უნდა იყოს 5MB-ზე ნაკლები"
    )
    .refine(
      (file) =>
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

export default function DashboardPage() {
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const onSubmit = async (values: FormValues) => {
    console.log("=== 🚀 Form Submit START ===");
    console.log("Form values:", {
      titleEn: values.titleEn,
      titleKa: values.titleKa,
      descriptionEn: values.descriptionEn,
      descriptionKa: values.descriptionKa,
      imageSize: values.image.size,
    });

    setSaving(true);

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        console.log("✅ Base64 created, length:", base64Image.length);

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

        console.log("📤 Calling createSlide action...");
        const result = await createSlide(slideData);

        console.log("📥 Action result:", result);

        if (!result.success) {
          toast.error(result.error || "შეცდომა");
          setSaving(false);
          return;
        }

        toast.success("✅ სლაიდი წარმატებით შეიქმნა!");
        form.reset();
        setImagePreview(null);
        setSaving(false);

        console.log("=== ✨ Form Submit END (SUCCESS) ===");
      };

      reader.onerror = (error) => {
        console.error("❌ FileReader error:", error);
        toast.error("სურათის წაკითხვა ვერ მოხერხდა");
        setSaving(false);
      };

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
            <div className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">ახალი სლაიდის დამატება</h1>
                <p className="text-muted-foreground">შექმენით ახალი სლაიდი</p>
              </div>
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      ახალი სლაიდი
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
                                სურათი<span className="text-red-500">*</span>
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
                            <Plus className="mr-2 h-4 w-4" />
                            {saving ? "მიმდინარეობს..." : "სლაიდის შექმნა"}
                          </Button>
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
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
