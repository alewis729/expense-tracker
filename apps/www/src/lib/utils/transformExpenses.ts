import { find, isEmpty, isNil, reduce } from "lodash";
import { XLSXRow, ExpenseFields } from "@/lib/types";
import { isValid } from "date-fns";
import { currencies } from "@expense-tracker/data";

const transformExpenses = (data: Array<XLSXRow>): Array<ExpenseFields> =>
  reduce(
    data,
    (arr, current) => {
      const date = new Date(current?.date);
      const newObj = {
        name: current?.name ?? null,
        description: current?.description ?? "",
        date: isValid(date) ? date : new Date(),
        categoryId: current?.categoryId ?? null,
        amount: Number(current?.amount) ?? null,
        currencyCode: current?.currencyCode?.trim?.() ?? null,
      };

      if (
        !isEmpty(newObj.name) &&
        isValid(newObj.date) &&
        !isEmpty(newObj.categoryId) &&
        !isNil(newObj.amount) &&
        !isEmpty(
          find(currencies, ({ code }) => code === newObj.currencyCode)
        ) &&
        !isEmpty(newObj.currencyCode)
      ) {
        return [...arr, newObj];
      }

      return arr;
    },
    []
  );

export default transformExpenses;
