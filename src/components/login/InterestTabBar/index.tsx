// src/components/login/ProfileEditContent/InterestTabBar/index.tsx

"use client";
import React from "react";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import { ROLE_DISPLAY_OPTIONS } from "@/constants/role";

interface InterestTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function InterestTabBar({
  activeTab,
  onTabChange,
}: InterestTabBarProps) {
  return (
    <div className={styles.tabBar}>
      {ROLE_DISPLAY_OPTIONS.map((tab) => (
        <button
          key={tab.value}
          className={`${styles.tab} ${
            activeTab === tab.value ?  styles.active : ""
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          <Text
            typography="label4_m_12"
            color={activeTab === tab.value ? "primary-heavy" : "neutral-60"}
          >
            {tab.label}
          </Text>
        </button>
      ))}
    </div>
  );
}
