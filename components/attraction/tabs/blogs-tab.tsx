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

interface BlogsTabProps {
  control: Control<AttractionFormData>;
  blogFields: UseFieldArrayReturn<AttractionFormData, "blogs", "id">["fields"];
  appendBlog: UseFieldArrayReturn<AttractionFormData, "blogs", "id">["append"];
  removeBlog: UseFieldArrayReturn<AttractionFormData, "blogs", "id">["remove"];
}

export function BlogsTab({
  control,
  blogFields,
  appendBlog,
  removeBlog,
}: BlogsTabProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Related Blogs</h2>
          <p className="text-sm text-muted-foreground">
            Add blog posts related to this attraction
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            appendBlog({
              img: "",
              title: { en: "", ka: "" },
              blogText: { en: "", ka: "" },
              desc: { en: "", ka: "" },
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Blog
        </Button>
      </div>

      {blogFields.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">No blogs added yet</p>
            <p className="text-sm text-muted-foreground">
              Click "Add Blog" to get started
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {blogFields.map((field, index) => (
            <Card key={field.id} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Blog {index + 1}</h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeBlog(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>

              <div className="space-y-6">
                <FormField
                  control={control}
                  name={`blogs.${index}.img`}
                  render={({ field }) => (
                    <FormItem>
                      <ImageUpload
                        label="Blog Image"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <BilingualInput
                  control={control}
                  nameEn={`blogs.${index}.title.en`}
                  nameKa={`blogs.${index}.title.ka`}
                  labelEn="Title (English)"
                  labelKa="Title (Georgian)"
                  placeholderEn="Enter title"
                  placeholderKa="შეიყვანეთ სათაური"
                />

                <BilingualTextarea
                  control={control}
                  nameEn={`blogs.${index}.blogText.en`}
                  nameKa={`blogs.${index}.blogText.ka`}
                  labelEn="Blog Text (Optional, English)"
                  labelKa="ბლოგის ტექსტი (ოპციური, ქართულად)"
                  placeholderEn="Optional blog text"
                  placeholderKa="ოპციური ბლოგის ტექსტი"
                  rows={4}
                />

                <BilingualTextarea
                  control={control}
                  nameEn={`blogs.${index}.desc.en`}
                  nameKa={`blogs.${index}.desc.ka`}
                  labelEn="Description (English)"
                  labelKa="Description (Georgian)"
                  placeholderEn="Enter description"
                  placeholderKa="შეიყვანეთ აღწერა"
                  rows={4}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
