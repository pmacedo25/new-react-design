# Contributing

Thank you for contributing to this starter.

The goal of this repository is to stay simple, readable and useful as a public reference for
structuring React projects. Contributions should preserve that goal.

## Before opening a pull request

Please make sure your changes:

- keep the architecture easy to understand
- avoid unnecessary abstraction
- preserve the separation between routes, pages, components, hooks, services, store and theme
- do not add dependencies unless they clearly improve the starter
- keep examples generic and reusable

## Development setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Validate the project before submitting changes:

```bash
npm run build
npm test
npm run typecheck
```

## Contribution guidelines

### Architecture

Please follow the repository structure:

- `src/routes` for navigation ownership
- `src/pages` for full-screen composition
- `src/components` for reusable UI sections
- `src/hooks` for reusable logic
- `src/services` for async and external data access
- `src/stores` for shared state
- `src/models` for typed contracts
- `src/theme` for global design tokens
- local CSS next to the page or component that owns it

### Components

- Prefer meaningful reusable sections over micro-components.
- Keep data fetching outside of presentational components when possible.
- Keep component APIs typed and prop-driven.

### Hooks

- Add a hook to `src/hooks` only when reuse is real.
- Keep one-off logic inside the page or component that owns it.

### Store

- Add Redux state only when it is genuinely shared.
- Avoid moving local UI state into the store too early.

### Styling

- Keep page styles in the page folder.
- Keep component styles in the component folder.
- Put only global tokens and global defaults in `src/theme` and `src/index.css`.

## Pull request expectations

A good pull request for this repository should:

- explain what changed
- explain why the change improves the starter
- mention any tradeoffs
- keep scope focused

If you add a new example, include enough context that a new user can understand why it exists and
how it demonstrates the architecture.

## What to avoid

Please avoid:

- business-domain-specific examples unless they are easy to generalize
- adding large libraries for small conveniences
- converting the starter into a highly opinionated framework
- introducing patterns that make the repository harder to teach
