"use client";

import { useState } from "react";
import { SERVICE_TERMS, PRIVACY_POLICY } from "@/constants/policyPages";
import Text from "@/components/common/Text";
import styles from "./styles.module.css";
import clsx from "clsx";

type TabType = "service" | "privacy";

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("service");

  const currentPolicy = activeTab === "service" ? SERVICE_TERMS : PRIVACY_POLICY;
  const currentDate = "2026년 1월 9일";

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* 헤더 섹션 */}
        <div className={styles.header}>
          <Text typography="head1_b_42" color="black">
            서비스 정책
          </Text>
        </div>

        {/* 탭 섹션 */}
        <div className={styles.tabContainer}>
          <button
            className={clsx(styles.tab, {
              [styles.tabActive]: activeTab === "service",
            })}
            onClick={() => setActiveTab("service")}
          >
            <Text
              typography="head4_sb_20"
              color={activeTab === "service" ? "black" : "neutral-70"}
            >
              서비스이용약관
            </Text>
          </button>
          <button
            className={clsx(styles.tab, {
              [styles.tabActive]: activeTab === "privacy",
            })}
            onClick={() => setActiveTab("privacy")}
          >
            <Text
              typography="head4_sb_20"
              color={activeTab === "privacy" ? "black" : "neutral-70"}
            >
              개인정보처리방침
            </Text>
          </button>
        </div>

        {/* 약관 내용 */}
        <div className={styles.contentContainer}>
          {/* 제목과 날짜 */}
          <div className={styles.titleSection}>
            <Text typography="head2_sb_30" color="black">
              {activeTab === "service"
                ? "스킬업 서비스이용약관"
                : "스킬업 개인정보처리방침"}
            </Text>
            <div className={styles.dateDropdown}>
              <Text typography="body1_r_16" color="neutral-70">
                {currentDate}
              </Text>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 약관 섹션들 */}
          <div className={styles.sections}>
            {currentPolicy.map((section, index) => (
              <div key={index} className={styles.section}>
                {section.title && (
                  <Text
                    typography="head4_sb_20"
                    color="black"
                    className={styles.sectionTitle}
                  >
                    {section.title}
                  </Text>
                )}
                {section.content.map((paragraph, pIndex) => (
                  <Text
                    key={pIndex}
                    typography="body2_r_14"
                    color="black"
                    className={styles.paragraph}
                  >
                    {paragraph}
                  </Text>
                ))}
                {section.table && (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {section.table.headers.map((header, hIndex) => (
                          <th key={hIndex}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIndex) => (
                        <tr key={rIndex}>
                          {row.map((cell, cIndex) => (
                            <td key={cIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
