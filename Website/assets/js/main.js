/**
 * SecureKern - OT Security Website
 * Main JavaScript
 */

// === CONFIGURATION ===
const CONFIG = {
  lang: {
    default: 'de',
    available: ['de', 'en']
  },
  animation: {
    observerOptions: {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  }
};

// === TRANSLATIONS ===
const translations = {
  de: {
    nav: {
      logo: 'SECURE KERN',
      home: 'Start',
      services: 'Leistungen',
      solutions: 'Lösungen',
      solutions_all: 'Alle Lösungen',
      about: 'über uns',
      resources: 'Ressourcen',
      blog: 'Blog',
      certifications: 'Zertifizierungen',
      contact: 'Kontakt',
      cta: 'Jetzt Beraten Lassen'
    },
    hero: {
      headline: 'Sichern Sie Ihren industriellen Kern mit bewährter Expertise',
      subheadline: 'NIS2-konforme Compliance, IEC 62443 Gap-Analysen, Geschäftskontinuität für den deutschen Mittelstand. Bezahlbar. Schnell. Ingenieurgetrieben.',
      ctaPrimary: 'Kostenlosen 30-Min Risiko-Scan buchen',
      ctaSecondary: 'Leistungen ansehen',
      trustSignal1: '15 Jahre OT-Erfahrung',
      trustSignal2: '70% schnellere Berichte (KI)',
      trustSignal3: '1,5-4k? pro Auftrag'
    },
    home: {
      why: {
        title: 'Warum Unternehmen auf SecureKern setzen',
        subtitle: 'Wir kombinieren tiefgreifendes OT-Verständnis mit modernster Technologie und regulatorischer Expertise.'
      },
      values: {
        ot_specialization: 'Wir arbeiten dort, wo klassische IT-Security endet: in Produktionsnetzen, SCADA-Systemen und mit industriellen Protokollen. Unser Fokus liegt auf Hochverfügbarkeit und Safety.',
        method_cta: 'Unsere Methodik',
        tech_cta: 'Technologie im Einsatz'
      },
      cta: {
        more_expertise: 'Mehr über unsere Expertise'
      }
    },
    services: {
      title: 'Unsere Leistungen',
      subtitle: 'OT Security Services',
      description: 'Spezialisierte OT-Sicherheit für kritische Infrastrukturen und Industrieanlagen',
      ctaDetails: 'Details ansehen',
      service1: {
        title: 'NIS2 Readiness Sprint',
        description: 'Umfassende Gap-Analyse und Roadmap zur NIS2-Compliance',
        price: '€25.000–45.000',
        duration: '2–6 Wochen'
      },
      service2: {
        title: 'IEC 62443 Gap Assessment',
        description: 'Maturity-Bewertung und Remediation-Plan',
        price: '€35.000–70.000',
        duration: '4–8 Wochen',
        audience: 'Produzenten, Maschinenbauer, Automotive-Zulieferer, Chemieanlagen'
      },
      service3: {
        title: 'Segmentations-Design',
        description: 'Zone & Conduit Design mit Implementierungs-Support',
        price: '€60.000–180.000',
        duration: '8–12 Wochen'
      },
      otRisk: {
        title: 'OT Risk Assessment',
        description: 'Threat & Risk Assessment (TARA) für Operational Technology',
        price: '€20.000–35.000',
        duration: '4–6 Wochen',
        audience: 'Jedes Unternehmen mit SCADA, DCS, PLC-Systemen'
      },
      otMdr: {
        title: 'OT-MDR',
        description: 'OT Security Monitoring & Detect & Respond'
      },
      training: {
        title: 'Training & Workshops',
        description: 'Hands-on OT Security Trainings'
      },
      retainer: {
        title: 'Retainer Support',
        description: 'Managed security & on-call support'
      }
    },
    about: {
      hero: {
        headline: 'Die Köpfe hinter SecureKern',
        subheadline: 'Engineering-driven. Praxisnah. Ohne Berater-Blasen.'
      },
      p1: 'Nach 15 Jahren in der Automotive-Industrie habe ich mehr Produktionsstillstände, SCADA-Kompromittierungen und ?Warum-funktioniert-die-Firewall-nicht??-Momente erlebt, als mir lieb ist.',
      p2: '2024 habe ich SecureKern gegründet, um mittelständischen Produktionsbetrieben praxisnahe OT-Expertise zu liefern – Hands-on, pragmatisch und bezahlbar.',
      quote: 'Wenn ein Berater noch nie einen PLC debuggt hat, sollte er keine OT-Security-Roadmap schreiben.',
      values: {
        praxis: 'Unsere Empfehlungen funktionieren in der Realität, nicht nur auf Papier. Wir kennen die Einschränkungen einer 24/7-Produktion.',
        independent: 'Wir sind keinem Hersteller verpflichtet. Unsere Empfehlungen basieren auf Ihren Anforderungen, nicht auf Vertriebszielen.',
        mittelstand: 'Wir verstehen die Budgets und Ressourcen des Mittelstands. Unsere Lösungen sind skalierbar und kosteneffizient.',
        engineering: 'Wir denken wie Ingenieure, nicht wie Compliance-Berater. Das Ergebnis: technisch fundierte und wirtschaftlich sinnvolle Lösungen.'
      }
    },
    contact: {
      hero: {
        headline: 'Lassen Sie uns sprechen',
        subheadline: 'Buchen Sie ein kostenloses 30-minütiges Beratungsgespräch.'
      },
      form: {
        title: 'Beratungsgespräch buchen',
        description: 'Beschreiben Sie kurz Ihre Herausforderung – wir melden uns mit einer ersten Einschätzung.',
        name: 'Name *',
        company: 'Unternehmen *',
        email: 'E-Mail *',
        phone: 'Telefon',
        message: 'Ihre Nachricht',
        consent: 'Ich akzeptiere die Datenschutzerklärung *',
        submit: 'Anfrage senden'
      }
    },
    resources: {
      title: 'Kostenlose Ressourcen',
      subtitle: 'Whitepapers, Leitfäden, Tools',
      whitepapers: 'Whitepapers',
      checklists: 'Checklisten',
      guides: 'Leitfäden',
      tools: 'Tools & Templates'
    },
    solutions: {
      title: 'Branchenspezifische Lösungen',
      subtitle: 'Automotive, Energie, Chemie, Healthcare',      lead: 'Jede Branche hat eigene OT-Sicherheitsanforderungen. Wir kennen die spezifischen Herausforderungen und regulatorischen Rahmenbedingungen Ihrer Industrie.',
      intro: 'SecureKern bietet keine generischen Lösungen. Unsere Experten verstehen die spezifischen OT-Protokolle, Compliance-Anforderungen und Betriebsabläufe Ihrer Branche – und liefern maßgeschneiderte Sicherheitskonzepte, die in der Praxis funktionieren.',      automotive: {
        title: 'Produktionssicherheit für die Automobilindustrie',
        subtitle: 'Automotive & Tier 1-3 Zulieferer'
      }
    },
    blog: {
      title: 'OT-Security Blog',
      subtitle: 'Aktuelle Insights, Best Practices und Branchen-News',
      post1: {
        title: 'NIS2-Readiness: Was Mittelständler bis 2025 wissen müssen',
        excerpt: 'Die neue NIS2-Richtlinie bringt erhebliche Veränderungen für mittelständische Unternehmen.'
      },
      post2: {
        title: 'IEC 62443 Zone & Conduit: Praxisguide',
        excerpt: 'Wie Sie Ihr OT-Netzwerk richtig segmentieren.'
      },
      post3: {
        title: 'Case Study: Automotive Zulieferer',
        excerpt: 'Von der Gap-Analyse zur zertifizierten OT-Sicherheit.'
      },
      readMore: 'Weiterlesen'
    },
    pages: {
      webinars: { title: 'Webinare & Events' },
      team: { title: 'Ingenieure, keine Berater' },
      'iso-22301': { title: 'ISO 22301 BCMS für OT-Umgebungen' },
      'risk-training': { title: 'Risikobewertung & Training' },
      manufacturing: { title: 'OT-Sicherheit für Manufacturing & Automotive', headline: 'Compliance-Druck? Wir liefern Lösungen.' },
      downloads: { title: 'Downloads & Whitepapers' },
      certifications: { title: 'Qualifikationen & Partnerschaften' },
      chemical: { title: 'OT-Sicherheit für Chemie & Pharma' },
      energy: { title: 'OT-Sicherheit für Energy & Utilities' },
      'ot_mdr': { title: 'OT-MDR & Incident Response', subtitle: 'Rund-um-die-Uhr-Schutz für Ihre kritische Infrastruktur.', cta: 'Jetzt MDR-Beratung anfragen', why_title: 'Warum ist OT-spezifisches MDR entscheidend?', why_text: 'Klassische IT-Security-Lösungen versagen in der OT. Industrielle Protokolle, Echtzeitanforderungen und die hohe Kritikalität von Produktionsprozessen erfordern spezialisiertes Monitoring und Analysten, die den Unterschied zwischen einer Prozessoptimierung und einem Cyberangriff kennen.' },
      'nis2': { title: 'NIS2 Readiness Sprint', overview: 'Wir haben einen intensiven, ergebnisorientierten "Sprint" entwickelt, der speziell darauf ausgelegt ist, Ihr Unternehmen schnell und effizient auf die Anforderungen der NIS2-Richtlinie vorzubereiten. Anstatt monatelanger Projekte liefern wir in kurzer Zeit klare Analysen und einen umsetzbaren Maßnahmenkatalog.' },
      impressum: { title: 'Impressum' },
      datenschutz: { title: 'Datenschutzerklärung' },
      agb: { title: 'Allgemeine Geschäftsbedingungen' }
    },
    meta: {
      index: {
        title: 'SecureKern – OT-Cybersicherheit für kritische Infrastrukturen | NIS2 & IEC 62443',
        description: 'Spezialisierte OT/ICS-Cybersicherheit für deutsche Industrieunternehmen. NIS2-Readiness, IEC 62443 Gap-Analysen, Netzwerksegmentierung. Kostenlosen Security-Check buchen.'
      },
      loesungen: {
        title: 'Branchenspezifische Lösungen | SecureKern GmbH',
        description: 'Branchenspezifische OT-Sicherheitslösungen für Manufacturing, Energy und Chemicals – zugeschnitten auf Ihre Industrie.'
      }
    },
    footer: {
      copyright: '? 2026 SecureKern GmbH. Alle Rechte vorbehalten.',
      about: 'SecureKern ist Ihr Partner für OT-Security. Wir schützen kritische Infrastrukturen mit maßgeschneiderten Sicherheitslösungen.',
      links: {
        impressum: 'Legal Notice',
        datenschutz: 'Privacy Policy',
        agb: 'Terms & Conditions'
      }
    }
  },
  en: {
    nav: {
      logo: 'SECURE KERN',
      home: 'Home',
      services: 'Services',
      solutions: 'Solutions',
      solutions_all: 'All solutions',
      about: 'About',
      resources: 'Resources',
      blog: 'Blog',
      certifications: 'Certifications',
      contact: 'Contact',
      cta: 'Book Consultation'
    },
    hero: {
      headline: 'Secure Your Industrial Core with Proven Expertise',
      subheadline: 'NIS2-ready compliance, IEC 62443 gap analysis, business continuity for German SMEs. Affordable. Fast. Engineering-driven.',
      ctaPrimary: 'Book Free 30-Min Risk Scan',
      ctaSecondary: 'View Services',
      trustSignal1: '15 Years OT Experience',
      trustSignal2: '70% Faster Reports (AI)',
      trustSignal3: '1.5-4k? per Engagement'
    },
    home: {
      why: {
        title: 'Why companies choose SecureKern',
        subtitle: 'We combine deep OT expertise with state-of-the-art technology and regulatory know-how.'
      },
      index: {
        nis2_notice: 'The NIS2 directive affects roughly 30,000 organizations from October 2024. We guide you through the entire process, from scoping to audit-ready documentation.',
        iec_description: 'IEC 62443 is the leading standard for industrial automation system security (IACS). We analyze your systems and produce a detailed roadmap to compliance.',
        segmentation_description: 'Flat OT networks are a high risk. We design and plan the implementation of a robust zone model according to IEC 62443 to minimize the attack surface.',
        mdr_description: 'Cyberattacks happen 24/7. Our Managed Detection & Response service monitors your OT networks, alerts on anomalies and supports incident response when needed.',
        systematic_approach: 'A systematic approach based on the leading international standard for industrial cybersecurity.',
        deep_understanding: 'Deep understanding of processes in automotive, manufacturing, energy and critical infrastructures.',
        independent_consulting: 'Independent consulting',
        realistic_solutions: 'We develop realistic solutions that match realistic budgets – not enterprise pricing.',
        no_enterprise_programs: 'No oversized enterprise programs. We offer modular packages and budget-realistic action plans with transparent pricing that match your pace.'
      }
      values: {
        ot_title: 'OT Specialization',
        ot_specialization: 'We operate where traditional IT security stops: production networks, SCADA systems, and industrial protocols. We focus on high availability and safety.',
        method_title: 'Regulatory & Technical Rigor',
        method_text: 'Our methodology is aligned with IEC 62443, NIS2 and ISO 27001. The result: audit-ready evidence for regulators, insurers and auditors.',
        method_cta: 'Our Methodology',
        tech_title: 'AI-assisted Analysis',
        tech_text: 'With AI-driven document processing we deliver risk analyses and compliance checks up to 70% faster than traditional consultancies – with the same technical depth.',
        tech_cta: 'Technology in use'
      },
      cta: {
        more_expertise: 'Learn more about our expertise'
      }
    },
    index: {
      nis2_notice: 'The NIS2 directive affects roughly 30,000 organizations from October 2024. We guide you through the entire process, from scoping to audit-ready documentation.',
      iec_description: 'IEC 62443 is the leading standard for industrial automation system security (IACS). We analyze your systems and produce a detailed roadmap to compliance.',
      segmentation_description: 'Flat OT networks are a high risk. We design and plan the implementation of a robust zone model according to IEC 62443 to minimize the attack surface.',
      mdr_description: 'Cyberattacks happen 24/7. Our Managed Detection & Response service monitors your OT networks, alerts on anomalies and supports incident response when needed.',
      systematic_approach: 'A systematic approach based on the leading international standard for industrial cybersecurity.',
      deep_understanding: 'Deep understanding of processes in automotive, manufacturing, energy and critical infrastructures.',
      independent_consulting: 'Independent consulting',
      realistic_solutions: 'We develop realistic solutions that match realistic budgets – not enterprise pricing.',
      no_enterprise_programs: 'No oversized enterprise programs. We offer modular packages and budget-realistic action plans with transparent pricing that match your pace.'
    },
    services: {
      title: 'Our Services',
      subtitle: 'OT Security Services',
      description: 'Specialized OT security for critical infrastructure and industrial facilities',
      ctaDetails: 'View details',
      service1: {
        title: 'NIS2 Readiness Sprint',
        description: 'Comprehensive gap analysis and roadmap to NIS2 compliance',
        price: '€25,000–45,000',
        duration: '2–6 weeks'
      },
      service2: {
        title: 'IEC 62443 Gap Assessment',
        description: 'Maturity assessment and remediation plan',
        price: '€35,000–70,000',
        duration: '4–8 weeks',
        audience: 'Manufacturers, machine builders, automotive suppliers, chemical plants'
      },
      service3: {
        title: 'Segmentation Design',
        description: 'Zone & conduit design with implementation support',
        price: '€60,000–180,000',
        duration: '8–12 weeks'
      },
      otRisk: {
        title: 'OT Risk Assessment',
        description: 'Threat & Risk Assessment (TARA) for Operational Technology',
        price: '€20,000–35,000',
        duration: '4–6 weeks',
        audience: 'Any organization with SCADA, DCS, PLC systems'
      },
      otMdr: {
        title: 'OT-MDR',
        description: 'OT Security Monitoring & Detect & Respond'
      },
      training: {
        title: 'Training & Workshops',
        description: 'Hands-on OT Security Trainings'
      },
      retainer: {
        title: 'Retainer Support',
        description: 'Managed security & on-call support'
      }
    },
    about: {
      hero: {
        headline: 'The Minds Behind SecureKern',
        subheadline: 'Engineering-driven. Practical. No consultant fluff.'
      },
      p1: 'After 15 years in the automotive industry I have seen more production outages, SCADA compromises and "why-is-this-firewall-not-working?" moments than I care to admit.',
      p2: 'In 2024 I founded SecureKern to bring practical OT expertise to midsize manufacturers – hands-on, pragmatic, and cost-effective.',
      quote: 'If a consultant has never debugged a PLC, they should not write an OT security roadmap.',
      values: {
        praxis: 'Our recommendations work in reality, not just on paper. We understand the constraints of 24/7 production.',
        independent: 'We are independent of vendors. Our recommendations are based on your needs, not sales targets.',
        mittelstand: 'We understand midsize company budgets and resources. Our solutions are scalable and cost-effective.',
        engineering: 'We think like engineers, not compliance consultants. The result: technically sound and economically sensible solutions.'
      }
    },
    contact: {
      hero: {
        headline: 'Let's Talk',
        subheadline: 'Book a free 30-min consultation.'
      },
      form: {
        title: 'Book Consultation',
        description: 'Describe briefly your challenge – we will reply with an initial assessment.',
        name: 'Name *',
        company: 'Company *',
        email: 'Email *',
        phone: 'Phone',
        message: 'Your message',
        consent: 'I accept the Privacy Policy *',
        submit: 'Send request'
      }
    },
    resources: {
      title: 'Free Resources',
      subtitle: 'Whitepapers, Guides, Tools',
      whitepapers: 'Whitepapers',
      checklists: 'Checklists',
      guides: 'Guides',
      tools: 'Tools & Templates'
    },
    solutions: {
      title: 'Industry Solutions',
      subtitle: 'Automotive, Energy, Chemical, Healthcare',
      lead: 'Every industry has unique OT security requirements. We know the specific challenges and regulatory frameworks of your industry.',
      intro: 'SecureKern does not offer generic solutions. Our experts understand the specific OT protocols, compliance requirements and operational realities of your industry – and deliver tailored security concepts that work in practice.',
      automotive: {
        title: 'Production safety for the automotive industry',
        subtitle: 'Automotive & tier 1-3 suppliers'
      }
    },
    blog: {
      title: 'OT Security Blog',
      subtitle: 'Latest insights, best practices and industry news',
      post1: {
        title: 'NIS2 Readiness: What SMEs need to know by 2025',
        excerpt: 'The new NIS2 directive brings major changes for small and medium businesses.'
      },
      post2: {
        title: 'IEC 62443 Zone & Conduit: A practical guide',
        excerpt: 'How to correctly segment your OT network.'
      },
      post3: {
        title: 'Case Study: Automotive Supplier',
        excerpt: 'From gap analysis to certified OT security.'
      },
      readMore: 'Read more'
    },
    pages: {
      webinars: { title: 'Webinars & Events' },
      team: { title: 'Engineers, not consultants' },
      'iso-22301': { title: 'ISO 22301 BCMS for OT environments' },
      'risk-training': { title: 'Risk assessment & training' },
      manufacturing: { title: 'OT security for manufacturing & automotive', headline: 'Compliance pressure? We deliver solutions.' },
      downloads: { title: 'Downloads & Whitepapers' },
      certifications: { title: 'Qualifications & Partnerships' },
      chemical: { title: 'OT security for Chemical & Pharma' },
      energy: { title: 'OT security for Energy & Utilities' },
      'ot_mdr': { title: 'OT-MDR & Incident Response', subtitle: '24/7 protection for your critical infrastructure.', cta: 'Request MDR consultation now', why_title: 'Why OT-specific MDR matters', why_text: 'Traditional IT security solutions fail in OT. Industrial protocols, real-time requirements and the high criticality of production processes demand specialized monitoring and analysts who can distinguish between process optimization and cyber attacks.' },
      'nis2': { title: 'NIS2 Readiness Sprint', overview: 'We have developed an intensive, outcome-oriented "sprint" specifically designed to prepare your organization quickly and efficiently for the requirements of the NIS2 directive. Instead of months-long projects, we deliver clear analyses and an actionable catalogue of measures in a short time.' },
      impressum: { title: 'Legal Notice' },
      datenschutz: { title: 'Privacy Policy' },
      agb: { title: 'Terms & Conditions' }
    },
    meta: {
      index: {
        title: 'SecureKern – OT security for critical infrastructure | NIS2 & IEC 62443',
        description: 'Specialized OT/ICS security for German industry. NIS2 Readiness, IEC 62443 gap analysis, network segmentation. Free security check available.'
      },
      loesungen: {
        title: 'Industry Solutions | SecureKern GmbH',
        description: 'Industry-specific OT security solutions for Manufacturing, Energy and Chemicals – tailored to your industry.'
      }
    },
    footer: {
      copyright: '? 2026 SecureKern GmbH. All rights reserved.',
      about: 'SecureKern is your partner for OT security. We protect critical infrastructure with tailor-made security solutions.',
      links: {
        impressum: 'Legal Notice',
        datenschutz: 'Privacy Policy',
        agb: 'Terms & Conditions'
      }
    }
  }
};

// === STATE MANAGEMENT ===
// Detect current language from URL or fallback to stored preference
let currentLang = (location.pathname.startsWith('/en') ? 'en' : (localStorage.getItem('securekern_lang') || CONFIG.lang.default));

function showToast(message) {
  try {
    const existing = document.querySelector('.sk-toast');
    const toast = existing || document.createElement('div');
    toast.className = 'sk-toast';
    toast.textContent = message;
    if (!existing) document.body.appendChild(toast);

    toast.classList.add('sk-toast--show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('sk-toast--show');
    }, 2600);
  } catch {
    // Fallback: no-op if DOM is unavailable
  }
}

// === LANGUAGE SWITCHING ===
const LANG_FLAGS = {
  de: '/assets/images/flags/de.svg',
  en: '/assets/images/flags/gb.svg'
};

function ensureLangToggle() {
  let langToggle = document.querySelector('.nav__lang-toggle');
  const actions = document.querySelector('.nav__actions');
  if (!langToggle) {
    langToggle = document.createElement('button');
    langToggle.type = 'button';
    langToggle.className = 'nav__lang-toggle';
    langToggle.setAttribute('aria-label', 'Sprache wechseln');
    if (actions) actions.insertBefore(langToggle, actions.firstChild);
  }

  // Ensure the button contains the expected markup (flag + label)
  langToggle.innerHTML = `<img src="${LANG_FLAGS[currentLang]}" alt="" /><span class="nav__lang-label"></span>`;

  // attach click handler (idempotent)
  if (!langToggle._langHandlerAttached) {
    langToggle.addEventListener('click', () => {
      // Path-based toggle: add or remove /en prefix and navigate
      const path = window.location.pathname;
      if (path.startsWith('/en')) {
        // Go to German equivalent (strip leading /en)
        const target = path.replace(/^\/en/, '') || '/';
        window.location.pathname = target;
      } else {
        // Go to English equivalent (preserve path when prefixing)
        const target = '/en' + path;
        window.location.pathname = target;
      }
    });
    langToggle._langHandlerAttached = true;
  }

  updateLangToggleUI();
}

function updateLangToggleUI(){
  const langToggle = document.querySelector('.nav__lang-toggle');
  const img = langToggle?.querySelector('img');
  const label = langToggle?.querySelector('.nav__lang-label');
  const targetLang = currentLang === 'de' ? 'en' : 'de';
  if (img) {
    img.src = LANG_FLAGS[currentLang];
    img.alt = currentLang === 'de' ? 'Deutsch' : 'English (UK)';
  }
  if (label) {
    label.textContent = targetLang.toUpperCase();
  }
  if (langToggle) {
    langToggle.setAttribute('title', targetLang === 'en' ? 'Switch to English' : 'Zu Deutsch wechseln');
  }
}

function switchLanguage(lang) {
  if (!CONFIG.lang.available.includes(lang)) return;
  
  currentLang = lang;
  localStorage.setItem('securekern_lang', lang);
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all translatable elements
  updateTranslations();
  
  // Update language toggle UI
  updateLangToggleUI();
}

function applyContentMap(t){
  const map = [
    { sel: 'a.nav__link[href$="index.html"]', key: 'nav.home' },
    { sel: 'a.nav__link[href$="leistungen.html"]', key: 'nav.services' },
    { sel: 'a.nav__link[href$="loesungen.html"]', key: 'nav.solutions_all' },
    { sel: 'a.nav__link[href$="ueber-uns.html"]', key: 'nav.about' },
    { sel: 'a.nav__link[href$="blog.html"]', key: 'nav.blog' },
    { sel: 'a.nav__link[href$="certifications.html"]', key: 'nav.certifications' },
    { sel: '.hero__content h1', key: 'hero.headline' },
    { sel: '.hero__subtitle', key: 'hero.subheadline' },
    { sel: 'a.btn--primary[href$="kontakt.html"], a[href$="kontakt.html"].btn--primary', key: 'nav.cta' },
    { sel: 'a.btn--secondary[href$="leistungen.html"], a[href$="leistungen.html"].btn--secondary', key: 'hero.ctaSecondary' },
    { sel: '.services-section .section-title h2', key: 'services.title' },
    { sel: '.footer__links a[href$="impressum.html"]', key: 'footer.links.impressum' },
    { sel: '.footer__links a[href$="datenschutz.html"]', key: 'footer.links.datenschutz' },
    { sel: '.footer__links a[href$="agb.html"]', key: 'footer.links.agb' }
  ];

  map.forEach(item => {
    const el = document.querySelector(item.sel);
    if (!el) return;
    const keys = item.key.split('.');
    let value = t;
    for (const k of keys) value = value?.[k];
    if (!value) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = value;
    else el.textContent = value;
  });

  // Dropdown parent label (services)
  const servicesDropdownLink = document.querySelector('.nav__dropdown-link[href$="nis2-readiness.html"]');
  if (servicesDropdownLink) {
    const parentItem = servicesDropdownLink.closest('.nav__item--has-dropdown');
    if (parentItem) {
      const parentLink = parentItem.querySelector('.nav__link');
      if (parentLink) {
        // Replace the visible text node (before the chevron icon)
        const textNode = Array.from(parentLink.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
        if (textNode) textNode.textContent = t.nav.services + ' ';
      }
    }
  }
}

function updateTranslations() {
  const t = translations[currentLang];
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (value) {
      const tag = element.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        element.placeholder = value;
      } else if (tag === 'META') {
        element.setAttribute('content', value);
      } else if (tag === 'TITLE') {
        document.title = value;
        element.textContent = value;
      } else {
        element.textContent = value;
      }
    }
  });

  // apply selection-based map for hard-coded pages
  applyContentMap(t);
}

// === MOBILE NAVIGATION ===
function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const navMenu = document.querySelector('.nav__menu');
  const navMenuContainer = document.querySelector('.nav__menu-container');
  
  if (!hamburger || !navMenu) return;

  const dropdownItems = navMenu.querySelectorAll('.nav__item--has-dropdown');

  function setDropdownOpen(item, isOpen) {
    item.classList.toggle('open', isOpen);
    const link = item.querySelector('.nav__link');
    if (link) link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function closeAllDropdowns() {
    dropdownItems.forEach(item => setDropdownOpen(item, false));
  }
  
  function setNavOpen(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (navMenuContainer) navMenuContainer.classList.toggle('active', isOpen);
    if (!isOpen) closeAllDropdowns();
  }

  hamburger.addEventListener('click', () => {
    setNavOpen(!hamburger.classList.contains('active'));
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const menuRoot = navMenuContainer || navMenu;
    if (!hamburger.contains(e.target) && !menuRoot.contains(e.target)) {
      setNavOpen(false);
    }
  });
  
  // Close menu when clicking on link (non-dropdown links only)
  navMenu.querySelectorAll('.nav__item:not(.nav__item--has-dropdown) .nav__link').forEach(link => {
    link.addEventListener('click', () => {
      setNavOpen(false);
    });
  });

  // Mobile dropdown toggle
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav__link');
    link.addEventListener('click', (e) => {
      // Only toggle dropdown on mobile (when hamburger is visible)
      if (window.innerWidth <= 1200) {
        e.preventDefault();
        // Close other open dropdowns
        dropdownItems.forEach(other => {
          if (other !== item) setDropdownOpen(other, false);
        });
        setDropdownOpen(item, !item.classList.contains('open'));
      }
    });
  });

  // Close dropdowns on link click inside dropdown
  navMenu.querySelectorAll('.nav__dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      setNavOpen(false);
      closeAllDropdowns();
    });
  });
}

function initDropdownStability() {
  const items = Array.from(document.querySelectorAll('.nav__item--has-dropdown'));
  if (!items.length) return;

  const isDesktop = () => window.innerWidth > 1200 && window.matchMedia('(hover: hover)').matches;
  const isTouchDesktop = () =>
    window.innerWidth > 1200 &&
    (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches);
  const CLOSE_DELAY_MS = 220;

  function setOpen(item, open) {
    item.classList.toggle('open', open);
    const link = item.querySelector('.nav__link');
    if (link) link.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeOthers(exceptItem) {
    items.forEach(item => {
      if (item !== exceptItem) setOpen(item, false);
    });
  }

  items.forEach(item => {
    let closeTimer;
    const parentLink = item.querySelector('.nav__link');

    function openItem() {
      if (!isDesktop()) return;
      clearTimeout(closeTimer);
      closeOthers(item);
      setOpen(item, true);
    }

    function scheduleClose() {
      if (!isDesktop()) return;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => setOpen(item, false), CLOSE_DELAY_MS);
    }

    item.addEventListener('mouseenter', openItem);
    item.addEventListener('mouseleave', scheduleClose);
    item.addEventListener('focusin', openItem);
    item.addEventListener('focusout', (e) => {
      if (!isDesktop()) return;
      const next = e.relatedTarget;
      if (next && item.contains(next)) return;
      scheduleClose();
    });

    // Large touch devices (no hover): use click to toggle dropdown
    parentLink?.addEventListener('click', (e) => {
      if (!isTouchDesktop()) return;
      e.preventDefault();
      const willOpen = !item.classList.contains('open');
      closeOthers(item);
      setOpen(item, willOpen);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') items.forEach(item => setOpen(item, false));
  });

  document.addEventListener('click', (e) => {
    if (!isTouchDesktop()) return;
    const menu = document.querySelector('.nav__menu-container');
    if (menu && !menu.contains(e.target)) items.forEach(item => setOpen(item, false));
  });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, CONFIG.animation.observerOptions);
  
  document.querySelectorAll('.card, .section__header').forEach(el => {
    observer.observe(el);
  });
}

// === STICKY HEADER ===
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      if (currentScroll > lastScroll) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
    } else {
      header.classList.remove('header--hidden');
    }
    
    lastScroll = currentScroll;
  });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// === COOKIE CONSENT ===
function initCookieConsent() {
  const consentKey = 'securekern_cookie_consent';
  const consent = localStorage.getItem(consentKey);
  
  if (consent === null) {
    showCookieBanner();
  }
}

function showCookieBanner() {
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-banner__content">
      <p class="cookie-banner__text">
        Wir nutzen Cookies, um Ihre Erfahrung zu verbessern. 
        <a href="/datenschutz.html">Mehr erfahren</a>
      </p>
      <div class="cookie-banner__actions">
        <button class="btn btn--small btn--primary" id="acceptCookies">Akzeptieren</button>
        <button class="btn btn--small btn--secondary" id="declineCookies">Ablehnen</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(banner);
  
  document.getElementById('acceptCookies')?.addEventListener('click', () => {
    localStorage.setItem('securekern_cookie_consent', 'accepted');
    banner.remove();
  });
  
  document.getElementById('declineCookies')?.addEventListener('click', () => {
    localStorage.setItem('securekern_cookie_consent', 'declined');
    banner.remove();
  });
}

// === FORM VALIDATION ===
function initFormValidation() {
  const forms = document.querySelectorAll('.contact-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.email || !data.name || !data.message) {
        showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        return;
      }
      
      // Submit form (replace with actual endpoint)
      try {
        // Simulated submission
        showNotification('Vielen Dank! Wir melden uns in Kürze bei Ihnen.', 'success');
        form.reset();
      } catch (error) {
        showNotification('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
      }
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('notification--show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('notification--show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// === ANALYTICS (Placeholder) ===
function initAnalytics() {
  const consent = localStorage.getItem('securekern_cookie_consent');
  if (consent === 'accepted') {
    // Initialize analytics (e.g., Google Analytics, Plausible)
    console.log('Analytics initialized');
  }
}

// === INITIALIZATION ===
function updateHeaderOffset(){
  const header = document.querySelector('.header');
  if (!header) return;
  const height = header.offsetHeight || 80;
  document.documentElement.style.setProperty('--header-offset', `${height + 8}px`);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language toggle (EN placeholder)
  ensureLangToggle();
  
  // Update CSS header offset variable so anchor links and scrolls don't hide under fixed header
  updateHeaderOffset();
  window.addEventListener('resize', debounce(updateHeaderOffset, 150));
  
  // Initialize features
  initMobileNav();
  initDropdownStability();
  initStickyHeader();
  initSmoothScroll();
  initScrollAnimations();
  initCookieConsent();
  initFormValidation();
  initAnalytics();
  
  console.log('SecureKern website initialized');
});

// === UTILITIES ===
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Helper: report any elements whose data-i18n key is missing in the current translations
function reportMissingTranslations(lang = currentLang) {
  const t = translations[lang] || {};
  const missing = [];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const parts = key.split('.');
    let value = t;
    for (const p of parts) {
      value = value?.[p];
      if (value === undefined) break;
    }
    if (value === undefined) missing.push({ key, element: el });
  });

  if (!missing.length) {
    console.info('All data-i18n keys have translations for', lang);
  } else {
    console.warn(`Missing translations for ${missing.length} keys (lang=${lang}):`);
    missing.forEach(m => console.warn(m.key, m.element));
  }
  return missing;
}

// Export for use in other scripts
window.SecureKern = {
  switchLanguage,
  currentLang: () => currentLang,
  translations,
  reportMissingTranslations
};

// === SCROLL REVEAL ANIMATIONS ===
(() => {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, stop observing for performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
})();

// === HEADER SCROLL STATE ===
(() => {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // Check on load in case page is already scrolled
  onScroll();
})();

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === SERVICE WORKER REGISTRATION (SAFE GUARD) ===
// Only attempt registration in secure contexts (https or localhost) and
// catch any errors so they don't bubble up to the host environment (e.g. VS Code webviews).
(function registerServiceWorkerSafely() {
  try {
    if (!('serviceWorker' in navigator)) return;

    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const isSecure = window.isSecureContext || location.protocol === 'https:' || isLocalhost;

    if (!isSecure) {
      console.info('Service worker registration skipped: insecure context.');
      return;
    }

    // Respect cookie consent: only register after user accepted cookies.
    const consent = localStorage.getItem('securekern_cookie_consent');
    if (consent !== 'accepted') {
      console.info('Service worker registration deferred: cookie consent not accepted.');
      return;
    }

    // Register an opt-in service worker if present. Failure is non-fatal.
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.info('Service worker registered:', reg.scope))
      .catch(err => console.warn('Service worker registration failed (non-fatal):', err));
  } catch (err) {
    // Protect host environment (VS Code webviews sometimes throw InvalidStateError)
    console.warn('Service worker registration skipped (caught):', err);
  }
})();

