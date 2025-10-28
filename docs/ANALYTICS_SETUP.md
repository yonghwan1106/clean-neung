# Google Analytics 설정 가이드

## 개요

클린릉 웹사이트에 Google Analytics를 설정하여 사용자 행동, 트래픽, 전환율 등을 추적할 수 있습니다.

## 1. Google Analytics 계정 생성

### 1-1. Google Analytics 접속

1. https://analytics.google.com 접속
2. Google 계정으로 로그인
3. "측정 시작" 클릭

### 1-2. 계정 설정

1. **계정 이름**: `클린릉` 또는 원하는 이름 입력
2. 계정 데이터 공유 설정 확인
3. "다음" 클릭

### 1-3. 속성 설정

1. **속성 이름**: `클린릉 웹사이트`
2. **보고 시간대**: `대한민국`
3. **통화**: `대한민국 원 (₩)`
4. "다음" 클릭

### 1-4. 비즈니스 정보

1. **업종 카테고리**: `기술 > 인터넷 및 통신`
2. **비즈니스 규모**: 해당하는 항목 선택
3. **사용 목적**:
   - ✅ 사용자 행동 분석
   - ✅ 광고 효율성 측정
4. "만들기" 클릭

### 1-5. 데이터 스트림 생성

1. **플랫폼**: `웹` 선택
2. **웹사이트 URL**: `https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app`
   - 커스텀 도메인이 있다면: `https://cleanneung.kr`
3. **스트림 이름**: `클린릉 프로덕션`
4. "스트림 만들기" 클릭

### 1-6. 측정 ID 확인

데이터 스트림이 생성되면 **측정 ID**가 표시됩니다:
```
G-XXXXXXXXXX
```
이 ID를 복사해두세요. (나중에 코드에서 사용)

---

## 2. Next.js에 Google Analytics 설치

### 2-1. 패키지 설치

현재 프로젝트는 Next.js 15를 사용하므로, `next/script`를 활용한 설치가 권장됩니다.

추가 패키지는 필요하지 않습니다. (Next.js 내장 기능 사용)

### 2-2. Google Analytics 컴포넌트 생성

`src/components/analytics/GoogleAnalytics.tsx` 파일 생성:

```tsx
'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

### 2-3. 환경 변수 설정

`.env.local` 파일에 추가:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**주의**: `NEXT_PUBLIC_` 접두사가 필요합니다. (클라이언트 사이드에서 접근 가능)

### 2-4. Root Layout에 추가

`src/app/layout.tsx` 수정:

```tsx
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ko">
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <div className="pb-16 md:pb-0">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
```

### 2-5. Vercel 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Environment Variables"
3. 새 환경 변수 추가:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXXXXXXXXX` (실제 측정 ID)
   - **Environment**: Production, Preview, Development 모두 선택
4. "Save" 클릭
5. 자동 재배포 대기

---

## 3. 이벤트 추적 설정 (선택사항)

### 3-1. 이벤트 추적 함수 생성

`src/lib/analytics.ts` 파일 생성:

```typescript
// Google Analytics 이벤트 전송
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 페이지뷰 추적
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
};
```

### 3-2. 타입 정의 추가

`src/types/gtag.d.ts` 파일 생성:

```typescript
interface Window {
  gtag: (
    command: 'config' | 'event',
    targetId: string,
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
}
```

### 3-3. 이벤트 사용 예시

쓰레기 분류 완료 시:

```tsx
import { event } from '@/lib/analytics';

const handleClassification = async () => {
  // ... 분류 로직

  // Google Analytics 이벤트 전송
  event({
    action: 'classify_waste',
    category: 'Engagement',
    label: detectedItem,
    value: confidence,
  });
};
```

포인트 적립 시:

```tsx
event({
  action: 'earn_points',
  category: 'Engagement',
  label: 'waste_classification',
  value: 10,
});
```

---

## 4. 주요 추적 이벤트 목록

클린릉에서 추적하면 좋은 이벤트들:

### 4-1. 사용자 행동
- `classify_waste`: 쓰레기 분류 완료
- `view_schedule`: 배출 일정 조회
- `earn_points`: 포인트 적립
- `check_points`: 포인트 조회

### 4-2. 페이지 뷰
- `/`: 홈페이지
- `/classify`: 분류 페이지
- `/schedule`: 일정 페이지
- `/points`: 포인트 페이지
- `/mypage`: 마이페이지

### 4-3. 전환
- `signup`: 회원가입 완료
- `login`: 로그인 완료
- `first_classification`: 첫 분류 완료

---

## 5. 데이터 확인

### 5-1. 실시간 보고서

1. Google Analytics 대시보드 접속
2. 좌측 메뉴 → "실시간"
3. 현재 활성 사용자 수 확인

### 5-2. 주요 보고서

- **사용자 > 개요**: 총 사용자 수, 신규 사용자, 재방문 사용자
- **이벤트**: 커스텀 이벤트 추적
- **페이지 및 화면**: 페이지별 조회수
- **전환**: 목표 달성 추적

---

## 6. 개인정보 보호 설정

### 6-1. 쿠키 동의 (선택사항)

한국의 개인정보 보호법에 따라 쿠키 동의를 받는 것이 권장됩니다.

간단한 구현 예시:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          이 웹사이트는 사용자 경험 향상을 위해 쿠키를 사용합니다.
        </p>
        <Button onClick={handleAccept} variant="outline">
          동의
        </Button>
      </div>
    </div>
  );
}
```

### 6-2. IP 익명화 (자동 적용)

Google Analytics 4 (GA4)는 기본적으로 IP 익명화가 활성화되어 있습니다.

---

## 7. 문제 해결

### 7-1. 데이터가 표시되지 않음

**확인 사항**:
1. 측정 ID가 올바른지 확인
2. 환경 변수가 올바르게 설정되었는지 확인
3. 브라우저에서 개발자 도구 → Network 탭 → `gtag/js` 요청 확인
4. 광고 차단기 비활성화 후 테스트

### 7-2. 실시간 데이터가 안 보임

- 데이터 수집 시작까지 최대 24-48시간 소요될 수 있음
- "실시간" 보고서에서 즉시 확인 가능
- 본인의 트래픽도 카운트됨 (내부 트래픽 필터링 설정 가능)

---

## 8. 다음 단계

1. ✅ Google Analytics 설치
2. ✅ 기본 페이지뷰 추적
3. ⬜ 커스텀 이벤트 구현
4. ⬜ 전환 목표 설정
5. ⬜ 주간/월간 보고서 확인
6. ⬜ Sentry 에러 모니터링 추가

---

## 참고 자료

- [Google Analytics 공식 문서](https://support.google.com/analytics)
- [Next.js Analytics 가이드](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 이벤트 추적](https://developers.google.com/analytics/devguides/collection/ga4/events)
