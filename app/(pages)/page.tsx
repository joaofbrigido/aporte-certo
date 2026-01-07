import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "./_components/section-title";
import { PlansCard } from "./_components/plans-card";
import { PlansCardItem } from "./_components/plans-card-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { ComparisonCard } from "./_components/comparison-card";
import Image from "next/image";
import { Features } from "./_components/features";
import { TextEffect } from "../components/ui/text-effect";
import { AnimateContent } from "../components/shared/animate-content";

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
    <>
      <main className="pt-12 mainContainer relative">
        <h1 className="text-5xl font-bold text-center max-w-3xl m-auto max-md:text-3xl leading-16 max-md:leading-10 ">
          <TextEffect
            as="span"
            preset="fade-in-blur"
            speedReveal={1.1}
            speedSegment={0.3}
          >
            Decida seus investimentos em minutos, não
          </TextEffect>{" "}
          <AnimateContent
            as="span"
            config={{
              className:
                "relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-primary before:rounded",
              transition: { delay: 0.9, duration: 0.4 },
              initial: { opacity: 0, y: 20 },
            }}
          >
            <span className="relative text-secondary px-2">em horas</span>
          </AnimateContent>
        </h1>
        <TextEffect
          as="p"
          per="line"
          delay={1}
          preset="fade-in-blur"
          speedReveal={1}
          speedSegment={0.6}
          className="mt-4 m-auto text-lg text-muted-foreground text-center max-w-xl"
        >
          Nossas calculadoras economiza horas de planilhas e cálculos. Tenha
          clareza sobre preço teto, aportes ideais e juros compostos para
          investir melhor e ganhar mais.
        </TextEffect>

        <AnimateContent config={{ transition: { delay: 1.5 } }}>
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
        </AnimateContent>

        <AnimateContent config={{ transition: { delay: 1.7 } }}>
          <div className="absolute left-1/2 -translate-x-1/2 -z-100 w-[90%] h-60 bg-primary blur-[85px] opacity-50 dark:opacity-40 rounded-full" />

          <Image
            src="/hero-ap.png"
            alt="Hero"
            width={1400}
            height={950}
            className="mt-16 rounded-3xl w-full object-cover border-8 mx-auto shadow-2xl"
            priority
          />
        </AnimateContent>
      </main>

      <section className="bg-stone-800 pb-28 pt-44 px-5 -mt-16">
        <div className="mainContainer">
          <div className="text-center">
            <h2 className="text-md text-primary mb-1 uppercase font-medium">
              É MUUUUITA VANTAGEM
            </h2>
            <h3 className="text-3xl font-bold text-white">
              Aporte tradicional vs usando a{" "}
              <span className="text-primary">Aporte Certo</span>
            </h3>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-5 max-[940px]:grid-cols-1">
            <ComparisonCard
              title="Tradicional"
              list={[
                "+2h escolhendo ativos para aportar",
                "+4h Cálculando preço teto",
                "+1h Fazendo simulações",
                "Sem organização de preços = menor rentabilidade",
                "Sem planejamento de aportes = menor rentabilidade",
                "Sem controle de sua carteira = menor rentabilidade",
              ]}
            />
            <ComparisonCard
              highline
              title="Com Aporte Certo"
              list={[
                "Simulação de aportes em segundos",
                "Preço teto calculado automaticamente",
                "Juros compostos ajustados à inflação",
                "Decisões rápidas e seguras para aumentar seu rendimento",
              ]}
            />
          </div>
        </div>
      </section>

      <div className="mainContainer">
        <section id="features">
          <SectionTitle
            title="Funcionalidades"
            subtitle="Descubra as Nossas Calculadoras Poderosas"
          />

          <AnimateContent>
            <Features />
          </AnimateContent>
        </section>

        <section id="prices">
          <SectionTitle title="Planos" subtitle="Invista em Suas Decisões" />

          <AnimateContent
            config={{
              className: "grid grid-cols-2 gap-5 mt-16 max-md:grid-cols-1",
            }}
          >
            <PlansCard name="Free" price="R$0,00" plan="free">
              <PlansCardItem title="Acesso a todas as novas calculadoras" />
              <PlansCardItem title="Sem anúncios" notSupport />
              <PlansCardItem title="Mantem os dados salvos" notSupport />
              <PlansCardItem title="Suporte via email" notSupport />
              <PlansCardItem title="Exportação de tabelas em PDF" notSupport />
            </PlansCard>

            <PlansCard name="Pro" price="R$69,00" plan="pro" popular>
              <PlansCardItem title="Acesso a todas as novas calculadoras" />
              <PlansCardItem title="Sem anúncios" />
              <PlansCardItem title="Mantem os dados salvos" />
              <PlansCardItem title="Suporte via email" />
              <PlansCardItem title="Exportação de tabelas em PDF" />
            </PlansCard>
          </AnimateContent>
        </section>

        <section id="faq">
          <SectionTitle title="Faq" subtitle="Dúvidas Frequentes" />

          <AnimateContent>
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
          </AnimateContent>
        </section>
      </div>
    </>
  );
}
