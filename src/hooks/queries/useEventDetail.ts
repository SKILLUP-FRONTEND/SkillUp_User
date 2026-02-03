// src/hooks/queries/useEventDetail.ts

import { useQuery } from "@tanstack/react-query";
import { getEventDetail } from "@/api/events";
import { queryKeys } from "../queryKeys";
import { useAuth } from "../useAuth";

export const useEventDetail = (eventId: number) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.event(eventId),
    queryFn: () => getEventDetail(eventId, isAuthenticated),
    enabled: !!eventId, // eventId가 있을 때만 쿼리 실행
  });
};
