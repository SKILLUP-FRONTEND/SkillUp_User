import Link from "next/link";
import { FaRegBookmark, FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./style.module.css";
import BookmarkButton from "@/components/common/Button/BookmarkBtn";

export interface EventCardProps {
  title: string;
  category: string;
  date: string;
  location: string;
  price: string;
  dday: string;
  isFree?: boolean;
  size?: "large" | "middle";
}

const EventCard = ({
  title,
  category,
  date,
  location,
  price,
  dday,
  isFree = false,
  size = "large",
}: EventCardProps) => {
  const isMiddle = size === "middle";

  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <span className={styles.dday}>{dday}</span>
        <button className={styles.bookmarkBtn}>
          <BookmarkButton opacity={0.6} />
        </button>
      </div>

      <div className={styles.cardBody}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.infoRow}>
          <FaRegCalendarAlt className={styles.icon} />
          <p>{date}</p>
        </div>

        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.icon} />
          <p>{location}</p>
        </div>

        <div className={styles.priceGroup}>
          {isFree ? (
            <>
              <p className={styles.price}>0원</p>
              <span className={styles.freeTag}>무료</span>
            </>
          ) : (
            <p className={styles.price}>{price}</p>
          )}
          
          {/* size = middle 일 때 */}
          {!isMiddle && (
            <Link href="#" className={styles.detailBtn}>
              자세히 보기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;