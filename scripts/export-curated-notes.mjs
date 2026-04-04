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

function indentBlock(text, spaces = 4) {
  const prefix = ' '.repeat(spaces)
  return text.split('\n').map((line) => `${prefix}${line}`).join('\n')
}

function buildYaml(topicBody, memoryBody) {
  return `identity:
  summary: AI를 활용해 낯선 도메인의 문제를 빠르게 구조화하고 구현까지 연결하는 실전형 엔지니어
  role: AI-Augmented Full-stack Engineer
drivers:
  growth_vs_profit: {growth: 60, profit: 40}
  priorities:
    - 빠른 성장
    - 다양한 경험
    - 실전 문제 해결
preferences:
  likes:
    - 구조화
    - 정확성
    - 효율적인 패턴 선택
    - 재사용 가능한 자동화
  dislikes:
    - UI 미세 수정 위주의 일
    - 과한 아키텍처
capabilities:
  - 낯선 도메인 빠른 흡수
  - 프론트엔드/백엔드/인프라 end-to-end 연결
  - AI leverage 기반 초기 부트스트랩 가속
  - 운영 가능한 구조로 복잡도 통제
evidence:
  - title: Ansible 기반 인프라 자동화
    pattern: 상황-판단-구현-결과
  - title: AI 기반 프로젝트 부트스트랩
    pattern: SSE/WebSocket/Swagger/React hook/MSW 구성
  - title: LangGraph agent 구조 설계
    pattern: supervisor-agent, tool/API 연결, UI 스트리밍 상태 설계
market_perception:
  strength: 일반 개발자로 보이기 쉬우나 실제 강점은 AI leverage + 구조화 + end-to-end 연결
  bottleneck:
    - 포트폴리오
    - 자기설명
    - 신뢰 신호
portfolio_rules:
  - 기술 나열보다 문제-판단-구현-결과 구조를 우선한다
  - GitHub raw history를 해석된 evidence로 재작성한다
  - AMOS 관련 프로젝트를 중심 축으로 배치한다
decision_rules:
  - 구조화가 되는 문제를 선호한다
  - 복잡도 통제가 가능한 방향을 우선한다
  - 단발 구현보다 재사용 가능한 흐름을 만든다
next_actions:
  - 주요 프로젝트를 evidence 카드로 재작성
  - 자기설명 문구와 신뢰 신호를 계속 보강
source_of_truth:
  vault_topic: 03-topics/career-ontology.md
  vault_memory: 05-memory/portfolio-ontology.md
notes:
  topic_excerpt: |
${indentBlock(topicBody)}
  memory_excerpt: |
${indentBlock(memoryBody)}
`
}

function buildMemo(topicBody, memoryBody) {
  return `# Taek Career Memo

## 해석
Taek은 AI를 활용해 낯선 도메인의 문제를 빠르게 구조화하고, 구현과 운영까지 연결하는 실전형 엔지니어에 가깝다. 단순히 여러 스택을 다룬다기보다, 제품 흐름 전체를 보고 병목을 제거하는 쪽에서 강점이 드러난다.

## 강점
- 빠른 학습과 구조화
- 프론트엔드/백엔드/인프라를 한 흐름으로 연결
- 재사용 가능한 자동화와 운영 구조 선호
- 과한 설계보다 실전적인 균형 추구

## 병목
- 실력 자체보다 포트폴리오와 자기설명, 신뢰 신호 부족
- GitHub 이력은 많지만 해석된 evidence 문서가 부족

## 설명 프레임
프로젝트는 가능하면 아래 구조로 설명한다.
1. 상황
2. 판단
3. 구현
4. 결과

## 공개/비공개 운영
- 공개 사이트: 선별된 ontology/evidence notes
- 내부 Obsidian vault: session/memory/brief를 포함한 전체 작업 기억

## Vault topic excerpt
${topicBody}

## Vault memory excerpt
${memoryBody}
`
}

function buildReadableMarkdown(topicBody, memoryBody) {
  return `# Career Ontology

이 페이지는 내부 Obsidian vault에서 관리하는 온톨로지/메모를 바탕으로 만든 공개용 요약본입니다.

## Core Positioning
- AI를 활용해 낯선 도메인의 문제를 빠르게 구조화하고 구현까지 연결하는 실전형 엔지니어
- 프론트엔드·백엔드·인프라를 하나의 흐름으로 연결해 운영 가능한 결과로 수렴
- 빠른 구현만이 아니라 정확성, 구조화, 복잡도 통제를 함께 중시

## Drivers
- 성장 60 / 수익 40
- 빠른 성장과 다양한 경험 우선
- 실전 문제 해결 중심

## Evidence Pattern
프로젝트와 작업 기록은 가능하면 아래 구조로 설명합니다.
1. 상황
2. 판단
3. 구현
4. 결과

## Evidence Examples
- Ansible 기반 인프라 자동화
- AI 기반 프로젝트 부트스트랩 (SSE/WebSocket/Swagger/React hook/MSW)
- LangGraph agent 구조 설계

## Market Perception
- 시장에서는 일반 개발자로 보이기 쉬우나 실제 강점은 AI leverage + 구조화 + end-to-end 연결 능력
- 현재 병목은 구현 역량 부족보다 포트폴리오, 자기설명, 신뢰 신호 정리 부족에 가까움

## Public / Private Split
- 공개 사이트: 선별된 ontology/evidence notes
- 내부 Obsidian vault: session/memory/brief를 포함한 전체 작업 기억

## Vault Topic Excerpt
${topicBody}

## Vault Memory Excerpt
${memoryBody}
`
}

async function main() {
  const topicRaw = await readVault(path.join('03-topics', 'career-ontology.md'))
  const memoryRaw = await readVault(path.join('05-memory', 'portfolio-ontology.md'))
  const topicBody = stripFrontmatter(topicRaw)
  const memoryBody = stripFrontmatter(memoryRaw)

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'taek-career-ontology.yaml'), buildYaml(topicBody, memoryBody), 'utf8')
  await fs.writeFile(path.join(outputDir, 'taek-career-memo.md'), buildMemo(topicBody, memoryBody), 'utf8')
  await fs.writeFile(path.join(outputDir, 'taek-career-ontology.md'), buildReadableMarkdown(topicBody, memoryBody), 'utf8')

  console.log(`Exported curated notes from ${vaultRoot} to ${outputDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
