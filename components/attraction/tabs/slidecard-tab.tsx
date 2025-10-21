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
                <BilingualInput
                  control={control}
                  nameEn={`slideCard.${index}.title.en`}
                  nameKa={`slideCard.${index}.title.ka`}
                  labelEn="Title (English)"
                  labelKa="Title (Georgian)"
                  placeholderEn="Enter title"
                  placeholderKa="შეიყვანეთ სათაური"
                />

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

                <BilingualTextarea
                  control={control}
                  nameEn={`slideCard.${index}.additionalDescription.en`}
                  nameKa={`slideCard.${index}.additionalDescription.ka`}
                  labelEn="Description (English)"
                  labelKa="Description (Georgian)"
                  placeholderEn="Enter description"
                  placeholderKa="შეიყვანეთ აღწერა"
                  rows={3}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
