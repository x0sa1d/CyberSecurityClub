async function loadContributors() {
  const url = "http://localhost:5000/api/contributors";
  const container = document.getElementById('github-contributors-list');
  container.innerHTML = "Loading...";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error");
    const contributors = await res.json();
    if (!Array.isArray(contributors) || contributors.length === 0) {
      container.innerHTML = "No contributors found.";
      return;
    }
    container.innerHTML = "";
    contributors
      .filter(user => user.author && user.author.type !== "Bot")
      .sort((a, b) => b.total - a.total)
      .forEach(user => {
        const additions = user.weeks.reduce((sum, w) => sum + w.a, 0);
        const deletions = user.weeks.reduce((sum, w) => sum + w.d, 0);
        const div = document.createElement('div');
        div.className = "github-contributor";
        div.innerHTML = `
          <a href="${user.author.html_url}" target="_blank" title="${user.author.login}">
            <img src="${user.author.avatar_url}" alt="${user.author.login}">
          </a>
          <div class="github-contributor-tooltip">
            <strong>${user.author.login}</strong><br>
            ${user.total} commit${user.total > 1 ? "s" : ""}<br>
            <span style="color:#57AB5A;">${additions}++</span><br>
            <span style="color:#E5534B;">${deletions}--</span>
          </div>
        `;
        container.appendChild(div);
      });
  } catch (e) {
    container.innerHTML = "Could not load contributors.<br><small>Try refreshing after a minute.</small>";
  }
}
loadContributors();