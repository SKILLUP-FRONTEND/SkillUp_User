// src/components/events/filters/atoms/pageFilterAtoms.ts

import { RoleOption } from "@/components/events/filters/types/role";
import { atom } from "jotai";

// 기본 필터 상태 타입 정의
export interface PageFilterState {
  roleFilter: RoleOption[];
  onOfflineFilter: string;
  freeFilter: boolean;
  sortOption: string;
  tempOnOfflineFilter: string;
  tempFreeFilter: boolean;
}

// 페이지별 필터 상태를 관리하는 atom 생성 함수
export const createPageFilterAtoms = () => {
  return {
    roleFilterAtom: atom<RoleOption[]>(["전체"]),
    onOfflineFilterAtom: atom<string>(""),
    freeFilterAtom: atom<boolean>(false),
    sortOptionAtom: atom<string>("인기순"),
    tempOnOfflineFilterAtom: atom<string>(""),
    tempFreeFilterAtom: atom<boolean>(false),
  };
};

// 페이지별 필터 상태 atom 인스턴스들
export const conferenceFilterAtoms = createPageFilterAtoms();
export const bootcampFilterAtoms = createPageFilterAtoms();

// 페이지별 atom 매핑 객체
export const pageFilterAtomsMap = {
  conference: conferenceFilterAtoms,
  bootcamp: bootcampFilterAtoms,
} as const;

// 페이지 ID 타입
export type PageId = keyof typeof pageFilterAtomsMap;

// 페이지별 필터 상태를 초기화하는 함수
export const resetPageFilters = (
  atoms: ReturnType<typeof createPageFilterAtoms>
) => {
  return {
    roleFilter: atoms.roleFilterAtom.init,
    onOfflineFilter: atoms.onOfflineFilterAtom.init,
    freeFilter: atoms.freeFilterAtom.init,
    sortOption: atoms.sortOptionAtom.init,
    tempOnOfflineFilter: atoms.tempOnOfflineFilterAtom.init,
    tempFreeFilter: atoms.tempFreeFilterAtom.init,
  };
};
