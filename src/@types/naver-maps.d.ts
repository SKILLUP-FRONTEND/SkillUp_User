// src/@types/naver-maps.d.ts
// 네이버 지도 API 타입 정의

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: HTMLElement, options: NaverMapOptions) => NaverMap;
        Marker: new (options: NaverMarkerOptions) => NaverMarker;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Position: {
          TOP_RIGHT: number;
          TOP_LEFT: number;
          BOTTOM_RIGHT: number;
          BOTTOM_LEFT: number;
        };
      };
    };
  }

  interface NaverMapOptions {
    center: NaverLatLng;
    zoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: {
      position: number;
    };
  }

  interface NaverMap {
    destroy: () => void;
  }

  interface NaverMarkerOptions {
    position: NaverLatLng;
    map: NaverMap;
  }

  interface NaverMarker {
    setMap: (map: NaverMap | null) => void;
  }

  interface NaverLatLng {
    lat: () => number;
    lng: () => number;
  }
}

export {};
