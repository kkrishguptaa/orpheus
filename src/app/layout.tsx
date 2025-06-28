import AnimatedCursor from "react-animated-cursor";
import Footer from "@/components/Footer";
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
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1.5}
          outerScale={3}
          outerAlpha={0}
          innerStyle={{
            backgroundColor: "var(--cursor-color)",
          }}
          outerStyle={{
            border: "3px solid var(--cursor-color)",
          }}
        />
        <Navbar />
        <>{children}</>
        <Footer />
      </body>
    </html>
  );
}
