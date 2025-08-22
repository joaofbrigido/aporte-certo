import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "../components/shared/theme-provider";
import { Footer } from "../components/shared/footer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Header } from "../components/shared/header";
import { Toaster } from "../components/ui/sonner";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aporte Certo | Calculadora de Preço Teto, Aportes e Juros Compostos",
  description:
    "Use o Aporte Certo para economizar tempo nos seus investimentos. Calculadora de Preço Teto (método Bazin), simulador de aportes mensais, juros compostos com inflação e muito mais.",
  keywords: [
    "calculadora de investimentos",
    "calculadora preço teto",
    "método Décio Bazin",
    "simulador de juros compostos",
    "simulador de aportes",
    "calculadora de dividendos",
    "ferramentas para investidores",
    "planejamento financeiro",
    "investimentos em ações",
    "simulação de aportes mensais",
    "calculadora de juros compostos",
  ],
  openGraph: {
    title: "Aporte Certo | Calculadora de Investimentos Inteligente",
    description:
      "Economize tempo nos cálculos e maximize seus investimentos. Simule preço teto, aportes e juros compostos em segundos.",
    url: "https://aportecerto.com.br",
    siteName: "Aporte Certo",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aporte Certo | Calculadora de Investimentos Inteligente",
    description:
      "Ferramentas essenciais para investidores: preço teto, aportes e juros compostos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body className={`${dmSans.className} antialiased`}>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        ></Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#f0b100" />
          <Header />
          {children}
          <Toaster richColors />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
