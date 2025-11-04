"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import {
  transliterateToEnglish,
  transliterateToGeorgian,
} from "@/lib/transliteration";
import { createTour, updateTour } from "@/actions/tours-actions";

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

interface Tour {
  id: string;
  title: { en: string; ka: string };
  image: string;
  description: { en: string; ka: string };
  duration: { en: string; ka: string };
  activities: { en: string; ka: string };
  currency: { en: string; ka: string };
  popularTours?: Array<{
    title: { en: string; ka: string };
    image: string;
    mapLink: string;
    description: { en: string; ka: string };
  }>;
}

interface AddProductDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour?: Tour;
  onUpdate?: () => void;
}

export const AddProductDrawer: React.FC<AddProductDrawerProps> = ({
  open,
  onOpenChange,
  tour,
  onUpdate,
}) => {
  const isEdit = !!tour;
  const [popularTours, setPopularTours] = useState<
    z.infer<typeof popularTourSchema>[]
  >(tour?.popularTours || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: { en: tour?.title.en || "", ka: tour?.title.ka || "" },
      image: tour?.image || "",
      description: {
        en: tour?.description.en || "",
        ka: tour?.description.ka || "",
      },
      duration: { en: tour?.duration.en || "", ka: tour?.duration.ka || "" },
      activities: {
        en: tour?.activities.en || "",
        ka: tour?.activities.ka || "",
      },
      currency: { en: tour?.currency.en || "", ka: tour?.currency.ka || "" },
      popularTours: tour?.popularTours || [],
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: { en: tour?.title.en || "", ka: tour?.title.ka || "" },
        image: tour?.image || "",
        description: {
          en: tour?.description.en || "",
          ka: tour?.description.ka || "",
        },
        duration: { en: tour?.duration.en || "", ka: tour?.duration.ka || "" },
        activities: {
          en: tour?.activities.en || "",
          ka: tour?.activities.ka || "",
        },
        currency: { en: tour?.currency.en || "", ka: tour?.currency.ka || "" },
        popularTours: tour?.popularTours || [],
      });
      setPopularTours(tour?.popularTours || []);
    }
  }, [open, tour, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const finalData = { ...data, popularTours };

    try {
      let result;
      if (isEdit) {
        result = await updateTour(tour!.id, finalData as Partial<FormData>);
        if (result.success && onUpdate) {
          onUpdate();
        }
      } else {
        result = await createTour(finalData);
        if (result.success) {
          form.reset();
          setPopularTours([]);
        }
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      onOpenChange(false);
    } catch (error) {
      console.error(
        "[v0] Error",
        isEdit ? "updating" : "creating",
        "tour:",
        error
      );
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
      const processedValue =
        lang === "en"
          ? transliterateToEnglish(value)
          : transliterateToGeorgian(value);
      newTours[index] = {
        ...newTours[index],
        [field]: {
          ...(newTours[index][field] as { en: string; ka: string }),
          [lang]: processedValue,
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

  const handleBilingualChange =
    (lang: "en" | "ka") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const processedValue =
        lang === "en"
          ? transliterateToEnglish(e.target.value)
          : transliterateToGeorgian(e.target.value);
      return processedValue;
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
                {isEdit ? `Edit Tour: ${tour?.title.en}` : "Add New Tour"}
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("en")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("ka")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("en")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("ka")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("en")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("ka")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("en")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("ka")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("en")(e))
                              }
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
                              onChange={(e) =>
                                field.onChange(handleBilingualChange("ka")(e))
                              }
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
                    {popularTours.map((pt, index) => (
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
                              value={pt.title.en}
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
                              value={pt.title.ka}
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
                            value={pt.image}
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
                            value={pt.mapLink}
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
                              value={pt.description.en}
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
                              value={pt.description.ka}
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
                      {isEdit ? "Updating..." : "Saving..."}
                    </>
                  ) : isEdit ? (
                    "Update Tour"
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
