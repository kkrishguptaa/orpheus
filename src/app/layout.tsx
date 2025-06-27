import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Italiana, EB_Garamond } from "next/font/google";

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-eb-garamond",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${italiana.variable} ${ebGaramond.variable}`} lang="en">
      <body>
        <Navbar />
        <>{children}</>
      </body>
    </html>
  );
}
