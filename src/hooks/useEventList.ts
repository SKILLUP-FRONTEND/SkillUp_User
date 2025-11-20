// src/hooks/useEventList.ts

import { useQuery } from "@tanstack/react-query";
import { getEventList } from "@/api/events";
import { EventSearchParams, Event } from "@/types/event";

export const useEventList = (
  params: EventSearchParams,
  initialData?: Event[],
  initialParams?: EventSearchParams
) => {
  // 초기 params와 현재 params가 정확히 일치할 때만 initialData 사용
  const shouldUseInitialData =
    initialData &&
    initialParams &&
    JSON.stringify(params) === JSON.stringify(initialParams);

  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEventList(params),
    initialData: shouldUseInitialData ? initialData : undefined,
    staleTime: 0, // 항상 최신 데이터를 fetch하도록 설정
  });
};
