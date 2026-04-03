---
title: Developer Portfolio Platform
summary: MD 기반 소개 관리와 GitHub 재동기화를 지원하는 다크 모드 포트폴리오.
repo: your-github-username/dev-portfolio
featured: true
order: 1
status: In Progress
period: 2026
role: Product design, frontend architecture, content workflow
stack: TypeScript, React, Vite, shadcn/ui, Tailwind CSS, GitHub API
liveUrl: https://example.com
---
## Overview

이 프로젝트는 단순한 포트폴리오 페이지가 아니라, 소개와 프로젝트 내용을 Markdown으로 업데이트하고 GitHub에서 최신 커밋을 재수집할 수 있는 운영형 포트폴리오입니다.

## Why this exists

- 소개 문구를 코드가 아닌 콘텐츠 파일에서 바로 수정하기 위해
- 프로젝트 상세 설명과 저장소 연결 정보를 분리해서 관리하기 위해
- GitHub 이력 기반으로 "무엇을 만들었는지"뿐 아니라 "어떻게 발전시켰는지"까지 보여주기 위해

## Highlights

- TypeScript 기본 구성
- 실물 사진 대신 아바타 기반 히어로
- 프로젝트 상세 섹션 + 최근 커밋 타임라인
- `pnpm sync:github`로 다시 불러오는 GitHub 메타데이터
