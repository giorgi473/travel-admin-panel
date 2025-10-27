// "use client";

// import { Input } from "@/components/ui/input";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import type { Control } from "react-hook-form";
// import { Clock } from "lucide-react";
// import { AttractionFormData } from "@/lib/schemas/attraction-schema";

// interface WorkingHoursSectionProps {
//   control: Control<AttractionFormData>;
//   baseName?: string;
// }

// const days = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// export function WorkingHoursSection({
//   control,
//   baseName = "workingHours",
// }: WorkingHoursSectionProps) {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-2 text-sm font-medium">
//         <Clock className="w-4 h-4" />
//         <span>Working Hours (Optional)</span>
//       </div>
//       <div className="grid md:grid-cols-2 gap-4">
//         {days.map((day) => (
//           <FormField
//             key={day}
//             control={control}
//             name={`${baseName}.${day}` as any}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-sm text-muted-foreground">
//                   {day}
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     placeholder="10:00 AM – 5:30 PM"
//                     className="text-sm"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control } from "react-hook-form";
import { Clock } from "lucide-react";
import type { AttractionFormData } from "@/lib/schemas/attraction-schema";

interface WorkingHoursSectionProps {
  control: Control<AttractionFormData>;
  baseName?: string;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function WorkingHoursSection({
  control,
  baseName = "workingHours",
}: WorkingHoursSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>Working Hours (Optional)</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {days.map((day) => (
          <FormField
            key={day}
            control={control}
            name={`${baseName}.${day}` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-muted-foreground">
                  {day}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="10:00 AM – 5:30 PM"
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
