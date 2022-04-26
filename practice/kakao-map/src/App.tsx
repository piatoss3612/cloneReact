import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    const script = document.createElement("script"); // script 엘리먼트 생성
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=2af257efdd426ec77a1cb62f764e4aa5&autoload=false"; // kakao map api를 동적으로 불러오는 경우, autoload=false를 설정해준다

    document.head.appendChild(script); // head의 자식 노드로 script 엘리먼트 추가

    // script 엘리먼트의 로드가 완료된 경우
    script.onload = () => {
      // kakao map api의 로드가 완료된 경우
      window.kakao.maps.load(() => {
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };

    return () => script.remove();
  }, []);

  return (
    <>
      <div ref={mapRef} id="map" style={{ width: 300, height: 300 }}></div>
    </>
  );
}

export default App;
