module.exports = {
  de: {
    label: 'Hauptnavigation',
    logo: {
      src: '/assets/images/logo.svg',
      alt: 'SecureKern Logo',
      href: '/index.html',
      label: 'SecureKern Startseite',
    },
    mobile_menu_toggle: {
      label: 'Menü öffnen',
    },
    language_toggle: {
      label: 'Sprache wechseln',
      de: {
        label: 'DE',
        flag: '/assets/images/flags/de.svg',
        alt: 'Deutsch',
      },
      en: {
        label: 'EN',
        flag: '/assets/images/flags/gb.svg',
        alt: 'English (UK)',
      },
    },
    main: [
      { label: 'Home', href: '/index.html' },
      {
        label: 'Leistungen',
        href: '/leistungen.html',
        children: [
          { label: 'Alle Leistungen', href: '/leistungen.html' },
          { label: 'NIS2 Readiness Sprint', href: '/nis2-readiness.html' },
          { label: 'IEC 62443 Gap Assessment', href: '/iec-62443.html' },
          { label: 'Netzwerksegmentierung', href: '/segmentation.html' },
          {
            label: 'OT Risk Assessment & Training',
            href: '/risk-training.html',
          },
          { label: 'OT-MDR & Incident Response', href: '/ot-mdr.html' },
        ],
      },
      {
        label: 'Lösungen',
        href: '/loesungen.html',
        children: [
          { label: 'Alle Lösungen', href: '/loesungen.html' },
          { label: 'Manufacturing & Automotive', href: '/manufacturing.html' },
          { label: 'Energy & Utilities', href: '/energy.html' },
          { label: 'Chemicals & Pharma', href: '/chemicals.html' },
        ],
      },
      {
        label: 'Über uns',
        href: '/ueber-uns.html',
        children: [
          { label: 'Über uns', href: '/ueber-uns.html' },
          { label: 'Team', href: '/team.html' },
          { label: 'Zertifizierungen', href: '/certifications.html' },
        ],
      },
      {
        label: 'Ressourcen',
        href: '/ressourcen.html',
        children: [
          { label: 'Ressourcen', href: '/ressourcen.html' },
          { label: 'Blog', href: '/blog.html' },
          { label: 'Downloads', href: '/downloads.html' },
          { label: 'Webinare', href: '/webinars.html' },
        ],
      },
      { label: 'Kontakt', href: '/kontakt.html' },
    ],
    footer: [
      {
        title: 'Navigation',
        links: [
          { label: 'Home', href: '/index.html' },
          { label: 'Leistungen', href: '/leistungen.html' },
          { label: 'Lösungen', href: '/loesungen.html' },
          { label: 'Über uns', href: '/ueber-uns.html' },
          { label: 'Ressourcen', href: '/ressourcen.html' },
          { label: 'Kontakt', href: '/kontakt.html' },
        ],
      },
      {
        title: 'Leistungen',
        links: [
          { label: 'NIS2 Readiness Sprint', href: '/nis2-readiness.html' },
          { label: 'IEC 62443 Gap Assessment', href: '/iec-62443.html' },
          { label: 'Netzwerksegmentierung', href: '/segmentation.html' },
          { label: 'OT-MDR', href: '/ot-mdr.html' },
        ],
      },
      {
        title: 'Rechtliches',
        links: [
          { label: 'Impressum', href: '/impressum.html' },
          { label: 'Datenschutz', href: '/datenschutz.html' },
          { label: 'AGB', href: '/agb.html' },
        ],
      },
    ],
  },
  en: {
    label: 'Main navigation',
    logo: {
      src: '/assets/images/logo.svg',
      alt: 'SecureKern Logo',
      href: '/en/index.html',
      label: 'SecureKern Home',
    },
    mobile_menu_toggle: {
      label: 'Open menu',
    },
    language_toggle: {
      label: 'Switch language',
      de: {
        label: 'DE',
        flag: '/assets/images/flags/de.svg',
        alt: 'German',
      },
      en: {
        label: 'EN',
        flag: '/assets/images/flags/gb.svg',
        alt: 'English (UK)',
      },
    },
    main: [
      { label: 'Home', href: '/en/index.html' },
      {
        label: 'Services',
        href: '/en/services.html',
        children: [
          { label: 'All Services', href: '/en/services.html' },
          {
            label: 'NIS2 Readiness Sprint',
            href: '/en/services/nis2-readiness.html',
          },
          {
            label: 'IEC 62443 Gap Assessment',
            href: '/en/services/iec-62443.html',
          },
          {
            label: 'Network Segmentation',
            href: '/en/services/segmentation.html',
          },
          {
            label: 'OT Risk Assessment & Training',
            href: '/en/services/ot-risk.html',
          },
          {
            label: 'OT-MDR & Incident Response',
            href: '/en/services/ot-mdr.html',
          },
        ],
      },
      {
        label: 'Solutions',
        href: '/en/solutions.html',
        children: [
          { label: 'All Solutions', href: '/en/solutions.html' },
          {
            label: 'Manufacturing & Automotive',
            href: '/en/manufacturing.html',
          },
          { label: 'Energy & Utilities', href: '/en/energy.html' },
          { label: 'Chemicals & Pharma', href: '/en/chemicals.html' },
        ],
      },
      {
        label: 'About',
        href: '/en/about.html',
        children: [
          { label: 'About Us', href: '/en/about.html' },
          { label: 'Team', href: '/en/team.html' },
          { label: 'Certifications', href: '/en/certifications.html' },
        ],
      },
      {
        label: 'Resources',
        href: '/en/resources.html',
        children: [
          { label: 'All Resources', href: '/en/resources.html' },
          { label: 'Blog', href: '/en/blog.html' },
          { label: 'Downloads', href: '/en/downloads.html' },
          { label: 'Webinars', href: '/en/webinars.html' },
        ],
      },
      { label: 'Contact', href: '/en/contact.html' },
    ],
    footer: [
      {
        title: 'Navigation',
        links: [
          { label: 'Home', href: '/en/index.html' },
          { label: 'Services', href: '/en/services.html' },
          { label: 'Solutions', href: '/en/solutions.html' },
          { label: 'About Us', href: '/en/about.html' },
          { label: 'Resources', href: '/en/resources.html' },
          { label: 'Contact', href: '/en/contact.html' },
        ],
      },
      {
        title: 'Services',
        links: [
          {
            label: 'NIS2 Readiness Sprint',
            href: '/en/services/nis2-readiness.html',
          },
          {
            label: 'IEC 62443 Gap Assessment',
            href: '/en/services/iec-62443.html',
          },
          {
            label: 'Network Segmentation',
            href: '/en/services/segmentation.html',
          },
          { label: 'OT-MDR', href: '/en/services/ot-mdr.html' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Imprint', href: '/en/impressum.html' },
          { label: 'Privacy', href: '/en/datenschutz.html' },
          { label: 'Terms', href: '/en/agb.html' },
        ],
      },
    ],
  },
};
