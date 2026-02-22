// src/components/events/EventPageHeader/index.tsx

"use client";

import EventHeader from "@/components/events/EventHeader";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import RoleSelector from "@/components/events/filters/RoleSelector";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Flex from "@/components/common/Flex";
import { SORT_OPTIONS } from "@/constants/pagination";
import { JobCategory } from "@/constants/category";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface EventPageHeaderProps {
  title: string;
  count: number;
  selectedRoles: JobCategory[];
  onRolesChange: (roles: JobCategory[]) => void;
  onOfflineFilter: string;
  freeFilter: boolean;
  onClearOnOfflineFilter: () => void;
  onClearFreeFilter: () => void;
  sortOption: string;
  onSortChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  FilterView: React.ComponentType;
}

export default function EventPageHeader({
  title,
  count,
  selectedRoles,
  onRolesChange,
  onOfflineFilter,
  freeFilter,
  onClearOnOfflineFilter,
  onClearFreeFilter,
  sortOption,
  onSortChange,
  onApply,
  onReset,
  FilterView,
}: EventPageHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <Flex direction="column" gap={1.5} style={{ width: "100%" }}>
      <EventHeader title={title} count={count} />
      {isMobile ? (
        // 모바일: 세로 정렬
        <Flex direction="column" gap={0.75} style={{ width: "100%" }}>
          <RoleSelector selected={selectedRoles} onSelect={onRolesChange} />
          <Flex align="center" justify="flex-end" gap={0.5}>
            <FilterBadges
              onOfflineFilter={onOfflineFilter}
              freeFilter={freeFilter}
              onClearOnOfflineFilter={onClearOnOfflineFilter}
              onClearFreeFilter={onClearFreeFilter}
            />
            <FilterButton onApply={onApply} onReset={onReset}>
              <FilterView />
            </FilterButton>
            <SortDropdown
              selected={
                SORT_OPTIONS.find((option) => option.value === sortOption) ||
                SORT_OPTIONS[0]
              }
              setSelected={(option) => onSortChange(option.value)}
              options={SORT_OPTIONS}
            />
          </Flex>
        </Flex>
      ) : (
        // 태블릿/데스크톱: 가로 정렬
        <Flex align="center" justify="space-between">
          <RoleSelector selected={selectedRoles} onSelect={onRolesChange} />
          <Flex align="center" gap={0.5}>
            <FilterBadges
              onOfflineFilter={onOfflineFilter}
              freeFilter={freeFilter}
              onClearOnOfflineFilter={onClearOnOfflineFilter}
              onClearFreeFilter={onClearFreeFilter}
            />
            <FilterButton onApply={onApply} onReset={onReset}>
              <FilterView />
            </FilterButton>
            <SortDropdown
              selected={
                SORT_OPTIONS.find((option) => option.value === sortOption) ||
                SORT_OPTIONS[0]
              }
              setSelected={(option) => onSortChange(option.value)}
              options={SORT_OPTIONS}
            />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
