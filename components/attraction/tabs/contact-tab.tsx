"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control } from "react-hook-form";
import { MapPin, Phone, Globe } from "lucide-react";
import { AttractionFormData } from "@/lib/schemas/attraction-schema";
import { BilingualInput } from "../bilingual-input";
import { WorkingHoursSection } from "../working-hours-section";

interface ContactTabProps {
  control: Control<AttractionFormData>;
}

export function ContactTab({ control }: ContactTabProps) {
  return (
    <Card className="p-6 space-y-6">
      <BilingualInput
        control={control}
        nameEn="name.en"
        nameKa="name.ka"
        labelEn="Name (English)"
        labelKa="Name (Georgian)"
        placeholderEn="Enter name"
        placeholderKa="შეიყვანეთ სახელი"
      />

      <div className="space-y-4">
        <FormField
          control={control}
          name="address"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <WorkingHoursSection control={control} />
    </Card>
  );
}
