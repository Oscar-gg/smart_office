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

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Returns the first the ends of the weeks of the month
export const getWeeksEndsOfMonth = (date: Date) => {
  // Clone the date to avoid modifying the original object
  const currentDate = new Date(date);

  // Set the date to the first day of the month
  currentDate.setDate(1);

  // Determine the number of days in the month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  // Initialize an array to store the end dates of each week
  const weekEnds = [];

  // Loop through the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Set the current date to the current day of the month
    currentDate.setDate(day);

    // Check if the current day is a Saturday or the last day of the month
    if (currentDate.getDay() === 6 || day === daysInMonth) {
      // If so, set the time to the end of the day
      currentDate.setHours(23, 59, 59, 999);

      // Add a clone of the current date to the array
      weekEnds.push(new Date(currentDate));
    }
  }

  return weekEnds;
};

// Note: assumes that time recieved is the start of the day (to handle client timezone)
export const getStartAndEnd = ({
  time,
  monthly,
}: {
  time: Date;
  monthly: boolean;
}) => {
  if (monthly) {
    const start = new Date(time.getFullYear(), time.getMonth(), 1);
    const end = new Date(time.getFullYear(), time.getMonth() + 1, 0);
    return { start, end };
  } else {
    const start = new Date(time);

    const daysUntilMonday = (start.getDay() + 7 - 1) % 7;
    start.setDate(start.getDate() - daysUntilMonday);

    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }
};

type GroupByTimeProps = {
  x: Date;
  y: number;
};

export const groupByTime = ({
  data,
  byMonth,
}: {
  data: GroupByTimeProps[];
  byMonth: boolean;
}) => {
  if (!data[0]) return;

  if (byMonth) {
    const endOfMonths = getWeeksEndsOfMonth(data[0].x);
    const result: number[] = Array(endOfMonths.length).fill(0);

    for (const item of data) {
      for (let i = 0; i < endOfMonths.length; i++) {
        const t = endOfMonths[i];
        if (!t) continue;
        if (item.x.getTime() <= t.getTime()) {
          result[i] += item.y;
          break;
        }
      }
    }
    const xAxis = [];
    for (let i = 0; i < endOfMonths.length; i++) {
      const t = endOfMonths[i];
      if (!t) continue;
      xAxis.push(`Semana ${i + 1}`);
    }

    return {
      yAxis: result,
      xAxis,
    };
    
  } else {
    const result: number[] = Array(7).fill(0);

    for (const item of data) {
      const day = item.x.getDay();
      result[day] += item.y;
    }
    const xAxis = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    return {
      yAxis: result,
      xAxis,
    };
  }
};
