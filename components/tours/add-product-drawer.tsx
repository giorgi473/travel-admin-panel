"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "../modules/image-upload";

const bilingualSchema = z.object({
  en: z.string().min(1, "English version required"),
  ka: z.string().min(1, "Georgian version required"),
});

const popularTourSchema = z.object({
  title: bilingualSchema,
  image: z.string().min(1, "Image URL required"),
  mapLink: z.string().url("Valid URL required"),
  description: bilingualSchema,
});

const formSchema = z.object({
  title: bilingualSchema,
  image: z.string().min(1, "Image URL required"),
  description: bilingualSchema,
  duration: bilingualSchema,
  activities: bilingualSchema,
  currency: bilingualSchema,
  popularTours: z.array(popularTourSchema),
});

type FormData = z.infer<typeof formSchema>;

interface AddProductDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProductDrawer: React.FC<AddProductDrawerProps> = ({
  open,
  onOpenChange,
}) => {
  const [popularTours, setPopularTours] = useState<
    z.infer<typeof popularTourSchema>[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: { en: "", ka: "" },
      image: "",
      description: { en: "", ka: "" },
      duration: { en: "", ka: "" },
      activities: { en: "", ka: "" },
      currency: { en: "", ka: "" },
      popularTours: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const finalData = { ...data, popularTours };

    try {
      const response = await fetch(
        "https://nest-travel-api.vercel.app/api/v1/tours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create tour");
      }

      const result = await response.json();
      console.log("[v0] Tour created successfully:", result);

      form.reset();
      setPopularTours([]);
      onOpenChange(false);
    } catch (error) {
      console.error("[v0] Error creating tour:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPopularTour = () => {
    setPopularTours([
      ...popularTours,
      {
        title: { en: "", ka: "" },
        image: "",
        mapLink: "",
        description: { en: "", ka: "" },
      },
    ]);
  };

  const removePopularTour = (index: number) => {
    setPopularTours(popularTours.filter((_, i) => i !== index));
  };

  const updatePopularTour = (
    index: number,
    field: keyof z.infer<typeof popularTourSchema>,
    lang: "en" | "ka" | null,
    value: string
  ) => {
    const newTours = [...popularTours];
    if (lang) {
      newTours[index] = {
        ...newTours[index],
        [field]: {
          ...(newTours[index][field] as { en: string; ka: string }),
          [lang]: value,
        },
      };
    } else {
      newTours[index] = {
        ...newTours[index],
        [field]: value,
      };
    }
    setPopularTours(newTours);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen max-h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <DrawerHeader className="flex flex-row items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4">
              <DrawerTitle className="text-xs font-semibold">
                Add New Tour
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-6 sm:space-y-8 w-full">
                {/* Basic Information */}
                <section className="space-y-4 sm:space-y-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="title.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Title (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="One-Day Canyon Tour"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Title (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="კანიონების ერთდღიანი ტური"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <ImageUpload
                            label="Tour Image"
                            value={field.value}
                            onChange={field.onChange}
                            maxSize={10}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="description.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Description (English)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Discover the geographical and biological diversity..."
                              {...field}
                              className="text-sm sm:text-base min-h-20 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Description (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="აღმოაჩინე დასავლეთ საქართველოს..."
                              {...field}
                              className="text-sm sm:text-base min-h-20 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Tour Details */}
                <section className="space-y-4 sm:space-y-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800">
                    Tour Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="duration.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Duration (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="8-12 hours"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Duration (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="8-12 სთ"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="activities.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Activities (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="18 attractions, 3 activities"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="activities.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Activities (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="18 სანახაობა 3 აქტივობა"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="currency.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Price (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="₾ 250"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Price (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="₾ 250"
                              {...field}
                              className="text-sm sm:text-base h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Popular Tours */}
                <section className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800">
                      Popular Tours
                    </h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addPopularTour}
                      className="text-xs border-gray-300 hover:bg-gray-50 transition-colors w-full sm:w-auto bg-transparent"
                    >
                      <Plus className="h-2 w-2 sm:h-3 sm:w-3 mr-1 sm:mr-2" />
                      Add Popular Tour
                    </Button>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {popularTours.map((tour, index) => (
                      <Card
                        key={index}
                        className="p-4 sm:p-6 space-y-4 sm:space-y-6 border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-700">
                            Popular Tour {index + 1}
                          </h4>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removePopularTour(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Title (English)
                            </FormLabel>
                            <Input
                              placeholder="Okatse Canyon"
                              value={tour.title.en}
                              onChange={(e) =>
                                updatePopularTour(
                                  index,
                                  "title",
                                  "en",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Title (Georgian)
                            </FormLabel>
                            <Input
                              placeholder="ოკაცესის კანიონი"
                              value={tour.title.ka}
                              onChange={(e) =>
                                updatePopularTour(
                                  index,
                                  "title",
                                  "ka",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          <ImageUpload
                            label="Popular Tour Image"
                            value={tour.image}
                            onChange={(value) =>
                              updatePopularTour(index, "image", null, value)
                            }
                            maxSize={10}
                          />
                        </div>

                        <div className="space-y-2 sm:space-y-3 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Map Link
                          </FormLabel>
                          <Input
                            placeholder="https://www.google.com/maps/..."
                            value={tour.mapLink}
                            onChange={(e) =>
                              updatePopularTour(
                                index,
                                "mapLink",
                                null,
                                e.target.value
                              )
                            }
                            className="text-sm sm:text-base h-10"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Description (English)
                            </FormLabel>
                            <Textarea
                              placeholder="Beautiful gorge in Northern Georgia..."
                              value={tour.description.en}
                              onChange={(e) =>
                                updatePopularTour(
                                  index,
                                  "description",
                                  "en",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base min-h-20 resize-none"
                            />
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Description (Georgian)
                            </FormLabel>
                            <Textarea
                              placeholder="ულამაზესი ხეობა ჩრდილოეთ საქართველოში..."
                              value={tour.description.ka}
                              onChange={(e) =>
                                updatePopularTour(
                                  index,
                                  "description",
                                  "ka",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base min-h-20 resize-none"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <DrawerFooter className="border-t px-4 sm:px-6 py-3 sm:py-4 mb-5 sm:mb-5">
              <div className="flex gap-2 sm:gap-3 justify-end w-full">
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs cursor-pointer bg-transparent"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Tour"
                  )}
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
