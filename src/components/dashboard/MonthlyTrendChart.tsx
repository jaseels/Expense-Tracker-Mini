"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlySummary } from "@/lib/types";
import { useExpenseContext } from "@/context/ExpenseContext";

interface MonthlyTrendChartProps {
  data: MonthlySummary[];
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const { currencySymbol } = useExpenseContext();

  const chartData = data.slice(-12).map((d) => ({
    month: d.month,
    label: new Date(d.month + "-01").toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),
    total: d.total,
    gst: d.gstTotal,
    nonGst: d.nonGstTotal,
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Monthly Trend
        </h3>
        <p className="text-sm text-gray-400 text-center py-8">
          No expense data to display
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Monthly Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${currencySymbol}${Number(value).toFixed(2)}`]}
          />
          <Line
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="gst"
            name="GST"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
