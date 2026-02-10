const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // CMS Admin (Decap CMS) lives in /admin
  eleventyConfig.addPassthroughCopy({ "site/admin": "admin" });

  // Static assets (existing)
  eleventyConfig.addPassthroughCopy({ "Website/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "Website/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "Website/sitemap.xml": "sitemap.xml" });
  eleventyConfig.addPassthroughCopy({ "Website/sw.js": "sw.js" });

  // Markdown: allow embedded HTML for existing section markup
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      breaks: false,
    })
  );

  return {
    dir: {
      input: "site",
      includes: "_includes",
      data: "_data",
      output: "Website/dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
