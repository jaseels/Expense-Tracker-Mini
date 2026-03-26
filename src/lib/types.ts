export type ExpenseCategory =
  | "food"
  | "transport"
  | "utilities"
  | "entertainment"
  | "healthcare"
  | "education"
  | "shopping"
  | "rent"
  | "travel"
  | "other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  isGstBill: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseFormData = Omit<Expense, "id" | "createdAt" | "updatedAt">;

export interface BudgetLimit {
  id: string;
  category: ExpenseCategory;
  limit: number;
  createdAt: string;
}

export interface ExpenseFilters {
  startDate: string | null;
  endDate: string | null;
  category: ExpenseCategory | "all";
  gstOnly: boolean | null;
}

export interface MonthlySummary {
  month: string;
  total: number;
  gstTotal: number;
  nonGstTotal: number;
  byCategory: Partial<Record<ExpenseCategory, number>>;
}
