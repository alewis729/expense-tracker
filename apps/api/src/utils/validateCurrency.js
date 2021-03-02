import { find, isEmpty } from "lodash";
import { currencies } from "@expense-tracker/data";

const validateCurrency = (currencyCode = null) => {
  if (isEmpty(find(currencies, ({ code }) => code === currencyCode))) {
    throw new Error(`Currency code '${currencyCode}' is invalid.`);
  }
};

export default validateCurrency;
