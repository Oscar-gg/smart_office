import { signIn, signOut, useSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Head from "next/head";
import Link from "next/link";

import { Layout } from "~/components/layout/layout";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import { Temperature } from "~/components/chart/Temperature";
import { LightOn } from "../chart/LightOn";
import { WorkTime } from "../chart/WorkTime";
import { LightOnUser } from "../chart/LightOnUser";
import { Movement } from "../chart/Movement";
import { Temperatures } from "../chart/Temperatures";

///GAUGE DE TEMPERATURA
function getRandomNumber() {
  return Math.random() * 100;
}

function getData() {
  return [
    ["Label", "Value"],
    ["Temperatura", getRandomNumber()],
  ];
}

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
//CHART DE LUZ PRENDIDA/APAGADA
export const data2 = [
  ["Task", "Horas"],
  ["Luz Prendida", 11],
  ["Luz Apagada", 2],
];

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

export const AdminStatistics = () => {
  return (
    <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
      <h1 className="p-5 text-center font-fancy text-3xl">Overview</h1>
      <div className="chart">
        <h1 className="p-5 text-center font-fancy text-xl">
          Horas de Trabajo por semana en Total
        </h1>
        <WorkTime manyUsers={true} userId="-1" />

        <Temperature />

        <LightOn userId={"-1"} allUsers={true} />

        <LightOnUser />
        <Movement />
        <Temperatures/>
      </div>
    </div>
  );
};
