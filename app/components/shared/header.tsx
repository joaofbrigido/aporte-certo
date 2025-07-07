import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <header className="border-b py-4">
      <div className="mainContainer flex items-center justify-between gap-5">
        <Link href="/">
          <Image
            src="/logo-aportecerto.png"
            alt="Aporte Certo Logo"
            width={300}
            height={300}
            priority
            className="w-[171px] h-[36px] object-contain"
          />
        </Link>

        <ModeToggle />
      </div>
    </header>
  );
};
