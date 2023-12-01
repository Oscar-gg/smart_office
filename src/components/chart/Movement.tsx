import { Chart } from "react-google-charts";
import { api } from "~/utils/api";
import { Loading } from "../general/Loading";
import { useState } from "react";

export const Movement = () => {
  const [byMonth, setByMonth] = useState(false);

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const { data: movement, status } = api.chart.getAlarmCount.useQuery({
    now: today,
    byMonth: byMonth,
  });

  const data = [
    ["Task", "Horas"],
    ["En sesión activa", movement?.alarmInSession ?? -1],
    ["En sesión inactiva", movement?.alarmOutOfSession ?? -1],
  ];

  if (status === "loading") {
    return <Loading pageName="Alarma activada" />;
  }

  return (
    <div className="m-2 flex flex-col gap-y-3 rounded-lg bg-blue-300 p-3">
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
      {!movement ||
      (movement.alarmInSession == 0 &&
        movement.alarmOutOfSession == 0) ? (
        <p>No se encontraron datos.</p>
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"400px"}
          options={{
            title: "Detección de movimiento",
          }}
        />
      )}
    </div>
  );
};
