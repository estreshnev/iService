## Purpose

Describe the homepage service categories overview section that introduces the main repair and support areas before the trust/location content.

## Requirements

### Requirement: Second landing-page section
The homepage SHALL include a service categories section immediately after the hero section and before the existing trust/why-choose section.

#### Scenario: Visitor scrolls past the hero
- **WHEN** a visitor scrolls down from the hero section
- **THEN** the next major landing-page section presents the service categories overview before the existing trust/why-choose content

### Requirement: Five service category blocks
The service categories section SHALL present five large, distinct blocks for Apple repair, Apple unlocking, phones, laptops, and other equipment.

#### Scenario: Visitor scans service categories
- **WHEN** a visitor reaches the service categories section
- **THEN** the visitor can identify blocks for Apple repair, Apple unlocking, phones, laptops, and other equipment without opening another page or interacting with a form

### Requirement: Category block content
Each service category block SHALL include a clear heading and short supporting text that explains the category at a high level without listing full price data.

#### Scenario: Visitor reads a category block
- **WHEN** a visitor reads any service category block
- **THEN** the block communicates what type of work the category covers without presenting a detailed pricing table or exhaustive device list

### Requirement: Responsive and static presentation
The service categories section SHALL be implemented as static homepage content using the existing HTML/CSS approach and SHALL remain readable on desktop and mobile viewports.

#### Scenario: Visitor opens the section on mobile
- **WHEN** the visitor views the service categories section on a mobile viewport
- **THEN** each category block remains readable, does not overlap neighboring content, and fits within the viewport without horizontal scrolling

#### Scenario: Visitor opens the section on desktop
- **WHEN** the visitor views the service categories section on a desktop viewport
- **THEN** the category blocks are arranged as a scannable grouped layout consistent with the existing homepage design

### Requirement: No new runtime dependencies
The service categories section SHALL NOT require a new framework, package manager, back-end endpoint, external library, or price-list data change.

#### Scenario: Implementation is reviewed
- **WHEN** the implementation is inspected
- **THEN** the section is presentational static content that reuses the existing site stack and does not add new runtime dependencies

### Requirement: Optional anchor integration
The service categories section SHALL have a stable section id suitable for in-page scroll behavior and navigation linking.

#### Scenario: Section is linked by anchor
- **WHEN** the visitor opens or activates an anchor link targeting the service categories section
- **THEN** the page scrolls to the service categories section using the existing in-page section behavior
