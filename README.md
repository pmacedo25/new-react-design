# React Architecture Starter

This repository is a generic starter that demonstrates how to structure a React project from scratch.
It is not meant to model a specific business domain. Instead, it shows a practical way to split code,
markup and CSS so the project stays understandable as it grows.

The main goal is clarity:

- `pages` own full screens
- `components` contain reusable sections
- `routes` own navigation
- `hooks` contain reusable logic
- `services` isolate async or external data access
- `stores` keep shared state
- `models` define contracts
- `theme` holds global design tokens
- page or component CSS stays close to the file that uses it

## Why this structure works

This template is built around a few rules:

1. Pages assemble complete screens.
2. Components are reusable pieces, not tiny fragments.
3. Reusable hooks live in `src/hooks`.
4. One-off logic can remain inside the page or component that owns it.
5. Shared state only goes into Redux when more than one part of the app benefits from it.
6. Styling can be local to a page or component, while theme variables stay global.

That means you can start small without creating unnecessary abstractions, while still having a
clear place for each responsibility.

## Current folder structure

```text
src
|-- components
|   |-- AppShell
|   |-- FeaturePanel
|   `-- StarterChecklist
|-- hooks
|   |-- useAppStore.ts
|   |-- useBlueprint.ts
|   `-- useDocumentTitle.ts
|-- models
|   `-- blueprint.ts
|-- pages
|   |-- HomePage.tsx
|   |-- HomePage.css
|   |-- ExamplesPage.tsx
|   `-- ExamplesPage.css
|-- routes
|   `-- index.tsx
|-- services
|   `-- blueprintService.ts
|-- stores
|   |-- slices
|   |   `-- preferences.ts
|   |-- helpers.ts
|   `-- index.ts
|-- theme
|   `-- tokens.css
|-- utils
|   |-- formatters.ts
|   `-- formatters.test.ts
|-- App.tsx
|-- index.css
`-- index.tsx
```

## What each folder should contain

### `src/routes`

Use this folder to declare navigation.

What belongs here:

- route registration
- shared layouts that wrap page rendering
- navigation maps

What should not live here:

- page business logic
- API calls
- large rendering logic that belongs to a page

### `src/pages`

Pages are complete screens. A page should be able to assemble the final experience by combining:

- reusable components
- page-local state
- reusable hooks
- services
- shared store state when needed

Keep one-off logic close to the page when reuse is unlikely. This template does that on purpose, so
the project does not become abstract too early.

### `src/components`

Components are reusable view sections.

Good examples:

- shell layouts
- reusable content panels
- repeated cards or section blocks

Avoid:

- creating a file for every tiny HTML element
- moving all JSX into components before reuse is clear

The page should still feel like the place that assembles the screen.

### `src/hooks`

Only reusable hooks should live here.

In this template:

- `useDocumentTitle` shows a simple reusable effect
- `useBlueprint` shows a reusable async data-loading hook
- `useAppStore` centralizes typed Redux hooks

If logic is only useful in one page, keep it in that page instead of promoting it to `src/hooks`.

### `src/services`

Services isolate async logic from rendering.

In this template, `blueprintService.ts` returns mocked data with a small async delay. In a real
project, this is where you can replace the mock with:

- `fetch`
- `axios`
- SDK calls
- adapter functions

The page should not care whether the data came from a mock or a real API.

### `src/stores`

Use the store for shared state only.

This template keeps a simple `preferences` slice with:

- highlighted section
- compact/comfortable view mode
- implementation tip visibility

It is enough to demonstrate:

- slice structure
- typed store setup
- persistence of shared preferences

Do not move every local state value into Redux.

### `src/models`

Use models to describe the contracts the UI expects.

This is useful because:

- services return typed data
- pages know what shape they receive
- components get predictable props

The UI becomes easier to refactor when the contract is explicit first.

### `src/theme`

Keep global design tokens here, such as:

- colors
- spacing scales
- shadows
- radii
- font stacks

In this template the local CSS files consume global tokens from `tokens.css`.

### `src/utils`

Use utilities for small, pure, reusable helpers.

The included formatter examples are intentionally simple. Their purpose is to show where generic,
framework-agnostic helpers should live.

## How to run the project

This repository intentionally keeps the setup simple and uses only `package.json` as the dependency
source of truth.

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Build for production:

```bash
npm run build
```

4. Run tests:

```bash
npm test -- --watchAll=false
```

5. Run TypeScript validation:

```bash
npm run typecheck
```

## How to use this starter for a new project

### Add a new page

1. Create a new page file in `src/pages`.
2. Add its CSS file next to it if the styling is page-specific.
3. Register the page inside `src/routes/index.tsx`.
4. Add or update navigation only if the screen should be reachable from the shell.

### Add a reusable component

1. Create a folder under `src/components`.
2. Put the `.tsx` file and its dedicated `.css` file together.
3. Pass data through props.
4. Keep fetching and route logic outside the component unless the component truly owns it.

### Add a reusable hook

1. Create the hook under `src/hooks`.
2. Give it a narrow API.
3. Move logic there only when more than one place benefits from reuse.

### Add a service

1. Create or extend a file under `src/services`.
2. Return typed data using contracts from `src/models`.
3. Keep request details out of pages and components.

### Add shared state

1. Create a slice under `src/stores/slices`.
2. Register it in `src/stores/index.ts`.
3. Persist only what is useful across screens or sessions.

### Add styling

Use this rule:

- global tokens and broad app defaults go to `src/theme` or `src/index.css`
- component-specific styles stay next to the component
- page-specific styles stay next to the page

This helps keep the ownership of styles obvious.

## What the included examples demonstrate

### Home page

Shows:

- a page assembling a full screen
- a local filter state that is specific to one page
- a reusable data-loading hook
- reusable components for repeated sections

### Examples page

Shows:

- how to consume Redux state
- how to dispatch shared UI preferences
- how a shared component can render differently based on store state

### Service + models

Shows:

- typed mock data
- a clean boundary between data source and UI

### Theme + local CSS

Shows:

- global tokens in `src/theme/tokens.css`
- local CSS files for pages and components

## Suggested next steps

If you want to extend this starter, the safest sequence is:

1. Add a real API service.
2. Add one feature page that consumes that service.
3. Extract reusable page sections into components only after repetition appears.
4. Add tests near utility logic first, then grow into page and component tests.

This keeps the project pragmatic while preserving the architecture.
