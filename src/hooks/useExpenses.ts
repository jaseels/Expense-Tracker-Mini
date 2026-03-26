"use client";
import { useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./useLocalStorage";
import { Expense, ExpenseFormData, ExpenseFilters } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants";

export function useExpenses() {
  const [expenses, setExpenses, isHydrated] = useLocalStorage<Expense[]>(
    STORAGE_KEYS.EXPENSES,
    []
  );

  const addExpense = useCallback(
    (data: ExpenseFormData) => {
      const now = new Date().toISOString();
      const expense: Expense = {
        ...data,
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
      };
      setExpenses((prev) => [expense, ...prev]);
      return expense;
    },
    [setExpenses]
  );

  const updateExpense = useCallback(
    (id: string, data: ExpenseFormData) => {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e
        )
      );
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    },
    [setExpenses]
  );

  const getExpenseById = useCallback(
    (id: string) => expenses.find((e) => e.id === id) || null,
    [expenses]
  );

  const filterExpenses = useCallback(
    (filters: ExpenseFilters) => {
      return expenses.filter((e) => {
        if (filters.startDate && e.date < filters.startDate) return false;
        if (filters.endDate && e.date > filters.endDate) return false;
        if (filters.category !== "all" && e.category !== filters.category)
          return false;
        if (filters.gstOnly === true && !e.isGstBill) return false;
        if (filters.gstOnly === false && e.isGstBill) return false;
        return true;
      });
    },
    [expenses]
  );

  const sortedExpenses = useMemo(
    () => [...expenses].sort((a, b) => b.date.localeCompare(a.date)),
    [expenses]
  );

  return {
    expenses: sortedExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    filterExpenses,
    isHydrated,
  };
}
