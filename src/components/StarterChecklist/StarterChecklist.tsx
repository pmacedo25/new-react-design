import { StarterStep } from 'models/blueprint'
import { shortenList } from 'utils/formatters'
import './StarterChecklist.css'

interface StarterChecklistProps {
  steps: StarterStep[]
}

export const StarterChecklist = ({ steps }: StarterChecklistProps) => {
  return (
    <div className="starter-checklist">
      {shortenList(steps, 4).map((step) => (
        <article key={step.title} className="starter-checklist__item">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  )
}
