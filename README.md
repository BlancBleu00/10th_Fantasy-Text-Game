# 인간력 30년: 뿌리 아래의 밤

브라우저에서 실행하는 판타지 텍스트 RPG입니다. `index.html`을 열면 시작됩니다. GitHub Pages에서도 같은 파일을 사용합니다.

## 실행

프로젝트 폴더 전체를 유지한 채 `index.html`을 브라우저에서 여세요. HTTP로 실행하려면 프로젝트 폴더에서 아래 명령을 사용할 수 있습니다.

```sh
python3 -m http.server 8000
```

이후 `http://localhost:8000`으로 접속하세요. 저장은 브라우저의 `fantasyFullPilot` localStorage 키를 사용합니다. 로컬 파일과 HTTP 접속의 저장 공간은 브라우저에 따라 다를 수 있습니다.

## 파일 구조

- `css/game.css`: 기존 화면 스타일.
- `data/`: 캐릭터 출신, NPC, 평판, 지역, 이름표, 인카운터 규칙.
- `story/`: 대사·세계 설명, 장면 등록, 장면별 선택과 후속 사건.
- `js/`: 상태, 판정, 관계, 시간, 이동, 전투, 화면, 저장과 불러오기.
- `js/runtime-layers.js`: 기존 버전의 함수 교체와 데이터·장면 확장을 원래 순서로 적용합니다.
- `js/bootstrap.js`: 모든 등록이 끝난 뒤 게임을 한 번 시작합니다.
- `docs/refactor-map.json`: 스크립트 로드 순서와 원본 행 대응표.

스크립트는 공유 전역 이름을 사용하는 classic script입니다. `index.html`의 순서를 유지하세요. `async`나 `type="module"`을 추가하면 기존 함수 교체와 HTML의 `onclick` 동작이 달라질 수 있습니다. 장면은 함수형 조건·효과·목적지를 포함하므로 JSON 데이터로 변환하지 않았습니다.

`scenes`를 수정하려면 관련 `story/scenes-*.js`를 확인하세요. 같은 장면이 뒤쪽 등록 함수에서 갱신될 수 있으므로 `runtime-layers.js`의 적용 순서도 확인해야 합니다. 현재 분리는 기능 변경 없이 기존 동작을 유지하는 단계입니다.

## 회귀 검증

Node.js에서 원본과 분리본을 비교합니다. 기본 원본은 Git 커밋 `1eec7ae5281382c322647f2428a37fe8f6aa7374`에서 읽습니다.

```sh
node tests/refactor-regression.cjs
```

외부 원본 파일을 지정할 수도 있습니다.

```sh
node tests/refactor-regression.cjs /absolute/path/to/original-index.html
```

## 브라우저 검증

PR의 GitHub Actions에서 Chromium으로 실제 클릭 흐름과 데스크톱/모바일 화면을 비교합니다. 초기 화면 픽셀 일치, 직접 생성, 리뷰 저장/복원, 6개 탭, 의심 기록 선택지를 확인하고 결과 화면을 artifact로 남깁니다.

로컬에서 실행하려면:

```sh
npm install --no-save --ignore-scripts playwright@1.62.1
npx playwright install chromium
node tests/browser-smoke.cjs
```
