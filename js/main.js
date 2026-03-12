// ================================
// iService35.ru - Main JavaScript
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== Hero Price Check Placement ==========
    const heroPriceCheck = document.getElementById('hero-price-check');
    const heroPriceDesktopSlot = document.getElementById('hero-price-check-desktop-slot');
    const heroPriceMobileSlot = document.getElementById('hero-price-check-mobile-slot');

    if (heroPriceCheck && heroPriceDesktopSlot && heroPriceMobileSlot) {
        const syncHeroPricePlacement = () => {
            const isMobile = window.matchMedia('(max-width: 968px)').matches;
            const targetSlot = isMobile ? heroPriceMobileSlot : heroPriceDesktopSlot;

            if (heroPriceCheck.parentElement !== targetSlot) {
                targetSlot.appendChild(heroPriceCheck);
            }
        };

        syncHeroPricePlacement();
        window.addEventListener('resize', syncHeroPricePlacement);
    }

    // ========== Hero Device Select ==========
    const deviceSelectRoot = document.getElementById('device-select');

    if (deviceSelectRoot) {
        const deviceInput = document.getElementById('device-search');
        const deviceOptionsList = document.getElementById('device-options');
        const deviceToggle = document.getElementById('device-select-toggle');
        let devices = [];
        let filteredDevices = [];

        const normalizeDeviceEntries = (value, defaultGroup = '') => {
            if (!Array.isArray(value)) return [];

            return value
                .map((item) => {
                    if (typeof item === 'string') {
                        const name = item.trim();
                        return name ? { name, group: defaultGroup } : null;
                    }

                    if (item && typeof item.name === 'string') {
                        const name = item.name.trim();
                        if (!name) return null;
                        const group = typeof item.group === 'string' ? item.group.trim() : defaultGroup;
                        return { name, group };
                    }

                    return null;
                })
                .filter(Boolean);
        };

        const normalizeGroupedDevices = (groups) => {
            if (!Array.isArray(groups)) return [];

            const entries = [];
            groups.forEach((groupItem) => {
                if (!groupItem || typeof groupItem !== 'object') return;
                const groupTitle = typeof groupItem.title === 'string' ? groupItem.title.trim() : '';
                entries.push(...normalizeDeviceEntries(groupItem.items, groupTitle));
            });

            return entries;
        };

        const uniqEntries = (entries) => {
            const seen = new Set();
            const result = [];

            entries.forEach((entry) => {
                const key = `${entry.group}::${entry.name}`.toLowerCase();
                if (seen.has(key)) return;
                seen.add(key);
                result.push({
                    ...entry,
                    searchText: `${entry.name} ${entry.group}`.toLowerCase()
                });
            });

            return result;
        };

        const closeOptions = () => {
            deviceOptionsList.hidden = true;
            deviceInput.setAttribute('aria-expanded', 'false');
        };

        const openOptions = () => {
            deviceOptionsList.hidden = false;
            deviceInput.setAttribute('aria-expanded', 'true');
        };

        const renderOptions = (items) => {
            deviceOptionsList.innerHTML = '';

            if (!items.length) {
                const empty = document.createElement('li');
                empty.className = 'device-options-empty';
                empty.textContent = 'Ничего не найдено';
                deviceOptionsList.appendChild(empty);
                return;
            }

            let currentGroup = null;

            items.forEach((device) => {
                if (!device || !device.name) return;
                const groupName = device.group || 'Другое';

                if (groupName !== currentGroup) {
                    currentGroup = groupName;
                    const groupLi = document.createElement('li');
                    groupLi.className = 'device-group-title';
                    groupLi.textContent = groupName;
                    deviceOptionsList.appendChild(groupLi);
                }

                const li = document.createElement('li');
                li.className = 'device-option-item';
                const button = document.createElement('button');
                const nameSpan = document.createElement('span');
                const groupSpan = document.createElement('span');

                button.type = 'button';
                button.className = 'device-option-button';
                nameSpan.className = 'device-option-label';
                nameSpan.textContent = device.name;
                groupSpan.className = 'device-option-group';
                groupSpan.textContent = groupName;
                button.setAttribute('role', 'option');
                button.addEventListener('click', () => {
                    deviceInput.value = device.name;
                    closeOptions();
                });

                button.appendChild(nameSpan);
                button.appendChild(groupSpan);
                li.appendChild(button);
                deviceOptionsList.appendChild(li);
            });

            // Fallback guard: never leave dropdown visually empty when items exist.
            if (!deviceOptionsList.children.length && items.length) {
                items.forEach((device) => {
                    if (!device || !device.name) return;
                    const li = document.createElement('li');
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'device-option-button';
                    button.textContent = device.name;
                    button.addEventListener('click', () => {
                        deviceInput.value = device.name;
                        closeOptions();
                    });
                    li.appendChild(button);
                    deviceOptionsList.appendChild(li);
                });
            }
        };

        const applyFilter = () => {
            const query = deviceInput.value.trim().toLowerCase();
            filteredDevices = !query
                ? devices.slice()
                : devices.filter((device) => device.searchText.includes(query));
            renderOptions(filteredDevices);
            openOptions();
        };

        const loadDeviceConfig = async () => {
            const configuredPayload = window.ISERVICE_CONFIG || {};
            const configuredDevices = uniqEntries([
                ...normalizeGroupedDevices(configuredPayload.groups),
                ...normalizeDeviceEntries(configuredPayload.devices),
                ...normalizeDeviceEntries(window.DEVICE_OPTIONS)
            ]);

            if (configuredDevices.length) return configuredDevices;

            try {
                const response = await fetch('config/devices.json', { cache: 'no-store' });
                if (!response.ok) return [];
                const payload = await response.json();

                if (Array.isArray(payload)) {
                    return uniqEntries(normalizeDeviceEntries(payload));
                }

                return uniqEntries([
                    ...normalizeGroupedDevices(payload.groups),
                    ...normalizeDeviceEntries(payload.devices)
                ]);
            } catch (error) {
                return [];
            }
        };

        loadDeviceConfig().then((loadedDevices) => {
            devices = loadedDevices;
            filteredDevices = devices.slice();
            renderOptions(filteredDevices);
        });

        deviceInput.addEventListener('focus', () => {
            filteredDevices = devices.slice();
            renderOptions(filteredDevices);
            openOptions();
        });

        deviceInput.addEventListener('input', applyFilter);

        deviceInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeOptions();
            }

            if (event.key === 'Enter' && !deviceOptionsList.hidden) {
                event.preventDefault();
                if (filteredDevices.length) {
                    deviceInput.value = filteredDevices[0].name;
                }
                closeOptions();
            }
        });

        deviceToggle.addEventListener('click', () => {
            if (deviceOptionsList.hidden) {
                filteredDevices = devices.slice();
                renderOptions(filteredDevices);
                openOptions();
                deviceInput.focus();
            } else {
                closeOptions();
            }
        });

        document.addEventListener('click', (event) => {
            if (!deviceSelectRoot.contains(event.target)) {
                closeOptions();
            }
        });
    }


    // ========== Mobile Navigation Toggle ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========== Scroll UI State ==========
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section[id], footer[id]');
    const sectionNavLinks = Array.from(navLinks).filter(link => {
        const href = link.getAttribute('href') || '';
        return href.startsWith('#');
    });

    const handleScroll = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight);
        const currentScroll = window.pageYOffset;

        if (navbar) {
            navbar.classList.toggle('scrolled', currentScroll > 100);
        }

        if (scrollProgress) {
            scrollProgress.style.transform = `scaleX(${scrolled})`;
        }

        if (sectionNavLinks.length === 0) return;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (currentScroll > sectionTop && currentScroll <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', throttle(handleScroll, 16));
    handleScroll();

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== CountUp Animation for Statistics ==========
    const countUpElements = document.querySelectorAll('.stat-number[data-count]');

    function animateCountUp(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    if (countUpElements.length) {
        const countUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.textContent === '0') {
                    animateCountUp(entry.target);
                }
            });
        }, { threshold: 0.5 });

        countUpElements.forEach(element => {
            countUpObserver.observe(element);
        });
    }

    // ========== Back to Top Button (Optional) ==========
    const createBackToTop = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            transition: all 0.3s ease;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
            }
        });

        document.body.appendChild(button);
    };

    // Uncomment to enable back to top button
    // createBackToTop();

    // ========== Form Validation Helper (for future forms) ==========
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    window.validatePhone = function(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone);
    };

});

// ========== Page Load Animation ==========
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ========== Utility Functions ==========

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
