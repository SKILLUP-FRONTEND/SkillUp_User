// src/components/events/EventPageLayout/config.ts

import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import BootcampFilterView from "@/components/events/filters/views/BootcampFilterView";
import HackathonFilterView from "@/components/events/filters/views/HackathonFilterView";
import MentoringFilterView from "@/components/events/filters/views/MentoringFilterView";

export type PageId = "conference" | "bootcamp" | "hackathon" | "mentoring";

export interface PageConfig {
  pageId: PageId;
  title: string;
  FilterView: React.ComponentType;
  emptyUrl: string;
}

export const PAGE_CONFIGS: Record<PageId, PageConfig> = {
  conference: {
    pageId: "conference",
    title: "컨퍼런스 · 세미나",
    FilterView: ConferenceFilterView,
    emptyUrl: "/conference/create",
  },
  bootcamp: {
    pageId: "bootcamp",
    title: "부트캠프",
    FilterView: BootcampFilterView,
    emptyUrl: "/bootcamp/create",
  },
  hackathon: {
    pageId: "hackathon",
    title: "동아리 · 해커톤 · 공모전",
    FilterView: HackathonFilterView,
    emptyUrl: "/hackathon/create",
  },
  mentoring: {
    pageId: "mentoring",
    title: "네트워킹 · 멘토링",
    FilterView: MentoringFilterView,
    emptyUrl: "/mentoring/create",
  },
} as const;
