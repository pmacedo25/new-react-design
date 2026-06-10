import { FeaturePanel } from 'components/FeaturePanel/FeaturePanel'
import { useAppDispatch, useAppSelector } from 'hooks/useAppStore'
import { useBlueprint } from 'hooks/useBlueprint'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import { preferencesActions } from 'stores/slices/preferences'
import './ExamplesPage.css'

export const ExamplesPage = () => {
  useDocumentTitle('React Architecture Starter | Examples')

  const { data, isLoading } = useBlueprint()
  const dispatch = useAppDispatch()
  const preferences = useAppSelector((state) => state.preferences)

  if (isLoading || !data) {
    return <main className="examples-page"><p>Loading examples...</p></main>
  }

  return (
    <main className="examples-page">
      <section className="examples-page__controls">
        <div>
          <p className="examples-page__eyebrow">Store example</p>
          <h2>Shared preferences live in Redux</h2>
          <p>
            This page uses the store to keep a highlighted section, a compact mode and the
            visibility of implementation tips across the screen.
          </p>
        </div>

        <div className="examples-page__toolbar">
          <label>
            <span>Highlighted section</span>
            <select
              value={preferences.highlightedSection}
              onChange={(event) =>
                dispatch(preferencesActions.setHighlightedSection(event.target.value))
              }
            >
              {data.structure.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Layout density</span>
            <select
              value={preferences.viewMode}
              onChange={(event) =>
                dispatch(
                  preferencesActions.setViewMode(
                    event.target.value as 'comfortable' | 'compact'
                  )
                )
              }
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => dispatch(preferencesActions.toggleImplementationTips())}
          >
            {preferences.showImplementationTips ? 'Hide tips' : 'Show tips'}
          </button>
        </div>
      </section>

      <section className="examples-page__grid">
        {data.structure.map((item) => (
          <FeaturePanel
            key={item.id}
            example={item}
            compact={preferences.viewMode === 'compact'}
            isHighlighted={preferences.highlightedSection === item.id}
            showImplementationTip={preferences.showImplementationTips}
          />
        ))}
      </section>
    </main>
  )
}
