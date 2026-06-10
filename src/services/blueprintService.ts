import { BlueprintContent } from 'models/blueprint'

const blueprintContent: BlueprintContent = {
  heroTitle: 'A starter project focused on structure before scale',
  heroDescription:
    'This template demonstrates how to organize a React codebase from day one. The examples are intentionally generic, so the folder decisions are easy to reuse in any product.',
  principles: [
    'Pages assemble complete screens.',
    'Components are reusable building blocks, not tiny fragments.',
    'Reusable hooks live in the global hooks folder.',
    'Single-use logic can stay inside the page or component that owns it.',
    'CSS can be local to a page or component, while theme tokens stay global.',
  ],
  structure: [
    {
      id: 'routes',
      title: 'Routes',
      folder: 'src/routes',
      summary: 'Own navigation and decide which page should render for each URL.',
      responsibilities: [
        'Centralize route definitions',
        'Wrap pages with shared layout',
        'Keep route concerns out of page internals',
      ],
      implementationTip:
        'When a new screen appears, register the route here first and then let the page own the screen composition.',
    },
    {
      id: 'pages',
      title: 'Pages',
      folder: 'src/pages',
      summary: 'Assemble a full screen using services, store, local state and reusable components.',
      responsibilities: [
        'Own the page-level loading and empty states',
        'Compose reusable sections into a complete screen',
        'Keep one-off logic close to the screen when reuse is unlikely',
      ],
      implementationTip:
        'If a page becomes too large, split reusable sections into components rather than moving all logic away immediately.',
    },
    {
      id: 'components',
      title: 'Components',
      folder: 'src/components',
      summary: 'Contain reusable view pieces with their own focused CSS.',
      responsibilities: [
        'Render repeatable UI sections',
        'Receive data by props instead of fetching it directly',
        'Keep markup and CSS close together',
      ],
      implementationTip:
        'Avoid ultra-small components. Prefer components that represent meaningful reusable sections of the UI.',
    },
    {
      id: 'hooks',
      title: 'Hooks',
      folder: 'src/hooks',
      summary: 'Hold reusable logic that can support multiple pages or components.',
      responsibilities: [
        'Encapsulate effects and state transitions',
        'Expose clean APIs to pages and components',
        'Reduce duplication without hiding ownership',
      ],
      implementationTip:
        'If a hook is only useful for one screen, keep the logic near that screen instead of promoting it too early.',
    },
    {
      id: 'services',
      title: 'Services',
      folder: 'src/services',
      summary: 'Wrap async data access and keep data-fetching decisions out of the UI tree.',
      responsibilities: [
        'Provide data for pages',
        'Keep API or mock details isolated',
        'Return UI-friendly contracts through typed models',
      ],
      implementationTip:
        'Start with mock services like this template and replace the internals with real HTTP calls later without rewriting the page.',
    },
    {
      id: 'store',
      title: 'Store',
      folder: 'src/stores',
      summary: 'Persist cross-page UI preferences and global state that multiple screens need.',
      responsibilities: [
        'Keep shared state in slices',
        'Persist only what is useful between sessions',
        'Expose typed selectors and dispatch helpers',
      ],
      implementationTip:
        'Do not move every state variable into Redux. Keep local state inside the page until it truly becomes shared.',
    },
  ],
  starterSteps: [
    {
      title: '1. Add a route',
      description: 'Create the page first, then register it in the router and link it from the shell if needed.',
    },
    {
      title: '2. Define the page contract',
      description: 'Use models to describe the data that the page needs before wiring the implementation details.',
    },
    {
      title: '3. Add a service',
      description: 'Keep fetching or mock logic away from the JSX so the page stays easy to scan.',
    },
    {
      title: '4. Extract reusable sections',
      description: 'Only create components when a section is reusable or meaningfully improves the page structure.',
    },
  ],
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getBlueprintContent = async (): Promise<BlueprintContent> => {
  await wait(150)
  return blueprintContent
}
