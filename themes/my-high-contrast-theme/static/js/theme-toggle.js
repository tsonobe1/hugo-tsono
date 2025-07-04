document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const html = document.documentElement;

  function updateIcon(theme) {
    toggleButton.textContent = theme === "dark" ? "☀️ ライトモード" : "🌙 ダークモード";
  }

  function updateGiscusTheme(theme) {
    const giscusFrame = document.querySelector('iframe[src*="giscus"]');
    if (giscusFrame) {
      const message = {
        type: 'set-theme',
        theme: theme === 'dark' ? 'dark' : 'light'
      };
      giscusFrame.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  } else {
    updateIcon("dark");
  }

  toggleButton.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon(next);
    updateGiscusTheme(next);
  });

  setTimeout(() => {
    updateGiscusTheme(html.getAttribute("data-theme"));
  }, 1000);

  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(function() {
    const copyBtn = event.target.closest('.copy-btn');
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>コピー完了!';
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
  });
}

function toggleReaction(type) {
  const key = `reaction_${type}_${window.location.pathname}`;
  const isActive = localStorage.getItem(key) === 'true';
  const newState = !isActive;
  
  localStorage.setItem(key, newState.toString());
  
  const btn = document.querySelector(`[data-reaction="${type}"]`);
  const countSpan = btn.querySelector('.reaction-count');
  let count = parseInt(countSpan.textContent) || 0;
  
  if (newState) {
    btn.classList.add('active');
    count++;
  } else {
    btn.classList.remove('active');
    count = Math.max(0, count - 1);
  }
  
  countSpan.textContent = count;
}
