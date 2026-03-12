import { db } from "./index"
import { projects } from "./schema"
import { eq } from "drizzle-orm"

const seedData = [
  {
    slug: "finoras-tool-bag",
    title: "Finora's Tool Bag",
    link: "https://finora-s-tool-bag.vercel.app/",
    sortOrder: 1,
    descriptionTr: "Erisilebilir formatta kapsamli bir gelistirici arac ve yardimci program koleksiyonu.",
    descriptionEn: "A comprehensive collection of developer tools and utilities in an accessible format.",
    challengeTr: "Geliştiriciler olarak genellikle birçok farklı araca aynı anda ihtiyaç duyarız ama hepsini ayrı ayrı bulmak ve kurmak zaman kaybıdır. İhtiyacımız olan her şeye hızlıca ulaşabileceğimiz bütünleşik bir çözüm gerekiyordu.",
    challengeEn: "As developers, we often need many different tools at the same time, but finding and installing them separately is a waste of time. An integrated solution was needed where we could quickly access everything we need.",
    solutionTr: "Modern web teknolojileri (Next.js) kullanarak, bir geliştiricinin ihtiyaç duyabileceği her şeyi barındıran hızlı ve esnek bir 'araç çantası' geliştirdim.",
    solutionEn: "Using modern web technologies (Next.js), I developed a fast and flexible 'toolbox' containing everything a developer could need.",
    featuresTr: ["Kapsamlı araç seti", "Hızlı erişim", "Tek arayüz"],
    featuresEn: ["Comprehensive toolset", "Fast access", "Single interface"],
    tags: ["Next.js", "Frontend", "Tools"],
  },
  {
    slug: "chef-fora",
    title: "Chef Fora",
    link: "https://chef-fora.vercel.app/",
    sortOrder: 2,
    descriptionTr: "Modern tarifleri ve pisirme metodolojilerini kesfeden etkilesimli bir mutfak platformu.",
    descriptionEn: "An interactive culinary platform exploring modern recipes and cooking methodologies.",
    challengeTr: "İnternetteki mevcut tarif sitelerinin çoğu reklam dolu, karmaşık arayüzlere sahip ve eski. Sade, sadece yemeğe odaklanan dijital bir platforma ihtiyaç vardı.",
    challengeEn: "Most existing recipe sites on the internet are full of ads, have complex interfaces, and are outdated. There was a need for a simple digital platform focused solely on food.",
    solutionTr: "React üzerine kurulu, çok temiz bir kullanıcı arayüzü olan, görsel ağırlıklı ve kolay okunabilen yeni nesil bir yemek odaklı web uygulaması tasarladık.",
    solutionEn: "We designed a new generation food-focused web application built on React, with a very clean user interface, visually heavy and easy to read.",
    featuresTr: ["Etkileşimli tarifler", "Görsel arayüz", "Kolay okunabilirlik"],
    featuresEn: ["Interactive recipes", "Visual interface", "Easy readability"],
    tags: ["React", "Web App", "Lifestyle"],
  },
  {
    slug: "finora-global-pulse",
    title: "Finora Global Pulse",
    link: "https://finora-global-pulse.vercel.app/",
    sortOrder: 3,
    descriptionTr: "Yapay zeka destekli video analiz ve etkileşimli sesli asistan platformu.",
    descriptionEn: "AI-powered video analysis and interactive voice assistant platform.",
    challengeTr: "Ham video verilerini anlamlandırmak ve kullanıcıların video içeriğiyle doğal bir dilde iletişim kurmasını sağlamak teknik olarak karmaşık bir süreçtir.",
    challengeEn: "Making sense of raw video data and enabling users to communicate with video content in a natural language is a technically complex process.",
    solutionTr: "Multimodal yapay zeka modelleri kullanarak, yüklenen videoları analiz eden, özetleyen ve kullanıcının sesli veya yazılı sorularını gerçek zamanlı yanıtlayan bir sistem geliştirdik.",
    solutionEn: "Using multimodal AI models, we developed a system that analyzes and summarizes uploaded videos and answers the user's voice or written questions in real-time.",
    featuresTr: ["Yapay zeka video analizi", "Sesli ve yazılı etkileşim", "Anlık özetleme", "Gelişmiş analist asistanı"],
    featuresEn: ["AI video analysis", "Voice and text interaction", "Instant summarization", "Advanced analyst assistant"],
    tags: ["AI", "Video Analysis", "Voice", "Multimodal"],
  },
  {
    slug: "finorot",
    title: "Finorot",
    link: "https://github.com/Finoraaa/Finorot",
    sortOrder: 4,
    descriptionTr: "Akilli otomatik moderasyon, analiz panelleri ve yapilandirabilir kural motorlari ile gelismis Discord moderasyon botu.",
    descriptionEn: "Advanced Discord moderation bot with intelligent auto-mod, analytics dashboards, and configurable rule engines.",
    challengeTr: "Büyük Discord sunucularını insan gücü ile yönetmek oldukça yorucu olabiliyor. Küfür, spam ve raid'lere karşı 7/24 aktif tam zamanlı bir moderatöre ihtiyaç vardı.",
    challengeEn: "Managing large Discord servers with human power can be quite exhausting. There was a need for a 24/7 active full-time moderator against swearing, spam and raids.",
    solutionTr: "Python ve discord.py kütüphanesi kullanarak, kullanıcı hareketlerini izleyen ve belirlenen kurallara göre yaptırımlar (mute, ban) uygulayan kurallı bir bot yazdık.",
    solutionEn: "Using Python and the discord.py library, we wrote a rule-based bot that monitors user behavior and applies sanctions (mute, ban) according to set rules.",
    featuresTr: ["Otomatik moderasyon", "Yapılandırılabilir kurallar", "Log inceleme"],
    featuresEn: ["Auto moderation", "Configurable rules", "Log review"],
    tags: ["Discord.py", "Python", "Bot"],
  },
  {
    slug: "osint-strategy-generator",
    title: "OSINT Strategy Generator",
    link: "https://github.com/Finoraaa/osint-strategy-generator",
    sortOrder: 5,
    descriptionTr: "Katmanli metodoloji ile acik kaynak istihbarat arastirmalarini yoneten kural tabanli CLI araci.",
    descriptionEn: "Rule-based CLI tool for orchestrating open-source intelligence investigations with layered methodology.",
    challengeTr: "OSINT (Açık Kaynak İstihbaratı) işlemleri oldukça karmaşıktır ve düzensiz yapılamaz. Çeşitli araçların birbirini senkronize şekilde takip etmesi gereken bir metodoloji eksikliği vardı.",
    challengeEn: "OSINT (Open Source Intelligence) operations are quite complex and cannot be done irregularly. There was a lack of methodology where various tools need to follow each other synchronously.",
    solutionTr: "Arkasında katmanlı bir istihbarat metodolojisi bulunan sistemli bir komut satırı aracı (CLI) geliştirdim.",
    solutionEn: "I developed a systematic command line tool (CLI) backed by a layered intelligence methodology.",
    featuresTr: ["Otomasyon", "CLI arayüzü", "Kural motoru"],
    featuresEn: ["Automation", "CLI Interface", "Rule engine"],
    tags: ["CLI", "Python", "OSINT"],
  },
  {
    slug: "price-watcher",
    title: "Price-watcher",
    link: "",
    sortOrder: 6,
    descriptionTr: "Gecmis veri gorsellestirme ve coklu kaynak toplama ile gercek zamanli fiyat takip ve uyari cozumu.",
    descriptionEn: "Real-time price tracking and alerting solution with historical data visualization and multi-source aggregation.",
    challengeTr: "Hızlı değişen piyasalarda belli ürünlerin fiyatlarını farklı pazaryerlerinde sürekli kontrol etmek çok fazla zaman alıyor.",
    challengeEn: "Constantly checking the prices of certain products in different marketplaces in fast-changing markets takes too much time.",
    solutionTr: "Belirlenen e-ticaret sitelerinden anlık veri kazıyan (scraping) ve hedeflenen fiyat aralığına gelindiğinde API aracılığıyla kullanıcısına bildirim yollayan izleme mekanizması kurgulandı.",
    solutionEn: "A monitoring mechanism was set up that instantaneously scrapes data from designated e-commerce sites and sends a notification to the user via API when the targeted price range is reached.",
    featuresTr: ["Anlık takip", "Çoklu kaynak", "Görselleştirme"],
    featuresEn: ["Instant tracking", "Multi source", "Visualization"],
    tags: ["TypeScript", "API", "Tracking"],
  },
  {
    slug: "devhub",
    title: "DevHub",
    link: "",
    sortOrder: 7,
    descriptionTr: "Projeleri, kod parcalarini ve dokumantasyonu tek bir arayuzde yonetmek icin merkezi gelistirici calisma alani.",
    descriptionEn: "Centralized developer workspace for managing projects, snippets, and documentation in one unified interface.",
    challengeTr: "Geliştirdiğimiz projelerin notları, teknik dokümanları ve snippet'ları bilgisayarın farklı yerlerinde veya farklı uygulamalara dağılmıştı. Bunları bulmak zaman kaybettiriyordu.",
    challengeEn: "The notes, technical documents, and snippets of the projects we developed were scattered across different parts of the computer or different apps. Finding them was a waste of time.",
    solutionTr: "Tüm geliştirme bilgilerinin, kod örneklerinin ve proje verilerinin tek ve merkezi bir panelden yönetilmesine olanak sağlayan modern bir yönetim uygulaması oluşturuldu.",
    solutionEn: "A modern management application was created that allows all development information, code examples and project data to be managed from a single centralized dashboard.",
    featuresTr: ["Merkezi çalışma alanı", "Kod snippet yönetimi", "Dokümantasyon"],
    featuresEn: ["Central workspace", "Snippet management", "Documentation"],
    tags: ["Next.js", "TypeScript", "Web"],
  }
]

async function run() {
  console.log("Seeding started...")
  for (const proj of seedData) {
    // try to find first
    const existing = await db.query.projects.findFirst({
      where: (p, { eq }) => eq(p.slug, proj.slug)
    })
    if (!existing) {
      await db.insert(projects).values(proj)
      console.log(`Added ${proj.slug}`)
    } else {
      const { slug, ...updateData } = proj
      await db.update(projects).set(updateData).where(eq(projects.slug, slug))
      console.log(`Updated ${slug}`)
    }
  }
  console.log("Seeding complete.")
  process.exit(0)
}

run().catch(console.error)
