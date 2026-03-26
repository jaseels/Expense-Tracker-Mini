import { ExpenseFormData } from "./types";

export function validateExpense(data: ExpenseFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.amount || data.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!data.category) {
    errors.category = "Please select a category";
  }

  if (!data.date) {
    errors.date = "Please select a date";
  }

  if (!data.description.trim()) {
    errors.description = "Please enter a description";
  }

  return errors;
}
