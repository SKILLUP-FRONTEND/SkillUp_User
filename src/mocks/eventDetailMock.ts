// src/mocks/eventDetailMock.ts

import { EventDetail } from "@/types/event";
import LoginImage from "@/assets/images/loginImg.png";
import { EVENT_CATEGORY } from "@/constants/event";
export const eventDetailMock: EventDetail[] = [
  {
    id: 1,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    title: "디자인 트렌드 2025 컨퍼런스",
    description: "디자인 트렌드 2025 컨퍼런스",
    date: "2025.01.01 - 2025.01.02",
    price: 0,
    place: "서울 성동구 성수이로",
    online: false,
    phoneNumber: "010-1234-1234",
    image: LoginImage.src.toString(),
  },
  {
    id: 2,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    title: "AI 리더스 서밋",
    description: "AI 리더스 서밋",
    date: "2025.02.01 - 2025.02.02",
    price: 50000,
    place: "서울 강남구 테헤란로",
    online: true,
    phoneNumber: "010-1234-1234",
    image: LoginImage.src.toString(),
  },
  {
    id: 3,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    title: "개발자 밋업",
    description: "개발자 밋업",
    date: "2025.03.01",
    price: 0,
    place: "온라인",
    online: true,
    phoneNumber: "010-1234-1234",
    image: LoginImage.src.toString(),
  },
  {
    id: 4,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    title: "기획자들의 밤",
    description: "기획자들의 밤",
    date: "2025.04.05",
    price: 0,
    place: "부산 해운대구",
    online: false,
    phoneNumber: "010-1234-1234",
    image: LoginImage.src.toString(),
  },
];
