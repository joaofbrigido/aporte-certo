import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ChartPie, Infinity } from "lucide-react";
import { TabWithTotal } from "./_components/tab-with-total";
import { TabWithoutTotal } from "./_components/tab-without-total";
import { cookies } from "next/headers";
import {
  InvestmentControlWithoutTotal,
  InvestmentControlWithTotal,
} from "@/app/services/investiment-control/types";
import { Metadata } from "next";
import { Card, CardContent } from "@/app/components/ui/card";

export const metadata: Metadata = {
  title: "Simulador de Aportes | Calculadora de Preço do Aporte | Aporte Certo",
  description:
    "Simule aportes mensais e descubra quanto investir em cada ativo de forma equilibrada. Planeje seus aportes com clareza e aumente sua rentabilidade.",
  keywords: [
    "simulador de aportes",
    "calculadora de aportes",
    "quanto investir em cada ação",
    "aporte mensal investimentos",
    "planejamento de aportes",
    "simulação de carteira de ações",
  ],
  openGraph: {
    title: "Simulador de Aportes | Planeje seus Investimentos",
    description:
      "Defina quanto investir em cada ativo com nossa calculadora de aportes. Planeje sua carteira de forma prática e organizada.",
    url: "https://aportecerto.com/ferramentas/controle-do-aporte",
    siteName: "Aporte Certo",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function ControleDoAportePage() {
  const cookieStore = await cookies();

  const investimentsWithTotal = JSON.parse(
    cookieStore.get("InvestmentControlWithTotal")?.value || "{}"
  ) as InvestmentControlWithTotal;
  const investimentsWithoutTotal = JSON.parse(
    cookieStore.get("InvestmentsControlWithoutTotal")?.value || "[]"
  ) as InvestmentControlWithoutTotal[];

  return (
    <>
      <ToolsTabs active="controle-do-aporte" />

      <Tabs defaultValue={"com-total"} className="">
        <TabsList className="p-0 bg-background rounded-none m-auto border-b-1 w-full overflow-auto">
          <TabsTrigger
            value={"com-total"}
            className="rounded-none bg-background h-full border-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted transition"
          >
            <ChartPie />
            Com Total
          </TabsTrigger>
          <TabsTrigger
            value={"sem-total"}
            className="rounded-none bg-background h-full border-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted transition"
          >
            <Infinity />
            Sem Total
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"com-total"}>
          <TabWithTotal investimentsWithTotal={investimentsWithTotal} />
        </TabsContent>
        <TabsContent value={"sem-total"}>
          <TabWithoutTotal investmentsWithoutTotal={investimentsWithoutTotal} />
        </TabsContent>
      </Tabs>

      <section className="mt-5">
        <Card>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h1 className="text-2xl font-bold mb-4">
              Explicação da Calculadora de Controle de Aportes
            </h1>
            <p>
              Essa calculadora foi criada para ajudar você a{" "}
              <strong>planejar como distribuir seus aportes</strong> entre
              diferentes ativos. Ela possui dois modos de uso:
            </p>
            <ul className="list-disc list-inside mt-3">
              <li>
                <strong>Com Total:</strong> defina um valor total para investir
                e distribua em percentuais entre os ativos. O resultado será a{" "}
                <em>quantidade de cotas necessárias</em> para alcançar essa
                alocação.
              </li>
              <li>
                <strong>Sem Total:</strong> informe as quantidades de cotas de
                cada ativo e descubra o <em>valor total do seu aporte</em>.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Quando usar</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Planejar aportes mensais de forma proporcional entre diferentes
                ativos.
              </li>
              <li>
                Estimar rapidamente o valor total de um conjunto de compras.
              </li>
              <li>Rebalancear sua carteira respeitando percentuais-alvo.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Boas práticas</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Defina previamente sua alocação-alvo (ex.: 50% ações, 30% FIIs,
                20% renda fixa).
              </li>
              <li>
                Use constância: mantenha percentuais próximos a cada aporte.
              </li>
              <li>
                Teste cenários próximos caso o preço das cotas não permita bater
                a proporção exata.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
