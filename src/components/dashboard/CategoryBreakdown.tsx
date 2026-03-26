"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";
import { ExpenseCategory } from "@/lib/types";
import { useExpenseContext } from "@/context/ExpenseContext";

interface CategoryBreakdownProps {
  data: { category: ExpenseCategory; total: number }[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const { currencySymbol } = useExpenseContext();

  const chartData = data.map((d) => ({
    name: CATEGORIES.find((c) => c.value === d.category)?.label || d.category,
    value: d.total,
    color: CATEGORY_COLORS[d.category],
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Category Breakdown
        </h3>
        <p className="text-sm text-gray-400 text-center py-8">
          No expense data to display
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">
        Category Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${currencySymbol}${Number(value).toFixed(2)}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
