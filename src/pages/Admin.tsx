import { signIn, signOut, useSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Head from "next/head";
import Link from "next/link";

import { Layout } from "~/components/layout/layout";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";

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
  greenFrom: 0,
  greenTo: 15,
  redFrom: 50,
  redTo: 100,
  yellowFrom: 35,
  yellowTo: 50,
  minorTicks: 5,
};

export const data2 = [
	["Task", "Horas"],
	["Luz Prendida", 11],
	["Luz Apagada", 2],
	
  ];
  



export default function Home() {
  const [data, setData] = useState(getData);

  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
      å

      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <h1 className="p-5 text-center font-fancy text-3xl">Oficina</h1>
        <div className="chart">
          <h1 className="p-5 text-center font-fancy text-xl">
            Horas de Trabajo por semana
          </h1>
          <Chart
            chartType="BarChart"
            data={[
              ["Move", "Percentage"],
              ["Lunes", 44],
              ["Martes", 31],
              ["Miercoles", 12],
              ["Jueves", 10],
              ["Viernes", 3],
            ]}
            options={{
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
            }}
            width="75%"
            height="400px"
          />
		 <h1 className="p-5 text-center font-fancy text-xl">Temperatura en la Oficina</h1>
          <div className="flex items-center justify-center p-2">
            {" "}
            {/* Wrap the chart in a flex container */}
            <Chart
              chartType="Gauge"
				width="50%"
              height="100%"
              data={data}
              options={options}
            />
          </div>
		  <h1 className="p-5 text-center font-fancy text-xl">Horas de Luz</h1>
		  <div className="flex items-center justify-center p-3">
		
		  <Chart
				chartType="PieChart"
				data={data2}
				width={"100%"}
				height={"400px"}
			/>
		  </div>
        </div>
      </div>
    </Layout>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
