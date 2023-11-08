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
    { name: "Renta", path: "/renta" },
    { name: "Services", path: "/services" },
    {
      name: "About",
      path: "https://github.com/Oscar-gg/smart_office",
      target: "_blank" as const,
    },
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
      </Head>
      <NavBar routes={routes} />
      <main>{children}</main>
    </>
  );
};
