import { ToolsTabs } from "@/app/components/shared/tools-tabs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { ChartPie, Infinity } from "lucide-react";
import { TabWithTotal } from "./_components/tab-with-total";
import { TabWithoutTotal } from "./_components/tab-without-total";

export default function ControleDoAportePage() {
  return (
    <>
      <ToolsTabs active="controle-do-aporte" />

      <Tabs defaultValue={"com-total"} className="">
        <TabsList className="p-0 bg-background rounded-none m-auto border-b-1 w-full overflow-auto">
          <TabsTrigger
            value={"com-total"}
            className="rounded-none bg-background h-full border-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted transition"
          >
            <ChartPie />
            Com Total
          </TabsTrigger>
          <TabsTrigger
            value={"sem-total"}
            className="rounded-none bg-background h-full border-0 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary hover:bg-muted transition"
          >
            <Infinity />
            Sem Total
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"com-total"}>
          <TabWithTotal />
        </TabsContent>
        <TabsContent value={"sem-total"}>
          <TabWithoutTotal />
        </TabsContent>
      </Tabs>
    </>
  );
}
