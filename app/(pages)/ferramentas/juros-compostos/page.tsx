import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import { Card, CardContent } from "@/app/components/ui/card";
import { CompoundInterestResultProvider } from "@/app/context/compound-interest-result-context";
import { CompoundInterestForm } from "./_components/compound-interest-form";
import CompoundInterestResult from "./_components/compound-interest-result";

export default function JurosCompostosPage() {
  return (
    <>
      <ToolsTabs active="juros-compostos" />

      <CompoundInterestResultProvider>
        <div className="space-y-8">
          <Card>
            <CardContent>
              <CompoundInterestForm />
            </CardContent>
          </Card>
          {/* <Card>
            <CardContent className="h-36">Anúncio</CardContent>
          </Card> */}

          <CompoundInterestResult />

          {/* <Card>
            <CardContent className="h-36">Anúncio</CardContent>
          </Card> */}
          {/* <Card>
            <CardContent className="h-36">Explicação Calculadora</CardContent>
          </Card> */}
          {/* <Card>
            <CardContent className="h-36">Anúncio</CardContent>
          </Card> */}
        </div>
      </CompoundInterestResultProvider>
    </>
  );
}
