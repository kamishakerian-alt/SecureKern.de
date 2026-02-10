---
layout: layouts/base.njk
title: "Blog"
description: "Articles and resources on OT security, NIS2 and IEC 62443 best practices."
permalink: "/en/blog.html"
lang: "en"
---

<section class="section">
  <div class="container">
    <h1>Blog</h1>
    <p>Insights, case studies and guides about OT cybersecurity and compliance.</p>

    {% set limit = 10 %}
    {% include "partials/blog-posts-grid.njk" %}
  </div>
</section>