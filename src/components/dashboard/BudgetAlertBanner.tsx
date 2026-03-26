"use client";
import { BudgetLimit, ExpenseCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { useExpenseContext } from "@/context/ExpenseContext";

interface BudgetAlertBannerProps {
  budgets: BudgetLimit[];
  categoryTotals: { category: ExpenseCategory; total: number }[];
}

export function BudgetAlertBanner({
  budgets,
  categoryTotals,
}: BudgetAlertBannerProps) {
  const { formatAmount } = useExpenseContext();

  const alerts = budgets
    .map((budget) => {
      const spent =
        categoryTotals.find((c) => c.category === budget.category)?.total || 0;
      const percentage = (spent / budget.limit) * 100;
      const label =
        CATEGORIES.find((c) => c.value === budget.category)?.label ||
        budget.category;
      return { label, spent, limit: budget.limit, percentage };
    })
    .filter((a) => a.percentage >= 80)
    .sort((a, b) => b.percentage - a.percentage);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.label}
          className={`rounded-lg p-4 border ${
            alert.percentage >= 100
              ? "bg-red-50 border-red-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-medium ${
                alert.percentage >= 100 ? "text-red-800" : "text-amber-800"
              }`}
            >
              {alert.label}{" "}
              {alert.percentage >= 100 ? "- Budget Exceeded!" : "- Nearing Limit"}
            </span>
            <span
              className={`text-sm font-semibold ${
                alert.percentage >= 100 ? "text-red-700" : "text-amber-700"
              }`}
            >
              {formatAmount(alert.spent)} / {formatAmount(alert.limit)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                alert.percentage >= 100 ? "bg-red-500" : "bg-amber-500"
              }`}
              style={{ width: `${Math.min(alert.percentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
