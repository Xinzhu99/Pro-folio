import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import AddProject from "./components/AddProject";
import { Manrope } from 'next/font/google'
import SelectCategory from "./components/SelectCategory";

export const metadata: Metadata = {
  title: "Profolio",
  description: "Students' projects portfolio of Ada ",
};

const manrope = Manrope({
  subsets:['latin'],
  weight: '400'
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body >
        <div className="nav_bar bg-white shadow-lg flex  p-6 gap-4 mb-5">
          <Link href="/" className="text-2xl mr-auto"><span className="font-extrabold text-3xl text-pink-400">PRO</span>folio</Link>
          < SelectCategory />
          <AddProject />
        </div>
        {children}
      </body>
    </html>
  );
}
