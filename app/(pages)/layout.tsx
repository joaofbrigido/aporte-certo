import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "../components/shared/theme-provider";
import { Footer } from "../components/shared/footer";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Header } from "../components/shared/header";
import { Toaster } from "../components/ui/sonner";
import { AdsenseScript } from "../components/shared/adsense-script";
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
      <head>
        <meta
          name="google-adsense-account"
          content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        />

        {/* Google Analytics - Script principal */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />

        {/* Google Analytics - Config */}
        <Script id="ga-config" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname,
        });
      `}
        </Script>
      </head>

      <body
        className={`${dmSans.className} antialiased flex min-h-screen flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AdsenseScript />
          <NextTopLoader color="#f0b100" />

          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>

          <Toaster richColors />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
