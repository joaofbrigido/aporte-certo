import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import { Card, CardContent } from "@/app/components/ui/card";
import { CompoundInterestResultProvider } from "@/app/context/compound-interest-result-context";
import { CompoundInterestForm } from "./_components/compound-interest-form";
import CompoundInterestResult from "./_components/compound-interest-result";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos com Inflação | Aporte Certo",
  description:
    "Simule o crescimento do seu dinheiro com juros compostos. Inclua inflação e aportes mensais para prever o rendimento real dos seus investimentos.",
  keywords: [
    "calculadora de juros compostos",
    "simulador de investimentos",
    "juros compostos com inflação",
    "simulação de rendimentos",
    "investimento mensal",
    "crescimento do patrimônio",
  ],
  openGraph: {
    title: "Calculadora de Juros Compostos com Inflação",
    description:
      "Calcule o rendimento real dos seus investimentos com juros compostos, aportes mensais e inflação.",
    url: "https://aportecerto.com/ferramentas/juros-compostos",
    siteName: "Aporte Certo",
    locale: "pt_BR",
    type: "website",
  },
};

export default function JurosCompostosPage() {
  return (
    <>
      <ToolsTabs active="juros-compostos" />

      <CompoundInterestResultProvider>
        <div className="space-y-8">
          <Card>
            <CardContent>
              <CompoundInterestForm />
            </CardContent>
          </Card>
          {/* <Card>
            <CardContent className="h-36">Anúncio</CardContent>
          </Card> */}

          <CompoundInterestResult />

          {/* <Card>
            <CardContent className="h-36">Anúncio</CardContent>
          </Card> */}
          {/* <Card>
            <CardContent className="h-36">Explicação Calculadora</CardContent>
          </Card> */}
          {/* <Card>
            <CardContent className="h-36">Anúncio</CardContent>
          </Card> */}
        </div>
      </CompoundInterestResultProvider>
    </>
  );
}
