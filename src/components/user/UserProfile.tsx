import { Layout } from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Chart } from "react-google-charts";
import { useState } from "react";
import { UserData } from "~/components/user/UserData";

export const UserProfile = ({ userId }: { userId: string }) => {
  const { data: userData, status } = api.user.getUserProfileById.useQuery({
    id: userId,
  });
  const [data, setData] = useState(getData);

  if (status === "loading") {
    return <p>Cargando...</p>;
  } else if (!userData) {
    return <p>Usuario no encontrado.</p>;
  }

  return <UserData defaultValues={userData} />;

  // return (
  //   <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
  //     <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
  //       <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
  //         <form action="" method="POST">
  //           <h1 className="p-5 text-center font-fancy text-3xl">Tu Perfil</h1>
  //           <div className="row p-4">
  //             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   Nombre:
  //                 </label>
  //                 <input
  //                   type="text"
  //                   name="first_name"
  //                   className="form-control m-3 rounded border-solid p-3 shadow-lg"
  //                   value={userData.name}
  //                   disabled
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   Correo:
  //                 </label>
  //                 <input
  //                   type="email"
  //                   name="email"
  //                   className="form-control m-3 rounded border-solid p-3 shadow-lg"
  //                   value={userData.email ?? "Sin correo asociado"}
  //                   disabled
  //                 ></input>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   RFID:
  //                 </label>
  //                 <input
  //                   type="tel"
  //                   name="phone"
  //                   className="form-control m-3 rounded border-solid p-3 shadow-lg"
  //                   value={userData.rfid?.id_RFID ?? "Sin RFID asociado"}
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   Temperatura Minima Preferencial:
  //                 </label>
  //                 <input
  //                   type="number"
  //                   name="mintemp"
  //                   min="16"
  //                   max="25"
  //                   className="form-control m-3 rounded border-solid p-3 shadow-lg"
  //                   value=""
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   Temperatura Maxima Preferencial:
  //                 </label>
  //                 <input
  //                   type="number"
  //                   name="maxtemp"
  //                   min="16"
  //                   max="27"
  //                   className="form-control m-3 rounded border-solid p-3 shadow-lg"
  //                   value=""
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   Fecha de Nacimiento:
  //                 </label>
  //                 <input
  //                   type="date"
  //                   name="birthday"
  //                   className="form-control m-3 p-3 shadow-lg"
  //                   value=""
  //                   required
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  //               <div className="form-group">
  //                 <label className="profile_details_text font-smart text-lg">
  //                   Genero:
  //                 </label>
  //                 <select
  //                   name="gender"
  //                   className="form-control m-3 p-3 shadow-lg"
  //                   value=""
  //                   required
  //                 >
  //                   <option value="Male">Mujer</option>
  //                   <option value="Female">Hombre</option>
  //                 </select>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="row p-4">
  //             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
  //               <div className="form-group">
  //                 <input
  //                   type="submit"
  //                   className="btn btn-success m-3 rounded-lg border-2 bg-blue-400 p-5 font-smart text-lg shadow-lg"
  //                   value="Submit"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </form>
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
