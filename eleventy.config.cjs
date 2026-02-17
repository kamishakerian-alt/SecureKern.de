const markdownIt = require('markdown-it');
const { EleventyI18nPlugin } = require('@11ty/eleventy');

module.exports = function (eleventyConfig) {
  // Internationalization
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'de',
  });

  // CMS Admin (Decap CMS) lives in /admin
  eleventyConfig.addPassthroughCopy({ 'site/admin': 'admin' });

    // Static assets
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "site/robots.txt": "robots.txt" });

  // Watch targets
  eleventyConfig.addWatchTarget('site/assets/css');
  eleventyConfig.addWatchTarget('site/assets/js');

  // Markdown: allow embedded HTML
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      linkify: true,
      breaks: false,
    })
  );

  // Collections for dynamic content
  eleventyConfig.addCollection('services', function (collectionApi) {
    return collectionApi.getFilteredByGlob('site/pages/services/*.md');
  });

  eleventyConfig.addCollection('solutions', function (collectionApi) {
    return collectionApi.getFilteredByGlob('site/pages/solutions/*.md');
  });

  eleventyConfig.addCollection('blogPosts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('site/pages/resources/*.md')
      .filter((item) => item.data.layout && item.data.layout.includes('blog-post'))
      .sort((a, b) => {
        return (b.data.date || new Date()) - (a.data.date || new Date());
      });
  });

  eleventyConfig.addCollection('team', function (collectionApi) {
    return collectionApi.getFilteredByGlob('site/team/*.md').filter((item) => item.inputPath !== './site/team/.gitkeep');
  });

  eleventyConfig.addCollection('webinars', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('site/webinars/*.md')
      .filter((item) => item.inputPath !== './site/webinars/.gitkeep')
      .sort((a, b) => {
        return (b.data.date || new Date()) - (a.data.date || new Date());
      });
  });

  eleventyConfig.addCollection('upcomingWebinars', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('site/webinars/*.md')
      .filter((item) => {
        if (item.inputPath === './site/webinars/.gitkeep') return false;
        return item.data.status === 'upcoming';
      })
      .sort((a, b) => (a.data.date || new Date()) - (b.data.date || new Date()));
  });

  // Filters
  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter('dateFormat', function (date, lang = 'de') {
    if (!date) return '';
    const d = new Date(date);
    const locale = lang === 'en' ? 'en-GB' : 'de-DE';
    return d.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  return {
    dir: {
      input: "site",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
