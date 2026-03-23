// src/app/profile/bookmarks/page.tsx

"use client";

import BookmarkPageLayout from "./BookmarkPageLayout";
import styles from "./styles.module.css";

export default function BookmarksPage() {
  return (
    <div className={styles.pageWrapper}>
      <BookmarkPageLayout />
    </div>
  );
}
