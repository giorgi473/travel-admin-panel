"use client";

import { Card } from "@/components/ui/card";
import type { Control } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/modules/image-upload";
import { AttractionFormData } from "@/lib/schemas/attraction-schema";
import { BilingualInput } from "../bilingual-input";
import { BilingualTextarea } from "../bilingual-textarea";

interface DetailsTabProps {
  control: Control<AttractionFormData>;
}

export function DetailsTab({ control }: DetailsTabProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Section 1</h3>
        <BilingualInput
          control={control}
          nameEn="anotherSection.name1.en"
          nameKa="anotherSection.name1.ka"
          labelEn="Name (English)"
          labelKa="Name (Georgian)"
          placeholderEn="Section name"
          placeholderKa="სექციის სახელი"
        />
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description.en"
          nameKa="anotherSection.description.ka"
          labelEn="Description (English)"
          labelKa="Description (Georgian)"
          placeholderEn="Description"
          placeholderKa="აღწერა"
          rows={4}
        />
      </div>

      <div className="border-t pt-6">
        <FormField
          control={control}
          name="anotherSection.image"
          render={({ field }) => (
            <FormItem>
              <ImageUpload
                label="Section Image (Optional)"
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Section 2</h3>
        <BilingualInput
          control={control}
          nameEn="anotherSection.name2.en"
          nameKa="anotherSection.name2.ka"
          labelEn="Name (English)"
          labelKa="Name (Georgian)"
          placeholderEn="Section name"
          placeholderKa="სექციის სახელი"
        />
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description2.en"
          nameKa="anotherSection.description2.ka"
          labelEn="Description (English)"
          labelKa="Description (Georgian)"
          placeholderEn="Description"
          placeholderKa="აღწერა"
          rows={4}
        />
      </div>
    </Card>
  );
}
