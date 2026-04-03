import { ExternalLink, FilePenLine, FolderGit2, RefreshCcw, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getGitHubData, getProfileContent, getProjects } from '@/lib/content'

const profile = getProfileContent()
const projects = getProjects()
const github = getGitHubData()

function formatDate(date: string) {
  if (!date) return 'Not synced yet'
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="default"><ShieldCheck className="mr-1 size-3.5" />Admin</Badge>
              <Badge variant="muted">운영/설정 전용 화면</Badge>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">포트폴리오 관리자 페이지</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              방문자용 공개 페이지와 분리된 운영 화면입니다. 여기서는 무엇을 수정해야 하는지, GitHub 정보를 어떻게 다시 불러오는지, 어떤 repo가 연결됐는지를 한 번에 확인할 수 있습니다.
            </p>
          </div>
          <Link to="/"><Button variant="secondary">공개 페이지로 돌아가기</Button></Link>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">GitHub 계정</CardTitle>
              <CardDescription>profile.md의 github 값을 기준으로 동기화합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              <p><span className="text-slate-500">현재 값</span> {profile.github}</p>
              <p><span className="text-slate-500">동기화된 사용자</span> {github.profile.username || '미동기화'}</p>
              <p><span className="text-slate-500">마지막 동기화</span> {formatDate(github.generatedAt ?? '')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">콘텐츠 파일</CardTitle>
              <CardDescription>관리자가 직접 수정할 파일 위치입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs text-cyan-200">
              <p>src/content/site/profile.md</p>
              <p>src/content/projects/*.md</p>
              <p>src/data/generated/github-data.json</p>
              <p>scripts/sync-github.mjs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">운영 명령</CardTitle>
              <CardDescription>설정/동기화/확인에 쓰는 기본 명령입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 font-mono text-xs text-cyan-200">
              <p>pnpm sync:github</p>
              <p>pnpm dev</p>
              <p>pnpm build</p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>운영 플로우</CardTitle>
              <CardDescription>GitHub 정보를 다시 불러와 설정하거나 프로젝트를 추가하는 절차입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">1. GitHub 사용자명 설정</p>
                <p>src/content/site/profile.md 에서 github 값을 실제 사용자명으로 수정합니다.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">2. 프로젝트 repo 추가</p>
                <p>src/content/projects/*.md 의 frontmatter 에 repo: owner/repo 값을 추가하거나 수정합니다.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">3. GitHub 재동기화</p>
                <p>터미널에서 pnpm sync:github 을 실행하면 프로필, repo 메타데이터, 최근 커밋이 다시 생성됩니다.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">4. 결과 확인</p>
                <p>공개 페이지(/)에서 프로젝트 카드, 상세 설명, 커밋 타임라인이 반영됐는지 확인합니다.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>연결된 프로젝트</CardTitle>
              <CardDescription>repo 값을 기준으로 동기화 대상과 상태를 확인합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => {
                const synced = github.projects[project.slug]
                return (
                  <div key={project.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{project.title}</Badge>
                      <Badge variant="muted">{synced ? 'Synced' : 'Pending'}</Badge>
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-slate-300">
                      <p><span className="text-slate-500">slug</span> {project.slug}</p>
                      <p><span className="text-slate-500">repo</span> {project.repo}</p>
                      <p><span className="text-slate-500">updated</span> {formatDate(synced?.updatedAt ?? '')}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer"><Button variant="ghost" size="sm">저장소 열기 <ExternalLink className="size-4" /></Button></a>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FilePenLine className="size-5" />수정 포인트</CardTitle>
              <CardDescription>실제 관리자 인터랙션을 붙이기 전에도 어떤 파일을 바꿔야 하는지 명확히 보입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                <li>프로필 문구, 아바타 라벨, 소셜 링크: profile.md</li>
                <li>프로젝트 추가/삭제/정렬/설명: projects/*.md</li>
                <li>repo 연결 후 동기화 결과 반영: github-data.json</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FolderGit2 className="size-5" />다음 확장 포인트</CardTitle>
              <CardDescription>원하면 여기서 진짜 관리 기능으로 확장할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                <li>폼 기반으로 profile.md / project.md 생성·수정</li>
                <li>버튼 클릭으로 sync API 실행</li>
                <li>간단한 비밀번호 또는 GitHub OAuth 보호</li>
                <li>배포 환경에서 /admin 접근 제한</li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-sm text-cyan-200">
                <RefreshCcw className="size-4" />
                현재는 운영 정보와 워크플로우를 분리한 1단계 구조입니다.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
