import { Code, Layers, Bot, Eye, Wrench } from 'lucide-react'; // Added Wrench icon for Cryoner Solutions

export const generalToolsData = [
  
  {
    id: "palhitter-lite",
    title: "Palhitter Lite",
    category: "General Tools",
    tag: "palchecker",
    description: "Fastest proxyless paypal checker",
    fullDescription: "Check paypal accounts with little to no proxy usage, fast and reliable",
    features: [
      "Rustbased paypal checker",
      "Access to bi-daily updates",
      "Most private apis",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "$129.99 /Weekly",
    image: "/pal1.png",
    image2: "/pal2.png",
    image3: "/pal3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 129.99
  },
  {
    id: "palhitter-lifetime",
    title: "Palhitter Pro",
    category: "General Tools",
    tag: "palchecker",
    description: "Fastest proxyless paypal checker",
    fullDescription: "Check paypal accounts with little to no proxy usage, fast and reliable",
    features: [
      "Access to exploited auto hitter",
      "Rustbased paypal checker",
      "Access to bi-daily updates",
      "Most private apis",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "$329.99 /Lifetime",
    image: "/pal1.png",
    image2: "/pal2.png",
    image3: "/pal3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 329.99
  },
  {
    id: "Hotmailchecker",
    title: "Hotmail Checker ",
    category: "General Tools",
    tag: "Lifetime",
    description: "Proxyless hotmail inbox searcher",
    fullDescription: "Checkaccounts with little to no proxy usage, fast and reliable",
    features: [
      "Almost no proxy bandwidth usage",
      "Rustbased checker",
      "Access to bi-daily updates",
      "Most private apis",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "$89.99 /Lifetime",
    image: "/hot.png",
    image2: "/hot2.png",
    image3: "/hot3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 89.99
  },
  {
    id: "smtpscanner",
    title: "SMTP INbox Searcher",
    category: "General Tools",
    tag: "Lifetime",
    description: "Fastest smtp checker on the market",
    fullDescription: "Up to 20k CPM and little to 5% CPU usage!",
    features: [

      "Access to bi-daily updates",
      "Most private apis",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "$89.99 /Lifetime",
    image: "/smtp.png",
    image2: "/smtp2.png",
    image3: "/smtp3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 89.99
  }
  // Removed the duplicate "Pillowware Product Suite" as "Palhitter's Suite" covers the same features from the TOS.
];


export const specializedServicesData = [
   {
    id: "lfirfi", // Unique ID for Palhitter's suite
    title: "LFI-RFI EXPLOIT",
    category: "Specialized Services",
    tag: "EX", // More descriptive tag
    description: "Even newer exploits for LFIRFI, which arent being public.",
    fullDescription: "Experienced members only, do not ask too many questions",
    features: [

    ],
    price: "Contact for Price",
    image: "/lfi.png", // Reusing existing image
    image2: "/lfi.png", // Reusing existing image
    image3: "/lfi.png", // Reusing existing image
    gradient: "from-blue-400 to-indigo-500",
    currency: "USD", // Assuming USD for contact price, or simply omit currency for "Contact for Price"
    numericPrice: 0, // Using 0 for contact-for-price items
    contactInfo: {
      discord: "https://discord.gg/q3XUbRth77",
      telegram: "https://t.me/pillowware"
    }},
    {
    id: "jscvs", // Unique ID for Palhitter's suite
    title: "Bulk JS Exploit",
    category: "Specialized Services",
    tag: "JSET", // More descriptive tag
    description: "Bulk recent JS exploit, which can infect a large amount of devices.",
    fullDescription: "Experienced members only, do not ask too many questions",
    features: [

    ],
    price: "Contact for Price",
    image: "/lfi.png", // Reusing existing image
    image2: "/lfi.png", // Reusing existing image
    image3: "/lfi.png", // Reusing existing image
    gradient: "from-blue-400 to-indigo-500",
    currency: "USD", // Assuming USD for contact price, or simply omit currency for "Contact for Price"
    numericPrice: 0, // Using 0 for contact-for-price items
    contactInfo: {
      discord: "https://discord.gg/q3XUbRth77",
      telegram: "https://t.me/pillowware"
    }},
    {
    id: "wp-cpanel-dumping-tutor1",
    title: "WP/cPanel Dumping Tutor",
    category: "Specialized Services",
    tag: "Mentorship",
    description: "A complete solution and mentorship for startup sellers, stockers, and dumpers.",
    fullDescription: "AIO (All-in-one) tutor designed for future stockers/suppliers or independent crackers. Taking this tutor will guarantee you the ability to make the highest quality combolist on the market, as well as other skills. After the tutor, you can either work with me or separately, I will still help you with leads to customers etc.",
    features: [
      "12 private VC sessions (Discord/Tele)",
      "The Newest 0day to exploit databases(WP/Cpanel)",
      "Training with Paid tools, proxies and everything you need",
      "License to starter tools necessary for basics",
      "Complete guide to Wp/cpanel Cracking",
      "1 Paid Tool requested by user (any paid checker)",
      "Dedicated 16/128GBs RAM/GPU VPS",
      "Rotating proxies & Private ebook",

      "Configs for Openbullet",
      
      "7 private Detailed demonstration videos",
      "Introduction to a private marketplace"
    ],
    price: "$249.99 /Onetime", // Price not listed on banner
    image: "/tutor.png", // Reusing existing image
    image2: "/tutor1.png", // Reusing existing image
    image3: "/tutor2.jpg", // Reusing existing image

    gradient: "from-orange-500 to-amber-500",
    currency: "USD",
    numericPrice: 274.99
    
  },
  {
    id: "wp-cpanel-dumping-tutor",
    title: "WP/cPanel Carding Tutor",
    category: "Specialized Services",
    tag: "Mentorship",
    description: "A complete solution and mentorship for startup sellers, stockers, and dumpers.",
    fullDescription: "Same as wp/cpanel combolist making tutor, but this guide will dive deep into exploiting specifically Credit cards. After which can be carded or used on online ecommerce sites.",
    features: [
      "12 private VC sessions (Discord/Tele)",
      "The Newest 0day to exploit databases(WP/Cpanel)",
      "Training with Paid tools, proxies and everything you need",
      "License to starter tools necessary for basics",
      "Complete guide to Wp/cpanel Cracking",
      "1 Paid Tool requested by user (any paid checker)",
      "Dedicated 16/128GBs RAM/GPU VPS",
      "Rotating proxies & Private ebook",

      "Configs for Openbullet",
      
      "7 private Detailed demonstration videos",
      "Introduction to a private marketplace"
    ],
    price: "$299.99 /Onetime", // Price not listed on banner
    image: "/tutor.png", // Reusing existing image
    image2: "/tutor1.png", // Reusing existing image
    image3: "/tutor2.jpg", // Reusing existing image
    gradient: "from-orange-500 to-amber-500",
    currency: "USD",
    numericPrice: 299.99
    
  },
  
];

export const solanaTradingBotsData = [
  {
    id: "ghostpump-n1",
    title: "GHOSTPUMP",
    category: "Solana Trading Bots",
    tag: "Beginner Friendly",
    description: "Rust-based Nonjito Bundler. Features Antisnipe/MEV and super fast execution under 1ms. Best bundler on the market",
    fullDescription: "GHOSTPUMP is a high-speed, beginner-friendly Solana trading bot built on Rust for maximum stability and performance. It functions as a Nonjito bundler and includes built-in Antisnipe/MEV capabilities to protect your trades from front-running and maximize profitability. With an execution speed of less than 1 millisecond, it's designed for those who need a simple yet powerful entry into high-frequency trading on the Solana blockchain. Made with <3 by @tunathegoat.",
    features: [
      "Rust Based - Nonjito Bundler",
      "Antisnipe/MEV",
      "Beginner Friendly",
      "Super Fast Execution < 1MS"
    ],
    price: "4 Solana",
    image: "/ghostpump.png", // Reusing existing image
    image2: "/ghostpump2.png",
    image3: "/ghostpump3.png",
    
    gradient: "from-purple-500 to-pink-500",
    currency: "SOL",
    numericPrice: 4
  },
  {
    id: "ghostpump-pro",
    title: "GHOSTPUMP PRO",
    category: "Solana Trading Bots",
    tag: "Advanced Sniper",
    description: "All standard features plus Moonshot/Raydium support, a volume/comment bot, and counter coin snipers.",
    fullDescription: "GHOSTPUMP PRO is the ultimate package for the serious trader. It includes all the features of the standard GHOSTPUMP and adds powerful professional tools: direct support for Moonshot and Raydium exchanges, a Lightspeed volume and comment bot to influence social sentiment and detect trends, a detailed one-on-one guide for mastery, and advanced counter coin snipers to outmaneuver the competition. Made with <3 by @tunathegoat.",
    features: [
      "All Standard Pack Features",
      "Moonshot/Raydium Support",
      "Lightspeed Volume, Comment Bot",
      "Detailed One on One Guide",
      "Counter Coin Snipers"
    ],
    price: "7 Solana",
    image: "/ghostpump.png", // Reusing existing image
    image2: "/ghostpump2.png",
    image3: "/ghostpump3.png",
    gradient: "from-fuchsia-500 to-purple-600",
    currency: "SOL",
    numericPrice: 7
  },
  {
    id: "ghostmev-singlethreaded",
    title: "Ghostmev Singlethreaded",
    category: "Solana Trading Bots",
    tag: "MEV Bot",
    description: "Lighting speed, fastest MEV on the market. Target higherup whales with little to 0 risks. 12k Txns with under 0.1 sol fees.",
    fullDescription: "Ghostmev Singlethreaded is the fastest single-threaded MEV bot on the market, designed for lightning speed and precision. It allows you to target high-value whale transactions with minimal risk. Highly efficient, it can process 12,000 transactions for under 0.1 SOL in fees. Includes discrete Telegram access to customer's groups, and built-in protection against rugs and bundled coins, with a snipe speed under 130ms. All profits generated by this bot are subjected to a 30/70 split.",
    features: [
      "Lighting, speed. Fastest MEV on the market",
      "Target higherup whales with little to 0 risks",
      "12k Txns with under 0.1 sol fees",
      "Discrete Telegram access to customer's groups",
      "Anti rug, Anti bundled coins",
      "<130ms snipe speed"
    ],
    price: "4 SOL",
    image: "/1.png", // Reusing existing image
    image2: "/4.png",
    image3: "/5.png",
    gradient: "from-teal-400 to-cyan-500",
    currency: "SOL",
    numericPrice: 4
  },
  {
    id: "ghostmev-multithreaded",
    title: "Ghostmev Multithreaded",
    category: "Solana Trading Bots",
    tag: "Advanced MEV",
    description: "Multithreaded with up to 40 subwallets. AI volume filtering and a sub-200ms snipe speed. Snipes on Raydium, moonshot, pumpfun, and more.",
    fullDescription: "Ghostmev Multithreaded is for serious traders looking to scale their operations. It supports multithreaded operations with up to 40 subwallets and includes advanced StatsTracking with AI volume filtering. Achieve an incredible <200ms snipe speed on major exchanges like Raydium, moonshot, pumpfun, and two others. Also includes access to news and Twitter bots. *Note: more than 15 SOL is advised to run multithreaded. All profits generated are subjected to a 10/90 split.",
    features: [
      "Multithreaded Multisubwallets running (Up to 40 subwallets)",
      "StatsTracking with AI volume filtering",
      "<200ms snipe speed",
      "Raydium, moonshot, pumpfun and 2 more exchanges sniping",
      "Access to news and twitter bot"
    ],
    price: "6 SOL",
    image: "/1.png", // Reusing existing image
    image2: "/4.png",
    image3: "/5.png",
    gradient: "from-emerald-400 to-green-600",
    currency: "SOL",
    numericPrice: 6
  },
  {
    id: "ghostmev-multichain",
    title: "Ghostmev Multithreaded Multichained",
    category: "Solana Trading Bots",
    tag: "Cross-Chain MEV",
    description: "The apex predator. Supports SOL, ETH, BNB. Up to 90 subwallets. Unbeatable <2ms sniping speed.",
    fullDescription: "The ultimate MEV solution, Ghostmev Multithreaded Multichained, dominates across multiple blockchains including Solana, BNB, ETH, and more in the future. Run up to 90 subwallets at once with an untouchable <2ms sniping speed that no other bot can compete with. Features super optimized speed-to-fee downPLS, executing 50,000 transactions for only 0.2 SOL. *Note: Will need corresponding chain RPCs and also corresponding chains. No profit split is applied to this tier.",
    features: [
      "Supported chains: SOL, ETH, BNB and more in the future",
      "Up to 90 subwallets multithreaded",
      "<2ms sniping, no bot can compete",
      "Super optimized speed to feel downPLS",
      "50k Txns for only 0.2 SOL"
    ],
    price: "12 SOL",
    image: "/1.png", // Reusing existing image
    image2: "/4.png",
    image3: "/5.png",
    gradient: "from-rose-400 to-red-600",
    currency: "SOL",
    numericPrice: 12
  },
];

export const cryonerSolutionsData = [
  {
    id: "cryoner-starter",
    title: "Cryoner Starter",
    category: "Cryoner Solutions",
    tag: "Classics",
    description: "Google Multithreaded Proxyless Parser, Vulnerability Scanner, Automatic Multithreaded Dumper Module.",
    fullDescription: "Cryoner Starter provides essential tools for web security analysis. It includes a Google Multithreaded Proxyless Parser (Google Dev LIMITED), a robust Vulnerability Scanner (SQL, XSS, LFI, RFI), and an Automatic Multithreadd Dumper Module (Sqli,timebased). Users also gain access to a private Customers Channel. *Licensing purchase comes with a setup guide, not an operating guide. Try out for 3 days and get a full refund if Cryoner isn't living up to your expectations!",
    features: [
      "Google Multithreaded Proxyless Parser (Google Dev)",
      "Vulnerability Scanner (SQL, XSS, LFI, RFI)",
      "Automatic Multithreadd Dumper Module (Sqli,timebased)",
      "Access to private Customers Channel",
      "No access to updates"
    ],
    price: "$44.99 /month",
    image: "/cryoners1.png",
    image2: "/cryoners2.png",
    image3: "/cryoners3.png",
    gradient: "from-blue-600 to-purple-700",
    currency: "USD",
    numericPrice: 44.99
  },
  {
    id: "cryoner-enterprise",
    title: "Cryoner Enterprise",
    category: "Cryoner Solutions",
    tag: "Mid-Tier",
    description: "Enhanced parser, scanner (Wordpress, cpanel), and dumper module. 2-month license.",
    fullDescription: "Cryoner Enterprise builds upon the Starter features with an enhanced Google Multithreaded Proxyless Parser (Google Dev), an extended Vulnerability Scanner (SQL, XSS, LFI, RFI, Wordpress, cpanel), and an Automatic Multithreadd Dumper Module (SQLI, WORDPRESS, CPANEL, LFI, RFI). This package is valid for 2 months and includes access to a private Customers Channel. *Licensing purchase comes with a setup guide, not an operating guide. Try out for 3 days and get a full refund if Cryoner isn't living up to your expectations!",
    features: [
      "Google Multithreaded Proxyless Parser (Google Dev/BOTNET/Google AAPI)",
      "Vulnerability Scanner (SQL, XSS, LFI, RFI, Wordpress, cpanel)",
      "Automatic Multithreadd Dumper Module (SQLI, WORDPRESS, CPANEL, LFI, RFI)",
      "Daily updates"
      
    ],
    price: "$119.99 /  \n2 months",
    image: "/cryonere1.png",
    image2: "/cryonere2.png",
    image3: "/cryonere3.png",
    gradient: "from-pink-600 to-red-800",
    currency: "USD",
    numericPrice: 119.99
  },
  {
    id: "cryoner-pro",
    title: "Cryoner Pro",
    category: "Cryoner Solutions",
    tag: "Lifetime Access",
    description: "Most popular. All Enterprise/Starter Google proxyless features, Dehasher, Antipublic database, custom tools.",
    fullDescription: "⇨10x speed of Cryoner Starter and Cryoner Enterprise combined\n\n⇨Lifetime access to all Cryoner Enterprise and Starter features.\n\n⇨Cryoner Dehasher and Antipublic (380 billion lines Database) included.\n\n                         ⇨Licensing purchase comes with a setup guide, not an operating guide. Get a full refund within 3 days if Cryoner doesnt live up to your expectations",
    features: [
      "All Cryoner Enterprise and Starter Features",
      "Access to private Customers Group Chat",
      "Cryoner Dehasher and Antipublic (380 billion lines Database)",
      "Coded and optimized with Rust, one of the fastest coding language!",
      "Daily updates"
    ],
    price: "$159.99 /lifetime",
    image: "/cryoner1.png",
    image2: "/cryoner2.png",
    image3: "/cryoner3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 159.99
  }
];

export const legacyServicesData = [
  // This section was not in the provided images and remains empty as per implied instruction.
];


export const allServicesFlat = [
  ...generalToolsData,
  ...specializedServicesData,
  ...solanaTradingBotsData,
  ...cryonerSolutionsData, // Added Cryoner Solutions to the flat list
  ...legacyServicesData
];

export const serviceCategories = [
   { id: "cryoner-solutions", title: "Cryoner", data: cryonerSolutionsData, icon: Wrench, summary: "An arsenal of Google Proxyless Parser, scraper, wp/cpanel scanner/dumper and more. Exclusive by pillowware" },
  { id: "general-tools", title: "Data & Checkers", data: generalToolsData, icon: Code, summary: "Professional data products & utility checkers from @pillowware / @hamachithefish." },
  { id: "specialized-services", title: "Services & Mentorship", data: specializedServicesData, icon: Layers, summary: "Dedicated mentorship for new and experienced sellers, dumpers, and stockers." },
  { id: "solana-trading-bots", title: "Trading Bots", data: solanaTradingBotsData, icon: Bot, summary: "Elite MEV & Pump snipers for Solana and other chains. Hardcoded for unbeatable speed, reliability, and profitability." },
  // New category for Cryoner
  { id: "legacy-tools", title: "Other Tools", data: legacyServicesData, icon: Eye, summary: "Additional utilities and legacy products." },
];