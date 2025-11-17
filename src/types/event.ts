// src/types/event/event.ts
import { EventCategory, EventSortOption } from "@/constants/event";

export interface Event {
  id: string;
  title: string;
  date: string;
  place: string;
  price?: string;
  category: string;
  url?: string;
  image: string;
  badgeLabel?: string;
}

export interface EventDetail {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  price: string;
  place: string;
  online: boolean;
  phoneNumber: string;
  image: string;
}

// 행사 목록 조회 요청 타입
export interface EventSearchParams {
  category: EventCategory;
  isOnline?: boolean;
  isFree?: boolean;
  startDate?: string;
  endDate?: string;
  sort: EventSortOption;
  targetRoles?: string[];
  page: number;
  validDateRange?: boolean;
  validSort?: boolean;
}
