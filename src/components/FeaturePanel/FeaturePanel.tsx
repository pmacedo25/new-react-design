import { StructureExample } from 'models/blueprint'
import { startCaseFromPath } from 'utils/formatters'
import './FeaturePanel.css'

interface FeaturePanelProps {
  example: StructureExample
  isHighlighted?: boolean
  showImplementationTip?: boolean
  compact?: boolean
}

export const FeaturePanel = ({
  example,
  isHighlighted = false,
  showImplementationTip = true,
  compact = false,
}: FeaturePanelProps) => {
  return (
    <article className={`feature-panel ${isHighlighted ? 'feature-panel--highlighted' : ''}`}>
      <div className="feature-panel__heading">
        <span className="feature-panel__folder">{example.folder}</span>
        <h3>{example.title}</h3>
        <p>{example.summary}</p>
      </div>

      <div className={`feature-panel__body ${compact ? 'feature-panel__body--compact' : ''}`}>
        <section>
          <h4>Responsibilities</h4>
          <ul>
            {example.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4>Folder label</h4>
          <p>{startCaseFromPath(example.folder)}</p>
        </section>
      </div>

      {showImplementationTip ? (
        <div className="feature-panel__tip">
          <strong>Implementation tip:</strong> {example.implementationTip}
        </div>
      ) : null}
    </article>
  )
}
