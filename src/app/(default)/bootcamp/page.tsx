// src/app/bootcamp/page.tsx

import EventPageLayout from "@/components/events/EventPageLayout";
import { buildEventPageParams } from "@/utils/buildEventPageParams";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BootcampPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { apiParams, initialEventList } = await buildEventPageParams(
    "BOOTCAMP_CLUB",
    params
  );

  return (
    <div style={{ paddingTop: "6.25rem" }}>
      <EventPageLayout
        pageId="bootcamp"
        initialEventList={initialEventList}
        initialParams={apiParams}
      />
    </div>
  );
}
