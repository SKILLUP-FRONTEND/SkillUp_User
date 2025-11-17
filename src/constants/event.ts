// src/constants/event.ts

// 행사 카테고리
export const EVENT_CATEGORY = {
  CONFERENCE_SEMINAR: "CONFERENCE_SEMINAR",
  BOOTCAMP_CLUB: "BOOTCAMP_CLUB",
  COMPETITION_HACKATHON: "COMPETITION_HACKATHON",
  NETWORKING_MENTORING: "NETWORKING_MENTORING",
} as const;

export type EventCategory =
  (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];

// 행사 정렬 옵션
export const EVENT_SORT_OPTIONS = {
  POPULARITY: "popularity",
  LATEST: "latest",
  DEADLINE: "deadline",
} as const;

export type EventSortOption =
  (typeof EVENT_SORT_OPTIONS)[keyof typeof EVENT_SORT_OPTIONS];
