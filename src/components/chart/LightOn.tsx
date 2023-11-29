import { Chart } from "react-google-charts";
import { api } from "~/utils/api";
import { Loading } from "../general/Loading";
import { useState } from "react";

export const LightOn = ({
  userId,
  allUsers,
}: {
  userId: string;
  allUsers?: boolean;
}) => {
  const [byMonth, setByMonth] = useState(false);

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const { data: lightCounts, status } = api.chart.getLightOnOff.useQuery({
    id: userId,
    allUsers: allUsers,
    now: today,
    byMonth: byMonth,
  });

  const data = [
    ["Task", "Horas"],
    ["Luz Prendida", lightCounts?.lightOn ?? -1],
    ["Luz Apagada", lightCounts?.lightOff ?? -1],
  ];

  if (status === "loading") {
    return <Loading pageName="Luces prendidas" />;
  }

  console.log("DATA:", lightCounts);

  return (
    <>
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
      {!lightCounts ||
      (lightCounts.lightOff == 0 && lightCounts.lightOn == 0) ? (
        <p>No se encontraron datos.</p>
      ) : (
        <Chart
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"400px"}
          options={{ title: "Estado de luces al salir de oficina" }}
        />
      )}
    </>
  );
};
