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
import { X, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const bilingualSchema = z.object({
  en: z.string().min(1, "English version required"),
  ka: z.string().min(1, "Georgian version required"),
});

const destinationSchema = z.object({
  title: bilingualSchema,
  description: bilingualSchema,
  image: z.string().min(1, "Image URL required"),
  duration: bilingualSchema,
  activities: bilingualSchema,
  currency: bilingualSchema,
});

const formSchema = z.object({
  title: bilingualSchema,
  src: z.string().min(1, "Image URL required"),
  additionalDescription: bilingualSchema,
  region: bilingualSchema,
  city: z.string().min(1, "City required"),
  link: z.string().url("Valid URL required").optional().or(z.literal("")),
  description: bilingualSchema,
  name: bilingualSchema,
  address: bilingualSchema,
  phone: z.string().min(1, "Phone required"),
  website: z.string().url("Valid URL required").optional().or(z.literal("")),
  destinations: z.array(destinationSchema),
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
  const [destinations, setDestinations] = useState<
    z.infer<typeof destinationSchema>[]
  >([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: { en: "", ka: "" },
      src: "",
      additionalDescription: { en: "", ka: "" },
      region: { en: "", ka: "" },
      city: "",
      link: "",
      description: { en: "", ka: "" },
      name: { en: "", ka: "" },
      address: { en: "", ka: "" },
      phone: "",
      website: "",
      destinations: [],
    },
  });

  const onSubmit = (data: FormData) => {
    const finalData = { ...data, destinations };
    console.log("[v0] Form submitted:", finalData);
  };

  const addDestination = () => {
    setDestinations([
      ...destinations,
      {
        title: { en: "", ka: "" },
        description: { en: "", ka: "" },
        image: "",
        duration: { en: "", ka: "" },
        activities: { en: "", ka: "" },
        currency: { en: "", ka: "" },
      },
    ]);
  };

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const updateDestination = (
    index: number,
    field: keyof z.infer<typeof destinationSchema>,
    lang: "en" | "ka" | null,
    value: string
  ) => {
    const newDestinations = [...destinations];
    if (lang) {
      newDestinations[index] = {
        ...newDestinations[index],
        [field]: {
          ...(newDestinations[index][field] as { en: string; ka: string }),
          [lang]: value,
        },
      };
    } else {
      newDestinations[index] = {
        ...newDestinations[index],
        [field]: value,
      };
    }
    setDestinations(newDestinations);
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
                              placeholder="Kutaisi"
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
                              placeholder="ქუთაისი"
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
                    name="src"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs sm:text-sm font-medium">
                          Image URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="/places/kutaisi-gnta.webp"
                            {...field}
                            className="text-sm sm:text-base h-10"
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
                            <Input
                              placeholder="Natural Monuments"
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
                      name="description.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Description (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ბუნების ძეგლები"
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
                      name="additionalDescription.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Additional Description (English)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Kutaisi..."
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
                      name="additionalDescription.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Additional Description (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="ქუთაისი..."
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

                {/* Location Information */}
                <section className="space-y-4 sm:space-y-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800">
                    Location Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="region.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Region (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tbilisi"
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
                      name="region.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Region (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="თბილისი"
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
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs sm:text-sm font-medium">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="3434"
                            {...field}
                            className="text-sm sm:text-base h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="name.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Name (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Okatse Canyon Visitor Center"
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
                      name="name.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Name (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ოკაცეს კანიონის ვიზიტორთა ცენტრი"
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
                      name="address.en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Address (English)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="FG4G+7XV, Okatse, Georgia"
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
                      name="address.ka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Address (Georgian)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="FG4G+7XV, ოკაცე, საქართველო"
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

                {/* Contact Information */}
                <section className="space-y-4 sm:space-y-6">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="595 03 60 47"
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
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Website
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://apa.gov.ge/"
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
                    name="link"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-xs sm:text-sm font-medium">
                          Google Maps Link
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.google.com/maps/"
                            {...field}
                            className="text-sm sm:text-base h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                {/* Destinations */}
                <section className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800">
                      Destinations
                    </h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addDestination}
                      className="text-xs border-gray-300 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                    >
                      <Plus className="h-2 w-2 sm:h-3 sm:w-3 mr-1 sm:mr-2" />
                      Add Destination
                    </Button>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {destinations.map((destination, index) => (
                      <Card
                        key={index}
                        className="p-4 sm:p-6 space-y-4 sm:space-y-6 border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-700">
                            Destination {index + 1}
                          </h4>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeDestination(index)}
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
                              placeholder="One-Day Tour in Kutaisi"
                              value={destination.title.en}
                              onChange={(e) =>
                                updateDestination(
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
                              placeholder="ერთდღიანი ტური ქუთაისში"
                              value={destination.title.ka}
                              onChange={(e) =>
                                updateDestination(
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Description (English)
                            </FormLabel>
                            <Textarea
                              placeholder="During this one-day tour..."
                              value={destination.description.en}
                              onChange={(e) =>
                                updateDestination(
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
                              placeholder="ამ ერთდღიანი ტურის ფარგლებში..."
                              value={destination.description.ka}
                              onChange={(e) =>
                                updateDestination(
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

                        <div className="space-y-2 sm:space-y-3 w-full">
                          <FormLabel className="text-xs sm:text-sm font-medium">
                            Image URL
                          </FormLabel>
                          <Input
                            placeholder="/places/kutaisi-view-with-birds.webp"
                            value={destination.image}
                            onChange={(e) =>
                              updateDestination(
                                index,
                                "image",
                                null,
                                e.target.value
                              )
                            }
                            className="text-sm sm:text-base h-10"
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Duration (EN)
                            </FormLabel>
                            <Input
                              placeholder="30 km"
                              value={destination.duration.en}
                              onChange={(e) =>
                                updateDestination(
                                  index,
                                  "duration",
                                  "en",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Duration (KA)
                            </FormLabel>
                            <Input
                              placeholder="30 კმ"
                              value={destination.duration.ka}
                              onChange={(e) =>
                                updateDestination(
                                  index,
                                  "duration",
                                  "ka",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Activities (EN)
                            </FormLabel>
                            <Input
                              placeholder="12 attractions"
                              value={destination.activities.en}
                              onChange={(e) =>
                                updateDestination(
                                  index,
                                  "activities",
                                  "en",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Activities (KA)
                            </FormLabel>
                            <Input
                              placeholder="12 სანახაობა"
                              value={destination.activities.ka}
                              onChange={(e) =>
                                updateDestination(
                                  index,
                                  "activities",
                                  "ka",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>

                          <div className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Currency (EN)
                            </FormLabel>
                            <Input
                              placeholder="30 km"
                              value={destination.currency.en}
                              onChange={(e) =>
                                updateDestination(
                                  index,
                                  "currency",
                                  "en",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                          <div className="space-y-2 sm:space-y-3 md:col-span-2 lg:col-span-1">
                            <FormLabel className="text-xs sm:text-sm font-medium">
                              Currency (KA)
                            </FormLabel>
                            <Input
                              placeholder="30 კმ"
                              value={destination.currency.ka}
                              onChange={(e) =>
                                updateDestination(
                                  index,
                                  "currency",
                                  "ka",
                                  e.target.value
                                )
                              }
                              className="text-sm sm:text-base h-10"
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
                    className="text-xs cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs cursor-pointer"
                >
                  Save Tour
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
