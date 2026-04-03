import { ArrowUpRight, BriefcaseBusiness, Globe2, Mail, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { openSourceContributions } from '@/data/open-source-contributions'
import { getGitHubData, getProfileContent, getProjects } from '@/lib/content'

const profile = getProfileContent()
const projects = getProjects()
const github = getGitHubData()

function formatDate(date: string) {
  if (!date) return '업데이트 전'
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function PublicPortfolioPage() {
  const featuredProjects = projects.filter((project) => project.featured)

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
                  Developer Portfolio
                </Badge>
                <CardDescription className="text-base text-slate-300">{profile.headline}</CardDescription>
                <p className="text-sm leading-6 text-slate-400">{profile.status}</p>
              </div>
              <nav className="grid gap-2 text-sm text-slate-400">
                <a href="#about" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">소개</a>
                <a href="#projects" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">프로젝트</a>
                <a href="#oss" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">오픈소스</a>
                <a href="#workflow" className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">경력 요약</a>
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
            </CardContent>
          </Card>
        </aside>

        <main className="space-y-8 py-2">
          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <Card className="bg-slate-950/65">
              <CardHeader>
                <Badge className="w-fit" variant="muted">Frontend · Backend · Product Engineering</Badge>
                <CardTitle className="max-w-3xl text-4xl leading-tight md:text-5xl">
                  서비스의 흐름을 이해하고, 구현부터 운영까지 이어서 만드는 개발자
                </CardTitle>
                <CardDescription className="max-w-2xl text-base text-slate-300">
                  AMOS 관련 프로젝트를 중심으로 사용자 경험, 백엔드 연동, 운영 자동화, 오픈소스 기여까지 이어온 작업을 정리했습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <a href="#projects"><Button size="lg">프로젝트 보기</Button></a>
                <a href="#workflow"><Button variant="secondary" size="lg">경력 요약 보기</Button></a>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/65">
              <CardHeader>
                <CardTitle className="text-2xl">한눈에 보는 요약</CardTitle>
                <CardDescription>현재 GitHub 활동과 포트폴리오 기준 정보를 함께 보여줍니다.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">GitHub</p>
                  <p className="mt-2 text-xl font-semibold text-white">{github.profile.username || profile.github || 'github 계정 설정 필요'}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Latest Update</p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatDate(github.generatedAt ?? '')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Projects</p>
                  <p className="mt-2 text-xl font-semibold text-white">{projects.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Open Source</p>
                  <p className="mt-2 text-sm font-medium text-cyan-200">이슈 재현 · PR 제안 · 문서 개선</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="about" className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardTitle>소개</CardTitle>
                <CardDescription>어떤 기준으로 제품을 만들고 협업하는지 정리했습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white" dangerouslySetInnerHTML={{ __html: profile.aboutHtml }} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>강점</CardTitle>
                <CardDescription>실무에서 자주 맡아온 역할과 강점을 담았습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white" dangerouslySetInnerHTML={{ __html: profile.strengthsHtml }} />
              </CardContent>
            </Card>
          </section>

          <section id="projects" className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Projects</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">주요 프로젝트</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">메인 화면에서는 프로젝트의 맥락과 역할을 빠르게 확인하고, 상세 내용은 개별 페이지에서 볼 수 있도록 구성했습니다.</p>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {featuredProjects.map((project) => {
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
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                        <p><span className="text-slate-500">역할</span> {project.role}</p>
                        <p className="mt-2"><span className="text-slate-500">정리 방식</span> 프로젝트 소개와 저장소 링크 중심으로 구성했습니다.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/projects/${project.slug}`}><Button variant="secondary">상세 페이지 보기</Button></Link>
                        <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer"><Button variant="ghost">저장소 보기 <ArrowUpRight className="size-4" /></Button></a>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section id="oss" className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Open Source</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">오픈소스 기여</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">문제를 재현하고, 원인을 정리하고, 수정 제안까지 이어간 기록을 모았습니다.</p>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              {openSourceContributions.map((item) => (
                <Card key={item.url} className="transition hover:border-cyan-300/30">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{item.type}</Badge>
                      <Badge variant="muted">{item.repo}</Badge>
                      <Badge variant="muted">{item.state}</Badge>
                    </div>
                    <CardTitle className="text-xl leading-snug">{item.title}</CardTitle>
                    <CardDescription className="text-slate-300">{item.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-400">{item.date}</div>
                    <a href={item.url} target="_blank" rel="noreferrer"><Button variant="secondary">GitHub에서 보기 <ArrowUpRight className="size-4" /></Button></a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="workflow">
            <Card>
              <CardHeader>
                <CardTitle>경력 요약</CardTitle>
                <CardDescription>프로젝트 경험과 협업 방식, 일하는 기준을 짧게 정리했습니다.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
                <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300" dangerouslySetInnerHTML={{ __html: profile.workflowHtml }} />
                <div className="space-y-4">
                  <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">Collaboration</p>
                    <div className="mt-4 prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300" dangerouslySetInnerHTML={{ __html: profile.collaborationHtml }} />
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Highlights</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                      <li className="flex gap-3"><BriefcaseBusiness className="mt-1 size-4 shrink-0 text-cyan-200" />AMOS 관련 프로젝트를 중심으로 제품 흐름 전반을 다뤄온 경험</li>
                      <li className="flex gap-3"><BriefcaseBusiness className="mt-1 size-4 shrink-0 text-cyan-200" />프론트엔드, 백엔드 연동, 운영 자동화를 함께 보는 풀스택 관점</li>
                      <li className="flex gap-3"><BriefcaseBusiness className="mt-1 size-4 shrink-0 text-cyan-200" />이슈 제보와 PR 기여를 통해 문제 해결 과정을 바깥으로도 확장한 경험</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
