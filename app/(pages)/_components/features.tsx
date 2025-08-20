"use client";

import { cn } from "@/app/lib/utils";
import { ChartCandlestick, HandCoins, Percent } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Features = () => {
  const features = [
    {
      title: "Preço de Aportes",
      icon: <HandCoins />,
      description:
        "Otimize suas compras fazendo simulações de aportes em segundos, evitando erros e economizando tempo",
      active: false,
      image: "/aporte.jpg",
    },
    {
      title: "Preço Teto",
      icon: <ChartCandlestick />,
      description:
        "Determine o preço máximo que você deve pagar por uma ação para manter a rentabilidade desejada",
      active: false,
      image: "/preco-teto.jpg",
    },
    {
      title: "Juros Compostos",
      icon: <Percent />,
      description:
        "Simule o crescimento do seu patrimônio ao longo do tempo com base nos aportes regulares e na taxa de rendimento",
      active: false,
      image: "/juros-compostos.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex items-center justify-between gap-5 mt-16 max-lg:flex-col">
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li
            key={feature.title + index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "p-5 rounded-lg hover:bg-accent transition cursor-pointer",
              activeIndex === index && "bg-accent border"
            )}
          >
            <h4 className="font-semibold text-lg flex gap-3 items-center">
              {feature.icon}
              {feature.title}
            </h4>
            <p className="mt-4 text-muted-foreground">{feature.description}</p>
          </li>
        ))}
      </ul>

      <div className="w-2/3 max-lg:w-full">
        <Image
          src={features[activeIndex].image}
          alt={features[activeIndex].title}
          width={1000}
          height={900}
          className="object-contain border-8 rounded-2xl h-[450px] max-md:h-[300px]"
        />
      </div>
    </div>
  );
};
