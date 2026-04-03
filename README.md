# Developer Portfolio

TypeScript + React + Vite 기반의 개인 개발자 홈페이지입니다.

핵심 특징:
- 다크 모드 포트폴리오
- 실물 사진 대신 아바타 사용
- 소개/프로젝트 설명을 Markdown으로 관리
- GitHub 저장소 정보와 최근 커밋을 다시 불러오는 sync 스크립트 제공
- GitHub Pages 배포 워크플로우 포함
- shadcn/ui 스타일 컴포넌트 기반

## 시작하기

```bash
pnpm install
pnpm sync:github
pnpm dev
```

## 라우트

- `/` — 방문자용 공개 포트폴리오 페이지

## 수정 포인트

### 1) 개인 소개 수정
`src/content/site/profile.md`

- 이름
- 직무
- 상태 메시지
- 소개 문단
- 소셜 링크
- avatarLabel

### 2) 프로젝트 추가/수정
`src/content/projects/*.md`

예시 frontmatter:

```md
---
title: My Project
summary: Short summary
repo: owner/repo
featured: true
order: 1
status: Shipping
period: 2026
role: Frontend, architecture
stack: TypeScript, React, API
liveUrl: https://example.com
---
```

### 3) GitHub 정보 다시 불러오기
```bash
pnpm sync:github
```

선택 사항:
- `GITHUB_TOKEN`을 설정하면 rate limit 완화에 도움이 됩니다.

### 4) GitHub Pages 배포
이 설정은 사용자 루트 사이트(`kht2199.github.io`) 기준입니다.

1. 저장소를 `kht2199.github.io` 이름으로 GitHub에 push
2. `pnpm build:pages` 로 정적 파일을 `docs/`에 생성
3. GitHub 저장소 Settings → Pages 에서 Source를 `Deploy from a branch` / Branch를 `main` / Folder를 `/docs`로 선택
4. 배포 주소는 `https://kht2199.github.io/`
5. SPA 라우트는 `404.html` fallback으로 동작

## 폴더 구조

- `src/content/site/profile.md` — 자기소개/워크플로우
- `src/content/projects/*.md` — 프로젝트 설명 + repo 연결
- `src/data/generated/github-data.json` — 동기화된 GitHub 메타데이터 결과물
- `scripts/sync-github.mjs` — GitHub 재동기화 스크립트

## 구현 메모
- 전체 UI는 TypeScript로 작성했습니다.
- 소개 텍스트와 프로젝트 설명은 Markdown 우선 구조입니다.
- 실물 사진 대신 아바타 이니셜 박스를 사용합니다.
