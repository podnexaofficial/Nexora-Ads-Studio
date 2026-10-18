import { ServiceItem, PortfolioProject, PricingPlan, FaqItem } from '../types.ts';

export const AGENCY_CONFIG = {
  name: 'NEXORA ADS STUDIO',
  legalName: 'Nexora Ads Studio LLC',
  tagline: 'AI-powered creative. Human-led growth.',
  officialEmail: 'podnexaofficial@gmail.com',
  officialPhone: '+1 (555) 019-8234',
  whatsappDirect: 'https://wa.me/15550198234',
  location: 'San Francisco, CA & Remote Global Studio',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM EST / PST',
  statement:
    'We engineer high-performance ad creative by pairing modern generative AI models with rigorous commercial art direction and conversion psychology.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-video-ads',
    title: 'AI Video Ads & Motion Spots',
    shortDesc: 'Dynamic short-form video ads engineered to capture immediate thumb-stop attention and drive click-throughs.',
    badge: 'High Conversion',
    iconName: 'Video',
    deliverables: [
      'Multi-hook intro variants (3-5 hooks per concept)',
      'Platform-optimized vertical (9:16) & square (1:1) cuts',
      'Dynamic typography, motion graphics & sound design',
      'High-fidelity voiceover synthesis & licensed music cues',
    ],
    turnaround: '5–7 business days per batch',
    idealFor: 'DTC e-commerce, mobile apps, and subscription brands looking to scale TikTok & Meta ad spend.',
    features: ['Hook Drop-off Resistance', 'Native Platform Text Overlays', 'Algorithmic Pacing Tests'],
    metricFocus: 'Thumb-stop rate & 3-second hold rate',
  },
  {
    id: 'ai-ugc-creatives',
    title: 'AI UGC-Style Creatives',
    shortDesc: 'Relatable creator-style authentic videos without the costly delays, flaky talent, and logistics of traditional influencer agencies.',
    badge: 'Social First',
    iconName: 'Users',
    deliverables: [
      'Authentic testimonial hooks & problem-solution scripts',
      'Realistic avatar synthesis & voice synchronization',
      'Green-screen product reaction & stitch-style ads',
      'Script iteration tailored to target consumer personas',
    ],
    turnaround: '4–6 business days',
    idealFor: 'Beauty, wellness, fashion, gadgets, and consumer goods requiring human trust signals.',
    features: ['Organic TikTok Aesthetics', 'Demographic-Targeted Personas', 'Rapid Script Iteration'],
    metricFocus: 'Click-through rate (CTR) & cost per click (CPC)',
  },
  {
    id: 'ai-product-photography',
    title: 'AI Product Photography & 3D Stills',
    shortDesc: 'Photorealistic virtual photoshoots. Place your physical products into bespoke architectural, lifestyle, and studio environments.',
    badge: 'Zero Shoot Costs',
    iconName: 'Camera',
    deliverables: [
      'Ultra-high resolution master renders (4K ready)',
      'Multiple contextual backgrounds (luxury interior, nature, studio pedestal)',
      'Seasonal and holiday visual refreshes on demand',
      'Clean background isolation & commercial compositing',
    ],
    turnaround: '3–5 business days',
    idealFor: 'E-commerce catalogs, Amazon storefronts, Meta carousel ads, and hero landing pages.',
    features: ['Flawless Lighting Control', 'Zero Physical Studio Rental', 'Infinite Scene Variations'],
    metricFocus: 'Add-to-cart rate & catalog engagement',
  },
  {
    id: 'ad-copy-strategy',
    title: 'Ad Copy & Creative Strategy',
    shortDesc: 'Direct-response copywriting backed by customer research, pain-point mapping, and psychological triggers.',
    badge: 'Strategic Rigor',
    iconName: 'FileText',
    deliverables: [
      'Customer persona matrix & objection audit',
      '30+ tested headline & primary text angles',
      'Complete creative briefs with storyboard direction',
      'Call-to-action (CTA) variant testing matrix',
    ],
    turnaround: '3–4 business days',
    idealFor: 'Brands that have good products but struggle to find angles that resonate with new customer segments.',
    features: ['Direct Response Mechanics', 'Emotional Triggers', 'Competitor Angle White-Spaces'],
    metricFocus: 'Conversion rate & message resonance',
  },
  {
    id: 'paid-ad-management',
    title: 'Paid Ad Campaign Management',
    shortDesc: 'Full-funnel campaign management across Meta, TikTok, and Google Ads designed to scale winning creative assets efficiently.',
    badge: 'Growth Engine',
    iconName: 'BarChart3',
    deliverables: [
      'Account structure audit & pixel/CAPI tracking verification',
      'Audience segmentation, retargeting & lookalike setups',
      'Weekly budget reallocation towards top-performing creatives',
      'Bi-weekly performance review calls & live dashboards',
    ],
    turnaround: 'Ongoing monthly management',
    idealFor: 'Growing companies spending $3k–$50k/month on paid advertising looking for unified creative + media execution.',
    features: ['Creative-Led Media Buying', 'Daily Budget Pacing', 'Bid Cap & Advantage+ Optimization'],
    metricFocus: 'Customer acquisition cost (CAC) & ROAS stability',
  },
  {
    id: 'creative-optimization',
    title: 'Creative & Campaign Optimization',
    shortDesc: 'A systematic testing loop to eliminate creative fatigue, replace decaying ads, and compound creative learnings.',
    badge: 'Continuous Iteration',
    iconName: 'TrendingUp',
    deliverables: [
      'Creative fatigue early-warning tracking',
      'Hook retention analysis and drop-off diagnosis',
      'Iterative micro-tweaks (audio swaps, caption adjustments, color grades)',
      'Monthly Creative Intelligence Playbook',
    ],
    turnaround: 'Continuous 14-day testing cycles',
    idealFor: 'Brands looking to sustain high ad spends without seeing CPA shoot up after 3 weeks of running the same creative.',
    features: ['Rapid Angle Refreshes', 'Audience Fatigue Prevention', 'Systematic A/B Testing'],
    metricFocus: 'Creative lifespan & long-term CAC suppression',
  },
];

export const CONCEPT_PROJECTS: PortfolioProject[] = [
  {
    id: 'lumina-aura',
    title: 'Lumina Aura Cellular Hydration',
    clientCategory: 'Luxury Skincare & DTC Beauty',
    deliverableType: 'AI Macro Video & Studio Stills',
    platforms: ['Meta Ads (9:16)', 'Instagram Feed (1:1)', 'TikTok Ads'],
    hookHeadline: 'What happens when hydration penetrates 5 layers deeper?',
    synopsis: 'A speculative concept campaign featuring generative fluid dynamics, photorealistic light refractions, and skin-barrier macro visualizations designed for luxury beauty buyers.',
    visualConcept: 'Pristine water droplet collisions, frosted glass dropper bottles resting on wet obsidian stone, and luminous skin micro-texture transitions.',
    creativeStrategy: [
      'Tested 4 distinct psychological entry points: clinical dermatological proof vs. sensorial ritual aesthetics.',
      'Designed 3-second macro hook that slowed scroll speed by emphasizing tactile liquid viscosity.',
      'Paired whisper-cadence AI voiceover with subtle ASMR droplet sound design.',
    ],
    gradientTheme: {
      from: '#0ea5e9',
      to: '#38bdf8',
      accent: '#0369a1',
    },
    sampleTag: 'Speculative Concept Project',
    aspectRatio: '9:16 Vertical Video & 1:1 Carousel',
    adCopySample: {
      hook: "Most moisturizers evaporate before they ever reach your dermal layer. Here is the science of cellular locking.",
      body: "Formulated with biomimetic hyaluronic clusters. 72 hours of uninterrupted moisture barrier retention without greasy residue.",
      cta: "Explore the Cellular Collection",
    },
  },
  {
    id: 'velocity-apex',
    title: 'Velocity Apex Kinetic Carbon Shoe',
    clientCategory: 'Performance Footwear & Athletics',
    deliverableType: '3D Exploded AI Commercial',
    platforms: ['TikTok (9:16)', 'YouTube Shorts', 'Instagram Reels'],
    hookHeadline: 'Every stride returns 84% of your energy. Feel the snap.',
    synopsis: 'A high-energy footwear launch ad illustrating carbon plate energy return with kinetic particle trails and explosive biomechanical simulations.',
    visualConcept: 'Carbon fiber plate separating procedurally from dual-density midsole foam, illuminated by ultraviolet neon track lighting.',
    creativeStrategy: [
      'Targeted marathoners and weekend runners frustrated with heavy trainers.',
      'Visualized invisible mechanical benefits: showing spring rebound in 120fps slow-motion AI simulation.',
      'High-tempo beat drop synced directly with foot-strike impact.',
    ],
    gradientTheme: {
      from: '#4f46e5',
      to: '#6366f1',
      accent: '#312e81',
    },
    sampleTag: 'Speculative Concept Project',
    aspectRatio: '9:16 Fast-Paced Video',
    adCopySample: {
      hook: "Running shoes shouldn't absorb your energy. They should slingshot it back into your next kilometer.",
      body: "Engineered with aerospace-grade carbon propulsion. Designed for PR seekers who refuse to settle for dead foam.",
      cta: "Claim Your Kinetic Edge",
    },
  },
  {
    id: 'solstice-smart-home',
    title: 'Solstice Living Ambient Illumination',
    clientCategory: 'Smart Home & Architectural Design',
    deliverableType: 'Architectural Staging & Carousel Ad',
    platforms: ['Meta Ads (1:1 & 4:5)', 'Pinterest Ads', 'Google Display'],
    hookHeadline: 'Lighting that syncs with your circadian biology, not just a switch.',
    synopsis: 'A lifestyle concept ad contrasting harsh blue office glare with serene circadian sunset transitions across Scandinavian interior living spaces.',
    visualConcept: 'Minimalist concrete and warm oak loft spaces shifting seamlessly from energizing 5000K daylight into warm 1800K amber evening glow.',
    creativeStrategy: [
      'Problem-led hook targeting remote tech workers experiencing eye strain and disrupted sleep.',
      'Side-by-side split screen showing mood elevation from morning focus to evening relaxation.',
      'Elegant, non-salesy art direction built to earn attention from design-conscious homeowners.',
    ],
    gradientTheme: {
      from: '#f59e0b',
      to: '#fbbf24',
      accent: '#b45309',
    },
    sampleTag: 'Speculative Concept Project',
    aspectRatio: '1:1 Square & 4:5 Portrait',
    adCopySample: {
      hook: "Harsh ceiling bulbs are quietly destroying your evening melatonin production. There is a gentler way.",
      body: "Solstice naturally transitions through 24 hourly spectral states to keep your natural rhythm aligned.",
      cta: "Experience Natural Light at Home",
    },
  },
  {
    id: 'botanica-coldpress',
    title: 'Botanica Cold-Press Adaptogen Elixirs',
    clientCategory: 'Functional Beverage & Wellness',
    deliverableType: 'AI UGC-Style Reel & Ingredient Burst',
    platforms: ['TikTok Spark Ads', 'Meta Reels', 'YouTube Shorts'],
    hookHeadline: 'The afternoon coffee crash is optional. Drink this instead.',
    synopsis: 'Relatable creator-style mobile video ad opening with an authentic midday slump reaction, transitioning into crisp macro fruit slice explosions.',
    visualConcept: 'Golden hour kitchen counter, frosty amber glass bottle uncap with crisp audio fizz, and vibrant fresh adaptogenic botanical cross-sections.',
    creativeStrategy: [
      'Leveraged relatable workplace fatigue hook in first 1.5 seconds.',
      'Contrasted jittery caffeine spikes with calm, sustained focus from Lion’s Mane and Ashwagandha.',
      'Native TikTok UI overlay and caption styling to blend into organic feeds.',
    ],
    gradientTheme: {
      from: '#10b981',
      to: '#34d399',
      accent: '#065f46',
    },
    sampleTag: 'Speculative Concept Project',
    aspectRatio: '9:16 TikTok Format',
    adCopySample: {
      hook: "Stop drinking your 3rd espresso at 2 PM. Your adrenals are begging for balance.",
      body: "Cold-pressed tart cherry, organic lion's mane, and magnesium. Sustained cognitive focus without jitters or 4 PM brain fog.",
      cta: "Try the 7-Day Reset Pack",
    },
  },
  {
    id: 'novasound-anc',
    title: 'NovaSound Pro ANC Earbuds',
    clientCategory: 'Consumer Tech & Hardware',
    deliverableType: 'Sensory Audio Visual Commercial',
    platforms: ['YouTube Ads (16:9)', 'Meta Ads (9:16)', 'TikTok'],
    hookHeadline: 'Turn the volume of the chaotic world down to zero.',
    synopsis: 'A soundscape-driven commercial visualizing sound waves entering dual reverse microphones and flattening into blissful silence in a crowded subway.',
    visualConcept: 'Chaotic city sound waves illustrated as sharp jagged neon geometry, dissolving instantly into smooth acoustic ripples upon earbud insertion.',
    creativeStrategy: [
      'Auditory contrast technique: loud ambient street noise immediately muted to create dramatic sensory relief.',
      'Macro close-up showing custom silicone ear tips conforming to ear canal geometry.',
      'Targeted commuters, frequent flyers, and open-plan office professionals.',
    ],
    gradientTheme: {
      from: '#6366f1',
      to: '#8b5cf6',
      accent: '#4338ca',
    },
    sampleTag: 'Speculative Concept Project',
    aspectRatio: '9:16 & 16:9 Multi-Cut',
    adCopySample: {
      hook: "Subway roar. Construction drill. Sirens. Press one sensor, and watch the entire city go mute.",
      body: "Equipped with dual neural anti-noise processors sampling ambient sounds 48,000 times per second.",
      cta: "Discover True Silence",
    },
  },
  {
    id: 'roastcraft-coffee',
    title: 'RoastCraft Single-Origin Subscription',
    clientCategory: 'Specialty Food & Direct-to-Consumer',
    deliverableType: 'Sensory Macro Video & Unboxing Hook',
    platforms: ['Instagram Reels (9:16)', 'Meta Carousel', 'Pinterest Video'],
    hookHeadline: 'Grocery store beans were roasted 6 months ago. Taste the difference of day 3.',
    synopsis: 'A rich sensory ad focusing on blooming coffee grounds, swirling crema in slow motion, and freshly roasted whole beans cascading into matte black packaging.',
    visualConcept: 'Steam gently rising against dark studio slate, warm golden sunlight grazing a hand-poured gooseneck kettle, and velvety crema reflections.',
    creativeStrategy: [
      'Educational angle dispelling grocery store "freshness" claims.',
      'Emphasized artisanal origin transparency: single farm coordinates stamped on the bag.',
      'Created compelling unboxing hook revealing roast date stamp.',
    ],
    gradientTheme: {
      from: '#78350f',
      to: '#b45309',
      accent: '#451a03',
    },
    sampleTag: 'Speculative Concept Project',
    aspectRatio: '9:16 Cinematic Mobile',
    adCopySample: {
      hook: "If your coffee bag doesn't have an exact roast date printed on it, you are drinking stale beans.",
      body: "Roasted in small batches upon order. Shipped within 24 hours so you experience the full floral and chocolate notes.",
      cta: "Find Your Roast Match",
    },
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Angle Research',
    duration: 'Days 1–2',
    description:
      'We unpack your customer avatar, analyze competitor ad libraries, uncover emotional friction points, and craft 10–15 differentiated hook hypotheses.',
    deliverable: 'Creative Strategy Blueprint & Angle Matrix',
  },
  {
    step: '02',
    title: 'Generative AI Asset Synthesis',
    duration: 'Days 3–4',
    description:
      'Using custom generative pipelines, we generate dozens of high-fidelity visual environments, character personas, and motion sequences without costly production crews.',
    deliverable: 'Raw Visual Library & Audio Assets',
  },
  {
    step: '03',
    title: 'Human Art Direction & Polish',
    duration: 'Days 5–6',
    description:
      'Our senior art directors and motion designers hand-craft the final typography, color grading, sound mixing, and pacing to ensure commercial-grade prestige.',
    deliverable: 'Ready-to-Launch Multi-Format Ad Package',
  },
  {
    step: '04',
    title: 'Approval, Launch & Optimization',
    duration: 'Continuous',
    description:
      'You review assets via our streamlined portal. Upon launch, we track drop-off curves and iterate winning hooks weekly to safeguard against ad fatigue.',
    deliverable: 'Weekly Performance Creative Sprints',
  },
];

export const VALUE_PROPOSITIONS = [
  {
    title: 'Speed Without Creative Compromise',
    subtitle: 'From brief to campaign-ready assets in 5 to 7 days, eliminating 8-week production bottlenecks.',
    icon: 'Zap',
  },
  {
    title: 'Direct-Response Rigor First',
    subtitle: 'Every visual cue, hook transition, and typography choice is engineered to protect thumb-stop and drive purchase intent.',
    icon: 'Target',
  },
  {
    title: '100% Client Commercial Ownership',
    subtitle: 'Full commercial rights and raw master exports provided with zero perpetual royalty licensing fees.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Human Art Direction & Quality Control',
    subtitle: 'AI powers the iteration speed, but experienced senior designers curate, color-grade, and polish every final pixel.',
    icon: 'Award',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Creative',
    price: 2450,
    cadence: 'per month',
    description: 'Ideal for emerging e-commerce brands and startups needing a steady stream of fresh, tested ad creative.',
    deliverables: [
      '12 high-performing video ads per month',
      '3 distinct hook variations per concept (36 total cuts)',
      '1 primary platform optimization (Meta or TikTok)',
      'High-resolution product still staging (6 renders)',
      'Direct-response copywriting for all variants',
    ],
    highlights: ['5–7 day turnaround', '2 rounds of creative revisions', 'Commercial usage rights included'],
    idealFor: 'Brands spending $3k–$10k/month on paid ads',
    turnaroundTime: '5–7 business days per batch',
    revisionPolicy: '2 revision cycles per asset batch',
  },
  {
    id: 'growth',
    name: 'Growth Engine',
    price: 4850,
    cadence: 'per month',
    badge: 'Most Popular',
    description: 'Designed for scaling DTC brands and funded startups ready to aggressively test new creative angles and stave off ad fatigue.',
    deliverables: [
      '28 high-performing ad creatives per month (video + UGC)',
      'Multi-hook testing matrix (up to 5 hooks per angle)',
      'Dual platform formatting (9:16 vertical & 1:1 square)',
      '16 ultra-realistic AI product & lifestyle renders',
      'Bi-weekly creative iteration sprints based on ad metrics',
      'Dedicated creative strategist & motion designer',
    ],
    highlights: ['Priority 4–5 day turnaround', 'Unlimited micro-revisions', 'Slack communication channel'],
    idealFor: 'Brands spending $10k–$40k/month on paid ads',
    turnaroundTime: '4–5 business days per sprint',
    revisionPolicy: 'Unlimited iterations within sprint scope',
  },
  {
    id: 'partner',
    name: 'Full Studio Partner',
    price: 8900,
    cadence: 'per month',
    badge: 'Full Service',
    description: 'Your complete outsourced creative and media performance department. High-volume velocity with executive oversight.',
    deliverables: [
      '60+ production-grade creative assets per month',
      'Comprehensive multi-channel deployment (Meta, TikTok, YouTube, Amazon)',
      'Full UGC creator avatar synthesis & multi-language localization',
      'Weekly performance creative sprints & fatigue monitoring',
      'Optional full-funnel media buying management included',
      'Direct 1-on-1 Slack channel with Creative Director',
    ],
    highlights: ['Rapid 72-hour expedited delivery', 'White-glove dedicated team', 'Full raw project file delivery'],
    idealFor: 'Enterprise brands and fast-growing DTC portfolios spending $40k+/month',
    turnaroundTime: 'Continuous weekly delivery cycles',
    revisionPolicy: 'Priority agile turnarounds with real-time feedback',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'AI & Commercial Rights',
    question: 'Do we own full commercial rights to all generated ads and renders?',
    answer:
      'Yes, 100%. Upon delivery and payment, full, exclusive, perpetual commercial rights to all final delivered videos, static imagery, and copy belong entirely to your company. We do not charge licensing fees or backend royalties.',
  },
  {
    id: 'faq-2',
    category: 'Process',
    question: 'How do you prevent the ads from looking like low-quality "AI slop"?',
    answer:
      'This is where our human-led principle shines. While generative models produce the raw visual assets and variations, our experienced senior art directors, animators, and colorists hand-composite the footage, apply commercial typography, edit the pacing, and ensure strict brand guideline compliance. If an asset does not meet elite commercial broadcast standards, it never leaves our studio.',
  },
  {
    id: 'faq-3',
    category: 'Process',
    question: 'What is the typical turnaround time for our first batch of ads?',
    answer:
      'From the moment we complete your brand onboarding questionnaire and receive your product details, your initial creative strategy blueprint is ready in 48 hours. Your first complete batch of launch-ready video ads and stills is delivered within 5 to 7 business days.',
  },
  {
    id: 'faq-4',
    category: 'Pricing',
    question: 'Can we start with a single project before committing to a monthly subscription?',
    answer:
      'Absolutely. While our monthly plans offer the highest cost efficiency and ongoing creative refresh benefits, we offer pilot test sprints starting at $1,800 for 5 bespoke video concepts so you can experience the speed, workflow, and quality firsthand.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'How do you handle physical products if we need AI product photography?',
    answer:
      'In most cases, you simply share your existing 3D CAD files or 5–10 high-resolution smartphone photos of your physical product from different angles with neutral lighting. We then build a digital twin and render it into photorealistic lifestyle sets, luxury studio pedestals, or dynamic macro environments.',
  },
  {
    id: 'faq-6',
    category: 'AI & Commercial Rights',
    question: 'Are the portfolio projects on this website real client work?',
    answer:
      'We believe in absolute transparency: all 6 featured portfolio studies on this site are clearly designated as speculative concept projects created in-house to demonstrate the breadth and technical capability of our AI production pipeline. We never fabricate client reviews, false logos, or unverified ROAS figures.',
  },
];
