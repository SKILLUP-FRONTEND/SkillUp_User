// src/components/common/IconButton/index.tsx

import clsx from "clsx";
import styles from "./styles.module.css";

interface IconButtonProps {
  variant: "primary" | "secondary" | "disabled" | "opacity";
  size?: "small" | "medium" | "large" | "extraLarge";
  disabled?: boolean;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel: string;
}

export default function IconButton({
  variant,
  size,
  disabled,
  icon,
  onClick,
  className,
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      className={clsx(
        styles.iconButton,
        className,
        styles[variant],
        size && styles[size],
        {
          [styles.disabled]: disabled,
        }
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}
