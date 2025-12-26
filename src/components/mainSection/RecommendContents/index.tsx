// 추천 콘텐츠
"use client";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import Text from "@/components/common/Text";

type Card = {
  id: string;
  title: string;
  desc: string;
  tag?: string;
  date?: string;
};

const mock: Card[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `rec-${i}`,
  title: "메인타이틀",
  desc: "서브타이틀이 들어가면 좋겠어요 서브타이틀이 들어가면 좋아요",
  tag: "툴스",
  date: "2020.01.01",
}));

export default function RecommendedContent() {
  return (
    <Flex
      as="section"
      className={styles.RecommendContent}
      aria-labelledby="rec-title"
      gap="2.5rem"
      direction="column"
    >
      <Flex justify="space-between" align="flex-end" gap="2.5rem">
        <Flex direction="column">
          <Text typography="sub2_m_18" color="primary-strong">
            추천 콘텐츠
          </Text>
          <Flex gap="0.5rem">
            <Text typography="head1_m_42" color="black">
              실무자를 위한
            </Text>
            <Text typography="head5_sb_42" color="black">
              추천 컨텐츠
            </Text>
          </Flex>
        </Flex>

        <TabMenu
          tabs={["전체", "기획", "디자인", "개발", "AI"]}
          defaultIndex={2}
          onChange={(tab) => console.log("선택된 탭:", tab)}
          theme="light"
        />
      </Flex>

      <div className={styles.cardList}>
        {mock.map((card, idx) => (
          <Flex
            key={card.id}
            direction="column"
            className={`${styles.card} ${idx === 0 ? styles.heroCard : ""}`}
            as="article"
            gap="0.75rem"
          >
            {/* 추후 이미지로 변경 필요 */}
            <div
              className={`${styles.thumb} ${idx === 0 ? styles.heroThumb : ""}`}
            />

            <Flex direction="column">
              <Flex align="center" justify="space-between">
                <Text typography="head4_sb_20" color="black">
                  {card.title}
                </Text>
                <Flex align="center" gap="0.5rem">
                  {/* 추후 뱃지 컴포넌트 생기면 변경 */}
                  <div className={styles.badge}>
                    <Text typography="label3_m_14" color="neutral-60">
                      {card.tag}
                    </Text>
                  </div>
                  <div className={styles.badge}>
                    <Text typography="label3_m_14" color="neutral-60">
                      {card.date}
                    </Text>
                  </div>
                </Flex>
              </Flex>

              <Text
                typography="body1_r_16"
                color="neutral-60"
                className={styles.cardDesc}
              >
                {card.desc}
              </Text>
            </Flex>
          </Flex>
        ))}
      </div>

      <Flex justify="center">
        {/* 추후 컴포넌트로 교체 */}
        <button className={styles.moreBtn}>
          <Text typography="sub3_m_16" color="neutral-60">
            아티클 더보기
          </Text>
        </button>
      </Flex>
    </Flex>
  );
}
