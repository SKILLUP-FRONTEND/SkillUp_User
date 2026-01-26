// src/components/common/NaverMap/index.tsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface NaverMapProps {
  address: string;
  width?: string;
  height?: string;
}

export default function NaverMap({
  address,
  width = "100%",
  height = "300px",
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 네이버 지도 SDK가 로드되지 않았으면 대기
    if (!window.naver || !window.naver.maps) {
      console.warn("Naver Maps SDK not loaded yet");
      return;
    }

    if (!mapRef.current) return;

    // 임시로 강남역 좌표 사용
    const position = new window.naver.maps.LatLng(37.4979, 127.0276);

    // 지도 생성
    const map = new window.naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    });

    // 마커 생성
    new window.naver.maps.Marker({
      position: position,
      map: map,
    });

    // cleanup
    return () => {
      map.destroy();
    };
  }, [address]);

  return (
    <div
      ref={mapRef}
      className={styles.mapContainer}
      style={{ width, height }}
    />
  );
}
