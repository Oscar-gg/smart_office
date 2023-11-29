import { useState } from "react";
import { Chart } from "react-google-charts";
import { Temperature } from "~/components/chart/Temperature";
import { WorkTime } from "~/components/chart/WorkTime";
import { LightOn } from "~/components/chart/LightOn";

export const UserStatistics = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information"></div>
      </div>

      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <h1 className="p-5 text-center font-fancy text-3xl">Oficina</h1>
        <div className="chart">
          <h1 className="p-5 text-center font-fancy text-xl">
            Horas de Trabajo por semana
          </h1>
          <WorkTime userId={userId} manyUsers={false} />
          <Temperature />
          <LightOn userId={userId} />
        </div>
      </div>
    </>
  );
};

//DATA TABLE DE USUARIOS CON MAS TIEMPO////////
export const data3 = [
  [
    "Nombre",
    { type: "date", label: "Ultima Fecha de Ingreso" },
    { type: "number", label: "Tiempo" },
  ],
  [
    "Mike", //NOMBRE DE USUARIO
    new Date(2008, 1, 28, 0, 31, 26), //SQL DATA STAMP
    42, //HORA EN LA OFICINA TOTAL
  ],
  ["Bob", new Date(2007, 5, 1, 0), 78],
  ["Alice", new Date(2006, 7, 16), 65],
];

export const options3 = {
  showRowNumber: true,
  width: 400,
  legend: { position: "none" },
};

export const formatters = [
  {
    type: "DateFormat" as const,
    column: 1,
    options: {
      formatType: "long",
    },
  },
];

//CHART DE TEMPERATURA ATRAVEZ DEL DIA
export const options4 = {
  hAxis: {
    title: "Hora (Am a Pm)",
  },
  vAxis: {
    title: "Popularity",
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
