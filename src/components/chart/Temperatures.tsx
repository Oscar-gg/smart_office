// Give the option to change the time interval and the target users (only to admin)

import { useEffect, useState } from "react";
import { getStartAndEnd, getToday } from "~/utils/dates";
import { api } from "~/utils/api";
import Chart from "react-google-charts";
import { GrPrevious, GrNext } from "react-icons/gr";

export const options4 = {
  hAxis: {
    title: "Hora (Am a Pm)",
  },
  vAxis: {
    title: "Temperatura",
  },
  series: {
    1: { curveType: "function" },
  },
};

export const data4 = [
  ["x", "Min", "Max", "Temp"],
  [6, 16, 25, 18], //el min pues es el low range que puso el usuario basically
  [8, 16, 25, 20], //max pues max range que puso el usuario
  [10, 16, 25, 22], // y temp ya pon la info en vivo y ya. Que sea por cada 2 horas un promedio digo yo
  [12, 16, 25, 23],
  [14, 16, 25, 22],
  [16, 16, 25, 20],
  [18, 16, 25, 18],
  [20, 16, 25, 21],
];

export const Temperatures = ({ userId }: { userId: string }) => {
  const [time, setTime] = useState(getToday());

  const [useDate, setUseDate] = useState(false);

  const { data: temperatures } = api.chart.getTemperatures.useQuery({
    now: time,
  });

  const { data: getLimits } = api.chart.getLimits.useQuery({
    id: userId,
  });

  // Avoid different hours in server and component
  useEffect(() => {
    setTime(new Date());
    setUseDate(true);
  }, [useDate]);

  const handleArrowClick = (back: boolean) => {
    const change = back ? -1 : 1;
    const newTime = new Date(time);

    newTime.setDate(newTime.getDate() + change);
    setTime(newTime);
  };

  console.log("Temperatures:", temperatures);

  const chartData = temperatures
    ? temperatures.map((temp) => [
        temp.date.getHours() + temp.date.getMinutes() / 60,
        getLimits?.min,
        getLimits?.max,
        temp.temp,
      ])
    : [];

  console.log(chartData);

  return (
    <div className="flex flex-col flex-wrap bg-blue-200 rounded-md p-2">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 text-center my-2">
        <GrPrevious onClick={() => handleArrowClick(true)} />
        <p>{time.toDateString()}</p>
        <GrNext onClick={() => handleArrowClick(false)} />
      </div>

      <div className="flex flex-row flex-wrap">
        {temperatures && chartData.length > 0 ? (
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={[["x", "Min", "Max", "Temp"], ...chartData]}
            options={options4}
          />
        ) : (
          <p>No hay datos</p>
        )}
      </div>
    </div>
  );
};
