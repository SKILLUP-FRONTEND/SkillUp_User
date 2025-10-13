// src/components/events/filters/filterElements/FreeFilter/index.tsx

"use client";

import styles from "./styles.module.css";

export default function FreeFilter({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) {
  return (
    <label className={styles.toggleWrapper}>
      <span className={styles.labelText}>무료만 보기</span>
      <div
        className={`${styles.toggle} ${checked ? styles.active : ""}`}
        onClick={() => setChecked(!checked)}
      >
        <div className={styles.circle} />
      </div>
    </label>
  );
}
