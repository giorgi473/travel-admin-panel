"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Control, UseFieldArrayReturn } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/modules/image-upload";
import { Plus, Trash2 } from "lucide-react";
import { AttractionFormData } from "@/lib/schemas/attraction-schema";
import { BilingualInput } from "../bilingual-input";
import { BilingualTextarea } from "../bilingual-textarea";
import { WorkingHoursSection } from "../working-hours-section";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel } from "@/components/ui/form";
import { MapPin, Phone, Globe } from "lucide-react";

interface SlideCardTabProps {
  control: Control<AttractionFormData>;
  slideCardFields: UseFieldArrayReturn<
    AttractionFormData,
    "slideCard",
    "id"
  >["fields"];
  appendSlideCard: UseFieldArrayReturn<
    AttractionFormData,
    "slideCard",
    "id"
  >["append"];
  removeSlideCard: UseFieldArrayReturn<
    AttractionFormData,
    "slideCard",
    "id"
  >["remove"];
}

export function SlideCardTab({
  control,
  slideCardFields,
  appendSlideCard,
  removeSlideCard,
}: SlideCardTabProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Related Places</h2>
          <p className="text-sm text-muted-foreground">
            Add related attractions and places
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            appendSlideCard({
              title: { en: "", ka: "" },
              src: "",
              modalSrc: "",
              additionalDescription: { en: "", ka: "" },
              text: { en: "", ka: "" },
              region: { en: "", ka: "" },
              city: { en: "", ka: "" },
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
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Place
        </Button>
      </div>

      {slideCardFields.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">No places added yet</p>
            <p className="text-sm text-muted-foreground">
              Click "Add Place" to get started
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {slideCardFields.map((field, index) => (
            <Card key={field.id} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Place {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSlideCard(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <BilingualInput
                  control={control}
                  nameEn={`slideCard.${index}.title.en`}
                  nameKa={`slideCard.${index}.title.ka`}
                  labelEn="Title (English)"
                  labelKa="Title (Georgian)"
                  placeholderEn="Enter title"
                  placeholderKa="შეიყვანეთ სათაური"
                />

                {/* Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name={`slideCard.${index}.src`}
                    render={({ field }) => (
                      <FormItem>
                        <ImageUpload
                          label="Main Image"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`slideCard.${index}.modalSrc`}
                    render={({ field }) => (
                      <FormItem>
                        <ImageUpload
                          label="Modal Image"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Description */}
                <BilingualTextarea
                  control={control}
                  nameEn={`slideCard.${index}.additionalDescription.en`}
                  nameKa={`slideCard.${index}.additionalDescription.ka`}
                  labelEn="Additional Description (English)"
                  labelKa="დამატებითი აღწერა (ქართულად)"
                  placeholderEn="Enter additional description"
                  placeholderKa="შეიყვანეთ დამატებითი აღწერა"
                  rows={3}
                />

                {/* Text (optional) */}
                <BilingualTextarea
                  control={control}
                  nameEn={`slideCard.${index}.text.en`}
                  nameKa={`slideCard.${index}.text.ka`}
                  labelEn="Text (Optional, English)"
                  labelKa="ტექსტი (ოპციური, ქართულად)"
                  placeholderEn="Optional text"
                  placeholderKa="ოპციური ტექსტი"
                  rows={2}
                />

                {/* Location */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <BilingualInput
                    control={control}
                    nameEn={`slideCard.${index}.region.en`}
                    nameKa={`slideCard.${index}.region.ka`}
                    labelEn="Region (English)"
                    labelKa="რეგიონი (ქართულად)"
                    placeholderEn="Enter region"
                    placeholderKa="შეიყვანეთ რეგიონი"
                  />
                  <BilingualInput
                    control={control}
                    nameEn={`slideCard.${index}.city.en`}
                    nameKa={`slideCard.${index}.city.ka`}
                    labelEn="City (English)"
                    labelKa="ქალაქი (ქართულად)"
                    placeholderEn="Enter city"
                    placeholderKa="შეიყვანეთ ქალაქი"
                  />
                </div>

                {/* Name */}
                <BilingualInput
                  control={control}
                  nameEn={`slideCard.${index}.name.en`}
                  nameKa={`slideCard.${index}.name.ka`}
                  labelEn="Name (English)"
                  labelKa="სახელი (ქართულად)"
                  placeholderEn="Enter name"
                  placeholderKa="შეიყვანეთ სახელი"
                />

                {/* Contact */}
                <div className="space-y-4">
                  <FormField
                    control={control}
                    name={`slideCard.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter full address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={control}
                      name={`slideCard.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+995 XXX XXX XXX" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`slideCard.${index}.website`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Website (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Working Hours (optional) */}
                <WorkingHoursSection
                  control={control}
                  baseName={`slideCard.${index}.workingHours`}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
