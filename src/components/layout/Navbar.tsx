"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useExpenseContext } from "@/context/ExpenseContext";
import { CURRENCIES, CurrencyCode } from "@/lib/constants";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/add", label: "Add Expense" },
  { href: "/budgets", label: "Budgets" },
];

export function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useExpenseContext();

  return (
    <nav className="bg-white border-b border-gray-200 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Expense Tracker
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="ml-3 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
