'use client';
import dynamic from "next/dynamic";
import React from "react";
import ParticleBackground from "./components/ParticleBackground";
import { Button } from "@/components/ui/button";

const Explorer3D = dynamic(() => import("./components/Explorer3D"), { ssr: false });

export default function Page() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <ParticleBackground />
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
          Welcome to the TOE Explorer
        </h1>
        <p className="mb-8 text-lg md:text-xl text-center max-w-3xl text-muted-foreground">
          An interactive platform for exploring and comparing Theories of Everything, metaphysical frameworks, and unification theories in an immersive 3D space.
        </p>
        <Button size="lg" className="hover-glow">
          Begin Exploration
        </Button>
      </div>
      <div className="w-full max-w-7xl mx-auto mt-12 border-t border-border pt-8">
        <Explorer3D />
      </div>
    </main>
  );
}


