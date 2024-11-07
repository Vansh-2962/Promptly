import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
