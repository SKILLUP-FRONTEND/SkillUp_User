"use client";

import type { Article } from "@/types/article";
import { useIncreaseArticleViewCount } from "@/hooks/mutations/useIncreaseArticleViewCount";

interface HandleArticleClickOptions {
  newTab?: boolean;
}

export const useArticleClick = () => {
  const { mutateAsync } = useIncreaseArticleViewCount();

  const handleArticleClick = async (
    article: Pick<Article, "id" | "originalUrl">,
    options?: HandleArticleClickOptions
  ) => {
    const openInNewTab = options?.newTab ?? false;
    const openedWindow = openInNewTab
      ? window.open("", "_blank", "noopener,noreferrer")
      : null;

    try {
      await mutateAsync(article.id);
    } catch (error) {
      console.error("Failed to increase article view count:", error);
    } finally {
      if (openInNewTab) {
        if (openedWindow) {
          openedWindow.opener = null;
          openedWindow.location.href = article.originalUrl;
          return;
        }

        window.open(article.originalUrl, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.assign(article.originalUrl);
    }
  };

  return { handleArticleClick };
};
