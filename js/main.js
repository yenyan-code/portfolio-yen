/**
 * ==========================================================================
 * GLOBAL JAVASCRIPT LOGIC (main.js)
 * Exact replica functionality for Itti's Portfolio
 * Structured cleanly as in yen-tweaking for easy understanding
 * ==========================================================================
 * 
 * TABLE OF CONTENTS:
 * 1. DOMContentLoaded Initialization
 * 2. Active Navigation Link Detection on Scroll
 * 3. Smooth Scroll for Anchor Links
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Itti Portfolio — Global Script Loaded");

    /* ==========================================================================
       2. ACTIVE NAVIGATION LINK DETECTION ON SCROLL
       Monitors which section (#work or #play) is currently in the viewport
       and highlights the corresponding link in the top floating navigation bar.
       ========================================================================== */
    const navLinks = document.querySelectorAll('.navbar-pill .nav-link');
    const sections = document.querySelectorAll('section[id], div[id="play"], div[id="explorations"]');

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* ==========================================================================
       3. GLOBAL LENIS SMOOTH SCROLL & ANCHOR SCROLLING
       Initializes Lenis smooth scroll engine globally if loaded, and binds
       all page anchor links (navigation, ToC, CTAs) to lenis.scrollTo().
       ========================================================================== */
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Bind all anchor links to Lenis scrollTo
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        
                        // Apply custom offsets: ToC links need more space for floating navigation bar
                        let offsetValue = -80;
                        if (this.classList.contains('cs-toc-link')) {
                            offsetValue = -120;
                        }
                        
                        lenis.scrollTo(targetElement, {
                            offset: offsetValue
                        });
                    }
                }
            });
        });
    } else {
        // Fallback smooth scroll for pages that don't load Lenis CDN
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /* ==========================================================================
       4. CUSTOM BLACK DOT CURSOR
       Creates a floating black dot cursor that follows the mouse with zero lag,
       scaling up on clickable links and adjusting contrast on dark sections.
       ========================================================================== */
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorDot.style.opacity = '1';
        });

        // Interactive hover effect for links, buttons, and cards
        const interactives = document.querySelectorAll('a, button, input, .work-card-exact, .play-card-exact, .nav-link, .browser-wave-pill, .spotify-widget');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
        });

        // Invert contrast when moving over permanently dark sections (like Enclave card)
        const darkSections = document.querySelectorAll('.bg-enclave, [style*="background: #111"], [style*="background-color: #000"]');
        darkSections.forEach(sec => {
            sec.addEventListener('mouseenter', () => cursorDot.classList.add('on-dark'));
            sec.addEventListener('mouseleave', () => cursorDot.classList.remove('on-dark'));
        });

        document.addEventListener('mouseleave', () => cursorDot.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursorDot.style.opacity = '1');
    }

    /* ==========================================================================
       5. DARK MODE TOGGLE LOGIC
       Allows toggling between Dark Mode and Light Mode with persistence in localStorage.
       ========================================================================== */
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const isDarkSaved = localStorage.getItem('arien_dark_mode') === 'true';

    function updateDarkModeButton(isDark) {
        if (!darkModeBtn) return;
        const textSpan = darkModeBtn.querySelector('.dark-mode-text');
        const iconSpan = darkModeBtn.querySelector('.dark-mode-icon');
        
        if (textSpan) {
            textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
        if (iconSpan) {
            if (isDark) {
                // Sun Icon
                iconSpan.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.07" x2="5.64" y2="17.66"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                `;
            } else {
                // Moon Icon
                iconSpan.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                `;
            }
        }
    }

    // Apply saved state on initial page load
    if (isDarkSaved) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButton(isDarkSaved);

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', (e) => {
            const isDarkNow = !document.body.classList.contains('dark-mode');
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Fallback for browsers that don't support View Transitions or if reduced motion is enabled
            if (!document.startViewTransition || prefersReducedMotion) {
                document.body.classList.toggle('dark-mode');
                document.documentElement.classList.toggle('dark-mode');
                localStorage.setItem('arien_dark_mode', isDarkNow ? 'true' : 'false');
                updateDarkModeButton(isDarkNow);
                return;
            }

            // Click coordinates (fallback to button center if keyboard/etc triggered)
            const rect = darkModeBtn.getBoundingClientRect();
            const x = e.clientX ?? (rect.left + rect.width / 2);
            const y = e.clientY ?? (rect.top + rect.height / 2);

            // Calculate distance to the furthest corner of the screen
            const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

            document.documentElement.classList.add('theme-transition');

            const transition = document.startViewTransition(() => {
                document.body.classList.toggle('dark-mode');
                document.documentElement.classList.toggle('dark-mode');
                localStorage.setItem('arien_dark_mode', isDarkNow ? 'true' : 'false');
                updateDarkModeButton(isDarkNow);
            });

            transition.ready.then(() => {
                // Ensure the new view is on top during the wipe
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${r}px at ${x}px ${y}px)`
                        ]
                    },
                    {
                        duration: 500,
                        easing: 'ease-in-out',
                        pseudoElement: '::view-transition-new(root)'
                    }
                );
            });

            transition.finished.then(() => {
                document.documentElement.classList.remove('theme-transition');
            });
        });
    }
});
