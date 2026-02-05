// src/api/events.ts

import { EventCategory } from "@/constants/event";
import tokenInstance from "./tokenInstance";
import instance from "./instance";
import {
  Event,
  EventSearchParams,
  EventListResponse,
  EventSearchRequest,
} from "@/types/event";

// 행사 등록 API (인증 필요)
// TODO : Event 타입 맞지 않아서 추후 변경 필요
export const createEvent = async (event: Event) => {
  const response = await tokenInstance.post("/events", event);
  return response.data.data;
};

// 행사 목록 조회 API (공개)
export const getEventList = async (
  eventSearchParams: EventSearchParams,
  isAuthenticated: boolean = false
): Promise<EventListResponse> => {
  // 필수 필드와 선택 필드 분리
  const { category, sort, page, ...optionalParams } = eventSearchParams;

  // 선택 필드 중 값이 있는 것만 필터링
  const filteredOptionalParams = Object.entries(optionalParams).reduce(
    (acc, [key, value]) => {
      // undefined, null, 빈 문자열, 빈 배열 제외
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        acc[key as keyof typeof optionalParams] = value as never;
      }
      return acc;
    },
    {} as Partial<EventSearchParams>
  );

  // 필수 필드 + 필터링된 선택 필드
  const params = {
    category,
    sort,
    page,
    ...filteredOptionalParams,
  };

  const axiosInstance = isAuthenticated ? tokenInstance : instance;
  const response = await axiosInstance.post("/events/category-page/search", params);
  return response.data.data;
};

// 행사 상세 조회 API (공개)
export const getEventDetail = async (
  eventId: number,
  isAuthenticated: boolean = false
) => {
  const axiosInstance = isAuthenticated ? tokenInstance : instance;
  const response = await axiosInstance.get(`/events/${eventId}`);
  return response.data.data;
};

// 행사 수정 API (인증 필요)
export const updateEvent = async (eventId: number) => {
  const response = await tokenInstance.put(`/events/${eventId}`);
  return response.data.data;
};

// 행사 삭제 API (인증 필요)
export const deleteEvent = async (eventId: number) => {
  const response = await tokenInstance.delete(`/events/${eventId}`);
  return response.data.data;
};

// "이런 행사는 어때요" 추천 행사 조회 API (공개)
export const getRecommendedEvents = async (
  category: EventCategory,
  isAuthenticated: boolean = false
) => {
  const axiosInstance = isAuthenticated ? tokenInstance : instance;
  const response = await axiosInstance.get("/events/category-page/recommended", {
    params: {
      category,
    },
  });
  return response.data.data;
};

// 행사 검색
export const searchEvents = async (
  searchParams: EventSearchRequest,
  isAuthenticated: boolean = false
): Promise<EventListResponse> => {
  const axiosInstance = isAuthenticated ? tokenInstance : instance;
  const response = await axiosInstance.post("/events/search/home", searchParams);
  return response.data.data;
};

// 행사 북마크 토글 (로그인 필수)
export const toggleEventBookmark = async (eventId: number) => {
  // 북마크는 로그인이 필요한 기능이므로 항상 tokenInstance 사용
  // 401 에러 발생 시 tokenInstance interceptor가 자동으로 로그인 모달 표시
  const response = await tokenInstance.patch(`/events/${eventId}/bookmarked`);
  return response.data.data;
};
