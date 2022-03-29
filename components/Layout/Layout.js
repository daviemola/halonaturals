import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="font-grotosque">
      <Head>
        <title>Halo Naturals</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
