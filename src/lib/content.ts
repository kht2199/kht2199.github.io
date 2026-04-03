import { marked } from 'marked'
import githubData from '@/data/generated/github-data.json'

export interface SocialLink {
  label: string
  url: string
}

export interface ProfileContent {
  name: string
  headline: string
  role: string
  location: string
  github: string
  email: string
  resumeUrl: string
  avatarLabel: string
  status: string
  focus: string
  heroTags: string[]
  socials: SocialLink[]
  aboutHtml: string
  strengthsHtml: string
  collaborationHtml: string
  workflowHtml: string
  rawMarkdown: string
}

export interface ProjectContent {
  slug: string
  title: string
  summary: string
  repo: string
  featured: boolean
  order: number
  status: string
  period: string
  role: string
  stack: string[]
  liveUrl: string
  bodyHtml: string
}

export interface CommitEntry {
  sha: string
  message: string
  date: string
  url: string
}

export interface ProjectGitHubData {
  repo: string
  description: string
  stars: number
  forks: number
  updatedAt: string
  homepage: string
  commits: CommitEntry[]
}

interface GitHubDataShape {
  generatedAt: string | null
  profile: {
    username: string
    repos: number
    followers: number
    following: number
    htmlUrl: string
  }
  projects: Record<string, ProjectGitHubData>
}

const rawProfile = Object.values(
  import.meta.glob('../content/site/profile.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
)[0] as string

const rawProjects = Object.entries(
  import.meta.glob('../content/projects/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
) as Array<[string, string]>

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  if (!raw.startsWith('---')) {
    return { data: {}, body: raw }
  }

  const parts = raw.split('---')
  const [, frontmatter, ...rest] = parts
  const body = rest.join('---').trim()
  const data: Record<string, string> = {}
  let currentArrayKey = ''

  for (const line of frontmatter.split('\n')) {
    if (!line.trim()) continue

    const arrayItem = line.match(/^\s*-\s+label:\s*(.+)$/)
    if (arrayItem && currentArrayKey === 'socials') {
      data.__social_labels = [data.__social_labels, arrayItem[1].trim()].filter(Boolean).join('|')
      continue
    }

    const urlItem = line.match(/^\s+url:\s*(.+)$/)
    if (urlItem && currentArrayKey === 'socials') {
      data.__social_urls = [data.__social_urls, urlItem[1].trim()].filter(Boolean).join('|')
      continue
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!match) continue
    const [, key, value] = match
    currentArrayKey = key
    data[key] = value.trim()
  }

  return { data, body }
}

function splitCsv(value: string | undefined): string[] {
  if (!value) return []
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

function extractSection(markdown: string, heading: string): string {
  const marker = `## ${heading}`
  const start = markdown.indexOf(marker)

  if (start === -1) {
    return ''
  }

  const rest = markdown.slice(start)
  const nextHeading = rest.indexOf('\n## ', marker.length)

  return nextHeading === -1 ? rest.trim() : rest.slice(0, nextHeading).trim()
}

function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { breaks: true }) as string
}

function buildSocials(data: Record<string, string>): SocialLink[] {
  const labels = (data.__social_labels ?? '').split('|').filter(Boolean)
  const urls = (data.__social_urls ?? '').split('|').filter(Boolean)
  return labels.map((label, index) => ({ label, url: urls[index] ?? '#' }))
}

export function getProfileContent(): ProfileContent {
  const { data, body } = parseFrontmatter(rawProfile)

  return {
    name: data.name ?? 'Your Name',
    headline: data.headline ?? '',
    role: data.role ?? '',
    location: data.location ?? '',
    github: data.github ?? '',
    email: data.email ?? '',
    resumeUrl: data.resumeUrl ?? '#',
    avatarLabel: data.avatarLabel ?? 'AV',
    status: data.status ?? '',
    focus: data.focus ?? '',
    heroTags: splitCsv(data.heroTags),
    socials: buildSocials(data),
    aboutHtml: markdownToHtml(extractSection(body, 'About') || body),
    strengthsHtml: markdownToHtml(extractSection(body, 'Strengths')),
    collaborationHtml: markdownToHtml(extractSection(body, 'Collaboration')),
    workflowHtml: markdownToHtml(extractSection(body, 'Career Snapshot')),
    rawMarkdown: body,
  }
}

export function getProjects(): ProjectContent[] {
  return rawProjects
    .map(([path, raw]) => {
      const { data, body } = parseFrontmatter(raw)
      const slug = path.split('/').pop()?.replace('.md', '') ?? crypto.randomUUID()
      return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? '',
        repo: data.repo ?? '',
        featured: data.featured === 'true',
        order: Number(data.order ?? 999),
        status: data.status ?? '',
        period: data.period ?? '',
        role: data.role ?? '',
        stack: splitCsv(data.stack),
        liveUrl: data.liveUrl ?? '',
        bodyHtml: markdownToHtml(body),
      }
    })
    .sort((left, right) => left.order - right.order)
}

export function getProjectBySlug(slug: string): ProjectContent | undefined {
  return getProjects().find((project) => project.slug === slug)
}

export function getGitHubData(): GitHubDataShape {
  return githubData as GitHubDataShape
}
