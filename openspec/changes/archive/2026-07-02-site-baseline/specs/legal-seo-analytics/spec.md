## ADDED Requirements

### Requirement: Legal documents
The site SHALL provide standalone legal pages for privacy policy, personal data processing consent, and public offer, each with Russian-language content, canonical URL, update date, Yandex.Metrika snippet, and contact information where applicable.

#### Scenario: Visitor opens legal links
- **WHEN** the visitor opens the footer legal links
- **THEN** the site provides `policy.html`, `consent.html`, and `offer.html` as standalone documents

### Requirement: Search discovery files
The site SHALL provide `robots.txt` allowing crawling and pointing to the sitemap, and `sitemap.xml` listing the homepage and current legal pages.

#### Scenario: Search crawler reads discovery files
- **WHEN** a crawler requests `robots.txt` and `sitemap.xml`
- **THEN** the files identify the sitemap URL and list the homepage, privacy policy, consent page, and public offer page

### Requirement: Homepage structured data
The homepage SHALL include LocalBusiness JSON-LD describing iService, primary contact information, service area, social/map profiles, and the two office departments.

#### Scenario: Search engine reads homepage metadata
- **WHEN** a search engine parses the homepage head
- **THEN** it can find LocalBusiness structured data with organization-level and department-level information

### Requirement: Analytics tracking
The current public pages SHALL include the Yandex.Metrika counter initialization and noscript tracking image using the configured counter id.

#### Scenario: Analytics script loads
- **WHEN** a public page is opened with JavaScript enabled and network access to Yandex.Metrika is available
- **THEN** the page initializes the configured Yandex.Metrika counter with clickmap, referrer, URL, bounce, and link tracking options

#### Scenario: JavaScript is disabled
- **WHEN** a public page is opened with JavaScript disabled
- **THEN** the page includes the noscript Yandex.Metrika tracking image
