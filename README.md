# React Architecture Starter

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-Configured-764abc?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React%20Router-7-ca4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

A public-friendly React starter focused on one thing: **keeping project structure clear from day one**.

This repository is intentionally generic. It does not model a specific business domain. Instead, it
shows how to organize a React + TypeScript codebase so future contributors can quickly understand:

- where routes live
- where pages live
- where reusable UI lives
- where shared logic lives
- where state lives
- where styles should be written

## Why this starter exists

Many starters solve tooling. This one is more focused on **organization and maintainability**.

It demonstrates a practical approach where:

- `pages` own complete screens
- `components` are reusable sections, not tiny fragments
- `routes` own navigation
- `hooks` contain reusable logic
- `services` isolate async work and external data access
- `stores` keep shared application state
- `models` define contracts between layers
- `theme` stores global design tokens
- page and component CSS stay close to the file that uses them

That makes this repository a good fit for people who want a starter that is easy to **read, teach,
adapt and publish**.

## Who this repository is for

This starter is useful if you want to:

- bootstrap a React project with a clean structure
- use TypeScript without overengineering the folder layout
- keep CSS organized by ownership
- show teammates how the project is expected to grow
- publish a repository that others can clone and reuse

It is especially helpful if your preferred architecture is:

- pages assembling the complete experience
- reusable components representing meaningful UI chunks
- reusable hooks promoted globally only when reuse is real
- shared state kept small and deliberate

## Core architecture rules

This repository follows a few strong rules on purpose:

1. Pages compose full screens.
2. Components are reusable sections, not wrappers for every HTML tag.
3. Reusable hooks live in `src/hooks`.
4. One-off logic can remain inside the page or component that owns it.
5. Shared state goes into Redux only when more than one area benefits from it.
6. CSS can be local to a page or component, while design tokens stay global.
7. Services hide async details from the UI.
8. Models define the contracts shared between services, pages, components and store.

This keeps the project approachable without forcing enterprise-style ceremony too early.

## Highlights

- Clear ownership-based folder structure
- Global theme tokens with local component/page CSS
- Reusable hooks and shared store examples
- Mock async service layer ready to be replaced by real APIs
- Public-friendly documentation and simple onboarding flow

## Demo and screenshots

When this repository becomes public, this section is a good place to add:

- a live demo URL
- a screenshot of the home page
- a screenshot of the examples page
- a short GIF showing navigation and Redux preference updates

Suggested snippet:

```md
## Demo

Live demo: https://your-demo-url.example

![Home screenshot](./docs/screenshots/home.png)
![Examples screenshot](./docs/screenshots/examples.png)
```

A placeholder folder already exists at [`docs/screenshots`](./docs/screenshots/README.md) so the
repository is ready for public-facing assets later.

## Repository structure

```text
.
|-- docs
|   `-- screenshots
|-- public
|   |-- favicon.ico
|   |-- logo192.png
|   |-- logo512.png
|   |-- manifest.json
|   `-- robots.txt
|-- scripts
|   `-- bootstrap.cjs
|-- src
|   |-- components
|   |   |-- AppShell
|   |   |-- FeaturePanel
|   |   `-- StarterChecklist
|   |-- hooks
|   |   |-- useAppStore.ts
|   |   |-- useBlueprint.ts
|   |   `-- useDocumentTitle.ts
|   |-- models
|   |   `-- blueprint.ts
|   |-- pages
|   |   |-- HomePage.tsx
|   |   |-- HomePage.css
|   |   |-- ExamplesPage.tsx
|   |   `-- ExamplesPage.css
|   |-- routes
|   |   `-- index.tsx
|   |-- services
|   |   `-- blueprintService.ts
|   |-- stores
|   |   |-- slices
|   |   |   `-- preferences.ts
|   |   |-- helpers.ts
|   |   `-- index.ts
|   |-- theme
|   |   `-- tokens.css
|   |-- utils
|   |   |-- formatters.ts
|   |   `-- formatters.test.ts
|   |-- vite-env.d.ts
|   |-- App.tsx
|   |-- index.css
|   `-- index.tsx
|-- index.html
|-- tsconfig.json
`-- vite.config.ts
```

## How to run the repository

This project uses `package.json` as the dependency source of truth.

Recommended runtime:

- Node.js 20.19 or newer
- npm 10 or newer

### Install dependencies

```bash
npm install
```

### Bootstrap a new project from this starter

```bash
npm run bootstrap
```

The bootstrap command customizes the starter metadata for a new project and updates:

- `package.json` package name and description
- `index.html` document title
- `src/config/appMetadata.ts` app-level branding copy used by the shell and examples

You can also run it non-interactively with defaults:

```bash
npm run bootstrap -- --yes
```

Or preview the changes without writing files:

```bash
npm run bootstrap -- --dry-run
```

### Start the development server

```bash
npm start
```

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test
```

### Run TypeScript validation

```bash
npm run typecheck
```

## Dependency notes

Runtime dependencies are intentionally small:

- React and React DOM for rendering
- React Router for navigation
- Redux Toolkit and React Redux for the shared preferences example

Development dependencies cover the Vite build toolchain, Vitest and TypeScript validation. The
project no longer depends on `react-scripts`, so TypeScript and Node types can stay on their current
major versions.

Packages such as component libraries, styling runtimes, date libraries and DOM testing helpers are
not included until the project has code that actually uses them.

Build output is written to `dist`, which is ignored by git.

## How to use this repository as a starter

The simplest adoption flow is:

1. Clone or copy the repository.
2. Run `npm run bootstrap` to customize the project metadata.
3. Replace the starter texts and example content with your own domain.
4. Add or rename pages based on your product navigation.
5. Replace the mock service with real API logic when needed.
6. Keep reusable sections in `components` and one-off assembly inside `pages`.
7. Add Redux slices only for state that is actually shared.

If you are building a real project on top of this starter, a good order is:

1. routes
2. pages
3. services
4. models
5. reusable components
6. shared store
7. public branding and README polish

That order keeps the project grounded in the user experience instead of abstractions.

## Folder-by-folder guide

### `src/index.tsx`

This is the application entry point.

Use it for:

- creating the React root
- mounting `<App />`
- loading global CSS

Avoid putting application logic here.

### `index.html`

This is the Vite HTML entry point.

Use it for:

- document metadata
- root mounting element
- static links to files in `public`
- loading `/src/index.tsx`

The bootstrap script updates the document title here.

### `src/App.tsx`

This is the app composition root.

Use it for:

- top-level providers
- router setup
- global subscriptions such as persisted store state

In this starter, `App.tsx` wraps the application with Redux and `BrowserRouter`, then renders the
route tree.

### `src/config`

This folder is for application-level configuration that is not itself domain data.

In this starter:

- [`src/config/appMetadata.ts`](./src/config/appMetadata.ts) stores product name, tagline and description used by the UI shell and starter examples.

This file is the main target of the bootstrap command.

### `src/routes`

This folder owns navigation.

What belongs here:

- route declarations
- route-to-page mapping
- route-level wrappers or shared shells
- navigation configuration

What should not live here:

- page-specific business logic
- data fetching
- large view sections that belong to a page

In this repository, [`src/routes/index.tsx`](./src/routes/index.tsx) defines the React Router route
list and passes navigation items to the shared shell.

### `src/pages`

Pages are complete screens.

A page should:

- assemble reusable components
- hold page-local state
- call reusable hooks
- request data from services
- read shared state when necessary

A page should not:

- act as a giant dumping ground for every reusable section
- move logic out too early just for the sake of abstraction

In this repository:

- [`src/pages/HomePage.tsx`](./src/pages/HomePage.tsx) shows a page with local state (`search`), a reusable async hook and repeated reusable panels.
- [`src/pages/ExamplesPage.tsx`](./src/pages/ExamplesPage.tsx) shows a page consuming shared Redux state and dispatching actions.

Page CSS stays next to the page:

- [`src/pages/HomePage.css`](./src/pages/HomePage.css)
- [`src/pages/ExamplesPage.css`](./src/pages/ExamplesPage.css)

### `src/components`

This folder stores reusable view sections.

The main rule here is:

- create components for meaningful reusable sections
- do not create components for every small element

That keeps pages readable without turning the project into a maze of micro-components.

Current example components:

#### `AppShell`

[`src/components/AppShell/AppShell.tsx`](./src/components/AppShell/AppShell.tsx)

Purpose:

- shared application shell
- brand header
- primary navigation
- page content wrapper

Use a component like this when multiple pages should live inside the same global frame.

CSS:

- [`src/components/AppShell/AppShell.css`](./src/components/AppShell/AppShell.css)

#### `FeaturePanel`

[`src/components/FeaturePanel/FeaturePanel.tsx`](./src/components/FeaturePanel/FeaturePanel.tsx)

Purpose:

- render one reusable architecture card
- accept a typed model through props
- support presentation variants like highlight and compact mode

This is a good example of a reusable section component: it is meaningful, typed and easy to reuse.

CSS:

- [`src/components/FeaturePanel/FeaturePanel.css`](./src/components/FeaturePanel/FeaturePanel.css)

#### `StarterChecklist`

[`src/components/StarterChecklist/StarterChecklist.tsx`](./src/components/StarterChecklist/StarterChecklist.tsx)

Purpose:

- render a short list of implementation steps
- reuse formatting logic from `utils`

CSS:

- [`src/components/StarterChecklist/StarterChecklist.css`](./src/components/StarterChecklist/StarterChecklist.css)

### `src/hooks`

Only reusable hooks should live here.

If logic is only useful for one screen, keep it inside that page or component until reuse becomes
real.

Current example hooks:

#### `useDocumentTitle`

[`src/hooks/useDocumentTitle.ts`](./src/hooks/useDocumentTitle.ts)

Purpose:

- simple reusable side effect
- keeps title logic out of pages

#### `useBlueprint`

[`src/hooks/useBlueprint.ts`](./src/hooks/useBlueprint.ts)

Purpose:

- reusable async loading hook
- centralizes `loading + data` handling for the starter content

This is a good example of a hook that deserves to be global because more than one page uses it.

#### `useAppStore`

[`src/hooks/useAppStore.ts`](./src/hooks/useAppStore.ts)

Purpose:

- typed Redux helpers
- avoids repeating `TypedUseSelectorHook` and dispatch typing everywhere

### `src/services`

Services isolate async work from rendering.

Use this folder for:

- API calls
- mock data providers
- adapters around SDKs
- async workflows that pages should not own directly

In this starter:

- [`src/services/blueprintService.ts`](./src/services/blueprintService.ts) returns mock async content for the repository examples.

Why this matters:

- pages stay focused on composition
- components stay focused on rendering
- switching from mock data to real API data becomes easier

### `src/models`

Models define the contracts the UI relies on.

Use this folder for:

- page data shapes
- component input models
- service response contracts
- shared state types

In this starter:

- [`src/models/blueprint.ts`](./src/models/blueprint.ts) defines the content models used by the service, pages, components and store.

This is one of the most useful habits in the repository. It makes the boundaries between layers
much easier to understand.

### `src/stores`

This folder contains Redux configuration and shared state.

Use the store only when state is genuinely shared or should survive across screens.

Files in this starter:

#### `src/stores/index.ts`

Purpose:

- combine reducers
- create the store
- expose typed store types

#### `src/stores/helpers.ts`

Purpose:

- persist selected state to local storage
- load persisted state on boot

The starter intentionally persists only `preferences`, not the whole app state.

#### `src/stores/slices/preferences.ts`

Purpose:

- store shared UI preferences
- demonstrate a clean slice setup

Current example state:

- highlighted section
- implementation tip visibility
- comfortable or compact layout mode

This slice is intentionally simple, but it is enough to demonstrate how to structure shared state.

### `src/theme`

This folder stores global design tokens.

Use it for:

- colors
- spacing scales
- radii
- shadows
- typography tokens

In this starter:

- [`src/theme/tokens.css`](./src/theme/tokens.css) defines reusable CSS variables used by pages and components.

This is the right place for global visual language, while local CSS stays next to the feature that
uses it.

### `src/utils`

Utilities should be small, pure and framework-agnostic when possible.

In this starter:

- [`src/utils/formatters.ts`](./src/utils/formatters.ts) contains small reusable helpers.
- [`src/utils/formatters.test.ts`](./src/utils/formatters.test.ts) shows the simplest useful test shape for utility code.

This is a good place for:

- formatters
- parsers
- list helpers
- string helpers

This is not the right place for:

- JSX
- React hooks
- service orchestration

### `src/index.css`

This file contains app-wide CSS defaults.

Use it for:

- resets
- global element defaults
- importing theme tokens

Do not use it as a dumping ground for page-specific styles.

### `vite.config.ts`

This file configures Vite.

In this starter it:

- enables React support with `@vitejs/plugin-react`
- preserves the absolute import aliases used by the source folders

### `tsconfig.json`

This file configures TypeScript validation.

It keeps strict mode enabled and maps the same folder aliases used by Vite, so imports such as
`components/AppShell/AppShell` and `stores` work in both the dev server and type checker.

### `src/vite-env.d.ts`

This file loads Vite client types, including support for CSS side-effect imports.

## What the repository demonstrates in practice

### Home page example

The home page demonstrates:

- page-level composition
- local page state
- reusable hook usage
- reusable components rendered in a repeated list
- a page-specific stylesheet

### Examples page example

The examples page demonstrates:

- consuming Redux state
- dispatching slice actions
- rendering the same component with different presentation states
- keeping page-specific CSS close to the page

### Shared shell example

The app shell demonstrates:

- one layout component wrapping multiple pages
- navigation owned by the routing layer
- a reusable frame around page content

### Service and models example

The service plus model layer demonstrates:

- typed mock content
- a clean separation between data source and UI
- how pages and components can stay stable even if the service implementation changes later

## Recommended workflow when adding new features

### Add a new page

1. Create a new page under `src/pages`.
2. Add a page CSS file if the page needs dedicated styling.
3. Register the route in `src/routes/index.tsx`.
4. Add navigation only if that page should be reachable from the shell.

### Add a reusable component

1. Create a folder under `src/components`.
2. Put the component and CSS file together.
3. Keep the API prop-based and typed.
4. Move only meaningful reusable sections into components.

### Add a reusable hook

1. Start with logic inside the page or component.
2. Promote it to `src/hooks` only when reuse is clear.
3. Keep the hook API narrow and predictable.

### Add a service

1. Define or update the model contract.
2. Add the async logic under `src/services`.
3. Keep network or mock details away from the page JSX.

### Add shared state

1. Ask whether the state is truly shared.
2. If yes, create a slice in `src/stores/slices`.
3. Register it in `src/stores/index.ts`.
4. Persist only the part that should survive refreshes.

### Add styling

Follow this ownership rule:

- global visual tokens go to `src/theme`
- app-wide defaults go to `src/index.css`
- page styling stays next to the page
- component styling stays next to the component

This repository strongly favors ownership-based CSS instead of one large global stylesheet.

## Suggested public repository additions

If this repository will become public, these are strong improvements to add next:

1. Add screenshots under `docs/screenshots`.
2. Add a live demo link if you deploy it.
3. Add a changelog once the starter begins to evolve.
4. Add issue templates if you want community contributions.
5. Add CI status badges once automated checks are published.

## FAQ

### Why use pages plus components instead of only components?

Because pages represent full screens and give you a natural place for assembly, local state and
screen-specific decisions. Components stay focused on reusable sections.

### Why keep some logic inside a page instead of making every hook global?

Because reuse should be earned. Promoting everything too early creates indirection without real
benefit.

### Why keep CSS next to pages and components?

Because ownership stays obvious. When a page changes, you know where its styles live.

### Why include Redux in a starter?

Because many teams need shared state eventually, and this repository demonstrates a small, readable
Redux setup without making the whole project depend on it for every state value.

## Summary

This repository is meant to be copied, adapted and understood quickly.

If someone opens it for the first time, they should be able to answer:

- where routes live
- where pages live
- where reusable UI sections live
- where reusable hooks live
- where shared state lives
- where mock or real data access lives
- where local CSS should be written

That clarity is the main value of this starter.

## License

This repository currently includes the [MIT License](./LICENSE).
