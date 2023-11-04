import Head from "next/head";
import React from "react";

export const Layout = ({
  children,
  title = "SmartOffice",
  description = "SmartOffice. Rent and share office spaces.",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <NavBar routes={routes} /> */}
      <main>{children}</main>
    </>
  );
};
