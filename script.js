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

async function fetchRSSFeed(rssUrl) {
  const proxyUrl = 'https://rss-proxy.cloudflare-washed317.workers.dev/'; // replace with your actual Worker URL
  const finalUrl = `${proxyUrl}?url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(finalUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = Array.from(xml.querySelectorAll("item")).slice(0, 5); // only last 5
    return items.map(item => ({
      title: item.querySelector("title")?.textContent,
      link: item.querySelector("link")?.textContent
    }));
  } catch (error) {
    console.error("Failed to fetch RSS feed:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const lexFeedUrl = "https://lexfridman.com/feed/podcast/";
  const feedItems = await fetchRSSFeed(lexFeedUrl);

  const lexContainer = document.getElementById("lex-fridman-feed");
  feedItems.forEach(item => {
    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = item.title;
    link.target = "_blank";
    link.style.display = "block";
    lexContainer.appendChild(link);
  });

  const moreLink = document.createElement("a");
  moreLink.href = "https://www.youtube.com/@lexfridman";
  moreLink.textContent = "View more »";
  moreLink.target = "_blank";
  lexContainer.appendChild(moreLink);
});