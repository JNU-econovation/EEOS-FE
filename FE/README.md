# FE - README.md

## Getting Started

### Installation

```bash
pnpm install
```

### Development

**모든 앱 실행 (Web + Native):**
```bash
pnpm turbo dev
```

**웹 앱만 실행:**
```bash
cd apps/web
pnpm dev          # 개발 서버 실행 (port 3000)
```

**네이티브 앱만 실행:**
```bash
cd apps/native
pnpm start        # Expo dev server 실행
pnpm ios          # iOS 시뮬레이터에서 실행
pnpm android      # Android 에뮬레이터에서 실행
```

### Build

**모든 앱 빌드:**
```bash
pnpm turbo build
```

**웹 앱 빌드:**
```bash
cd apps/web
pnpm build        # 프로덕션 빌드
pnpm start        # 빌드 후 프로덕션 서버 실행
```

### Testing

```bash
cd apps/web
pnpm test         # 테스트 실행 (watch mode)
pnpm test --coverage  # 커버리지 리포트 포함
```

### Type Checking

**모든 앱 타입 체크:**
```bash
pnpm turbo check-types
```

**웹 앱만 타입 체크:**
```bash
cd apps/web
pnpm check-types
```

### Linting

**웹 앱:**
```bash
cd apps/web
pnpm lint
```

**네이티브 앱:**
```bash
cd apps/native
pnpm lint
```

## TechStack

| Architecture            | MVVM                                            |
| ----------------------- | ----------------------------------------------- |
| Language                | TypeScript                                      |
| UI                      | Tailwind CSS                                    |
| Libraries               | Next.js, React Query, jotai, axios, TailwindCSS |
| Asynchronous Processing | React Query, axios                              |

## Package Structure

```
FE
├─ 📁 public
├─ 📁 src
│  ├─ 📁 apis
│  │  ├─ 📁 dtos
│  ├─ 📁 app
│  ├─ 📁 components
│  ├─ 📁 constants
│  ├─ 📁 hooks
│  │  ├─ 📁 query
│  ├─ 📁 store
│  ├─ 📁 types
└─ └─ 📁 utils
```

| Directory Name  | Description                           |
| --------------- | ------------------------------------- |
| public          | 정적 파일 (이미지 등)                 |
| src             | 소스 코드                             |
| src/apis        | API 요청 및 응답 처리                 |
| src/apis/dtos   | 네트워크 통신을 위한 데이터 전송 객체 |
| src/app         | 앱 전체 레이아웃 및 라우팅 설정       |
| src/component   | 컴포넌트                              |
| src/constants   | 변하지 않는 값 선언                   |
| src/hooks       | 상태 관리 및 비즈니스 로직            |
| src/hooks/query | query & mutate 로직 처리              |
| src/store       | 전역 상태 관리 (Jotai)                |
| src/types       | Typescript 타입 정의                  |
| src/utils       | 공통 유틸리티 함수                    |
