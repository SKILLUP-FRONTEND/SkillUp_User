// src/app/conference/[id]/ConferenceDetailLayout.tsx

import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";
import EventInfoCard from "@/components/events/detail/EventInfoCard";
import Badge from "@/components/common/Badge";
import GlobeIcon from "@/assets/svg/globeIcon.svg";
import CursorIcon from "@/assets/svg/cursorIcon.svg";
import Image from "next/image";

export default function ConferenceDetailLayout() {
  return (
    <div className={styles.conferenceDetailLayout}>
      <StickyApplySection />
      <div className={styles.conferenceDetailContent}>
        <EventInfoCard title="행사 설명">asdf</EventInfoCard>
        <EventInfoCard title="모집 기간" isDate>
          <div className={styles.eventInfoCardContentDate}>
            <p>2025.01.01 ~ 2025.01.01</p>
            <Badge label="N일 남았어요" />
          </div>
        </EventInfoCard>
        <EventInfoCard title="참가비">
          <div className={styles.eventInfoCardContentPrice}>
            <p>0원</p>
            <Badge label="무료" />
          </div>
        </EventInfoCard>
        <EventInfoCard title="장소">
          <div className={styles.eventInfoCardContentPlaceList}>
            <div className={styles.eventInfoCardContentPlace}>
              <Image src={GlobeIcon} alt="globe icon" />
              <p>오프라인</p>
            </div>
            <div className={styles.eventInfoCardContentPlace}>
              <Image src={CursorIcon} alt="cursor icon" />
              <p>서울특별시 강남구 테헤란로 22길</p>
            </div>
          </div>
        </EventInfoCard>
      </div>
    </div>
  );
}
