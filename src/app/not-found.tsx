import Header from "@/components/common/Header";
import ErrorPage from "@/components/common/Error";
import Footer from "@/components/common/Footer";

export default function NotFound() {
  return (
    <>
      <Header variant="sub" />
      <ErrorPage type="404" />
      <Footer />
    </>
  );
}
