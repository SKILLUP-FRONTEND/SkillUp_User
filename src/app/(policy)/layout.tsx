import Header from "@/components/common/Header";

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="wrap">
      <Header variant="policy" />
      {children}
    </div>
  );
}