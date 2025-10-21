"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldPath } from "react-hook-form";
import type { AttractionFormData } from "@/lib/schemas/attraction-schema";
import {
  transliterateToGeorgian,
  transliterateToEnglish,
} from "@/lib/transliteration";

interface BilingualTextareaProps {
  control: Control<AttractionFormData>;
  nameEn: FieldPath<AttractionFormData>;
  nameKa: FieldPath<AttractionFormData>;
  labelEn: string;
  labelKa: string;
  placeholderEn: string;
  placeholderKa: string;
  rows?: number;
}

export function BilingualTextarea({
  control,
  nameEn,
  nameKa,
  labelEn,
  labelKa,
  placeholderEn,
  placeholderKa,
  rows = 4,
}: BilingualTextareaProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name={nameEn}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labelEn}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholderEn}
                rows={rows}
                value={(field.value as string) || ""}
                onChange={(e) => {
                  const transliterated = transliterateToEnglish(e.target.value);
                  field.onChange(transliterated);
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={nameKa}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labelKa}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholderKa}
                rows={rows}
                value={(field.value as string) || ""}
                onChange={(e) => {
                  const transliterated = transliterateToGeorgian(
                    e.target.value
                  );
                  field.onChange(transliterated);
                }}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
