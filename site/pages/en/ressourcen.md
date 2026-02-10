---
layout: layouts/base.njk
title: "Resources"
description: "Resources, downloads and webinars about OT security and regulatory readiness."
permalink: "/en/ressourcen.html"
lang: "en"
---

<section class="section">
  <div class="container">
    <h1>Resources</h1>
    <p>Whitepapers, guides and webinar recordings to help you improve OT security and compliance.</p>

    {% set limit = 6 %}
    {% include "partials/blog-posts-grid.njk" %}
  </div>
</section>