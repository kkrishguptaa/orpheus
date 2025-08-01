import AnimatedCursor from "react-animated-cursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Italiana, EB_Garamond } from "next/font/google";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://orpheus.krishg.com"),
  title: "Orpheus | Poems by Krish Gupta",
  description:
    "Explore a collection of poems by Krish Gupta, delving into themes of love, loss, and the human experience. Thought-provoking verses that resonate with the soul.",
  openGraph: {
    title: "Orpheus | Poems by Krish Gupta",
    description:
      "Explore a collection of poems by Krish Gupta, delving into themes of love, loss, and the human experience. Thought-provoking verses that resonate with the soul.",
    images: [
      {
        url: "https://orpheus.krishg.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Orpheus Open Graph Image",
      },
    ],
    url: "https://orpheus.krishg.com",
    siteName: "Orpheus",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://orpheus.krishg.com/opengraph-image.png"],
    title: "Orpheus | Poems by Krish Gupta",
    description:
      "Explore a collection of poems by Krish Gupta, delving into themes of love, loss, and the human experience. Thought-provoking verses that resonate with the soul.",
    creator: "@kkrishguptaa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${italiana.variable} ${ebGaramond.variable}`} lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Orpheus" />
      </head>
      <body>
        <div className="hidden sm:block">
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
            showSystemCursor={true}
          />
        </div>
        <Navbar />
        <>{children}</>
        <Footer />
      </body>
    </html>
  );
}
