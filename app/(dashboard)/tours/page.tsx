import type React from "react";
import { ProductsHeader } from "@/components/tours/products-header";
import { StatsGrid } from "@/components/tours/stats-grid";
import { WelcomeCard } from "@/components/tours/welcome-card";
import { ToursTable } from "@/components/tours/tours-table";
import { GrowthTrendChart } from "@/components/tours/chart/chart-area-gradient";

const userName = "Giorgi Kavtaradze";

const Page: React.FC = () => {
  return (
    <div className="p-4 mx-auto space-y-8">
      <WelcomeCard userName={userName} />
      <StatsGrid />
      <ProductsHeader />
      <section>
        <GrowthTrendChart />
      </section>
      <section>
        <ToursTable />
      </section>
    </div>
  );
};

export default Page;
