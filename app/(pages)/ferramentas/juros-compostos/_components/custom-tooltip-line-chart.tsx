import { TooltipProps } from "recharts";
import { Card, CardContent } from "@/app/components/ui/card";

type CustomTooltipLineChartProps = TooltipProps<string, string> & {
  config: Record<string, { label: string }>;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: string;
};

export function CustomTooltipLineChart({
  active,
  payload,
  label,
  config,
}: CustomTooltipLineChartProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <Card className="rounded-md border p-2 shadow-sm">
      <CardContent className="p-0 text-sm">
        <p className="mb-2 font-medium text-muted-foreground">Mês {label}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {config[item.dataKey]?.label || item.dataKey}:
            </span>
            <span className="font-medium">
              R${" "}
              {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
