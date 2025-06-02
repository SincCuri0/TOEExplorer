import type { Metadata } from "next";
import "../globals.css";
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "TOE Explorer | Theories of Everything Platform",
  description: "An interactive platform for exploring and comparing Theories of Everything and metaphysical frameworks.",
  keywords: "TOE, Theories of Everything, metaphysics, physics, philosophy, unification, knowledge, consciousness, cosmology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background antialiased">
        <Providers>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
