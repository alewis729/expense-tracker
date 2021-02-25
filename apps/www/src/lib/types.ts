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
export interface IncomeFields {
  name: string;
  description: string;
  date: Date;
  categoryId: string;
  amount: number;
  currencyCode: string;
}

export interface XLSXRow extends ExpenseFields {
  number: string;
}
