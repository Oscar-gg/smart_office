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
    <h1 className="text-7xl font-smart pl-[20%] sm:pl-[0%]">¿Quiénes Somos?</h1>
    

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%]">
    Smart Office es una empresa líder que se especializa en la oferta de oficinas remotas de alta calidad, con un enfoque en la ética empresarial y una ubicación estratégica. Nuestra ética empresarial es un pilar fundamental de nuestra misión, y nos enorgullece ofrecer a nuestros clientes un entorno de trabajo profesional y ético.
    </p>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%]">
    Nuestras oficinas se encuentran en ubicaciones privilegiadas, con fácil acceso a servicios de transporte, restaurantes y otras comodidades, lo que garantiza un ambiente de trabajo conveniente y productivo. Creemos en la importancia de un entorno de trabajo que inspire la creatividad y la eficiencia, y nuestras oficinas están diseñadas para fomentar la colaboración y el éxito de nuestros clientes.
    </p>

    <p className="font-regular text-justify items-center justify-center px-[15%] sm:px-[25%] place-content-center pt-[3%] pb-[5%]">
    Además, en Smart Office, la seguridad es una prioridad. Contamos con sistemas de seguridad avanzados para garantizar la tranquilidad de nuestros usuarios y proteger sus activos. Estamos comprometidos con brindar un servicio de alquiler de oficinas rápido, confiable y seguro para satisfacer las necesidades de profesionales y empresas que buscan un lugar de trabajo excepcional.
    </p>
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
