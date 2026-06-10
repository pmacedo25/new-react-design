import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
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
            <p className="app-shell__eyebrow">React starter</p>
            <h1>Architecture by structure, not by accident</h1>
            <p>
              A lean template showing how to split screens, reusable sections, services, hooks,
              store and CSS from the beginning.
            </p>
          </div>

          <nav className="app-shell__nav" aria-label="Primary">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                exact={item.path === '/'}
                to={item.path}
                className="app-shell__nav-item"
                activeClassName="app-shell__nav-item--active"
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
