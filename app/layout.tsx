import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AquaEnergy AI — Energioptimalisering for oppdrett",
  description: "Plug & Play sensorpakker + AI for energibesparelse. Sanntids overvåking og optimalisering for akvakulturanlegg.",
  keywords: "akvakultur, energibesparelse, sensorovervåkning, AI, oppdrett, energistyring",
  openGraph: {
    title: "AquaEnergy AI — Energioptimalisering for oppdrett",
    description: "Plug & Play sensorpakker + AI for energibesparelse",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

