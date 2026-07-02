## Purpose

Describe the current office, phone, social, map, review, and floating contact-channel baseline.

## Requirements

### Requirement: Office locations and maps
The homepage SHALL present two iService office locations with address links to Yandex Maps, phone links, and embedded Yandex map widgets.

#### Scenario: Visitor views office information
- **WHEN** the visitor reaches the addresses section
- **THEN** the page shows the Predtechenskaya office and the Marmelad office with address links, phone links, and embedded Yandex map iframes

### Requirement: Phone and social contact actions
The site SHALL expose phone, VK, and Telegram contact actions from prominent homepage areas, including navigation, hero, footer, and floating contact controls.

#### Scenario: Visitor wants to contact the service
- **WHEN** the visitor uses a contact action
- **THEN** the page opens the corresponding `tel:`, VK, or Telegram destination configured in the current markup

### Requirement: Floating contact controls
The homepage SHALL show floating contact controls for phone, VK, and Telegram, and SHALL hide them on mobile while the on-screen keyboard is active.

#### Scenario: Visitor uses quick contact buttons
- **WHEN** the visitor views the homepage without an active mobile keyboard
- **THEN** floating buttons provide quick access to phone, VK, and Telegram contact actions

#### Scenario: Mobile keyboard opens
- **WHEN** a mobile visitor focuses an editable field and the viewport indicates keyboard activity
- **THEN** the floating contact controls receive the keyboard-hidden state

### Requirement: Review links and cards
The homepage SHALL present Yandex review links for both office locations and a horizontal list of current static review cards.

#### Scenario: Visitor opens external reviews
- **WHEN** the visitor activates a Yandex reviews link
- **THEN** the browser opens the configured Yandex Maps reviews page for the selected office in a new tab or browsing context
