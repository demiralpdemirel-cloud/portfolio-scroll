import { useRef, useState } from 'react'
import { useLanguage } from './i18n/LanguageContext'
import LanguageSwitcher from './i18n/LanguageSwitcher'
import ThemeController from './components/ThemeController'
import ScrollToTop from './components/ScrollToTop'
import VideoPlayer from './components/showreel/VideoPlayer'
import BreakdownViewer from './components/showreel/BreakdownViewer'
import ProjectDetail from './components/project/ProjectDetail'
import ProductionDetailModal from './components/experience/ProductionDetailModal'
import ToolStudy from './components/ToolStudy.jsx'
import PerformanceProbe from './components/PerformanceProbe.jsx'
import useScrollWorld from './motion/useScrollWorld.js'
import { catalog, catalogFilters, filterCatalog } from './data/catalog.js'
import { siteConfig } from './data/siteConfig.js'
import { professionalProfile } from './data/professionalProfile.js'
import { showreel } from './data/showreel.js'
import { education } from './data/education.js'
import { capabilities } from './data/capabilities'
import { tools } from './data/tools.js'
import { assetPath } from './utils/assetPath.js'

function SceneHeader({ number, title, subtitle }) {
  const { t } = useLanguage()
  return (
    <header className="scene-heading">
      <p className="scene-number">
        {number} / {t(subtitle)}
      </p>
      <h2>{t(title)}</h2>
    </header>
  )
}
export default function App() {
  const { t } = useLanguage(),
    root = useRef(null),
    returnFocus = useRef(null),
    reelFocus = useRef(null)
  const [category, setCategory] = useState('all'),
    [selected, setSelected] = useState(null),
    [breakdown, setBreakdown] = useState(null),
    [menu, setMenu] = useState(false)
  useScrollWorld(root, category)
  const hoverRects = useRef(new WeakMap())
  const entries = filterCatalog(category),
    active = catalog.find((entry) => entry.id === selected)
  const projectEntries = entries.filter((entry) => entry.kind === 'project')
  const open = (event, entry) => {
    returnFocus.current = event.currentTarget
    const box = event.currentTarget.getBoundingClientRect()
    document.documentElement.style.setProperty(
      '--detail-origin',
      `${((box.left + box.width / 2) / innerWidth) * 100}% ${((box.top + box.height / 2) / innerHeight) * 100}%`,
    )
    setSelected(entry.id)
  }
  const tilt = (event) => {
    if (
      !matchMedia('(hover:hover)').matches ||
      matchMedia('(prefers-reduced-motion:reduce)').matches
    )
      return
    let box = hoverRects.current.get(event.currentTarget)
    if (!box) {
      box = event.currentTarget.getBoundingClientRect()
      hoverRects.current.set(event.currentTarget, box)
    }
    event.currentTarget.style.setProperty(
      '--tilt-x',
      `${(-(event.clientY - box.top - box.height / 2) / box.height) * 5}deg`,
    )
    event.currentTarget.style.setProperty(
      '--tilt-y',
      `${((event.clientX - box.left - box.width / 2) / box.width) * 5}deg`,
    )
  }
  const reset = (event) => {
    hoverRects.current.delete(event.currentTarget)
    event.currentTarget.style.removeProperty('--tilt-x')
    event.currentTarget.style.removeProperty('--tilt-y')
  }
  return (
    <>
      <LanguageSwitcher />
      <ThemeController />
      <a className="skip-link" href="#work">
        {t('Skip to selected work')}
      </a>
      <nav className="scroll-nav" aria-label={t('Primary navigation')}>
        <a className="scroll-logo" href="#home">
          D
          <span>
            DEMİRALP
            <br />
            DEMİREL
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
        >
          {t('MENU')}
        </button>
        <div className={menu ? 'is-open' : ''}>
          {[
            ['showreel', 'SHOWREEL'],
            ['work', 'WORKS'],
            ['about', 'ABOUT'],
            ['capabilities', 'CAPABILITIES'],
            ['contact', 'CONTACT'],
          ].map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={() => setMenu(false)}>
              {t(label)}
            </a>
          ))}
        </div>
      </nav>
      <main
        ref={root}
        className={`scroll-world${active || breakdown !== null ? ' has-dialog' : ''}`}
      >
        <section id="home" className="hero scroll-hero camera-scene" data-scene>
          <div className="hero-depth" aria-hidden="true">
            <div className="perspective-floor" />
            <span className="horizon-orbit" />
          </div>
          <div className="hero-identity">
            <p className="scene-number">01 / {t('SCROLL AS CAMERA')}</p>
            <h1 className="scroll-title">
              <span>DEMİRALP</span>
              <span>DEMİREL</span>
            </h1>
            <p className="hero-discipline">{t(siteConfig.title)}</p>
            <a className="editorial-link" href="#work">
              {t('EXPLORE WORKS')} ↗
            </a>
          </div>
          <div className="hero-fragments" aria-label={t('Featured artwork')}>
            {[
              catalog[0],
              catalog[2],
              catalog.find((entry) => entry.id === 'cafe-environment'),
            ].map((entry, index) => (
              <a
                href={'#' + entry.id}
                key={entry.id}
                className={`hero-fragment hero-fragment--${['one', 'two', 'three'][index]}`}
              >
                <img
                  src={assetPath(entry.thumbnailLarge)}
                  alt={t(entry.title)}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  decoding="async"
                />
                <span>
                  {entry.number} / {t(entry.title)} ↗
                </span>
              </a>
            ))}
          </div>
          <div className="hero-bottom">
            <span>{t('DEPTH / MOTION / REAL WORK')}</span>
            <a href="#about">{t('SCROLL TO ENTER')} ↓</a>
          </div>
          <span className="light-rail" />
        </section>
        <section id="about" className="camera-scene about-scene" data-scene>
          <SceneHeader number="02" title="ABOUT THE ARTIST" subtitle="ABOUT" />
          <div className="about-composition">
            <figure className="portrait-depth">
              <img
                src={assetPath(siteConfig.profileImage)}
                alt={siteConfig.name}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{siteConfig.name}</figcaption>
            </figure>
            <div className="about-editorial">
              <p>
                {String(t(siteConfig.about))
                  .split(' ')
                  .map((word, index) => (
                    <span className="about-word" key={index}>
                      {word}{' '}
                    </span>
                  ))}
              </p>
              <a className="editorial-link" href="#profile">
                {t('PROFILE / STATUS')} ↗
              </a>
            </div>
          </div>
          <span className="light-rail" />
        </section>
        <section id="profile" className="camera-scene profile-scene" data-scene>
          <SceneHeader
            number="03"
            title="PROFILE / STATUS"
            subtitle="PROFESSIONAL PROFILE"
          />
          <div className="profile-track">
            <article className="profile-panel">
              <span>{t('CURRENT STUDIO')}</span>
              <a
                href={professionalProfile.currentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{professionalProfile.currentCompany.name}</strong> ↗
              </a>
              <p>{t(professionalProfile.currentCompany.period)}</p>
            </article>
            {professionalProfile.professionalLinks.map((link) => (
              <article className="profile-panel" key={link.id}>
                <span>{t(link.subtitle)}</span>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <strong>{link.name}</strong> ↗
                </a>
              </article>
            ))}
            <article className="profile-panel">
              <span>Instagram</span>
              <a
                href={professionalProfile.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{professionalProfile.instagram.handle}</strong> ↗
              </a>
            </article>
            {professionalProfile.softwareHours.map((item) => (
              <article className="profile-panel" key={item.id}>
                <span>
                  {item.name} / {item.source}
                </span>
                <strong>{item.hours.toLocaleString('en-US')}</strong>
                <p>{t(item.qualifier)}</p>
              </article>
            ))}
          </div>
          <span className="light-rail" />
        </section>
        <section id="showreel" className="camera-scene cinema-scene" data-scene>
          <SceneHeader
            number="04"
            title="IN MOTION."
            subtitle="SHOWREEL & BREAKDOWNS"
          />
          <div className="cinema-shell">
            <VideoPlayer
              src={showreel.video}
              poster={showreel.poster}
              durationHint={showreel.duration}
              label="Showreel"
              lazy
            />
          </div>
          <div className="breakdown-index">
            {showreel.breakdowns.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={(event) => {
                  reelFocus.current = event.currentTarget
                  setBreakdown(index)
                }}
              >
                <span>
                  {item.number} / {t(item.kind)}
                </span>
                <strong>{t(item.title)}</strong>
                <p>
                  {t(
                    item.production.myRole?.join(' / ') ||
                      'PRODUCTION BREAKDOWN',
                  )}
                </p>
                <b>↗</b>
              </button>
            ))}
          </div>
          <span className="light-rail" />
        </section>
        <section id="work" className="camera-scene works-scene" data-scene>
          <SceneHeader
            number="05"
            title="WORKS IN PERSPECTIVE."
            subtitle="SELECTED WORKS"
          />
          <div
            className="scroll-filters"
            role="group"
            aria-label={t('Filter works')}
          >
            {catalogFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={category === filter.id}
                onClick={() => setCategory(filter.id)}
              >
                {t(filter.label)}
              </button>
            ))}
            <span aria-live="polite">
              {entries.length} / {catalog.length}
            </span>
          </div>
          <div className="perspective-catalog">
            {entries.map((entry) => (
              <article
                className={`scroll-card scroll-card--${entry.kind === 'production' ? 'production' : entry.categories.includes('environment') ? 'environment' : entry.categories.includes('vfx') ? 'vfx' : entry.categories.includes('brand') ? 'product' : 'modeling'}`}
                key={entry.id}
                id={entry.id}
              >
                <button
                  type="button"
                  className="card-tilt"
                  onPointerMove={tilt}
                  onPointerLeave={reset}
                  onBlur={reset}
                  onClick={(event) => open(event, entry)}
                  aria-haspopup="dialog"
                  aria-label={t('VIEW PROJECT') + ' — ' + t(entry.title)}
                >
                  <div className="card-image">
                    {entry.thumbnail ? (
                      <img
                        src={assetPath(entry.thumbnail)}
                        srcSet={`${assetPath(entry.thumbnail)} 480w, ${assetPath(entry.thumbnailLarge)} 960w`}
                        sizes="(min-width:1800px) 19vw,(min-width:1300px) 24vw,(min-width:950px) 32vw,(min-width:600px) 48vw,95vw"
                        width="480"
                        height="640"
                        alt={t(entry.title)}
                        loading="lazy"
                        decoding="async"
                        style={{
                          objectFit: entry.fit,
                          objectPosition: entry.objectPosition,
                        }}
                      />
                    ) : (
                      <span className="type-poster">{t(entry.title)}</span>
                    )}
                    <i className="card-sweep" />
                  </div>
                  <div className="card-meta">
                    <p>
                      {entry.number}
                      {entry.year ? ' / ' + t(entry.year) : ''}
                    </p>
                    <h3>{t(entry.title)}</h3>
                    <p>{t(entry.discipline)}</p>
                    <span className="card-arrow">↗</span>
                  </div>
                </button>
              </article>
            ))}
          </div>
          <span className="light-rail" />
        </section>
        <section
          id="education"
          className="camera-scene education-scene"
          data-scene
        >
          <SceneHeader number="06" title="EDUCATION" subtitle="EDUCATION" />
          <div className="education-composition">
            <span className="education-line" />
            <div className="education-copy">
              <p>{t(education.institutionPeriod)}</p>
              <h3>{t(education.program)}</h3>
            </div>
          </div>
          <span className="light-rail" />
        </section>
        <section
          id="capabilities"
          className="camera-scene capabilities-scene"
          data-scene
        >
          <SceneHeader
            number="07"
            title="THE MAKING OF."
            subtitle="CAPABILITIES"
          />
          <div className="discipline-grid">
            {capabilities.map((item) => (
              <article key={item.id} className="discipline-panel">
                <span>{item.id}</span>
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
              </article>
            ))}
          </div>
          <h3 className="tools-label">{t('TOOLS / SOFTWARE')}</h3>
          <div className="tool-grid">
            {tools.map((tool) => (
              <ToolStudy key={tool.name} tool={tool} />
            ))}
          </div>
          <span className="light-rail" />
        </section>
        <section id="contact" className="camera-scene contact-scene" data-scene>
          <div className="contact-depth" aria-hidden="true">
            <img
              src={assetPath('media/web/backgrounds--contact-1280.webp')}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="scene-number">08 / {t('CONTACT')}</p>
          <h2>
            {['LET’S CREATE', 'SOMETHING.'].map((word) => (
              <span className="contact-word" key={word}>
                {t(word)}
              </span>
            ))}
          </h2>
          <div className="contact-actions">
            <p>{siteConfig.name}</p>
            <a href={'mailto:' + siteConfig.email}>{siteConfig.email} ↗</a>
            <a href={'tel:' + siteConfig.phone}>0532 572 76 87 ↗</a>
          </div>
          <div className="contact-social">
            {professionalProfile.professionalLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name} ↗
              </a>
            ))}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>
          <span className="light-rail" />
        </section>
      </main>
      <footer className="scroll-footer">
        <span>DEMİRALP DEMİREL / PORTFOLIO SCROLL</span>
        <a href="#home">{t('BACK TO TOP')} ↑</a>
      </footer>
      {active?.kind === 'project' && (
        <ProjectDetail
          project={active.detail}
          onClose={() => setSelected(null)}
          returnFocus={returnFocus}
          onNext={() =>
            setSelected(
              projectEntries[
                (projectEntries.findIndex((entry) => entry.id === selected) +
                  1) %
                  projectEntries.length
              ].id,
            )
          }
        />
      )}
      {active?.kind === 'production' && (
        <ProductionDetailModal
          key={active.id}
          production={active.detail}
          onClose={() => setSelected(null)}
          returnFocus={returnFocus}
        />
      )}
      {breakdown !== null && (
        <BreakdownViewer
          items={showreel.breakdowns}
          index={breakdown}
          onNavigate={setBreakdown}
          onClose={() => setBreakdown(null)}
          returnFocusRef={reelFocus}
        />
      )}
      <ScrollToTop />
      <PerformanceProbe />
    </>
  )
}
