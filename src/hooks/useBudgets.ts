"use client";
import { useCallback } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./useLocalStorage";
import { BudgetLimit, ExpenseCategory } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants";

export function useBudgets() {
  const [budgets, setBudgets, isHydrated] = useLocalStorage<BudgetLimit[]>(
    STORAGE_KEYS.BUDGETS,
    []
  );

  const addBudget = useCallback(
    (category: ExpenseCategory, limit: number) => {
      const budget: BudgetLimit = {
        id: nanoid(),
        category,
        limit,
        createdAt: new Date().toISOString(),
      };
      setBudgets((prev) => {
        const filtered = prev.filter((b) => b.category !== category);
        return [...filtered, budget];
      });
      return budget;
    },
    [setBudgets]
  );

  const updateBudget = useCallback(
    (id: string, limit: number) => {
      setBudgets((prev) =>
        prev.map((b) => (b.id === id ? { ...b, limit } : b))
      );
    },
    [setBudgets]
  );

  const deleteBudget = useCallback(
    (id: string) => {
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    },
    [setBudgets]
  );

  const getBudgetByCategory = useCallback(
    (category: ExpenseCategory) => budgets.find((b) => b.category === category) || null,
    [budgets]
  );

  return {
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    getBudgetByCategory,
    isHydrated,
  };
}
