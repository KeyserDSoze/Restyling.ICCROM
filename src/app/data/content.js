export const directions = [
  {
    id: 'conserve', number: '01', name: 'CONSERVE', kicker: 'Care for what matters',
    text: 'Upskill and adapt to meet new conservation challenges.',
    priorities: ['Future-ready conservation', 'Risk & resilience', 'Knowledge & innovation'],
    accent: 'mint'
  },
  {
    id: 'activate', number: '02', name: 'ACTIVATE', kicker: 'Turn heritage into positive change',
    text: 'Accelerate sustainable socio-economic growth through heritage.',
    priorities: ['Heritage for climate solutions', 'Heritage for social cohesion', 'Better lives & livelihoods'],
    accent: 'amber'
  },
  {
    id: 'recognize', number: '03', name: 'RECOGNIZE', kicker: 'Make heritage visible and valued',
    text: 'Strengthen recognition, responsibility and support for heritage in society and policy.',
    priorities: ['Global relevance', 'Member State impact', 'Partnership & advocacy'],
    accent: 'coral'
  }
];

export const projects = [
  {
    id: 'africa-craft',
    title: 'Transformative Capacity Building for African Craftsmanship',
    short: 'A €6M, three-year initiative connecting heritage conservation, skills, employment and entrepreneurship.',
    region: 'Africa', direction: 'ACTIVATE', theme: 'Livelihoods', metric: '€6M · 3 years',
    countries: ['Côte d’Ivoire', 'Egypt', 'Kenya', 'Tunisia'],
    related: ['news-artisans', 'pub-strategy'],
    link: 'https://www.iccrom.org/programmes/towards-sustainable-development-africa-transformative-capacity-building-advance',
    tone: 'ochre'
  },
  {
    id: 'asili',
    title: 'ASILI — Heritage for Climate Action in Africa',
    short: 'A 30-month initiative scaling heritage-based climate action across four culturally significant sites.',
    region: 'Africa', direction: 'ACTIVATE', theme: 'Climate', metric: '30 months',
    countries: ['Mauritius', 'The Gambia', 'Egypt', 'Madagascar'],
    related: ['news-asili'],
    link: 'https://www.iccrom.org/news/iccrom-and-aliph-launch-asili-advance-heritage-climate-action-africa',
    tone: 'forest'
  },
  {
    id: 'ready',
    title: 'READY Track 2',
    short: 'Building a European network of heritage risk managers and cultural first aiders for disasters and complex emergencies.',
    region: 'Europe', direction: 'CONSERVE', theme: 'Resilience', metric: '25 professionals · 19 countries',
    countries: ['Romania', 'Europe'], related: ['news-ready', 'course-ready'],
    link: 'https://www.iccrom.org/courses/call-applications-ready-track-2-safeguarding-heritage-cities-sites-buildings-traditions', tone: 'blue'
  },
  {
    id: 'world-heritage',
    title: 'World Heritage Leadership',
    short: 'Capacity building that brings people, nature and culture together to improve management of World Heritage places.',
    region: 'Global', direction: 'CONSERVE', theme: 'World Heritage', metric: 'Global programme',
    countries: ['Global'], related: ['pub-managing', 'news-whc'],
    link: 'https://www.iccrom.org/programmes/world-heritage-leadership', tone: 'indigo'
  },
  {
    id: 'digital',
    title: 'Sustaining Digital Heritage',
    short: 'Building capabilities to preserve, govern and sustain heritage created and experienced in the digital realm.',
    region: 'Global', direction: 'RECOGNIZE', theme: 'Digital', metric: 'Global programme',
    countries: ['Global'], related: ['news-ai'],
    link: 'https://www.iccrom.org/programmes/sustaining-digital-heritage', tone: 'violet'
  },
  {
    id: 'cheminova',
    title: 'ChemiNovaEU',
    short: 'Connecting conservation professionals, communities and intelligent technology to monitor Europe’s cultural assets.',
    region: 'Europe', direction: 'CONSERVE', theme: 'Innovation', metric: 'EU collaboration',
    countries: ['Europe'], related: [],
    link: 'https://www.iccrom.org/programmes/sustainability-and-built-heritage/projects', tone: 'teal'
  }
];

export const news = [
  { id:'news-artisans', date:'30 Sep 2026', title:'Young Craftspeople Explore Heritage Skills and Traditions in Umbria', region:'Europe / Africa', tag:'Capacity building', summary:'Participants explored towns where craftsmanship, local economies and cultural tourism meet.', link:'https://www.iccrom.org/news-events/news', tone:'ochre' },
  { id:'news-asili', date:'22 Sep 2026', title:'ASILI Connects Heritage, Climate Action and Community Knowledge', region:'Africa', tag:'Climate', summary:'Four places across Africa become living laboratories for climate action rooted in heritage and community knowledge.', link:'https://www.iccrom.org/news-events/news', tone:'forest' },
  { id:'news-strategy', date:'18 Sep 2026', title:'Conserving Our Past, Inspiring Our Future', region:'Global', tag:'Strategy', summary:'The 2026–2031 strategy reframes capacity building around people, institutions and the wider policy context.', link:'https://www.iccrom.org/news/conserving-our-past-inspiring-our-future', tone:'coral' },
  { id:'news-ready', date:'09 Sep 2026', title:'Bucharest Sets the Stage for READY Track 2', region:'Europe', tag:'Resilience', summary:'Heritage professionals strengthen a growing network of risk managers and cultural first aiders.', link:'https://www.iccrom.org/news-events/news', tone:'blue' },
  { id:'news-whc', date:'10 Aug 2026', title:'Strengthening the World Heritage System through Capacity Building', region:'Global', tag:'World Heritage', summary:'ICCROM worked with States Parties, UNESCO and Advisory Bodies at the 48th World Heritage Committee.', link:'https://www.iccrom.org/news-events/news', tone:'indigo' },
  { id:'news-ai', date:'26 Jan 2026', title:'Ctrl+S Culture: AI and Heritage in a Digital World', region:'Global', tag:'Digital heritage', summary:'A global conversation on how AI is reshaping how heritage is created, preserved, interpreted and shared.', link:'https://www.iccrom.org/programmes/sustaining-digital-heritage/news', tone:'violet' }
];

export const publications = [
  { id:'pub-strategy', year:'2026', type:'Corporate document', title:'ICCROM Strategic Plan 2026–2031', text:'The CARE vision — Conserve, Activate and Recognize — translated into an integrated six-year strategic framework.', link:'https://www.iccrom.org/publication/strategic-plan-2026%E2%80%932031' },
  { id:'pub-inclusive', year:'2026', type:'Learning document', title:'Leveraging Cultural Heritage Conservation for Inclusive Growth with Communities', text:'Research and field experience from Southeast Asia on heritage as a shared asset for participation, capacity and inclusive growth.', link:'https://www.iccrom.org/resources/publications' },
  { id:'pub-managing', year:'2026', type:'Guidance', title:'Managing World Heritage', text:'A practical resource for strengthening management of World Heritage places through integrated, people-centred approaches.', link:'https://www.iccrom.org/resources/publications' },
  { id:'pub-eoh', year:'2026', type:'Toolkit', title:'Enhancing Our Heritage Toolkit 2.0', text:'Tools for assessing and improving the management effectiveness of World Heritage properties.', link:'https://www.iccrom.org/resources/publications' }
];

export const courses = [
  { id:'course-ready', status:'Ongoing', date:'Until 26 Feb 2027', place:'Romania / Hybrid', title:'READY Track 2', text:'Safeguarding heritage cities, sites, buildings and living traditions in the face of disasters and complex emergencies.' },
  { id:'course-nara', status:'Ongoing', date:'Until 08 Oct 2026', place:'Online + Nara, Japan', title:'Conservation and Management of Archaeological Sites and Artefacts 2026', text:'The 27th group training course for early-career professionals in the Asia-Pacific region.' },
  { id:'course-jeju', status:'Upcoming', date:'26–30 Oct 2026', place:'Jeju, Republic of Korea', title:'Managing Multi-Internationally Designated Areas effectively', text:'A focused programme on places carrying multiple international designations.' }
];

export const stats = [
  { value:'139', label:'Member States' },
  { value:'3', label:'Strategic Directions' },
  { value:'9', label:'Priority Areas' },
  { value:'70', label:'Years of global heritage action', suffix:'~' }
];
