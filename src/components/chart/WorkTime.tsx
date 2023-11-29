// Give the option to change the time interval and the target users (only to admin)

import { useEffect, useState } from "react";
import { getStartAndEnd, getToday } from "~/utils/dates";
import { api } from "~/utils/api";
import Chart from "react-google-charts";
import { GrPrevious, GrNext } from "react-icons/gr";

const chartOptions = {
  width: 500,
  legend: { position: "none" },
  chart: {
    title: "Tiempo Trabajado",
    subtitle: "Por horas",
  },
  axes: {
    x: {
      0: { side: "top", label: "Horas Trabajadas" },
    },
  },
  bar: { groupWidth: "90%" },
};

export const WorkTime = ({ userId, manyUsers }: { userId: string, manyUsers: boolean }) => {
  const [time, setTime] = useState(getToday());

  const [useDate, setUseDate] = useState(false);
  const [perMonth, setPerMonth] = useState(false); // [false, true] = [per day, per month]
  const { data } = api.chart.getWorkTime.useQuery({
    userId: userId,
    monthly: perMonth,
    time: time,
    manyUsers: manyUsers,
  });

  // Avoid different hours in server and component
  useEffect(() => {
    setTime(new Date());
    setUseDate(true);
  }, [useDate]);

  const handleArrowClick = (back: boolean) => {
    const change = back ? -1 : 1;
    const newTime = new Date(time);

    if (perMonth) {
      newTime.setMonth(newTime.getMonth() + change);
    } else {
      newTime.setDate(newTime.getDate() + 7 * change);
    }
    setTime(newTime);
  };

  const handleTimeChange = (monthly: boolean) => {
    if (monthly) {
      const newTime = new Date();
      newTime.setDate(1);
      setTime(newTime);
    } else {
      const newTime = new Date();
      const { start } = getStartAndEnd({ time: newTime, monthly: false });
      setTime(start);
    }
    setPerMonth(monthly);
  };

  const chartData: Array<[string, number]> = [];

  if (data?.xAxis)
    for (let i = 0; i < data?.xAxis?.length; i++) {
      if (data?.xAxis[i] && data?.yAxis[i])
        chartData.push([data?.xAxis[i] ?? "", data?.yAxis[i] ?? 1]);
    }

  return (
    <div className="flex flex-col flex-wrap">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 text-center">
        <GrPrevious onClick={() => handleArrowClick(true)} />
        <p>{time.toDateString()}</p>
        <GrNext onClick={() => handleArrowClick(false)} />
      </div>
      <button onClick={() => handleTimeChange(!perMonth)}>
        {perMonth ? "Ver por semana" : "Ver por mes"}
      </button>
      <div className="flex flex-row flex-wrap">
        {data && chartData.length > 0 ? (
          <Chart
            chartType="BarChart"
            data={[["Dia", "Horas"], ...chartData]}
            options={chartOptions}
            width="75%"
            height="400px"
          />
        ) : (
          <p>No hay datos</p>
        )}
      </div>
    </div>
  );
};
