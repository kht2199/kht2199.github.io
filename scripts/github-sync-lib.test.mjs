import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildReadmeFrontmatter,
  decodeGitHubReadme,
  formatSyncedReadme,
} from './github-sync-lib.mjs'

test('decodeGitHubReadme decodes base64 README payloads', () => {
  const encoded = Buffer.from('# Hello\n\nWorld', 'utf8').toString('base64')
  assert.equal(decodeGitHubReadme(encoded), '# Hello\n\nWorld')
})

test('buildReadmeFrontmatter serializes repo metadata as markdown frontmatter', () => {
  assert.equal(
    buildReadmeFrontmatter({
      repo: 'acme/demo',
      sourceUrl: 'https://github.com/acme/demo#readme',
      syncedAt: '2026-04-03T03:10:00.000Z',
    }),
    ['---', 'repo: acme/demo', 'sourceUrl: https://github.com/acme/demo#readme', 'syncedAt: 2026-04-03T03:10:00.000Z', '---'].join('\n'),
  )
})

test('formatSyncedReadme wraps README markdown with sync metadata frontmatter', () => {
  const markdown = formatSyncedReadme({
    repo: 'acme/demo',
    sourceUrl: 'https://github.com/acme/demo#readme',
    syncedAt: '2026-04-03T03:10:00.000Z',
    markdown: '# Demo\n\nREADME body',
  })

  assert.equal(
    markdown,
    [
      '---',
      'repo: acme/demo',
      'sourceUrl: https://github.com/acme/demo#readme',
      'syncedAt: 2026-04-03T03:10:00.000Z',
      '---',
      '',
      '# Demo',
      '',
      'README body',
      '',
    ].join('\n'),
  )
})
