// "use client";

// import type React from "react";
// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   PieChart,
//   Gift,
//   ParkingCircle,
//   BarChart,
//   MessageCircle,
// } from "lucide-react";
// import { AddProductDrawer } from "@/components/modules/add-product-drawer";

// const stats = [
//   {
//     label: "Total Users",
//     value: 3566,
//     icon: <PieChart className="w-5 h-5" />,
//     rightIcon: <BarChart className="w-5 h-5" />,
//   },
//   {
//     label: "Total Orders",
//     value: 959,
//     icon: <Gift className="w-5 h-5" />,
//     rightIcon: <PieChart className="w-5 h-5" />,
//   },
//   {
//     label: "Total Products",
//     value: 50,
//     icon: <ParkingCircle className="w-5 h-5" />,
//     rightIcon: <BarChart className="w-5 h-5" />,
//   },
//   {
//     label: "Total Category",
//     value: 8,
//     icon: <MessageCircle className="w-5 h-5" />,
//     rightIcon: <BarChart className="w-5 h-5" />,
//   },
// ];

// const userName = "Giorgi Kavtaradze";

// const Page: React.FC = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   return (
//     <div className="p-4 mx-auto space-y-8">
//       <Card className="flex flex-col md:flex-row items-center gap-2">
//         <div className="flex-1 space-y-4">
//           <CardHeader>
//             <CardTitle>
//               <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
//                 Welcome,
//               </span>
//               <span className="block text-red-600 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
//                 {userName}
//               </span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-md lg:text-lg">
//               Here's what's happening in your store today. See the statistics at
//               once.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Button
//               className="text-xs"
//               size={"sm"}
//               onClick={() => setIsDrawerOpen(true)}
//             >
//               Add Product
//             </Button>
//           </CardFooter>
//         </div>
//         <div className="flex-shrink-0">
//           <Image
//             src="/image/shop-illustration.webp"
//             alt="Shop Illustration"
//             width={200}
//             height={200}
//             priority
//             className="rounded-md"
//           />
//         </div>
//       </Card>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, idx) => (
//           <Card
//             key={idx}
//             className="rounded-lg shadow-md text-gray-600 dark:text-white p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div>{stat.icon}</div>
//                 <div className="flex flex-col justify-center ml-4">
//                   <span className="text-md">{stat.label}</span>
//                   <span className="text-xl font-bold">{stat.value}</span>
//                 </div>
//               </div>
//               <div className="flex items-center ml-auto">{stat.rightIcon}</div>
//             </div>
//           </Card>
//         ))}
//       </div>
//       <div className="flex items-center justify-between">
//         <span className="text-md lg:text-md font-semibold text-gray-600 dark:text-gray-300">
//           Products
//         </span>
//         <Button
//           size={"sm"}
//           className="text-xs"
//           onClick={() => setIsDrawerOpen(true)}
//         >
//           Add Product
//         </Button>
//       </div>

//       <AddProductDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
//     </div>
//   );
// };

// export default Page;

import type React from "react";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ProductsHeader } from "@/components/dashboard/products-header";

const userName = "Giorgi Kavtaradze";

const Page: React.FC = () => {
  return (
    <div className="p-4 mx-auto space-y-8">
      <WelcomeCard userName={userName} />
      <StatsGrid />
      <ProductsHeader />
    </div>
  );
};

export default Page;
