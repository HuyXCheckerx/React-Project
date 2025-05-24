
    import React from 'react';
    export const initialProducts = [
      {
        id: 'seo-scraper',
        name: 'SEO Web Scraping Tool',
        tagline: 'Uncover SEO insights effort',
        description: 'Powerful tool for extracting SEO data from websites. Boost your rankings with comprehensive analytics and competitor insights.',
        features: ['Keyword Tracking', 'Competitor Analysis', 'Backlink Monitoring', 'Automated Site Audits', 'SERP Data Extraction'],
        pricingPlans: [
          { name: 'Basic', price: '$49/mo', details: '1,000 scrapes/day, 1 project, Email support' },
          { name: 'Pro', price: '$99/mo', details: '10,000 scrapes/day, 5 projects, Priority email support' },
          { name: 'Enterprise', price: '$249/mo', details: 'Unlimited scrapes, Unlimited projects, Dedicated support, API access' },
        ],
        imagePlaceholder: 'Abstract representation of data streams for SEO analytics',
        category: 'SEO Tools',
        accentColor: 'bg-purple-600',
      },
    ];

    export const moreProducts = [
     {
        id: 'solana-sniper',
        name: 'Solana Sniping Bot',
        tagline: 'Catch Solana gems at launch.',
        description: 'High-speed bot for sniping new token launches on the Solana blockchain. Get in early on promising projects with automated precision.',
        features: ['Ultra-Low Latency Transactions', 'Auto Buy/Sell Limits', 'MEV Protection Strategies', 'Multi-Wallet Management', 'Real-time Token Monitoring'],
        pricingPlans: [
          { name: 'Standard', price: '0.5 SOL', details: '1 month access, Basic features, Community support' },
          { name: 'Premium', price: '1.5 SOL', details: '3 months access, Advanced features, Priority support, Strategy backtesting' },
        ],
        imagePlaceholder: 'Futuristic HUD display for Solana token sniping',
        category: 'Crypto Tools',
        accentColor: 'bg-teal-500',
      },
      {
        id: 'content-ai',
        name: 'AI Content Generator',
        tagline: 'Craft compelling content, faster.',
        description: 'Leverage AI to generate high-quality articles, blog posts, and marketing copy in minutes. Overcome writer\'s block and scale your content production.',
        features: ['Multiple Content Types', 'SEO Optimization Mode', 'Plagiarism Checker', 'Tone & Style Adjustment', 'Multi-language Support'],
        pricingPlans: [
          { name: 'Starter', price: '$29/mo', details: '20,000 words/month, Standard features' },
          { name: 'Growth', price: '$79/mo', details: '100,000 words/month, Advanced features, Team access (3 users)' },
        ],
        imagePlaceholder: 'Neural network visualization for AI content creation',
        category: 'AI Tools',
        accentColor: 'bg-blue-500',
      }
    ];
  