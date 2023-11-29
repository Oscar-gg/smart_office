import { Layout } from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { UserData } from "~/components/user/UserData";
import { UserStatistics } from "./UserStatistics";

export const UserProfile = ({ userId }: { userId: string }) => {
  const { data: userData, status } = api.user.getUserProfileById.useQuery({
    id: userId,
  });

  if (status === "loading") {
    return <p>Cargando...</p>;
  } else if (!userData) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <div>
      <UserData defaultValues={userData} />
      <UserStatistics userId={userId} />
    </div>
  );

  // return (
  //   <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
  //     <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
  //       <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
  //       </div>
  //     </div>

  //     <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
  //       <h1 className="p-5 text-center font-fancy text-3xl">Oficina</h1>
  //       <div className="chart">
  //         <h1 className="p-5 text-center font-fancy text-xl">
  //           Horas de Trabajo por semana
  //         </h1>
  //         <Chart
  //           chartType="BarChart"
  //           data={[
  //             ["Move", "Percentage"],
  //             ["Lunes", 44],
  //             ["Martes", 31],
  //             ["Miercoles", 12],
  //             ["Jueves", 10],
  //             ["Viernes", 3],
  //           ]}
  //           options={{
  //             width: 500,
  //             legend: { position: "none" },
  //             chart: {
  //               title: "Tiempo Trabajado",
  //               subtitle: "Por horas",
  //             },
  //             axes: {
  //               x: {
  //                 0: { side: "top", label: "Horas Trabajadas" },
  //               },
  //             },
  //             bar: { groupWidth: "90%" },
  //           }}
  //           width="75%"
  //           height="400px"
  //         />
  //         <h1 className="p-5 text-center font-fancy text-xl">
  //           Temperatura en la Oficina
  //         </h1>
  //         <div className="flex items-center justify-center p-2">
  //           {" "}
  //           {/* Wrap the chart in a flex container */}
  //           <Chart
  //             chartType="Gauge"
  //             width="50%"
  //             height="100%"
  //             data={data}
  //             options={options}
  //           />
  //         </div>
  //         <h1 className="p-5 text-center font-fancy text-xl">Horas de Luz</h1>
  //         <div className="flex items-center justify-center p-3">
  //           <Chart
  //             chartType="PieChart"
  //             data={data2}
  //             width={"100%"}
  //             height={"400px"}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </Layout>
  // );
};
