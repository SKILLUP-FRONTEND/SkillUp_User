// src/components/common/Tooltip/index.tsx

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./styles.module.css";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  className,
  delay = 200,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const offset = 8;

    const top = rect.top + window.scrollY - offset;
    const left = rect.left + window.scrollX + rect.width / 2;

    setCoords({ top, left });
    setIsPositioned(true);
  }, []);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setIsPositioned(false);
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  return (
    <>
      <div
        ref={triggerRef}
        className={clsx(styles.tooltipWrapper, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            className={clsx(styles.tooltip, styles.top)}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              opacity: isPositioned ? 1 : 0,
            }}
            role="tooltip"
            aria-label={content}
          >
            {content}
            <div className={styles.arrow} />
          </div>,
          document.body
        )}
    </>
  );
}
