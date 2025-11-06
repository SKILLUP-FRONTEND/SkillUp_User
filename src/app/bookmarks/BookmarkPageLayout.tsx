// src/app/my/bookmarks/BookmarkPageLayout.tsx

"use client";

import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import ProfileCard from "@/components/myPage/bookmarks/ProfileCard";
import Pagination from "@/components/common/Pagination";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";
import TabBar from "@/components/common/TabBar";
import { Event } from "@/types/event/event";

const sortOptions: DropdownOption[] = [
  { label: "마감임박순", value: "deadline" },
  { label: "최근 북마크순", value: "recent" },
];

export default function BookmarkPageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  return (
    <div className={styles.bookmarkPageLayout}>
      {/* 목업 데이터 */}
      <ProfileCard
        name="홍길동"
        email="skillup@gmail.com"
        job="개발자"
        bookmarkCount={3}
      />
      <div className={styles.bookmarkListContainer}>
        <div className={styles.bookmarkListHeader}>
          <div className={styles.bookmarkListHeaderFilter}>
            <TabBar
              tabs={[
                { label: "진행 중", count: 10 },
                { label: "종료", count: 10 },
              ]}
              activeIndex={0}
              onChange={(index) => {
                console.log(index);
              }}
            />
            <Dropdown
              options={sortOptions}
              selected={sortOptions[0]}
              onSelect={(option) => {
                console.log(option);
              }}
            />
          </div>
          <div className={styles.bookmarkCardList}>
            {eventList.map((event, index) => (
              <EventCard key={index} size="medium" event={event} />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={() => {}}
          options={[]}
          selected={{ label: "1", value: "1" }}
          onSelect={(option) => {
            console.log(option);
          }}
          goToPage={false}
        />
      </div>
    </div>
  );
}
