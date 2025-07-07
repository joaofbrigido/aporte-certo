import { cn } from "@/app/lib/utils";
import Link from "next/link";

type ToolsTabsProps = {
  active: "controle-do-aporte" | "juros-compostos" | "preco-teto";
};

export const ToolsTabs = ({ active }: ToolsTabsProps) => {
  return (
    <div className="p-1 bg-muted inline-flex gap-1 rounded-md mb-3">
      <Link
        href="controle-do-aporte"
        className={cn(
          "px-3 py-1.5 rounded-md opacity-70 hover:bg-background transition",
          active === "controle-do-aporte" &&
            "bg-background font-medium opacity-100"
        )}
      >
        Controle do Aporte
      </Link>
      <Link
        href="juros-compostos"
        className={cn(
          "px-3 py-1.5 rounded-md opacity-70 hover:bg-background transition",
          active === "juros-compostos" &&
            "bg-background font-medium opacity-100"
        )}
      >
        Juros Compostos
      </Link>
      <Link
        href="preco-teto"
        className={cn(
          "px-3 py-1.5 rounded-md opacity-70 hover:bg-background transition",
          active === "preco-teto" && "bg-background font-medium opacity-100"
        )}
      >
        Preço Teto
      </Link>
    </div>
  );
};
