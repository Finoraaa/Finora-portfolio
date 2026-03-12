# 🌌 Finora | Engineering the Future

Finora is a premium, high-performance portfolio website built for a software-focused brand and independent tech lab. It combines high-end aesthetics with modern web technologies to showcase advanced software solutions and emerging tech experiments.

![Finora Preview](https://github.com/Finoraaa/proje3/raw/main/public/preview.png)

## 🚀 Key Features

- **💎 Premium Design:** Modern dark mode aesthetic with glassmorphism, neon accents (purple/green), and smooth micro-animations.
- **⚡ Next.js 15 & Turbopack:** Built with the latest Next.js features for blazing-fast performance and seamless development.
- **🛠️ Tech Stack Showcase:** Dedicated sections for projects, technology stack, and brand vision.
- **📨 Integrated Contact System:** A functional contact form powered by **Neon Database (Postgres)** and **Drizzle ORM**.
- **🌍 Multi-language Support:** Dynamic Turkish and English translations managed via a centralized system.
- **📱 Responsive & Alive:** Fully responsive layout with interactive terminal-style components and hover effects.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [Neon (Serverless Postgres)](https://neon.tech/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Animations:** Custom CSS animations & Framer Motion (yakında)

## 📁 Project Structure

```bash
├── app/                  # Next.js App Router (Actions, Layouts, Pages)
├── components/          # Reusable UI Components (Hero, Projects, Contact, etc.)
├── lib/                 # Core logic (DB Connection, Schema, Translations)
├── public/              # Static assets (Images, Icons)
├── styles/              # Global CSS and Tailwind configurations
└── drizzle/             # Database migrations
```

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Finoraaa/proje3.git
cd proje3
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="your_neon_postgres_connection_string"
```

### 4. Push Database Schema
```bash
npx drizzle-kit push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🖋️ Customization

- **Social Links:** Update your social handles in `components/contact-section.tsx` and `components/footer.tsx`.
- **Content:** Modify the text in `lib/translations.ts` to update descriptions or add new languages.
- **Branding:** Adjust neon colors and theme in `tailwind.config.mjs` or `styles/globals.css`.

## 📄 License

This project is licensed under the MIT License.

---

Built with 💜 by [Finora](https://github.com/Finoraaa)
