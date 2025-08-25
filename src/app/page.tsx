/* 
  작성자 : 김재혁
  작성일 : 2025-08-21
  최종 수정일 : 2025-08-21
*/

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div id="wrap">
      <Header/>

      <main id="container">
        <section className="content">
          <div className="home one">
            <p>작업 중 입니다.</p>
          </div>
          <div className="home two"></div>
          <div className="home three"></div>
        </section>
      </main>

      <Footer/>
    </div>
  );
}
