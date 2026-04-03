import { ArrowUpRight, Globe2, Mail, MapPin, RefreshCcw, Settings2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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

export function PublicPortfolioPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0b1120_38%,_#020617_100%)] text-slate-200">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-6 py-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:px-10">
        <aside className="top-6 h-fit lg:sticky">
          <Card className="overflow-hidden bg-slate-950/75">
            <CardHeader className="gap-5">
              <div className="flex items-center gap-4">
                <div className="flex size-20 items-center justify-center rounded-3xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(14,165,233,0.05))] text-2xl font-semibold text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  {profile.avatarLabel}
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-semibold tracking-tight text-white">{profile.name}</p>
                  <p className="text-sm text-cyan-200">{profile.role}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="size-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Badge className="w-fit" variant="default">
                  <Sparkles className="mr-1 size-3.5" />
                  Avatar-first portfolio
                </Badge>
                <CardDescription className="text-base text-slate-300">{profile.headline}</CardDescription>
                <p className="text-sm leading-6 text-slate-400">{profile.status}</p>
              </div>
              <nav className="grid gap-2 text-sm text-slate-400">
                <a href="#about" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">About</a>
                <a href="#projects" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">Featured Projects</a>
                <a href="#details" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">Project Details</a>
                <a href="#workflow" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">Content Workflow</a>
              </nav>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.heroTags.map((tag) => (
                  <Badge key={tag} variant="muted">{tag}</Badge>
                ))}
              </div>
              <Separator />
              <div className="flex flex-wrap gap-3">
                {profile.socials.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200">
                    {social.label === 'GitHub' ? <Globe2 className="size-4" /> : <Mail className="size-4" />}
                    {social.label}
                  </a>
                ))}
              </div>
              <Separator />
              <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-200">
                <Settings2 className="size-4" />
                관리자 페이지로 이동
              </Link>
            </CardContent>
          </Card>
        </aside>

        <main className="space-y-8 py-2">
          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <Card className="bg-slate-950/65">
              <CardHeader>
                <Badge className="w-fit" variant="muted">TypeScript · Vite · shadcn/ui</Badge>
                <CardTitle className="max-w-3xl text-4xl leading-tight md:text-5xl">
                  Markdown으로 소개를 관리하고 GitHub에서 최신 이력을 다시 불러오는 개발자 홈페이지
                </CardTitle>
                <CardDescription className="max-w-2xl text-base text-slate-300">
                  공개 페이지는 방문자에게 포트폴리오를 보여주고, 관리자 페이지는 GitHub 연결과 콘텐츠 수정 포인트를 관리하도록 분리했습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <a href="#workflow"><Button size="lg">운영 방식 보기</Button></a>
                <a href="#details"><Button variant="secondary" size="lg">프로젝트 상세 보기</Button></a>
                <Link to="/admin"><Button variant="ghost" size="lg">관리자 화면</Button></Link>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/65">
              <CardHeader>
                <CardTitle className="text-2xl">GitHub Sync Snapshot</CardTitle>
                <CardDescription>profile.md와 projects/*.md의 repo 정보를 바탕으로 최신 상태를 다시 가져옵니다.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Username</p>
                  <p className="mt-2 text-xl font-semibold text-white">{github.profile.username || profile.github || 'Set github in profile.md'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Last Sync</p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatDate(github.generatedAt ?? '')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Public Repos</p>
                  <p className="mt-2 text-xl font-semibold text-white">{github.profile.repos}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Sync Command</p>
                  <p className="mt-2 font-mono text-sm text-cyan-200">pnpm sync:github</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>이 영역은 src/content/site/profile.md 의 내용을 기반으로 렌더링됩니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white" dangerouslySetInnerHTML={{ __html: profile.aboutHtml }} />
              </CardContent>
            </Card>
          </section>

          <section id="projects" className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Featured</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">선별한 프로젝트</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">공개 페이지에서는 결과물과 스토리를 보여주고, 운영용 수정 포인트는 관리자 화면으로 분리했습니다.</p>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {projects.filter((project) => project.featured).map((project) => {
                const githubProject = github.projects[project.slug]
                return (
                  <Card key={project.slug} className="group transition hover:-translate-y-1 hover:border-cyan-300/30">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge>{project.status}</Badge>
                        <Badge variant="muted">{project.period}</Badge>
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className="text-slate-300">{project.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tag) => (
                          <Badge key={tag} variant="muted">{tag}</Badge>
                        ))}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Stars</p>
                          <p className="mt-2 text-lg font-semibold text-white">{githubProject?.stars ?? 0}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Forks</p>
                          <p className="mt-2 text-lg font-semibold text-white">{githubProject?.forks ?? 0}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Updated</p>
                          <p className="mt-2 text-sm font-semibold text-white">{formatDate(githubProject?.updatedAt ?? '')}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a href={`#${project.slug}`}><Button variant="secondary">상세 보기</Button></a>
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer"><Button variant="ghost">링크 열기 <ArrowUpRight className="size-4" /></Button></a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section id="details" className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Deep dive</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">프로젝트 상세와 커밋 타임라인</h2>
            </div>

            <div className="space-y-6">
              {projects.map((project) => {
                const githubProject = github.projects[project.slug]
                const commits = githubProject?.commits ?? []
                return (
                  <Card key={project.slug} id={project.slug} className="scroll-mt-24">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge>{project.status}</Badge>
                        <Badge variant="muted">{project.role}</Badge>
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className="text-slate-300">{project.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                      <div className="space-y-5">
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tag) => (
                            <Badge key={tag} variant="muted">{tag}</Badge>
                          ))}
                        </div>
                        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300" dangerouslySetInnerHTML={{ __html: project.bodyHtml }} />
                        <div className="flex flex-wrap gap-3">
                          <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer"><Button variant="secondary">Repository <Globe2 className="size-4" /></Button></a>
                          {githubProject?.homepage ? (
                            <a href={githubProject.homepage} target="_blank" rel="noreferrer"><Button variant="ghost">Homepage <ArrowUpRight className="size-4" /></Button></a>
                          ) : null}
                        </div>
                      </div>
                      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-white">Recent commit timeline</p>
                            <p className="text-sm text-slate-400">동기화된 최신 커밋 {commits.length}개</p>
                          </div>
                          <RefreshCcw className="size-4 text-cyan-200" />
                        </div>
                        <Separator />
                        {commits.length > 0 ? (
                          <div className="space-y-4">
                            {commits.map((commit) => (
                              <div key={commit.sha} className="relative pl-5 before:absolute before:left-1 before:top-2 before:h-full before:w-px before:bg-white/10 last:before:hidden">
                                <div className="absolute left-0 top-1.5 size-2 rounded-full bg-cyan-300" />
                                <a href={commit.url} target="_blank" rel="noreferrer" className="font-medium text-white transition hover:text-cyan-200">{commit.message}</a>
                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{commit.sha.slice(0, 7)} · {formatDate(commit.date)}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                            아직 동기화된 GitHub 커밋이 없습니다. 관리자 화면에서 repo 값을 설정한 뒤 `pnpm sync:github`를 실행하세요.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section id="workflow">
            <Card>
              <CardHeader>
                <CardTitle>Content-first workflow</CardTitle>
                <CardDescription>소개와 프로젝트 설명은 Markdown, GitHub 메타데이터는 동기화 스크립트로 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300" dangerouslySetInnerHTML={{ __html: profile.workflowHtml }} />
                <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/5 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Quick edit points</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    <li><span className="font-semibold text-white">소개 수정</span> — src/content/site/profile.md</li>
                    <li><span className="font-semibold text-white">프로젝트 추가</span> — src/content/projects/*.md</li>
                    <li><span className="font-semibold text-white">GitHub 재동기화</span> — pnpm sync:github</li>
                    <li><span className="font-semibold text-white">타입스크립트 기본</span> — 전체 앱/스크립트는 TS 중심 구조를 유지</li>
                    <li><span className="font-semibold text-white">운영 화면 분리</span> — /admin 경로에서 설정 흐름 확인</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
