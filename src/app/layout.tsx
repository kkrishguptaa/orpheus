import '@/styles/globals.css';
import ms from 'ms';
import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import AnimatedCursor from 'react-animated-cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { cn } from '@/util/css';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-eb-garamond',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://poems.krishg.com'),
  title: 'Poems by Krish Gupta',
  description:
    'Explore a collection of poems by Krish Gupta, delving into themes of love, loss, and the human experience. Thought-provoking verses that resonate with the soul.',
  openGraph: {
    title: 'Poems by Krish Gupta',
    description:
      'Explore a collection of poems by Krish Gupta, delving into themes of love, loss, and the human experience. Thought-provoking verses that resonate with the soul.',
    url: 'https://poems.krishg.com',
    siteName: 'Poems',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://poems.krishg.com/opengraph-image.png'],
    title: 'Poems by Krish Gupta',
    description:
      'Explore a collection of poems by Krish Gupta, delving into themes of love, loss, and the human experience. Thought-provoking verses that resonate with the soul.',
    creator: '@kkrishguptaa',
  },
};

export const revalidate = ms('1d'); // 1 day

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        `${ebGaramond.variable}`,
        'antialiased scroll-smooth',
        'bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300',
        'font-text',
      )}
      lang="en"
    >
      <body>
        <div className="hidden sm:block">
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1.5}
            outerScale={3}
            outerAlpha={0}
            innerStyle={{
              backgroundColor: 'var(--cursor-color)',
            }}
            outerStyle={{
              border: '3px solid var(--cursor-color)',
            }}
            showSystemCursor={true}
          />
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
