(() => {
  const fill = () => {
    fetch('https://api.tssl.cc/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: location.href, referrer: document.referrer })
    })
      .then(r => r.json())
      .then(r => {
        const map = {
          busuanzi_site_uv: 'busuanzi_value_site_uv',
          busuanzi_site_pv: 'busuanzi_value_site_pv',
          busuanzi_page_pv: 'busuanzi_value_page_pv',
          busuanzi_page_uv: 'busuanzi_value_page_uv'
        }
        for (const k in map) {
          if (r[k] == null) continue
          document.querySelectorAll('#' + map[k]).forEach(e => { e.innerText = r[k] })
        }
      })
      .catch(() => {})
  }
  fill()
  document.addEventListener('pjax:complete', fill)
})()
