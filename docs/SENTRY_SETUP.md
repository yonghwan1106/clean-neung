# Sentry 에러 모니터링 설정 가이드

## 개요

Sentry는 실시간 에러 추적 및 성능 모니터링 플랫폼입니다. 프로덕션 환경에서 발생하는 에러를 자동으로 수집하고 알림을 받을 수 있습니다.

---

## 1. Sentry 계정 생성

### 1-1. Sentry 가입

1. https://sentry.io 접속
2. "Get Started" 클릭
3. GitHub 또는 이메일로 회원가입
4. 무료 플랜 선택 (월 5,000 에러까지 무료)

### 1-2. 프로젝트 생성

1. "Create Project" 클릭
2. **플랫폼 선택**: `Next.js` 선택
3. **프로젝트 이름**: `clean-neung`
4. **팀 선택**: 기본 팀 또는 새 팀 생성
5. "Create Project" 클릭

### 1-3. DSN 확인

프로젝트가 생성되면 **DSN (Data Source Name)**이 표시됩니다:

```
https://xxxxx@o000000.ingest.sentry.io/0000000
```

이 DSN을 복사해두세요. (나중에 환경 변수로 사용)

---

## 2. Next.js에 Sentry 설치

### 2-1. Sentry CLI 설치

```bash
npm install --save-dev @sentry/cli
```

### 2-2. Sentry SDK 설치

Next.js 15용 Sentry SDK:

```bash
npm install @sentry/nextjs
```

### 2-3. Sentry 초기화

프로젝트 루트에서 Sentry 설정 마법사 실행:

```bash
npx @sentry/wizard@latest -i nextjs
```

마법사가 자동으로 다음 파일들을 생성합니다:
- `sentry.client.config.ts`: 클라이언트 설정
- `sentry.server.config.ts`: 서버 설정
- `sentry.edge.config.ts`: Edge Runtime 설정
- `next.config.mjs`: Sentry 플러그인 추가

---

## 3. 설정 파일 수동 생성 (마법사 사용 안 할 경우)

### 3-1. `sentry.client.config.ts` 생성

프로젝트 루트에 파일 생성:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 트레이싱 설정
  tracesSampleRate: 1.0,

  // 환경 설정
  environment: process.env.NODE_ENV,

  // 디버그 모드 (개발 환경에서만)
  debug: process.env.NODE_ENV === 'development',

  // 에러 필터링
  beforeSend(event, hint) {
    // 로컬 개발 환경에서는 에러를 전송하지 않음
    if (process.env.NODE_ENV === 'development') {
      console.error(hint.originalException || hint.syntheticException);
      return null;
    }
    return event;
  },

  // 성능 모니터링 통합
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/clean-neung.*\.vercel\.app/,
      ],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Session Replay 샘플링
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 3-2. `sentry.server.config.ts` 생성

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  debug: process.env.NODE_ENV === 'development',

  beforeSend(event, hint) {
    if (process.env.NODE_ENV === 'development') {
      console.error(hint.originalException || hint.syntheticException);
      return null;
    }
    return event;
  },
});
```

### 3-3. `sentry.edge.config.ts` 생성

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  debug: process.env.NODE_ENV === 'development',
});
```

### 3-4. `next.config.mjs` 수정

기존 `next.config.js` 파일을 `next.config.mjs`로 변경하고 Sentry 플러그인 추가:

```javascript
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 설정들...
};

export default withSentryConfig(
  nextConfig,
  {
    // Sentry Webpack Plugin 옵션
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    // Sentry SDK 옵션
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  }
);
```

---

## 4. 환경 변수 설정

### 4-1. `.env.local` 파일에 추가

```env
# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@o000000.ingest.sentry.io/0000000
SENTRY_ORG=your-org-name
SENTRY_PROJECT=clean-neung
SENTRY_AUTH_TOKEN=your-auth-token
```

**주의사항**:
- `NEXT_PUBLIC_SENTRY_DSN`: 클라이언트와 서버 모두 사용
- `SENTRY_AUTH_TOKEN`: 소스맵 업로드용 (선택사항)

### 4-2. Vercel 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" → "Environment Variables"
3. 다음 변수들 추가:
   - `NEXT_PUBLIC_SENTRY_DSN`: DSN 값
   - `SENTRY_ORG`: 조직 이름
   - `SENTRY_PROJECT`: `clean-neung`
   - `SENTRY_AUTH_TOKEN`: 인증 토큰 (선택사항)
4. "Save" 클릭

### 4-3. Sentry Auth Token 생성 (선택사항)

소스맵 업로드를 위한 토큰 생성:

1. Sentry 대시보드 → 우측 상단 프로필 → "Auth Tokens"
2. "Create New Token" 클릭
3. **Token name**: `vercel-clean-neung`
4. **Scopes**:
   - ✅ `project:read`
   - ✅ `project:releases`
   - ✅ `org:read`
5. "Create Token" 클릭
6. 토큰을 복사하여 환경 변수에 추가

---

## 5. 에러 캡처 예시

### 5-1. 기본 에러 캡처

자동으로 캡처되는 에러:
- 처리되지 않은 Promise rejection
- Unhandled exception
- API 라우트 에러
- React 컴포넌트 에러

### 5-2. 수동 에러 캡처

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // 위험한 작업
  const result = await classifyWaste(image);
} catch (error) {
  // Sentry에 에러 전송
  Sentry.captureException(error);
  console.error('Classification failed:', error);
}
```

### 5-3. 컨텍스트 정보 추가

```typescript
import * as Sentry from '@sentry/nextjs';

// 사용자 정보 설정
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
});

// 추가 컨텍스트
Sentry.setContext('waste_classification', {
  detected_item: 'plastic_bottle',
  confidence: 95,
  category: 'recyclable',
});

// 태그 추가
Sentry.setTag('page', 'classify');

// 에러 캡처
Sentry.captureException(new Error('Classification error'));
```

### 5-4. 커스텀 메시지

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.captureMessage('User completed waste classification', 'info');
```

---

## 6. API 라우트 에러 모니터링

### 6-1. API 라우트 래퍼

`src/lib/api/withSentry.ts` 파일 생성:

```typescript
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export function withSentry(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      Sentry.captureException(error, {
        contexts: {
          request: {
            url: req.url,
            method: req.method,
            headers: Object.fromEntries(req.headers),
          },
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: error instanceof Error ? error.message : '서버 에러가 발생했습니다.',
          },
        },
        { status: 500 }
      );
    }
  };
}
```

### 6-2. API 라우트에서 사용

```typescript
import { withSentry } from '@/lib/api/withSentry';

async function handler(req: NextRequest) {
  // API 로직
  const result = await classifyImage(image);
  return NextResponse.json({ success: true, data: result });
}

export const POST = withSentry(handler);
```

---

## 7. React Error Boundary

### 7-1. Error Boundary 컴포넌트 생성

`src/components/ErrorBoundary.tsx`:

```tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sentry에 에러 전송
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-red-600">오류가 발생했습니다</CardTitle>
          <CardDescription>
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-700">
            {error.message}
          </div>
          <div className="flex gap-2">
            <Button onClick={reset} className="flex-1">
              다시 시도
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => (window.location.href = '/')}
            >
              홈으로
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 7-2. `app/error.tsx` 사용

Next.js App Router에서는 `error.tsx`가 자동으로 Error Boundary 역할:

```tsx
'use client';

import ErrorBoundary from '@/components/ErrorBoundary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorBoundary error={error} reset={reset} />;
}
```

---

## 8. 성능 모니터링

### 8-1. 트랜잭션 추적

```typescript
import * as Sentry from '@sentry/nextjs';

const transaction = Sentry.startTransaction({
  op: 'waste.classification',
  name: 'Classify Waste Image',
});

try {
  const result = await classifyImage(image);
  transaction.setStatus('ok');
} catch (error) {
  transaction.setStatus('unknown_error');
  throw error;
} finally {
  transaction.finish();
}
```

### 8-2. 커스텀 메트릭

```typescript
import * as Sentry from '@sentry/nextjs';

// 분류 시간 측정
const startTime = Date.now();
await classifyImage(image);
const duration = Date.now() - startTime;

Sentry.metrics.distribution('classification.duration', duration, {
  unit: 'millisecond',
  tags: { category: 'recyclable' },
});
```

---

## 9. 알림 설정

### 9-1. 이메일 알림

1. Sentry 대시보드 → 프로젝트 → "Settings" → "Alerts"
2. "Create Alert Rule" 클릭
3. **Alert name**: `High Error Rate`
4. **Conditions**:
   - When: `The issue is first seen`
   - Or: `The issue changes state`
5. **Actions**: `Send a notification via Email`
6. "Save Rule" 클릭

### 9-2. Slack 통합 (선택사항)

1. Sentry → "Settings" → "Integrations"
2. "Slack" 검색 및 "Install" 클릭
3. Slack 워크스페이스 연결
4. Alert Rule에서 Slack 채널 선택

---

## 10. 데이터 확인

### 10-1. Issues 확인

1. Sentry 대시보드 → "Issues" 탭
2. 발생한 에러 목록 확인
3. 에러 클릭 → 상세 정보:
   - Stack trace
   - Breadcrumbs (사용자 행동 기록)
   - Device/Browser 정보
   - Release 버전

### 10-2. Performance 확인

1. "Performance" 탭
2. 트랜잭션 목록 및 성능 메트릭 확인
3. 느린 API 호출 식별

---

## 11. 문제 해결

### 11-1. 에러가 전송되지 않음

**확인 사항**:
1. DSN이 올바른지 확인
2. 환경 변수가 올바르게 설정되었는지 확인
3. 개발 환경에서는 `beforeSend`에서 `null` 반환하는지 확인
4. 브라우저 콘솔에서 Sentry 초기화 메시지 확인

### 11-2. 소스맵이 업로드되지 않음

**해결 방법**:
1. `SENTRY_AUTH_TOKEN`이 설정되었는지 확인
2. Vercel 빌드 로그에서 Sentry 플러그인 실행 확인
3. Sentry → "Settings" → "Source Maps" 확인

---

## 12. 릴리즈 추적 (선택사항)

### 12-1. 릴리즈 버전 설정

`package.json`에 버전 추가:

```json
{
  "version": "1.0.0"
}
```

### 12-2. Sentry 설정에서 릴리즈 사용

```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
});
```

---

## 13. 비용 관리

### 13-1. 무료 플랜 제한

- 월 5,000 에러 이벤트
- 월 10,000 성능 트랜잭션
- 500 Session Replays

### 13-2. 샘플링 조정

에러가 많을 경우 샘플링 비율 조정:

```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10%만 수집
  replaysSessionSampleRate: 0.01, // 1%만 수집
});
```

---

## 14. 다음 단계

1. ✅ Sentry 설치 및 설정
2. ⬜ 에러 캡처 테스트
3. ⬜ 알림 설정
4. ⬜ 프로덕션 에러 모니터링
5. ⬜ 성능 병목 지점 식별 및 개선

---

## 참고 자료

- [Sentry Next.js 공식 문서](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Best Practices](https://docs.sentry.io/product/sentry-basics/guides/enrich-data/)
- [Vercel + Sentry 통합](https://vercel.com/integrations/sentry)
