document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const html = document.documentElement;

  function updateIcon(theme) {
    toggleButton.textContent = theme === "dark" ? "☀️ ライトモード" : "🌙 ダークモード";
  }

  // 初期状態をlocalStorageから
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  } else {
    updateIcon("dark"); // デフォルト
  }

  toggleButton.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon(next);
  });
});
