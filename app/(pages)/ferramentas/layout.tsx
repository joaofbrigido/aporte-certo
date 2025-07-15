export default function FerramentasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mainContainer mt-5">{children}</div>;
}
