const cursor = document.querySelector('.cursor-glow');
if (cursor) {
  window.addEventListener('pointermove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const menu = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
if (menu && links) {
  menu.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach((a) =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
const savedTheme = localStorage.getItem('bluefort-theme');
if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;

function updateThemeButton() {
  const dark = root.dataset.theme === 'dark';
  if (themeIcon) themeIcon.textContent = dark ? '☀' : '☾';
  if (themeLabel) themeLabel.textContent = dark ? 'Light' : 'Dark';
  if (themeToggle) themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
updateThemeButton();

themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('bluefort-theme', root.dataset.theme);
  updateThemeButton();
});


const whatsappForm = document.getElementById('whatsappContactForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(whatsappForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();

    const whatsappMessage = [
      'Hello BlueFort Cyber Solutions,',
      '',
      '*New Security Enquiry*',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      `Service: ${service}`,
      '',
      `Requirement: ${message}`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/919998383663?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
