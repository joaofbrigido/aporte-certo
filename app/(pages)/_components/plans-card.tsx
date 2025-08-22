"use client";

import { createLeadAction } from "@/app/actions/leads";
import { LabelInput } from "@/app/components/shared/label-input";
import { MainButton } from "@/app/components/shared/main-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { useForm } from "@/app/hooks/use-form";
import { cn } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [openDialog, setOpenDialog] = useState(false);

  async function handleChoosePlan() {
    if (plan === "free") {
      router.push("/ferramentas/controle-do-aporte");
      return;
    }

    setOpenDialog(true);
  }

  const [{ fieldErrors }, handleSubmit, isPending] = useForm({
    action: createLeadAction,
    onSuccess: () => setOpenDialog(false),
  });

  return (
    <>
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

      {popular && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Plano PRO em Breve...</DialogTitle>
              <DialogDescription>
                Mas não se preocupe, cadastre seu e-mail e receba em primeira
                mão (com desconto) quando lançarmos!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              {/* Honeypot invisível */}
              <input
                type="text"
                name="fullName"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />

              <LabelInput
                name="email"
                type="email"
                label="E-mail"
                placeholder="Digite seu melhor e-mail"
                errors={fieldErrors?.email}
              />

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <MainButton variant="outline" type="button">
                    Cancelar
                  </MainButton>
                </DialogClose>
                <MainButton isLoading={isPending}>Enviar</MainButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
