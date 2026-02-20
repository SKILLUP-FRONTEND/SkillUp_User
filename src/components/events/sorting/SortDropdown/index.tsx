// src/components/events/sorting/SortDropdown/index.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { DropdownOption } from "@/components/common/Dropdown";
import Text from "@/components/common/Text";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import styles from "./styles.module.css";

export default function SortDropdown({
  selected,
  setSelected,
  options,
}: {
  selected: DropdownOption;
  setSelected: (option: DropdownOption) => void;
  options: DropdownOption[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.sortDropdown} ref={dropdownRef}>
      <button type="button" className={styles.button} onClick={() => setIsOpen((prev) => !prev)}>
        <Text typography="label2_m_16" color="neutral-20">
          {selected.label}
        </Text>
        <ChevronDownIcon color="var(--Neutral-40)" />
      </button>

      {isOpen && (
        <div className={styles.list}>
          {options.map((option) => {
            const isActive = option.value === selected.value;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                onClick={() => handleSelect(option)}
              >
                <Text typography="label2_m_16" color={isActive ? "white" : "neutral-20"}>
                  {option.label}
                </Text>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
