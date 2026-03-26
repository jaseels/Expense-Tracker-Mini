"use client";
import { useRouter } from "next/navigation";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { useExpenseContext } from "@/context/ExpenseContext";

export default function AddExpensePage() {
  const router = useRouter();
  const { addExpense } = useExpenseContext();

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Expense</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ExpenseForm
          onSubmit={(data) => {
            addExpense(data);
            router.push("/expenses");
          }}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
