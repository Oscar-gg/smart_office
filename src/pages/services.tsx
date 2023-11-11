import Link from "next/link";
import { Layout } from "~/components/layout/layout";

export default function Home() {
  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
      <div className="relative h-[300px] w-full">
        <img
          src="https://www.cohesity.com/wp-content/new_media/2020/09/it-best-practices-for-a-fully-remote-workforce-banner-1.png"
          alt=""
          className="m-0 h-full w-full object-cover p-0"
        />
      </div>

      <div className="container mt-5 flex max-w-[100%] flex-col items-center justify-center">
        <h1 className="text-center font-smart text-7xl">Servicios</h1>

        <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 md:gap-8">
          <img
            className="p-[5%] sm:mt-[-2%] sm:p-[5%]"
            src="https://images.steelcase.com/image/upload/c_fill,q_auto,f_auto,h_656,w_1166/v1632763487/www.steelcase.com/2021/09/27/21-0161719_16x9.jpg"
            alt=""
          />

          <Link
            className="flex max-w-full flex-col gap-4 bg-white p-4 text-black hover:bg-[#293b5a]/5 sm:w-max"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <div className="sm:justify-start sm:pt-[10%]">
              <h2 className="pt-3 text-center font-smart text-3xl">
                Oficina Individual
              </h2>

              <p className="font-regular px-[15%] pt-[3%] text-center text-justify sm:px-[15%]">
                Una oficina individual con acceso fácil es un espacio de trabajo
                que brinda comodidad y eficiencia a profesionales que buscan un
                entorno productivo. Su ubicación estratégica en el centro de la
                ciudad o en un distrito comercial de renombre facilita la
                llegada de los empleados y clientes, lo que ahorra tiempo y
                energía en desplazamientos. Además, la proximidad de
                restaurantes de calidad ofrece opciones para comer fuera o
                disfrutar de un descanso agradable sin alejarse demasiado. La
                renta remota y el proceso de verificación simplificado hacen que
                obtener una oficina en este espacio sea rápido y conveniente,
                sin la necesidad de trámites complicados.
              </p>

              <p className="font-regular sm:px-[15%]] px-[15%] pb-[5%] pt-[3%] text-center text-justify">
                La seguridad es una prioridad en esta oficina individual. Con
                sistemas de control de acceso, cámaras de vigilancia y personal
                de seguridad altamente capacitado, puedes trabajar con
                tranquilidad sabiendo que tus activos y datos están protegidos.
                Además, el clima es personalizable para adaptarse a tus
                preferencias, permitiéndote crear un ambiente de trabajo que te
                resulte cómodo y productivo durante todo el año.
              </p>

              <p className="font-regular sm:px-[15%]] px-[15%] pb-[5%] text-center text-justify">
                Para mantener un alto nivel de productividad, la oficina
                individual también cuenta con un rastreador de productividad.
                Este sistema te ayuda a realizar un seguimiento de tus tareas y
                metas, lo que te permite mantener un control constante de tus
                avances y ajustar tu enfoque según sea necesario. En resumen,
                esta oficina individual ofrece un entorno de trabajo
                conveniente, seguro y personalizado, diseñado para optimizar la
                productividad y satisfacer las necesidades de profesionales de
                todos los sectores.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
