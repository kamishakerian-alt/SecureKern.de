const deToEn = {
  '/leistungen.html': '/en/services.html',
  '/loesungen.html': '/en/solutions.html',
  '/ueber-uns.html': '/en/about.html',
  '/ressourcen.html': '/en/resources.html',
  '/kontakt.html': '/en/contact.html',

  // service / subpage mappings (DE → EN)
  '/risk-training.html': '/en/services/training.html',
  '/services/risk-training.html': '/en/services/training.html',
  '/resources/blog.html': '/en/blog.html',
};

const enToDe = Object.fromEntries(
  Object.entries(deToEn).map(([dePath, enPath]) => [enPath, dePath])
);

const enAliases = Object.entries(deToEn)
  .filter(([dePath, enPath]) => `/en${dePath}` !== enPath)
  .map(([dePath, enPath]) => ({
    from: `/en${dePath}`,
    to: enPath,
  }));

const legacyServiceAliases = [
  {
    from: '/nis2-readiness.html',
    to: '/services/nis2-readiness.html',
  },
  {
    from: '/iec-62443.html',
    to: '/services/iec-62443.html',
  },
  {
    from: '/segmentation.html',
    to: '/services/segmentation.html',
  },
  {
    from: '/risk-training.html',
    to: '/services/risk-training.html',
  },
  {
    from: '/ot-mdr.html',
    to: '/services/ot-mdr.html',
  },
  {
    from: '/en/nis2-readiness.html',
    to: '/en/services/nis2-readiness.html',
  },
  {
    from: '/en/iec-62443.html',
    to: '/en/services/iec-62443.html',
  },
  {
    from: '/en/segmentation.html',
    to: '/en/services/segmentation.html',
  },
  {
    from: '/en/ot-mdr.html',
    to: '/en/services/ot-mdr.html',
  },
  {
    from: '/en/ot-risk.html',
    to: '/en/services/ot-risk.html',
  },
];

const aliases = [...enAliases, ...legacyServiceAliases];

module.exports = {
  deToEn,
  enToDe,
  aliases,
};
