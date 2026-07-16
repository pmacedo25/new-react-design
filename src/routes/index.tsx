import { Route, Routes } from 'react-router-dom'
import { AppShell } from 'components/AppShell/AppShell'
import { NavigationItem } from 'models/blueprint'
import { ExamplesPage } from 'pages/ExamplesPage'
import { HomePage } from 'pages/HomePage'

const navigation: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
    description: 'Why this starter exists and how the folders work together.',
  },
  {
    label: 'Examples',
    path: '/examples',
    description: 'Practical examples for pages, components, hooks, services and store.',
  },
]

export const AppRoutes = () => {
  return (
    <AppShell navigation={navigation}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/examples" element={<ExamplesPage />} />
      </Routes>
    </AppShell>
  )
}
