import "./globals.css";
import Nav from "./components/Nav";
import { ReactNode } from "react";

export const metadata = {
  title: "PaidOFF — App",
  description: "User dashboard for deposits and strategies",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
