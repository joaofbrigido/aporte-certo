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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Home() {
  const faqs = [
    {
      id: 1,
      question: "Como funcionam as calculadoras do site?",
      answer:
        "Nossas calculadoras são ferramentas fáceis de usar que ajudam a simular diferentes cenários de investimento, permitindo que você visualize resultados de juros compostos, cálculos de preço teto e de preço de aportes.",
    },

    {
      id: 2,
      question: "As calculadoras são gratuitas?",
      answer:
        "Sim, oferecemos uma versão gratuita com acesso básico às nossas principais ferramentas. Para funcionalidades avançadas, mais detalhadas e sem anúncios,  temos um plano pro a partir de R$69.",
    },

    {
      id: 3,
      question: "Quais são as vantagens dos planos pagos?",
      answer:
        "Os planos pagos oferecem acesso a recursos avançados sem anúncios, relatórios detalhados e mais opções de personalização nas simulações, permitindo que você tome decisões de investimento com mais precisão.",
    },

    {
      id: 4,
      question: "O acesso do PRO é vitalício?",
      answer:
        "Sim, o plano PRO oferece acesso vitalício as ferramentas do site. Pague uma vez, utilize para sempre em qualquer momento que desejar!",
    },

    {
      id: 5,
      question: "As simulações são 100% precisas?",
      answer:
        "Nossas simulações utilizam fórmulas amplamente aceitas no mercado financeiro, mas sempre recomendamos que o usuário leve em consideração fatores externos e consulte um especialista antes de tomar decisões de investimento.",
    },
  ];

  return (
    <div className="mainContainer m-5 relative">
      <main className="pt-11">
        <h1 className="text-5xl font-bold text-center max-w-3xl m-auto max-md:text-3xl leading-16 max-md:leading-10 ">
          Ferramentas Essenciais para{" "}
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-primary before:rounded">
            <span className="relative text-secondary px-2">Maximizar</span>
          </span>{" "}
          Seus Investimentos
        </h1>
        <p className="mt-4 m-auto text-lg text-muted-foreground text-center max-w-xl">
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

        <div className="flex items-center justify-between gap-5 mt-16 max-lg:flex-col">
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

          <Card className="w-2/3 h-[500px] border-8 min-w-[500px] max-lg:min-w-full">
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

        <Accordion type="single" collapsible className="mt-16">
          {faqs.map((faq) => (
            <AccordionItem value={`faq-${faq.id}`} key={`FAQ-${faq.id}`}>
              <AccordionTrigger className="cursor-pointer text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
