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

// Fetch Lex Fridman RSS feed via rss2json API
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCSHZKyawb77ixDdsGog4iWA')
  .then(res => res.json())
  .then(data => {
    const feed = data.items.slice(0, 5).map(item =>
      `<li><span class="date">»${item.pubDate.split(' ')[0]}</span><a href="\${item.link}" target="_blank">\${item.title}</a></li>`
    ).join('');
    document.getElementById('lex-feed').innerHTML = feed;
  });