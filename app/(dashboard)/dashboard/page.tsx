import type React from "react";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { ProductsHeader } from "@/components/dashboard/products-header";

const Page: React.FC = () => {
  return (
    <div className="p-4 mx-auto space-y-8">
      <WelcomeCard />
      <StatsGrid />
      <ProductsHeader />
    </div>
  );
};

export default Page;
