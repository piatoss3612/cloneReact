### 패스트 캠퍼스 30개 프로젝트로 배우는 프론트엔드 with React

---

#### 1. 가상 키보드

- webpack 설정
- eslint, prettier 설정
- 다크 모드, 폰트 변경 기능
- 키보드 이벤트(키다운, 키업, 입력, 한글 검사 정규식)
  - 이벤트 핸들러를 구현할 때 화살표 함수를 사용하면 bind(this)를 사용하지 않아도 된다
- 마우스 이벤트 & 중복 입력 방지 적용
- 오토포커스 추가 & 빌드

#### 2. 이미지 슬라이더

- 기본 설정 가져오기 (webpack, eslint, prettier)
- 폰트어썸 패키지 설치 & html, css, 이미지 파일 가져오기
- prev, next 버튼 이벤트 구현
- 인디케이터 구현
- 오토플레이 기능 구현
- 빌드

#### 3. date picker

- snowpack 설정
- eslint, prettier 설정
- html, scss 파일 가져오기
- 날짜 조회 기능 구현
- 오늘 날짜 표시
- 날짜 선택 기능 구현
- 빌드
- `serve build` 명령어로 실행 가능

#### 4. calculator

- html, css 파일 작성
- 계산기 로직 구현

#### 5. bmi calculator

- html, css 파일 작성
- bmi 계산기 로직 구현

#### 6. image gallery

- React 프로젝트 생성 및 초기 화면 구현
- 갤러리 로직 구현
- react-dropzone 라이브러리로 드래그&드롭 기능 구현

#### 7. drawing board

- ~~강의 내용대로 parcel을 사용하려고 했지만,~~
- ~~@parcel/transformer-sass를 불러오지 못하는 문제가 발생하여~~
- ~~package.json이 날아가버리므로 snowpack을 사용했다~~
- ~~eslint & prettier 설정~~
- ~~폰트어썸 패키지 설치 & html, css, 이미지 파일 가져오기~~
  - ~~snowpack에서 woff2, ttf 폰트 파일을 로드할 수 없는 문제~~
- ~~프로젝트 보류~~
  <br>

- parcel 설정 및 eslint, prettier 설정
- html, scss 파일 가져오기
- 선 색상, 굵기 설정 기능 및 그리기 기능 구현
- 지우개 기능 구현
- 내비게이터 기능 구현
- 실행 취소 기능 구현
- 초기화 기능 구현
- 캔버스 다운로드 기능 구현 & 빌드

#### 8. to do list

- rollup 모듈 번들러 설정 & eslint, prettier 설정
- html, scss 파일 가져오기
- 폰트 어썸 아이콘 적용
- todo 추가, 삭제 기능 구현
- todo 수정, 완료 기능 구현
- 리스트 필터링 기능 구현
- 리스트 필터에 라우터 기능 추가 구현
- 로컬스토리지에 todo 리스트 저장 및 불러오기 기능 구현
- 리팩토링 및 빌드

#### 9. mouse image

- 브라우저에서 기본 마우스를 대신하는 커서 이미지를 적용하는 미니 프로젝트
- React + TypeScript로 작성
- 마우스 이동 이벤트를 추적하여 해당 마우스 좌표에 커서 이미지 적용
- `pointerEvents: "none"` 스타일을 적용하여 커서 이미지가 클릭되는 이벤트 제거
- 이미지마다 미세하게 다른 위치를 조정

#### 10. kakao-map

- React, npm 라이브러리가 없는 경우, React에서 순수 자바스크립트/타입스크립트 라이브러리를 사용하는 방법
- 외부 API로 가져온 전역 변수, 함수를 declare 선언으로 사용하기
- React 컴포넌트에서 카카오 지도 동적으로 불러오기
- 카카오 지도 응용하기

#### 11. Sortable 컴포넌트 제작 및 npm 배포

- drag & drop이 가능한 리스트 컴포넌트 제작
- `npm i -D @babel/cli @babel/preset-react`: npm 배포를 위해 바벨 설정
- `package.json` 파일 수정
- `npm run build` 스트립트 실행
- 터미널에서 `npm login`
- `npm publish --access public` 명령어 실행, 패키지 배포

#### 12. music-player

- 앞서 배포한 패키지를 사용해 음악 플레이어를 제작해보는 프로젝트
- 음악 플레이어 기본 UI 구성
- Redux로 상태 관리
- 음악 재생, 정지 기능 구현
- progress bar 진행도 표시, 클릭 이벤트 구현
- 음악 볼륨 조절 기능 구현
- 이전 곡 또는 다음 곡 이동 기능 구현
- 음악 셔플 기능 구현
- 한 곡 반복 기능 구현
- SortableList 컴포넌트 적용 및 곡 선택 기능 구현
