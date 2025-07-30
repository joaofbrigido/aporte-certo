import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import { Card, CardContent } from "@/app/components/ui/card";
import { Info } from "lucide-react";
import { CeilingPriceForm } from "./_components/ceiling-price-form";
import { cookies } from "next/headers";
import { CeilingPrice } from "@/app/services/ceiling-price/types";

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
