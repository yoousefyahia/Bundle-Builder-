# Frontend Take-Home Bundle Builder

A React prototype for building a customizable security system through a multi-step bundle builder with a live review panel.

## Overview

This project recreates the provided Figma design as a responsive and interactive bundle builder experience.

Users can configure their security system by selecting products, choosing variants, adjusting quantities, and viewing a live summary of their selected items and total price.

---

## Features

### Bundle Builder

- Four-step accordion flow:
  - Choose your cameras
  - Choose your plan
  - Choose your sensors
  - Add extra protection

- Step navigation and expandable/collapsible sections
- Selected product count for each step
- Active and inactive step states

---

## Product Selection

Each product card supports:

- Product image
- Product information
- Optional discount badge
- Variant selection when available
- Quantity controls
- Pricing with compare-at prices
- Selected and unselected states

---

## Variant Handling

Products with multiple variants support independent quantity tracking.

Each variant is treated as a separate item, allowing users to select different colors or options with different quantities.

The selected variants are reflected individually in the review panel.

---

## Live Review Panel

The review section updates automatically based on user selections.

It includes:

- Selected items grouped by category:
  - Cameras
  - Sensors
  - Accessories
  - Plan

- Product quantities
- Pricing details
- Shipping information
- Guarantee information
- Financing details
- Total price calculation
- Savings information

---

## Persistence

The "Save my system for later" feature stores the user's current configuration locally.

When returning to the application, the previous setup can be restored.

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

---

## Project Approach

The application was built using reusable React components and a data-driven approach.

Products and variants are managed through structured data, allowing the UI to render dynamically instead of relying on hardcoded product layouts.

---

## Responsive Design

The interface is optimized for:

- Desktop layouts matching the provided design
- Tablet screens
- Mobile devices with a stacked layout

---

## Decisions & Trade-offs

- Local JSON data was used instead of a backend API since an API was not required.
- React state management was sufficient for the current application scope.
- Focus was placed on UI accuracy, reusable components, and smooth interactions.
- Checkout functionality is implemented as a prototype action only.

---

## Future Improvements

Possible improvements:

- Connect products and saved systems to a backend API
- Add authentication and user accounts
- Implement a complete checkout flow
- Add automated testing
