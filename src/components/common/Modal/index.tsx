// src/components/common/Modal/index.tsx

"use client";

import { useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import styles from "./styles.module.css";

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, toggle, children }: ModalProps) {
  // 포커스 복원을 위해 모달 열기 전 포커스 요소 저장
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // 포커스 복원 로직
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle]);

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={toggle}>
      <FocusLock returnFocus={false}>
        <div
          role="dialog"
          aria-modal="true"
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </FocusLock>
    </div>
  );
}
