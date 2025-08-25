// ===== Smooth scroll for in-page links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== Back to top button =====
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  const toggleBackBtn = () =>
    backBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
  window.addEventListener('scroll', toggleBackBtn);
  toggleBackBtn();
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Dark mode toggle (with persistence) =====
const darkToggle = document.getElementById('darkModeToggle');
const setTheme = (mode) => {
  document.documentElement.dataset.theme = mode; // use [data-theme="dark"] in CSS
  localStorage.setItem('theme', mode);
  if (darkToggle) {
    darkToggle.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    darkToggle.textContent = mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
};
setTheme(localStorage.getItem('theme') || 'dark'); // default to dark
darkToggle?.addEventListener('click', () => {
  const next = (localStorage.getItem('theme') || 'dark') === 'dark' ? 'light' : 'dark';
  setTheme(next);
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
  projectsToggle.textContent = expanded ? '📂 Show Projects' : '📁 Hide Projects';
});
// ===== Mobile nav toggle (if you add a hamburger later) =====
// const btn = document.querySelector('.menu-toggle');
// const nav = document.querySelector('#nav');
// btn?.addEventListener('click', () => {
//   const open = nav.classList.toggle('open');
//   btn.setAttribute('aria-expanded', open ? 'true' : 'false');
// });
