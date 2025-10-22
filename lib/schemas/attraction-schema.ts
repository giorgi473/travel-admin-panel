// import * as z from "zod";

// // Georgian character validation regex
// const georgianRegex = /^[\u10A0-\u10FF\s\d.,!?;:()\-"']+$/;
// // English character validation regex
// const englishRegex = /^[a-zA-Z\s\d.,!?;:()\-"']+$/;

// export const bilingualTextSchema = z.object({
//   en: z
//     .string()
//     .min(1, "English text is required")
//     .regex(englishRegex, "Only English characters allowed"),
//   ka: z
//     .string()
//     .min(1, "Georgian text is required")
//     .regex(georgianRegex, "Only Georgian characters allowed"),
// });

// export const workingHoursSchema = z.object({
//   Monday: z.string(),
//   Tuesday: z.string(),
//   Wednesday: z.string(),
//   Thursday: z.string(),
//   Friday: z.string(),
//   Saturday: z.string(),
//   Sunday: z.string(),
// });

// export const slideCardSchema = z.object({
//   title: bilingualTextSchema,
//   src: z.string().min(1, "Image is required"),
//   modalSrc: z.string().min(1, "Modal image is required"),
//   additionalDescription: bilingualTextSchema,
//   text: bilingualTextSchema.optional(),
//   region: bilingualTextSchema,
//   city: bilingualTextSchema,
//   name: bilingualTextSchema,
//   address: z.string().min(1, "Address is required"),
//   phone: z.string().min(1, "Phone is required"),
//   website: z.string().url("Must be a valid URL"),
//   workingHours: workingHoursSchema,
// });

// export const blogSchema = z.object({
//   img: z.string().min(1, "Image is required"),
//   title: bilingualTextSchema,
//   blogText: bilingualTextSchema.optional(),
//   desc: bilingualTextSchema,
// });

// export const attractionSchema = z.object({
//   title: bilingualTextSchema,
//   src: z.string().min(1, "Image is required"),
//   modalSrc: z.string().min(1, "Modal image is required"),
//   additionalDescription: bilingualTextSchema,
//   region: bilingualTextSchema,
//   city: bilingualTextSchema,
//   description: bilingualTextSchema,
//   name: bilingualTextSchema,
//   address: z.string().min(1, "Address is required"),
//   phone: z.string().min(1, "Phone is required"),
//   website: z.string().url("Must be a valid URL"),
//   workingHours: workingHoursSchema,
//   anotherSection: z.object({
//     name1: bilingualTextSchema,
//     description: bilingualTextSchema,
//     image: z.string().optional(),
//     name2: bilingualTextSchema,
//     description2: bilingualTextSchema,
//     description3: bilingualTextSchema.optional(),
//     name4: bilingualTextSchema.optional(),
//     name5: bilingualTextSchema.optional(),
//     description4: bilingualTextSchema.optional(),
//     description5: bilingualTextSchema.optional(),
//   }),
//   slideCard: z.array(slideCardSchema),
//   blogs: z.array(blogSchema),
// });

// export type AttractionFormData = z.infer<typeof attractionSchema>;
import * as z from "zod";

// Georgian character validation regex
const georgianRegex = /^[\u10A0-\u10FF\s\d.,!?;:()\-"']+$/;
// English character validation regex
const englishRegex = /^[a-zA-Z\s\d.,!?;:()\-"']+$/;

export const bilingualTextSchema = z.object({
  en: z
    .string()
    .min(1, "English text is required")
    .regex(englishRegex, "Only English characters allowed"),
  ka: z
    .string()
    .min(1, "Georgian text is required")
    .regex(georgianRegex, "Only Georgian characters allowed"),
});

export const optionalBilingualTextSchema = z.object({
  en: z
    .string()
    .regex(englishRegex, "Only English characters allowed")
    .optional(),
  ka: z
    .string()
    .regex(georgianRegex, "Only Georgian characters allowed")
    .optional(),
});

export const workingHoursSchema = z.object({
  Monday: z.string().optional(),
  Tuesday: z.string().optional(),
  Wednesday: z.string().optional(),
  Thursday: z.string().optional(),
  Friday: z.string().optional(),
  Saturday: z.string().optional(),
  Sunday: z.string().optional(),
});

export const slideCardSchema = z.object({
  title: bilingualTextSchema,
  src: z.string().min(1, "Image is required"),
  modalSrc: z.string().min(1, "Modal image is required"),
  additionalDescription: bilingualTextSchema,
  text: optionalBilingualTextSchema.optional(),
  region: bilingualTextSchema,
  city: bilingualTextSchema,
  name: bilingualTextSchema,
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional(),
  workingHours: workingHoursSchema.optional(),
});

export const blogSchema = z.object({
  img: z.string().min(1, "Image is required"),
  title: bilingualTextSchema,
  blogText: optionalBilingualTextSchema.optional(),
  desc: bilingualTextSchema,
});

export const attractionSchema = z.object({
  title: bilingualTextSchema,
  src: z.string().min(1, "Image is required"),
  modalSrc: z.string().min(1, "Modal image is required"),
  additionalDescription: bilingualTextSchema,
  region: bilingualTextSchema,
  city: bilingualTextSchema,
  description: bilingualTextSchema,
  name: bilingualTextSchema,
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional(),
  workingHours: workingHoursSchema.optional(),
  anotherSection: z.object({
    image: z.string().optional(),
    name1: bilingualTextSchema,
    description: bilingualTextSchema,
    name2: bilingualTextSchema,
    description2: bilingualTextSchema,
    description3: optionalBilingualTextSchema.optional(),
    name4: optionalBilingualTextSchema.optional(),
    name5: optionalBilingualTextSchema.optional(),
    description4: optionalBilingualTextSchema.optional(),
    description5: optionalBilingualTextSchema.optional(),
  }),
  slideCard: z.array(slideCardSchema),
  blogs: z.array(blogSchema),
});

export type AttractionFormData = z.infer<typeof attractionSchema>;
