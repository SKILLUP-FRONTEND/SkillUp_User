"use client";

import { useState } from "react";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";

export interface TabItem {
  label: string;
  value?: string;
  count?: number;
}

export interface TabProps {
  tabs: string[] | TabItem[];
  /** 제어 모드: 외부에서 활성 인덱스를 관리 */
  activeIndex?: number;
  /** 비제어 모드: 초기 활성 인덱스 (기본값: 0) */
  defaultIndex?: number;
  onChange?: (index: number, label: string, value?: string) => void;
  /**
   * - "underline": 하단 border-bottom 강조 스타일 (기본)
   * - "pill": 배경색 강조 스타일 (관심사 탭 등)
   */
  variant?: "underline" | "pill";
  /**
   * underline variant 전용.
   * - "light" / "dark": 배경 색상에 맞춘 텍스트 색. 지정 시 고정 너비(460px) TabMenu 스타일을 사용한다.
   * - undefined: Text 컴포넌트 기반의 유동 너비 TabBar 스타일을 사용한다.
   */
  theme?: "light" | "dark";
  /** underline variant의 TabBar 스타일에서 탭 정렬 방향 */
  justify?: "center" | "flex-start";
}

function normalizeTab(tab: string | TabItem): TabItem {
  if (typeof tab === "string") return { label: tab };
  return tab;
}

export default function Tab({
  tabs,
  activeIndex,
  defaultIndex = 0,
  onChange,
  variant = "underline",
  theme,
  justify = "center",
}: TabProps) {
  const isControlled = activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultIndex);

  const currentIndex = isControlled ? activeIndex : internalIndex;
  const normalizedTabs = tabs.map(normalizeTab);

  const handleSelect = (index: number) => {
    if (!isControlled) {
      setInternalIndex(index);
    }
    const tab = normalizedTabs[index];
    onChange?.(index, tab.label, tab.value);
  };

  // pill variant: 배경색 강조 (InterestTabBar 스타일)
  if (variant === "pill") {
    return (
      <div className={styles.pillTabBar}>
        {normalizedTabs.map((tab, index) => (
          <button
            key={tab.value ?? tab.label}
            className={`${styles.pillTab} ${
              currentIndex === index ? styles.pillTabActive : ""
            }`}
            onClick={() => handleSelect(index)}
          >
            <Text
              typography="label4_m_12"
              color={currentIndex === index ? "primary-heavy" : "neutral-60"}
            >
              {tab.label}
            </Text>
          </button>
        ))}
      </div>
    );
  }

  // underline variant + theme 지정 → 고정 너비 460px TabMenu 스타일 (mainSection용)
  if (theme !== undefined) {
    return (
      <div
        className={`${styles.tabWrap} ${
          theme === "dark" ? styles.dark : styles.light
        }`}
      >
        <div className={styles.tabMenu}>
          {normalizedTabs.map((tab, index) => (
            <button
              key={tab.value ?? tab.label}
              className={`${styles.tabItem} ${
                currentIndex === index ? styles.active : ""
              }`}
              onClick={() => handleSelect(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // underline variant + theme 미지정 → 유동 너비 TabBar 스타일 (EventDetail, Bookmark용)
  return (
    <Flex justify={justify}>
      {normalizedTabs.map((tab, index) => {
        const isActive = index === currentIndex;
        return (
          <Flex
            key={tab.value ?? tab.label}
            as="button"
            align="center"
            gap={0.5}
            className={`${styles.underlineTab} ${isActive ? styles.underlineTabActive : ""}`}
            onClick={() => handleSelect(index)}
          >
            <Text typography="sub3_m_16" color="black">
              {tab.label}
            </Text>
            {typeof tab.count === "number" && (
              <Text typography="sub3_m_16" color="primary-strong">
                {tab.count}
              </Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
