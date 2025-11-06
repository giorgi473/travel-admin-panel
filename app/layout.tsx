// import type React from "react";
// import type { Metadata } from "next";
// import { Noto_Sans_Georgian } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
// import { AppSidebar } from "@/components/app-sidebar";
// import { Header } from "@/components/header";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { ThemeProvider } from "@/components/theme-provider";
// import "./globals.css";

// const georgianFont = Noto_Sans_Georgian({
//   subsets: ["georgian", "latin"],
//   weight: ["400", "700"],
//   variable: "--font-georgian",
// });

// export const metadata: Metadata = {
//   title: "Turism Admin Panel",
//   description: "Professional admin dashboard",
//   generator: "v0.app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`dark ${georgianFont.variable}`}
//       suppressHydrationWarning
//     >
//       <head>
//         <link rel="icon" href="/logo/logo.svg" sizes="any" />
//       </head>
//       <body className={`font-georgian antialiased`}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <SidebarProvider>
//             <div className="flex min-h-screen w-full">
//               <AppSidebar />
//               <div className="flex flex-1 flex-col">
//                 <Header />
//                 <main className="flex-1">{children}</main>
//               </div>
//             </div>
//           </SidebarProvider>
//           <Analytics />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const georgianFont = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "700"],
  variable: "--font-georgian",
});

export const metadata: Metadata = {
  title: "Turism Admin Panel",
  description: "Professional admin dashboard",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${georgianFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo/logo.svg" sizes="any" />
      </head>
      <body className={`font-georgian antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
