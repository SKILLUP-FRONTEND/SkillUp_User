# SkillUp - IT 행사 정보 플랫폼

컨퍼런스, 해커톤, 부트캠프, 연합 동아리 등 IT 행사 정보를 한눈에 확인할 수 있는 웹 플랫폼입니다.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| State Management | Jotai, TanStack React Query |
| Styling | CSS Modules, Tailwind CSS |
| HTTP Client | Axios |
| Testing | Vitest, Playwright |
| UI Documentation | Storybook |
| Deployment | Vercel |

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 스토리북 실행
npm run storybook
```

## Branch Strategy

| Branch | Environment | URL |
|--------|-------------|-----|
| `main` | Production | [skillup.ai.kr](https://skillup.ai.kr) |
| `develop` | Preview | dev-skillup.vercel.app |

## Project Structure

```
src/
├── app/                  # Next.js App Router 페이지
├── assets/               # 아이콘, 이미지, SVG
├── components/           # UI 컴포넌트
│   ├── common/           #   공통 컴포넌트 (Button, Modal, Header 등)
│   └── events/           #   행사 관련 컴포넌트 (Card, Filter 등)
├── constants/            # 상수 정의
├── hooks/                # 커스텀 훅
├── lib/                  # 외부 라이브러리 설정
├── providers/            # Context/Provider
├── services/             # API 호출
├── styles/               # 글로벌 스타일
├── types/                # 타입 정의
└── utils/                # 유틸리티 함수
```
