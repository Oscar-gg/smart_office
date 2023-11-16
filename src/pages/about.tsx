import { Layout } from "~/components/layout/layout";

export default function Home() {
  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
      <div className="relative h-[300px] w-full">
        <img
          src="https://www.microsoft.com/es-mx/microsoft-365/blog/wp-content/uploads/sites/27/2019/05/New-to-Microsoft-365-BANNER.png"
          alt=""
          className="m-0 h-full w-full object-cover p-0"
        />
      </div>

      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <h1 className="pl-[20%] font-smart text-7xl sm:pl-[0%]">
          ¿Quiénes Somos?
        </h1>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pt-[3%] text-justify sm:px-[25%]">
          Smart Office es una empresa líder que se especializa en la oferta de
          oficinas remotas de alta calidad, con un enfoque en la ética
          empresarial y una ubicación estratégica. Nuestra ética empresarial es
          un pilar fundamental de nuestra misión, y nos enorgullece ofrecer a
          nuestros clientes un entorno de trabajo profesional y ético.
        </p>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pt-[3%] text-justify sm:px-[25%]">
          Nuestras oficinas se encuentran en ubicaciones privilegiadas, con
          fácil acceso a servicios de transporte, restaurantes y otras
          comodidades, lo que garantiza un ambiente de trabajo conveniente y
          productivo. Creemos en la importancia de un entorno de trabajo que
          inspire la creatividad y la eficiencia, y nuestras oficinas están
          diseñadas para fomentar la colaboración y el éxito de nuestros
          clientes.
        </p>

        <p className="font-regular place-content-center items-center justify-center px-[15%] pb-[5%] pt-[3%] text-justify sm:px-[25%]">
          Además, en Smart Office, la seguridad es una prioridad. Contamos con
          sistemas de seguridad avanzados para garantizar la tranquilidad de
          nuestros usuarios y proteger sus activos. Estamos comprometidos con
          brindar un servicio de alquiler de oficinas rápido, confiable y seguro
          para satisfacer las necesidades de profesionales y empresas que buscan
          un lugar de trabajo excepcional.
        </p>
      </div>
    </Layout>
  );
}
