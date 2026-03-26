"use client";
import { createContext, useContext, ReactNode, useCallback } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { useBudgets } from "@/hooks/useBudgets";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  STORAGE_KEYS,
  CURRENCIES,
  DEFAULT_CURRENCY,
  CurrencyCode,
} from "@/lib/constants";

type ExpenseContextType = ReturnType<typeof useExpenses> &
  ReturnType<typeof useBudgets> & {
    currency: CurrencyCode;
    currencySymbol: string;
    setCurrency: (code: CurrencyCode) => void;
    formatAmount: (amount: number) => string;
  };

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const expenseState = useExpenses();
  const budgetState = useBudgets();
  const [currency, setCurrencyValue] = useLocalStorage<CurrencyCode>(
    STORAGE_KEYS.CURRENCY,
    DEFAULT_CURRENCY
  );

  const currencySymbol =
    CURRENCIES.find((c) => c.code === currency)?.symbol || "₹";

  const setCurrency = useCallback(
    (code: CurrencyCode) => setCurrencyValue(code),
    [setCurrencyValue]
  );

  const formatAmount = useCallback(
    (amount: number) => `${currencySymbol}${amount.toFixed(2)}`,
    [currencySymbol]
  );

  return (
    <ExpenseContext.Provider
      value={{
        ...expenseState,
        ...budgetState,
        currency,
        currencySymbol,
        setCurrency,
        formatAmount,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within ExpenseProvider");
  }
  return context;
}
