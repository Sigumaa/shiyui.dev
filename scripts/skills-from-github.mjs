// Fetch top languages from GitHub and print arrays for index.astro
// Usage: node scripts/skills-from-github.mjs Sigumaa

const username = process.argv[2]
if (!username) {
  console.error('Usage: node scripts/skills-from-github.mjs <github-username>')
  process.exit(1)
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'astro-theme-setup'
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return res.json()
}

async function getAllRepos(user) {
  let page = 1
  const repos = []
  while (true) {
    const url = `https://api.github.com/users/${user}/repos?per_page=100&page=${page}&type=owner&sort=updated`
    const data = await fetchJson(url)
    if (!Array.isArray(data) || data.length === 0) break
    repos.push(...data)
    if (data.length < 100) break
    page++
  }
  return repos.filter((r) => !r.fork)
}

async function getTopLanguages(user) {
  const repos = await getAllRepos(user)
  const totals = new Map()
  for (const repo of repos) {
    try {
      const langs = await fetchJson(repo.languages_url)
      for (const [lang, bytes] of Object.entries(langs)) {
        totals.set(lang, (totals.get(lang) || 0) + bytes)
      }
    } catch {}
  }
  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1])
  return sorted.map(([lang]) => lang)
}

getTopLanguages(username)
  .then((langs) => {
    const top = langs.slice(0, 8)
    console.log(JSON.stringify(top))
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

