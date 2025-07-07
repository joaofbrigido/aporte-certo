import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "../components/shared/theme-provider";
import { Footer } from "../components/shared/footer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aporte Certo",
  description: "Ferramentas para ajudar nos investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#f0b100" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
