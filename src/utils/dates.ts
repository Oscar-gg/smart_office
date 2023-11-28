export const getDefaultTime = ({ date }: { date: Date | undefined | null }) => {
  let baseDate;
  if (!date) {
    baseDate = new Date();
  } else {
    baseDate = new Date(date);
  }

  const defaultDate =
    baseDate.getFullYear().toString() +
    "-" +
    (baseDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    baseDate.getDate().toString().padStart(2, "0");

  return defaultDate;
};

export const computeDate = (dateWithoutHour: string) => {
  const [year, month, day] = dateWithoutHour.split("-");

  let date;
  try {
    if (year && month && day) {
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date;
    } else throw new Error("Invalid date");
  } catch (error) {
    alert(error);
    return new Date();
  }
};
