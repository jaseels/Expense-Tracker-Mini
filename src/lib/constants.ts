import { ExpenseCategory } from "./types";

export const STORAGE_KEYS = {
  EXPENSES: "expense-tracker:expenses",
  BUDGETS: "expense-tracker:budgets",
  CURRENCY: "expense-tracker:currency",
} as const;

export const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

export const CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transport" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "shopping", label: "Shopping" },
  { value: "rent", label: "Rent" },
  { value: "travel", label: "Travel" },
  { value: "other", label: "Other" },
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  food: "#ef4444",
  transport: "#f97316",
  utilities: "#eab308",
  entertainment: "#22c55e",
  healthcare: "#06b6d4",
  education: "#3b82f6",
  shopping: "#8b5cf6",
  rent: "#ec4899",
  travel: "#14b8a6",
  other: "#6b7280",
};
