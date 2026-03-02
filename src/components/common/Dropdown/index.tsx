// src/components/common/Dropdown/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import Text from "../Text";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (value: DropdownOption) => void;
  buttonLabel?: string;
  className?: string;
  block?: boolean;
  spaceBetween?: boolean;
  variant?: "default" | "sort";
}

export default function Dropdown({
  options,
  selected,
  onSelect,
  buttonLabel,
  className,
  block,
  spaceBetween,
  variant = "default",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  // 외부 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSort = variant === "sort";

  return (
    <div
      className={`${styles.dropdown} ${isSort ? styles.sortVariant : ""} ${className || ""} ${
        block ? styles.block : ""
      }`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${styles.dropdownButton} ${isSort ? styles.sortButton : ""} ${
          spaceBetween ? styles.spaceBetween : ""
        }`}
        onClick={toggleOpen}
      >
        <Text
          typography={isSort ? "label2_m_16" : "body1_r_16"}
          color="neutral-20"
        >
          {buttonLabel || selected.label}
        </Text>
        <ChevronDownIcon color={isSort ? "var(--Neutral-40)" : undefined} />
      </button>
      {isOpen && (
        <div className={`${styles.dropdownList} ${isSort ? styles.sortList : ""}`}>
          {options.map((opt) => {
            const isActive = opt.value === selected.value;
            return isSort ? (
              <button
                key={opt.value}
                type="button"
                className={`${styles.sortItem} ${isActive ? styles.sortItemActive : ""}`}
                onClick={() => handleSelect(opt)}
              >
                <Text
                  typography="label2_m_16"
                  color={isActive ? "white" : "neutral-20"}
                >
                  {opt.label}
                </Text>
              </button>
            ) : (
              <li
                key={opt.value}
                className={`${styles.dropdownItem} ${isActive ? styles.active : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}
