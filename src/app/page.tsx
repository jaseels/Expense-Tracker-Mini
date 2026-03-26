"use client";
import { useMemo } from "react";
import Link from "next/link";
import { useExpenseContext } from "@/context/ExpenseContext";
import { MonthlyTotalCard } from "@/components/dashboard/MonthlyTotalCard";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { MonthlyTrendChart } from "@/components/dashboard/MonthlyTrendChart";
import { BudgetAlertBanner } from "@/components/dashboard/BudgetAlertBanner";
import {
  getCurrentMonthKey,
  getExpensesForMonth,
  getGstSplit,
  getCategoryTotals,
  getMonthlySummaries,
} from "@/lib/calculations";

export default function DashboardPage() {
  const { expenses, budgets, isHydrated, formatAmount } = useExpenseContext();

  const currentMonth = getCurrentMonthKey();
  const monthExpenses = useMemo(
    () => getExpensesForMonth(expenses, currentMonth),
    [expenses, currentMonth]
  );
  const monthTotal = useMemo(
    () => monthExpenses.reduce((s, e) => s + e.amount, 0),
    [monthExpenses]
  );
  const gstSplit = useMemo(() => getGstSplit(monthExpenses), [monthExpenses]);
  const categoryTotals = useMemo(
    () => getCategoryTotals(monthExpenses),
    [monthExpenses]
  );
  const monthlySummaries = useMemo(
    () => getMonthlySummaries(expenses),
    [expenses]
  );

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Expense
        </Link>
      </div>

      <BudgetAlertBanner budgets={budgets} categoryTotals={categoryTotals} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTotalCard
          total={monthTotal}
          gstTotal={gstSplit.gstTotal}
          nonGstTotal={gstSplit.nonGstTotal}
          expenseCount={monthExpenses.length}
        />
        <CategoryBreakdown data={categoryTotals} />
      </div>

      <MonthlyTrendChart data={monthlySummaries} />

      {expenses.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Recent Expenses
            </h3>
            <Link
              href="/expenses"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {expense.description}
                  </p>
                  <p className="text-xs text-gray-500">{expense.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatAmount(expense.amount)}
                  </p>
                  {expense.isGstBill && (
                    <span className="text-xs text-green-600">GST</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {expenses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <h3 className="mt-3 text-sm font-medium text-gray-900">
            No expenses yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start tracking your expenses to see insights here.
          </p>
          <Link
            href="/add"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Expense
          </Link>
        </div>
      )}
    </div>
  );
}
