const months = [
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
  "Dic",
];

const makeTwoDigits = (d: number): string => (d < 10 ? `0${d}` : `${d}`);

const formatDate = (input: string): string => {
  const date = new Date(input);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours() + 1;
  const mins = date.getMinutes() + 1;

  const dayStr = makeTwoDigits(day);
  const hoursStr = makeTwoDigits(hours);
  const minsStr = makeTwoDigits(mins);

  const dateFormatted = `${months[month]} ${dayStr} ${year}, @${hoursStr}:${minsStr}`;

  return dateFormatted;
};

export default formatDate;
