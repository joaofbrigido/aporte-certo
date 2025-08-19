import { Card, CardContent } from "@/app/components/ui/card";
import { Info } from "lucide-react";
import { WithTotalForm } from "./with-total-form";
import { InvestmentControlWithTotal } from "@/app/services/investiment-control/types";

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
          Com Total, defina um valor total de seu aporte e controle quantos
          porcento deseja comprar de cada ativo. O resultado terá a quantidade
          de cotas necessárias para atingir esse valor.
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
