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
import { Info } from "lucide-react";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { MyWalletForm } from "./_components/my-wallet-form";
import { StockWallet } from "@/app/services/my-wallet/types";

export const metadata: Metadata = {
  title: "Minha Carteira | Aporte Certo",
  description:
    "Gerencie sua carteira de ações em um só lugar. Acompanhe preço médio, preço atual, lucros, rentabilidade e participação de cada ativo em tempo real.",
  keywords: [
    "minha carteira de ações",
    "controle de carteira de investimentos",
    "acompanhamento de carteira",
    "lucro em ações",
    "rentabilidade da carteira",
    "gestão de carteira",
    "investimentos em ações",
    "aporte certo",
  ],
  openGraph: {
    title: "Minha Carteira | Aporte Certo",
    description:
      "Visualize e acompanhe sua carteira de ações em tempo real. Veja lucros, prejuízos, rentabilidade e a participação de cada ativo no total investido.",
    url: "https://aportecerto.com.br/ferramentas/minha-carteira",
    siteName: "Aporte Certo",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function MinhaCarteiraPage() {
  const cookieStore = await cookies();
  const stocksWallet = JSON.parse(
    cookieStore.get("myWallet")?.value || "[]"
  ) as StockWallet[];

  const totalWalletValue = stocksWallet.reduce(
    (acc, stock) => acc + stock.totalPrice,
    0
  );
  const stocksWithPercentage = stocksWallet.map((stock) => ({
    ...stock,
    totalPercentage:
      totalWalletValue > 0 ? stock.totalPrice / totalWalletValue : 0,
  }));

  return (
    <>
      <ToolsTabs active="minha-carteira" />

      <section className="space-y-5">
        <Card>
          <CardContent className="flex gap-3 items-center text-muted-foreground">
            <Info className="min-w-4 min-h-4" />
            <p>
              Cadastre os ativos da sua carteira informando o ativo, preço médio
              e quantidade. Abaixo, você acompanha em tempo real o desempenho da
              sua carteira, com lucro, rentabilidade e participação de cada
              ativo no total.{" "}
              <Dialog>
                <DialogTrigger className="underline underline-offset-2 hover:text-primary cursor-pointer transition-colors">
                  Ver Explicação Completa
                </DialogTrigger>

                <DialogContent className="min-w-2xl max-md:min-w-[90%] max-h-[90%] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>
                      Explicação da Página Minha Carteira
                    </DialogTitle>
                    <DialogDescription>
                      A página <strong>Minha Carteira</strong> permite que você
                      registre e acompanhe seus ativos de forma centralizada,
                      visualizando{" "}
                      <strong>lucros, rentabilidade e alocação</strong> da sua
                      carteira com base nos preços atuais do mercado.
                    </DialogDescription>
                  </DialogHeader>

                  <div>
                    <h2 className="text-lg font-semibold mb-1">
                      Campos de Cadastro
                    </h2>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <strong>Ativo:</strong> o código da ação que faz parte
                        da sua carteira.
                      </li>
                      <li>
                        <strong>Preço médio:</strong> o valor médio pago por
                        ação, considerando todas as compras realizadas.
                      </li>
                      <li>
                        <strong>Quantidade:</strong> o número total de ações que
                        você possui do ativo.
                      </li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6 mb-1">
                      Informações da Tabela
                    </h2>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        <strong>Preço Atual:</strong> cotação mais recente do
                        ativo no mercado.
                      </li>
                      <li>
                        <strong>(%) Lucro:</strong> variação percentual entre o
                        preço médio e o preço atual.
                      </li>
                      <li>
                        <strong>(R$) Lucro:</strong> ganho ou prejuízo
                        financeiro total do ativo.
                      </li>
                      <li>
                        <strong>(%) Total:</strong> participação percentual do
                        ativo no valor total da carteira.
                      </li>
                      <li>
                        <strong>(R$) Total:</strong> valor total investido no
                        ativo com base no preço atual.
                      </li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6 mb-1">
                      Quando usar
                    </h2>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Monitorar o desempenho da sua carteira em tempo real.
                      </li>
                      <li>
                        Identificar rapidamente quais ativos estão puxando
                        ganhos ou prejuízos.
                      </li>
                      <li>
                        Avaliar a concentração e diversificação da sua carteira.
                      </li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6 mb-1">
                      Boas práticas
                    </h2>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Mantenha o preço médio sempre atualizado após novas
                        compras ou vendas.
                      </li>
                      <li>
                        Use a participação percentual para evitar concentração
                        excessiva em um único ativo.
                      </li>
                      <li>
                        Analise o desempenho da carteira no conjunto, não apenas
                        ativos isolados.
                      </li>
                      <li>
                        Utilize essa visão como apoio à decisão, não como único
                        critério de compra ou venda.
                      </li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </p>
          </CardContent>
        </Card>

        <MyWalletForm stocksWallet={stocksWithPercentage} />
      </section>
    </>
  );
}
