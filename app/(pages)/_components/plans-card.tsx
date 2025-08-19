"use client";

import { MainButton } from "@/app/components/shared/main-button";
import { cn } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

type PlansCardProps = {
  name: string;
  price: string;
  popular?: boolean;
  children?: React.ReactNode;
  plan: "free" | "pro";
};

export const PlansCard = ({
  name,
  price,
  popular,
  children,
  plan,
}: PlansCardProps) => {
  const router = useRouter();

  async function handleChoosePlan() {
    if (plan === "free") {
      router.push("/ferramentas/controle-do-aporte");
      return;
    }

    console.log("PLANO PRO, CRIAR CHECKOUT " + plan);
  }

  return (
    <div
      className={cn(
        "p-5 rounded-lg border flex flex-col justify-between gap-5",
        popular && "border-primary"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl">{name}</h2>
          {popular && (
            <span className="text-accent bg-primary px-2 py-1 rounded-lg font-medium">
              Popular
            </span>
          )}
        </div>
        <div className="flex items-end gap-1">
          {popular && (
            <span className="text-muted-foreground line-through font-medium mr-1 block">
              R$79,00
            </span>
          )}
          <h3 className="text-3xl font-bold">{price}</h3>
        </div>
        <ul className="flex flex-col gap-3 mt-5">{children}</ul>
      </div>
      <MainButton
        variant={popular ? "default" : "outline"}
        className="w-full"
        onClick={handleChoosePlan}
      >
        Selecionar
      </MainButton>
      <span className="text-muted-foreground text-sm text-center -mt-3">
        {plan === "free" ? "Grátis" : "Pague uma vez. Use para sempre!"}
      </span>
    </div>
  );
};
