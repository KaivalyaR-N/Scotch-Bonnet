document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach((counter) => {
        const target = Number(counter.dataset.counter);
        let value = 0;
        const step = Math.ceil(target / 40);
        const tick = () => {
            value = Math.min(value + step, target);
            counter.textContent = value;
            if (value < target) requestAnimationFrame(tick);
        };
        tick();
    });

    const range = document.getElementById('heat-range');
    const output = document.getElementById('heat-output');
    if (range && output) {
        const describeHeat = (v) => {
            if (v <= 3) return 'Mild';
            if (v <= 6) return 'Warm kick';
            if (v <= 8) return 'Hot';
            return 'Volcanic';
        };
        range.addEventListener('input', () => {
            output.textContent = `Heat level: ${range.value}/10 - ${describeHeat(Number(range.value))}`;
        });
    }

    const pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
        const cards = document.querySelectorAll('.price-card');
        pricingToggle.addEventListener('change', () => {
            cards.forEach((card) => {
                const value = pricingToggle.checked ? card.dataset.month : card.dataset.once;
                card.querySelector('.price').textContent = `$${value}`;
            });
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length) {
        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
            });
        });
    }

    const progress = document.getElementById('scroll-progress');
    if (progress) {
        const syncProgress = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = `${(window.scrollY / max) * 100}%`;
        };
        window.addEventListener('scroll', syncProgress);
        syncProgress();
    }
});
