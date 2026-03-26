"use client";
import { useState } from "react";
import { useExpenseContext } from "@/context/ExpenseContext";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { ExpenseFiltersBar } from "@/components/filters/ExpenseFilters";
import { ExpenseFilters } from "@/lib/types";
import { downloadCsv } from "@/lib/csv";

export default function ExpensesPage() {
  const { expenses, filterExpenses, deleteExpense, isHydrated, currencySymbol } =
    useExpenseContext();
  const [filters, setFilters] = useState<ExpenseFilters>({
    startDate: null,
    endDate: null,
    category: "all",
    gstOnly: null,
  });

  const filteredExpenses = filterExpenses(filters);
  const hasActiveFilters =
    filters.startDate || filters.endDate || filters.category !== "all" || filters.gstOnly !== null;

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500">
            {hasActiveFilters
              ? `${filteredExpenses.length} of ${expenses.length} expenses`
              : `${expenses.length} expenses`}
          </p>
        </div>
        {expenses.length > 0 && (
          <button
            onClick={() => downloadCsv(filteredExpenses, currencySymbol)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        )}
      </div>

      <ExpenseFiltersBar filters={filters} onChange={setFilters} />
      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
    </div>
  );
}
