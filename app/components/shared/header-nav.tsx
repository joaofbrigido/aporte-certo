"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <nav className="max-md:hidden">
      <ul className="flex items-center gap-7">
        <li>
          <Link href="#features" className="hover:underline">
            Funcionalidades
          </Link>
        </li>
        <li>
          <Link href="#prices" className="hover:underline">
            Preços
          </Link>
        </li>
        <li>
          <Link href="#faq" className="hover:underline">
            Faq
          </Link>
        </li>
        <li>
          <Link
            href="/ferramentas/controle-do-aporte"
            className="hover:underline"
          >
            Calculadoras
          </Link>
        </li>
      </ul>
    </nav>
  );
}
