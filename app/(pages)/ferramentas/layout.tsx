import { Header } from "@/app/components/shared/header";

export default function FerramentasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mainContainer mt-5">{children}</div>
    </>
  );
}
