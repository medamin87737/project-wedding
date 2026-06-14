import type { Metadata } from "next";
import {
  Amiri,
  Cormorant_Garamond,
  Great_Vibes,
  Scheherazade_New,
} from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

const COUPLE_IMAGE = "/ornaments/f540142b-7954-4e65-bba5-f0a18e50739f.jpg";

export const metadata: Metadata = {
  title: "Hamza & Yosser — Invitation de Mariage",
  description:
    "Invitation digitale de mariage — Hamza & Yosser. Confirmez votre présence.",
  icons: {
    icon: [{ url: COUPLE_IMAGE, type: "image/jpeg" }],
    apple: [{ url: COUPLE_IMAGE, type: "image/jpeg" }],
  },
  openGraph: {
    title: "Hamza & Yosser — Invitation de Mariage",
    description: "Vous êtes invités à célébrer notre union",
    type: "website",
    images: [
      {
        url: COUPLE_IMAGE,
        width: 1200,
        height: 1600,
        alt: "Hamza & Yosser — Photo de mariage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza & Yosser — Invitation de Mariage",
    description: "Vous êtes invités à célébrer notre union",
    images: [COUPLE_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      dir="auto"
      className={`${greatVibes.variable} ${cormorant.variable} ${amiri.variable} ${scheherazade.variable}`}
    >
      <body className="bg-blush-light font-body antialiased">{children}</body>
    </html>
  );
}
