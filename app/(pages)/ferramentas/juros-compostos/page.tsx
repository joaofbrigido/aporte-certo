import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { CompoundInterestResultProvider } from "@/app/context/compound-interest-result-context";
import { CompoundInterestForm } from "./_components/compound-interest-form";
import CompoundInterestResult from "./_components/compound-interest-result";
import { Metadata } from "next";
import { Info } from "lucide-react";

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

      <Card>
        <CardContent className="flex gap-3 items-center text-muted-foreground">
          <Info className="min-w-4 min-h-4" />
          <p>
            Simule o crescimento do seu patrimônio considerando aportes, juros e
            inflação, e planeje metas de curto, médio e longo prazo.{" "}
            <Dialog>
              <DialogTrigger className="underline underline-offset-2 hover:text-primary cursor-pointer transition-colors">
                Ver Explicação Completa
              </DialogTrigger>

              <DialogContent className="min-w-2xl max-md:min-w-[90%] max-h-[90%] overflow-auto">
                <DialogHeader>
                  <DialogTitle>
                    Explicação da Calculadora de Juros Compostos
                  </DialogTitle>
                  <DialogDescription>
                    Essa calculadora permite projetar o crescimento do seu
                    patrimônio ao longo do tempo, considerando o aporte inicial,
                    aportes mensais, taxa de juros e inflação do investimento. É
                    ideal para quem quer planejar metas de curto, médio ou longo
                    prazo e entender o impacto de cada variável.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    Campos da Calculadora
                  </h2>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      <strong>Valor Inicial:</strong> valor que você já possui
                      para investir.
                    </li>
                    <li>
                      <strong>Investimento Mensal:</strong> valor que será
                      adicionado periodicamente.
                    </li>
                    <li>
                      <strong>Taxa de Juros:</strong> taxa de crescimento
                      esperada do investimento (por período).
                    </li>
                    <li>
                      <strong>Período:</strong> duração do investimento (em
                      meses ou anos, dependendo da configuração da calculadora).
                    </li>
                    <li>
                      <strong>Inflação do Investimento:</strong> taxa de
                      inflação estimada, que permite calcular o valor real do
                      patrimônio ao longo do tempo.
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6 mb-1">
                    Quando usar
                  </h2>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Planejar o crescimento de patrimônio ao longo do tempo.
                    </li>
                    <li>
                      Comparar cenários de aportes diferentes e taxas de
                      retorno.
                    </li>
                    <li>Estimar o efeito da inflação sobre o investimento.</li>
                    <li>
                      Tomar decisões mais conscientes sobre quanto aportar
                      mensalmente ou ao longo de um período.
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6 mb-1">
                    Boas práticas
                  </h2>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Crie cenários otimista, base e conservador para testar
                      diferentes taxas de juros.
                    </li>
                    <li>
                      Considere a inflação para analisar o valor real do
                      patrimônio.
                    </li>
                    <li>
                      Evite alterar os aportes constantemente — consistência
                      gera melhores resultados.
                    </li>
                    <li>
                      Lembre-se de revisar as taxas de juros periodicamente de
                      acordo com a realidade do investimento.
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </p>
        </CardContent>
      </Card>

      <CompoundInterestResultProvider>
        <div className="mt-5 space-y-8">
          <Card>
            <CardContent>
              <CompoundInterestForm />
            </CardContent>
          </Card>

          <CompoundInterestResult />
        </div>
      </CompoundInterestResultProvider>
    </>
  );
}
