// src/components/events/filters/atoms/filterAtoms.ts

import { RoleOption } from "@/components/events/filters/types/role";
import { atom } from "jotai";

export const roleFilterAtom = atom<RoleOption[]>(["전체"]);
export const onOfflineFilterAtom = atom<string>("");
export const freeFilterAtom = atom<boolean>(false);
export const sortOptionAtom = atom<string>("인기순");

// 임시 필터 상태
export const tempOnOfflineFilterAtom = atom<string>("");
export const tempFreeFilterAtom = atom<boolean>(false);