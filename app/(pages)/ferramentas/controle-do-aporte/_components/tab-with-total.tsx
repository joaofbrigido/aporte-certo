import { Card, CardContent } from "@/app/components/ui/card";
import { Info } from "lucide-react";
import { WithTotalForm } from "./with-total-form";
import { InvestmentControlWithTotal } from "@/app/services/investiment-control/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export const TabWithTotal = ({
  investimentsWithTotal,
}: {
  investimentsWithTotal: InvestmentControlWithTotal;
}) => {
  return (
    <section className="space-y-5">
      <Card>
        <CardContent className="flex gap-3 items-center text-muted-foreground">
          <Info className="min-w-4 min-h-4" />
          <p>
            Com Total, defina um valor total de seu aporte e controle quantos
            porcento deseja comprar de cada ativo. O resultado terá a quantidade
            de cotas necessárias para atingir esse valor.{" "}
            <Dialog>
              <DialogTrigger className="underline underline-offset-2 hover:text-primary cursor-pointer transition-colors">
                Ver Explicação Completa
              </DialogTrigger>

              <DialogContent className="min-w-2xl max-md:min-w-[90%] max-h-[90%] overflow-auto">
                <DialogHeader>
                  <DialogTitle>
                    Explicação da Calculadora de Controle de Aportes
                  </DialogTitle>
                  <DialogDescription>
                    Essa calculadora foi criada para ajudar você a{" "}
                    <strong>planejar como distribuir seus aportes</strong> entre
                    diferentes ativos.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    Possui dois modos de uso:
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>Com Total:</strong> defina um valor total para
                      investir e distribua em percentuais entre os ativos. O
                      resultado será a <em>quantidade de cotas necessárias</em>{" "}
                      para alcançar essa alocação.
                    </li>
                    <li>
                      <strong>Sem Total:</strong> informe as quantidades de
                      cotas de cada ativo e descubra o{" "}
                      <em>valor total do seu aporte</em>.
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6 mb-1">
                    Quando usar
                  </h2>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Planejar aportes mensais de forma proporcional entre
                      diferentes ativos.
                    </li>
                    <li>
                      Estimar rapidamente o valor total de um conjunto de
                      compras.
                    </li>
                    <li>
                      Rebalancear sua carteira respeitando percentuais-alvo.
                    </li>
                  </ul>

                  <h2 className="text-lg font-semibold mt-6 mb-1">
                    Boas práticas
                  </h2>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Defina previamente sua alocação-alvo (ex.: 50% ações, 30%
                      FIIs, 20% renda fixa).
                    </li>
                    <li>
                      Use constância: mantenha percentuais próximos a cada
                      aporte.
                    </li>
                    <li>
                      Teste cenários próximos caso o preço das cotas não permita
                      bater a proporção exata.
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <WithTotalForm investimentsWithTotal={investimentsWithTotal} />
        </CardContent>
      </Card>
    </section>
  );
};
