// Scroll-triggered clean fade-in observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -24px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Interactive stacked hero cards hover separation
const heroCards = Array.from(document.querySelectorAll('.hero-card'));

heroCards.forEach((card, hoveredIndex) => {
  card.addEventListener('mouseenter', () => {
    heroCards.forEach((c, idx) => {
      c.classList.remove('is-hovered', 'is-pushed-down', 'is-lifted-up');
      if (idx === hoveredIndex) {
        c.classList.add('is-hovered');
      } else if (idx < hoveredIndex) {
        c.classList.add('is-pushed-down');
      } else {
        c.classList.add('is-lifted-up');
      }
    });
  });

  card.addEventListener('mouseleave', () => {
    heroCards.forEach((c) => {
      c.classList.remove('is-hovered', 'is-pushed-down', 'is-lifted-up');
    });
  });
});

// Interactive Release Format Card
const formatOptions = Array.from(document.querySelectorAll('.format-option'));
const continueBtn = document.getElementById('formatContinueBtn');
let selectedFormat = 'Album';

formatOptions.forEach((btn) => {
  btn.addEventListener('click', () => {
    formatOptions.forEach((option) => option.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    selectedFormat = btn.dataset.format || 'Album';
    if (continueBtn) {
      continueBtn.textContent = 'Continue';
    }
  });
});

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    continueBtn.textContent = `Selected: ${selectedFormat}`;
  });
}
