import Image from "next/image";
import { Bangers, Fredoka, Geist, Oswald, Rammetto_One } from "next/font/google";
import Header from "./api/Header";
import Main from "./api/Main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
 

export const fredoka = Fredoka({
  variable: "--font-fredoka",  
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

export const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: "400",
});

export const Lilita = Rammetto_One({
  variable: "--font-Rammetto_One",
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <>
        <Header />
        <Main />
    </>
  );
}
