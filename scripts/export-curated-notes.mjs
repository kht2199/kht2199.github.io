import fs from 'node:fs/promises'
import path from 'node:path'

const vaultRoot = process.env.OBSIDIAN_VAULT_PATH || '/Users/htkim/Documents/Obsidian Vault'
const outputDir = path.join(process.cwd(), 'public', 'notes')

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return markdown.trim()
  const parts = markdown.split('---')
  return parts.slice(2).join('---').trim()
}

async function readVault(relativePath) {
  const fullPath = path.join(vaultRoot, relativePath)
  return fs.readFile(fullPath, 'utf8')
}

function buildYaml() {
  return `identity:
  summary: AI를 활용해 낯선 도메인의 문제를 빠르게 구조화하고 구현까지 연결하는 실전형 엔지니어
  role: AI-Augmented Full-stack Engineer
drivers:
  growth_vs_profit: { growth: 60, profit: 40 }
  priorities:
    - 빠른 성장
    - 다양한 경험
    - 실전 문제 해결
public_positioning:
  headline: AI leverage와 end-to-end execution을 결합하는 문제 해결형 엔지니어
  value:
    - 낯선 도메인을 빠르게 구조화한다
    - 프론트엔드·백엔드·인프라를 하나의 결과로 연결한다
    - 구현 속도와 복잡도 통제를 함께 가져간다
strengths:
  - 빠른 학습과 구조화
  - end-to-end 구현 연결 능력
  - 재사용 가능한 자동화 선호
  - 과한 설계보다 실전적인 균형 추구
evidence_patterns:
  - 상황 → 판단 → 구현 → 결과
  - GitHub raw history를 해석된 evidence로 재작성
representative_examples:
  - Ansible 기반 인프라 자동화
  - AI 기반 프로젝트 부트스트랩
  - LangGraph agent 구조 설계
collaboration_style:
  - 문제를 먼저 구조화한 뒤 구현 방향을 정리한다
  - 빠른 시도와 운영 가능한 구조 사이 균형을 맞춘다
  - 재사용 가능한 패턴을 남긴다
market_perception:
  strength: 일반 개발자로 보이기 쉬우나 실제 강점은 AI leverage + 구조화 + end-to-end 연결
  bottleneck:
    - 포트폴리오
    - 자기설명
    - 신뢰 신호
public_boundaries:
  include:
    - 공개 가능한 포지셔닝
    - 협업 방식
    - evidence 패턴
    - 대표 사례 축
  exclude:
    - 내부 작업 로그
    - 세션 원문
    - 민감한 운영 맥락
source_of_truth:
  vault_topic: 03-topics/career-ontology.md
  vault_memory: 05-memory/portfolio-ontology.md
`
}

function buildMemo() {
  return `# Taek Career Memo

## 한 문장 소개
AI를 활용해 낯선 도메인의 문제를 빠르게 구조화하고, 프론트엔드·백엔드·인프라를 연결해 운영 가능한 결과로 만드는 엔지니어.

## 핵심 강점
- 빠른 학습과 구조화
- end-to-end 실행 능력
- 재사용 가능한 자동화와 운영 흐름 선호
- 속도와 복잡도 통제의 균형

## 어떻게 일하나
- 문제를 먼저 구조화한다
- 구현은 가능한 한 바로 검증 가능한 단위로 가져간다
- 프로젝트 설명은 상황 → 판단 → 구현 → 결과 프레임으로 정리한다

## 대표 evidence 축
- 인프라 자동화
- AI 기반 서비스/프로토타입 부트스트랩
- agent / workflow 구조 설계

## 현재 병목
- 구현 역량 자체보다 포트폴리오, 자기설명, 신뢰 신호 정리가 더 큰 병목

## 공개 원칙
- 공개본에는 자기설명, 협업 스타일, evidence 패턴만 남긴다
- 내부 세션 메모와 작업 기록은 Obsidian vault에서 별도로 관리한다
`
}

function buildReadableMarkdown() {
  return `# Career Ontology

이 문서는 내부 작업 메모를 그대로 공개하지 않고, 사람들에게 보여줄 자기설명 정보만 정제해서 정리한 공개용 버전입니다.

## Who I Am
저는 AI를 활용해 낯선 도메인의 문제를 빠르게 구조화하고, 프론트엔드·백엔드·인프라를 연결해 실제 동작하는 결과로 만드는 엔지니어입니다.

## How I Work
- 문제를 먼저 구조화합니다.
- 빠르게 구현하되, 운영 가능한 구조로 수렴시키는 것을 중요하게 봅니다.
- 과한 설계보다 실전적인 균형을 선호합니다.
- 한 번 푼 문제는 재사용 가능한 패턴으로 남기려 합니다.

## What I’m Good At
- 낯선 도메인 빠른 흡수
- end-to-end 구현 연결
- AI leverage를 활용한 초기 부트스트랩 가속
- 복잡도 통제와 구조화

## Evidence Pattern
프로젝트와 작업은 가능하면 아래 구조로 설명합니다.
1. 상황
2. 판단
3. 구현
4. 결과

## Representative Examples
- Ansible 기반 인프라 자동화
- AI 기반 프로젝트 부트스트랩
- LangGraph agent 구조 설계

## Collaboration Style
- 요구사항을 바로 코드로 옮기기보다 먼저 구조화합니다.
- 구현, 운영, 유지보수까지 이어지는 흐름을 함께 봅니다.
- 빠른 실행과 정확한 정리를 같이 가져가려 합니다.

## What I’m Looking For
- 빠른 성장과 다양한 경험을 얻을 수 있는 환경
- 단순 반복보다는 구조화와 문제 해결이 필요한 일
- 제품/시스템 전체 흐름에 기여할 수 있는 역할

## Public Boundary
이 문서에는 공개 가능한 포지셔닝, 협업 방식, evidence 축만 담았습니다. 내부 메모, 세션 기록, 작업용 해석 노트는 포함하지 않습니다.
`
}

async function main() {
  const topicRaw = await readVault(path.join('03-topics', 'career-ontology.md'))
  const memoryRaw = await readVault(path.join('05-memory', 'portfolio-ontology.md'))
  stripFrontmatter(topicRaw)
  stripFrontmatter(memoryRaw)

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'taek-career-ontology.yaml'), buildYaml(), 'utf8')
  await fs.writeFile(path.join(outputDir, 'taek-career-memo.md'), buildMemo(), 'utf8')
  await fs.writeFile(path.join(outputDir, 'taek-career-ontology.md'), buildReadableMarkdown(), 'utf8')

  console.log(`Exported curated notes from ${vaultRoot} to ${outputDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
