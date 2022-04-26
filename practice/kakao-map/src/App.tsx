import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [markerList, setMarkerList] = useState<any[]>([]);

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
        map.current = new window.kakao.maps.Map(container, options);

        window.kakao.maps.event.addListener(
          map.current,
          "rightclick",
          (mouseEvent: any) => {
            var latlng = mouseEvent.latLng;
            const title = prompt("마커의 제목을 입력하세요:");
            var marker = new window.kakao.maps.Marker({
              map: map.current,
              position: latlng,
              title,
            });
            setMarkerList((prev) => [...prev, marker]);
          }
        );
      });
    };

    return () => script.remove();
  }, []);

  return (
    <>
      <div ref={mapRef} id="map" style={{ width: 300, height: 300 }}></div>
      <div>
        <button
          onClick={() => {
            map.current.setCenter(
              new window.kakao.maps.LatLng(37.5665, 126.978)
            );
          }}
        >
          서울
        </button>
        <button
          onClick={() => {
            map.current.setCenter(
              new window.kakao.maps.LatLng(35.1796, 129.0756)
            );
          }}
        >
          부산
        </button>
        <input
          type="range"
          min="1"
          max="20"
          onChange={(event) => {
            map.current.setLevel(event.target.value, { animate: true });
          }}
        />
        <button
          onClick={() => {
            map.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
          }}
        >
          지도 타입 변경
        </button>
      </div>
      <ul>
        {markerList.map((marker) => (
          <li
            key={marker.getTitle()}
            onClick={() => {
              marker.setMap(null);
              setMarkerList(markerList.filter((value) => value !== marker));
            }}
          >
            {marker.getTitle()}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
