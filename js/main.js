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
        const priceCheckButton = document.getElementById('price-check-btn');
        const priceCheckResult = document.getElementById('price-check-result');
        let devices = [];
        let filteredDevices = [];
        let priceEntries = [];

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

        const parseCsv = (text) => {
            const rows = [];
            let current = '';
            let row = [];
            let inQuotes = false;

            for (let i = 0; i < text.length; i += 1) {
                const char = text[i];
                const nextChar = text[i + 1];

                if (char === '"') {
                    if (inQuotes && nextChar === '"') {
                        current += '"';
                        i += 1;
                    } else {
                        inQuotes = !inQuotes;
                    }
                    continue;
                }

                if (char === ',' && !inQuotes) {
                    row.push(current);
                    current = '';
                    continue;
                }

                if ((char === '\n' || char === '\r') && !inQuotes) {
                    if (char === '\r' && nextChar === '\n') {
                        i += 1;
                    }
                    row.push(current);
                    if (row.some(cell => cell !== '')) {
                        rows.push(row);
                    }
                    row = [];
                    current = '';
                    continue;
                }

                current += char;
            }

            if (current !== '' || row.length) {
                row.push(current);
                if (row.some(cell => cell !== '')) {
                    rows.push(row);
                }
            }

            return rows;
        };

        const normalizePriceEntries = (rows) => {
            if (!Array.isArray(rows) || rows.length < 2) return [];

            const [header, ...dataRows] = rows;
            const headerMap = header.reduce((acc, key, index) => {
                acc[String(key || '').trim().toLowerCase()] = index;
                return acc;
            }, {});
            let lastCategory = '';
            let lastModel = '';

            return dataRows
                .map((row) => {
                    const categoryCell = String(row[headerMap.category] || '').trim();
                    const modelCell = String(row[headerMap.model] || '').trim();
                    const service = String(row[headerMap.service] || '').trim();
                    const price = String(row[headerMap.price] || '').trim();

                    if (categoryCell) {
                        lastCategory = categoryCell;
                        if (!modelCell) {
                            lastModel = '';
                        }
                    }

                    if (modelCell) {
                        lastModel = modelCell;
                    }

                    const category = categoryCell || lastCategory;
                    const model = modelCell || lastModel;

                    if (!category || !model || !service) return null;

                    return {
                        category,
                        model,
                        service,
                        price,
                        searchKey: model.toLowerCase()
                    };
                })
                .filter(Boolean);
        };

        const buildDevicesFromPriceEntries = (entries) => uniqEntries(
            entries.map((entry) => ({
                name: entry.model,
                group: entry.category
            }))
        );

        const normalizeRuntimePriceEntries = (entries) => {
            if (!Array.isArray(entries)) return [];

            return entries
                .map((entry) => {
                    if (!entry || typeof entry !== 'object') return null;

                    const category = String(entry.category || '').trim();
                    const model = String(entry.model || '').trim();
                    const service = String(entry.service || '').trim();
                    const price = String(entry.price || '').trim();

                    if (!category || !model || !service) return null;

                    return {
                        category,
                        model,
                        service,
                        price,
                        searchKey: model.toLowerCase()
                    };
                })
                .filter(Boolean);
        };

        const escapeHtml = (value) => String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const isPriceOnRequest = (price) => {
            const normalizedPrice = String(price || '').trim().toLowerCase();
            return (
                normalizedPrice === '' ||
                normalizedPrice === '-' ||
                normalizedPrice === 'по запросу' ||
                normalizedPrice === 'цена по запросу' ||
                normalizedPrice === 'укажите цену'
            );
        };

        const buildTelegramRequestUrl = (entry) => {
            const message = [
                'Здравствуйте! Хочу узнать цену ремонта.',
                `Категория: ${entry.category}`,
                `Модель: ${entry.model}`,
                `Услуга: ${entry.service}`
            ].join('\n');

            return `https://t.me/perez_vol?text=${encodeURIComponent(message)}`;
        };

        const hidePriceResult = () => {
            if (!priceCheckResult) return;
            priceCheckResult.hidden = true;
            priceCheckResult.innerHTML = '';
        };

        const renderPriceResult = (query) => {
            if (!priceCheckResult) return;

            const normalizedQuery = query.trim().toLowerCase();
            const matches = priceEntries.filter((entry) => entry.searchKey === normalizedQuery);

            if (!normalizedQuery) {
                priceCheckResult.hidden = false;
                priceCheckResult.innerHTML = '<p class="price-check-empty">Выберите устройство из списка, чтобы показать услуги и цены.</p>';
                return;
            }

            if (!matches.length) {
                priceCheckResult.hidden = false;
                priceCheckResult.innerHTML = '<p class="price-check-empty">Для этой модели пока нет заполненных цен. Добавьте строки в <code>config/price-list.csv</code> или напишите нам.</p>';
                return;
            }

            const { category, model } = matches[0];
            const servicesMarkup = matches
                .map((entry) => {
                    const actionMarkup = isPriceOnRequest(entry.price)
                        ? `<a class="price-check-request-link" href="${buildTelegramRequestUrl(entry)}" target="_blank" rel="noopener noreferrer">Цена по запросу</a>`
                        : `<span class="price-check-service-price">${escapeHtml(entry.price)}</span>`;

                    return `
                        <li class="price-check-service-row">
                            <span class="price-check-service-name">${escapeHtml(entry.service)}</span>
                            ${actionMarkup}
                        </li>
                    `;
                })
                .join('');

            priceCheckResult.hidden = false;
            priceCheckResult.innerHTML = `
                <div class="price-check-result-card">
                    <p class="price-check-result-label">${escapeHtml(category)}</p>
                    <h3 class="price-check-result-title">${escapeHtml(model)}</h3>
                    <ul class="price-check-service-list">${servicesMarkup}</ul>
                </div>
            `;
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
                    hidePriceResult();
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
                        hidePriceResult();
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
            const runtimeEntries = normalizeRuntimePriceEntries(window.ISERVICE_PRICE_LIST);
            const canFetchCsv = window.location.protocol !== 'file:';

            if (canFetchCsv) {
                try {
                    const response = await fetch('config/price-list.csv', { cache: 'no-store' });
                    if (response.ok) {
                        const csvText = await response.text();
                        const entries = normalizePriceEntries(parseCsv(csvText));
                        if (entries.length) {
                            priceEntries = entries;
                            return buildDevicesFromPriceEntries(entries);
                        }
                    }
                } catch (error) {
                    // Fallback to generated runtime config below.
                }
            }

            if (runtimeEntries.length) {
                priceEntries = runtimeEntries;
                return buildDevicesFromPriceEntries(runtimeEntries);
            }

            return [];
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

        deviceInput.addEventListener('input', () => {
            hidePriceResult();
            applyFilter();
        });

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
                hidePriceResult();
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

        if (priceCheckButton) {
            priceCheckButton.addEventListener('click', () => {
                renderPriceResult(deviceInput.value || '');
            });
        }
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
