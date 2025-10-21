// "use client";

// import type React from "react";

// import { useCallback, useState } from "react";
// import { Upload, X } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ImageUploadProps {
//   value?: string;
//   onChange: (value: string) => void;
//   onRemove?: () => void;
//   disabled?: boolean;
//   label?: string;
// }

// export function ImageUpload({
//   value,
//   onChange,
//   onRemove,
//   disabled,
//   label,
// }: ImageUploadProps) {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDrop = useCallback(
//     (e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       setIsDragging(false);

//       if (disabled) return;

//       const file = e.dataTransfer.files[0];
//       if (file && file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           onChange(event.target?.result as string);
//         };
//         reader.readAsDataURL(file);
//       }
//     },
//     [disabled, onChange]
//   );

//   const handleFileChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           onChange(event.target?.result as string);
//         };
//         reader.readAsDataURL(file);
//       }
//     },
//     [onChange]
//   );

//   return (
//     <div className="space-y-2">
//       {label && (
//         <label className="text-sm font-medium text-foreground">{label}</label>
//       )}

//       {!value ? (
//         <div
//           onDrop={handleDrop}
//           onDragOver={(e) => {
//             e.preventDefault();
//             setIsDragging(true);
//           }}
//           onDragLeave={() => setIsDragging(false)}
//           className={cn(
//             "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors cursor-pointer h-32",
//             isDragging
//               ? "border-primary bg-primary/5"
//               : "border-border hover:border-primary/50 hover:bg-accent/50",
//             disabled && "opacity-50 cursor-not-allowed"
//           )}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             disabled={disabled}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
//           />
//           <Upload className="w-8 h-8 text-muted-foreground mb-2" />
//           <p className="text-sm text-muted-foreground text-center px-4">
//             Drop image here or click to upload
//           </p>
//         </div>
//       ) : (
//         <div className="relative group rounded-lg overflow-hidden border border-border">
//           <img
//             src={value || "/placeholder.svg"}
//             alt="Upload preview"
//             className="w-full h-32 object-cover"
//           />
//           <button
//             type="button"
//             onClick={() => {
//               onChange("");
//               onRemove?.();
//             }}
//             disabled={disabled}
//             className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import type React from "react";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      onChange(fileUrl);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setIsUrlMode(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {value ? (
        <div className="relative border rounded-lg overflow-hidden">
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={value || "/placeholder.svg"}
              alt={label}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {!isUrlMode ? (
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUrlMode(true)}
              >
                Use URL
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter image URL"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
              />
              <Button type="button" onClick={handleUrlSubmit}>
                Add
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsUrlMode(false);
                  setUrlInput("");
                }}
              >
                Cancel
              </Button>
            </div>
          )}

          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/50">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Upload an image or provide a URL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
