"use client";

import { useMutation } from "@tanstack/react-query";
import { increaseArticleViewCount } from "@/api/article";

export const useIncreaseArticleViewCount = () => {
  return useMutation({
    mutationFn: (articleId: number) => increaseArticleViewCount(articleId),
  });
};
