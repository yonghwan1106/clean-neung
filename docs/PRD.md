# PRD: 클린릉(Clean-Neung) - AI 기반 강릉 스마트 분리수거 플랫폼

## 문서 정보
- **프로젝트명**: 클린릉 (Clean-Neung)
- **버전**: v1.0
- **작성자**: 박용환
- **작성일**: 2025.10.27
- **최종 수정일**: 2025.10.27
- **문서 상태**: Draft

---

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [데이터 모델](#4-데이터-모델)
5. [기능 명세](#5-기능-명세)
6. [API 명세](#6-api-명세)
7. [UI/UX 설계](#7-uiux-설계)
8. [개발 일정](#8-개발-일정)
9. [배포 및 운영](#9-배포-및-운영)
10. [성능 및 보안](#10-성능-및-보안)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 목적
강릉시민과 관광객이 쓰레기 분리수거를 쉽게 할 수 있도록 돕는 AI 기반 웹 애플리케이션 개발

### 1.2 핵심 가치 제안
- **즉시성**: 사진 촬영 → AI 분석 → 결과 (5초 이내)
- **정확성**: Claude 4.0 vision을 활용한 95% 이상 정확도
- **접근성**: 앱 설치 불필요, 모바일 웹으로 즉시 사용
- **보상 시스템**: 올바른 배출 시 포인트 적립

### 1.3 타겟 사용자
1. **1차 타겟**: 강릉시 거주 시민 (18~65세)
2. **2차 타겟**: 강릉 방문 관광객 (국내/외)
3. **3차 타겟**: 고령자 (65세 이상, 음성 지원)

### 1.4 성공 지표 (KPI)
- 일 활성 사용자(DAU): 500명 (3개월 내)
- 월 활성 사용자(MAU): 5,000명 (6개월 내)
- AI 분류 정확도: 95% 이상
- 평균 응답 시간: 5초 이내
- 사용자 만족도: 4.5/5.0 이상

---

## 2. 기술 스택

### 2.1 Frontend
```json
{
  "framework": "Next.js 15.0.0",
  "language": "TypeScript 5.3+",
  "styling": "Tailwind CSS 3.4+",
  "ui_library": "shadcn/ui",
  "state_management": "Zustand 4.4+",
  "form_handling": "React Hook Form 7.48+",
  "image_handling": "react-dropzone + browser camera API",
  "pwa": "next-pwa 5.6+"
}
```

### 2.2 Backend
```json
{
  "framework": "Next.js 15 API Routes (App Router)",
  "runtime": "Node.js 20.x (Vercel)",
  "authentication": "NextAuth.js 5.0+",
  "api_integration": "Native fetch with error handling"
}
```

### 2.3 Database
```json
{
  "primary": "Google Sheets API v4",
  "sheets": [
    "users (사용자 정보)",
    "waste_logs (쓰레기 분류 기록)",
    "points (포인트 적립/사용)",
    "waste_categories (쓰레기 분류 기준)",
    "notifications (알림 설정)",
    "reports (불법 투기 신고)"
  ]
}
```

### 2.4 External APIs

#### 필수 API
1. **Claude AI API (Anthropic)**
   - 용도: 이미지 인식 및 쓰레기 분류
   - 모델: claude-sonnet-4-20250514
   - 기능: Vision + Text generation
   - 예상 비용: 약 $0.003/request (이미지 1장 기준)

2. **Google Sheets API**
   - 용도: 데이터 저장 및 조회
   - 인증: OAuth 2.0 + Service Account
   - 권한: Read/Write

3. **네이버 지도 API**
   - 용도: 배출 장소 안내, 대형폐기물 신고 위치
   - 기능: 
     - Geocoding (주소 → 좌표)
     - Reverse Geocoding (좌표 → 주소)
     - Static Map 이미지 생성
   - 대안: 카카오맵 API (필요시)

#### 추가 제안 API

4. **Vercel Blob Storage** (이미지 임시 저장)
   - 용도: 사용자가 업로드한 쓰레기 사진 임시 저장 (24시간 후 자동 삭제)
   - 이유: Claude API에 전송 전 이미지 최적화
   - 용량: 월 1GB 무료 (충분)

5. **SendGrid API** (선택 사항)
   - 용도: 이메일 알림 (배출일 알림, 포인트 적립 알림)
   - 대안: Vercel Edge Function + Nodemailer

6. **Firebase Cloud Messaging (FCM)** (Phase 2)
   - 용도: 푸시 알림 (PWA 알림)
   - 시기: MVP 이후 추가

7. **Google Analytics 4**
   - 용도: 사용자 행동 분석, 전환율 추적
   - 무료

8. **Sentry**
   - 용도: 에러 모니터링 및 로깅
   - 플랜: 무료 (월 5,000 이벤트)

### 2.5 Deployment & DevOps
```json
{
  "hosting": "Vercel (Hobby Plan → Pro Plan)",
  "ci_cd": "GitHub Actions (Vercel 자동 연동)",
  "version_control": "GitHub",
  "monitoring": "Vercel Analytics + Sentry",
  "domain": "cleanneung.vercel.app (초기) → cleanneung.kr (이후)"
}
```

---

## 3. 시스템 아키텍처

### 3.1 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js 15 Frontend (React Server Components)       │   │
│  │  - PWA (오프라인 지원)                                │   │
│  │  - 반응형 디자인 (Mobile First)                       │   │
│  │  - Tailwind CSS + shadcn/ui                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes (App Router)                     │   │
│  │  - /api/classify (AI 분류)                           │   │
│  │  - /api/user (사용자 관리)                           │   │
│  │  - /api/points (포인트)                              │   │
│  │  - /api/notifications (알림)                         │   │
│  │  - /api/reports (신고)                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                    ↓                      ↓
        ┌───────────────────┐    ┌────────────────────┐
        │  Claude AI API    │    │  Google Sheets API │
        │  (Anthropic)      │    │  (Database)        │
        │  - Vision Model   │    │  - 6 Sheets        │
        │  - Text Gen       │    │  - OAuth 2.0       │
        └───────────────────┘    └────────────────────┘
                                          ↓
                                 ┌────────────────────┐
                                 │  Naver Map API     │
                                 │  - Geocoding       │
                                 │  - Static Map      │
                                 └────────────────────┘
```

### 3.2 데이터 흐름 (Image Classification)

```
[User] 
  ↓ (1) 사진 촬영/업로드
[Frontend]
  ↓ (2) FormData로 전송
[API Route: /api/classify]
  ↓ (3-1) Vercel Blob에 임시 저장 (옵션)
  ↓ (3-2) Base64 인코딩
  ↓ (4) Claude API 요청 (이미지 + 프롬프트)
[Claude API]
  ↓ (5) AI 분석 결과 (JSON)
[API Route]
  ↓ (6-1) 분류 결과 파싱
  ↓ (6-2) Google Sheets 저장 (waste_logs)
  ↓ (6-3) 포인트 적립 (points sheet)
  ↓ (7) 결과 반환 (JSON)
[Frontend]
  ↓ (8) UI 렌더링 (분류 결과 표시)
[User]
```

### 3.3 폴더 구조

```
cleanneung/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (main)/
│   │   ├── page.tsx                 # 홈 (메인)
│   │   ├── classify/
│   │   │   └── page.tsx             # AI 분류
│   │   ├── schedule/
│   │   │   └── page.tsx             # 배출 일정
│   │   ├── points/
│   │   │   └── page.tsx             # 포인트
│   │   ├── report/
│   │   │   └── page.tsx             # 신고
│   │   └── mypage/
│   │       └── page.tsx             # 마이페이지
│   ├── api/
│   │   ├── classify/
│   │   │   └── route.ts             # AI 분류 API
│   │   ├── user/
│   │   │   ├── route.ts             # 사용자 CRUD
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── points/
│   │   │   ├── route.ts             # 포인트 적립/사용
│   │   │   └── history/
│   │   │       └── route.ts
│   │   ├── schedule/
│   │   │   └── route.ts             # 배출 일정 조회
│   │   ├── reports/
│   │   │   └── route.ts             # 신고 접수
│   │   └── notifications/
│   │       └── route.ts             # 알림 설정
│   ├── layout.tsx                   # Root Layout
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── classify/
│   │   ├── CameraCapture.tsx        # 카메라 촬영
│   │   ├── ImageUpload.tsx          # 이미지 업로드
│   │   └── ClassificationResult.tsx # 분류 결과
│   ├── schedule/
│   │   ├── Calendar.tsx
│   │   └── ScheduleCard.tsx
│   ├── points/
│   │   ├── PointsSummary.tsx
│   │   └── PointsHistory.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
├── lib/
│   ├── api/
│   │   ├── claude.ts                # Claude API 통신
│   │   ├── sheets.ts                # Google Sheets API
│   │   └── naver-map.ts             # 네이버 지도 API
│   ├── utils/
│   │   ├── image.ts                 # 이미지 처리
│   │   ├── date.ts                  # 날짜 유틸
│   │   └── validation.ts            # 검증 로직
│   ├── constants/
│   │   ├── wasteCategories.ts       # 쓰레기 분류 기준
│   │   └── schedules.ts             # 배출 일정 데이터
│   └── types/
│       ├── user.ts
│       ├── waste.ts
│       └── api.ts
├── store/
│   ├── useUserStore.ts              # Zustand: 사용자 상태
│   └── useClassifyStore.ts          # Zustand: 분류 상태
├── public/
│   ├── images/
│   ├── icons/
│   └── manifest.json                # PWA Manifest
├── .env.local                       # 환경 변수
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. 데이터 모델

### 4.1 Google Sheets 스키마

#### Sheet 1: `users` (사용자)
| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| id | string | Y | UUID | "usr_abc123..." |
| name | string | Y | 이름 | "홍길동" |
| email | string | Y | 이메일 | "hong@example.com" |
| phone | string | N | 전화번호 | "010-1234-5678" |
| address | string | Y | 주소 (동 단위) | "교동" |
| address_detail | string | N | 상세 주소 | "123번길 45" |
| latitude | number | N | 위도 | 37.7519 |
| longitude | number | N | 경도 | 128.8761 |
| total_points | number | Y | 총 포인트 | 1500 |
| language | string | Y | 언어 설정 | "ko" / "en" / "zh" / "ja" |
| push_enabled | boolean | Y | 알림 수신 동의 | TRUE / FALSE |
| created_at | datetime | Y | 가입일 | "2025-10-27 10:30:00" |
| updated_at | datetime | Y | 수정일 | "2025-10-27 10:30:00" |

#### Sheet 2: `waste_logs` (쓰레기 분류 기록)
| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| id | string | Y | UUID | "log_xyz789..." |
| user_id | string | Y | 사용자 ID | "usr_abc123..." |
| image_url | string | N | 업로드 이미지 URL | "blob://..." |
| detected_item | string | Y | 감지된 물품 | "페트병" |
| category | string | Y | 분류 결과 | "재활용 (플라스틱)" |
| disposal_method | string | Y | 배출 방법 | "라벨 제거 후 재활용" |
| disposal_day | string | Y | 배출 요일 | "월요일, 목요일" |
| confidence | number | Y | AI 신뢰도 (%) | 98.5 |
| ai_response | text | Y | AI 전체 응답 (JSON) | "{...}" |
| points_earned | number | Y | 획득 포인트 | 10 |
| created_at | datetime | Y | 분류 시각 | "2025-10-27 11:00:00" |

#### Sheet 3: `points` (포인트 내역)
| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| id | string | Y | UUID | "pt_def456..." |
| user_id | string | Y | 사용자 ID | "usr_abc123..." |
| type | string | Y | 타입 | "earn" / "use" |
| amount | number | Y | 포인트 (+/-) | 10 / -50 |
| reason | string | Y | 사유 | "쓰레기 분류" / "쿠폰 교환" |
| related_id | string | N | 관련 기록 ID | "log_xyz789..." |
| created_at | datetime | Y | 발생 시각 | "2025-10-27 11:00:00" |

#### Sheet 4: `waste_categories` (쓰레기 분류 기준)
| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| id | string | Y | UUID | "cat_aaa111..." |
| item_name | string | Y | 물품명 | "페트병" |
| category | string | Y | 대분류 | "재활용 (플라스틱)" |
| disposal_method | string | Y | 배출 방법 | "내용물 비우고 라벨 제거" |
| disposal_days | string | Y | 배출 요일 (JSON) | '["월","목"]' |
| special_notes | string | N | 특이사항 | "뚜껑은 따로 분리" |
| keywords | string | N | 검색 키워드 | "페트,플라스틱,음료" |
| created_at | datetime | Y | 등록일 | "2025-10-27 09:00:00" |

#### Sheet 5: `notifications` (알림 설정)
| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| id | string | Y | UUID | "noti_bbb222..." |
| user_id | string | Y | 사용자 ID | "usr_abc123..." |
| notification_type | string | Y | 알림 타입 | "disposal_reminder" / "point_earned" |
| enabled | boolean | Y | 활성화 여부 | TRUE / FALSE |
| schedule_time | string | N | 알림 시간 | "20:00" (배출일 전날 저녁 8시) |
| created_at | datetime | Y | 생성일 | "2025-10-27 10:00:00" |
| updated_at | datetime | Y | 수정일 | "2025-10-27 10:00:00" |

#### Sheet 6: `reports` (불법 투기 신고)
| 컬럼명 | 타입 | 필수 | 설명 | 예시 |
|--------|------|------|------|------|
| id | string | Y | UUID | "rep_ccc333..." |
| user_id | string | Y | 신고자 ID | "usr_abc123..." |
| image_url | string | Y | 신고 이미지 URL | "blob://..." |
| location_address | string | Y | 신고 위치 (주소) | "강릉시 교동 123번길" |
| latitude | number | Y | 위도 | 37.7519 |
| longitude | number | Y | 경도 | 128.8761 |
| description | string | N | 상세 설명 | "대형 쓰레기 무단 투기" |
| status | string | Y | 처리 상태 | "pending" / "processing" / "resolved" |
| admin_note | string | N | 관리자 메모 | "2025-10-30 수거 완료" |
| created_at | datetime | Y | 신고일 | "2025-10-27 14:00:00" |
| resolved_at | datetime | N | 처리 완료일 | "2025-10-30 10:00:00" |

### 4.2 Google Sheets API 연동 방식

#### 인증 방식: Service Account
```javascript
// lib/api/sheets.ts
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
```

#### CRUD 함수 예시
```typescript
// CREATE
export async function createUser(userData: User) {
  const values = [[
    userData.id,
    userData.name,
    userData.email,
    // ... 나머지 필드
  ]];
  
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'users!A:M',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

// READ
export async function getUserById(userId: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'users!A:M',
  });
  
  const rows = response.data.values;
  return rows?.find(row => row[0] === userId);
}

// UPDATE
export async function updateUserPoints(userId: string, points: number) {
  // 1. 사용자 행 찾기
  const userRow = await findUserRow(userId);
  
  // 2. 포인트 컬럼 업데이트 (K열)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `users!K${userRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[points]],
    },
  });
}
```

---

## 5. 기능 명세

### 5.1 MVP (Phase 1) 기능 목록

#### 5.1.1 사용자 인증 (Auth)
- [ ] **회원가입**
  - 이메일 + 비밀번호 방식
  - 주소 입력 (동 단위 필수)
  - 이용약관 및 개인정보처리방침 동의
  - 입력값 검증
  
- [ ] **로그인**
  - 이메일 + 비밀번호
  - 세션 유지 (7일)
  - 자동 로그인 옵션

- [ ] **비밀번호 재설정** (이메일 인증)

#### 5.1.2 AI 쓰레기 분류 (핵심 기능)
- [ ] **이미지 업로드 방식**
  - 카메라 직접 촬영
  - 갤러리에서 선택
  - 이미지 크기 제한: 10MB 이하
  - 지원 포맷: JPEG, PNG, WEBP

- [ ] **AI 분석 프로세스**
  ```
  1. 이미지 전처리 (리사이징, 압축)
  2. Claude API 전송 (Vision + 커스텀 프롬프트)
  3. 응답 파싱
  4. 결과 화면 표시
  ```

- [ ] **분류 결과 화면**
  - 감지된 물품명
  - 분류 카테고리 (종량제 / 재활용 / 음식물 / 대형폐기물 등)
  - 배출 방법 (상세 가이드)
  - 배출 요일
  - AI 신뢰도 (%)
  - 포인트 적립 알림

- [ ] **분류 기록 저장**
  - 사용자별 분류 히스토리
  - 최근 10개 기록 표시
  - 기록 재확인 기능

#### 5.1.3 배출 일정 안내
- [ ] **지역별 배출 일정 표시**
  - 사용자 주소 기반 자동 필터링
  - 오늘/내일 배출 가능 품목 하이라이트
  - 주간 캘린더 뷰

- [ ] **알림 설정**
  - 배출일 전날 저녁 알림 (기본 20:00)
  - 배출일 당일 아침 알림 (기본 07:00)
  - 시간 커스터마이징

#### 5.1.4 포인트 시스템
- [ ] **포인트 적립**
  - 쓰레기 분류 1회: 10P
  - 연속 3일 사용: +20P
  - 주간 5회 이상 사용: +50P

- [ ] **포인트 사용** (Phase 2에서 구현)
  - 쿠폰 교환
  - 기부

- [ ] **포인트 내역 조회**
  - 적립/사용 히스토리
  - 월별 통계

#### 5.1.5 마이페이지
- [ ] **프로필 관리**
  - 이름, 주소 수정
  - 비밀번호 변경
  - 알림 설정

- [ ] **사용 통계**
  - 총 분류 횟수
  - 총 적립 포인트
  - 이번 달 분류 횟수

- [ ] **탈퇴하기**

### 5.2 Phase 2 기능 (추후 개발)
- [ ] 불법 투기 신고 기능
- [ ] 커뮤니티 게시판
- [ ] 대형폐기물 신고 (네이버 지도 연동)
- [ ] 포인트 쿠폰 교환
- [ ] 다국어 지원 (영어, 중국어, 일본어)
- [ ] 관리자 대시보드

---

## 6. API 명세

### 6.1 인증 API

#### `POST /api/auth/signup`
사용자 회원가입

**Request Body:**
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "password": "password123!",
  "phone": "010-1234-5678",
  "address": "교동",
  "address_detail": "123번길 45",
  "language": "ko",
  "push_enabled": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123...",
    "email": "hong@example.com"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "이미 가입된 이메일입니다."
  }
}
```

---

#### `POST /api/auth/login`
사용자 로그인

**Request Body:**
```json
{
  "email": "hong@example.com",
  "password": "password123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123...",
    "name": "홍길동",
    "email": "hong@example.com",
    "token": "jwt_token_here..."
  }
}
```

---

### 6.2 AI 분류 API

#### `POST /api/classify`
쓰레기 이미지 분류 (핵심 API)

**Request (multipart/form-data):**
```
image: File (JPEG/PNG/WEBP, max 10MB)
userId: string
```

**프로세스:**
1. 이미지 검증 (크기, 포맷)
2. 이미지를 Base64로 인코딩
3. Claude API 호출 (커스텀 프롬프트 포함)
4. 응답 파싱 및 검증
5. Google Sheets 저장 (waste_logs)
6. 포인트 적립 (points)
7. 결과 반환

**Claude API 프롬프트 (Verbalized Sampling 적용):**
```typescript
const prompt = `당신은 쓰레기 분리수거 전문가입니다. 
제공된 이미지를 분석하여 다음 정보를 JSON 형식으로 제공하세요.

이미지에서 감지된 물품을 정확히 식별하고, 강릉시 쓰레기 분류 기준에 따라 5가지 가능한 분류 방법과 각각의 확률을 제시하세요.

응답 형식:
{
  "detected_item": "감지된 물품명 (예: 페트병, 비닐봉지 등)",
  "possible_classifications": [
    {
      "category": "분류 카테고리 (예: 재활용-플라스틱)",
      "disposal_method": "구체적인 배출 방법",
      "disposal_days": ["월요일", "목요일"],
      "confidence": 95,
      "special_notes": "특이사항이 있다면 기재"
    }
    // ... 최대 5개까지
  ],
  "best_classification": {
    // 가장 확률이 높은 분류 (위와 동일한 구조)
  }
}

강릉시 배출 규정:
- 재활용: 월요일, 목요일
- 종량제봉투: 화요일, 금요일
- 음식물: 매일
- 대형폐기물: 별도 신고

중요: 반드시 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.`;
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "logId": "log_xyz789...",
    "detected_item": "페트병",
    "category": "재활용 (플라스틱)",
    "disposal_method": "내용물을 비우고 라벨을 제거한 후 뚜껑과 함께 배출하세요.",
    "disposal_days": ["월요일", "목요일"],
    "confidence": 98.5,
    "special_notes": "찌그러뜨려서 부피를 줄이면 더 좋습니다.",
    "points_earned": 10,
    "next_disposal_date": "2025-10-28 (월요일)"
  }
}
```

**Error (500 Internal Server Error):**
```json
{
  "success": false,
  "error": {
    "code": "AI_ANALYSIS_FAILED",
    "message": "이미지 분석에 실패했습니다. 다시 시도해주세요."
  }
}
```

---

### 6.3 배출 일정 API

#### `GET /api/schedule?address={동명}`
특정 지역의 배출 일정 조회

**Query Parameters:**
- `address` (required): 동명 (예: "교동")

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "address": "교동",
    "schedules": [
      {
        "category": "재활용",
        "days": ["월요일", "목요일"],
        "time": "오전 8시까지",
        "next_date": "2025-10-28"
      },
      {
        "category": "종량제봉투",
        "days": ["화요일", "금요일"],
        "time": "오전 8시까지",
        "next_date": "2025-10-29"
      },
      {
        "category": "음식물",
        "days": ["매일"],
        "time": "오후 6시까지",
        "next_date": "2025-10-27"
      }
    ],
    "today_disposable": ["음식물"],
    "tomorrow_disposable": ["재활용"]
  }
}
```

---

### 6.4 포인트 API

#### `GET /api/points?userId={userId}`
사용자 포인트 조회

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "usr_abc123...",
    "total_points": 1500,
    "this_month_earned": 230,
    "recent_history": [
      {
        "id": "pt_def456...",
        "type": "earn",
        "amount": 10,
        "reason": "쓰레기 분류",
        "created_at": "2025-10-27 11:00:00"
      }
      // ... 최근 10개
    ]
  }
}
```

---

#### `POST /api/points/use`
포인트 사용 (Phase 2)

**Request Body:**
```json
{
  "userId": "usr_abc123...",
  "amount": 100,
  "reason": "카페 쿠폰 교환"
}
```

---

### 6.5 신고 API (Phase 2)

#### `POST /api/reports`
불법 투기 신고

**Request (multipart/form-data):**
```
image: File
userId: string
latitude: number
longitude: number
description: string
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reportId": "rep_ccc333...",
    "status": "pending",
    "points_earned": 20
  }
}
```

---

## 7. UI/UX 설계

### 7.1 디자인 시스템

#### 컬러 팔레트
```css
/* Primary (Green - 환경 친화적) */
--primary-50: #f0fdf4;
--primary-100: #dcfce7;
--primary-500: #22c55e;  /* Main */
--primary-600: #16a34a;
--primary-700: #15803d;

/* Secondary (Blue - 신뢰감) */
--secondary-500: #3b82f6;

/* Semantic Colors */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Neutrals */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;
```

#### 타이포그래피
```css
/* Headings */
--font-h1: 2rem (32px), bold;
--font-h2: 1.5rem (24px), semibold;
--font-h3: 1.25rem (20px), semibold;

/* Body */
--font-body: 1rem (16px), regular;
--font-small: 0.875rem (14px), regular;

/* Font Family */
--font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
```

#### 간격 (Spacing)
```
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
```

---

### 7.2 주요 화면 와이어프레임

#### 7.2.1 홈 화면 (/)

```
┌─────────────────────────────────────┐
│  [Logo] 클린릉      [Profile Icon]  │
├─────────────────────────────────────┤
│                                     │
│  👋 안녕하세요, 홍길동님!            │
│  📍 교동 거주                        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  오늘 배출 가능               │   │
│  │  🗑️ 음식물 쓰레기              │   │
│  │  📦 오후 6시까지               │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [Camera Icon]               │   │
│  │  사진 찍고 분류하기           │   │
│  │  👉 쓰레기 사진을 찍어보세요  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌───────┐ ┌───────┐ ┌───────┐    │
│  │ 배출   │ │ 포인트 │ │ 신고   │    │
│  │ 일정   │ │ 1,500P│ │       │    │
│  └───────┘ └───────┘ └───────┘    │
│                                     │
│  최근 분류 기록                      │
│  ┌─────────────────────────────┐   │
│  │ 🥤 페트병 | 재활용 | 10P      │   │
│  │ 2025-10-26 11:00            │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ [홈] [분류] [일정] [포인트] [MY]     │
└─────────────────────────────────────┘
```

---

#### 7.2.2 AI 분류 화면 (/classify)

```
┌─────────────────────────────────────┐
│  [← Back]  쓰레기 분류               │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │       [카메라 프리뷰]        │   │
│  │                             │   │
│  │         또는                │   │
│  │                             │   │
│  │    [이미지 업로드 영역]      │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  📷 사진 촬영                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🖼️ 갤러리에서 선택           │   │
│  └─────────────────────────────┘   │
│                                     │
│  💡 팁: 물품을 명확하게 촬영하면     │
│     더 정확한 결과를 얻을 수 있어요  │
│                                     │
├─────────────────────────────────────┤
│ [홈] [분류] [일정] [포인트] [MY]     │
└─────────────────────────────────────┘
```

---

#### 7.2.3 분류 결과 화면

```
┌─────────────────────────────────────┐
│  [← Back]  분류 완료                 │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [촬영한 이미지 썸네일]       │   │
│  └─────────────────────────────┘   │
│                                     │
│  🥤 감지된 물품: 페트병              │
│  ✅ AI 신뢰도: 98.5%                │
│  🎁 포인트 +10P 적립 완료!           │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  📋 분류 결과                        │
│  ┌─────────────────────────────┐   │
│  │ 재활용 (플라스틱)             │   │
│  └─────────────────────────────┘   │
│                                     │
│  📍 배출 방법                        │
│  1. 내용물을 깨끗이 비웁니다        │
│  2. 라벨을 제거합니다               │
│  3. 뚜껑과 함께 배출하세요          │
│                                     │
│  📅 배출 요일                        │
│  월요일, 목요일 오전 8시까지         │
│                                     │
│  ⏰ 다음 배출일: 2025-10-28 (월)    │
│                                     │
│  💬 찌그러뜨려서 부피를 줄이면       │
│     더 좋습니다!                    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  알림 설정하기                │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  완료                        │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│ [홈] [분류] [일정] [포인트] [MY]     │
└─────────────────────────────────────┘
```

---

#### 7.2.4 배출 일정 화면 (/schedule)

```
┌─────────────────────────────────────┐
│  배출 일정                           │
├─────────────────────────────────────┤
│                                     │
│  📍 교동 기준                        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  [캘린더 뷰]                 │   │
│  │  2025년 10월                 │   │
│  │                             │   │
│  │  월  화  수  목  금  토  일  │   │
│  │      1   2   3   4   5   6  │   │
│  │  7   8   9  10  11  12  13  │   │
│  │  ... (오늘: 27일 하이라이트) │   │
│  └─────────────────────────────┘   │
│                                     │
│  📋 카테고리별 일정                  │
│                                     │
│  ♻️ 재활용                           │
│  월요일, 목요일 (오전 8시까지)       │
│  다음 배출: 10/28 (월)              │
│  [ 알림 ON ]                        │
│                                     │
│  🗑️ 종량제봉투                       │
│  화요일, 금요일 (오전 8시까지)       │
│  다음 배출: 10/29 (화)              │
│  [ 알림 OFF ]                       │
│                                     │
│  🍽️ 음식물                           │
│  매일 (오후 6시까지)                │
│  다음 배출: 오늘!                   │
│  [ 알림 ON ]                        │
│                                     │
├─────────────────────────────────────┤
│ [홈] [분류] [일정] [포인트] [MY]     │
└─────────────────────────────────────┘
```

---

### 7.3 반응형 디자인

#### Breakpoints
```css
/* Mobile First */
--screen-sm: 640px;   /* 작은 태블릿 */
--screen-md: 768px;   /* 태블릿 */
--screen-lg: 1024px;  /* 데스크톱 */
--screen-xl: 1280px;  /* 큰 데스크톱 */
```

#### 주요 변경사항
- **Mobile (< 640px)**: 1열 레이아웃, 하단 네비게이션
- **Tablet (640px ~ 1024px)**: 2열 레이아웃, 사이드바 옵션
- **Desktop (> 1024px)**: 3열 레이아웃, 좌측 사이드바

---

### 7.4 접근성 (Accessibility)

#### 필수 구현 사항
- [ ] **키보드 네비게이션**: 모든 인터랙티브 요소 Tab으로 접근 가능
- [ ] **스크린 리더 지원**: aria-label, alt 텍스트 적용
- [ ] **색상 대비**: WCAG AA 기준 (4.5:1 이상)
- [ ] **포커스 인디케이터**: 현재 포커스 요소 명확히 표시
- [ ] **에러 메시지**: 명확하고 구체적인 안내
- [ ] **음성 안내 옵션**: 고령자를 위한 TTS (Phase 2)

---

## 8. 개발 일정

### 8.1 개발 단계별 일정 (총 8주)

#### Week 1-2: 환경 설정 및 기본 구조
- [ ] Next.js 15 프로젝트 초기화
- [ ] GitHub 저장소 생성 및 Vercel 연동
- [ ] Google Sheets API 설정
- [ ] Claude API 키 발급 및 테스트
- [ ] 폴더 구조 및 라우팅 설정
- [ ] 디자인 시스템 구축 (Tailwind + shadcn/ui)
- [ ] 환경변수 설정

**산출물**: 
- Next.js 기본 프로젝트
- Google Sheets 6개 시트 생성
- API 키 설정 완료

---

#### Week 3-4: 핵심 기능 개발 (AI 분류)
- [ ] 이미지 업로드 컴포넌트 (CameraCapture, ImageUpload)
- [ ] Claude API 통신 로직 (lib/api/claude.ts)
- [ ] 프롬프트 엔지니어링 (Verbalized Sampling)
- [ ] AI 응답 파싱 및 검증
- [ ] Google Sheets 연동 (waste_logs 저장)
- [ ] 분류 결과 UI (ClassificationResult)
- [ ] 포인트 적립 로직

**산출물**:
- 작동하는 AI 분류 기능
- 분류 결과 저장 및 조회

**테스트 체크리스트**:
- [ ] 페트병 사진 → 정확한 분류 결과
- [ ] 비닐봉지 사진 → 정확한 분류 결과
- [ ] 애매한 물품 (예: 기름 묻은 종이) → AI가 특이사항 안내
- [ ] 잘못된 이미지 (너무 흐림) → 재촬영 요청 메시지

---

#### Week 5: 인증 및 사용자 관리
- [ ] NextAuth.js 설정
- [ ] 회원가입 페이지
- [ ] 로그인 페이지
- [ ] 사용자 정보 Google Sheets 저장
- [ ] 세션 관리
- [ ] 비밀번호 암호화 (bcrypt)

**산출물**:
- 회원가입/로그인 기능

---

#### Week 6: 배출 일정 및 알림
- [ ] 배출 일정 데이터 구조화 (constants/schedules.ts)
- [ ] 지역별 일정 조회 API
- [ ] 배출 일정 캘린더 UI
- [ ] 알림 설정 기능
- [ ] 알림 발송 로직 (이메일 or 푸시)

**산출물**:
- 배출 일정 조회 기능
- 알림 설정 UI

---

#### Week 7: 포인트 시스템 및 마이페이지
- [ ] 포인트 조회 API
- [ ] 포인트 내역 UI
- [ ] 마이페이지 (프로필 수정, 통계)
- [ ] 분류 히스토리 조회
- [ ] 사용자 탈퇴 기능

**산출물**:
- 포인트 시스템
- 마이페이지 완성

---

#### Week 8: 테스트 및 배포 준비
- [ ] 전체 기능 통합 테스트
- [ ] 성능 최적화 (이미지 로딩, API 응답 속도)
- [ ] 모바일 반응형 검증
- [ ] 접근성 검증
- [ ] SEO 최적화 (메타태그, sitemap)
- [ ] PWA 설정 (manifest.json, service worker)
- [ ] Vercel 프로덕션 배포
- [ ] 에러 모니터링 설정 (Sentry)
- [ ] 사용 가이드 작성

**산출물**:
- 프로덕션 배포 완료
- 테스트 보고서
- 사용 가이드 문서

---

### 8.2 주요 마일스톤

| 일정 | 마일스톤 | 산출물 |
|------|----------|--------|
| Week 2 | 프로젝트 초기화 완료 | 개발 환경 구축 |
| Week 4 | AI 분류 기능 완성 | 핵심 기능 작동 |
| Week 6 | MVP 기능 완성 | 전체 플로우 작동 |
| Week 8 | 배포 완료 | 프로덕션 서비스 오픈 |

---

## 9. 배포 및 운영

### 9.1 배포 환경

#### Development
- **URL**: `cleanneung-dev.vercel.app`
- **용도**: 개발 중 기능 테스트
- **자동 배포**: `main` 브랜치 push 시

#### Staging
- **URL**: `cleanneung-staging.vercel.app`
- **용도**: 베타 테스트 (내부 테스터 10명)
- **자동 배포**: `staging` 브랜치 merge 시

#### Production
- **URL**: `cleanneung.vercel.app` → `cleanneung.kr` (추후)
- **용도**: 실제 서비스
- **배포 방식**: `production` 브랜치로 PR → 수동 머지 후 자동 배포

---

### 9.2 환경 변수 관리

#### `.env.local` (Development)
```bash
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Claude AI
CLAUDE_API_KEY=sk-ant-api...
CLAUDE_MODEL=claude-sonnet-4-20250514

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1ABC...XYZ

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Naver Map API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your-client-id
NAVER_MAP_CLIENT_SECRET=your-client-secret

# Vercel Blob (선택)
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# SendGrid (선택)
SENDGRID_API_KEY=SG...

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

#### Vercel 환경 변수 설정
- Vercel Dashboard → Project Settings → Environment Variables
- Development / Preview / Production 각각 설정

---

### 9.3 CI/CD 파이프라인

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, staging, production]
  pull_request:
    branches: [main, staging, production]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      
  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
```

**Vercel 자동 배포**:
- GitHub 연동 완료 시 자동으로 배포 트리거
- Preview 배포: PR 생성 시 자동
- Production 배포: `production` 브랜치 머지 시

---

### 9.4 모니터링 및 로깅

#### Vercel Analytics
- 페이지 뷰
- 사용자 수 (UV, PV)
- 페이지별 성능 (Core Web Vitals)

#### Sentry
- 에러 추적 (Frontend + Backend)
- 성능 모니터링 (API 응답 시간)
- 사용자 피드백 수집

#### 커스텀 로그
```typescript
// lib/utils/logger.ts
export function logEvent(event: string, data?: any) {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4 이벤트 전송
    gtag('event', event, data);
  } else {
    console.log('[LOG]', event, data);
  }
}

// 사용 예시
logEvent('classify_image', {
  detected_item: '페트병',
  confidence: 98.5,
  user_id: 'usr_abc123'
});
```

---

### 9.5 백업 및 복구

#### Google Sheets 백업
- **자동 백업**: Google Drive 버전 기록 (30일)
- **수동 백업**: 주 1회 전체 시트 복사 (관리자)
- **복구 절차**: 버전 기록에서 복원 또는 백업 시트 import

#### 코드 백업
- **GitHub**: 모든 코드 버전 관리
- **복구 절차**: 이전 커밋으로 롤백

---

## 10. 성능 및 보안

### 10.1 성능 최적화

#### 이미지 최적화
```typescript
// lib/utils/image.ts
export async function optimizeImage(file: File): Promise<Blob> {
  // 1. 최대 크기 제한 (1920x1920)
  // 2. 압축 (quality: 0.8)
  // 3. WebP 변환 (지원 시)
  
  const maxWidth = 1920;
  const maxHeight = 1920;
  const quality = 0.8;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Image optimization failed'));
        },
        'image/webp',
        quality
      );
    };
    
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
```

#### API 응답 시간 목표
- AI 분류: 5초 이내
- 일반 데이터 조회: 1초 이내
- 이미지 업로드: 3초 이내

#### 캐싱 전략
- **Static Assets**: CDN 캐싱 (1년)
- **API 응답**: 
  - 배출 일정: 1일 캐싱
  - 포인트 내역: 5분 캐싱
  - AI 분류 결과: 캐싱 안 함 (매번 새로운 분석)

---

### 10.2 보안

#### 인증 및 권한
- **NextAuth.js**: 세션 기반 인증
- **JWT 토큰**: 7일 유효
- **비밀번호**: bcrypt 해싱 (salt rounds: 10)

#### API 보안
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  // 1. 인증 확인
  const session = await getServerSession();
  if (!session) {
    return NextResponse.redirect('/login');
  }
  
  // 2. Rate Limiting (개발 완료 후 적용)
  // 예: 1분에 10회 요청 제한
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/classify', '/api/points/:path*'],
};
```

#### 환경 변수 보호
- 절대 클라이언트에 노출 금지
- `NEXT_PUBLIC_` 접두사는 공개 정보만 사용
- Vercel Environment Variables에 암호화 저장

#### XSS 방지
- React의 기본 이스케이프 활용
- DOMPurify 사용 (사용자 입력 HTML 처리 시)

#### CSRF 방지
- NextAuth.js 기본 CSRF 토큰 사용

---

### 10.3 에러 처리

#### API 에러 핸들링
```typescript
// lib/utils/apiHandler.ts
export async function handleApiError(error: any) {
  console.error('[API Error]', error);
  
  // Sentry에 에러 전송
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error);
  }
  
  // 사용자 친화적 에러 메시지
  const errorMap: Record<string, string> = {
    'NETWORK_ERROR': '네트워크 연결을 확인해주세요.',
    'AI_ANALYSIS_FAILED': '이미지 분석에 실패했습니다. 다시 시도해주세요.',
    'INVALID_IMAGE': '올바른 이미지 파일을 업로드해주세요.',
    'RATE_LIMIT_EXCEEDED': '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  };
  
  return {
    success: false,
    error: {
      code: error.code || 'UNKNOWN_ERROR',
      message: errorMap[error.code] || '알 수 없는 오류가 발생했습니다.',
    },
  };
}
```

#### 사용자 피드백
- 에러 발생 시 Toast 알림
- 재시도 버튼 제공
- 고객센터 연락처 안내 (심각한 에러 시)

---

## 11. 테스트 전략

### 11.1 테스트 범위

#### Unit Tests
- [ ] 유틸리티 함수 (이미지 처리, 날짜 변환 등)
- [ ] API 핸들러 (로직 부분)
- [ ] Zustand 스토어

#### Integration Tests
- [ ] API 엔드포인트 (E2E)
- [ ] Claude API 통신
- [ ] Google Sheets 연동

#### E2E Tests (Playwright)
- [ ] 회원가입 → 로그인 플로우
- [ ] 이미지 업로드 → AI 분류 → 결과 확인
- [ ] 배출 일정 조회
- [ ] 포인트 적립 확인

---

### 11.2 테스트 도구

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@playwright/test": "^1.40.0"
  }
}
```

---

## 12. 문서화

### 12.1 사용자 문서
- [ ] **사용 가이드**: 앱 사용 방법 (스크린샷 포함)
- [ ] **FAQ**: 자주 묻는 질문
- [ ] **배출 규정 안내**: 강릉시 쓰레기 분류 기준 정리

### 12.2 개발자 문서
- [ ] **API 문서**: Swagger 또는 Postman Collection
- [ ] **컴포넌트 스토리북**: UI 컴포넌트 카탈로그 (Phase 2)
- [ ] **데이터베이스 스키마**: Google Sheets 구조 설명
- [ ] **배포 가이드**: 환경 설정 및 배포 절차

---

## 13. 부록

### 13.1 강릉시 쓰레기 배출 기준 (예시)

#### 재활용 (월요일, 목요일)
- 종이류: 신문, 책, 골판지 (테이프 제거)
- 플라스틱: 페트병, 플라스틱 용기 (라벨 제거)
- 유리병: 투명병, 갈색병 (뚜껑 제거)
- 캔류: 철캔, 알루미늄캔

#### 종량제봉투 (화요일, 금요일)
- 일반 쓰레기
- 재활용 불가 플라스틱
- 기름 묻은 종이
- 비닐류 (깨끗한 경우 재활용 가능)

#### 음식물 (매일)
- 과일 껍질, 채소
- 음식물 찌꺼기
- **제외**: 뼈, 조개껍데기, 고추씨

#### 대형폐기물 (별도 신고)
- 가구, 가전제품
- 신고 후 스티커 부착

---

### 13.2 참고 링크
- Next.js 15 문서: https://nextjs.org/docs
- Claude API 문서: https://docs.anthropic.com/
- Google Sheets API: https://developers.google.com/sheets/api
- Naver Map API: https://api.ncloud-docs.com/docs/ai-naver-mapsgeocoding
- Vercel 문서: https://vercel.com/docs

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| v1.0 | 2025-10-27 | 초안 작성 | 박용환 |

---

**문서 끝**
