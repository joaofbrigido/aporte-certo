import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="mainContainer m-5">
      <h1>Landing Page</h1>
      <div>
        <Button variant={"link"} asChild>
          <Link href="/ferramentas/controle-do-aporte">Controle do Aporte</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href="/ferramentas/preco-teto">Preço Teto</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href="/ferramentas/juros-compostos">Juros Compostos</Link>
        </Button>
      </div>
    </main>
  );
}
