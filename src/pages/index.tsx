import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/layout";

export default function Home() {
  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 sm:py-8 max-w-[100%]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="items-center text-center">
            {/* <img className="h-auto w-[65%] ml-[20%]" src="https://39514401.fs1.hubspotusercontent-na1.net/hubfs/39514401/logosmartoffice.png" alt="" /> */}
            <h1 className="text-blue font-smart ml-[5%] mt-[15%] pt-6 text-7xl tracking-tight sm:text-[6rem]">
              Smart Office
            </h1>
            <p className="font-fancy pt-[7%] text-center text-2xl ">
              {" "}
              Rentar oficinas desde tu teléfono: fácil y rápido.{" "}
            </p>
          </div>

          <img
            className="w-30 mr-[65%] h-auto"
            src="https://images.livspace-cdn.com/plain/https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2023/05/23163145/modern-office-interior-design-with-partition-plants.jpg"
            alt=""
          />
        </div>

        <h1 className="font-smart text-4xl"> Oficinas Disponibles </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 items-center justify-center">
          <img className=""
            src="https://www.decorilla.com/online-decorating/wp-content/uploads/2023/02/Home-office-inspiration-by-Annie-L.jpg"
            alt=""
          />

          <Link
            className="flex max-w-full flex-col gap-4 bg-white p-4 text-black hover:bg-[#293b5a]/5 lg:max-w-[60%]"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="font-smart text-2xl font-bold">
              {" "}
              Oficina Individual
            </h3>
            <div className="font-regular text-lg">
              Disfruta de la comodidad y la productividad en nuestra oficina
              individual, diseñada para ofrecerte un espacio tranquilo y
              acogedor. Esta oficina cuenta con su propio sistema de
              climatización para que puedas ajustar la temperatura a tu
              preferencia y trabajar en un entorno agradable en cualquier
              temporada. Equipada con una computadora de alto rendimiento, todo
              lo que necesitas para tu trabajo está al alcance de tu mano.
              Nuestra ubicación privilegiada te brinda acceso a una cafetería
              cercana, donde puedes disfrutar de bebidas y alimentos deliciosos
              en tus momentos de descanso.
            </div>
          </Link>
        </div>

            <h1 className="font-smart text-4xl"> Ubicacion </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 items-center justify-center">
            <img className=""
            src="https://images.adsttc.com/media/images/5527/0ecb/e58e/cecd/8200/018a/newsletter/portada_3E7E0815.jpg?1428623043"
            alt=""
          />
            <iframe className="sm:w-800 sm:h-650 w-[100%] h-[100%]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.750981344727!2d-100.25250232396829!3d25.579950277466466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c751f458e7fd%3A0xd3518cea83c18fd6!2sWorkaccess!5e0!3m2!1sen!2smx!4v1699574138045!5m2!1sen!2smx" loading="lazy"></iframe>
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
