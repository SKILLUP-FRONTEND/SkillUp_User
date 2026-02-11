import MainVisual from "@/components/mainSection/MainVisual";
import RecommendNow from "@/components/mainSection/RecommendNow";
import RecommendInterest from "@/components/mainSection/RecommendInterest";
import RecommendDeadline from "@/components/mainSection/RecommendDeadline";
import RecentEvents from "@/components/mainSection/RecentEvents";
import MiddleBanner from "@/components/mainSection/MiddleBanner";
import Club from "@/components/mainSection/Club";
import RecommendContents from "@/components/mainSection/RecommendContents";
import Bootcamp from "@/components/mainSection/Bootcamp";
import IconMenu from "@/components/mainSection/MainVisual/IconMenu";
// import NewsletterCTA from "@/components/mainSection/NewsletterCTA";

export default function Home() {
  // prefetch 제거: 페이지 즉시 렌더링, 각 섹션이 독립적으로 데이터 로드
  // 장점: 빠른 초기 로딩, API 느려도 페이지 표시, 빌드 시 API 호출 없음
  return (
    <>
      <MainVisual />
      <IconMenu />

      {/* main */}
      <main id="container">
        {/* 추천 행사 - 지금 주목받고 있어요 */}
        <RecommendNow />
        {/* 추천 행사 - 관심있어하실 행사 */}
        <RecommendInterest />
        {/* 추천 행사 - 신청 마감 행사 */}
        <RecommendDeadline />
        {/* 추천 컨텐츠 */}
        <RecommendContents />
        {/* 미들배너 */}
        <MiddleBanner />
        {/* 최근 본 행사 */}
        <RecentEvents />
        {/* 부트캠프 */}
        <Bootcamp />
        {/* 동아리, 해커톤, 공모전 */}
        <Club />
        {/* 뉴스레터 CTA */}
        {/* <NewsletterCTA /> */}
      </main>
    </>
  );
}
