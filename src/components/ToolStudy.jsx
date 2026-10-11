import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useRef, useState } from 'react'

// Actual tools, illustrative lightweight workflows. Active on hover/focus/tap; no fake software embed.
export default function ToolStudy({ tool }) {
  const { t } = useLanguage()
  const root = useRef(null)
  const [active,setActive]=useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      root.current.dataset.visible = String(entry.isIntersecting)
    })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])
  const mode = /Blender|Cinema|Octane|Corona/.test(tool.name)
    ? 'mesh'
    : /After Effects|Mocha|Silhouette|Keying/.test(tool.name)
      ? 'layers'
      : /Premiere|Encoder|HandBrake/.test(tool.name)
        ? 'timeline'
        : 'mask'
  return (
    <article ref={root} data-active={active} className={`tool-study tool-study--${mode}`}>
      <button className="tool-trigger" type="button" aria-pressed={active} onClick={()=>setActive(!active)}>
        {tool.name}
        <span>↗</span>
      </button>
      <div className="tool-study__visual" aria-hidden="true">
        {mode === 'mesh' && (
          <svg viewBox="0 0 200 110">
            <path d="M100 10 165 40 145 92 55 92 35 40Z M100 10 100 80 35 40 M100 80 165 40 M55 92 100 80 145 92 M70 24 130 24 155 65 100 100 45 65Z" />
            <ellipse cx="100" cy="80" rx="68" ry="22" />
          </svg>
        )}
        {mode === 'layers' && (
          <>
            <i />
            <i />
            <i />
            <b className="keyframe">◇</b>
          </>
        )}
        {mode === 'timeline' && (
          <>
            <i />
            <i />
            <i />
            <b className="playhead" />
          </>
        )}
        {mode === 'mask' && (
          <>
            <i />
            <i />
            <b className="mask-line" />
          </>
        )}
      </div>
      <p>{tool.tags.map((tag) => t(tag)).join(' / ')}</p>
      <small>{t('Illustrative workflow')}</small>
    </article>
  )
}
