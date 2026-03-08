// Enhanced interactivity with cursor effects and animations

document.addEventListener('DOMContentLoaded', function () {
    // ==================== Custom Cursor Effects ====================
    const cursorDot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update cursor position with slight lag for smooth effect
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        cursorDot.style.left = cursorX - 6 + 'px';
        cursorDot.style.top = cursorY - 6 + 'px';

        // Create trailing dots
        createCursorTrail(mouseX, mouseY);
    });

    function createCursorTrail(x, y) {
        if (Math.random() > 0.8) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = x - 7.5 + 'px';
            trail.style.top = y - 7.5 + 'px';
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 600);
        }
    }

    // Cursor interaction with clickable elements
    const interactiveElements = document.querySelectorAll('a, button, [data-typewriter]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
        });
    });

    // ==================== Typewriter Effect ====================
    const typewriters = document.querySelectorAll('[data-typewriter]');
    typewriters.forEach(function (el) {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        function step() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(step, 50);
            }
        }
        step();
    });

    // ==================== Scroll Animations ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all h1 and p elements for scroll animation
    document.querySelectorAll('h1, p, .product-card').forEach(el => {
        observer.observe(el);
    });

    // ==================== Smooth Scroll Navigation ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== Interactive Product Cards ====================
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = 10;
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = 1;
        });
    });

    // ==================== Tilt Effect on Mouse Move ====================
    document.addEventListener('mousemove', (e) => {
        productCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
    });

    // Reset tilt on mouse leave
    document.addEventListener('mouseleave', () => {
        productCards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ==================== CTA Button Ripple Effect ====================
    const ctaButtons = document.querySelectorAll('.cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    function createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // ==================== Parallax Effect ====================
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ==================== Add Page Load Animation ====================
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});