# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EEOS (Econovation Event Organizing Service)** - Event and program management platform for Econovation

- **Architecture**: Monorepo (pnpm workspace + Turbo) with Native-Web hybrid (WebView Bridge)
- **Apps**:
  - `apps/native`: Expo/React Native mobile app
  - `apps/web`: Next.js web app
  - `packages/app-bridge`: Native ↔ Web communication bridge

## Commands

### Development

```bash
# Root - run all apps in parallel
pnpm install              # Install dependencies
pnpm turbo dev            # Start all apps in dev mode
pnpm turbo build          # Build all apps
pnpm turbo check-types    # Type check all apps

# Native app only
cd apps/native
pnpm start                # Start Expo dev server
pnpm ios                  # Run on iOS simulator
pnpm android              # Run on Android emulator
pnpm lint                 # Lint native code

# Web app only
cd apps/web
pnpm dev                  # Start Next.js dev server (port 3000)
pnpm build                # Build for production
pnpm start                # Build and start production server
pnpm lint                 # Lint and auto-fix
pnpm test                 # Run tests in watch mode
pnpm check-types          # TypeScript type checking
```

### Testing

```bash
cd apps/web
pnpm test                 # Watch mode
jest <filename>           # Run specific test file
jest --coverage           # With coverage report
```

## Architecture & Key Patterns

### WebView Bridge Pattern

The app uses a hybrid architecture where the Native app embeds the Web app via WebView:

```
Native App (expo-secure-store)
    ↓ Token injection via injectedJavaScriptBeforeContentLoaded
WebView → Web App (/mobile/* routes)
    ↔ Bridge communication (@webview-bridge)
Synchronized token management & API calls
```

**Critical token management flow:**
1. Native loads tokens from `expo-secure-store` (secure, encrypted storage)
2. WebView injects tokens via `WebviewWithInjected` component before page load
3. Web uses tokens for API calls (stored in memory only, never localStorage)
4. Axios interceptor auto-refreshes tokens when expired (see `apps/web/src/apis/instance.ts`)
5. Bridge syncs tokens between Native and Web

### State Management

- **Native**: Zustand (`apps/native/src/store/*`)
- **Web**: Jotai for UI state (`apps/web/src/store/*`) + React Query for server state
- **Both**: React Query for all API data fetching and caching

### API Communication

Both apps use Axios with interceptors for automatic token management:

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL/api` (Web) or configured in Native
- **Auth**: JWT (Access Token + Refresh Token)
- **Auto-refresh**: Interceptor checks token expiration before each request
- **Error handling**: 401/403 → auto logout and redirect to `/login`
- **Instance location**: `apps/web/src/apis/instance.ts` (Web), `apps/native/src/apis/*` (Native)

### Routing

**Native (Expo Router - file-based):**
- `apps/native/src/app/index.tsx` → Home screen
- `apps/native/src/app/login/index.tsx` → Login screen
- `apps/native/src/app/(tabs)/_layout.tsx` → Tab navigation layout
- File name = route path (e.g., `calendar/index.tsx` → `/calendar`)

**Web (Next.js App Router - route groups):**
- `apps/web/src/app/(auth)/*` → Authentication pages
- `apps/web/src/app/(private)/*` → Logged-in users only
- `apps/web/src/app/(admin)/*` → Admin users only
- `apps/web/src/app/(guest)/*` → Non-authenticated users
- `apps/web/src/app/(webview)/mobile/*` → Mobile WebView-specific pages (used by Native app)

The Native app loads Web pages from `(webview)/mobile/*` routes exclusively.

## 핵심 아키텍처 패턴

### WebView Bridge Architecture

```
Native App (Secure Store)
    ↓ 토큰 주입
WebView → Web App (/mobile/* 경로)
    ↕ Bridge 통신
토큰 동기화 & API 호출
```

**토큰 관리 흐름:**
1. Native가 expo-secure-store에서 토큰 로드
2. WebView 로드 시 JavaScript 주입으로 토큰 전달
3. Web이 API 호출 시 토큰 사용
4. 토큰 만료 시 Refresh Token으로 자동 갱신
5. Bridge를 통해 Native와 Web 간 토큰 동기화

### 상태 관리
- **Native**: Zustand (간단한 전역 상태)
- **Web**: Jotai (원자적 상태) + React Query (서버 상태)
- **모두**: React Query로 API 상태 관리

### API 통신
- **Base**: Axios Interceptor 기반
- **인증**: JWT (Access Token + Refresh Token)
- **에러 처리**: 401/403 시 자동 로그아웃
- **자동 갱신**: Refresh Token으로 토큰 갱신

## Critical Implementation Details

### WebView Configuration

**Native side** (`apps/native/src/components/WebviewWithInjected.tsx`):
- Injects tokens BEFORE page load via `injectedJavaScriptBeforeContentLoaded`
- Injects UI scripts AFTER page load (disable pinch zoom, text selection, etc.)
- Debug mode enabled when `EXPO_PUBLIC_ENV === "development"`
- URLs defined in `apps/native/src/constants/webview.ts`:
  ```ts
  WEBVIEW_BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URL
  WEBVIEW_PATH = {
    LOGIN: "/login",
    MAIN: "/mobile/main",
    CALENDAR: "/mobile/calendar",
    MYPAGE: "/mobile/mypage",
    PROGRAMS: "/mobile/programs",
  }
  ```

**Web side**:
- All mobile routes MUST be under `apps/web/src/app/(webview)/mobile/*`
- Never use localStorage for tokens (only memory/state)
- Use bridge methods from `@webview-bridge/web` to communicate with Native

### Axios Interceptor Logic (Web)

Located in `apps/web/src/apis/instance.ts`:

**Request interceptor:**
1. Gets `accessToken` and `tokenExpiration` from memory
2. Checks if token expires within threshold (`NEXT_PUBLIC_TOKEN_REISSUE_THRESHOLD`)
3. If yes, calls `postTokenReissue()` to refresh token
4. Updates token in memory via `setAccessToken()` and `setTokenExpiration()`
5. Attaches `Authorization: Bearer ${accessToken}` header

**Response interceptor:**
1. Checks error code from API response
2. `INVALID_TOKEN` → delete token, show toast, redirect to `/login`
3. `EXPIRED_ACCESS_TOKEN` → refresh token, retry original request
4. Other auth errors → show toast, logout, redirect

Two instances:
- `https`: Main instance with full token management
- `authInstance`: For auth endpoints only, simpler error handling

### Metro Config (Native)

Located in `apps/native/metro.config.js`:
- Uses `react-native-svg-transformer/expo` for SVG imports
- SVG files treated as source files, not assets
- NativeWind integration via `withNativewind()`

### API File Structure

**Web** (`apps/web/src/apis/`):
- `instance.ts` - Axios instances with interceptors
- `auth.ts`, `calendar.ts`, `program.ts`, etc. - API functions
- `dtos/*.dto.ts` - Request/response type definitions
- `proxy/` - Proxy endpoints (e.g., GitHub API)

**Native** (`apps/native/src/apis/`):
- Similar structure, using `https` instance
- Hooks in `apps/native/src/hooks/` folder

## Important Rules & Conventions

### Token Security - CRITICAL

**Native:**
- Store tokens ONLY in `expo-secure-store` (encrypted storage)
- Pass tokens to WebView via `injectedJavaScriptBeforeContentLoaded`
- Use `apps/native/src/components/WebviewWithInjected.tsx` component

**Web:**
- NEVER use localStorage for tokens (security vulnerability in WebView)
- Store tokens ONLY in memory (React state/Jotai atoms)
- Use utility functions in `apps/web/src/utils/authWithStorage.ts`
- All token operations go through Axios interceptor

### Routing Changes

**Native (Expo Router):**
- File name = route path
- Changing file names changes routes
- Tab navigation defined in `_layout.tsx` files

**Web (Next.js):**
- Maintain route group structure: `(auth)`, `(private)`, `(admin)`, `(guest)`, `(webview)`
- Mobile pages MUST be under `(webview)/mobile/*`
- Native app only loads `/mobile/*` routes (defined in `apps/native/src/constants/webview.ts`)

### Adding Dependencies

Always add to the specific app's `package.json`, NOT the root:
```bash
cd apps/web && pnpm add <package>      # For web
cd apps/native && pnpm add <package>   # For native
```

### API Changes

When modifying APIs, update BOTH apps:
1. Update API function in `apps/web/src/apis/` and `apps/native/src/apis/`
2. Update DTO types in `apps/web/src/apis/dtos/` and corresponding Native types
3. Update React Query hooks in both `apps/web/src/hooks/query/` and `apps/native/src/hooks/`

### Environment Variables

**Native:**
- Defined in `.env` files
- Access via `process.env.EXPO_PUBLIC_*`
- Requires rebuild after changes

**Web:**
- Defined in `.env.local` or `.env`
- Access via `process.env.NEXT_PUBLIC_*`
- Hot-reloaded in dev mode

### WebView URL Changes

Modify `apps/native/src/constants/webview.ts`:
```ts
export const WEBVIEW_BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URL || "";
```
Ensure all paths match routes in `apps/web/src/app/(webview)/mobile/*`
