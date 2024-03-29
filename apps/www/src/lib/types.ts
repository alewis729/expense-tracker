// Categories
export interface CategoryFields {
  name: string;
  color: string;
}

// Expenses
export interface ExpenseFields {
  name: string;
  description: string;
  date: Date;
  categoryId: string;
  amount: number;
  currencyCode: string;
}

// Income
export type IncomeFields = ExpenseFields;

export interface XLSXRow extends ExpenseFields {
  number: string;
}

export interface SelectOption {
  value: string | number;
  label: string | number;
}

export interface Timeline {
  year: number;
  months: number[];
}

export interface ChartPayment extends Timeline {
  payments: {
    currencyCode: string;
    categories: {
      id: string;
      name: string;
      color: string | null;
      amounts: number[];
    }[];
  }[];
}

export interface FilterQuery {
  name?: string;
  currencyCode?: string;
  categoryId?: string;
  amountMin?: number;
  amountMax?: number;
  dateFrom?: Date;
  dateTo?: Date;
}
