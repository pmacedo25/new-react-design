import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { appMetadata } from 'config/appMetadata'
import { NavigationItem } from 'models/blueprint'
import './AppShell.css'

interface AppShellProps {
  children: ReactNode
  navigation: NavigationItem[]
}

export const AppShell = ({ children, navigation }: AppShellProps) => {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__content">
          <div className="app-shell__brand">
            <p className="app-shell__eyebrow">{appMetadata.shortLabel}</p>
            <h1>{appMetadata.tagline}</h1>
            <p>{appMetadata.description}</p>
          </div>

          <nav className="app-shell__nav" aria-label="Primary">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                end={item.path === '/'}
                to={item.path}
                className={({ isActive }) =>
                  `app-shell__nav-item${isActive ? ' app-shell__nav-item--active' : ''}`
                }
              >
                <span>{item.label}</span>
                <small>{item.description}</small>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <div className="app-shell__page">{children}</div>
    </div>
  )
}
