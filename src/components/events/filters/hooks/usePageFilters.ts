// src/components/events/filters/hooks/usePageFilters.ts

import { useAtom } from "jotai";
import { pageFilterAtomsMap, PageId } from "../atoms/pageFilterAtoms";

interface UsePageFiltersProps {
  pageId: PageId;
}

export const usePageFilters = ({ pageId }: UsePageFiltersProps) => {
  const atoms = pageFilterAtomsMap[pageId];

  // Atom 상태 관리
  const [selectedRoles, setSelectedRoles] = useAtom(atoms.roleFilterAtom);
  const [onOfflineFilter, setOnOfflineFilter] = useAtom(
    atoms.onOfflineFilterAtom
  );
  const [freeFilter, setFreeFilter] = useAtom(atoms.freeFilterAtom);
  const [sortOption, setSortOption] = useAtom(atoms.sortOptionAtom);
  const [tempOnOfflineFilter, setTempOnOfflineFilter] = useAtom(
    atoms.tempOnOfflineFilterAtom
  );
  const [tempFreeFilter, setTempFreeFilter] = useAtom(atoms.tempFreeFilterAtom);

  // 필터 적용 함수
  const handleApply = () => {
    setOnOfflineFilter(tempOnOfflineFilter);
    setFreeFilter(tempFreeFilter);
  };

  // 필터 초기화 함수
  const handleReset = () => {
    // 실제 필터 상태 초기화
    setOnOfflineFilter("");
    setFreeFilter(false);

    // 임시 필터 상태도 초기화
    setTempOnOfflineFilter("");
    setTempFreeFilter(false);
  };

  // 역할 필터 초기화 함수
  const resetRoleFilter = () => {
    setSelectedRoles(["전체"]);
  };

  // 정렬 옵션 초기화 함수
  const resetSortOption = () => {
    setSortOption("인기순");
  };

  // 모든 필터 초기화 함수
  const resetAllFilters = () => {
    handleReset();
    resetRoleFilter();
    resetSortOption();
  };

  return {
    // 상태
    selectedRoles,
    onOfflineFilter,
    freeFilter,
    sortOption,
    tempOnOfflineFilter,
    tempFreeFilter,

    // 액션
    setSelectedRoles,
    setOnOfflineFilter,
    setFreeFilter,
    setSortOption,
    setTempOnOfflineFilter,
    setTempFreeFilter,

    // 핸들러
    handleApply,
    handleReset,
    resetRoleFilter,
    resetSortOption,
    resetAllFilters,
  };
};
