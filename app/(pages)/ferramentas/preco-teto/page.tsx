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

      <section className="mt-5">
        <Card>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <h1 className="text-2xl font-bold mb-4">
              Explicação da Calculadora de Preço Teto
            </h1>
            <p>
              Essa calculadora ajuda você a determinar o{" "}
              <strong>preço máximo</strong> que deve pagar por um ativo para
              atingir o <strong>dividend yield desejado</strong>. É
              especialmente útil para investidores focados em renda passiva, que
              querem planejar compras de ações ou FIIs com base em dividendos.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Campos da Calculadora
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Ativo:</strong> escolha a ação ou FII que deseja
                analisar.
              </li>
              <li>
                <strong>Dividend Yield desejado:</strong> a taxa mínima de
                retorno em dividendos que você espera obter.
              </li>
              <li>
                <strong>Dividendo por ação estimado:</strong> o valor esperado
                de dividendos distribuídos por ação no ano.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Quando usar</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Definir preços de entrada consistentes com sua estratégia de
                dividendos.
              </li>
              <li>
                Evitar pagar acima do valor que garante o retorno desejado em
                dividendos.
              </li>
              <li>
                Comparar diferentes ativos ou FIIs antes de decidir a compra.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Boas práticas</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Use uma estimativa de dividendos recorrentes, evitando incluir
                pagamentos extraordinários.
              </li>
              <li>
                Defina um dividend yield mínimo realista de acordo com o risco
                do ativo.
              </li>
              <li>
                Combine essa análise com outros indicadores e não baseie toda a
                decisão apenas no preço teto.
              </li>
              <li>
                Reavalie periodicamente os dividendos esperados e o preço teto,
                pois ambos podem mudar com o tempo.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
