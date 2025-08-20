import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t py-5">
      <div className="mainContainer grid grid-cols-3 gap-5 justify-items-center max-md:grid-cols-1 max-md:text-center">
        <div className="space-y-0.5">
          <Image
            src="/logo-aportecerto.png"
            alt="Aporte Certo Logo"
            width={300}
            height={150}
            priority
            className="w-[170px] h-[35px] object-contain mb-2 max-md:mx-auto"
          />
          <p>Ferramentas para Maximizar Seus Investimentos.</p>
          <p>Copyright © 2025 - Todos os direitos reservados</p>
          <p>
            Feito por{" "}
            <Link
              href="https://joaobrigido.com.br"
              target="_blank"
              className="font-bold hover:underline"
            >
              joaobrigido
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold">Links</h3>
          <Link
            href="/ferramentas/controle-do-aporte"
            className="hover:underline"
          >
            Controle do Aporte
          </Link>
          <Link href="/ferramentas/juros-compostos" className="hover:underline">
            Juros Compostos
          </Link>
          <Link href="/ferramentas/preco-teto" className="hover:underline">
            Preço Teto
          </Link>
        </div>

        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold">Legal</h3>
          <Link href="#" className="hover:underline">
            Termos de uso
          </Link>
          <Link href="#" className="hover:underline">
            Políticas de privacidade
          </Link>
          <p>suporte.aportecerto@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
