import { isNil } from "lodash";

interface Props {
  date?: Date | null;
  index?: number | null;
  abrev?: boolean | null;
}
type Func<P> = (props: P) => string;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthAbrevs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getMonthName: Func<Props> = ({
  date = null,
  index = null,
  abrev = false,
}) => {
  const i = (isNil(date) ? index : date.getMonth()) as number;
  return !abrev ? monthNames[i] : monthAbrevs[i];
};

export default getMonthName;
