import { useMemo, useState } from 'react'
import { FeaturePanel } from 'components/FeaturePanel/FeaturePanel'
import { StarterChecklist } from 'components/StarterChecklist/StarterChecklist'
import { useBlueprint } from 'hooks/useBlueprint'
import { useDocumentTitle } from 'hooks/useDocumentTitle'
import './HomePage.css'

export const HomePage = () => {
  useDocumentTitle('React Architecture Starter | Home')

  const { data, isLoading } = useBlueprint()
  const [search, setSearch] = useState('')

  const filteredStructure = useMemo(() => {
    if (!data) {
      return []
    }

    return data.structure.filter((item) => {
      const target = `${item.title} ${item.folder} ${item.summary}`.toLowerCase()
      return target.includes(search.toLowerCase())
    })
  }, [data, search])

  if (isLoading || !data) {
    return <main className="page"><p>Loading starter content...</p></main>
  }

  return (
    <main className="page">
      <section className="page__hero">
        <div>
          <p className="page__eyebrow">Project starter</p>
          <h2>{data.heroTitle}</h2>
          <p className="page__lead">{data.heroDescription}</p>
        </div>

        <aside className="page__principles">
          <h3>Key architecture rules</h3>
          <ul>
            {data.principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="page__section">
        <div className="page__section-header">
          <div>
            <p className="page__eyebrow">Folder guide</p>
            <h3>What each part of the project owns</h3>
          </div>

          <label className="page__search">
            <span>Filter examples</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try pages, hooks, store..."
            />
          </label>
        </div>

        <div className="page__grid">
          {filteredStructure.map((example) => (
            <FeaturePanel key={example.id} example={example} />
          ))}
        </div>
      </section>

      <section className="page__section">
        <div className="page__section-header">
          <div>
            <p className="page__eyebrow">Quick start</p>
            <h3>The minimum path to add a new feature</h3>
          </div>
        </div>

        <StarterChecklist steps={data.starterSteps} />
      </section>
    </main>
  )
}
