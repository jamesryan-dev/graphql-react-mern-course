import { Inter } from "next/font/google";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Header from "@/components/Header";
import { ApolloWrapper } from "@/lib/apolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MERN",
  description: "Course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="container">
          <ApolloWrapper>{children}</ApolloWrapper>
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  );
}
