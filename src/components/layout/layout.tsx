import Head from "next/head";
import { NavBar } from "~/components/layout/Navbar";
import React from "react";

export const Layout = ({
  children,
  title = "Smart Office (IOT project)",
  description = "Smart Office. (School IOT project)",
  mainClassName = "",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  mainClassName?: string;
}) => {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Perfil", path: "/perfil", visibility: "authenticated" },
    { name: "Admin", path: "/admin", visibility: "admin" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Genos:wght@600&family=Playfair+Display&family=Raleway&family=Roboto+Condensed&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar routes={routes} />
      <main className={mainClassName}>{children}</main>
    </>
  );
};
