// src/components/common/Badge/index.tsx

import clsx from "clsx";
import styles from "./styles.module.css";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "disable";
  size?: "small" | "middle" | "large";
}

export default function Badge({
  label,
  variant = "secondary",
  size = "small",
}: BadgeProps) {
  return (
    <div className={clsx(styles.badge, styles[variant], styles[size])}>
      <span>{label}</span>
    </div>
  );
}
