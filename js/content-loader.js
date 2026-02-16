/**
 * Content Loader - Dynamically loads website content from content.json
 * 
 * Usage:
 * 1. Include this script in your HTML: <script src="js/content-loader.js"></script>
 * 2. Make sure content.json is in the root directory
 * 3. Call loadContent() when DOM is ready
 */

// Main function to load and populate content
async function loadContent() {
    try {
        // Fetch the JSON file
        const response = await fetch('./content.json');
        const content = await response.json();

        // Update metadata
        updateMetadata(content.metadata);

        // Update navigation
        updateNavigation(content.navigation);

        // Update hero section
        updateHeroSection(content.hero, content.personalInfo);

        // Update about section
        updateAboutSection(content.about);

        // Update expertise section
        updateExpertiseSection(content.expertise);

        // Update certifications
        updateCertifications(content.certifications);

        // Update skills
        updateSkills(content.skills);

        // Update experience
        updateExperience(content.experience);

        // Update projects
        updateProjects(content.projects);

        // Update blog
        updateBlog(content.blog);

        // Update contact
        updateContact(content.contact, content.personalInfo);

        // Update CTA
        updateCTA(content.cta);

        // Update footer
        updateFooter(content.footer, content.personalInfo);

        // Refresh AOS animations for dynamically loaded content
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Refresh lightbox for dynamically loaded images
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true
            });
        }

        console.log('✅ Content loaded successfully from JSON!');
    } catch (error) {
        console.error('❌ Error loading content:', error);
    }
}

// Update page metadata (title, description, etc.)
function updateMetadata(metadata) {
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').setAttribute('content', metadata.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', metadata.keywords);
    document.querySelector('meta[name="author"]').setAttribute('content', metadata.author);
    document.querySelector('link[rel="canonical"]').setAttribute('href', metadata.canonical);
}

// Update navigation menu
function updateNavigation(navItems) {
    const navList = document.querySelector('.navbar-nav');
    if (!navList) return;

    navList.innerHTML = navItems.map(item => `
        <li class="nav-item">
            <a href="${item.href}" class="nav-link"><span>${item.label}</span></a>
        </li>
    `).join('');
}

// Update hero section
function updateHeroSection(hero, personalInfo) {
    // Update badge
    const badge = document.querySelector('.hero-badge');
    if (badge) badge.textContent = hero.badge;

    // Update title
    const title = document.querySelector('.hero-title');
    if (title) title.innerHTML = `${hero.greeting} <span class="gradient-text">${hero.name}</span>`;

    // Update subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) subtitle.textContent = hero.subtitle;

    // Update tech tags
    const techStrip = document.querySelector('.hero-tech-strip');
    if (techStrip) {
        techStrip.innerHTML = hero.techTags.map(tag => `
            <span class="tech-tag"><i class="${tag.icon}"></i> ${tag.name}</span>
        `).join('');
    }

    // Update stats
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        statsContainer.innerHTML = hero.stats.map(stat => `
            <div class="stat-item">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    // Update action buttons
    const actionsContainer = document.querySelector('.hero-actions');
    if (actionsContainer) {
        actionsContainer.innerHTML = hero.actions.map(action => {
            const downloadAttr = action.download ? `download="${action.download}"` : '';
            const btnClass = action.type === 'primary' ? 'btn-primary-modern' : 'btn-outline-modern';
            return `
                <a href="${action.href}" class="btn btn-modern ${btnClass}" ${downloadAttr}>
                    <span>${action.text}</span>
                    <i class="${action.icon}"></i>
                </a>
            `;
        }).join('');
    }

    // Update profile image
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) heroImg.setAttribute('src', personalInfo.profileImage);
}

// Update about section
function updateAboutSection(about) {
    // Update section header
    updateSectionHeader('about-section', about.sectionTag, about.sectionTitle);

    // Update journey cards
    const journeyContainer = document.querySelector('.about-journey');
    if (journeyContainer) {
        journeyContainer.innerHTML = about.journeyCards.map((card, index) => `
            <div class="journey-card" data-aos="fade-up" data-aos-delay="${200 + index * 100}">
                <div class="journey-icon">
                    <i class="${card.icon}"></i>
                </div>
                <div class="journey-content">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// Update expertise section
function updateExpertiseSection(expertise) {
    updateSectionHeader('services-section', expertise.sectionTag, expertise.sectionTitle, expertise.sectionDescription);

    const expertiseContainer = document.querySelector('#services-section .row.justify-content-center');
    if (expertiseContainer) {
        expertiseContainer.innerHTML = expertise.cards.map((card, index) => `
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                <div class="expertise-card">
                    <div class="expertise-icon">
                        <i class="${card.icon}"></i>
                    </div>
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                    <div class="expertise-card-line"></div>
                </div>
            </div>
        `).join('');
    }
}

// Update certifications
function updateCertifications(certifications) {
    updateSectionHeader('certifications-section', certifications.sectionTag, certifications.sectionTitle);

    const certsContainer = document.querySelector('#certifications-section .row.justify-content-center');
    if (certsContainer) {
        certsContainer.innerHTML = certifications.items.map((cert, index) => `
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${100 + index * 50}">
                <div class="cert-card">
                    <div class="cert-icon"><i class="${cert.icon}"></i></div>
                    <p>${cert.title}</p>
                </div>
            </div>
        `).join('');
    }
}

// Update skills section
function updateSkills(skills) {
    updateSectionHeader('skills-section', skills.sectionTag, skills.sectionTitle);

    // Update technical skills
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsGrid.innerHTML = skills.technicalSkills.map(skill => `
            <span class="skill-pill"><i class="${skill.icon}"></i> ${skill.name}</span>
        `).join('');
    }

    // Update industries
    const industriesSection = document.querySelectorAll('#skills-section .section-header')[1];
    if (industriesSection) {
        industriesSection.querySelector('.section-tag').textContent = skills.industries.sectionTag;
        industriesSection.querySelector('.section-title').textContent = skills.industries.sectionTitle;
    }

    const industriesGrid = document.querySelector('.industries-grid');
    if (industriesGrid) {
        industriesGrid.innerHTML = skills.industries.items.map(industry => `
            <div class="industry-card">
                <i class="${industry.icon}"></i>
                <span>${industry.name}</span>
            </div>
        `).join('');
    }
}

// Update experience timeline
function updateExperience(experience) {
    updateSectionHeader('resume-section', experience.sectionTag, experience.sectionTitle);

    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.innerHTML = experience.timeline.map((item, index) => `
            <div class="timeline-item" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${item.period}</span>
                    <h3>${item.title}</h3>
                    <span class="timeline-company"><i class="fas fa-building"></i> ${item.company}</span>
                    <ul class="timeline-list">
                        ${item.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }
}

// Update projects section
function updateProjects(projects) {
    updateSectionHeader('projects-section', projects.sectionTag, projects.sectionTitle, projects.sectionDescription);

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.items.map((project, index) => `
            <div class="project-card" data-aos="fade-up" data-aos-delay="${100 + (index % 3) * 50}">
                <div class="project-image" style="background-image: url(${project.image});">
                    <a href="./${project.image}" data-lightbox="projects" data-title="${project.lightboxTitle}">
                        <div class="project-overlay">
                            <i class="fas fa-expand"></i>
                        </div>
                    </a>
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Update blog section
function updateBlog(blog) {
    updateSectionHeader('blog-section', blog.sectionTag, blog.sectionTitle, blog.sectionDescription);

    const blogContainer = document.querySelector('#blog-section .row');
    if (blogContainer) {
        blogContainer.innerHTML = blog.posts.map((post, index) => `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                <a href="${post.url}" class="blog-card-link">
                    <div class="blog-card">
                        <div class="blog-card-image">
                            <img src="${post.image}" 
                                alt="${post.title}" 
                                loading="lazy"
                                decoding="async"
                                width="600" 
                                height="400"
                                onerror="this.style.display='none'; this.parentElement.classList.add('blog-card-image-fallback');">
                            <span class="blog-card-category">${post.category}</span>
                        </div>
                        <div class="blog-card-body">
                            <div class="blog-card-meta">
                                <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                                <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                            </div>
                            <h3 class="blog-card-title">${post.title}</h3>
                            <p class="blog-card-excerpt">${post.excerpt}</p>
                            <span class="blog-card-read-more">
                                Read More <i class="fas fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        `).join('');
    }
}

// Update contact section
function updateContact(contact, personalInfo) {
    updateSectionHeader('contact-section', contact.sectionTag, contact.sectionTitle, contact.sectionDescription);

    const contactContainer = document.querySelector('#contact-section .row.justify-content-center');
    if (contactContainer) {
        contactContainer.innerHTML = contact.cards.map((card, index) => `
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${100 + index * 100}">
                <div class="contact-card">
                    <div class="contact-icon">
                        <i class="${card.icon}"></i>
                    </div>
                    <h3>${card.title}</h3>
                    <p><a href="${card.link}" target="_blank" rel="noopener noreferrer">${card.text}</a></p>
                </div>
            </div>
        `).join('');
    }
}

// Update CTA section
function updateCTA(cta) {
    const ctaText = document.querySelector('.footer-cta-text');
    if (ctaText) {
        ctaText.innerHTML = `
            <h3>${cta.heading}</h3>
            <p>${cta.subheading}</p>
        `;
    }

    const ctaActions = document.querySelector('.footer-cta-actions');
    if (ctaActions) {
        ctaActions.innerHTML = cta.actions.map(action => {
            const downloadAttr = action.download ? `download="${action.download}"` : '';
            const btnClass = action.type === 'light' ? 'btn-cta-light' : 'btn-cta-outline';
            return `
                <a href="${action.href}" class="btn btn-modern ${btnClass}" ${downloadAttr}>
                    <i class="${action.icon}"></i> ${action.text}
                </a>
            `;
        }).join('');
    }
}

// Update footer
function updateFooter(footer, personalInfo) {
    // Update brand
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.innerHTML = `<span class="brand-highlight">D</span>iken Shah`;
    }

    // Update description
    const footerDesc = document.querySelector('.footer-desc');
    if (footerDesc) footerDesc.textContent = footer.description;

    // Update social media links
    const footerSocial = document.querySelector('.footer-social');
    if (footerSocial) {
        footerSocial.innerHTML = `
            <a href="${personalInfo.socialMedia.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="${personalInfo.socialMedia.twitter}" target="_blank" rel="noopener noreferrer" aria-label="X"><i class="fab fa-x-twitter"></i></a>
            <a href="${personalInfo.socialMedia.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="${personalInfo.socialMedia.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        `;
    }

    // Update quick links
    const quickLinks = document.querySelectorAll('.footer-nav')[0];
    if (quickLinks) {
        quickLinks.innerHTML = footer.quickLinks.map(link => `
            <li><a href="${link.href}"><i class="fas fa-chevron-right"></i> ${link.label}</a></li>
        `).join('');
    }

    // Update services links
    const servicesLinks = document.querySelectorAll('.footer-nav')[1];
    if (servicesLinks) {
        servicesLinks.innerHTML = footer.services.map(link => `
            <li><a href="${link.href}"><i class="fas fa-chevron-right"></i> ${link.label}</a></li>
        `).join('');
    }

    // Update contact info
    const footerContact = document.querySelector('.footer-contact');
    if (footerContact) {
        footerContact.innerHTML = `
            <li>
                <i class="fas fa-map-marker-alt"></i>
                <span><a href="${personalInfo.location.mapLink}" target="_blank" rel="noopener noreferrer">${personalInfo.location.city}, ${personalInfo.location.state}, ${personalInfo.location.country}</a></span>
            </li>
            <li>
                <i class="fas fa-phone-alt"></i>
                <span><a href="tel:${personalInfo.phone}">${personalInfo.phone}</a></span>
            </li>
            <li>
                <i class="fas fa-envelope"></i>
                <span><a href="mailto:${personalInfo.email}">${personalInfo.email}</a></span>
            </li>
            <li>
                <i class="fas fa-clock"></i>
                <span>${personalInfo.workingHours}</span>
            </li>
        `;
    }

    // Update copyright
    const copyright = document.querySelector('.footer-bottom p:first-child');
    if (copyright) {
        copyright.innerHTML = `&copy; <script>document.write(new Date().getFullYear());</script> ${footer.copyright}`;
    }

    const credit = document.querySelector('.footer-credit');
    if (credit) {
        credit.innerHTML = footer.credit.replace('❤️', '<i class="fas fa-heart footer-heart"></i>');
    }
}

// Helper function to update section headers
function updateSectionHeader(sectionId, tag, title, description = null) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const header = section.querySelector('.section-header');
    if (!header) return;

    const tagElement = header.querySelector('.section-tag');
    if (tagElement) tagElement.textContent = tag;

    const titleElement = header.querySelector('.section-title');
    if (titleElement) titleElement.textContent = title;

    if (description) {
        const descElement = header.querySelector('.section-description');
        if (descElement) descElement.textContent = description;
    }
}

// Load content when DOM is ready
// Uncomment the following line to enable automatic content loading
// document.addEventListener('DOMContentLoaded', loadContent);

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadContent };
}
