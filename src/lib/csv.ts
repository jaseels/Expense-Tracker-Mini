import { Expense } from "./types";
import { CATEGORIES } from "./constants";

function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function generateCsv(expenses: Expense[], currencySymbol: string = "₹"): string {
  const header = "Date,Amount,Currency,Category,Description,GST Bill";
  const rows = expenses.map((e) => {
    const categoryLabel =
      CATEGORIES.find((c) => c.value === e.category)?.label || e.category;
    return [
      e.date,
      e.amount.toFixed(2),
      currencySymbol,
      escapeCsvField(categoryLabel),
      escapeCsvField(e.description),
      e.isGstBill ? "Yes" : "No",
    ].join(",");
  });
  return [header, ...rows].join("\n");
}

export function downloadCsv(expenses: Expense[], currencySymbol: string = "₹", filename?: string) {
  const csv = generateCsv(expenses, currencySymbol);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
