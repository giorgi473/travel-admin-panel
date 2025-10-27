import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface GrowthTrendChartProps {
  data: { month: string; attractions: number }[];
}

export function GrowthTrendChart({ data }: GrowthTrendChartProps) {
  return (
    <Card className="col-span-full lg:col-span-2 border-red-200 dark:border-red-900">
      <CardHeader>
        <CardTitle className="text-red-700 dark:text-red-400">
          Growth Trend
        </CardTitle>
        <CardDescription>Attractions added over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            attractions: {
              label: "Total",
              color: "hsl(0 72% 51%)",
            },
          }}
          className="h-[280px] w-full"
        >
          <AreaChart data={data} margin={{ left: 13, right: 5 }}>
            <defs>
              <linearGradient id="fillAttractions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-attractions)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-attractions)"
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
              dataKey="attractions"
              stroke="var(--color-attractions)"
              fill="url(#fillAttractions)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
