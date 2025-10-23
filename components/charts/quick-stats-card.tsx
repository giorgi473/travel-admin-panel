import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QuickStatsCardProps {
  data: { name: string; value: number }[];
}

export function QuickStatsCard({ data }: QuickStatsCardProps) {
  return (
    <Card className="border-red-200 dark:border-red-900">
      <CardHeader>
        <CardTitle className="text-red-700 dark:text-red-400">
          Quick Stats
        </CardTitle>
        <CardDescription>Overview metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((stat, index) => (
          <div key={stat.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </span>
              <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stat.value}
              </span>
            </div>
            {index < data.length - 1 && (
              <div className="h-px bg-red-100 dark:bg-red-900" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
