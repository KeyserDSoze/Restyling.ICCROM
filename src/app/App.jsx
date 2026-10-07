import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ChevronDown, ExternalLink,
  Globe2, Languages, Menu, Moon, Search, Sparkles, Sun, X, MapPin, Users, Layers3
} from 'lucide-react';
import PasswordGate from './components/PasswordGate';
import { courses, directions, news, projects, publications, stats } from './data/content';
import { getCopy, languages } from './i18n';

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('iccrom-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('iccrom-theme', theme);
  }, [theme]);
  return [theme, setTheme];
}

function useLanguage() {
  const [lang, setLang] = useState(() => localStorage.getItem('iccrom-lang') || 'en');
  const language = languages.find((item) => item.code === lang) || languages[0];
  useEffect(() => {
    localStorage.setItem('iccrom-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = language.dir;
  }, [lang, language.dir]);
  return [lang, setLang, language];
}

function Header({ t, theme, setTheme, lang, setLang, language }) {
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const anchors = ['vision', 'projects', 'news', 'learning', 'publications'];
  return (
    <header className="site-header">
      <a className="logo" href="#top" aria-label="ICCROM home">
        <span className="logo-glyph">I</span>
        <span><strong>ICCROM</strong><small>Heritage in motion</small></span>
      </a>
      <nav className={menu ? 'nav nav-open' : 'nav'} aria-label="Primary">
        {t.nav.map((item, i) => <a key={item} href={'#' + anchors[i]} onClick={() => setMenu(false)}>{item}</a>)}
      </nav>
      <div className="header-tools">
        <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <div className="lang-picker">
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)} aria-expanded={langOpen}><Languages size={17}/><span>{language.short}</span><ChevronDown size={14}/></button>
          {langOpen && <div className="lang-menu">{languages.map((item) => <button key={item.code} className={item.code === lang ? 'active' : ''} onClick={() => { setLang(item.code); setLangOpen(false); }}>{item.label}<span>{item.short}</span></button>)}</div>}
        </div>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true"><span/><span/><span/></div>
      <div className="hero-copy reveal">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1><span>{t.heroTitleA}</span><em>{t.heroTitleB}</em></h1>
        <p className="hero-lead">{t.heroText}</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">{t.explore}<ArrowDownRight size={18}/></a>
          <a className="text-link" href="#news">{t.latest}<ArrowRight size={17}/></a>
        </div>
      </div>
      <div className="hero-visual reveal delay-1" aria-hidden="true">
        <div className="atlas-card atlas-main"><span className="atlas-kicker">CARE / 2026—2031</span><strong>Conserve.<br/>Activate.<br/>Recognize.</strong><span className="atlas-line"/></div>
        <div className="atlas-card atlas-mini top"><Globe2/><span>139</span><small>Member States</small></div>
        <div className="atlas-card atlas-mini bottom"><Sparkles/><span>09</span><small>Priority Areas</small></div>
        <div className="orbit-label one">people</div><div className="orbit-label two">knowledge</div><div className="orbit-label three">places</div>
      </div>
      <div className="hero-stats">{stats.map(s => <div key={s.label}><strong>{s.suffix}{s.value}</strong><span>{s.label}</span></div>)}</div>
    </section>
  );
}

function Framework({ t }) {
  return (
    <section className="section framework" id="vision">
      <div className="section-heading"><p className="eyebrow">Strategic framework / 2026—2031</p><h2>{t.framework}</h2><p>{t.frameworkLead}</p></div>
      <div className="direction-grid">
        {directions.map((d) => <article className={'direction-card ' + d.accent} key={d.id}>
          <div className="direction-top"><span>{d.number}</span><ArrowDownRight/></div>
          <p>{d.kicker}</p><h3>{d.name}</h3><p className="direction-copy">{d.text}</p>
          <div className="priority-list">{d.priorities.map((p, i) => <span key={p}><b>PA{i+1}</b>{p}</span>)}</div>
        </article>)}
      </div>
    </section>
  );
}

function ProjectExplorer({ t, onOpen }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Africa', 'Europe', 'Global', 'Climate', 'Digital'];
  const filtered = projects.filter((p) => filter === 'All' || p.region === filter || p.theme === filter);
  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading split"><div><p className="eyebrow">Connected programmes & projects</p><h2>{t.projects}</h2></div><p>{t.projectsLead}</p></div>
      <div className="filter-row" aria-label="Project filters">{filters.map(f => <button className={filter === f ? 'active' : ''} key={f} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="project-grid">
        {filtered.map((p, i) => <button className={'project-card project-' + p.tone + (i === 0 ? ' featured' : '')} key={p.id} onClick={() => onOpen(p)}>
          <div className="project-art" aria-hidden="true"><span/><span/><span/></div>
          <div className="project-meta"><span>{p.direction}</span><span>{p.region}</span></div>
          <h3>{p.title}</h3><p>{p.short}</p>
          <div className="project-bottom"><strong>{p.metric}</strong><span className="round-arrow"><ArrowDownRight size={19}/></span></div>
        </button>)}
      </div>
    </section>
  );
}

function ConnectedStory({ selected, onClose }) {
  if (!selected) return null;
  const relatedNews = news.filter(n => selected.related?.includes(n.id));
  const relatedPubs = publications.filter(p => selected.related?.includes(p.id));
  const relatedCourses = courses.filter(c => selected.related?.includes(c.id));
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="story-drawer" onMouseDown={(e) => e.stopPropagation()} aria-label={selected.title + ' details'}>
        <button className="drawer-close" onClick={onClose}><X/></button>
        <p className="eyebrow">Connected content / prototype</p><h2>{selected.title}</h2><p className="drawer-lead">{selected.short}</p>
        <div className="drawer-facts"><span><MapPin/>{selected.countries.join(' · ')}</span><span><Layers3/>{selected.direction} · {selected.theme}</span></div>
        <div className="relationship-map"><div className="node main-node">Project</div><div className="node">News</div><div className="node">Publications</div><div className="node">Courses</div><div className="node">Places</div><div className="node">Priority Area</div></div>
        {(relatedNews.length + relatedPubs.length + relatedCourses.length) > 0 && <div className="related-list">
          <h3>Automatically related</h3>
          {relatedNews.map(n => <a href={n.link} target="_blank" rel="noreferrer" key={n.id}><span>News · {n.date}</span><strong>{n.title}</strong><ExternalLink size={15}/></a>)}
          {relatedPubs.map(p => <a href={p.link} target="_blank" rel="noreferrer" key={p.id}><span>Publication · {p.year}</span><strong>{p.title}</strong><ExternalLink size={15}/></a>)}
          {relatedCourses.map(c => <div className="related-static" key={c.id}><span>Course · {c.date}</span><strong>{c.title}</strong></div>)}
        </div>}
        <a className="button primary drawer-link" href={selected.link} target="_blank" rel="noreferrer">View source on ICCROM.org<ExternalLink size={16}/></a>
      </aside>
    </div>
  );
}

function NewsSection({ t }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section news-section" id="news">
      <div className="section-heading"><p className="eyebrow">Stories / people / places</p><h2>{t.news}</h2></div>
      <div className="news-layout">
        <div className={'news-feature tone-' + news[active].tone}>
          <div className="news-art"><span className="news-index">0{active + 1}</span><div className="news-shape"/></div>
          <div className="news-feature-copy"><span>{news[active].date} · {news[active].region}</span><h3>{news[active].title}</h3><p>{news[active].summary}</p><a href={news[active].link} target="_blank" rel="noreferrer">Read on ICCROM.org <ExternalLink size={15}/></a></div>
        </div>
        <div className="news-list">{news.map((n, i) => <button key={n.id} onClick={() => setActive(i)} className={i === active ? 'active' : ''}><span>{n.date}</span><strong>{n.title}</strong><small>{n.tag}</small></button>)}</div>
      </div>
    </section>
  );
}

function Learning({ t }) {
  return (
    <section className="section learning" id="learning">
      <div className="learning-intro"><p className="eyebrow">Courses & opportunities</p><h2>{t.learning}</h2><p>Capacity building that moves beyond a single course — connecting learning to institutions, field projects and long-term change.</p></div>
      <div className="course-stack">{courses.map((c, i) => <article key={c.id} className="course-card"><div className="course-no">0{i+1}</div><div><span className="status-dot"/>{c.status} · {c.date}</div><h3>{c.title}</h3><p>{c.text}</p><footer><span><MapPin size={15}/>{c.place}</span><ArrowDownRight/></footer></article>)}</div>
    </section>
  );
}

function Publications({ t }) {
  return (
    <section className="section publications" id="publications">
      <div className="section-heading split"><div><p className="eyebrow">Resources / publications / toolkits</p><h2>{t.publications}</h2></div><p>Knowledge becomes more valuable when it is connected directly to the project, place or challenge where it can be applied.</p></div>
      <div className="pub-grid">{publications.map((p, i) => <a href={p.link} target="_blank" rel="noreferrer" key={p.id} className="pub-card"><div className={'book-cover cover-' + (i+1)}><span>ICCROM</span><strong>{p.title}</strong><small>{p.year}</small></div><div className="pub-copy"><span>{p.type} · {p.year}</span><h3>{p.title}</h3><p>{p.text}</p><span className="pub-link">Open resource <ExternalLink size={14}/></span></div></a>)}</div>
    </section>
  );
}

function GlobalNetwork({ t }) {
  const places = ['Rome','Nara','Nairobi','Tunis','Jeju','Bucharest','Suzhou','Malé'];
  return (
    <section className="network-section">
      <div className="network-map" aria-hidden="true"><div className="world-ring r1"/><div className="world-ring r2"/><div className="world-ring r3"/>{places.map((p,i)=><span key={p} className={'pin pin-' + (i+1)}>{p}</span>)}</div>
      <div className="network-copy"><p className="eyebrow">Member States & partners</p><h2>{t.states}</h2><p>ICCROM’s value is global, but its impact happens in real places — through professionals, institutions, communities and policies.</p><div className="network-stats"><span><Users/>139 <small>Member States</small></span><span><Globe2/>Worldwide <small>programmes</small></span></div></div>
    </section>
  );
}

function SearchBand({ t }) {
  const [q, setQ] = useState('');
  const matches = useMemo(() => {
    if (!q.trim()) return [];
    const all = [...projects.map(x => ({...x, kind:'Project'})), ...news.map(x => ({...x, kind:'News'})), ...publications.map(x => ({...x, kind:'Publication'}))];
    return all.filter(x => [x.title, x.short || '', x.summary || '', x.text || ''].join(' ').toLowerCase().includes(q.toLowerCase())).slice(0,5);
  }, [q]);
  return <section className="search-band"><div><p className="eyebrow">One connected knowledge layer</p><h2>{t.search}</h2></div><div className="search-box"><Search/><input value={q} onChange={e => setQ(e.target.value)} placeholder="Try: climate, Africa, digital, World Heritage…" />{q && <button onClick={()=>setQ('')}><X size={17}/></button>}{matches.length>0 && <div className="search-results">{matches.map(m=><div key={m.kind + '-' + m.id}><span>{m.kind}</span><strong>{m.title}</strong></div>)}</div>}</div></section>;
}

function Footer({ t }) {
  return <footer className="footer"><div className="footer-mark">ICCROM</div><h2>{t.footer}</h2><div className="footer-row"><span>Static concept prototype · October 2026</span><span>Rome, Italy · iccrom.org</span><span>Concept / Agic Technology</span></div></footer>;
}

function Site() {
  const [theme, setTheme] = useTheme();
  const [lang, setLang, language] = useLanguage();
  const [selected, setSelected] = useState(null);
  const t = getCopy(lang);
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')];
    const obs = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold:.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return <div className="site-shell"><Header {...{t, theme, setTheme, lang, setLang, language}}/><Hero t={t}/><Framework t={t}/><ProjectExplorer t={t} onOpen={setSelected}/><NewsSection t={t}/><Learning t={t}/><Publications t={t}/><GlobalNetwork t={t}/><SearchBand t={t}/><Footer t={t}/><ConnectedStory selected={selected} onClose={()=>setSelected(null)}/></div>;
}

export default function App() {
  return <PasswordGate><Site/></PasswordGate>;
}
