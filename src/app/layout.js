import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraUi } from "../chakraUi/ChakraUi";
import NavBar from "../container/navBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scintillate",
  description: "Scintillate Task App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraUi>
          <NavBar />
          {children}
        </ChakraUi>
      </body>
    </html>
  );
}
