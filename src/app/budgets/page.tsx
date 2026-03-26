"use client";
import { useState, useMemo } from "react";
import { useExpenseContext } from "@/context/ExpenseContext";
import { ExpenseCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import {
  getCurrentMonthKey,
  getExpensesForMonth,
  getCategoryTotals,
} from "@/lib/calculations";

export default function BudgetsPage() {
  const { expenses, budgets, addBudget, updateBudget, deleteBudget, isHydrated, formatAmount } =
    useExpenseContext();
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [limit, setLimit] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editLimit, setEditLimit] = useState("");

  const currentMonth = getCurrentMonthKey();
  const monthExpenses = useMemo(
    () => getExpensesForMonth(expenses, currentMonth),
    [expenses, currentMonth]
  );
  const categoryTotals = useMemo(
    () => getCategoryTotals(monthExpenses),
    [monthExpenses]
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(limit);
    if (amount > 0) {
      addBudget(category, amount);
      setLimit("");
    }
  };

  const handleUpdate = (id: string) => {
    const amount = parseFloat(editLimit);
    if (amount > 0) {
      updateBudget(id, amount);
      setEditId(null);
      setEditLimit("");
    }
  };

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Budget Limits</h1>

      <form
        onSubmit={handleAdd}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Set Monthly Budget
        </h2>
        <div className="flex gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            min="0"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Limit amount"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Set
          </button>
        </div>
      </form>

      {budgets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">No budgets set</h3>
          <p className="mt-1 text-sm text-gray-500">
            Set monthly budget limits per category to track your spending.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {budgets.map((budget) => {
            const spent =
              categoryTotals.find((c) => c.category === budget.category)
                ?.total || 0;
            const percentage = Math.min((spent / budget.limit) * 100, 100);
            const label =
              CATEGORIES.find((c) => c.value === budget.category)?.label ||
              budget.category;
            const isOver = spent > budget.limit;

            return (
              <div key={budget.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {label}
                  </span>
                  <div className="flex items-center gap-3">
                    {editId === budget.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editLimit}
                          onChange={(e) => setEditLimit(e.target.value)}
                          className="w-28 px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={() => handleUpdate(budget.id)}
                          className="text-blue-600 text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-gray-500 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`text-sm font-semibold ${
                            isOver ? "text-red-600" : "text-gray-700"
                          }`}
                        >
                          {formatAmount(spent)} / {formatAmount(budget.limit)}
                        </span>
                        <button
                          onClick={() => {
                            setEditId(budget.id);
                            setEditLimit(budget.limit.toString());
                          }}
                          className="text-blue-600 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBudget(budget.id)}
                          className="text-red-600 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isOver
                        ? "bg-red-500"
                        : percentage >= 80
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
