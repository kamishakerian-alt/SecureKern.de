---
layout: layouts/base.njk
title: "Contact - SecureKern"
description: "Get in touch with us. Whether you have a specific request or would like a non-binding initial consultation - you've come to the right place."
permalink: "/en/contact.html"
lang: "en"
---
<section class="page-hero">
<div class="container">
    <h1>Contact Us</h1>
    <p>We look forward to hearing from you. Whether you have a specific request or would like a non-binding initial consultation - you've come to the right place.</p>
</div>
</section>

<section class="contact-section section">
<div class="container">
    <div class="contact-grid">
        <div class="contact-form-container">
            <h2>Write us a message</h2>
            <form name="contact-en" action="/en/thank-you.html" method="POST" class="contact-form" data-netlify="true" netlify-honeypot="bot">
                <input type="hidden" name="form-name" value="contact-en" />
                <p class="hidden"><label>Don't fill this: <input name="bot" /></label></p>
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Your Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="company">Your Company</label>
                    <input type="text" id="company" name="company">
                </div>
                <div class="form-group">
                    <label for="message">Your Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="btn btn--primary">Send Message</button>
            </form>
        </div>
        <div class="contact-info-container">
            <h2>Direct Contact</h2>
            <ul class="contact-info">
                <li>
                    <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                    <div>
                        <strong>{{ site_local.address.company }}</strong><br>
                        {{ site_local.address.street }}<br>
                        {{ site_local.address.zipCity }}<br>
                    </div>
                </li>
                <li>
                    <span class="icon"><i class="fas fa-envelope"></i></span>
                    <div>
                        <a href="mailto:{{ site_local.contact.email }}">{{ site_local.contact.email }}</a>
                    </div>
                </li>
                <li>
                    <span class="icon"><i class="fas fa-phone-alt"></i></span>
                    <div>
                        <a href="tel:+493012345678">+49 (0)30 123 456 78</a>
                    </div>
                </li>
            </ul>
            <h2>Follow Us</h2>
            <div class="footer-socials">
                <a href="#" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="#" target="_blank" title="Xing"><i class="fab fa-xing"></i></a>
            </div>
        </div>
    </div>
</div>
</section>
