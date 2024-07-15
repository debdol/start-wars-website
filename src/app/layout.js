import { Inter } from "next/font/google";
import Head from 'next/head';
import "./globals.css";
import GlobalDatas from "../globalDatas/globalDatas";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scintillate",
  description: "Scintillate Task App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        {/* <GlobalDatas children={children} /> */}
        <GlobalDatas>
          {children}
        </GlobalDatas>
      </body>
    </html>
  );
}
