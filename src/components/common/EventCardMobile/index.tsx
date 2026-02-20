// src/components/common/EventCardMobile/index.tsx
"use client";

import clsx from "clsx";
import styles from "./styles.module.css";
import Image from "next/image";
import Badge from "@/components/common/Badge";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Text from "@/components/common/Text";
import IconButton from "@/components/common/IconButton";
import Flex from "@/components/common/Flex";
import { Event } from "@/types/event";
import { EVENT_CATEGORY_LABEL } from "@/constants/event";
import { useToggleEventBookmark } from "@/hooks/mutations/useToggleEventBookmark";
import LoginImage from "@/assets/images/loginImg.png";

interface EventCardMobileProps {
  event: Event;
  className?: string;
}

export default function EventCardMobile({
  event,
  className,
}: EventCardMobileProps) {
  const {
    id,
    title,
    scheduleText,
    locationText,
    priceText,
    category,
    thumbnailUrl,
    d_dayLabel,
    bookmarked,
  } = event;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const router = useRouter();
  const { mutate: toggleBookmark } = useToggleEventBookmark();

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsBookmarked(!isBookmarked);

    toggleBookmark(id, {
      onError: () => {
        setIsBookmarked(isBookmarked);
      },
    });
  };

  const imageSrc = thumbnailUrl || LoginImage.src.toString();
  const eventUrl = `/conference/${id}`;
  const categoryBadgeLabel = EVENT_CATEGORY_LABEL[category] || "";

  return (
    <Flex
      direction="column"
      gap="0"
      onClick={() => router.push(eventUrl)}
      className={clsx(styles.card, className)}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={title} className={styles.image} />
          <Flex justify="space-between" className={styles.imageOverlay}>
            <Badge label={d_dayLabel || ""} variant="opacity" />
            <IconButton
              variant="opacity"
              size="medium"
              icon={
                <BookmarkIcon
                  width={20}
                  height={20}
                  fillColor={isBookmarked ? "var(--Common-white)" : "none"}
                  strokeColor={isBookmarked ? "none" : "var(--Common-white)"}
                />
              }
              onClick={handleBookmarkClick}
              ariaLabel="북마크"
            />
          </Flex>
        </div>

        <Flex direction="column" gap="0.75rem" className={styles.content}>
          <Flex direction="column" gap="0.5rem">
            <Flex direction="column" gap="0.25rem">
              <Badge label={categoryBadgeLabel} />
              <Text
                typography="sub3_m_16"
                color="black"
                as="h3"
                className={styles.title}
              >
                {title}
              </Text>
            </Flex>
            <Flex direction="column" gap="0.125rem">
              <Flex align="center" gap="0.25rem">
                <Image
                  src={CalendarIcon}
                  alt="Calendar"
                  width={16}
                  height={16}
                />
                <Text
                  typography="label4_m_12"
                  color="neutral-40"
                  className={styles.metaText}
                >
                  {scheduleText}
                </Text>
              </Flex>
              <Flex align="center" gap="0.25rem">
                <Image src={LocationIcon} alt="Location" width={16} height={16} />
                <Text
                  typography="label4_m_12"
                  color="neutral-40"
                  className={styles.metaText}
                >
                  {locationText || "온라인"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Text typography="sub3_m_16" color="black">
            {priceText}
          </Text>
        </Flex>
      </div>
    </Flex>
  );
}
