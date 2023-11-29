import { signIn, signOut, useSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Head from "next/head";
import Link from "next/link";

import { Layout } from "~/components/layout/layout";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import { Session } from "next-auth";
import { compareRole } from "~/utils/role";
import { useRouter } from "next/router";
import { Loading } from "~/components/general/Loading";
import { UserProfile } from "~/components/user/UserProfile";

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

const PageContent = ({
  session,
  id,
  status,
}: {
  session: Session | undefined | null;
  id: string;
  status: string;
}) => {
  if (status === "loading") {
    return <Loading pageName="Página de usuario" />;
  }

  if (!session && id === "") {
    return (
      <>
        <h1>No has iniciado sesión</h1>
        <div className="text-2xl">
          <p>Inicia sesión para ver tu perfil.</p>
        </div>
      </>
    );
  } else if (!session && id !== "") {
    return (
      <>
        <h1>No has iniciado sesión</h1>
        <div className="text-2xl">
          <p>Inicia sesión para ver la información del perfil.</p>
        </div>
      </>
    );
  } else if (session && (id === session.user.id || id === "")) {
    return (
      <>
        <h1 className="p-5 text-center font-fancy text-3xl">Tu Perfil</h1>
        <UserProfile userId={session?.user?.id ?? ""} />
      </>
    );
  } else if (session && id !== session.user.id) {
    if (compareRole({ requiredRole: "admin", userRole: session.user.role })) {
      return (
        <>
          <h1 className="p-5 text-center font-fancy text-3xl">
            Información del perfil
          </h1>
          <UserProfile userId={id} />
        </>
      );
    } else
      return (
        <>
          <h1>No tienes acceso a la información de este perfil</h1>
          <div className="text-2xl">
            Inicia sesión con una cuenta de administrador para ver la
            información.
          </div>
        </>
      );
  }
};

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(getData);

  const userId = router.query?.userid?.[0] ? router.query?.userid[0] : "";

  return (
    <Layout>
      <PageContent session={session} id={userId} status={status} />
    </Layout>
  );

  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
          <form action="" method="POST">
            <h1 className="p-5 text-center font-fancy text-3xl">Tú Perfil</h1>
            <div className="row p-4">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control m-3 rounded border-solid p-3 shadow-lg"
                    value=""
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    Correo:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control m-3 rounded border-solid p-3 shadow-lg"
                    value=""
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    RFID:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control m-3 rounded border-solid p-3 shadow-lg"
                    value=""
                  />
                </div>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    Temperatura Minima Preferencial:
                  </label>
                  <input
                    type="number"
                    name="mintemp"
                    min="16"
                    max="25"
                    className="form-control m-3 rounded border-solid p-3 shadow-lg"
                    value=""
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    Temperatura Maxima Preferencial:
                  </label>
                  <input
                    type="number"
                    name="maxtemp"
                    min="16"
                    max="27"
                    className="form-control m-3 rounded border-solid p-3 shadow-lg"
                    value=""
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    className="form-control m-3 p-3 shadow-lg"
                    value=""
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text font-smart text-lg">
                    Genero:
                  </label>
                  <select
                    name="gender"
                    className="form-control m-3 p-3 shadow-lg"
                    value=""
                    required
                  >
                    <option value="Male">Mujer</option>
                    <option value="Female">Hombre</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row p-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-success m-3 rounded-lg border-2 bg-blue-400 p-5 font-smart text-lg shadow-lg"
                    value="Submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

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
          <h1 className="p-5 text-center font-fancy text-xl">
            Temperatura en la Oficina
          </h1>
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
