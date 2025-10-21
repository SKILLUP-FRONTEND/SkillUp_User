// src/components/events/detail/EventInfoCard/index.tsx

import styles from "./styles.module.css";
import Image from "next/image";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";

export default function EventInfoCard({
  children,
  title,
  isDate = false,
}: {
  children: React.ReactNode;
  title: string;
  isDate?: boolean;
}) {
  return (
    <div className={styles.eventInfoCard}>
      <div className={styles.eventInfoCardHeader}>
        <div className={styles.eventInfoCardTitle}>
          <div className={styles.eventInfoDivider} />
          <h3>{title}</h3>
        </div>
        {isDate && (
          <Image src={CalendarIcon} alt={title} width={24} height={24} />
        )}
      </div>

      <div className={styles.eventInfoCardContent}>{children}</div>
    </div>
  );
}
