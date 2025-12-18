import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="wrap">
      {/* 시각장애인용 */}
      <p id="skipNav" className="hide">
        <Link href="/">본문 바로가기</Link>
      </p>

      <Header variant="main" />
      {children}
      <Footer />
    </div>
  );
}
