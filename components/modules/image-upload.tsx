// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";

// interface ImageUploadProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
// }

// export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
//   const [preview, setPreview] = useState<string | null>(value || null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       const base64 = ev.target?.result as string;
//       onChange(base64); // base64 URL (data:image/... )
//       setPreview(base64);
//       setLoading(false);
//     };
//     reader.onerror = () => {
//       setLoading(false);
//       alert("შეცდომა სურათის წაკითხვაში");
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-medium">{label}</label>
//       {preview && (
//         <div className="relative">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-32 object-cover rounded-md border"
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             size="sm"
//             className="absolute top-2 right-2"
//             onClick={() => {
//               onChange("");
//               setPreview(null);
//             }}
//           >
//             Remove
//           </Button>
//         </div>
//       )}
//       <div className="flex items-center gap-2">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="hidden"
//           id={`file-${label}`}
//         />
//         <label
//           htmlFor={`file-${label}`}
//           className="cursor-pointer flex-1 border rounded-md p-2 text-center bg-muted hover:bg-accent"
//         >
//           {loading ? "Loading..." : <Upload className="w-4 h-4 mx-auto" />}
//         </label>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";

// interface ImageUploadProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
// }

// export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
//   const [preview, setPreview] = useState<string | null>(value || null);
//   const [loading, setLoading] = useState(false);

//   // სინქრონიზაცია value prop-თან – ახლა preview ყოველთვის შეესაბამება form-ის value-ს
//   useEffect(() => {
//     setPreview(value || null);
//   }, [value]);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       const base64 = ev.target?.result as string;
//       onChange(base64); // base64 URL (data:image/... )
//       setPreview(base64);
//       setLoading(false);
//     };
//     reader.onerror = () => {
//       setLoading(false);
//       alert("შეცდომა სურათის წაკითხვაში");
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemove = () => {
//     onChange(""); // form-ის value განულება
//     setPreview(null); // preview-ის განულება
//     // input-ის reset, რათა ფაილი ხელახლა შეძლო არჩევა
//     const input = document.getElementById(`file-${label}`) as HTMLInputElement;
//     if (input) input.value = "";
//   };

//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-medium">{label}</label>
//       {preview && (
//         <div className="relative">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-32 object-cover rounded-md border"
//           />
//           <Button
//             type="button"
//             variant="ghost"
//             size="sm"
//             className="absolute top-2 right-2"
//             onClick={handleRemove}
//           >
//             Remove
//           </Button>
//         </div>
//       )}
//       <div className="flex items-center gap-2">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="hidden"
//           id={`file-${label}`}
//         />
//         <label
//           htmlFor={`file-${label}`}
//           className="cursor-pointer flex-1 border rounded-md p-2 text-center bg-muted hover:bg-accent"
//         >
//           {loading ? "Loading..." : <Upload className="w-4 h-4 mx-auto" />}
//         </label>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, AlertCircle, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxSize?: number; // In MB, default 10MB
}

export function ImageUpload({
  label,
  value,
  onChange,
  maxSize = 10,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with value
  useEffect(() => {
    setPreview(value || null);
    setError(null);
  }, [value]);

  const validateFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        return "Only image files are supported (PNG, JPG, GIF, WEBP)";
      }
      if (file.size > maxSize * 1024 * 1024) {
        return `File size is too large. Maximum: ${maxSize}MB`;
      }
      return null;
    },
    [maxSize]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        onChange(base64);
        setPreview(base64);
        toast.success("Image uploaded successfully!");
      };
      reader.onerror = () => {
        setError("Error reading image");
        toast.error("Error uploading image");
      };
      reader.readAsDataURL(file);
    },
    [onChange, validateFile]
  );

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const syntheticEvent = { target: { files: [file] } } as any;
        handleFileChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [handleFileChange]
  );

  const handleRemove = useCallback(() => {
    onChange("");
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    toast.success("Image deleted");
  }, [onChange]);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  if (error) {
    return (
      <div className="space-y-2">
        <Label className="text-destructive">{label}</Label>
        <div
          className={cn(
            "p-4 border border-destructive rounded-md flex items-center gap-2 text-destructive text-sm bg-destructive/10"
          )}
        >
          <AlertCircle className="w-4 h-4" />
          {error}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="ml-auto"
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-44 object-cover rounded-lg border shadow-sm hover:shadow-md transition-all duration-200"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors" />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Image uploaded
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-9 text-center transition-all duration-300 cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            dragActive
              ? "border-primary bg-primary/10 scale-105 shadow-xl ring-2 ring-primary/20"
              : "border-border bg-muted/20 hover:bg-muted/40"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFilePicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openFilePicker();
          }}
          aria-label={`Upload ${label}`}
        >
          <Upload className="w-5 h-5 mx-auto mb-3 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
          <p className="text-sm font-semibold mb-1 text-foreground">
            Select image
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            or drag and drop here
          </p>
          <p className="text-xs text-muted-foreground">
            Supported: PNG, JPG, GIF, WEBP • Max: {maxSize}MB
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
      />
    </div>
  );
}
