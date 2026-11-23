import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react'

const slides = [
  { eyebrow: 'FOCUS NOTES', title: 'Make today count.', text: 'A little focus goes a long way.', task: 'Design landing page', progress: '45%' },
  { eyebrow: 'FOCUS NOTES', title: 'Small steps, big progress.', text: 'Keep your priorities in view.', task: 'Fix mobile navigation', progress: '70%' },
  { eyebrow: 'FOCUS NOTES', title: 'Celebrate the wins.', text: 'Every completed task moves you forward.', task: 'Review onboarding copy', progress: '100%' }
]

export default function FocusNotes() {
  const [active, setActive] = useState(0)
  const slide = slides[active]
  const move = (direction) => setActive((current) => (current + direction + slides.length) % slides.length)
  return <section className="focus-banner" aria-label="Focus notes carousel">
    <div className="focus-content"><div className="focus-meta"><span>{slide.eyebrow}</span><span>{String(active + 1).padStart(2,'0')} / 03</span></div>
      <h2>{slide.title}</h2><p>{slide.text}</p>
      <div className="focus-progress"><span/></div>
    </div>
    <div className="focus-preview"><div className="preview-check"><Check size={13}/></div><div><b>{slide.task}</b><small>Focus task</small></div><strong>{slide.progress}</strong></div>
    <div className="carousel-controls"><button aria-label="Previous focus note" onClick={() => move(-1)}><ChevronLeft size={17}/></button><button aria-label="Next focus note" onClick={() => move(1)}><ChevronRight size={17}/></button></div>
    <div className="carousel-dots" role="group" aria-label="Choose focus note">{slides.map((_, index) => <button key={index} className={active === index ? 'selected' : ''} aria-label={`Show slide ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}/>)}</div>
  </section>
}
