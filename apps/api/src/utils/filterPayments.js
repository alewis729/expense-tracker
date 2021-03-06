import { filter, isEmpty } from "lodash";

const filterPayments = (payments = [], query = {}) => {
  if (isEmpty(query)) {
    return payments;
  }

  const regexName = !isEmpty(query.name) ? query.name : "";
  const regexCurrencyCode = !isEmpty(query.currencyCode)
    ? query.currencyCode
    : "";

  const isOfCategory = categoryId =>
    !isEmpty(query.categoryId) ? query.categoryId === categoryId : true;

  const isBetweenRange = amount => {
    if (query.amountMin > 0 && query.amountMax > 0) {
      return amount >= query.amountMin && amount <= query.amountMax;
    } else if (query.amountMax > 0) {
      return amount <= query.amountMax;
    } else if (query.amountMin > 0) {
      return amount >= query.amountMin;
    }

    return false;
  };

  return filter(
    payments,
    obj =>
      new RegExp(regexName, "i").test(obj.name) &&
      new RegExp(regexCurrencyCode).test(obj.currencyCode) &&
      isOfCategory(obj.category.id) &&
      isBetweenRange(obj.amount)
  );
};

export default filterPayments;
