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

  // Collections for dynamic content
  eleventyConfig.addCollection("services", function(collectionApi) {
    return collectionApi.getFilteredByGlob("site/pages/services/*.md");
  });

  eleventyConfig.addCollection("solutions", function(collectionApi) {
    return collectionApi.getFilteredByGlob("site/pages/solutions/*.md");
  });

  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("site/pages/resources/*.md")
      .filter(item => item.data.layout && item.data.layout.includes('blog-post'))
      .sort((a, b) => {
        return (b.data.date || new Date()) - (a.data.date || new Date());
      });
  });

  eleventyConfig.addCollection("team", function(collectionApi) {
    return collectionApi.getFilteredByGlob("site/team/*.md").filter(item => 
      item.inputPath !== "./site/team/.gitkeep"
    );
  });

  eleventyConfig.addCollection("webinars", function(collectionApi) {
    return collectionApi.getFilteredByGlob("site/webinars/*.md")
      .filter(item => item.inputPath !== "./site/webinars/.gitkeep")
      .sort((a, b) => {
        return (b.data.date || new Date()) - (a.data.date || new Date());
      });
  });

  eleventyConfig.addCollection("upcomingWebinars", function(collectionApi) {
    return collectionApi.getFilteredByGlob("site/webinars/*.md")
      .filter(item => {
        if (item.inputPath === "./site/webinars/.gitkeep") return false;
        return item.data.status === "upcoming";
      })
      .sort((a, b) => (a.data.date || new Date()) - (b.data.date || new Date()));
  });

  // Filters
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter("dateFormat", function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });

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
