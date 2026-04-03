import { ArrowLeft, Globe2, RefreshCcw } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getGitHubData, getProjectBySlug } from '@/lib/content'

const github = getGitHubData()

const commitTypeLabel: Record<string, string> = {
  feat: '기능',
  fix: '수정',
  refactor: '개선',
  chore: '정리',
  test: '테스트',
  docs: '문서',
}

const commitSummaryMap: Record<string, string> = {
  'migrate agents to langchain.agents.create_agent and fix test mocking': '에이전트 구현을 최신 LangChain 방식으로 전환하고 테스트 mocking 문제를 정리했습니다.',
  'isolate tests from external services and remove sensitive data exposure': '테스트를 외부 서비스와 분리하고 민감 정보 노출 가능성을 줄였습니다.',
  'read LLM_BASE_URL from env instead of hardcoding in tests': '테스트에서 LLM_BASE_URL을 하드코딩하지 않고 환경변수로 읽도록 변경했습니다.',
  'add venv/ to .gitignore': '가상환경 디렉터리인 venv/가 Git에 포함되지 않도록 정리했습니다.',
  'resolve LLM model from server at runtime, fail fast if unavailable': '실행 시 서버에서 사용할 LLM 모델을 확인하고, 사용할 수 없으면 즉시 실패하도록 개선했습니다.',
  'use Python 3.11 compatible deps and remove load_dotenv from config': 'Python 3.11 기준으로 의존성을 맞추고 config에서 불필요한 dotenv 로딩을 제거했습니다.',
  'update requirements to match actual installed versions (Python 3.11)': '실제 실행 환경에 맞게 requirements 버전을 다시 정리했습니다.',
  'merge jenkins-jobs/templates into roles/jenkins/templates': 'Jenkins job 템플릿 위치를 역할 기준 구조로 통합해 관리 경로를 단순화했습니다.',
  'remove jenkins-jobs unused files and update README': '사용하지 않는 Jenkins 관련 파일을 제거하고 README 설명을 현재 구조에 맞게 정리했습니다.',
  'update LFS tracking paths for binary files moved to files/': '바이너리 파일 이동에 맞춰 Git LFS 추적 경로를 수정했습니다.',
  'add HTTP health check and journalctl log output in deploy_app.sh': '앱 배포 스크립트에 헬스체크와 배포 로그 출력을 추가해 배포 확인을 쉽게 했습니다.',
  'move grafana/loki/promtail binary files to top-level files/': '모니터링 관련 바이너리 파일을 공통 files 디렉터리로 옮겨 구조를 단순화했습니다.',
  'add venv creation and pip install from packages dir in deploy_llm.sh': 'LLM 배포 스크립트에 가상환경 생성과 패키지 설치 단계를 추가했습니다.',
}

function formatDate(date: string) {
  if (!date) return '업데이트 전'
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

function summarizeCommitMessage(message: string) {
  const firstLine = message
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean) ?? ''

  const match = firstLine.match(/^(feat|fix|refactor|chore|test|docs):\s*(.+)$/i)
  const type = match?.[1].toLowerCase() ?? ''
  const rawSummary = match?.[2] ?? firstLine
  const normalized = rawSummary.trim()

  const summary = commitSummaryMap[normalized]
    ?? normalized
      .replace(/LLM_BASE_URL/g, 'LLM_BASE_URL')
      .replace(/README/g, 'README')
      .replace(/GitHub/gi, 'GitHub')

  return {
    label: commitTypeLabel[type] ?? '변경',
    summary: summary.endsWith('.') ? summary : `${summary}.`,
  }
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const githubProject = github.projects[project.slug]
  const commits = githubProject?.commits ?? []

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0b1120_38%,_#020617_100%)] px-6 py-8 text-slate-200 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/"><Button variant="ghost"><ArrowLeft className="size-4" /> 메인으로 돌아가기</Button></Link>
          <div className="flex flex-wrap gap-3">
            <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer"><Button variant="secondary">Repository <Globe2 className="size-4" /></Button></a>
          </div>
        </div>

        <Card className="bg-slate-950/70">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{project.status}</Badge>
              <Badge variant="muted">{project.period}</Badge>
              <Badge variant="muted">{project.role}</Badge>
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">프로젝트 상세</p>
              <CardTitle className="text-4xl leading-tight text-white">{project.title}</CardTitle>
              <CardDescription className="max-w-3xl text-base text-slate-300">프로젝트의 맥락과 주요 변경 내용을 한눈에 볼 수 있게 정리했습니다.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag) => (
                <Badge key={tag} variant="muted">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 소개</CardTitle>
              <CardDescription>프로젝트의 목적, 담당 역할, 주요 기여를 정리했습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300" dangerouslySetInnerHTML={{ __html: project.bodyHtml }} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>프로젝트 메모</CardTitle>
                <CardDescription>핵심 정보만 짧게 확인할 수 있도록 정리했습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">저장소</p>
                  <p className="mt-2 break-all text-white">{project.repo}</p>
                  <p className="mt-2 text-xs text-slate-400">상세 구현 내용은 저장소와 변경 이력 중심으로 확인할 수 있게 구성했습니다.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">최근 업데이트</p>
                  <p className="mt-2 text-white">{formatDate(githubProject?.updatedAt ?? '')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">요약 방식</p>
                  <p className="mt-2 text-white">커밋 원문 전체 대신, 실제 수정 내용을 한국어로 짧게 요약해 모두 보여줍니다.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/70">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>수정 내용 요약</CardTitle>
                    <CardDescription>최근 변경 이력을 한국어로 짧게 정리해 전체 흐름이 보이도록 구성했습니다. 총 {commits.length}건</CardDescription>
                  </div>
                  <RefreshCcw className="size-4 text-cyan-200" />
                </div>
              </CardHeader>
              <CardContent>
                <Separator />
                {commits.length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {commits.map((commit) => {
                      const summary = summarizeCommitMessage(commit.message)

                      return (
                        <div key={commit.sha} className="relative pl-5 before:absolute before:left-1 before:top-2 before:h-full before:w-px before:bg-white/10 last:before:hidden">
                          <div className="absolute left-0 top-1.5 size-2 rounded-full bg-cyan-300" />
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="muted">{summary.label}</Badge>
                            <p className="text-xs tracking-[0.12em] text-slate-500">{formatDate(commit.date)} · {commit.sha.slice(0, 7)}</p>
                          </div>
                          <a href={commit.url} target="_blank" rel="noreferrer" className="mt-2 block font-medium leading-6 text-white transition hover:text-cyan-200">{summary.summary}</a>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                    아직 동기화된 GitHub 변경 이력이 없습니다. 프로젝트 저장소 설정을 확인한 뒤 pnpm sync:github를 실행하면 최신 내용을 불러올 수 있습니다.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
