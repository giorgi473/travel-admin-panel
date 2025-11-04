"use client";

import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { getTours } from "@/actions/tours-actions";

interface Tour {
  id: string;
  title: {
    en: string;
    ka: string;
  };
  image: string;
  description: {
    en: string;
    ka: string;
  };
  duration: {
    en: string;
    ka: string;
  };
  activities: {
    en: string;
    ka: string;
  };
  currency: {
    en: string;
    ka: string;
  };
  popularTours?: Array<{
    title: { en: string; ka: string };
    image: string;
    mapLink: string;
    description: { en: string; ka: string };
  }>;
  createdAt: string;
}

interface MonthlyData {
  month: string;
  tours: number;
}

export function GrowthTrendChart() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<MonthlyData[]>([]);

  const fetchTours = async () => {
    setLoading(true);
    const result = await getTours();
    if (result.success && result.data) {
      setTours(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    if (tours.length === 0) {
      setChartData([]);
      return;
    }

    const monthlyCounts = tours.reduce((acc, tour) => {
      const date = new Date(tour.createdAt);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      acc[yearMonth] = (acc[yearMonth] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth(); // 0-11
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const months = [];
    for (let m = 0; m <= currentMonthIndex; m++) {
      const monthNum = m + 1;
      const short = monthNames[m];
      const full = `${currentYear}-${String(monthNum).padStart(2, "0")}`;
      months.push({ short, full });
    }

    let cumulative = 0;
    const data: MonthlyData[] = months.map(({ short, full }) => {
      const added = monthlyCounts[full] || 0;
      cumulative += added;
      return { month: short, tours: cumulative };
    });

    setChartData(data);
  }, [tours]);

  const chartConfig: ChartConfig = {
    tours: {
      label: "Total Tours",
      color: "hsl(0 72% 51%)",
    },
  };

  if (loading) {
    return (
      <Card className="col-span-full lg:col-span-2 border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            Growth Trend <TrendingUp className="h-4 w-4" />
          </CardTitle>
          <CardDescription>Tours added over time</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[280px]">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <p className="text-sm text-muted-foreground">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tours.length === 0) {
    return (
      <Card className="col-span-full lg:col-span-2 border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            Growth Trend <TrendingUp className="h-4 w-4" />
          </CardTitle>
          <CardDescription>Tours added over time</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[280px] text-center">
          <div className="space-y-2">
            <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              No tours data available yet.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <button
            onClick={fetchTours}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Refresh Data
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="col-span-full lg:col-span-2 border-red-200 dark:border-red-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
          Growth Trend <TrendingUp className="h-4 w-4" />
        </CardTitle>
        <CardDescription>Tours added over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={chartData} margin={{ left: 13, right: 5 }}>
            <defs>
              <linearGradient id="fillTours" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tours)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tours)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              width={10}
              tickLine={false}
              axisLine={false}
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="tours"
              stroke="var(--color-tours)"
              fill="url(#fillTours)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          Cumulative data from Jan to{" "}
          {new Date().toLocaleDateString("ka-GE", { month: "short" })} • Last
          updated: {new Date().toLocaleDateString("ka-GE")} • Total:{" "}
          {chartData[chartData.length - 1]?.tours || 0} tours
        </div>
      </CardFooter>
    </Card>
  );
}
