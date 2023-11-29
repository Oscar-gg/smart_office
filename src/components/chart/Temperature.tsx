import { Chart } from "react-google-charts";
import { api } from "~/utils/api";
import { Loading } from "../general/Loading";

const options = {
  width: 400,
  height: 120,
  greenFrom: 0, //aqui va el clima perfecto, usalo como el chart de arduino basicamente
  greenTo: 15, //maximo de su oreferencia
  redFrom: 50, //lo nas caliente
  redTo: 100, //lo que haga calor maximo
  yellowFrom: 35, //lo de la temperatura fria
  yellowTo: 50, //temp fria
  minorTicks: 5, //aqui pones la temp actual
};

export const Temperature = () => {
  const { data: temperature, status } = api.chart.getTemperature.useQuery();

  const data = [
    ["Label", "Value"],
    ["Temperatura", temperature?.temp_registered ?? -1],
  ];

  if (status === "loading") {
    return <Loading pageName="Temperatura" />;
  } else if (!temperature) {
    return <p>No se pudo encontrar una temperatura.</p>;
  }

  return (
    <>
      <h1 className="p-5 text-center font-fancy text-xl">
        Temperatura en la Oficina
      </h1>
      <div className="flex items-center justify-center p-2">
        <Chart
          chartType="Gauge"
          width="50%"
          height="100%"
          data={data}
          options={options}
        />
      </div>
    </>
  );
};
