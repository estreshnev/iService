## Purpose

Describe the current repair price lookup baseline, including data loading, generated fallback data, and request-only behavior.

## Requirements

### Requirement: Hero repair price lookup
The homepage SHALL provide a hero price-check widget that lets visitors search for a device, select a device from grouped options, and request available repair prices for the selected model.

#### Scenario: Visitor searches for a device
- **WHEN** the visitor focuses or types in the device search field
- **THEN** the widget opens a grouped list of matching devices derived from the loaded repair price entries

#### Scenario: Visitor selects a device and checks prices
- **WHEN** the visitor selects a device and activates the price-check button
- **THEN** the widget renders the device category, model, and matching repair service rows with price or request actions

### Requirement: Price-list data sources
The price-check widget SHALL load repair price data from `config/price-list.csv` when served over HTTP(S), and SHALL fall back to generated runtime data from `config/price-list.js` when CSV loading is unavailable.

#### Scenario: CSV can be fetched
- **WHEN** the page is served over a protocol that allows fetching `config/price-list.csv` and the response contains valid entries
- **THEN** the widget uses the CSV-derived entries for device options and price results

#### Scenario: CSV cannot be fetched
- **WHEN** CSV fetching is unavailable, fails, or returns no valid entries
- **THEN** the widget loads `config/price-list.js` and uses `window.ISERVICE_PRICE_LIST` when valid entries are present

### Requirement: Price-list generation
The repository SHALL treat `config/price-list.csv` as the editable source for repair price data and `config/price-list.js` as generated runtime fallback data produced by `scripts/build-price-list.rb`.

#### Scenario: Price list fallback is regenerated
- **WHEN** `ruby scripts/build-price-list.rb` is run after editing the CSV
- **THEN** `config/price-list.js` is regenerated as a `window.ISERVICE_PRICE_LIST` assignment containing normalized entries with category, model, service, and price fields

### Requirement: Unknown or request-only prices
The price-check widget SHALL guide visitors to the VK contact channel when a device is not found or when a price is blank, missing, dash-only, or marked as request-only.

#### Scenario: Visitor enters an unknown device
- **WHEN** the visitor searches for a device that has no matching loaded entries and requests a price
- **THEN** the widget shows an explanatory message and a link to ask for the repair price through VK

#### Scenario: Price is request-only
- **WHEN** a matching repair service has a blank, dash-only, or request-only price value
- **THEN** the service row displays "Цена по запросу" and links the action to VK

### Requirement: Responsive price-check placement
The price-check widget SHALL move between the desktop hero slot and mobile hero slot based on the current viewport width.

#### Scenario: Viewport crosses mobile breakpoint
- **WHEN** the viewport changes across the configured mobile breakpoint
- **THEN** the same price-check widget is moved to the appropriate hero slot without duplicating the widget
