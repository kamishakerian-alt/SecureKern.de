const langSwitch = require('../_data/langSwitch.cjs');

module.exports = class AliasPages {
  data() {
    return {
      aliases: langSwitch.aliases,
      pagination: {
        data: 'aliases',
        size: 1,
        alias: 'alias',
      },
      permalink: (data) => data.alias.from,
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const target = data.alias.to;

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex" />
    <title>Redirecting…</title>
  </head>
  <body>
    <p>Redirecting to <a href="${target}">${target}</a> …</p>
    <script>window.location.replace(${JSON.stringify(target)});</script>
  </body>
</html>`;
  }
};
