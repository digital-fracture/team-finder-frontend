import { Roboto } from "next/font/google";
import "@/src/styles/global.scss";

const roboto = Roboto({
  weight: "400",
  subsets: ["cyrillic", "latin"],
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
