"use client";

import { Input } from "@/components/ui/input";
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

interface BilingualInputProps {
  control: Control<AttractionFormData>;
  nameEn: FieldPath<AttractionFormData>;
  nameKa: FieldPath<AttractionFormData>;
  labelEn: string;
  labelKa: string;
  placeholderEn: string;
  placeholderKa: string;
}

export function BilingualInput({
  control,
  nameEn,
  nameKa,
  labelEn,
  labelKa,
  placeholderEn,
  placeholderKa,
}: BilingualInputProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name={nameEn}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labelEn}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholderEn}
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
              <Input
                placeholder={placeholderKa}
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
