import { ProductsHeader } from "@/components/tours/products-header";
import { StatsGrid } from "@/components/tours/stats-grid";
import { WelcomeCard } from "@/components/tours/welcome-card";
import type React from "react";

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
