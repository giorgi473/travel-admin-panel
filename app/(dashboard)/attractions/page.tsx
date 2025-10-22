// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Form } from "@/components/ui/form";
// import {
//   attractionSchema,
//   type AttractionFormData,
// } from "@/lib/schemas/attraction-schema";
// import { BasicInfoTab } from "@/components/attraction/tabs/basic-info-tab";
// import { ContactTab } from "@/components/attraction/tabs/contact-tab";
// import { DetailsTab } from "@/components/attraction/tabs/details-tab";
// import { SlideCardTab } from "@/components/attraction/tabs/slidecard-tab";
// import { BlogsTab } from "@/components/attraction/tabs/blogs-tab";

// export default function CreateAttractionPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<AttractionFormData>({
//     resolver: zodResolver(attractionSchema),
//     defaultValues: {
//       title: { en: "", ka: "" },
//       src: "",
//       modalSrc: "",
//       additionalDescription: { en: "", ka: "" },
//       region: { en: "", ka: "" },
//       city: { en: "", ka: "" },
//       description: { en: "", ka: "" },
//       name: { en: "", ka: "" },
//       address: "",
//       phone: "",
//       website: "",
//       workingHours: {
//         Monday: "",
//         Tuesday: "",
//         Wednesday: "",
//         Thursday: "",
//         Friday: "",
//         Saturday: "",
//         Sunday: "",
//       },
//       anotherSection: {
//         image: "",
//         name1: { en: "", ka: "" },
//         name2: { en: "", ka: "" },
//         name4: { en: "", ka: "" },
//         name5: { en: "", ka: "" },
//         description: { en: "", ka: "" },
//         description2: { en: "", ka: "" },
//         description3: { en: "", ka: "" },
//         description4: { en: "", ka: "" },
//         description5: { en: "", ka: "" },
//       },
//       slideCard: [],
//       blogs: [],
//     },
//   });

//   const {
//     fields: slideCardFields,
//     append: appendSlideCard,
//     remove: removeSlideCard,
//   } = useFieldArray({
//     control: form.control,
//     name: "slideCard",
//   });

//   const {
//     fields: blogFields,
//     append: appendBlog,
//     remove: removeBlog,
//   } = useFieldArray({
//     control: form.control,
//     name: "blogs",
//   });

//   const onSubmit = async (data: AttractionFormData) => {
//     setIsSubmitting(true);
//     try {
//       console.log("[v0] Form data:", data);
//       // await createAttraction(data); // აქ დაამატე ბაზის API კოლი
//       form.reset();
//     } catch (error) {
//       console.error("[v0] Error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="mx-auto p-4 space-y-8">
//         <div className="space-y-2">
//           <h1 className="text-4xl font-bold tracking-tight">
//             Create Attraction
//           </h1>
//           <p className="text-muted-foreground">
//             Add a new attraction with bilingual support
//           </p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <Tabs defaultValue="basic" className="w-full">
//               <TabsList className="grid w-full grid-cols-5 h-auto">
//                 <TabsTrigger value="basic" className="text-sm">
//                   Basic
//                 </TabsTrigger>
//                 <TabsTrigger value="contact" className="text-sm">
//                   Contact
//                 </TabsTrigger>
//                 <TabsTrigger value="details" className="text-sm">
//                   Details
//                 </TabsTrigger>
//                 <TabsTrigger value="slidecard" className="text-sm">
//                   Places
//                 </TabsTrigger>
//                 <TabsTrigger value="blogs" className="text-sm">
//                   Blogs
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="basic" className="space-y-6 mt-6">
//                 <BasicInfoTab control={form.control} />
//               </TabsContent>

//               <TabsContent value="contact" className="space-y-6 mt-6">
//                 <ContactTab control={form.control} />
//               </TabsContent>

//               <TabsContent value="details" className="space-y-6 mt-6">
//                 <DetailsTab control={form.control} />
//               </TabsContent>

//               <TabsContent value="slidecard" className="space-y-6 mt-6">
//                 <SlideCardTab
//                   control={form.control}
//                   slideCardFields={slideCardFields}
//                   appendSlideCard={appendSlideCard}
//                   removeSlideCard={removeSlideCard}
//                 />
//               </TabsContent>

//               <TabsContent value="blogs" className="space-y-6 mt-6">
//                 <BlogsTab
//                   control={form.control}
//                   blogFields={blogFields}
//                   appendBlog={appendBlog}
//                   removeBlog={removeBlog}
//                 />
//               </TabsContent>
//             </Tabs>

//             <div className="flex items-center justify-end gap-4 pt-6 border-t">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => form.reset()}
//                 disabled={isSubmitting}
//               >
//                 Reset Form
//               </Button>
//               <Button type="submit" disabled={isSubmitting} size="lg">
//                 {isSubmitting ? "Creating..." : "Create Attraction"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import {
  attractionSchema,
  type AttractionFormData,
} from "@/lib/schemas/attraction-schema";
import { BasicInfoTab } from "@/components/attraction/tabs/basic-info-tab";
import { ContactTab } from "@/components/attraction/tabs/contact-tab";
import { DetailsTab } from "@/components/attraction/tabs/details-tab";
import { SlideCardTab } from "@/components/attraction/tabs/slidecard-tab";
import { BlogsTab } from "@/components/attraction/tabs/blogs-tab";

export default function CreateAttractionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AttractionFormData>({
    resolver: zodResolver(attractionSchema),
    mode: "onSubmit",
    defaultValues: {
      title: { en: "", ka: "" },
      src: "",
      modalSrc: "",
      additionalDescription: { en: "", ka: "" },
      region: { en: "", ka: "" },
      city: { en: "", ka: "" },
      description: { en: "", ka: "" },
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
      anotherSection: {
        image: "",
        name1: { en: "", ka: "" },
        name2: { en: "", ka: "" },
        name4: { en: "", ka: "" },
        name5: { en: "", ka: "" },
        description: { en: "", ka: "" },
        description2: { en: "", ka: "" },
        description3: { en: "", ka: "" },
        description4: { en: "", ka: "" },
        description5: { en: "", ka: "" },
      },
      slideCard: [],
      blogs: [],
    },
  });

  const {
    fields: slideCardFields,
    append: appendSlideCard,
    remove: removeSlideCard,
  } = useFieldArray({
    control: form.control,
    name: "slideCard",
  });

  const {
    fields: blogFields,
    append: appendBlog,
    remove: removeBlog,
  } = useFieldArray({
    control: form.control,
    name: "blogs",
  });

  const onSubmit = async (data: AttractionFormData) => {
    setIsSubmitting(true);
    try {
      // Backend URL – შეცვალე თუ backend ცალკეა (მაგ. http://localhost:3001/api/slider/destination)
      const response = await fetch(
        "https://nest-travel-api.vercel.app/api/v1/slider/destination",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("[Frontend] Created successfully:", result);
      form.reset();
      alert("Attraction შექმნილია წარმატებით!");
    } catch (error: any) {
      console.error("[Frontend] Error:", error);
      alert("შეცდომა მონაცემების შენახვისას: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto p-4 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Create Attraction
          </h1>
          <p className="text-muted-foreground">
            Add a new attraction with bilingual support
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-auto">
                <TabsTrigger value="basic" className="text-sm">
                  Basic
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-sm">
                  Contact
                </TabsTrigger>
                <TabsTrigger value="details" className="text-sm">
                  Details
                </TabsTrigger>
                <TabsTrigger value="slidecard" className="text-sm">
                  Places
                </TabsTrigger>
                <TabsTrigger value="blogs" className="text-sm">
                  Blogs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <BasicInfoTab control={form.control} />
              </TabsContent>

              <TabsContent value="contact" className="space-y-6 mt-6">
                <ContactTab control={form.control} />
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-6">
                <DetailsTab control={form.control} />
              </TabsContent>

              <TabsContent value="slidecard" className="space-y-6 mt-6">
                <SlideCardTab
                  control={form.control}
                  slideCardFields={slideCardFields}
                  appendSlideCard={appendSlideCard}
                  removeSlideCard={removeSlideCard}
                />
              </TabsContent>

              <TabsContent value="blogs" className="space-y-6 mt-6">
                <BlogsTab
                  control={form.control}
                  blogFields={blogFields}
                  appendBlog={appendBlog}
                  removeBlog={removeBlog}
                />
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
              >
                Reset Form
              </Button>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? "Creating..." : "Create Attraction"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
