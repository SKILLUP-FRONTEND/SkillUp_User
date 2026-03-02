// src/components/common/EmptyState/index.tsx

"use client";

import CautionIcon from "@/assets/icons/CautionIcon";
import Button from "@/components/common/Button";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

interface EmptyStateProps {
  title?: string;
  message: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonHref?: string;
  variant?: "default" | "card";
}

export default function EmptyState({
  title,
  message,
  buttonText,
  onButtonClick,
  buttonHref,
  variant = "default",
}: EmptyStateProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
      return;
    }
    if (buttonHref) {
      router.push(buttonHref);
    }
  };

  const showButton = buttonText && (onButtonClick || buttonHref);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap={1}
      className={`${styles.container} ${variant === "card" ? styles.card : ""}`}
    >
      <Flex direction="column" align="center" gap={0.5}>
        <CautionIcon
          color={
            variant === "card"
              ? "var(--Neutral-80)"
              : "var(--Primary-normal)"
          }
        />
        {title && (
          <Text typography="head4_sb_20" color="black" as="h3">
            {title}
          </Text>
        )}
        <Text
          typography={title ? "body2_r_14" : "sub2_m_18"}
          color="neutral-30"
        >
          {message}
        </Text>
      </Flex>
      {showButton && (
        <Button
          variant="secondary"
          size="medium"
          onClick={handleButtonClick}
          icon={<ChevronRightIcon width={16} height={16} />}
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  );
}
