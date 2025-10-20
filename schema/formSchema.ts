import * as z from "zod";

const englishRegex = /^[A-Za-z0-9\s.,!?'-]*$/;
const georgianRegex = /^[ა-ჰ0-9\s.,!?'-]*$/;

export const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.size > 0, "სურათი აუცილებელია")
    .refine(
      (file) => file.size === 0 || file.size <= 5 * 1024 * 1024,
      "სურათი უნდა იყოს 5MB-ზე ნაკლები"
    )
    .refine(
      (file) =>
        file.size === 0 ||
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      "დაშვებულია მხოლოდ JPG, PNG, WebP, SVG, GIF ფორმატები"
    ),
  titleEn: z
    .string()
    .min(1, "English title is required")
    .regex(englishRegex, "Please use only English characters"),
  titleKa: z
    .string()
    .min(1, "ქართული სათაური აუცილებელია")
    .regex(georgianRegex, "გთხოვთ, გამოიყენოთ მხოლოდ ქართული სიმბოლოები"),
  descriptionEn: z
    .string()
    .optional()
    .refine(
      (value) => !value || englishRegex.test(value),
      "Please use only English characters"
    ),
  descriptionKa: z
    .string()
    .optional()
    .refine(
      (value) => !value || georgianRegex.test(value),
      "გთხოვთ, გამოიყენოთ მხოლოდ ქართული სიმბოლოები"
    ),
});

export type FormValues = z.infer<typeof formSchema>;
