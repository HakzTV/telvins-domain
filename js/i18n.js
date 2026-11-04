/**
 * Internationalization (i18n) Engine
 * Automatically detects user's preferred language (defaults to French if browser is French).
 * Supports seamless manual toggle between English (EN) and French (FR) with localStorage persistence.
 */
(function() {
  'use strict';

  var DICT = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.expertise': 'Expertise',
      'nav.certs': 'Certs',
      'nav.contact': 'Contact',
      'nav.switch_title': 'Switch to French',

      // Mobile Menu
      'menu.role': 'Software engineer · Azure architect',
      'menu.location': 'Accra, Ghana',
      'menu.lang_label': 'Language',

      // Hero
      'hero.badge': '<i class="dot"></i>Open to consulting &amp; product work',
      'hero.subhead': 'Software Engineer · Azure Architect · Accra, Ghana',
      'hero.lede': 'I build cloud-native software that real teams <em>actually adopt</em>.',
      'hero.pipe_aria': 'From wireframe to production monitoring',
      'hero.step_wireframe': 'Wireframe',
      'hero.step_build': 'Build',
      'hero.step_ship': 'Ship',
      'hero.step_monitor': 'Monitor',
      'hero.btn_work': '<b>→</b>See my work',
      'hero.btn_contact': '<b>↗</b>Contact me',
      'hero.chip_location': 'Accra, Ghana',
      'hero.chip_role': 'Azure Architect',
      'hero.chip_stack': 'Full-stack',
      'hero.live_pill': '<i class="dot"></i>In production',

      // Proof Metrics
      'proof.metric1': 'team productivity gain',
      'proof.metric2': 'faster load times',
      'proof.metric3': 'lower bounce rate',
      'proof.metric4': 'users trained',
      'proof.metric5': 'countries delivered',

      // Manifesto
      'manifesto.label': '● Manifesto',
      'manifesto.h2': 'Interface.<br>Infrastructure.<br><span class="a">Adoption.</span>',
      'manifesto.d1_title': 'Front-end architecture',
      'manifesto.d1_desc': 'React, TypeScript, SPFx. Fast, accessible, human-centred.',
      'manifesto.d2_title': 'Back-end &amp; data',
      'manifesto.d2_desc': 'Azure SQL, PostgreSQL, MongoDB.',
      'manifesto.d3_title': 'Cloud &amp; DevOps',
      'manifesto.d3_desc': 'Azure, GCP, Bicep IaC, CI/CD pipelines.',
      'manifesto.d4_title': 'SaaS product building',
      'manifesto.d4_desc': 'Multi-tenant, role-based, offline-first.',
      'manifesto.d5_title': 'Enablement &amp; delivery',
      'manifesto.d5_desc': 'Bridging technical design and non-technical teams.',

      // The Arc (Parcours)
      'arc.label': '● The arc',
      'arc.h2': 'From pixels to <span class="a">platforms.</span>',
      'arc.c1_time': '2019 to 2023',
      'arc.c1_title': 'Learn the fundamentals',
      'arc.c1_desc': 'BSc Information Technology at BluCrest College. Architecture, algorithms and computability. The base under everything built since.',
      'arc.c2_time': 'Jun to Dec 2023',
      'arc.c2_title': 'Own the interface',
      'arc.c2_desc': 'Front-End Developer at Advertising & Publisher Solutions Ghana. Rebuilt product UIs: bounce rate down 28%, load times down 40%, engagement up 32%, UI bugs down 35%.',
      'arc.c3_time': '2024 to Now',
      'arc.c3_title': 'Architect the system',
      'arc.c3_desc': 'Technical Consultant at eSolutions Consulting. Front-end architecture, Azure DevOps pipelines and Bicep infrastructure, Power Platform automation that lifted team productivity by 30%.',
      'arc.c4_time': 'Now',
      'arc.c4_title': 'Build the products',
      'arc.c4_desc': 'Wikora and WeTrack: live products, one with a paying client, built on what enterprise work taught me.',

      // Selected Work (Home preview)
      'selwork.label': '● Selected work',
      'selwork.wikora_desc': 'Multi-tenant, offline-first knowledge management SaaS.',
      'selwork.wikora_chip1': 'Document Management',
      'selwork.wikora_chip2': 'Secure Access',
      'selwork.wetrack_desc': 'Income and expense tracking with receipts sent by email or WhatsApp. My first product with a paying client.',
      'selwork.wetrack_chip1': 'Income &amp; expenses',
      'selwork.wetrack_chip2': 'Receipts',
      'selwork.wp_desc': 'Highly available hosting, fully automated through Bicep.',
      'selwork.wp_chip1': 'Bicep',
      'selwork.wp_chip2': 'Key Vault',
      'selwork.wp_chip3': 'Automation',

      // Home CTA
      'home.cta_label': '● Let’s work together',
      'home.cta_h2': 'Your idea, built<br><span class="a">and actually used.</span>',
      'home.cta_btn': '<b>↗</b>Contact me',

      // Work View
      'work.label': '● Selected work',
      'work.h2': 'Problems solved,<br><span class="a">not screens shipped.</span>',
      'work.c1_tag': '01 · SaaS · Live product',
      'work.c1_btn': '<b>↗</b>View live product',
      'work.problem_label': 'Problem',
      'work.build_label': 'Build',
      'work.outcome_label': 'Outcome',
      'work.c1_problem': 'Organisations keep internal knowledge scattered, unversioned and loosely controlled.',
      'work.c1_build': 'A multi-tenant knowledge platform with role-based access, organisation-scoped data isolation, invitations and access revocation. Offline-first reads and edits with optimistic updates and automatic sync.',
      'work.c1_outcome': 'One centralised, versioned source of truth, with domain models designed for analytics and AI-assisted retrieval.',
      'work.c2_tag': '02 · PWA · First paying client',
      'work.c2_btn': '<b>↗</b>Open WeTrack',
      'work.c2_problem': 'Keeping income and expenses in order, and getting receipts to customers without friction.',
      'work.c2_build': 'A progressive web app (PWA) that records income and expenses and sends receipts to customers by email or WhatsApp.',
      'work.c2_outcome': 'Helps small businesses keep a proper history of money in and money out. Already used by a paying client.',
      'work.c3_tag': '03 · Cloud · Infrastructure as code',
      'work.c3_btn': '<b>↗</b>View on GitHub',
      'work.c3_problem': 'Production hosting that is repeatable, observable and recoverable.',
      'work.c3_build': 'Full-stack deployment automated with Bicep, Bash and GitHub Actions: custom domain, DNS, secrets in Key Vault, backups and monitoring.',
      'work.c3_outcome': 'High-availability hosting with disaster recovery, redeployable from code.',
      'work.c4_tag': '04 · Enterprise · eSolutions',
      'work.c4_title': 'Client platforms',
      'work.c4_problem': 'Enterprise clients across Ghana, Kenya and the Ivory Coast needed reliable tools their teams would actually use.',
      'work.c4_build': 'Front-end architecture, automation, and CI/CD with Bicep for App Service and Functions. Features owned from wireframe to production monitoring.',
      'work.c4_outcome': '30% internal productivity gain and 500+ users trained to adopt new platforms.',
      'work.cta_label': '● Next case study',
      'work.cta_h2': 'Have a problem to solve?<br><span class="a">Let’s build what gets adopted.</span>',
      'work.cta_btn': '<b>↗</b>Contact me',

      // About View
      'about.label': '● About',
      'about.h2': 'Engineer who sits<br>between the code<br><span class="a">and the customer.</span>',
      'about.ch1_label': 'The screen',
      'about.ch1_title': 'I started where users start: the screen.',
      'about.ch1_desc': 'I was obsessed with how software feels, the small details that make an interface feel right.',
      'about.ch2_label': 'The break',
      'about.ch2_title': 'Then consulting showed me where good software fails. <span class="a">Not in the code.</span>',
      'about.ch2_desc': 'In deployment, in access, and in whether the people it was built for ever used it.',
      'about.ch3_label': 'The whole path',
      'about.ch3_title': 'So I learned all of it.',
      'about.ch3_desc': 'I design the interface, wire the pipeline, provision the infrastructure and train the team who will use it. Same job, different layers. <a href="#certs">See the certifications →</a>',
      'about.chapter_prefix': 'Chapter',
      'about.chapter_of': 'of',
      'about.principles_label': 'Principles',
      'about.p1_title': 'Ownership',
      'about.p1_desc': 'Wireframe to production monitoring. I stay with it.',
      'about.p2_title': 'Small iterations',
      'about.p2_desc': 'Ship small, learn fast, compound.',
      'about.p3_title': 'Adoption first',
      'about.p3_desc': 'If people don’t use it, it didn’t ship.',
      'about.edu_label': 'Education',
      'about.edu_val': 'BSc Information Technology, BluCrest College · 2019 to 2023',
      'about.cv_label': 'Curriculum Vitae',
      'about.cv_desc': 'Verified credentials, enterprise project delivery, and engineering leadership across cloud, web, and internal platforms.',
      'about.cv_btn': '<b>↓</b>Download CV (PDF)',
      'about.cta_label': '● Start a project',
      'about.cta_h2': 'Have an idea?<br><span class="a">Let’s build it.</span>',
      'about.cta_btn': '<b>↗</b>Contact me',
      'about.cta_cv_btn': '<b>↓</b>Download CV',

      // Expertise View
      'xp.label': '● Expertise',
      'xp.h2': 'One engineer.<br><span class="a">Many layers.</span>',
      'xp.lede': 'One person across the whole path, so nothing falls between the layers.',
      'xp.l1_name': 'Front-end',
      'xp.l1_tagline': 'Interfaces people choose to use',
      'xp.l1_desc': 'React and TypeScript front-ends built for speed and clarity, from the first wireframe.',
      'xp.l1_proof': 'Clean UI and fast loading times with best UX practices. <a href="https://www.wikora.online/" target="_blank" rel="noopener">See Wikora ↗</a>',
      'xp.l2_name': 'Back-end &amp; data',
      'xp.l2_tagline': 'Data that stays organised and secure',
      'xp.l2_desc': 'APIs and databases designed around proper access controls and data governance.',
      'xp.l2_proof': 'Role-based access and organisation-scoped data in Wikora. <a href="#work">See the case ↗</a>',
      'xp.l3_name': 'Cloud &amp; DevOps',
      'xp.l3_tagline': 'Infrastructure that rebuilds from code',
      'xp.l3_desc': 'Azure and Google Cloud environments defined in Bicep/Terraform and shipped through automated pipelines.',
      'xp.l3_proof': 'High-availability WordPress hosting, redeployable from code. <a href="https://github.com/HakzTV/WordPress-on-Azure" target="_blank" rel="noopener">See the repo ↗</a>',
      'xp.l4_name': 'Platform &amp; delivery',
      'xp.l4_tagline': 'Systems your team actually uses',
      'xp.l4_desc': 'Automate processes, ship the platform, then train the team so the tools are in use after launch.',
      'xp.l4_proof': '30% productivity gain and 500+ users trained at eSolutions.',
      'xp.flow_label': '● How I work',
      'xp.f1_title': 'Wireframe',
      'xp.f1_desc': 'Shape the idea with you before any code.',
      'xp.f2_title': 'Build',
      'xp.f2_desc': 'Ship in small iterations and learn fast.',
      'xp.f3_title': 'Ship',
      'xp.f3_desc': 'Deploy through automated pipelines.',
      'xp.f4_title': 'Monitor',
      'xp.f4_desc': 'Stay with it in production.',
      'xp.ways_label': '● Ways to work together',
      'xp.w1_badge': 'Advise',
      'xp.w1_title': 'Cloud consulting',
      'xp.w1_desc': 'Architecture review, Azure and GCP guidance, delivery pipelines.',
      'xp.w2_badge': 'Build',
      'xp.w2_title': 'Product engineering',
      'xp.w2_desc': 'Front-end or full-stack SaaS, from your idea to deployment.',
      'xp.w3_badge': 'Enable',
      'xp.w3_title': 'Adoption &amp; training',
      'xp.w3_desc': 'Onboarding teams onto new platforms so they stick.',
      'xp.cert_note': '● Certified across Azure · <a href="#certs" style="color:var(--ember)">5 certifications →</a>',
      'xp.cta_label': '● Work with me',
      'xp.cta_h2': 'Not sure where to start?<br><span class="a">Tell me what you need.</span>',
      'xp.cta_btn': '<b>↗</b>Contact me',

      // Certifications View
      'certs.label': '● Certifications',
      'certs.h2': 'Five certs.<br><span class="a">One path.</span>',
      'certs.lede': 'Fundamentals, administration, architecture, DevOps, then a specialty. Each one maps to work I do for clients.',
      'certs.c1_desc': 'Core cloud concepts and Azure services. The shared language of every cloud conversation.',
      'certs.c2_desc': 'Running Azure day to day: identity, networking, storage, compute and monitoring.',
      'certs.c3_desc': 'Designing Azure solutions around security, resilience and cost. Applied in the WordPress on Azure project.',
      'certs.c4_desc': 'Delivery pipelines, infrastructure as code and release strategy. Applied daily with Azure DevOps and Bicep.',
      'certs.c5_desc': 'Deploying and managing virtual desktops on Azure.',
      'certs.cta_label': '● Need this applied to your cloud?',
      'certs.cta_h2': 'Let’s talk<br><span class="a">architecture.</span>',
      'certs.cta_btn': '<b>↗</b>Contact me',

      // Design System View
      'sys.label': '● Design system v1.0',
      'sys.h2': 'Editorial.<br><span class="a">Engineered.</span>',
      'sys.principle_label': 'Principle',
      'sys.principle_desc': 'Monochrome does the talking. One ember accent marks every action. Mono labels annotate like an engineer’s drawing.',
      'sys.colour_label': 'Colour',
      'sys.type_label': 'Type',
      'sys.actions_label': 'Actions',
      'sys.act_primary': '<b>→</b>Primary',
      'sys.act_secondary': '<b>↗</b>Secondary',
      'sys.act_tag': '<i class="dot"></i>Status tag',
      'sys.shape_label': 'Shape &amp; space',
      'sys.shape_desc': 'Cards 18px radius, pills for actions, 8px base grid, 110px section rhythm, 1px hairlines in #2A2A2E.',
      'sys.motion_label': 'Motion',
      'sys.motion_desc': 'Ease-out 0.35 to 0.8s. Reveal on scroll, lift on hover, arrow rotates on press. Reduced-motion respected.',

      // Contact View
      'contact.label': '● Contact',
      'contact.h2': 'Let’s build<br><span class="a">your idea.</span>',
      'contact.name_label': 'Name',
      'contact.email_label': 'Email',
      'contact.need_label': 'I need',
      'contact.opt_cloud': 'Cloud consulting',
      'contact.opt_product': 'Product engineering',
      'contact.opt_training': 'Training &amp; adoption',
      'contact.opt_other': 'Something else',
      'contact.msg_label': 'Message',
      'contact.submit_btn': '<b>↗</b>Send message',
      'contact.sending': '<b>·</b>Sending...',

      // Footer
      'footer.map_label': '● Reach',
      'footer.map_h2': 'Built in Accra.<br><span class="a">Delivered across the world.</span>',
      'footer.map_desc': 'Enterprise platforms and products for clients across four continents.',
      'footer.brand_p': 'Software engineer and Azure architect. Cloud-native products that teams actually adopt.',
      'footer.location': 'Accra, Ghana',
      'footer.pages_label': 'Pages',
      'footer.work_label': 'Selected work',
      'footer.cv_link': 'Download CV (PDF) ↗',
      'footer.back_top': 'Back to top ↑'
    },

    fr: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.work': 'Projets',
      'nav.about': 'À propos',
      'nav.expertise': 'Expertise',
      'nav.certs': 'Certifications',
      'nav.contact': 'Contact',
      'nav.switch_title': 'Passer en anglais',

      // Mobile Menu
      'menu.role': 'Ingénieur logiciel · Architecte Azure',
      'menu.location': 'Accra, Ghana',
      'menu.lang_label': 'Langue',

      // Hero
      'hero.badge': '<i class="dot"></i>Disponible pour missions conseil &amp; produit',
      'hero.subhead': 'Ingénieur Logiciel · Architecte Azure · Accra, Ghana',
      'hero.lede': 'Je conçois des logiciels cloud-native que les équipes <em>adoptent réellement</em>.',
      'hero.pipe_aria': 'Du cadrage à la supervision en production',
      'hero.step_wireframe': 'Cadrage',
      'hero.step_build': 'Build',
      'hero.step_ship': 'Livraison',
      'hero.step_monitor': 'Supervision',
      'hero.btn_work': '<b>→</b>Voir mes projets',
      'hero.btn_contact': '<b>↗</b>Me contacter',
      'hero.chip_location': 'Accra, Ghana',
      'hero.chip_role': 'Architecte Azure',
      'hero.chip_stack': 'Full-stack',
      'hero.live_pill': '<i class="dot"></i>En production',

      // Proof Metrics
      'proof.metric1': 'gain de productivité d’équipe',
      'proof.metric2': 'temps de chargement réduits',
      'proof.metric3': 'réduction du taux de rebond',
      'proof.metric4': 'utilisateurs formés',
      'proof.metric5': 'pays desservis',

      // Manifesto
      'manifesto.label': '● Manifeste',
      'manifesto.h2': 'Interface.<br>Infrastructure.<br><span class="a">Adoption.</span>',
      'manifesto.d1_title': 'Architecture Front-end',
      'manifesto.d1_desc': 'React, TypeScript, SPFx. Rapide, accessible et centré sur l’humain.',
      'manifesto.d2_title': 'Back-end &amp; données',
      'manifesto.d2_desc': 'Azure SQL, PostgreSQL, MongoDB.',
      'manifesto.d3_title': 'Cloud &amp; DevOps',
      'manifesto.d3_desc': 'Azure, GCP, IaC Bicep, pipelines CI/CD automatisés.',
      'manifesto.d4_title': 'Développement SaaS',
      'manifesto.d4_desc': 'Multi-tenant, gestion stricte des rôles, offline-first.',
      'manifesto.d5_title': 'Accompagnement &amp; adoption',
      'manifesto.d5_desc': 'Rapprocher la conception technique des équipes métier.',

      // The Arc (Parcours)
      'arc.label': '● Le parcours',
      'arc.h2': 'Des pixels aux <span class="a">plateformes.</span>',
      'arc.c1_time': '2019 à 2023',
      'arc.c1_title': 'Maîtriser les fondamentaux',
      'arc.c1_desc': 'BSc en Technologies de l’Information au BluCrest College. Architecture logicielle, algorithmes et calculabilité. Le socle de toutes mes réalisations.',
      'arc.c2_time': 'Juin à Déc 2023',
      'arc.c2_title': 'Façonner l’interface',
      'arc.c2_desc': 'Développeur Front-End chez Advertising & Publisher Solutions Ghana. Refonte d’UI : taux de rebond réduit de 28%, chargement 40% plus rapide, engagement en hausse de 32%, bugs UI réduits de 35%.',
      'arc.c3_time': '2024 à Aujourd’hui',
      'arc.c3_title': 'Bâtir le système',
      'arc.c3_desc': 'Consultant Technique chez eSolutions Consulting. Architecture front-end, pipelines Azure DevOps et infrastructure Bicep, automatisation Power Platform (+30% de productivité).',
      'arc.c4_time': 'Aujourd’hui',
      'arc.c4_title': 'Développer des produits',
      'arc.c4_desc': 'Wikora et WeTrack : des produits en direct, dont l’un avec un premier client payant, forgés par la rigueur des projets d’entreprise.',

      // Selected Work (Home preview)
      'selwork.label': '● Projets sélectionnés',
      'selwork.wikora_desc': 'SaaS multi-tenant et offline-first de gestion des connaissances.',
      'selwork.wikora_chip1': 'Gestion documentaire',
      'selwork.wikora_chip2': 'Accès sécurisé',
      'selwork.wetrack_desc': 'Suivi des revenus et dépenses avec envoi de reçus par email ou WhatsApp. Mon premier produit avec un client payant.',
      'selwork.wetrack_chip1': 'Revenus &amp; dépenses',
      'selwork.wetrack_chip2': 'Reçus instantanés',
      'selwork.wp_desc': 'Hébergement haute disponibilité, entièrement automatisé avec Bicep.',
      'selwork.wp_chip1': 'Bicep',
      'selwork.wp_chip2': 'Key Vault',
      'selwork.wp_chip3': 'Automatisation',

      // Home CTA
      'home.cta_label': '● Travaillons ensemble',
      'home.cta_h2': 'Votre idée, concrétisée<br><span class="a">et réellement adoptée.</span>',
      'home.cta_btn': '<b>↗</b>Me contacter',

      // Work View
      'work.label': '● Projets sélectionnés',
      'work.h2': 'Des problèmes résolus,<br><span class="a">pas de simples maquettes.</span>',
      'work.c1_tag': '01 · SaaS · Produit en ligne',
      'work.c1_btn': '<b>↗</b>Voir le produit en ligne',
      'work.problem_label': 'Problème',
      'work.build_label': 'Solution',
      'work.outcome_label': 'Résultat',
      'work.c1_problem': 'Les organisations gèrent leurs connaissances de façon dispersée, sans versioning ni contrôle d’accès rigoureux.',
      'work.c1_build': 'Une plateforme collaborative multi-tenant avec contrôle d’accès basé sur les rôles, isolation stricte des données, invitations et révocation. Lecture et modification offline-first avec mises à jour optimistes et synchronisation automatique.',
      'work.c1_outcome': 'Une source de vérité unique et versionnée, avec des modèles de données conçus pour l’analytique et l’assistance par IA.',
      'work.c2_tag': '02 · PWA · Premier client payant',
      'work.c2_btn': '<b>↗</b>Ouvrir WeTrack',
      'work.c2_problem': 'Structurer le suivi des revenus et des dépenses, et délivrer des reçus aux clients sans friction.',
      'work.c2_build': 'Une progressive web app (PWA) qui enregistre entrées et dépenses et expédie les reçus aux clients par email ou WhatsApp.',
      'work.c2_outcome': 'Aide les petites entreprises à tenir un historique clair de leur trésorerie. Déjà utilisée au quotidien par un client payant.',
      'work.c3_tag': '03 · Cloud · Infrastructure as code',
      'work.c3_btn': '<b>↗</b>Voir sur GitHub',
      'work.c3_problem': 'Un hébergement de production reproductible, observable et résilient face aux incidents.',
      'work.c3_build': 'Déploiement complet automatisé avec Bicep, Bash et GitHub Actions : domaine personnalisé, DNS, secrets dans Key Vault, sauvegardes et supervision.',
      'work.c3_outcome': 'Hébergement hautement disponible avec reprise après sinistre, redéployable intégralement à partir du code.',
      'work.c4_tag': '04 · Entreprise · eSolutions',
      'work.c4_title': 'Plateformes d’entreprise',
      'work.c4_problem': 'Des entreprises au Ghana, au Kenya et en Côte d’Ivoire avaient besoin d’outils fiables que leurs équipes adopteraient réellement.',
      'work.c4_build': 'Architecture front-end, automatisation et CI/CD avec Bicep pour App Service et Functions. Responsabilité complète, du cadrage initial jusqu’au suivi en production.',
      'work.c4_outcome': 'Gain de productivité interne de 30% et plus de 500 utilisateurs formés pour adopter les nouvelles plateformes.',
      'work.cta_label': '● Prochaine étude de cas',
      'work.cta_h2': 'Un défi technique à relever ?<br><span class="a">Bâtissons ce qui sera réellement adopté.</span>',
      'work.cta_btn': '<b>↗</b>Me contacter',

      // About View
      'about.label': '● À propos',
      'about.h2': 'L’ingénieur au carrefour<br>du code<br><span class="a">et de l’utilisateur.</span>',
      'about.ch1_label': 'L’interface',
      'about.ch1_title': 'J’ai commencé là où commence l’utilisateur : l’écran.',
      'about.ch1_desc': 'J’étais passionné par l’ergonomie logicielle, ces micro-détails qui rendent une interface fluide et évidente.',
      'about.ch2_label': 'La rupture',
      'about.ch2_title': 'Puis le conseil m’a montré où échouent les bons logiciels. <span class="a">Pas dans le code.</span>',
      'about.ch2_desc': 'Dans le déploiement, la gestion des accès, et la capacité des équipes à s’approprier l’outil créé pour elles.',
      'about.ch3_label': 'La chaîne complète',
      'about.ch3_title': 'Alors j’ai appris l’ensemble de la chaîne.',
      'about.ch3_desc': 'Je conçois l’interface, connecte les pipelines, déploie l’infrastructure et forme les équipes qui l’utiliseront. Le même métier, à tous les niveaux. <a href="#certs">Voir les certifications →</a>',
      'about.chapter_prefix': 'Chapitre',
      'about.chapter_of': 'sur',
      'about.principles_label': 'Principes',
      'about.p1_title': 'Responsabilité totale',
      'about.p1_desc': 'Du cadrage initial à la supervision en production, je reste présent.',
      'about.p2_title': 'Petites itérations',
      'about.p2_desc': 'Livrer par petites étapes, apprendre vite, faire fructifier.',
      'about.p3_title': 'L’adoption d’abord',
      'about.p3_desc': 'Si personne ne l’utilise, ce n’est pas un succès.',
      'about.edu_label': 'Formation',
      'about.edu_val': 'BSc en Technologies de l’Information, BluCrest College · 2019 à 2023',
      'about.cv_label': 'Curriculum Vitae',
      'about.cv_desc': 'Expérience vérifiée, projets d’envergure livrés en entreprise et leadership technique sur le cloud, le web et les outils internes.',
      'about.cv_btn': '<b>↓</b>Télécharger le CV (PDF)',
      'about.cta_label': '● Démarrer un projet',
      'about.cta_h2': 'Vous avez une idée ?<br><span class="a">Construisons-la ensemble.</span>',
      'about.cta_btn': '<b>↗</b>Me contacter',
      'about.cta_cv_btn': '<b>↓</b>Télécharger le CV',

      // Expertise View
      'xp.label': '● Expertise',
      'xp.h2': 'Un seul ingénieur.<br><span class="a">Toutes les couches.</span>',
      'xp.lede': 'Un seul interlocuteur sur toute la chaîne, pour qu’aucune exigence ne se perde entre les couches.',
      'xp.l1_name': 'Front-end',
      'xp.l1_tagline': 'Des interfaces que l’on choisit d’utiliser',
      'xp.l1_desc': 'Interfaces React et TypeScript conçues pour la vitesse et la clarté, dès le premier cadrage.',
      'xp.l1_proof': 'Interface soignée et chargements rapides selon les meilleures pratiques UX. <a href="https://www.wikora.online/" target="_blank" rel="noopener">Voir Wikora ↗</a>',
      'xp.l2_name': 'Back-end &amp; données',
      'xp.l2_tagline': 'Des données structurées et hautement sécurisées',
      'xp.l2_desc': 'APIs et bases de données conçues avec un contrôle d’accès rigoureux et une gouvernance stricte.',
      'xp.l2_proof': 'Contrôle d’accès par rôle et isolation des données d’organisation dans Wikora. <a href="#work">Voir l’étude ↗</a>',
      'xp.l3_name': 'Cloud &amp; DevOps',
      'xp.l3_tagline': 'Une infrastructure redéployable par le code',
      'xp.l3_desc': 'Environnements Azure et Google Cloud définis en Bicep/Terraform et livrés par pipelines automatisés.',
      'xp.l3_proof': 'Hébergement WordPress haute disponibilité, redéployable par le code. <a href="https://github.com/HakzTV/WordPress-on-Azure" target="_blank" rel="noopener">Voir le repo ↗</a>',
      'xp.l4_name': 'Plateforme &amp; adoption',
      'xp.l4_tagline': 'Des systèmes que vos équipes utilisent vraiment',
      'xp.l4_desc': 'Automatiser les processus, livrer la plateforme, puis former les équipes pour que l’outil vive après le lancement.',
      'xp.l4_proof': '30% de productivité gagnée et 500+ utilisateurs formés chez eSolutions.',
      'xp.flow_label': '● Ma méthode',
      'xp.f1_title': 'Cadrage',
      'xp.f1_desc': 'Façonner l’idée avec vous avant d’écrire la moindre ligne de code.',
      'xp.f2_title': 'Build',
      'xp.f2_desc': 'Livrer par petites itérations pour apprendre et ajuster vite.',
      'xp.f3_title': 'Livraison',
      'xp.f3_desc': 'Déployer via des pipelines automatisés et sécurisés.',
      'xp.f4_title': 'Supervision',
      'xp.f4_desc': 'Accompagner, monitorer et fiabiliser en production.',
      'xp.ways_label': '● Modes de collaboration',
      'xp.w1_badge': 'Conseil',
      'xp.w1_title': 'Conseil cloud',
      'xp.w1_desc': 'Revue d’architecture, accompagnement Azure & GCP, pipelines de livraison.',
      'xp.w2_badge': 'Conception',
      'xp.w2_title': 'Ingénierie produit',
      'xp.w2_desc': 'Applications SaaS front-end ou full-stack, de votre idée jusqu’à la production.',
      'xp.w3_badge': 'Adoption',
      'xp.w3_title': 'Formation &amp; adoption',
      'xp.w3_desc': 'Accompagner les équipes sur les nouvelles plateformes pour garantir leur adhésion.',
      'xp.cert_note': '● Certifié sur Azure · <a href="#certs" style="color:var(--ember)">5 certifications →</a>',
      'xp.cta_label': '● Collaborer',
      'xp.cta_h2': 'Vous ne savez pas par où commencer ?<br><span class="a">Parlons de vos besoins.</span>',
      'xp.cta_btn': '<b>↗</b>Me contacter',

      // Certifications View
      'certs.label': '● Certifications',
      'certs.h2': 'Cinq certifications.<br><span class="a">Une trajectoire.</span>',
      'certs.lede': 'Fondamentaux, administration, architecture, DevOps, puis spécialisation. Chacune s’applique directement au travail que j’accomplis pour mes clients.',
      'certs.c1_desc': 'Concepts cloud fondamentaux et services Azure. Le langage commun de tout échange technique.',
      'certs.c2_desc': 'Administration quotidienne d’Azure : identité, réseau, stockage, calcul et supervision.',
      'certs.c3_desc': 'Conception de solutions Azure axées sur la sécurité, la résilience et le coût. Appliqué dans le projet WordPress on Azure.',
      'certs.c4_desc': 'Pipelines de livraison, infrastructure as code et stratégies de déploiement. Appliqué au quotidien avec Azure DevOps et Bicep.',
      'certs.c5_desc': 'Déploiement et gestion d’environnements de postes de travail virtuels sur Azure.',
      'certs.cta_label': '● Besoin d’appliquer ceci à votre cloud ?',
      'certs.cta_h2': 'Parlons<br><span class="a">architecture.</span>',
      'certs.cta_btn': '<b>↗</b>Me contacter',

      // Design System View
      'sys.label': '● Système de design v1.0',
      'sys.h2': 'Éditorial.<br><span class="a">Ingénierie.</span>',
      'sys.principle_label': 'Principe',
      'sys.principle_desc': 'Le monochrome donne le ton. Une touche d’ambre souligne chaque interaction. Les libellés mono annotent comme sur un plan d’ingénieur.',
      'sys.colour_label': 'Couleur',
      'sys.type_label': 'Typographie',
      'sys.actions_label': 'Actions',
      'sys.act_primary': '<b>→</b>Principal',
      'sys.act_secondary': '<b>↗</b>Secondaire',
      'sys.act_tag': '<i class="dot"></i>Tag de statut',
      'sys.shape_label': 'Forme &amp; espace',
      'sys.shape_desc': 'Cartes rayon 18px, pilules pour les actions, grille de base 8px, rythme de section 110px, filets 1px en #2A2A2E.',
      'sys.motion_label': 'Mouvement',
      'sys.motion_desc': 'Ease-out 0.35 à 0.8s. Apparition au scroll, élévation au survol, rotation de flèche au clic. Respect du mode sans mouvement.',

      // Contact View
      'contact.label': '● Contact',
      'contact.h2': 'Donnons vie<br><span class="a">à votre projet.</span>',
      'contact.name_label': 'Nom',
      'contact.email_label': 'Email',
      'contact.need_label': 'Mon besoin',
      'contact.opt_cloud': 'Conseil cloud',
      'contact.opt_product': 'Ingénierie produit',
      'contact.opt_training': 'Formation &amp; adoption',
      'contact.opt_other': 'Autre demande',
      'contact.msg_label': 'Message',
      'contact.submit_btn': '<b>↗</b>Envoyer le message',
      'contact.sending': '<b>·</b>Envoi en cours...',

      // Footer
      'footer.map_label': '● Rayonnement',
      'footer.map_h2': 'Conçu à Accra.<br><span class="a">Déployé à travers le monde.</span>',
      'footer.map_desc': 'Plateformes et produits d’entreprise pour des clients répartis sur quatre continents.',
      'footer.brand_p': 'Ingénieur logiciel et architecte Azure. Des produits cloud-native que les équipes adoptent réellement.',
      'footer.location': 'Accra, Ghana',
      'footer.pages_label': 'Pages',
      'footer.work_label': 'Projets sélectionnés',
      'footer.cv_link': 'Télécharger le CV (PDF) ↗',
      'footer.back_top': 'Haut de page ↑'
    }
  };

  // Dynamic values for Values Orbit Wheel
  var WHEEL_VALUES = {
    en: [
      ['Honest advice', '01 · HONESTY', 'I hear the idea first. If I think it won’t work, I say so calmly and explain why.'],
      ['Vision first', '02 · CLARITY', 'I don’t build until I understand most of what the client truly sees in their head.'],
      ['Only what you need', '03 · FIT', 'Most small businesses don’t need a full suite. I build the one module that matters.'],
      ['Transparency', '04 · TRUST', 'I build systems that make the truth easy to see, so nobody has to guess.'],
      ['Ownership', '05 · FOLLOW-THROUGH', 'From wireframe to production monitoring, I stay with it.']
    ],
    fr: [
      ['Conseil transparent', '01 · TRANSPARENCE', 'J’écoute d’abord l’idée. Si je pense qu’elle ne fonctionnera pas, je le dis calmement en expliquant pourquoi.'],
      ['Clarté de vision', '02 · CLARTÉ', 'Je ne commence pas à coder tant que je n’ai pas compris ce que le client visualise réellement.'],
      ['L’essentiel avant tout', '03 · JUSTE MESURE', 'La plupart des entreprises n’ont pas besoin d’une usine à gaz. Je bâtis le module précis qui fait la différence.'],
      ['Transparence totale', '04 · CONFIANCE', 'Je conçois des systèmes où la vérité des données est évidente, pour éliminer toute incertitude.'],
      ['Engagement complet', '05 · RESPONSABILITÉ', 'Du cadrage initial à la supervision en production, je reste présent.']
    ]
  };

  function detectLanguage() {
    var stored = null;
    try {
      stored = localStorage.getItem('tv_lang');
    } catch (e) {}

    if (stored === 'fr' || stored === 'en') return stored;

    var navLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return navLang.toLowerCase().slice(0, 2) === 'fr' ? 'fr' : 'en';
  }

  var currentLang = detectLanguage();

  function applyLanguage(lang) {
    if (!DICT[lang]) lang = 'en';
    currentLang = lang;

    try {
      localStorage.setItem('tv_lang', lang);
    } catch (e) {}

    document.documentElement.lang = lang;

    // Translate DOM elements marked with [data-i18n]
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i],
          key = el.getAttribute('data-i18n'),
          val = DICT[lang][key];
      if (val !== undefined) {
        if (/[<>&]/.test(val)) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    }

    // Update data-l chapter labels in About section
    var chs = document.querySelectorAll('.ab-ch');
    if (chs.length >= 3) {
      chs[0].setAttribute('data-l', DICT[lang]['about.ch1_label']);
      chs[1].setAttribute('data-l', DICT[lang]['about.ch2_label']);
      chs[2].setAttribute('data-l', DICT[lang]['about.ch3_label']);
      var activeLabelEl = document.getElementById('ab-cl');
      if (activeLabelEl) {
        var activeNumEl = document.getElementById('ab-cn'),
            activeNum = activeNumEl ? parseInt(activeNumEl.textContent, 10) - 1 : 0;
        if (chs[activeNum]) {
          activeLabelEl.textContent = chs[activeNum].getAttribute('data-l');
        }
      }
    }

    // Update language switch buttons
    var switchBtns = document.querySelectorAll('.lang-switch');
    switchBtns.forEach(function(btn) {
      var enOpt = btn.querySelector('[data-opt="en"]'),
          frOpt = btn.querySelector('[data-opt="fr"]');
      if (enOpt) enOpt.classList.toggle('active', lang === 'en');
      if (frOpt) frOpt.classList.toggle('active', lang === 'fr');
      btn.setAttribute('title', lang === 'fr' ? DICT[lang]['nav.switch_title'] : 'Switch to French');
    });

    var menuBtns = document.querySelectorAll('.menu-lang-btn');
    menuBtns.forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-opt') === lang);
    });

    // Notify other components (like wheel)
    if (typeof window.tvOnLangChange === 'function') {
      window.tvOnLangChange(lang);
    }

    window.dispatchEvent(new CustomEvent('tv:langchange', { detail: { lang: lang } }));
  }

  // Expose API
  window.tvI18n = {
    getLanguage: function() { return currentLang; },
    setLanguage: function(lang) { applyLanguage(lang); },
    toggleLanguage: function() { applyLanguage(currentLang === 'fr' ? 'en' : 'fr'); },
    getWheelValues: function() { return WHEEL_VALUES[currentLang] || WHEEL_VALUES.en; },
    DICT: DICT
  };

  // Run initial translation immediately so DOM has target text before other scripts split words
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyLanguage(currentLang);
    });
  } else {
    applyLanguage(currentLang);
  }
})();
