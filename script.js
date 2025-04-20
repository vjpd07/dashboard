// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

async function populateFeed(feedId, rssUrl) {
  const proxyUrl = "https://rss-proxy.yourname.workers.dev";
  const target = `${proxyUrl}?url=${encodeURIComponent(rssUrl)}`;
  try {
    const res = await fetch(target);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const items = Array.from(xml.querySelectorAll("item")).slice(0, 5);
    const list = document.getElementById(feedId);
    list.innerHTML = items.map(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const date = new Date(item.querySelector("pubDate").textContent).toISOString().split("T")[0];
      return `<li><span class="date">»${date}</span><a href="${link}" target="_blank">${title}</a></li>`;
    }).join('');
  } catch (err) {
    console.error(`Error fetching ${rssUrl}`, err);
  }
}

// Example calls:
document.addEventListener("DOMContentLoaded", () => {
  populateFeed("lex-fridman-feed", "https://lexfridman.com/feed/podcast/");
  populateFeed("huberman-feed", "https://hubermanlab.com/feed");
  populateFeed("paulgraham-feed", "http://www.aaronsw.com/2002/feeds/pgessays.rss");
  populateFeed("substack-feed", "https://your-substack.substack.com/feed");
});