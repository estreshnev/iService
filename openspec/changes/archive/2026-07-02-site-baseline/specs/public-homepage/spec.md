## ADDED Requirements

### Requirement: Homepage shell and navigation
The site SHALL provide a public homepage at `/` using `index.html` with Russian-language metadata, canonical URL, fixed top navigation, in-page anchor links, logo branding, and a primary phone call action.

#### Scenario: Visitor opens the homepage
- **WHEN** a visitor opens the root page
- **THEN** the page presents iService branding, a fixed navigation bar, and links to the homepage sections for main content, about/trust information, addresses, reviews, and contacts

#### Scenario: Visitor uses mobile navigation
- **WHEN** the visitor uses a viewport where the hamburger menu is shown and activates it
- **THEN** the navigation menu toggles open and closes after a navigation link is selected

### Requirement: Homepage hero and trust content
The homepage SHALL present a hero section describing iService as a repair service in Vologda, include VK and Telegram contact actions, and display trust indicators for rating, repair count, and operating history.

#### Scenario: Visitor reviews primary offer
- **WHEN** the visitor reaches the hero section
- **THEN** the page shows the main service message, social contact buttons, and trust indicators without requiring form submission

### Requirement: Trust, reviews, and footer sections
The homepage SHALL include sections for trust reasons, Yandex recognition, Yandex Maps reviews, footer contact details, legal/business information, and social links.

#### Scenario: Visitor evaluates credibility
- **WHEN** the visitor scrolls through the homepage
- **THEN** the page presents trust cards, a Yandex recognition badge, review cards, links to Yandex review pages, and business/legal details in the footer

### Requirement: Responsive layout and scroll UI
The homepage SHALL support responsive desktop and mobile layouts, smooth in-page scrolling, scroll progress indication, active navigation state, and keyboard-aware hiding of floating contact buttons on mobile.

#### Scenario: Visitor scrolls the homepage
- **WHEN** the visitor scrolls through homepage sections
- **THEN** the navigation styling, progress indicator, and active section state update according to scroll position

#### Scenario: Visitor focuses an input on mobile
- **WHEN** a mobile visitor focuses an editable field and the visual viewport indicates the keyboard is open
- **THEN** floating contact buttons are hidden to avoid covering the input area

### Requirement: Animation libraries and graceful guards
The homepage SHALL initialize optional animation behavior when the corresponding CDN libraries and target elements are available, while guarding against missing optional elements or libraries.

#### Scenario: Animation dependencies are available
- **WHEN** AOS, GSAP, ScrollTrigger, or Typed.js are loaded and matching target elements exist
- **THEN** the page initializes the relevant animations for scroll effects, hero entrance, and interaction effects

#### Scenario: Optional animation targets are absent
- **WHEN** an optional animation target such as a crystalline network canvas, typed text element, or legacy card class is absent
- **THEN** the JavaScript exits that behavior without blocking the rest of the page
