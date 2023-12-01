import { Chart } from "react-google-charts";
import { api } from "~/utils/api";
import { Loading } from "../general/Loading";
import { useState } from "react";

export const LightOnUser = () => {
  const [byMonth, setByMonth] = useState(false);

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const { data: lightCounts, status } = api.chart.getLightOnOffByUser.useQuery({
    now: today,
    byMonth: byMonth,
  });

  const entriesOn = lightCounts?.graphOn
    ? lightCounts.graphOn
    : ["Cargando", 1];
  const entriesOff = lightCounts?.graphOff
    ? lightCounts.graphOff
    : ["Cargando", 1];

  const dataOn = [["Task", "Horas"], ...entriesOn];
  const dataOff = [["Task", "Horas"], ...entriesOff];

  if (status === "loading") {
    return <Loading pageName="Luces prendidas por usuario." />;
  }

  return (
    <div className="flex flex-col gap-y-6 bg-blue-300 p-2 rounded-lg">
      <div className="flex flex-row flex-wrap  justify-around gap-x-4 ">
        <button
          className="rounded-full bg-slate-300 p-2"
          onClick={() => {
            setByMonth(true);
          }}
        >
          Ver último mes
        </button>
        <button
          className="rounded-full bg-slate-300 p-2"
          onClick={() => {
            setByMonth(false);
          }}
        >
          Ver última semana
        </button>
      </div>

      {dataOn && (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Cargando gráfica</div>}
          data={dataOn}
          options={{
            title: "Luces prendidas por usuario (al salir de oficina)",
          }}
        />
      )}
      {dataOff && (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Cargando gráfica</div>}
          data={dataOff}
          options={{
            title: "Luces apagadas por usuario (al salir de oficina)",
          }}
        />
      )}
    </div>
  );
};
