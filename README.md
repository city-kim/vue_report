# vue_report
더미데이터로 이루어진 리포트를 다음과 같은 패키지를 활용하여 구성하였다

# used
- pnpm
- TypeScript
- Vue3
- Vite
- Vitest
- Eslint
- prettier
- pinia
- luxon
- sass
- chart.js

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript는 기본적으로 '.vue` 가져오기에 대한 유형 정보를 처리할 수 없으므로 유형 검사를 위해 `tsc` CLI를 `vue-tsc`로 대체합니다.

편집기에서는 TypeScript 언어 서비스가 '.vue' 유형을 인식하도록 하기 위해 [TypeScript Vue 플러그인 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)이 필요합니다.

독립형 타입스크립트 플러그인이 충분히 빠르지 않다고 느껴진다면, Volar는 더 빠른 성능의 [인수 모드](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)도 구현했습니다. 다음 단계에 따라 활성화할 수 있습니다:

1. 내장된 타입스크립트 확장 기능 비활성화하기
  1) `확장 프로그램`을 실행합니다: `내장 확장 프로그램 표시`를 실행합니다
  2) `타입스크립트 및 자바스크립트 언어 기능`을 찾아 마우스 오른쪽 버튼으로 클릭한 후 `비활성화(작업 영역)`를 선택합니다

2. 개발자`를 실행하여 VSCode 창을 다시 로드합니다:
명령 팔레트에서 `개발자: 창 새로고침`을 실행하여 창을 다시 로드합니다.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install

yarn install
npm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev

yarn run dev
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build

yarn run build
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit

yarn run test:unit
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm run test:e2e:dev

yarn run test:e2e:dev
npm run test:e2e:dev
```

다음은 Vite 개발 서버에 대한 엔드투엔드 테스트가 실행됩니다. 프로덕션 빌드보다 훨씬 빠릅니다.

그러나 배포하기 전(예: CI 환경)에 `test:e2e`로 프로덕션 빌드를 테스트하는 것이 좋습니다:

```sh
pnpm run build
pnpm run test:e2e

yarn run build
yarn run test:e2e

npm run test:e2e
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint

yarn run lint
npm run lint
```
