"use client";
import { ExpenseFilters as FilterType, ExpenseCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

interface ExpenseFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

const quickDates = [
  {
    label: "This Month",
    get: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      };
    },
  },
  {
    label: "Last Month",
    get: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      };
    },
  },
  {
    label: "Last 3 Months",
    get: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
      };
    },
  },
  {
    label: "This Year",
    get: () => {
      const now = new Date();
      return {
        startDate: `${now.getFullYear()}-01-01`,
        endDate: `${now.getFullYear()}-12-31`,
      };
    },
  },
];

export function ExpenseFiltersBar({ filters, onChange }: ExpenseFiltersProps) {
  const reset = () =>
    onChange({
      startDate: null,
      endDate: null,
      category: "all",
      gstOnly: null,
    });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
        <button onClick={reset} className="text-sm text-blue-600 hover:text-blue-800">
          Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickDates.map((qd) => (
          <button
            key={qd.label}
            onClick={() => {
              const dates = qd.get();
              onChange({ ...filters, ...dates });
            }}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {qd.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
          <input
            type="date"
            value={filters.startDate || ""}
            onChange={(e) =>
              onChange({ ...filters, startDate: e.target.value || null })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
          <input
            type="date"
            value={filters.endDate || ""}
            onChange={(e) =>
              onChange({ ...filters, endDate: e.target.value || null })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              onChange({
                ...filters,
                category: e.target.value as ExpenseCategory | "all",
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">GST Status</label>
          <select
            value={filters.gstOnly === null ? "all" : filters.gstOnly ? "gst" : "non-gst"}
            onChange={(e) => {
              const val = e.target.value;
              onChange({
                ...filters,
                gstOnly: val === "all" ? null : val === "gst",
              });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All</option>
            <option value="gst">GST Only</option>
            <option value="non-gst">Non-GST Only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
