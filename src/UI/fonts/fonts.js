import { Baloo_Da_2 } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import { Days_One } from "next/font/google";


export const nunitoSans = Nunito_Sans({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const daysOne = Days_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-days-one",
});

export default function () {
  return (
    <>
      <style jsx global>
        {`
          body *,
          :root {
            font-family: ${nunitoSans.style.fontFamily}, sans-serif;
            font-size: 18px;
          }
          :root {
            --font-family: ${nunitoSans.style.fontFamily}, sans-serif;
          }
        `}
      </style>
    </>
  );
}
