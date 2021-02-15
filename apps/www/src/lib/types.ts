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
