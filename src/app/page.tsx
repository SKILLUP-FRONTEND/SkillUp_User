/* 
  작성자 : 김재혁
  작성일 : 2025-08-21
  최종 수정일 : 2025-09-29
*/

"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import LoginContent from "@/components/login/LoginContent";
import Modal from "@/components/common/Modal";

import styles from "./main.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div id="wrap">
      {/* 시각장애인용 */}
      <p id="skipNav" className="hide">
        <Link href="#main">본문 바로가기</Link>
      </p>

      <Header />

      {/* mainVisual */}
      <section id="mainVisual">
          <ul className={styles.slider}>
              <li className={styles.slide}>비주얼 배너1</li>
              <li className={styles.slide}>비주얼 배너2</li>
              <li className={styles.slide}>비주얼 배너3</li>
              
              <ul className={styles.remoteCon}>
                <li>
                  <Link href="#">&lt;</Link>
                </li>
                <li>
                  <span>1</span>
                  /
                  <span>2</span>
                </li>
                <li>
                  <Link href="#">&gt;</Link>
                </li>
              </ul>
          </ul>
      </section>

      {/* main */}
      <main id="container" className={styles.main}>
        <section className={styles.sectionOne}>
          <h2>요즘 HOT한 행사</h2>
          <ul className={styles.tab}>
            <li><a href="#" className={styles.on}>IT 전체</a></li>
            <li><a href="#">기획</a></li>
            <li><a href="#">디자인</a></li>
            <li><a href="#">개발</a></li>
            <li><a href="#">AI</a></li>
          </ul>

          <div className={styles.cardList}>
            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            {/* 2 */}
            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>

            <div className={styles.card}>
              <span className={styles.badge}>마감 D-1</span>
              <p className={styles.category}>[카테고리]</p>
              <h3 className={styles.title}>사회 변화하는 미래 개발 트렌드 2025</h3>
              <p className={styles.date}>2025.12.12 ~ 2025.12.31</p>
              <p className={styles.price}>₩ 30,000~</p>
            </div>
          </div>

          <button className={styles.btnMore}>IT 인기 행사 더보기</button>
        </section>

        <section className={styles.sectionTwo}>
          <h2>실력을 다지고 싶다면, 부트캠프로!</h2>
        </section>
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginContent />
      </Modal>
    </div>
  );
}
