import { find, isEmpty, map, reduce } from "lodash";
import { min, max, eachMonthOfInterval } from "date-fns";

/**
 * input:   ["2020-12-02T05:00:00.000Z", "2021-01-02T05:00:00.000Z", "2021-02-02T05:00:00.000Z",]
 * output:  [{ year: 2020, months: [11] }, { year: 2021, months: [0, 1] }]
 *
 * @param {Date[]} dates Dates
 */
const getTimeline = (dates = []) => {
  if (isEmpty(dates)) {
    return [];
  }

  const start = min(dates);
  const end = max(dates);
  const months = eachMonthOfInterval({ start, end });

  return reduce(
    months,
    (timeline, date) => {
      const month = date.getMonth();
      const year = date.getFullYear();
      const existing = find(timeline, obj => obj.year === year);

      if (!isEmpty(existing)) {
        return map(timeline, obj =>
          obj.year === year ? { year, months: [...obj.months, month] } : obj
        );
      }

      return [...timeline, { year, months: [month] }];
    },
    []
  );
};

export default getTimeline;
