"use client";

import { Card } from "@/components/ui/card";
import type { Control } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/modules/image-upload";
import { MapPin } from "lucide-react";
import { AttractionFormData } from "@/lib/schemas/attraction-schema";
import { BilingualInput } from "../bilingual-input";
import { BilingualTextarea } from "../bilingual-textarea";

interface BasicInfoTabProps {
  control: Control<AttractionFormData>;
}

export function BasicInfoTab({ control }: BasicInfoTabProps) {
  return (
    <Card className="p-6 space-y-6">
      <BilingualInput
        control={control}
        nameEn="title.en"
        nameKa="title.ka"
        labelEn="Title (English)"
        labelKa="Title (Georgian)"
        placeholderEn="Enter title"
        placeholderKa="შეიყვანეთ სათაური"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="src"
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
          name="modalSrc"
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
        nameEn="additionalDescription.en"
        nameKa="additionalDescription.ka"
        labelEn="Description (English)"
        labelKa="Description (Georgian)"
        placeholderEn="Enter description"
        placeholderKa="შეიყვანეთ აღწერა"
        rows={4}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4" />
          <span>Location</span>
        </div>
        <BilingualInput
          control={control}
          nameEn="region.en"
          nameKa="region.ka"
          labelEn="Region (English)"
          labelKa="Region (Georgian)"
          placeholderEn="Enter region"
          placeholderKa="შეიყვანეთ რეგიონი"
        />
        <BilingualInput
          control={control}
          nameEn="city.en"
          nameKa="city.ka"
          labelEn="City (English)"
          labelKa="City (Georgian)"
          placeholderEn="Enter city"
          placeholderKa="შეიყვანეთ ქალაქი"
        />
      </div>

      <BilingualInput
        control={control}
        nameEn="description.en"
        nameKa="description.ka"
        labelEn="Short Description (English)"
        labelKa="Short Description (Georgian)"
        placeholderEn="Brief description"
        placeholderKa="მოკლე აღწერა"
      />
    </Card>
  );
}
