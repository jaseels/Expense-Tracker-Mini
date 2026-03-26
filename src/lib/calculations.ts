import { Expense, ExpenseCategory, MonthlySummary } from "./types";

export function getMonthKey(date: string): string {
  return date.slice(0, 7); // "YYYY-MM"
}

export function getCurrentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

export function getMonthlyTotal(expenses: Expense[], month: string): number {
  return expenses
    .filter((e) => getMonthKey(e.date) === month)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getGstSplit(expenses: Expense[]): {
  gstTotal: number;
  nonGstTotal: number;
} {
  return expenses.reduce(
    (acc, e) => {
      if (e.isGstBill) {
        acc.gstTotal += e.amount;
      } else {
        acc.nonGstTotal += e.amount;
      }
      return acc;
    },
    { gstTotal: 0, nonGstTotal: 0 }
  );
}

export function getCategoryTotals(
  expenses: Expense[]
): { category: ExpenseCategory; total: number }[] {
  const map: Partial<Record<ExpenseCategory, number>> = {};
  for (const e of expenses) {
    map[e.category] = (map[e.category] || 0) + e.amount;
  }
  return Object.entries(map).map(([category, total]) => ({
    category: category as ExpenseCategory,
    total: total as number,
  }));
}

export function getMonthlySummaries(expenses: Expense[]): MonthlySummary[] {
  const map = new Map<string, MonthlySummary>();

  for (const e of expenses) {
    const month = getMonthKey(e.date);
    if (!map.has(month)) {
      map.set(month, {
        month,
        total: 0,
        gstTotal: 0,
        nonGstTotal: 0,
        byCategory: {},
      });
    }
    const summary = map.get(month)!;
    summary.total += e.amount;
    if (e.isGstBill) {
      summary.gstTotal += e.amount;
    } else {
      summary.nonGstTotal += e.amount;
    }
    summary.byCategory[e.category] =
      (summary.byCategory[e.category] || 0) + e.amount;
  }

  return Array.from(map.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}

export function getExpensesForMonth(
  expenses: Expense[],
  month: string
): Expense[] {
  return expenses.filter((e) => getMonthKey(e.date) === month);
}
