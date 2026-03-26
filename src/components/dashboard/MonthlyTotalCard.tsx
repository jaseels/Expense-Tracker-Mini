"use client";
import { useExpenseContext } from "@/context/ExpenseContext";

interface MonthlyTotalCardProps {
  total: number;
  gstTotal: number;
  nonGstTotal: number;
  expenseCount: number;
}

export function MonthlyTotalCard({
  total,
  gstTotal,
  nonGstTotal,
  expenseCount,
}: MonthlyTotalCardProps) {
  const { formatAmount } = useExpenseContext();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-500">This Month</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">
        {formatAmount(total)}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500">Expenses</p>
          <p className="text-lg font-semibold text-gray-700">{expenseCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">GST Bills</p>
          <p className="text-lg font-semibold text-green-600">
            {formatAmount(gstTotal)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Non-GST</p>
          <p className="text-lg font-semibold text-gray-600">
            {formatAmount(nonGstTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
