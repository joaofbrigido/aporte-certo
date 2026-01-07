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
    url: "https://aportecerto.com.br/ferramentas/controle-do-aporte",
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
    </>
  );
}
