// ================================
// iService35.ru - Animations Setup
// ================================

// ========== Initialize AOS (Animate On Scroll) ==========
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 20,
        delay: 0,
    });

    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
}

// ========== Crystalline Network Animation ==========
(function() {
    const canvas = document.getElementById('crystalline-network');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Particle configuration
    const particleCount = 80;
    const particles = [];
    const mouse = { x: null, y: null, radius: 150 };
    const connectionDistance = 150;

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction - subtle repulsion
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x += dx * force * 0.03;
                    this.y += dy * force * 0.03;
                }
            }

            // Keep in bounds
            this.x = Math.max(0, Math.min(width, this.x));
            this.y = Math.max(0, Math.min(height, this.y));
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 217, 255, 0.6)';
            ctx.fill();

            // Subtle glow
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 217, 255, 0.4)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 102, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        // Clear with slight fade for trail effect
        ctx.fillStyle = 'rgba(10, 22, 40, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        requestAnimationFrame(animate);
    }

    // Mouse move handler
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        // Reposition particles if they're now out of bounds
        particles.forEach(particle => {
            if (particle.x > width) particle.x = width;
            if (particle.y > height) particle.y = height;
        });
    });

    // Start animation
    animate();
})();

// ========== Typed.js for Hero Title ==========
document.addEventListener('DOMContentLoaded', function() {

    const typedElement = document.querySelector('.typed-text');

    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'любой сложности',
                'в Вологде',
                'с гарантией',
                'быстро и качественно'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // ========== GSAP Animations Setup ==========
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // ========== Hero Section Animations ==========
        const heroTl = gsap.timeline();

        heroTl.from('.hero-title', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.hero-description', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-cta-label', {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-buttons', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.hero-trust', {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3');

        // ========== Service Cards Hover Effect ==========
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(card, {
                    y: -10,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // ========== Feature Cards Animation ==========
        const featureCards = document.querySelectorAll('.feature-card');

        featureCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // ========== Section Title Animation ==========
        const sectionTitles = document.querySelectorAll('.section-title');

        sectionTitles.forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // ========== Parallax Effect for Hero Background ==========
        const heroBackground = document.querySelector('.hero-background');

        if (heroBackground) {
            gsap.to('.hero-background', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 200,
                ease: 'none'
            });
        }

        // ========== CTA Section Scale Animation ==========
        gsap.from('.cta-content', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        });

        // ========== Button Ripple Effect ==========
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                gsap.to(ripple, {
                    scale: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                });
            });
        });

        // ========== Footer Fade In ==========
        gsap.from('.footer', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // ========== Refresh ScrollTrigger on Load ==========
        window.addEventListener('load', function() {
            ScrollTrigger.refresh();
        });

        // ========== Update ScrollTrigger on Resize ==========
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                ScrollTrigger.refresh();
            }, 250);
        });
    }

    // ========== Custom Cursor Effect (Optional Premium Feature) ==========
    const createCustomCursor = () => {
        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');

        cursor.className = 'custom-cursor';
        cursorFollower.className = 'cursor-follower';

        cursor.style.cssText = `
            width: 10px;
            height: 10px;
            background: var(--accent-color);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;

        cursorFollower.style.cssText = `
            width: 40px;
            height: 40px;
            border: 2px solid var(--accent-color);
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Scale cursor on hover over clickable elements
        const clickables = document.querySelectorAll('a, button, .service-card, .feature-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    };

    // Uncomment to enable custom cursor (desktop only)
    // if (window.innerWidth > 1024) {
    //     createCustomCursor();
    // }

    console.log('%c✨ Animations initialized!', 'color: #d4af37; font-size: 14px;');
});
