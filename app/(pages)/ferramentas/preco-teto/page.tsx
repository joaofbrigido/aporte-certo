import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import { Card, CardContent } from "@/app/components/ui/card";
import { Info } from "lucide-react";
import { CeilingPriceForm } from "./_components/ceiling-price-form";
import { cookies } from "next/headers";
import { CeilingPrice } from "@/app/services/ceiling-price/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Preço Teto | Método Décio Bazin | Aporte Certo",
  description:
    "Descubra o preço teto de uma ação pelo método Décio Bazin. Calcule automaticamente quanto pagar por cada ativo e invista com segurança.",
  keywords: [
    "calculadora preço teto",
    "preço teto Décio Bazin",
    "método Bazin",
    "ações descontadas",
    "quanto pagar por ação",
    "investir em dividendos",
    "calculadora de ações",
  ],
  openGraph: {
    title: "Calculadora de Preço Teto | Método Décio Bazin",
    description:
      "Calcule o preço teto de ações pelo método Décio Bazin em segundos. Invista melhor e evite pagar caro por ativos.",
    url: "https://aportecerto.com.com/ferramentas/preco-teto",
    siteName: "Aporte Certo",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function PrecoTetoPage() {
  const cookieStore = await cookies();
  const ceilingPrices = JSON.parse(
    cookieStore.get("ceilingPrices")?.value || "[]"
  ) as CeilingPrice[];

  return (
    <>
      <ToolsTabs active="preco-teto" />
      <section className="space-y-5">
        <Card>
          <CardContent className="flex gap-3 items-center text-muted-foreground">
            <Info className="min-w-4 min-h-4" />
            Escolha um ativo, defina o dividend yield desejado e dividendo por
            ação estimado. O resultado será o preço teto, ou seja, preço máximo
            que poderá comprar um ativo para atingir o dividend yield desejado.
          </CardContent>
        </Card>

        <CeilingPriceForm ceilingPrices={ceilingPrices} />
      </section>
    </>
  );
}
