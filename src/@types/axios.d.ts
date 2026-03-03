import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    /** 401 에러 시 토큰 삭제 및 로그인 모달 표시를 건너뛸지 여부 */
    _skipAuthErrorHandling?: boolean;
  }
}
