import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <section className="text-gray-400">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center">
          <Image src="/halologo.svg" height={200} width={400} alt="logo" />
        </div>
      </div>
    </section>
  );
}
