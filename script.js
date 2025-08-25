// ===== Smooth scroll for in-page links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Back to top button =====
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  const toggleBackBtn = () =>
    (backBtn.style.display = window.scrollY > 400 ? 'block' : 'none');
  window.addEventListener('scroll', toggleBackBtn);
  toggleBackBtn();
  backBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ===== Dark/Light mode toggle (with persistence) =====
const darkToggle = document.getElementById('darkModeToggle');

function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  if (darkToggle) {
    darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    darkToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme (use saved, default to LIGHT)
const saved = localStorage.getItem('theme');
applyTheme(saved === 'dark');

// Toggle on click
darkToggle?.addEventListener('click', () => {
  const nextIsDark = !document.body.classList.contains('dark-mode');
  applyTheme(nextIsDark);
});

// ===== Project panels (accordion) =====
document.querySelectorAll('.project-toggle').forEach(btn => {
  const targetId = btn.getAttribute('aria-controls');
  const target = document.getElementById(targetId);
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (target) target.hidden = expanded;
  });
});

// ===== Show/Hide entire projects block =====
const projectsToggle = document.getElementById('projectsToggle');
const projectsContent = document.getElementById('projectsContent');
projectsToggle?.addEventListener('click', () => {
  const expanded = projectsToggle.getAttribute('aria-expanded') === 'true';
  projectsToggle.setAttribute('aria-expanded', String(!expanded));
  projectsContent.hidden = expanded;
  projectsToggle.textContent = expanded
    ? '📂 Show Projects'
    : '📁 Hide Projects';
});