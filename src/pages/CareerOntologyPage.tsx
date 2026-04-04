import { ArrowLeft, ArrowUpRight, FileText, Globe2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { marked } from 'marked'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CareerOntologyPage() {
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}notes/taek-career-ontology.md`)
        if (!response.ok) throw new Error('공개용 ontology markdown을 불러오지 못했습니다.')
        const markdown = await response.text()
        const rendered = marked.parse(markdown, { breaks: true }) as string
        setHtml(rendered)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0b1120_38%,_#020617_100%)] text-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link to="/"><Button variant="secondary"><ArrowLeft className="size-4" />메인으로</Button></Link>
          <a href={`${import.meta.env.BASE_URL}notes/taek-career-ontology.yaml`} target="_blank" rel="noreferrer"><Button variant="ghost"><FileText className="size-4" />YAML 원본</Button></a>
          <a href={`${import.meta.env.BASE_URL}notes/taek-career-memo.md`} target="_blank" rel="noreferrer"><Button variant="ghost"><FileText className="size-4" />Memo 원본</Button></a>
          <a href="https://github.com/kht2199/obsidian-memory-vault" target="_blank" rel="noreferrer"><Button variant="ghost"><Globe2 className="size-4" />큐레이션 Vault</Button></a>
        </div>

        <Card className="bg-slate-950/70">
          <CardHeader>
            <Badge className="w-fit" variant="muted">Public Notes</Badge>
            <CardTitle className="text-4xl leading-tight">커리어 온톨로지</CardTitle>
            <CardDescription className="text-base text-slate-300">내부 Obsidian vault를 source of truth로 두고, 공개 가능한 부분만 웹에서 읽기 좋게 노출한 페이지입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? <p className="text-slate-400">노트를 불러오는 중...</p> : null}
            {error ? <p className="text-red-300">{error}</p> : null}
            {!loading && !error ? (
              <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-code:text-cyan-200" dangerouslySetInnerHTML={{ __html: html }} />
            ) : null}
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">무엇을 보여주나</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-300">핵심 포지셔닝, evidence 패턴, 시장 인식, 공개/비공개 운영 원칙을 요약해서 보여줍니다.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">왜 분리하나</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-300">웹에는 공개 가능한 해석본만 두고, 세션/메모/브리프를 포함한 전체 작업 기억은 vault에서 계속 관리합니다.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">원본 접근</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-300">
              원본 markdown/YAML과 큐레이션 repo 링크를 함께 제공해 읽기 좋은 버전과 raw version을 모두 볼 수 있습니다.
              <div className="mt-3"><a href={`${import.meta.env.BASE_URL}notes/taek-career-ontology.md`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-100">Markdown 원본 열기 <ArrowUpRight className="size-4" /></a></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
