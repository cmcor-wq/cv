const API_BASE = "https://api.github.com";

function config() {
  const token = process.env.GITHUB_ADMIN_TOKEN;
  const repo = process.env.GITHUB_ADMIN_REPO;
  const branch = process.env.GITHUB_ADMIN_BRANCH;
  if (!token || !repo || !branch) {
    throw new Error("GITHUB_ADMIN_TOKEN, GITHUB_ADMIN_REPO or GITHUB_ADMIN_BRANCH is not configured");
  }
  return { token, repo, branch };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getFileSha(path: string): Promise<string> {
  const { token, repo, branch } = config();
  const res = await fetch(`${API_BASE}/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: headers(token),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`No se pudo leer ${path} de GitHub (${res.status})`);
  const data = (await res.json()) as { sha: string };
  return data.sha;
}

/** Commits new content for a single repo-relative file path on the configured branch. */
export async function commitFile(path: string, content: string, message: string): Promise<{ commitUrl: string }> {
  const { token, repo, branch } = config();
  const sha = await getFileSha(path);

  const res = await fetch(`${API_BASE}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      sha,
      branch,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub rechazó el commit de ${path} (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { commit: { html_url: string } };
  return { commitUrl: data.commit.html_url };
}
