---
layout: layouts/base.njk
title: "Kontakt - SecureKern"
description: ""
permalink: "/kontakt.html"
---
<!-- Content for contact will go here -->
        <section class="page-hero">
            <div class="container">
                <h1 data-i18n="contact.hero.headline">Kontaktieren Sie Uns</h1>
                <p data-i18n="contact.hero.subheadline">Wir freuen uns darauf, von Ihnen zu hören. Ob Sie eine konkrete Anfrage haben oder ein unverbindliches Erstgespräch wünschen – hier sind Sie richtig.</p>
            </div>
        </section>

        <section class="contact-section section">
            <div class="container">
                <div class="contact-grid">
                    <div class="contact-form-container">
                        <h2>Schreiben Sie uns eine Nachricht</h2>
                        <form action="#" method="POST" class="contact-form">
                            <div class="form-group">
                                <label for="name" data-i18n="contact.form.name">Ihr Name</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Ihre E-Mail-Adresse</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="company">Ihr Unternehmen</label>
                                <input type="text" id="company" name="company">
                            </div>
                            <div class="form-group">
                                <label for="message">Ihre Nachricht</label>
                                <textarea id="message" name="message" required></textarea>
                            </div>
                            <button type="submit" class="btn btn--primary" data-i18n="contact.form.submit">Nachricht senden</button>
                        </form>
                    </div>
                    <div class="contact-info-container">
                        <h2>Direkter Kontakt</h2>
                        <ul class="contact-info">
                            <li>
                                <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                                <div>
                                    <strong>SecureKern GmbH</strong><br>
                                    Musterstraße 1<br>
                                    12345 Berlin
                                </div>
                            </li>
                            <li>
                                <span class="icon"><i class="fas fa-envelope"></i></span>
                                <div>
                                    <a href="mailto:kontakt@securekern.de">kontakt@securekern.de</a>
                                </div>
                            </li>
                            <li>
                                <span class="icon"><i class="fas fa-phone-alt"></i></span>
                                <div>
                                    <a href="tel:+493012345678">+49 (0)30 123 456 78</a>
                                </div>
                            </li>
                        </ul>
                        <h2>Folgen Sie uns</h2>
                        <div class="footer-socials">
                            <a href="#" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                            <a href="#" target="_blank" title="Xing"><i class="fab fa-xing"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
