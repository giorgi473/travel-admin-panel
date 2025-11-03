// import { ProductsHeader } from "@/components/tours/products-header";
// import { StatsGrid } from "@/components/tours/stats-grid";
// import { WelcomeCard } from "@/components/tours/welcome-card";
// import type React from "react";

// const userName = "Giorgi Kavtaradze";

// const Page: React.FC = () => {
//   return (
//     <div className="p-4 mx-auto space-y-8">
//       <WelcomeCard userName={userName} />
//       <StatsGrid />
//       <ProductsHeader />
//       <section>table</section>
//     </div>
//   );
// };

// export default Page;

import type React from "react";
import { ProductsHeader } from "@/components/tours/products-header";
import { StatsGrid } from "@/components/tours/stats-grid";
import { WelcomeCard } from "@/components/tours/welcome-card";
import { ToursTable } from "@/components/tours/tours-table";

const userName = "Giorgi Kavtaradze";

const Page: React.FC = () => {
  return (
    <div className="p-4 mx-auto space-y-8">
      <WelcomeCard userName={userName} />
      <StatsGrid />
      <ProductsHeader />
      <section>
        <ToursTable />
      </section>
    </div>
  );
};

export default Page;
