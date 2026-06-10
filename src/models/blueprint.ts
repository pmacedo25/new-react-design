export interface NavigationItem {
  label: string
  path: string
  description: string
}

export interface StructureExample {
  id: string
  title: string
  folder: string
  summary: string
  responsibilities: string[]
  implementationTip: string
}

export interface StarterStep {
  title: string
  description: string
}

export interface BlueprintContent {
  heroTitle: string
  heroDescription: string
  principles: string[]
  structure: StructureExample[]
  starterSteps: StarterStep[]
}

export type ViewMode = 'comfortable' | 'compact'

export interface PreferencesState {
  highlightedSection: string
  showImplementationTips: boolean
  viewMode: ViewMode
}
