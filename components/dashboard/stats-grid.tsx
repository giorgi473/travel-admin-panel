import type React from "react";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Gift,
  ParkingCircle,
  BarChart,
  MessageCircle,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: 3566,
    icon: <PieChart className="w-5 h-5" />,
    rightIcon: <BarChart className="w-5 h-5" />,
  },
  {
    label: "Total Orders",
    value: 959,
    icon: <Gift className="w-5 h-5" />,
    rightIcon: <PieChart className="w-5 h-5" />,
  },
  {
    label: "Total Products",
    value: 50,
    icon: <ParkingCircle className="w-5 h-5" />,
    rightIcon: <BarChart className="w-5 h-5" />,
  },
  {
    label: "Total Category",
    value: 8,
    icon: <MessageCircle className="w-5 h-5" />,
    rightIcon: <BarChart className="w-5 h-5" />,
  },
];

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="rounded-lg shadow-md text-gray-600 dark:text-white p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>{stat.icon}</div>
              <div className="flex flex-col justify-center ml-4">
                <span className="text-md">{stat.label}</span>
                <span className="text-xl font-bold">{stat.value}</span>
              </div>
            </div>
            <div className="flex items-center ml-auto">{stat.rightIcon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
