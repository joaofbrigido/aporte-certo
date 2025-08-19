import { Card, CardContent } from "@/app/components/ui/card";
import { Info } from "lucide-react";
import { WithoutTotalForm } from "./without-total-form";
import { InvestmentControlWithoutTotal } from "@/app/services/investiment-control/types";

export const TabWithoutTotal = ({
  investmentsWithoutTotal,
}: {
  investmentsWithoutTotal: InvestmentControlWithoutTotal[];
}) => {
  return (
    <section className="space-y-5">
      <Card>
        <CardContent className="flex gap-3 items-center text-muted-foreground">
          <Info className="min-w-4 min-h-4" />
          Sem Total, adicione os ativos juntamente com as quantidades de cotas e
          tenha o valor total do seu aporte.
        </CardContent>
      </Card>

      <WithoutTotalForm investments={investmentsWithoutTotal} />
    </section>
  );
};
