import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/layout";

export default function Home() {
  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
 <div className="w-full h-[300px] relative">
    <img src="https://www.microsoft.com/es-mx/microsoft-365/blog/wp-content/uploads/sites/27/2019/05/New-to-Microsoft-365-BANNER.png" alt="" className="w-full h-full object-cover p-0 m-0" />
</div>

<div className="container flex flex-col items-center justify-center mt-5 max-w-[100%]">
    <h1 className="text-7xl font-smart text-center">Servicios</h1>


    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 items-center justify-center">
          <img className="sm:p-[5%] sm:mt-[-2%]"
            src="https://www.decorilla.com/online-decorating/wp-content/uploads/2023/02/Home-office-inspiration-by-Annie-L.jpg"
            alt=""
          />

          <Link
            className="flex max-w-full flex-col gap-4 bg-white p-4 text-black hover:bg-[#293b5a]/5 sm:w-max"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            
            <div className="sm:pt-[10%] sm:justify-start">
            <h2 className="text-3xl font-smart pt-3 text-center">Oficina Individual</h2>
       
            <p className="font-regular text-justify px-[15%] sm:px-[15%] text-center pt-[3%]">
                Una oficina individual con acceso fácil es un espacio de trabajo que brinda comodidad y eficiencia a profesionales que buscan un entorno productivo. Su ubicación estratégica en el centro de la ciudad o en un distrito comercial de renombre facilita la llegada de los empleados y clientes, lo que ahorra tiempo y energía en desplazamientos. Además, la proximidad de restaurantes de calidad ofrece opciones para comer fuera o disfrutar de un descanso agradable sin alejarse demasiado. La renta remota y el proceso de verificación simplificado hacen que obtener una oficina en este espacio sea rápido y conveniente, sin la necesidad de trámites complicados.
            </p>

            <p className="font-regular text-justify px-[15%] sm:px-[15%]] text-center pt-[3%] pb-[5%]">
                La seguridad es una prioridad en esta oficina individual. Con sistemas de control de acceso, cámaras de vigilancia y personal de seguridad altamente capacitado, puedes trabajar con tranquilidad sabiendo que tus activos y datos están protegidos. Además, el clima es personalizable para adaptarse a tus preferencias, permitiéndote crear un ambiente de trabajo que te resulte cómodo y productivo durante todo el año.
            </p>

            <p className="font-regular text-justify px-[15%] sm:px-[15%]] text-center pb-[5%]">
                Para mantener un alto nivel de productividad, la oficina individual también cuenta con un rastreador de productividad. Este sistema te ayuda a realizar un seguimiento de tus tareas y metas, lo que te permite mantener un control constante de tus avances y ajustar tu enfoque según sea necesario. En resumen, esta oficina individual ofrece un entorno de trabajo conveniente, seguro y personalizado, diseñado para optimizar la productividad y satisfacer las necesidades de profesionales de todos los sectores.
            </p>
        </div>
            
          </Link>
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
