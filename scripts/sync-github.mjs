import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const profilePath = path.join(root, 'src/content/site/profile.md')
const projectsDir = path.join(root, 'src/content/projects')
const outputPath = path.join(root, 'src/data/generated/github-data.json')
const token = process.env.GITHUB_TOKEN

async function githubFetch(endpoint) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'dev-portfolio-sync-script',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`GitHub API ${response.status} for ${endpoint}: ${text}`)
  }

  return response.json()
}

async function readMarkdown(filePath) {
  const raw = await fs.readFile(filePath, 'utf8')
  return matter(raw)
}

async function collectProjects() {
  const entries = await fs.readdir(projectsDir)
  const markdownFiles = entries.filter((entry) => entry.endsWith('.md'))

  return Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(projectsDir, fileName)
      const parsed = await readMarkdown(fullPath)
      return {
        slug: fileName.replace(/\.md$/, ''),
        repo: String(parsed.data.repo || ''),
      }
    }),
  )
}

async function main() {
  const profile = await readMarkdown(profilePath)
  const username = String(profile.data.github || '').trim()
  const projects = await collectProjects()

  const payload = {
    generatedAt: new Date().toISOString(),
    profile: {
      username,
      repos: 0,
      followers: 0,
      following: 0,
      htmlUrl: username ? `https://github.com/${username}` : '',
    },
    projects: {},
  }

  if (username && !username.includes('your-github-username')) {
    try {
      const profileData = await githubFetch(`/users/${username}`)
      payload.profile = {
        username: profileData.login,
        repos: profileData.public_repos,
        followers: profileData.followers,
        following: profileData.following,
        htmlUrl: profileData.html_url,
      }
    } catch (error) {
      console.warn(`Failed to fetch profile for ${username}:`, error.message)
    }
  }

  for (const project of projects) {
    if (!project.repo || project.repo.includes('your-github-username')) {
      continue
    }

    try {
      const repoData = await githubFetch(`/repos/${project.repo}`)
      const commits = await githubFetch(`/repos/${project.repo}/commits?per_page=6`)
      payload.projects[project.slug] = {
        repo: project.repo,
        description: repoData.description || '',
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        updatedAt: repoData.updated_at || '',
        homepage: repoData.homepage || repoData.html_url || '',
        commits: commits.map((commit) => ({
          sha: commit.sha,
          message: commit.commit?.message?.split('\\n')[0] || 'No commit message',
          date: commit.commit?.author?.date || '',
          url: commit.html_url,
        })),
      }
      console.log(`Synced ${project.repo}`)
    } catch (error) {
      console.warn(`Failed to sync ${project.repo}:`, error.message)
    }
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${outputPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
