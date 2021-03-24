import { filter, isEmpty, isNil } from "lodash";
import { add } from "date-fns";

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

    return true;
  };

  const isBetweenDates = date => {
    const dateTo = isNil(query.dateTo)
      ? null
      : add(query.dateTo, {
          hours: 23,
          minutes: 59,
          seconds: 59,
        });

    if (!isNil(query.dateFrom) && !isNil(dateTo)) {
      return query.dateFrom <= date && date <= dateTo;
    } else if (!isNil(query.dateFrom)) {
      return query.dateFrom <= date;
    } else if (!isNil(dateTo)) {
      return date <= dateTo;
    }

    return true;
  };

  return filter(
    payments,
    obj =>
      new RegExp(regexName, "i").test(obj.name) &&
      new RegExp(regexCurrencyCode).test(obj.currencyCode) &&
      isOfCategory(obj.category.id) &&
      isBetweenRange(obj.amount) &&
      isBetweenDates(obj.date)
  );
};

export default filterPayments;
