import { find, isEmpty, map, reduce } from "lodash";

type Expenses = { currencyCode: string }[];
type Currency = {
  code: string | null;
  instances: number;
};

/**
 * Utility function that finds and returns the `currencyCode` with
 * the most coincidences from an array of expense objects that
 * contain a `currencyCode`.
 * @param expenses Array of expense objects.
 */
const getCurrencyFromExpenses = (expenses: Expenses): string | null => {
  if (isEmpty(expenses)) {
    return null;
  }

  const currencies: Currency[] = reduce(
    expenses,
    (arr, obj) => {
      const existingCurrency: Currency = find(
        arr,
        ({ code }) => code === obj?.currencyCode
      ) ?? { code: null, instances: 0 };

      if (!isEmpty(existingCurrency?.code)) {
        return map(arr, ({ code, instances }) =>
          code !== existingCurrency?.code
            ? { code, instances }
            : { code, instances: instances + 1 }
        );
      }

      return [
        ...arr,
        {
          code: obj?.currencyCode ?? "USD",
          instances: 1,
        },
      ];
    },
    []
  );

  return (
    reduce(currencies, (current, next) =>
      current?.instances > next?.instances ? current : next
    )?.code ?? null
  );
};

export default getCurrencyFromExpenses;
