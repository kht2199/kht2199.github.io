import { cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const docsDir = path.join(rootDir, 'docs')

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: 'inherit',
      env: process.env,
    })

    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
    })

    child.on('error', reject)
  })
}

async function cleanDocsRoot() {
  await mkdir(docsDir, { recursive: true })
  const entries = await readdir(docsDir)

  await Promise.all(
    entries
      .filter((entry) => entry !== 'plans')
      .map(async (entry) => {
        const target = path.join(docsDir, entry)
        const entryStat = await stat(target)
        await rm(target, { recursive: entryStat.isDirectory(), force: true })
      }),
  )
}

async function main() {
  await run('pnpm', ['build'])
  await cleanDocsRoot()
  await cp(distDir, docsDir, { recursive: true })
  await writeFile(path.join(docsDir, '.nojekyll'), '')
  console.log('GitHub Pages files copied to docs/')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
