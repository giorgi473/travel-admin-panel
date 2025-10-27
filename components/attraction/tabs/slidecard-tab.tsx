// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import type { Control, UseFieldArrayReturn } from "react-hook-form";
// import { FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { ImageUpload } from "@/components/modules/image-upload";
// import { Plus, Trash2 } from "lucide-react";
// import { AttractionFormData } from "@/lib/schemas/attraction-schema";
// import { BilingualInput } from "../bilingual-input";
// import { BilingualTextarea } from "../bilingual-textarea";
// import { WorkingHoursSection } from "../working-hours-section";
// import { Input } from "@/components/ui/input";
// import { FormControl, FormLabel } from "@/components/ui/form";
// import { MapPin, Phone, Globe } from "lucide-react";

// interface SlideCardTabProps {
//   control: Control<AttractionFormData>;
//   slideCardFields: UseFieldArrayReturn<
//     AttractionFormData,
//     "slideCard",
//     "id"
//   >["fields"];
//   appendSlideCard: UseFieldArrayReturn<
//     AttractionFormData,
//     "slideCard",
//     "id"
//   >["append"];
//   removeSlideCard: UseFieldArrayReturn<
//     AttractionFormData,
//     "slideCard",
//     "id"
//   >["remove"];
// }

// export function SlideCardTab({
//   control,
//   slideCardFields,
//   appendSlideCard,
//   removeSlideCard,
// }: SlideCardTabProps) {
//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-semibold">Related Places</h2>
//           <p className="text-sm text-muted-foreground">
//             Add related attractions and places
//           </p>
//         </div>
//         <Button
//           type="button"
//           onClick={() =>
//             appendSlideCard({
//               title: { en: "", ka: "" },
//               src: "",
//               modalSrc: "",
//               additionalDescription: { en: "", ka: "" },
//               text: { en: "", ka: "" },
//               region: { en: "", ka: "" },
//               city: { en: "", ka: "" },
//               name: { en: "", ka: "" },
//               address: "",
//               phone: "",
//               website: "",
//               workingHours: {
//                 Monday: "",
//                 Tuesday: "",
//                 Wednesday: "",
//                 Thursday: "",
//                 Friday: "",
//                 Saturday: "",
//                 Sunday: "",
//               },
//             })
//           }
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Place
//         </Button>
//       </div>

//       {slideCardFields.length === 0 ? (
//         <Card className="p-12">
//           <div className="text-center space-y-2">
//             <p className="text-muted-foreground">No places added yet</p>
//             <p className="text-sm text-muted-foreground">
//               Click "Add Place" to get started
//             </p>
//           </div>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {slideCardFields.map((field, index) => (
//             <Card key={field.id} className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold">Place {index + 1}</h3>
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => removeSlideCard(index)}
//                 >
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Remove
//                 </Button>
//               </div>

//               <div className="space-y-6">
//                 {/* Title */}
//                 <BilingualInput
//                   control={control}
//                   nameEn={`slideCard.${index}.title.en`}
//                   nameKa={`slideCard.${index}.title.ka`}
//                   labelEn="Title (English)"
//                   labelKa="Title (Georgian)"
//                   placeholderEn="Enter title"
//                   placeholderKa="შეიყვანეთ სათაური"
//                 />

//                 {/* Images */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <FormField
//                     control={control}
//                     name={`slideCard.${index}.src`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <ImageUpload
//                           label="Main Image"
//                           value={field.value}
//                           onChange={field.onChange}
//                         />
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={control}
//                     name={`slideCard.${index}.modalSrc`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <ImageUpload
//                           label="Modal Image"
//                           value={field.value}
//                           onChange={field.onChange}
//                         />
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* Additional Description */}
//                 <BilingualTextarea
//                   control={control}
//                   nameEn={`slideCard.${index}.additionalDescription.en`}
//                   nameKa={`slideCard.${index}.additionalDescription.ka`}
//                   labelEn="Additional Description (English)"
//                   labelKa="დამატებითი აღწერა (ქართულად)"
//                   placeholderEn="Enter additional description"
//                   placeholderKa="შეიყვანეთ დამატებითი აღწერა"
//                   rows={3}
//                 />

//                 {/* Text (optional) */}
//                 <BilingualTextarea
//                   control={control}
//                   nameEn={`slideCard.${index}.text.en`}
//                   nameKa={`slideCard.${index}.text.ka`}
//                   labelEn="Text (Optional, English)"
//                   labelKa="ტექსტი (ოპციური, ქართულად)"
//                   placeholderEn="Optional text"
//                   placeholderKa="ოპციური ტექსტი"
//                   rows={2}
//                 />

//                 {/* Location */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2 text-sm font-medium">
//                     <MapPin className="w-4 h-4" />
//                     <span>Location</span>
//                   </div>
//                   <BilingualInput
//                     control={control}
//                     nameEn={`slideCard.${index}.region.en`}
//                     nameKa={`slideCard.${index}.region.ka`}
//                     labelEn="Region (English)"
//                     labelKa="რეგიონი (ქართულად)"
//                     placeholderEn="Enter region"
//                     placeholderKa="შეიყვანეთ რეგიონი"
//                   />
//                   <BilingualInput
//                     control={control}
//                     nameEn={`slideCard.${index}.city.en`}
//                     nameKa={`slideCard.${index}.city.ka`}
//                     labelEn="City (English)"
//                     labelKa="ქალაქი (ქართულად)"
//                     placeholderEn="Enter city"
//                     placeholderKa="შეიყვანეთ ქალაქი"
//                   />
//                 </div>

//                 {/* Name */}
//                 <BilingualInput
//                   control={control}
//                   nameEn={`slideCard.${index}.name.en`}
//                   nameKa={`slideCard.${index}.name.ka`}
//                   labelEn="Name (English)"
//                   labelKa="სახელი (ქართულად)"
//                   placeholderEn="Enter name"
//                   placeholderKa="შეიყვანეთ სახელი"
//                 />

//                 {/* Contact */}
//                 <div className="space-y-4">
//                   <FormField
//                     control={control}
//                     name={`slideCard.${index}.address`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2">
//                           <MapPin className="w-4 h-4" />
//                           Address
//                         </FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="Enter full address" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <FormField
//                       control={control}
//                       name={`slideCard.${index}.phone`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="flex items-center gap-2">
//                             <Phone className="w-4 h-4" />
//                             Phone (Optional)
//                           </FormLabel>
//                           <FormControl>
//                             <Input {...field} placeholder="+995 XXX XXX XXX" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={control}
//                       name={`slideCard.${index}.website`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="flex items-center gap-2">
//                             <Globe className="w-4 h-4" />
//                             Website (Optional)
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder="https://example.com"
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>

//                 {/* Working Hours (optional) */}
//                 <WorkingHoursSection
//                   control={control}
//                   baseName={`slideCard.${index}.workingHours`}
//                 />
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// ---------------------------------------------------------------------------------

// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import type { Control, UseFieldArrayReturn } from "react-hook-form";
// import { FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { ImageUpload } from "@/components/modules/image-upload";
// import { Plus, Trash2 } from "lucide-react";
// import type { AttractionFormData } from "@/lib/schemas/attraction-schema";
// import { BilingualInput } from "../bilingual-input";
// import { BilingualTextarea } from "../bilingual-textarea";
// import { WorkingHoursSection } from "../working-hours-section";
// import { Input } from "@/components/ui/input";
// import { FormControl, FormLabel } from "@/components/ui/form";
// import { MapPin, Phone, Globe } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { useFieldArray } from "react-hook-form";

// interface SlideCardTabProps {
//   control: Control<AttractionFormData>;
//   slideCardFields: UseFieldArrayReturn<
//     AttractionFormData,
//     "slideCard",
//     "id"
//   >["fields"];
//   appendSlideCard: UseFieldArrayReturn<
//     AttractionFormData,
//     "slideCard",
//     "id"
//   >["append"];
//   removeSlideCard: UseFieldArrayReturn<
//     AttractionFormData,
//     "slideCard",
//     "id"
//   >["remove"];
// }

// function SlideCardItem({
//   control,
//   index,
//   onRemove,
// }: {
//   control: Control<AttractionFormData>;
//   index: number;
//   onRemove: () => void;
// }) {
//   const {
//     fields: blogFields,
//     append: appendBlog,
//     remove: removeBlog,
//   } = useFieldArray({
//     control,
//     name: `slideCard.${index}.blogs`,
//   });

//   return (
//     <Card className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-semibold">Place {index + 1}</h3>
//         <Button
//           type="button"
//           variant="destructive"
//           size="sm"
//           onClick={onRemove}
//         >
//           <Trash2 className="w-4 h-4 mr-2" />
//           Remove
//         </Button>
//       </div>

//       <div className="space-y-6">
//         {/* Basic Information Section */}
//         <div>
//           <h4 className="text-md font-semibold mb-4">Basic Information</h4>

//           {/* Title */}
//           <BilingualInput
//             control={control}
//             nameEn={`slideCard.${index}.title.en`}
//             nameKa={`slideCard.${index}.title.ka`}
//             labelEn="Title (English)"
//             labelKa="Title (Georgian)"
//             placeholderEn="Enter title"
//             placeholderKa="შეიყვანეთ სათაური"
//           />

//           {/* Images */}
//           <div className="grid md:grid-cols-2 gap-6 mt-6">
//             <FormField
//               control={control}
//               name={`slideCard.${index}.src`}
//               render={({ field }) => (
//                 <FormItem>
//                   <ImageUpload
//                     label="Main Image"
//                     value={field.value}
//                     onChange={field.onChange}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={control}
//               name={`slideCard.${index}.modalSrc`}
//               render={({ field }) => (
//                 <FormItem>
//                   <ImageUpload
//                     label="Modal Image"
//                     value={field.value}
//                     onChange={field.onChange}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Additional Description */}
//           <div className="mt-6">
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.additionalDescription.en`}
//               nameKa={`slideCard.${index}.additionalDescription.ka`}
//               labelEn="Additional Description (English)"
//               labelKa="დამატებითი აღწერა (ქართულად)"
//               placeholderEn="Enter additional description"
//               placeholderKa="შეიყვანეთ დამატებითი აღწერა"
//               rows={3}
//             />
//           </div>

//           {/* Text (optional) */}
//           <div className="mt-6">
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.text.en`}
//               nameKa={`slideCard.${index}.text.ka`}
//               labelEn="Text (Optional, English)"
//               labelKa="ტექსტი (ოპციური, ქართულად)"
//               placeholderEn="Optional text"
//               placeholderKa="ოპციური ტექსტი"
//               rows={2}
//             />
//           </div>

//           {/* Location */}
//           <div className="space-y-4 mt-6">
//             <div className="flex items-center gap-2 text-sm font-medium">
//               <MapPin className="w-4 h-4" />
//               <span>Location</span>
//             </div>
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.region.en`}
//               nameKa={`slideCard.${index}.region.ka`}
//               labelEn="Region (English)"
//               labelKa="რეგიონი (ქართულად)"
//               placeholderEn="Enter region"
//               placeholderKa="შეიყვანეთ რეგიონი"
//             />
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.city.en`}
//               nameKa={`slideCard.${index}.city.ka`}
//               labelEn="City (English)"
//               labelKa="ქალაქი (ქართულად)"
//               placeholderEn="Enter city"
//               placeholderKa="შეიყვანეთ ქალაქი"
//             />
//           </div>

//           {/* Name */}
//           <div className="mt-6">
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.name.en`}
//               nameKa={`slideCard.${index}.name.ka`}
//               labelEn="Name (English)"
//               labelKa="სახელი (ქართულად)"
//               placeholderEn="Enter name"
//               placeholderKa="შეიყვანეთ სახელი"
//             />
//           </div>

//           {/* Contact */}
//           <div className="space-y-4 mt-6">
//             <FormField
//               control={control}
//               name={`slideCard.${index}.address`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4" />
//                     Address
//                   </FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="Enter full address" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={control}
//                 name={`slideCard.${index}.phone`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="flex items-center gap-2">
//                       <Phone className="w-4 h-4" />
//                       Phone (Optional)
//                     </FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="+995 XXX XXX XXX" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={control}
//                 name={`slideCard.${index}.website`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="flex items-center gap-2">
//                       <Globe className="w-4 h-4" />
//                       Website (Optional)
//                     </FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="https://example.com" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           {/* Working Hours */}
//           <div className="mt-6">
//             <WorkingHoursSection
//               control={control}
//               baseName={`slideCard.${index}.workingHours`}
//             />
//           </div>
//         </div>

//         <Separator className="my-8" />

//         {/* Another Section */}
//         <div>
//           <h4 className="text-md font-semibold mb-4">Additional Details</h4>

//           {/* Section 1 */}
//           <div className="space-y-4">
//             <h5 className="text-sm font-medium text-muted-foreground">
//               Section 1
//             </h5>
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.name1.en`}
//               nameKa={`slideCard.${index}.anotherSection.name1.ka`}
//               labelEn="Name 1 (English)"
//               labelKa="სახელი 1 (ქართულად)"
//               placeholderEn="Where is it located?"
//               placeholderKa="სად მდებარეობს?"
//             />
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.description.en`}
//               nameKa={`slideCard.${index}.anotherSection.description.ka`}
//               labelEn="Description 1 (English)"
//               labelKa="აღწერა 1 (ქართულად)"
//               placeholderEn="Description for section 1"
//               placeholderKa="აღწერა სექციისთვის 1"
//               rows={4}
//             />
//           </div>

//           {/* Image */}
//           <div className="border-t pt-6 mt-6">
//             <FormField
//               control={control}
//               name={`slideCard.${index}.anotherSection.image`}
//               render={({ field }) => (
//                 <FormItem>
//                   <ImageUpload
//                     label="Section Image (Optional)"
//                     value={field.value || ""}
//                     onChange={field.onChange}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Section 2 */}
//           <div className="space-y-4 border-t pt-6 mt-6">
//             <h5 className="text-sm font-medium text-muted-foreground">
//               Section 2
//             </h5>
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.name2.en`}
//               nameKa={`slideCard.${index}.anotherSection.name2.ka`}
//               labelEn="Name 2 (English)"
//               labelKa="სახელი 2 (ქართულად)"
//               placeholderEn="What to know?"
//               placeholderKa="რა უნდა იცოდეთ?"
//             />
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.description2.en`}
//               nameKa={`slideCard.${index}.anotherSection.description2.ka`}
//               labelEn="Description 2 (English)"
//               labelKa="აღწერა 2 (ქართულად)"
//               placeholderEn="Description for section 2"
//               placeholderKa="აღწერა სექციისთვის 2"
//               rows={4}
//             />
//           </div>

//           {/* Section 3 (optional) */}
//           <div className="space-y-4 border-t pt-6 mt-6">
//             <h5 className="text-sm font-medium text-muted-foreground">
//               Section 3 (Optional)
//             </h5>
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.description3.en`}
//               nameKa={`slideCard.${index}.anotherSection.description3.ka`}
//               labelEn="Description 3 (English)"
//               labelKa="აღწერა 3 (ქართულად)"
//               placeholderEn="Optional description"
//               placeholderKa="ოპციური აღწერა"
//               rows={4}
//             />
//           </div>

//           {/* Section 4 (optional) */}
//           <div className="space-y-4 border-t pt-6 mt-6">
//             <h5 className="text-sm font-medium text-muted-foreground">
//               Section 4 (Optional)
//             </h5>
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.name4.en`}
//               nameKa={`slideCard.${index}.anotherSection.name4.ka`}
//               labelEn="Name 4 (English)"
//               labelKa="სახელი 4 (ქართულად)"
//               placeholderEn="Optional name"
//               placeholderKa="ოპციური სახელი"
//             />
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.description4.en`}
//               nameKa={`slideCard.${index}.anotherSection.description4.ka`}
//               labelEn="Description 4 (English)"
//               labelKa="აღწერა 4 (ქართულად)"
//               placeholderEn="Optional description"
//               placeholderKa="ოპციური აღწერა"
//               rows={4}
//             />
//           </div>

//           {/* Section 5 (optional) */}
//           <div className="space-y-4 border-t pt-6 mt-6">
//             <h5 className="text-sm font-medium text-muted-foreground">
//               Section 5 (Optional)
//             </h5>
//             <BilingualInput
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.name5.en`}
//               nameKa={`slideCard.${index}.anotherSection.name5.ka`}
//               labelEn="Name 5 (English)"
//               labelKa="სახელი 5 (ქართულად)"
//               placeholderEn="Optional name"
//               placeholderKa="ოპციური სახელი"
//             />
//             <BilingualTextarea
//               control={control}
//               nameEn={`slideCard.${index}.anotherSection.description5.en`}
//               nameKa={`slideCard.${index}.anotherSection.description5.ka`}
//               labelEn="Description 5 (English)"
//               labelKa="აღწერა 5 (ქართულად)"
//               placeholderEn="Optional description"
//               placeholderKa="ოპციური აღწერა"
//               rows={4}
//             />
//           </div>
//         </div>

//         <Separator className="my-8" />

//         {/* Blogs Section */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h4 className="text-md font-semibold">Related Blogs</h4>
//               <p className="text-xs text-muted-foreground">
//                 Add blog posts for this place
//               </p>
//             </div>
//             <Button
//               type="button"
//               size="sm"
//               onClick={() =>
//                 appendBlog({
//                   img: "",
//                   title: { en: "", ka: "" },
//                   blogText: { en: "", ka: "" },
//                   desc: { en: "", ka: "" },
//                 })
//               }
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Blog
//             </Button>
//           </div>

//           {blogFields.length === 0 ? (
//             <Card className="p-8 bg-muted/30">
//               <div className="text-center space-y-1">
//                 <p className="text-sm text-muted-foreground">No blogs added</p>
//                 <p className="text-xs text-muted-foreground">
//                   Click "Add Blog" to get started
//                 </p>
//               </div>
//             </Card>
//           ) : (
//             <div className="space-y-4">
//               {blogFields.map((blogField, blogIndex) => (
//                 <Card key={blogField.id} className="p-4 bg-muted/30">
//                   <div className="flex items-center justify-between mb-4">
//                     <h5 className="text-sm font-medium">
//                       Blog {blogIndex + 1}
//                     </h5>
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => removeBlog(blogIndex)}
//                     >
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       Remove
//                     </Button>
//                   </div>

//                   <div className="space-y-4">
//                     <FormField
//                       control={control}
//                       name={`slideCard.${index}.blogs.${blogIndex}.img`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <ImageUpload
//                             label="Blog Image"
//                             value={field.value as string}
//                             onChange={field.onChange}
//                           />
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <BilingualInput
//                       control={control}
//                       nameEn={`slideCard.${index}.blogs.${blogIndex}.title.en`}
//                       nameKa={`slideCard.${index}.blogs.${blogIndex}.title.ka`}
//                       labelEn="Title (English)"
//                       labelKa="Title (Georgian)"
//                       placeholderEn="Enter title"
//                       placeholderKa="შეიყვანეთ სათაური"
//                     />

//                     <BilingualTextarea
//                       control={control}
//                       nameEn={`slideCard.${index}.blogs.${blogIndex}.blogText.en`}
//                       nameKa={`slideCard.${index}.blogs.${blogIndex}.blogText.ka`}
//                       labelEn="Blog Text (Optional, English)"
//                       labelKa="ბლოგის ტექსტი (ოპციური, ქართულად)"
//                       placeholderEn="Optional blog text"
//                       placeholderKa="ოპციური ბლოგის ტექსტი"
//                       rows={3}
//                     />

//                     <BilingualTextarea
//                       control={control}
//                       nameEn={`slideCard.${index}.blogs.${blogIndex}.desc.en`}
//                       nameKa={`slideCard.${index}.blogs.${blogIndex}.desc.ka`}
//                       labelEn="Description (English)"
//                       labelKa="Description (Georgian)"
//                       placeholderEn="Enter description"
//                       placeholderKa="შეიყვანეთ აღწერა"
//                       rows={3}
//                     />
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }

// export function SlideCardTab({
//   control,
//   slideCardFields,
//   appendSlideCard,
//   removeSlideCard,
// }: SlideCardTabProps) {
//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-semibold">Related Places</h2>
//           <p className="text-sm text-muted-foreground">
//             Add related attractions and places
//           </p>
//         </div>
//         <Button
//           type="button"
//           onClick={() =>
//             appendSlideCard({
//               title: { en: "", ka: "" },
//               src: "",
//               modalSrc: "",
//               additionalDescription: { en: "", ka: "" },
//               text: { en: "", ka: "" },
//               region: { en: "", ka: "" },
//               city: { en: "", ka: "" },
//               name: { en: "", ka: "" },
//               address: "",
//               phone: "",
//               website: "",
//               workingHours: {
//                 Monday: "",
//                 Tuesday: "",
//                 Wednesday: "",
//                 Thursday: "",
//                 Friday: "",
//                 Saturday: "",
//                 Sunday: "",
//               },
//               anotherSection: {
//                 image: "",
//                 name1: { en: "", ka: "" },
//                 description: { en: "", ka: "" },
//                 name2: { en: "", ka: "" },
//                 description2: { en: "", ka: "" },
//                 description3: { en: "", ka: "" },
//                 name4: { en: "", ka: "" },
//                 name5: { en: "", ka: "" },
//                 description4: { en: "", ka: "" },
//                 description5: { en: "", ka: "" },
//               },
//               blogs: [],
//             })
//           }
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Place
//         </Button>
//       </div>

//       {slideCardFields.length === 0 ? (
//         <Card className="p-12">
//           <div className="text-center space-y-2">
//             <p className="text-muted-foreground">No places added yet</p>
//             <p className="text-sm text-muted-foreground">
//               Click "Add Place" to get started
//             </p>
//           </div>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {slideCardFields.map((field, index) => (
//             <SlideCardItem
//               key={field.id}
//               control={control}
//               index={index}
//               onRemove={() => removeSlideCard(index)}
//             />
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// -----------------------------

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Control, UseFieldArrayReturn, FieldPath } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/modules/image-upload";
import { Plus, Trash2 } from "lucide-react";
import type { AttractionFormData } from "@/lib/schemas/attraction-schema";
import { BilingualInput } from "../bilingual-input";
import { BilingualTextarea } from "../bilingual-textarea";
import { WorkingHoursSection } from "../working-hours-section";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel } from "@/components/ui/form";
import { MapPin, Phone, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useFieldArray } from "react-hook-form";

interface SlideCardItemProps {
  control: Control<AttractionFormData>;
  baseName: string;
  displayIndex: number;
  onRemove: () => void;
}

function SlideCardItem({
  control,
  baseName,
  displayIndex,
  onRemove,
}: SlideCardItemProps) {
  const {
    fields: blogFields,
    append: appendBlog,
    remove: removeBlog,
  } = useFieldArray({
    control,
    name: `${baseName}.blogs` as "slideCard.0.blogs" | any, // Improved typing, but dynamic
  });

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: `${baseName}.childSlideCards` as "slideCard.0.childSlideCards" | any,
  });

  const defaultSlideCard = {
    title: { en: "", ka: "" },
    src: "",
    modalSrc: "",
    additionalDescription: { en: "", ka: "" },
    text: { en: "", ka: "" },
    region: { en: "", ka: "" },
    city: { en: "", ka: "" },
    name: { en: "", ka: "" } as const, // Added as const for better inference
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
      name1: { en: "", ka: "" } as const,
      name2: { en: "", ka: "" } as const,
      name4: { en: "", ka: "" } as const,
      name5: { en: "", ka: "" } as const,
      description: { en: "", ka: "" } as const,
      description2: { en: "", ka: "" } as const,
      description3: { en: "", ka: "" } as const,
      description4: { en: "", ka: "" } as const,
      description5: { en: "", ka: "" } as const,
    },
    blogs: [],
    childSlideCards: [],
  } as const;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Place {displayIndex + 1}</h3>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove
        </Button>
      </div>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <div>
          <h4 className="text-md font-semibold mb-4">Basic Information</h4>

          {/* Title */}
          <BilingualInput
            control={control}
            nameEn={`${baseName}.title.en` as FieldPath<AttractionFormData>}
            nameKa={`${baseName}.title.ka` as FieldPath<AttractionFormData>}
            labelEn="Title (English)"
            labelKa="Title (Georgian)"
            placeholderEn="Enter title"
            placeholderKa="შეიყვანეთ სათაური"
          />

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <FormField
              control={control}
              name={`${baseName}.src` as FieldPath<AttractionFormData>}
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
              name={`${baseName}.modalSrc` as FieldPath<AttractionFormData>}
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
          <div className="mt-6">
            <BilingualTextarea
              control={control}
              nameEn={
                `${baseName}.additionalDescription.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.additionalDescription.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Additional Description (English)"
              labelKa="დამატებითი აღწერა (ქართულად)"
              placeholderEn="Enter additional description"
              placeholderKa="შეიყვანეთ დამატებითი აღწერა"
              rows={3}
            />
          </div>

          {/* Text (optional) */}
          <div className="mt-6">
            <BilingualTextarea
              control={control}
              nameEn={`${baseName}.text.en` as FieldPath<AttractionFormData>}
              nameKa={`${baseName}.text.ka` as FieldPath<AttractionFormData>}
              labelEn="Text (Optional, English)"
              labelKa="ტექსტი (ოპციური, ქართულად)"
              placeholderEn="Optional text"
              placeholderKa="ოპციური ტექსტი"
              rows={2}
            />
          </div>

          {/* Location */}
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <BilingualInput
              control={control}
              nameEn={`${baseName}.region.en` as FieldPath<AttractionFormData>}
              nameKa={`${baseName}.region.ka` as FieldPath<AttractionFormData>}
              labelEn="Region (English)"
              labelKa="რეგიონი (ქართულად)"
              placeholderEn="Enter region"
              placeholderKa="შეიყვანეთ რეგიონი"
            />
            <BilingualInput
              control={control}
              nameEn={`${baseName}.city.en` as FieldPath<AttractionFormData>}
              nameKa={`${baseName}.city.ka` as FieldPath<AttractionFormData>}
              labelEn="City (English)"
              labelKa="ქალაქი (ქართულად)"
              placeholderEn="Enter city"
              placeholderKa="შეიყვანეთ ქალაქი"
            />
          </div>

          {/* Name */}
          <div className="mt-6">
            <BilingualInput
              control={control}
              nameEn={`${baseName}.name.en` as FieldPath<AttractionFormData>}
              nameKa={`${baseName}.name.ka` as FieldPath<AttractionFormData>}
              labelEn="Name (English)"
              labelKa="სახელი (ქართულად)"
              placeholderEn="Enter name"
              placeholderKa="შეიყვანეთ სახელი"
            />
          </div>

          {/* Contact */}
          <div className="space-y-4 mt-6">
            <FormField
              control={control}
              name={`${baseName}.address` as FieldPath<AttractionFormData>}
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
                name={`${baseName}.phone` as FieldPath<AttractionFormData>}
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
                name={`${baseName}.website` as FieldPath<AttractionFormData>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website (Optional)
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

          {/* Working Hours */}
          <div className="mt-6">
            <WorkingHoursSection
              control={control}
              baseName={`${baseName}.workingHours`}
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Another Section */}
        <div>
          <h4 className="text-md font-semibold mb-4">Additional Details</h4>

          {/* Section 1 */}
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-muted-foreground">
              Section 1
            </h5>
            <BilingualInput
              control={control}
              nameEn={
                `${baseName}.anotherSection.name1.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.name1.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Name 1 (English)"
              labelKa="სახელი 1 (ქართულად)"
              placeholderEn="Where is it located?"
              placeholderKa="სად მდებარეობს?"
            />
            <BilingualTextarea
              control={control}
              nameEn={
                `${baseName}.anotherSection.description.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.description.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Description 1 (English)"
              labelKa="აღწერა 1 (ქართულად)"
              placeholderEn="Description for section 1"
              placeholderKa="აღწერა სექციისთვის 1"
              rows={4}
            />
          </div>

          {/* Image */}
          <div className="border-t pt-6 mt-6">
            <FormField
              control={control}
              name={
                `${baseName}.anotherSection.image` as FieldPath<AttractionFormData>
              }
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
          <div className="space-y-4 border-t pt-6 mt-6">
            <h5 className="text-sm font-medium text-muted-foreground">
              Section 2
            </h5>
            <BilingualInput
              control={control}
              nameEn={
                `${baseName}.anotherSection.name2.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.name2.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Name 2 (English)"
              labelKa="სახელი 2 (ქართულად)"
              placeholderEn="What to know?"
              placeholderKa="რა უნდა იცოდეთ?"
            />
            <BilingualTextarea
              control={control}
              nameEn={
                `${baseName}.anotherSection.description2.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.description2.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Description 2 (English)"
              labelKa="აღწერა 2 (ქართულად)"
              placeholderEn="Description for section 2"
              placeholderKa="აღწერა სექციისთვის 2"
              rows={4}
            />
          </div>

          {/* Section 3 (optional) */}
          <div className="space-y-4 border-t pt-6 mt-6">
            <h5 className="text-sm font-medium text-muted-foreground">
              Section 3 (Optional)
            </h5>
            <BilingualTextarea
              control={control}
              nameEn={
                `${baseName}.anotherSection.description3.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.description3.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Description 3 (English)"
              labelKa="აღწერა 3 (ქართულად)"
              placeholderEn="Optional description"
              placeholderKa="ოპციური აღწერა"
              rows={4}
            />
          </div>

          {/* Section 4 (optional) */}
          <div className="space-y-4 border-t pt-6 mt-6">
            <h5 className="text-sm font-medium text-muted-foreground">
              Section 4 (Optional)
            </h5>
            <BilingualInput
              control={control}
              nameEn={
                `${baseName}.anotherSection.name4.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.name4.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Name 4 (English)"
              labelKa="სახელი 4 (ქართულად)"
              placeholderEn="Optional name"
              placeholderKa="ოპციური სახელი"
            />
            <BilingualTextarea
              control={control}
              nameEn={
                `${baseName}.anotherSection.description4.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.description4.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Description 4 (English)"
              labelKa="აღწერა 4 (ქართულად)"
              placeholderEn="Optional description"
              placeholderKa="ოპციური აღწერა"
              rows={4}
            />
          </div>

          {/* Section 5 (optional) */}
          <div className="space-y-4 border-t pt-6 mt-6">
            <h5 className="text-sm font-medium text-muted-foreground">
              Section 5 (Optional)
            </h5>
            <BilingualInput
              control={control}
              nameEn={
                `${baseName}.anotherSection.name5.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.name5.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Name 5 (English)"
              labelKa="სახელი 5 (ქართულად)"
              placeholderEn="Optional name"
              placeholderKa="ოპციური სახელი"
            />
            <BilingualTextarea
              control={control}
              nameEn={
                `${baseName}.anotherSection.description5.en` as FieldPath<AttractionFormData>
              }
              nameKa={
                `${baseName}.anotherSection.description5.ka` as FieldPath<AttractionFormData>
              }
              labelEn="Description 5 (English)"
              labelKa="აღწერა 5 (ქართულად)"
              placeholderEn="Optional description"
              placeholderKa="ოპციური აღწერა"
              rows={4}
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Blogs Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-semibold">Related Blogs</h4>
              <p className="text-xs text-muted-foreground">
                Add blog posts for this place
              </p>
            </div>
            <Button
              type="button"
              size="sm"
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
            <Card className="p-8 bg-muted/30">
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">No blogs added</p>
                <p className="text-xs text-muted-foreground">
                  Click "Add Blog" to get started
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {blogFields.map((blogField, blogIndex) => (
                <Card key={blogField.id} className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-sm font-medium">
                      Blog {blogIndex + 1}
                    </h5>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeBlog(blogIndex)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={control}
                      name={
                        `${baseName}.blogs.${blogIndex}.img` as FieldPath<AttractionFormData>
                      }
                      render={({ field }) => (
                        <FormItem>
                          <ImageUpload
                            label="Blog Image"
                            value={field.value as string}
                            onChange={field.onChange}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <BilingualInput
                      control={control}
                      nameEn={
                        `${baseName}.blogs.${blogIndex}.title.en` as FieldPath<AttractionFormData>
                      }
                      nameKa={
                        `${baseName}.blogs.${blogIndex}.title.ka` as FieldPath<AttractionFormData>
                      }
                      labelEn="Title (English)"
                      labelKa="Title (Georgian)"
                      placeholderEn="Enter title"
                      placeholderKa="შეიყვანეთ სათაური"
                    />

                    <BilingualTextarea
                      control={control}
                      nameEn={
                        `${baseName}.blogs.${blogIndex}.blogText.en` as FieldPath<AttractionFormData>
                      }
                      nameKa={
                        `${baseName}.blogs.${blogIndex}.blogText.ka` as FieldPath<AttractionFormData>
                      }
                      labelEn="Blog Text (Optional, English)"
                      labelKa="ბლოგის ტექსტი (ოპციური, ქართულად)"
                      placeholderEn="Optional blog text"
                      placeholderKa="ოპციური ბლოგის ტექსტი"
                      rows={3}
                    />

                    <BilingualTextarea
                      control={control}
                      nameEn={
                        `${baseName}.blogs.${blogIndex}.desc.en` as FieldPath<AttractionFormData>
                      }
                      nameKa={
                        `${baseName}.blogs.${blogIndex}.desc.ka` as FieldPath<AttractionFormData>
                      }
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
        </div>

        <Separator className="my-8" />

        {/* Child Slide Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-semibold">Child Places</h4>
              <p className="text-xs text-muted-foreground">
                Add nested attractions for this place
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={() => appendChild(defaultSlideCard)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Child Place
            </Button>
          </div>

          {childFields.length === 0 ? (
            <Card className="p-8 bg-muted/30">
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">
                  No child places added
                </p>
                <p className="text-xs text-muted-foreground">
                  Click "Add Child Place" to get started
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4 ml-4 border-l-2 border-muted pl-4">
              {/* Optional indentation for nested */}
              {childFields.map((childField, childIndex) => (
                <SlideCardItem
                  key={childField.id}
                  control={control}
                  baseName={`${baseName}.childSlideCards.${childIndex}`}
                  displayIndex={childIndex}
                  onRemove={() => removeChild(childIndex)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

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

const defaultSlideCard = {
  title: { en: "", ka: "" },
  src: "",
  modalSrc: "",
  additionalDescription: { en: "", ka: "" },
  text: { en: "", ka: "" },
  region: { en: "", ka: "" },
  city: { en: "", ka: "" },
  name: { en: "", ka: "" } as const,
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
    name1: { en: "", ka: "" } as const,
    description: { en: "", ka: "" } as const,
    name2: { en: "", ka: "" } as const,
    description2: { en: "", ka: "" } as const,
    description3: { en: "", ka: "" } as const,
    name4: { en: "", ka: "" } as const,
    name5: { en: "", ka: "" } as const,
    description4: { en: "", ka: "" } as const,
    description5: { en: "", ka: "" } as const,
  },
  blogs: [],
  childSlideCards: [],
} as const;

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
        <Button type="button" onClick={() => appendSlideCard(defaultSlideCard)}>
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
            <SlideCardItem
              key={field.id}
              control={control}
              baseName={`slideCard.${index}`}
              displayIndex={index}
              onRemove={() => removeSlideCard(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
