import Head from "next/head";
import { NavBar } from "~/components/layout/Navbar";
import React from "react";

export const Layout = ({
  children,
  title = "Smart Office",
  description = "Smart Office",
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
    {name: "About", path: "/about" },
    {name: "Perfil", path: "/perfil" },
    {name: "Admin ", path: "/Admin" },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
          className={mainClassName}
        />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Genos:wght@600&family=Playfair+Display&family=Raleway&family=Roboto+Condensed&display=swap" rel="stylesheet"/>

      </Head>
      <NavBar routes={routes} />
      <main>{children}</main>
    </>
  );
};
