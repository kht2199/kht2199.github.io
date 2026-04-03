import { ArrowLeft, Globe2, RefreshCcw } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getGitHubData, getProjectBySlug } from '@/lib/content'

const github = getGitHubData()

function formatDate(date: string) {
  if (!date) return '업데이트 전'
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
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
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Project Detail</p>
              <CardTitle className="text-4xl leading-tight text-white">{project.title}</CardTitle>
              <CardDescription className="max-w-3xl text-base text-slate-300">{project.summary}</CardDescription>
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
                <CardDescription>메인 페이지에서 보지 못한 보조 정보를 빠르게 확인할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Repository</p>
                  <p className="mt-2 break-all text-white">{project.repo}</p>
                  <p className="mt-2 text-xs text-slate-400">대부분의 프로젝트는 별도 서비스 링크 없이 저장소 중심으로 정리했습니다.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">최근 업데이트</p>
                  <p className="mt-2 text-white">{formatDate(githubProject?.updatedAt ?? '')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">참고</p>
                  <p className="mt-2 text-white">서비스 데모보다는 프로젝트 맥락과 구현 내용을 중심으로 정리했습니다.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/70">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>최근 커밋 타임라인</CardTitle>
                    <CardDescription>동기화된 GitHub 커밋 {commits.length}개를 표시합니다.</CardDescription>
                  </div>
                  <RefreshCcw className="size-4 text-cyan-200" />
                </div>
              </CardHeader>
              <CardContent>
                <Separator />
                {commits.length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {commits.map((commit) => (
                      <div key={commit.sha} className="relative pl-5 before:absolute before:left-1 before:top-2 before:h-full before:w-px before:bg-white/10 last:before:hidden">
                        <div className="absolute left-0 top-1.5 size-2 rounded-full bg-cyan-300" />
                        <a href={commit.url} target="_blank" rel="noreferrer" className="font-medium text-white transition hover:text-cyan-200">{commit.message}</a>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{commit.sha.slice(0, 7)} · {formatDate(commit.date)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                    아직 동기화된 GitHub 커밋이 없습니다. 프로젝트 repo 설정을 확인한 뒤 pnpm sync:github를 실행하면 최신 기록을 불러올 수 있습니다.
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
