// src/api/article.ts

import instance from "./instance";
import { JobCategory } from "@/constants/category";

// 아티클 목록 조회 API (홈화면)
export const getArticleList = async (tab?: JobCategory) => {
  const response = await instance.get("/articles", {
    params: {
      ...(tab && { tab }),
    },
  });
  return response.data.data;
};

// 아티클 목록 조회 및 검색 API
export const searchArticles = async (
  keyword?: string,
  page?: number,
  tab?: JobCategory,
) => {
  const response = await instance.get("/articles/search", {
    params: {
      ...(keyword && { keyword }),
      ...(page !== undefined && { page }),
      ...(tab && { tab }),
    },
  });
  return response.data.data;
};

// 아티클 조회수 증가 API
export const increaseArticleViewCount = async (articleId: number) => {
  const response = await instance.post(`/articles/read/${articleId}`);
  return response.data.data;
};
