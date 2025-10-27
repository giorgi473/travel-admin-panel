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
      {/* Section 1 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Section 1</h3>
        <BilingualInput
          control={control}
          nameEn="anotherSection.name1.en"
          nameKa="anotherSection.name1.ka"
          labelEn="Name 1 (English)"
          labelKa="სახელი 1 (ქართულად)"
          placeholderEn="Where is it located?"
          placeholderKa="სად მდებარეობს?"
        />
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description.en"
          nameKa="anotherSection.description.ka"
          labelEn="Description 1 (English)"
          labelKa="აღწერა 1 (ქართულად)"
          placeholderEn="Description for section 1"
          placeholderKa="აღწერა სექციისთვის 1"
          rows={4}
        />
      </div>

      {/* Image */}
      <div className="border-t pt-6">
        <FormField
          control={control}
          name="anotherSection.image"
          render={({ field }) => (
            <FormItem>
              <ImageUpload
                label="Section Image (Optional)"
                value={field.value || ""}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Section 2 */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Section 2</h3>
        <BilingualInput
          control={control}
          nameEn="anotherSection.name2.en"
          nameKa="anotherSection.name2.ka"
          labelEn="Name 2 (English)"
          labelKa="სახელი 2 (ქართულად)"
          placeholderEn="What to know?"
          placeholderKa="რა უნდა იცოდეთ?"
        />
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description2.en"
          nameKa="anotherSection.description2.ka"
          labelEn="Description 2 (English)"
          labelKa="აღწერა 2 (ქართულად)"
          placeholderEn="Description for section 2"
          placeholderKa="აღწერა სექციისთვის 2"
          rows={4}
        />
      </div>

      {/* Section 3 (optional) */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Section 3 (Optional)</h3>
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description3.en"
          nameKa="anotherSection.description3.ka"
          labelEn="Description 3 (English)"
          labelKa="აღწერა 3 (ქართულად)"
          placeholderEn="Optional description"
          placeholderKa="ოპციური აღწერა"
          rows={4}
        />
      </div>

      {/* Section 4 (optional) */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Section 4 (Optional)</h3>
        <BilingualInput
          control={control}
          nameEn="anotherSection.name4.en"
          nameKa="anotherSection.name4.ka"
          labelEn="Name 4 (English)"
          labelKa="სახელი 4 (ქართულად)"
          placeholderEn="Optional name"
          placeholderKa="ოპციური სახელი"
        />
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description4.en"
          nameKa="anotherSection.description4.ka"
          labelEn="Description 4 (English)"
          labelKa="აღწერა 4 (ქართულად)"
          placeholderEn="Optional description"
          placeholderKa="ოპციური აღწერა"
          rows={4}
        />
      </div>

      {/* Section 5 (optional) */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Section 5 (Optional)</h3>
        <BilingualInput
          control={control}
          nameEn="anotherSection.name5.en"
          nameKa="anotherSection.name5.ka"
          labelEn="Name 5 (English)"
          labelKa="სახელი 5 (ქართულად)"
          placeholderEn="Optional name"
          placeholderKa="ოპციური სახელი"
        />
        <BilingualTextarea
          control={control}
          nameEn="anotherSection.description5.en"
          nameKa="anotherSection.description5.ka"
          labelEn="Description 5 (English)"
          labelKa="აღწერა 5 (ქართულად)"
          placeholderEn="Optional description"
          placeholderKa="ოპციური აღწერა"
          rows={4}
        />
      </div>
    </Card>
  );
}
