# 커스텀 도메인 연결 가이드

## 개요

`cleanneung.kr` 같은 커스텀 도메인을 Vercel 프로젝트에 연결하는 방법을 안내합니다.

---

## 1. 도메인 구매

### 1-1. 도메인 등록 대행사 선택

한국에서 `.kr` 도메인을 등록할 수 있는 업체:

#### 국내 업체
- **가비아** (https://gabia.com) - 가장 많이 사용
- **카페24** (https://cafe24.com)
- **후이즈** (https://whois.co.kr)
- **닷네임코리아** (https://dotname.co.kr)

#### 해외 업체
- **Cloudflare** (https://cloudflare.com) - 가격 저렴, 권장
- **Namecheap** (https://namecheap.com)
- **GoDaddy** (https://godaddy.com)

### 1-2. 도메인 검색 및 구매

1. 원하는 도메인 등록 대행사 접속
2. `cleanneung.kr` 검색
3. 도메인이 사용 가능한지 확인
4. 구매 진행 (일반적으로 1년 단위)

**예상 비용**:
- `.kr` 도메인: 약 15,000~20,000원/년
- `.com` 도메인: 약 10,000~15,000원/년

---

## 2. Vercel에 도메인 추가

### 2-1. Vercel 대시보드에서 설정

1. https://vercel.com 로그인
2. 프로젝트 선택: `clean-neung`
3. "Settings" 탭 클릭
4. 좌측 메뉴에서 "Domains" 클릭
5. "Add Domain" 버튼 클릭

### 2-2. 도메인 입력

1. 도메인 입력:
   ```
   cleanneung.kr
   ```
2. "Add" 클릭

### 2-3. 도메인 소유권 확인 방법 선택

Vercel이 다음 중 하나를 요청합니다:

#### 옵션 1: A 레코드 (권장)
```
Type: A
Name: @
Value: 76.76.21.21
```

#### 옵션 2: CNAME 레코드
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

Vercel 화면에 표시된 값을 메모해두세요.

---

## 3. DNS 설정

### 3-1. 도메인 등록 대행사 DNS 관리 페이지 접속

#### 가비아 예시:
1. 가비아 로그인
2. "My가비아" → "서비스 관리"
3. 도메인 선택 → "관리" 클릭
4. "DNS 정보" 또는 "DNS 관리" 클릭

#### Cloudflare 예시:
1. Cloudflare 로그인
2. 도메인 선택
3. "DNS" 탭 클릭

### 3-2. DNS 레코드 추가

Vercel이 제공한 정보를 입력:

#### A 레코드 방식 (권장):

**레코드 1: Root 도메인**
```
Type: A
Name: @ (또는 비워두기)
Value: 76.76.21.21
TTL: 3600 (1 hour)
```

**레코드 2: www 서브도메인 (선택사항)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### CNAME 레코드 방식:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**주의**: 일부 DNS 제공업체는 루트 도메인(@)에 CNAME을 허용하지 않습니다. 이 경우 A 레코드를 사용하세요.

### 3-3. 저장 및 적용

1. "저장" 또는 "추가" 버튼 클릭
2. DNS 전파 대기 (최대 24-48시간, 보통 몇 분~몇 시간)

---

## 4. 도메인 확인 및 SSL 설정

### 4-1. Vercel에서 도메인 상태 확인

1. Vercel 대시보드 → 프로젝트 → "Settings" → "Domains"
2. 도메인 상태 확인:
   - ✅ **Valid**: DNS 설정 완료, SSL 인증서 발급 진행 중
   - ⏳ **Pending**: DNS 전파 대기 중
   - ❌ **Invalid**: DNS 설정 오류

### 4-2. SSL 인증서 자동 발급

Vercel은 Let's Encrypt를 사용하여 HTTPS를 자동으로 설정합니다:

- 도메인이 Valid 상태가 되면 자동으로 SSL 인증서 발급
- 보통 5-10분 소요
- 인증서는 자동으로 갱신됨

### 4-3. HTTPS 강제 리디렉션

Vercel은 기본적으로 HTTP를 HTTPS로 자동 리디렉션합니다.

---

## 5. 여러 도메인 설정 (선택사항)

### 5-1. www 서브도메인 추가

1. Vercel → "Domains" → "Add Domain"
2. `www.cleanneung.kr` 입력
3. "Add" 클릭
4. DNS에 CNAME 레코드 추가:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### 5-2. 주 도메인 설정

원하는 도메인을 "Primary Domain"으로 설정:

1. Vercel → "Domains"
2. 원하는 도메인 옆 "..." 메뉴
3. "Set as Primary Domain" 클릭

**예시**:
- `cleanneung.kr` → 주 도메인
- `www.cleanneung.kr` → `cleanneung.kr`로 리디렉션

---

## 6. 이메일 설정 (선택사항)

### 6-1. 도메인 이메일 구성

`.kr` 도메인으로 이메일을 받으려면:

#### 옵션 1: 가비아 메일 서비스
1. 가비아에서 메일 호스팅 신청
2. MX 레코드 설정 (가비아 가이드 참조)

#### 옵션 2: Google Workspace
1. Google Workspace 가입
2. MX 레코드 설정:
   ```
   Type: MX
   Priority: 1
   Value: aspmx.l.google.com
   ```
   (추가 MX 레코드는 Google 가이드 참조)

#### 옵션 3: Cloudflare Email Routing (무료)
1. Cloudflare에서 Email Routing 활성화
2. 포워딩할 이메일 주소 설정
3. `contact@cleanneung.kr` → `sanoramyun8@gmail.com`

---

## 7. DNS 전파 확인

### 7-1. 온라인 도구 사용

DNS 설정이 전파되었는지 확인:

- **whatsmydns.net**: https://whatsmydns.net
  - 도메인 입력: `cleanneung.kr`
  - Record Type: `A`
  - 세계 여러 지역에서 DNS 조회 결과 확인

- **DNS Checker**: https://dnschecker.org
  - 전 세계 DNS 서버에서 조회 확인

### 7-2. 명령줄 도구

Windows PowerShell:
```powershell
nslookup cleanneung.kr
```

macOS/Linux Terminal:
```bash
dig cleanneung.kr
```

올바른 IP 주소 (`76.76.21.21`)가 반환되면 설정 완료.

---

## 8. 환경 변수 업데이트

### 8-1. `NEXT_PUBLIC_APP_URL` 변경

1. Vercel → "Settings" → "Environment Variables"
2. `NEXT_PUBLIC_APP_URL` 편집:
   - 기존: `https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app`
   - 새로: `https://cleanneung.kr`
3. "Save" 클릭
4. 재배포 대기 (자동)

### 8-2. 코드 내 URL 업데이트 (필요 시)

하드코딩된 URL이 있다면 업데이트:

```typescript
// Before
const API_URL = 'https://clean-neung-qeu9tcn5c-yongparks-projects.vercel.app/api';

// After
const API_URL = process.env.NEXT_PUBLIC_APP_URL + '/api';
```

---

## 9. SEO 업데이트

### 9-1. `robots.txt` 생성 (선택사항)

`public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://cleanneung.kr/sitemap.xml
```

### 9-2. `sitemap.xml` 생성 (선택사항)

`app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cleanneung.kr',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://cleanneung.kr/classify',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://cleanneung.kr/schedule',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://cleanneung.kr/points',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

### 9-3. Open Graph 메타데이터 업데이트

`app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://cleanneung.kr'),
  title: "클린릉 - AI 기반 강릉 스마트 분리수거 플랫폼",
  description: "사진 한 장으로 쓰레기 분류하고 포인트도 적립하세요. 강릉시 분리수거를 쉽고 재미있게!",
  openGraph: {
    title: "클린릉 - AI 기반 강릉 스마트 분리수거 플랫폼",
    description: "사진 한 장으로 쓰레기 분류하고 포인트도 적립하세요.",
    url: 'https://cleanneung.kr',
    siteName: '클린릉',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "클린릉 - AI 기반 강릉 스마트 분리수거 플랫폼",
    description: "사진 한 장으로 쓰레기 분류하고 포인트도 적립하세요.",
  },
};
```

---

## 10. Google Search Console 등록

### 10-1. Search Console 설정

1. https://search.google.com/search-console 접속
2. "속성 추가" 클릭
3. **URL 접두어**: `https://cleanneung.kr`
4. "계속" 클릭

### 10-2. 소유권 확인

**방법 1: HTML 파일 업로드**
1. 제공된 HTML 파일 다운로드
2. `public/` 폴더에 추가
3. Vercel에 배포
4. "확인" 클릭

**방법 2: DNS TXT 레코드**
1. 제공된 TXT 레코드 복사
2. DNS 관리 페이지에서 TXT 레코드 추가
3. "확인" 클릭

### 10-3. Sitemap 제출

1. Search Console → "Sitemaps"
2. Sitemap URL 입력: `https://cleanneung.kr/sitemap.xml`
3. "제출" 클릭

---

## 11. 문제 해결

### 11-1. DNS 전파가 안 됨

**해결 방법**:
1. DNS 레코드가 올바른지 재확인
2. TTL 값을 낮춤 (300초 = 5분)
3. 24-48시간 대기
4. `nslookup`으로 확인

### 11-2. SSL 인증서 발급 실패

**원인**:
- DNS 설정이 올바르지 않음
- CAA 레코드가 Let's Encrypt를 차단함

**해결 방법**:
1. DNS 레코드 재확인
2. CAA 레코드 확인 및 제거/수정
3. Vercel 지원팀에 문의

### 11-3. 도메인이 Invalid 상태

**확인 사항**:
1. DNS A 레코드: `76.76.21.21`
2. CNAME 레코드: `cname.vercel-dns.com`
3. `whatsmydns.net`에서 전파 확인

### 11-4. www 도메인이 작동하지 않음

**해결 방법**:
1. www 서브도메인을 별도로 추가
2. CNAME 레코드 설정:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 12. 도메인 설정 체크리스트

배포 전:
- [ ] 도메인 구매 완료
- [ ] DNS 관리 접근 가능
- [ ] Vercel 프로젝트 준비됨

도메인 연결:
- [ ] Vercel에 도메인 추가
- [ ] DNS A 레코드 추가 (`@` → `76.76.21.21`)
- [ ] DNS CNAME 레코드 추가 (`www` → `cname.vercel-dns.com`)
- [ ] DNS 전파 확인 (whatsmydns.net)

SSL 및 리디렉션:
- [ ] HTTPS 작동 확인
- [ ] www → non-www 리디렉션 확인 (또는 반대)
- [ ] HTTP → HTTPS 리디렉션 확인

환경 변수 및 SEO:
- [ ] `NEXT_PUBLIC_APP_URL` 업데이트
- [ ] `robots.txt` 생성
- [ ] `sitemap.xml` 생성
- [ ] Google Search Console 등록
- [ ] Open Graph 메타데이터 업데이트

---

## 13. 완료 후 테스트

1. **브라우저 테스트**
   ```
   https://cleanneung.kr
   https://www.cleanneung.kr
   http://cleanneung.kr (자동으로 HTTPS로 리디렉션되어야 함)
   ```

2. **SSL 인증서 확인**
   - 브라우저 주소창 자물쇠 아이콘 클릭
   - "인증서가 유효함" 확인

3. **모든 페이지 테스트**
   - 홈: `https://cleanneung.kr`
   - 분류: `https://cleanneung.kr/classify`
   - 일정: `https://cleanneung.kr/schedule`
   - 포인트: `https://cleanneung.kr/points`
   - 마이페이지: `https://cleanneung.kr/mypage`

---

## 참고 자료

- [Vercel Custom Domains 가이드](https://vercel.com/docs/concepts/projects/domains)
- [DNS 설명서](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [Let's Encrypt 공식 사이트](https://letsencrypt.org/)
