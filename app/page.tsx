'use client';
import dynamic from "next/dynamic";
import React from "react";

const Explorer3D = dynamic(() => import("./components/Explorer3D"), { ssr: false });

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">TOE Explorer 3D</h1>
      <p className="mb-8 text-lg text-center max-w-2xl">
        Explore and compare Theories of Everything, metaphysical frameworks, and unification theories in an interactive 3D space.
      </p>
      <Explorer3D />
    </main>
  );
}

