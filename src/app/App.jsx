import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ChevronDown, ExternalLink, Globe2, Languages,
  Menu, Moon, Play, Search, Sun, X, MapPin, Layers3, BookOpen, GraduationCap
} from 'lucide-react';
import PasswordGate from './components/PasswordGate';
import { courses, directions, news, projects, publications } from './data/content';
import { getCopy, languages } from './i18n';

const BRAND_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/ICCROM-Logo.png';

const visuals = {
  assembly: 'https://www.iccrom.org/sites/default/files/2025-12/iccrom_34th_session_of_the_general_assembly-3176.jpg',
  cinqueTerre: 'https://www.iccrom.org/sites/default/files/2026-03/pnc-ituc_iccrom_2026_3.jpg',
  ready: 'https://www.iccrom.org/sites/default/files/2026-06/iccrom_ready_laquila_min260526-250.jpg',
  africa: 'https://www.iccrom.org/sites/default/files/2024-04/20240408_the_7th_african_world_heritage_youth_forum_iccrom_field.jpg',
};

const heroStories = [
  {
    image: visuals.cinqueTerre,
    tag: 'Capacity building · Italy',
    title: 'Heritage becomes stronger when knowledge moves.',
    text: 'Professionals from around the world learn in real places, with real communities and real conservation challenges.',
  },
  {
    image: visuals.assembly,
    tag: '139 Member States',
    title: 'A global meeting place for heritage.',
    text: 'ICCROM brings governments, professionals and partners together to shape the future of cultural heritage.',
  },
  {
    image: visuals.ready,
    tag: 'READY Track 2 · Europe',
    title: 'Preparedness is part of conservation.',
    text: 'Risk managers and cultural first aiders build practical capacity for disasters, extreme weather and complex emergencies.',
  },
];

const projectVisuals = [visuals.africa, visuals.ready, visuals.cinqueTerre, visuals.assembly];

const experienceCopy = {
  en: {
    chooserEyebrow: 'Three perspectives · one ICCROM',
    chooserTitle: 'Choose how you want to experience heritage.',
    chooserLead: 'Three credible directions for the same institution, content ecosystem and 2024 brand identity.',
    enter: 'Enter experience',
    pulse: 'Editorial, human and alive. Stories, imagery and impact numbers move with the visitor.',
    atlas: 'Global by design. Member States, programmes and places become the navigation system.',
    weave: 'Knowledge as a network. Projects, publications, courses, news and places reveal their relationships.',
    atlasTitle: 'Heritage has a geography.',
    atlasLead: 'Explore ICCROM through the places, Member States and programmes where knowledge becomes action.',
    weaveTitle: 'Everything connects.',
    weaveLead: 'ICCROM becomes a living knowledge graph: every project opens a path to people, publications, learning and place.',
    chooseAnother: 'Experiences'
  },
  fr: {
    chooserEyebrow: 'Trois perspectives · un seul ICCROM',
    chooserTitle: 'Choisissez votre manière de découvrir le patrimoine.',
    chooserLead: 'Trois directions crédibles pour la même institution, le même écosystème de contenus et la même identité.',
    enter: 'Entrer', pulse: 'Éditorial, humain et vivant. Histoires, images et données d’impact accompagnent la navigation.', atlas: 'Une vision mondiale. États membres, programmes et lieux deviennent la navigation.', weave: 'La connaissance comme réseau. Projets, publications, cours, actualités et lieux révèlent leurs liens.',
    atlasTitle: 'Le patrimoine a une géographie.', atlasLead: 'Explorez l’ICCROM par les lieux, les États membres et les programmes où le savoir devient action.', weaveTitle: 'Tout est connecté.', weaveLead: 'ICCROM devient un graphe vivant de connaissances reliant projets, personnes, publications, apprentissage et territoires.', chooseAnother: 'Expériences'
  },
  es: {
    chooserEyebrow: 'Tres perspectivas · un ICCROM',
    chooserTitle: 'Elige cómo quieres vivir el patrimonio.',
    chooserLead: 'Tres direcciones creíbles para la misma institución, ecosistema de contenidos e identidad.',
    enter: 'Entrar', pulse: 'Editorial, humana y viva. Historias, imágenes y cifras de impacto acompañan al visitante.', atlas: 'Global desde el diseño. Estados Miembros, programas y lugares se convierten en navegación.', weave: 'El conocimiento como red. Proyectos, publicaciones, cursos, noticias y lugares muestran sus relaciones.',
    atlasTitle: 'El patrimonio tiene una geografía.', atlasLead: 'Explora ICCROM a través de los lugares, Estados Miembros y programas donde el conocimiento se vuelve acción.', weaveTitle: 'Todo está conectado.', weaveLead: 'ICCROM se convierte en un grafo vivo de conocimiento que une proyectos, personas, publicaciones, aprendizaje y lugares.', chooseAnother: 'Experiencias'
  },
  it: {
    chooserEyebrow: 'Tre prospettive · un solo ICCROM',
    chooserTitle: 'Scegli come vivere il patrimonio.',
    chooserLead: 'Tre direzioni credibili per la stessa istituzione, lo stesso ecosistema di contenuti e la stessa identità.',
    enter: 'Entra nell’esperienza', pulse: 'Editoriale, umana e viva. Storie, immagini e numeri di impatto accompagnano la navigazione.', atlas: 'Globale per natura. Stati membri, programmi e luoghi diventano il sistema di navigazione.', weave: 'La conoscenza come rete. Progetti, pubblicazioni, corsi, news e luoghi mostrano le loro relazioni.',
    atlasTitle: 'Il patrimonio ha una geografia.', atlasLead: 'Esplora ICCROM attraverso luoghi, Stati membri e programmi in cui la conoscenza diventa azione.', weaveTitle: 'Tutto è connesso.', weaveLead: 'ICCROM diventa un grafo vivo di conoscenza: ogni progetto apre percorsi verso persone, pubblicazioni, formazione e luoghi.', chooseAnother: 'Esperienze'
  },
  ar: {
    chooserEyebrow: 'ثلاث رؤى · إيكروم واحد',
    chooserTitle: 'اختر كيف تريد أن تختبر التراث.',
    chooserLead: 'ثلاثة اتجاهات موثوقة للمؤسسة نفسها ولنظام المحتوى والهوية نفسها.',
    enter: 'ادخل التجربة', pulse: 'تجربة تحريرية وإنسانية وحية تجمع القصص والصور وأرقام الأثر.', atlas: 'منظور عالمي يجعل الدول الأعضاء والبرامج والأماكن أساس التنقل.', weave: 'المعرفة كشبكة تربط المشاريع والمنشورات والدورات والأخبار والأماكن.',
    atlasTitle: 'للتراث جغرافيا.', atlasLead: 'استكشف إيكروم عبر الأماكن والدول الأعضاء والبرامج التي تتحول فيها المعرفة إلى عمل.', weaveTitle: 'كل شيء مترابط.', weaveLead: 'يتحول إيكروم إلى شبكة معرفة حية تربط المشاريع والناس والمنشورات والتعلم والأماكن.', chooseAnother: 'التجارب'
  },
  zh: {
    chooserEyebrow: '三种视角 · 一个 ICCROM',
    chooserTitle: '选择你体验文化遗产的方式。',
    chooserLead: '同一机构、同一内容生态和品牌身份的三种可信数字方向。',
    enter: '进入体验', pulse: '编辑感、人本且充满活力，以故事、影像和影响数据推动浏览体验。', atlas: '以全球视角为核心，让成员国、项目与地点成为导航。', weave: '把知识呈现为网络，连接项目、出版物、课程、新闻与地点。',
    atlasTitle: '遗产有自己的地理。', atlasLead: '通过知识转化为行动的地点、成员国和项目探索 ICCROM。', weaveTitle: '一切彼此相连。', weaveLead: 'ICCROM 成为一个活的知识图谱，每个项目都连接人物、出版物、学习与地点。', chooseAnother: '体验'
  },
  pt: {
    chooserEyebrow: 'Três perspectivas · um ICCROM',
    chooserTitle: 'Escolha como quer experienciar o patrimônio.',
    chooserLead: 'Três direções credíveis para a mesma instituição, ecossistema de conteúdos e identidade.',
    enter: 'Entrar', pulse: 'Editorial, humana e viva. Histórias, imagens e números de impacto acompanham a navegação.', atlas: 'Global por natureza. Estados-Membros, programas e lugares tornam-se o sistema de navegação.', weave: 'Conhecimento como rede. Projetos, publicações, cursos, notícias e lugares revelam suas relações.',
    atlasTitle: 'O patrimônio tem uma geografia.', atlasLead: 'Explore o ICCROM através dos lugares, Estados-Membros e programas onde o conhecimento se transforma em ação.', weaveTitle: 'Tudo está conectado.', weaveLead: 'O ICCROM torna-se um grafo vivo de conhecimento ligando projetos, pessoas, publicações, aprendizagem e lugares.', chooseAnother: 'Experiências'
  },
  hi: {
    chooserEyebrow: 'तीन दृष्टिकोण · एक ICCROM',
    chooserTitle: 'चुनें कि आप विरासत को कैसे अनुभव करना चाहते हैं।',
    chooserLead: 'एक ही संस्था, कंटेंट इकोसिस्टम और पहचान के लिए तीन विश्वसनीय डिजिटल दिशाएँ।',
    enter: 'अनुभव खोलें', pulse: 'संपादकीय, मानवीय और जीवंत — कहानियाँ, चित्र और प्रभाव के आँकड़े अनुभव को आगे बढ़ाते हैं।', atlas: 'वैश्विक दृष्टि — सदस्य देश, कार्यक्रम और स्थान ही नेविगेशन बन जाते हैं।', weave: 'ज्ञान एक नेटवर्क के रूप में — परियोजनाएँ, प्रकाशन, पाठ्यक्रम, समाचार और स्थान आपस में जुड़ते हैं।',
    atlasTitle: 'विरासत की अपनी भूगोल है।', atlasLead: 'उन स्थानों, सदस्य देशों और कार्यक्रमों के माध्यम से ICCROM को देखें जहाँ ज्ञान कार्रवाई बनता है।', weaveTitle: 'सब कुछ जुड़ा हुआ है।', weaveLead: 'ICCROM एक जीवंत ज्ञान-ग्राफ बन जाता है जो परियोजनाओं, लोगों, प्रकाशनों, सीखने और स्थानों को जोड़ता है।', chooseAnother: 'अनुभव'
  }
};

function getExperienceCopy(lang) {
  return experienceCopy[lang] || experienceCopy.en;
}

function useExperienceRoute() {
  const read = () => {
    const value = new URLSearchParams(window.location.search).get('view');
    return ['pulse', 'atlas', 'weave'].includes(value) ? value : null;
  };
  const [view, setView] = useState(read);

  useEffect(() => {
    const sync = () => setView(read());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const navigate = (next) => {
    const url = new URL(window.location.href);
    url.hash = '';
    if (next) url.searchParams.set('view', next);
    else url.searchParams.delete('view');
    window.history.pushState({}, '', url);
    setView(next || null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return [view, navigate];
}

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

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1150 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = Number(value) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let visible = false;

    const start = () => {
      if (reduceMotion) {
        setDisplay(target);
        return;
      }
      const started = performance.now();
      const frame = (now) => {
        const p = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setDisplay(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        cancelAnimationFrame(raf);
        setDisplay(0);
        start();
      }
      if (!entry.isIntersecting && visible) {
        cancelAnimationFrame(raf);
        setDisplay(0);
      }
      visible = entry.isIntersecting;
    }, { threshold: 0.52 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref} className="number-value">{prefix}{display.toLocaleString()}{suffix}</span>;
}

function ReplayReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.13, rootMargin: '0px 0px -5% 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span ref={bar} /></div>;
}

function Header({ t, theme, setTheme, lang, setLang, language }) {
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const anchors = ['vision', 'projects', 'news', 'learning', 'publications'];

  return (
    <header className="topbar">
      <a className="brand-lockup" href="#top" aria-label="ICCROM home">
        <img src={BRAND_LOGO} alt="" />
        <span>International Centre for the Study of the Preservation and Restoration of Cultural Property</span>
      </a>

      <nav className={menu ? 'main-nav open' : 'main-nav'} aria-label="Primary">
        {t.nav.map((item, i) => <a key={item} href={'#' + anchors[i]} onClick={() => setMenu(false)}>{item}</a>)}
      </nav>

      <div className="top-actions">
        <button className="round-action" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
        </button>
        <div className="language">
          <button className="language-trigger" onClick={() => setLangOpen(!langOpen)} aria-expanded={langOpen}>
            <Languages size={17}/><span>{language.short}</span><ChevronDown size={14}/>
          </button>
          {langOpen && (
            <div className="language-menu">
              {languages.map((item) => (
                <button key={item.code} className={item.code === lang ? 'active' : ''} onClick={() => { setLang(item.code); setLangOpen(false); }}>
                  {item.label}<span>{item.short}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setActive((value) => (value + 1) % heroStories.length), 5600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-colour-block blue-block" aria-hidden="true" />
      <div className="hero-colour-block red-block" aria-hidden="true" />
      <div className="texture texture-a" aria-hidden="true" />

      <div className="hero-copy" data-reveal>
        <p className="hero-institution">Intergovernmental organization · Rome · Since 1956</p>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1><span>{t.heroTitleA}</span><em>{t.heroTitleB}</em></h1>
        <p className="hero-lead">{t.heroText}</p>
        <div className="hero-actions">
          <a className="cta dark" href="#projects">{t.explore}<ArrowDownRight size={18}/></a>
          <a className="inline-link" href="#news">{t.latest}<ArrowRight size={17}/></a>
        </div>
      </div>

      <div className="hero-media" data-reveal>
        <div className="hero-photo-stage">
          {heroStories.map((story, index) => (
            <img
              key={story.image}
              className={index === active ? 'active' : ''}
              src={story.image}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="hero-photo-wash" />
          <div className="hero-story-caption">
            <span>{heroStories[active].tag}</span>
            <strong>{heroStories[active].title}</strong>
            <p>{heroStories[active].text}</p>
          </div>
          <button className="play-disc" aria-label="Visual storytelling concept"><Play size={20} fill="currentColor"/></button>
        </div>
        <div className="hero-story-tabs" aria-label="Hero stories">
          {heroStories.map((story, index) => (
            <button key={story.tag} className={index === active ? 'active' : ''} onClick={() => setActive(index)}>
              <span>0{index + 1}</span><strong>{story.tag}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="hero-impact-strip">
        <ImpactNumber value={139} label="Member States" />
        <ImpactNumber value={70} prefix="~" label="Years of action" />
        <ImpactNumber value={3} label="Strategic Directions" />
        <ImpactNumber value={9} label="Priority Areas" />
      </div>
    </section>
  );
}

function ImpactNumber({ value, prefix = '', label }) {
  return (
    <div className="hero-impact-item">
      <strong><AnimatedNumber value={value} prefix={prefix}/></strong>
      <span>{label}</span>
    </div>
  );
}

function BrandTicker() {
  const words = ['Conserve', 'Activate', 'Recognize', 'People', 'Places', 'Knowledge', 'Resilience', 'Future'];
  return (
    <div className="brand-ticker" aria-label="ICCROM themes">
      <div className="ticker-track">
        {[...words, ...words].map((word, index) => <span key={word + index}>{word}<i>●</i></span>)}
      </div>
    </div>
  );
}

function CareSection({ t }) {
  return (
    <section className="care-section" id="vision">
      <div className="section-intro sticky-intro" data-reveal>
        <p className="eyebrow">Strategic Plan 2026—2031</p>
        <h2>{t.framework}</h2>
        <p>{t.frameworkLead}</p>
        <a href="https://www.iccrom.org/about/overview/mission-and-vision" target="_blank" rel="noreferrer" className="inline-link">
          Explore the strategic framework <ExternalLink size={15}/>
        </a>
      </div>

      <div className="care-stack">
        {directions.map((direction, index) => (
          <article className={'care-card care-' + direction.accent} key={direction.id} data-reveal>
            <div className="care-card-top">
              <span className="care-number">0{index + 1}</span>
              <span className="care-label">Strategic direction</span>
            </div>
            <h3>{direction.name}</h3>
            <p className="care-kicker">{direction.kicker}</p>
            <p>{direction.text}</p>
            <div className="care-priorities">
              {direction.priorities.map((priority, i) => (
                <span key={priority}><b>PA {i + 1}</b>{priority}</span>
              ))}
            </div>
            <div className="care-mark" aria-hidden="true"><span/><span/><span/></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsSection({ t }) {
  const editorial = [
    {
      ...news[0],
      image: visuals.africa,
      kicker: 'Craftsmanship · Skills · Livelihoods',
    },
    {
      ...news[1],
      image: visuals.cinqueTerre,
      kicker: 'Climate · Community knowledge',
    },
    {
      ...news[3],
      image: visuals.ready,
      kicker: 'Preparedness · Resilience',
    },
  ];

  return (
    <section className="news-section" id="news">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Stories / people / places</p>
        <h2>{t.news}</h2>
        <a href="https://www.iccrom.org/news-events/news" target="_blank" rel="noreferrer" className="inline-link">All news <ExternalLink size={15}/></a>
      </div>

      <div className="editorial-grid">
        {editorial.map((item, index) => (
          <a className={'editorial-card card-' + (index + 1)} key={item.id} href={item.link} target="_blank" rel="noreferrer" data-reveal>
            <img src={item.image} alt="" loading="lazy" />
            <div className="editorial-shade" />
            <div className="editorial-copy">
              <span>{item.date} · {item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <strong>Read story <ArrowRight size={16}/></strong>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ t, onOpen }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Africa', 'Europe', 'Global', 'Climate', 'Digital'];
  const filtered = projects.filter((project) => filter === 'All' || project.region === filter || project.theme === filter);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-heading" data-reveal>
        <div>
          <p className="eyebrow">Programmes / projects / outcomes</p>
          <h2>{t.projects}</h2>
        </div>
        <p>{t.projectsLead}</p>
      </div>

      <div className="project-toolbar">
        <div className="project-filters">
          {filters.map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="project-counter"><AnimatedNumber value={filtered.length}/><span>featured projects</span></div>
      </div>

      <div className="project-mosaic">
        {filtered.map((project, index) => (
          <button className={'project-tile tile-' + ((index % 4) + 1)} key={project.id} onClick={() => onOpen(project)} data-reveal>
            <img src={projectVisuals[index % projectVisuals.length]} alt="" loading="lazy" />
            <div className="project-overlay" />
            <div className="project-topline"><span>{project.direction}</span><span>{project.region}</span></div>
            <div className="project-copy">
              <span>{project.theme}</span>
              <h3>{project.title}</h3>
              <p>{project.short}</p>
              <div><strong>{project.metric}</strong><i><ArrowDownRight size={18}/></i></div>
            </div>
          </button>
        ))}
      </div>

      <ConnectedContentExplainer />
    </section>
  );
}

function ConnectedContentExplainer() {
  return (
    <div className="connected-explainer" data-reveal>
      <div className="connected-copy">
        <p className="eyebrow">A different content model</p>
        <h3>One project.<br/>A whole ecosystem.</h3>
        <p>In the new CMS, projects do not live on isolated pages. They connect automatically to publications, courses, news, places and strategic priorities.</p>
      </div>
      <div className="connected-map" aria-label="Connected content model diagram">
        <span className="connector c1"/><span className="connector c2"/><span className="connector c3"/><span className="connector c4"/><span className="connector c5"/>
        <div className="map-node core"><Layers3/><strong>Project</strong></div>
        <div className="map-node n1"><BookOpen/><span>Publication</span></div>
        <div className="map-node n2"><GraduationCap/><span>Course</span></div>
        <div className="map-node n3"><Globe2/><span>Place</span></div>
        <div className="map-node n4"><span>News</span></div>
        <div className="map-node n5"><span>Priority Area</span></div>
      </div>
    </div>
  );
}

function LearningAndKnowledge({ t }) {
  return (
    <section className="knowledge-section" id="learning">
      <div className="knowledge-photo" data-reveal>
        <img src={visuals.cinqueTerre} alt="" loading="lazy" />
        <div className="knowledge-photo-copy">
          <span>Learning in context</span>
          <strong>From training to transformation.</strong>
        </div>
      </div>

      <div className="knowledge-content">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Courses & opportunities</p>
          <h2>{t.learning}</h2>
          <p>Capacity building becomes more powerful when learning connects directly to places, people, institutions and long-term outcomes.</p>
        </div>
        <div className="course-list">
          {courses.map((course, index) => (
            <article key={course.id} data-reveal>
              <span>0{index + 1}</span>
              <div><small>{course.status} · {course.date}</small><h3>{course.title}</h3><p>{course.text}</p></div>
              <div className="course-place"><MapPin size={14}/>{course.place}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationsSection({ t }) {
  return (
    <section className="publication-section" id="publications">
      <div className="publication-heading" data-reveal>
        <p className="eyebrow">Resources / guidance / publications</p>
        <h2>{t.publications}</h2>
        <p>Make ICCROM knowledge discoverable by challenge, programme, geography and audience — not only by document type.</p>
      </div>
      <div className="publication-row">
        {publications.map((publication, index) => (
          <a className={'publication-card publication-' + (index + 1)} href={publication.link} target="_blank" rel="noreferrer" key={publication.id} data-reveal>
            <div className="publication-cover">
              <span>ICCROM</span>
              <strong>{publication.title}</strong>
              <small>{publication.year}</small>
            </div>
            <div className="publication-meta">
              <span>{publication.type}</span>
              <h3>{publication.title}</h3>
              <p>{publication.text}</p>
              <strong>Open resource <ExternalLink size={14}/></strong>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function GlobalSection({ t }) {
  return (
    <section className="global-section">
      <div className="global-photo" data-reveal><img src={visuals.assembly} alt="" loading="lazy"/></div>
      <div className="global-copy" data-reveal>
        <p className="eyebrow">Member States / partnerships / multilateralism</p>
        <h2>{t.states}</h2>
        <p>ICCROM is a convening platform: a place where Member States, institutions and heritage professionals can exchange knowledge and turn shared challenges into shared action.</p>
        <div className="global-metrics">
          <div><strong><AnimatedNumber value={139}/></strong><span>Member States</span></div>
          <div><strong><AnimatedNumber value={19}/></strong><span>Countries in a single READY cohort</span></div>
          <div><strong><AnimatedNumber value={34}/></strong><span>World Heritage professionals in Suzhou</span></div>
        </div>
      </div>
    </section>
  );
}

function SearchBand({ t }) {
  const [query, setQuery] = useState('');
  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const all = [
      ...projects.map((item) => ({ ...item, kind: 'Project' })),
      ...news.map((item) => ({ ...item, kind: 'News' })),
      ...publications.map((item) => ({ ...item, kind: 'Publication' })),
      ...courses.map((item) => ({ ...item, kind: 'Course' })),
    ];
    return all.filter((item) => [item.title, item.short, item.summary, item.text, item.region, item.theme].filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query]);

  return (
    <section className="search-band">
      <div data-reveal><p className="eyebrow">One connected knowledge layer</p><h2>{t.search}</h2></div>
      <div className="search-shell" data-reveal>
        <Search size={20}/>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: climate, Africa, digital, World Heritage…" />
        {query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={18}/></button>}
        {matches.length > 0 && (
          <div className="search-results">
            {matches.map((match) => <div key={match.kind + '-' + match.id}><span>{match.kind}</span><strong>{match.title}</strong></div>)}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectDrawer({ selected, onClose }) {
  if (!selected) return null;
  const relatedNews = news.filter((item) => selected.related?.includes(item.id));
  const relatedPublications = publications.filter((item) => selected.related?.includes(item.id));
  const relatedCourses = courses.filter((item) => selected.related?.includes(item.id));

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="project-drawer" onMouseDown={(event) => event.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}><X/></button>
        <p className="eyebrow">Connected content / prototype</p>
        <h2>{selected.title}</h2>
        <p className="drawer-lead">{selected.short}</p>
        <div className="drawer-facts">
          <span><MapPin/>{selected.countries.join(' · ')}</span>
          <span><Layers3/>{selected.direction} · {selected.theme}</span>
        </div>
        <div className="drawer-relations">
          <span>Project</span><span>News</span><span>Publication</span><span>Course</span><span>Place</span><span>Priority Area</span>
        </div>
        {(relatedNews.length + relatedPublications.length + relatedCourses.length) > 0 && (
          <div className="drawer-related">
            <h3>Automatically related</h3>
            {relatedNews.map((item) => <a href={item.link} target="_blank" rel="noreferrer" key={item.id}><span>News · {item.date}</span><strong>{item.title}</strong><ExternalLink size={14}/></a>)}
            {relatedPublications.map((item) => <a href={item.link} target="_blank" rel="noreferrer" key={item.id}><span>Publication · {item.year}</span><strong>{item.title}</strong><ExternalLink size={14}/></a>)}
            {relatedCourses.map((item) => <div key={item.id}><span>Course · {item.date}</span><strong>{item.title}</strong></div>)}
          </div>
        )}
        <a className="cta dark" href={selected.link} target="_blank" rel="noreferrer">View source on ICCROM.org <ExternalLink size={15}/></a>
      </aside>
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-logo"><img src={BRAND_LOGO} alt="ICCROM"/></div>
      <h2>{t.footer}</h2>
      <div className="footer-meta">
        <span>Static restyling concept · October 2026</span>
        <span>Rome, Italy · iccrom.org</span>
        <span>Concept prototype · Agic Technology</span>
      </div>
    </footer>
  );
}

function Site() {
  const [theme, setTheme] = useTheme();
  const [lang, setLang, language] = useLanguage();
  const [selected, setSelected] = useState(null);
  const t = getCopy(lang);

  return (
    <div className="site-shell">
      <ReplayReveal/>
      <ScrollProgress/>
      <Header {...{ t, theme, setTheme, lang, setLang, language }}/>
      <Hero t={t}/>
      <BrandTicker/>
      <CareSection t={t}/>
      <NewsSection t={t}/>
      <ProjectsSection t={t} onOpen={setSelected}/>
      <LearningAndKnowledge t={t}/>
      <PublicationsSection t={t}/>
      <GlobalSection t={t}/>
      <SearchBand t={t}/>
      <Footer t={t}/>
      <ProjectDrawer selected={selected} onClose={() => setSelected(null)}/>
    </div>
  );
}

export default function App() {
  return <PasswordGate><Site/></PasswordGate>;
}
