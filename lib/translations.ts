import { link } from "fs"

export type Lang = "EN" | "TR"

export const translations = {
  // Navbar
  nav: {
    projects: { EN: "Projects", TR: "Projeler" },
    stack: { EN: "Stack", TR: "Teknoloji" },
    vision: { EN: "Vision", TR: "Vizyon" },
  },

  // Hero
  hero: {
    status: { EN: "Systems Online", TR: "Sistemler Aktif" },
    titleHighlight: {
      EN: "Engineering the Future",
      TR: "Gelecegi Insa Ediyoruz",
    },
    subtitle: {
      EN: "Building advanced software solutions, from OSINT tools to modern web apps.",
      TR: "OSINT araclarindan modern web uygulamalarina kadar gelismis yazilim cozumleri uretiyoruz.",
    },
    cta: { EN: "Explore Projects", TR: "Projeleri Kesfedin" },
    scroll: { EN: "Scroll", TR: "Kaydir" },
  },

  // Projects
  projects: {
    sectionLabel: { EN: "// Our Lab", TR: "// Laboratuvarimiz" },
    sectionTitle: { EN: "Projects", TR: "Projeler" },
    sectionDescription: {
      EN: "A curated set of tools and platforms we are actively building and iterating on.",
      TR: "Aktif olarak gelistirdigimiz ve uzerinde calistigimiz araclar ve platformlar.",
    },
    items: [
      {
        title: "Finora's Tool Bag",
        link: "https://finora-s-tool-bag.vercel.app/",
        description: {
          EN: "A comprehensive collection of developer tools and utilities in an accessible format.",
          TR: "Erisilebilir formatta kapsamli bir gelistirici arac ve yardimci program koleksiyonu.",
        },
        tags: ["Next.js", "Frontend", "Tools"],
      },
      {
        title: "Chef Fora",
        link: "https://chef-fora.vercel.app/",
        description: {
          EN: "An interactive culinary platform exploring modern recipes and cooking methodologies.",
          TR: "Modern tarifleri ve pisirme metodolojilerini kesfeden etkilesimli bir mutfak platformu.",
        },
        tags: ["React", "Web App", "Lifestyle"],
      },
      {
        title: "Finora Global Pulse",
        link: "https://finora-global-pulse.vercel.app/",
        description: {
          EN: "Global data visualization dashboard tracking real-time global trends and metrics.",
          TR: "Gercek zamanli kuresel trendleri ve metrikleri izleyen kuresel veri gorsellestirme panosu.",
        },
        tags: ["Analytics", "Data", "Dashboard"],
      },
      {
        title: "Finorot",
        description: {
          EN: "Advanced Discord moderation bot with intelligent auto-mod, analytics dashboards, and configurable rule engines.",
          TR: "Akilli otomatik moderasyon, analiz panelleri ve yapilandirabilir kural motorlari ile gelismis Discord moderasyon botu.",
        },
        tags: ["Discord.py", "Python", "Bot"],
        link: "https://github.com/Finoraaa/Finorot"
      },
      {
        title: "OSINT Strategy Generator",
        description: {
          EN: "Rule-based CLI tool for orchestrating open-source intelligence investigations with layered methodology.",
          TR: "Katmanli metodoloji ile acik kaynak istihbarat arastirmalarini yoneten kural tabanli CLI araci.",
        },
        tags: ["CLI", "Python", "OSINT"],
        link: "https://github.com/Finoraaa/osint-strategy-generator"
      },
      {
        title: "Price-watcher",
        description: {
          EN: "Real-time price tracking and alerting solution with historical data visualization and multi-source aggregation.",
          TR: "Gecmis veri gorsellestirme ve coklu kaynak toplama ile gercek zamanli fiyat takip ve uyari cozumu.",
        },
        tags: ["TypeScript", "API", "Tracking"],
      },
      {
        title: "DevHub",
        description: {
          EN: "Centralized developer workspace for managing projects, snippets, and documentation in one unified interface.",
          TR: "Projeleri, kod parcalarini ve dokumantasyonu tek bir arayuzde yonetmek icin merkezi gelistirici calisma alani.",
        },
        tags: ["Next.js", "TypeScript", "Web"],
      },
    ],
  },

  // Tech Stack
  techStack: {
    sectionLabel: { EN: "// Tech Stack", TR: "// Teknoloji Yigini" },
    sectionTitle: { EN: "Powered By", TR: "Altyapi" },
  },

  // Vision
  vision: {
    sectionLabel: { EN: "// Vision", TR: "// Vizyon" },
    sectionTitleTop: { EN: "Building the", TR: "Bir Sonraki" },
    sectionTitleHighlight: { EN: "Next Generation", TR: "Nesli Insa Ediyoruz" },
    paragraph1: {
      EN: "Finora is currently a software-focused brand laying the groundwork for the next generation of tech ideas. We operate as an independent tech lab, experimenting with emerging technologies and building practical tools that solve real problems.",
      TR: "Finora, su anda yeni nesil teknoloji fikirlerinin temelini atan yazilim odakli bir markadir. Bagimsiz bir teknoloji laboratuvari olarak faaliyet gosteriyor, yeni teknolojilerle deneyler yapiyor ve gercek sorunlari cozen pratik araclar gelistiriyoruz.",
    },
    paragraph2: {
      EN: "From intelligent automation and open-source intelligence to developer tooling and modern web experiences, our portfolio is a reflection of curiosity, craft, and a relentless drive to ship meaningful software.",
      TR: "Akilli otomasyondan acik kaynak istihbarata, gelistirici araclarindan modern web deneyimlerine kadar portfoyumuz merak, ustaligi ve anlamli yazilimlar gelistirme tutkumuzu yansitir.",
    },
    terminal: {
      mission: { EN: "engineering the future", TR: "gelecegi insa etmek" },
      status: { EN: "building...", TR: "gelistiriliyor..." },
    },
    pillars: [
      {
        title: { EN: "Research-Driven", TR: "Arastirma Odakli" },
        description: {
          EN: "Every project begins with deep research and systematic analysis before a single line of code is written.",
          TR: "Her proje, tek bir satir kod yazilmadan once derin arastirma ve sistematik analiz ile baslar.",
        },
      },
      {
        title: { EN: "Modular Architecture", TR: "Moduler Mimari" },
        description: {
          EN: "Our tools are built as composable building blocks, designed to scale independently and integrate seamlessly.",
          TR: "Araclarimiz, bagimsiz olarak olceklenebilen ve sorunsuz entegre olan bilesik yapi bloklari olarak insa edilmistir.",
        },
      },
      {
        title: { EN: "Future-Ready", TR: "Gelecege Hazir" },
        description: {
          EN: "We build with tomorrow in mind, leveraging AI integration and modern frameworks to stay ahead of the curve.",
          TR: "Yarini dusunurek, yapay zeka entegrasyonu ve modern frameworklerden yararlanarak her zaman bir adim onde olmayi hedefliyoruz.",
        },
      },
    ],
  },

  // Contact
  contact: {
    sectionLabel: { EN: "// Contact", TR: "// Iletisim" },
    sectionTitle: { EN: "Get in Touch", TR: "Bize Ulasin" },
    sectionDescription: {
      EN: "Have a project idea, collaboration proposal, or just want to say hello? Drop us a message.",
      TR: "Bir proje fikriniz, isbirligi teklifiniz mi var ya da sadece merhaba mi demek istiyorsunuz? Bize mesaj gonderin.",
    },
    nameLabel: { EN: "Name", TR: "Ad" },
    namePlaceholder: { EN: "Your Name", TR: "Adiniz" },
    emailLabel: { EN: "Email", TR: "E-posta" },
    emailPlaceholder: { EN: "you@example.com", TR: "siz@ornek.com" },
    subjectLabel: { EN: "Subject", TR: "Konu" },
    subjectPlaceholder: { EN: "What is this about?", TR: "Konu nedir?" },
    messageLabel: { EN: "Message", TR: "Mesaj" },
    messagePlaceholder: {
      EN: "Tell us about your project or idea...",
      TR: "Projeniz veya fikriniz hakkinda bilgi verin...",
    },
    send: { EN: "Send Message", TR: "Mesaj Gonder" },
    sending: { EN: "Sending...", TR: "Gonderiliyor..." },
    success: { EN: "Message Sent!", TR: "Mesaj Gonderildi!" },
    successDescription: {
      EN: "We'll get back to you as soon as possible.",
      TR: "En kisa surede size geri donecegiz.",
    },
    socials: { EN: "Connect With Us", TR: "Bizi Takip Edin" },
    orReach: {
      EN: "Or reach out directly on our social platforms.",
      TR: "Ya da sosyal medya platformlarimizdan dogrudan ulasin.",
    },
  },

  // Footer
  footer: {
    projects: { EN: "Projects", TR: "Projeler" },
    stack: { EN: "Stack", TR: "Teknoloji" },
    vision: { EN: "Vision", TR: "Vizyon" },
    contact: { EN: "Contact", TR: "Iletisim" },
    rights: { EN: "All rights reserved.", TR: "Tum haklari saklidir." },
  },

  // Nav (contact addition)
  navContact: { EN: "Contact", TR: "Iletisim" },
} as const
