import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  ArrowUpRight,
  ChartCandlestick,
  HandCoins,
  Percent,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import SectionTitle from "./_components/section-title";
import { cn } from "../lib/utils";
import { PlansCard } from "./_components/plans-card";
import { PlansCardItem } from "./_components/plans-card-item";

export default function Home() {
  return (
    <div className="mainContainer m-5 relative">
      <main className="pt-11">
        <h1 className="text-5xl font-bold text-center max-w-3xl leading-14 m-auto max-md:text-3xl max-md:leading-12 max-sm:leading-10">
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-1 before:bg-primary">
            <span className="relative text-secondary">
              Ferramentas Essenciais
            </span>
          </span>
          <span className="mt-2 ml-2 leading-[72px] max-md:leading-14 max-sm:leading-10">
            para Maximizar Seus Investimentos
          </span>
        </h1>
        <p className="mt-2 m-auto text-lg text-muted-foreground text-center max-w-xl">
          Preço teto, juros compostos e muito mais. Aumente seu rendimento com
          nossas calculadoras inteligentes.
        </p>

        <div className="flex justify-center mt-8">
          <Button asChild size="lg" className="text-md !px-6">
            <Link href="/ferramentas/controle-do-aporte">
              Calculadoras
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <span className="block text-sm text-muted-foreground mt-1 text-center">
          Comece gratuitamente
        </span>

        <div className="absolute left-1/2 -translate-x-1/2 -z-100 w-[90%] h-60 bg-primary blur-[85px] opacity-50 dark:opacity-40 rounded-full" />

        <Card className="h-[450px] mt-16">
          <CardContent></CardContent>
        </Card>
      </main>

      <section>
        <SectionTitle
          title="Funcionalidades"
          subtitle="Descubra as Nossas Calculadoras Poderosas"
        />

        <div className="flex items-center justify-between gap-5 mt-16">
          <ul className="space-y-4">
            <li
              className={cn(
                "p-5 rounded-lg hover:bg-accent transition cursor-pointer",
                true && "bg-accent border"
              )}
            >
              <h4 className="font-semibold text-lg flex gap-3 items-center">
                <ChartCandlestick />
                Preço Teto
              </h4>
              <p className="mt-4 text-muted-foreground">
                Determine o preço máximo que você deve pagar por uma ação para
                manter a rentabilidade desejada
              </p>
            </li>
            <li
              className={cn(
                "p-5 rounded-lg hover:bg-accent transition cursor-pointer",
                false && "bg-accent border"
              )}
            >
              <h4 className="font-semibold text-lg flex gap-3 items-center">
                <Percent />
                Juros Compostos
              </h4>
              <p className="mt-4 text-muted-foreground">
                Simule o crescimento do seu patrimônio ao longo do tempo com
                base nos aportes regulares e na taxa de rendimento
              </p>
            </li>
            <li
              className={cn(
                "p-5 rounded-lg hover:bg-accent transition cursor-pointer",
                false && "bg-accent border"
              )}
            >
              <h4 className="font-semibold text-lg flex gap-3 items-center">
                <HandCoins />
                Preço de Aportes
              </h4>
              <p className="mt-4 text-muted-foreground">
                Otimize suas compras e maximize os lucros com base em suas
                estratégias de investimento
              </p>
            </li>
          </ul>

          <Card className="w-2/3 h-[500px] border-8">
            <CardContent></CardContent>
          </Card>
        </div>
      </section>

      <section>
        <SectionTitle title="Planos" subtitle="Invista em Suas Decisões" />

        <div className="grid grid-cols-2 gap-5 mt-16 max-md:grid-cols-1">
          <PlansCard name="Free" price="R$0,00" plan="free">
            <PlansCardItem title="Acesso a todas as novas calculadoras" />
            <PlansCardItem title="Sem anúncios" notSupport />
            <PlansCardItem title="Mantem os dados salvos" notSupport />
            <PlansCardItem title="Suporte via email" notSupport />
            <PlansCardItem title="Exportação de tabelas em excel" notSupport />
          </PlansCard>

          <PlansCard name="Pro" price="R$69,00" plan="pro" popular>
            <PlansCardItem title="Acesso a todas as novas calculadoras" />
            <PlansCardItem title="Sem anúncios" />
            <PlansCardItem title="Mantem os dados salvos" />
            <PlansCardItem title="Suporte via email" />
            <PlansCardItem title="Exportação de tabelas em excel" />
          </PlansCard>
        </div>
      </section>

      <section>
        <SectionTitle title="Faq" subtitle="Dúvidas Frequentes" />
      </section>
    </div>
  );
}
