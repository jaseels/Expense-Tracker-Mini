"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { useExpenseContext } from "@/context/ExpenseContext";

export default function EditExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getExpenseById, updateExpense, isHydrated } = useExpenseContext();

  if (!isHydrated) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const expense = getExpenseById(id);

  if (!expense) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Expense not found</h1>
        <p className="mt-2 text-gray-600">This expense may have been deleted.</p>
        <button
          onClick={() => router.push("/expenses")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Expenses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Expense</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ExpenseForm
          initialData={{
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            description: expense.description,
            isGstBill: expense.isGstBill,
          }}
          onSubmit={(data) => {
            updateExpense(id, data);
            router.push("/expenses");
          }}
          onCancel={() => router.back()}
          submitLabel="Update Expense"
        />
      </div>
    </div>
  );
}
