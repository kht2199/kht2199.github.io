export function decodeGitHubReadme(content = '') {
  if (!content) return ''
  const normalized = String(content).replace(/\n/g, '')
  return Buffer.from(normalized, 'base64').toString('utf8')
}

export function extractReadmeSections(markdown = '') {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n')
  const sections = []
  let current = null

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/)

    if (headingMatch) {
      if (current) {
        current.body = current.body.trim()
        sections.push(current)
      }

      current = {
        heading: headingMatch[2].trim(),
        body: '',
      }
      continue
    }

    if (!current) {
      continue
    }

    current.body = `${current.body}${current.body ? '\n' : ''}${line}`
  }

  if (current) {
    current.body = current.body.trim()
    sections.push(current)
  }

  return sections.filter((section) => section.heading)
}

function firstSentence(text = '') {
  const normalized = String(text).replace(/\s+/g, ' ').trim()
  if (!normalized) return ''
  const match = normalized.match(/^(.+?[.!?])(?:\s|$)/)
  return (match ? match[1] : normalized).trim()
}

function pickOverviewSection(sections) {
  const preferredHeading = sections.find((section) => /^(overview|about|introduction|intro|summary)$/i.test(section.heading))
  if (preferredHeading?.body) return preferredHeading

  const titleSection = sections[0]
  if (titleSection?.body) return titleSection

  return sections.find((section) => section.body) ?? { heading: '', body: '' }
}

function collectHighlights(sections) {
  const preferred = sections.find((section) => /^(features|highlights|key features|what it does)$/i.test(section.heading))
  const source = preferred?.body ?? ''

  return source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)
    .slice(0, 4)
}

export function summarizeReadme(markdown = '') {
  const sections = extractReadmeSections(markdown)
  const overview = pickOverviewSection(sections)

  return {
    title: overview.heading || '',
    summary: firstSentence(overview.body),
    highlights: collectHighlights(sections),
    sections,
  }
}
