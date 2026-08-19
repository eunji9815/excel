# 마케팅 지표 계산기 웹앱

ROAS · CAC · LTV · 손익분기점을 계산하고 여러 시나리오를 나란히 비교하는 도구입니다.

- 지표 정의와 계산 근거: [`docs/metrics-definition.md`](docs/metrics-definition.md)
- 계산 로직: [`lib/metrics.ts`](lib/metrics.ts)
- 화면: [`app/page.tsx`](app/page.tsx)

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

## Vercel 배포 (코딩 없이)

1. [vercel.com](https://vercel.com) 가입 후 GitHub 계정 연동
2. "Add New… → Project" 에서 이 저장소(`excel`) 선택
3. 별도 설정 없이 "Deploy" 클릭 (Next.js 프로젝트를 자동으로 인식)
4. 배포 완료 후 발급되는 URL이 곧 계산기 URL

이후 `main` 브랜치에 push할 때마다 자동으로 재배포됩니다.

## 스택

Next.js (App Router) · TypeScript · Tailwind CSS
