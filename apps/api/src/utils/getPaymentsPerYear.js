import { map, reduce, find, findIndex, isEmpty, round } from "lodash";

const getPaymentsPerYear = ({ payments = {}, timeline }) =>
  reduce(
    payments,
    (arr, payment) => {
      const year = payment.date.getFullYear();
      const month = payment.date.getMonth();
      const timelineYear = find(timeline, obj => obj.year === year);
      const months = !isEmpty(timelineYear) ? timelineYear.months : [];
      const amounts = map(months, i => (i === month ? payment.amount : 0));
      const categoryLabel = payment.category.name;
      const existingYear = find(arr, obj => obj.year === year);
      const newPayment = {
        currencyCode: payment.currencyCode,
        categories: [
          { label: "All categories", amounts },
          { label: categoryLabel, amounts },
        ],
      };

      if (!isEmpty(existingYear)) {
        let existingPayment = find(
          existingYear.payments,
          obj => obj.currencyCode === payment.currencyCode
        );

        if (!isEmpty(existingPayment)) {
          const existingCategory = find(
            existingPayment.categories,
            obj => obj.label === categoryLabel
          );
          const currentMonthIndex = findIndex(months, i => i === month);

          // update 'All categories' amounts
          existingPayment.categories[0].amounts = map(
            existingPayment.categories[0].amounts,
            (amount, i) =>
              i === currentMonthIndex
                ? round(amount + payment.amount, 2)
                : amount
          );

          if (!isEmpty(existingCategory)) {
            existingPayment.categories = map(existingPayment.categories, obj =>
              obj.label === existingCategory.label
                ? {
                    ...obj,
                    amounts: map(obj.amounts, (amount, i) =>
                      i === currentMonthIndex
                        ? round(amount + payment.amount, 2)
                        : amount
                    ),
                  }
                : obj
            );

            return map(arr, obj =>
              obj.year === year
                ? {
                    ...obj,
                    payments: map(obj.payments, payment =>
                      payment.currencyCode === existingPayment.currencyCode
                        ? existingPayment
                        : payment
                    ),
                  }
                : obj
            );
          }

          // add new category
          existingPayment.categories.push({ label: categoryLabel, amounts });

          return map(arr, obj =>
            obj.year === year
              ? {
                  ...obj,
                  payments: map(obj.payments, payment =>
                    payment.currencyCode === existingPayment.currencyCode
                      ? existingPayment
                      : payment
                  ),
                }
              : obj
          );
        }

        return map(arr, obj =>
          obj.year === year
            ? { ...obj, payments: [...obj.payments, newPayment] }
            : obj
        );
      }

      const newYear = {
        year,
        months,
        payments: [newPayment],
      };

      return [...arr, newYear];
    },
    []
  );

export default getPaymentsPerYear;
