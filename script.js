/* ===================================
   Les Chèvrefeuilles — JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    // --- Scroll reveal animations ---
    const revealSelectors = [
        '.service-card',
        '.env-card',
        '.value-card',
        '.contact-card',
        '.about-text',
        '.about-structures',
        '.env-highlight',
        '.section-header',
        '.residence-card',
        '.wellness-item',
        '.wellness-activity-card',
        '.structure-item',
        '.feder-banner'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));

    // --- Hero badge counter animation ---
    const badges = document.querySelectorAll('.hero-badge-number');
    let badgesAnimated = false;

    function animateCounters() {
        if (badgesAnimated) return;
        badgesAnimated = true;

        badges.forEach(badge => {
            const target = parseInt(badge.textContent, 10);
            if (isNaN(target)) return;

            let current = 0;
            const increment = Math.max(1, Math.floor(target / 40));
            const duration = 1200;
            const stepTime = duration / (target / increment);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    badge.textContent = target;
                    clearInterval(timer);
                } else {
                    badge.textContent = current;
                }
            }, stepTime);
        });
    }

    const heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    const heroSection = document.querySelector('.hero-badges');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // --- Smooth scroll for anchor links (fallback) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
