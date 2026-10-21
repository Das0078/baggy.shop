# baGGy — Modern Minimalist eCommerce POC

A high-performance frontend eCommerce proof-of-concept built with **React 19**, **TypeScript**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, and **Framer Motion**, inspired by modern streetwear brand aesthetics.

---

## 🎨 Theme Architecture (CSS Variables)

All core colors are decoupled into CSS variables (`src/index.css`) and exposed through Tailwind CSS (`tailwind.config.js`). This enables instant theme switching (e.g., dark theme, seasonal palettes) without altering components.

- **Primary Brand Color**: `#432818` (Dark Coffee, replacing pure black)
- **Background Light**: `#F2F0F1` (Warm off-white for Hero & Dress Style containers)
- **Card Background**: `#F0EEED` (Product cards background)
- **Text Main**: `#432818`
- **Text Muted**: `#6D5B51`
- **Star Accent**: `#FFC633`
- **Discount Accent**: `#FFEBEB` / `#FF3333`
- **Verified Badge**: `#01AB31`

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**:
  - [GSAP](https://gsap.com/) with **ScrollTrigger** for timelines and scroll-driven effects
  - [Framer Motion](https://www.framer.com/motion/) for smooth micro-interactions, layout transitions, and floating stars
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/fi`, `react-icons/fa`, `react-icons/si`)

---

## 📂 Project Structure

```
baggy/
├── public/
│   └── images/
│       ├── hero/
│       │   └── hero-models.png        # Extracted high-res hero models
│       ├── products/                  # 8 exact product images
│       │   ├── tshirt-tape.png
│       │   ├── skinny-jeans.png
│       │   ├── checkered-shirt.png
│       │   ├── sleeve-striped.png
│       │   ├── vertical-striped.png
│       │   ├── courage-tshirt.png
│       │   ├── bermuda-shorts.png
│       │   └── faded-skinny-jeans.png
│       └── dress-style/               # 4 curated style categories
│           ├── casual.png
│           ├── formal.png
│           ├── party.png
│           └── gym.png
├── src/
│   ├── components/
│   │   ├── common/                    # Reusable atom components
│   │   │   ├── Button.tsx             # Interactive Framer Motion button
│   │   │   ├── SectionHeader.tsx      # Bold uppercase display headings
│   │   │   ├── SparkleStar.tsx        # Animated floating 4-pointed stars
│   │   │   └── StarRating.tsx         # Half-star rating system with score
│   │   ├── layout/                    # Layout wrappers
│   │   │   ├── TopBanner.tsx          # Dismissible announcement bar
│   │   │   ├── Navbar.tsx             # Responsive nav with search & drawer
│   │   │   ├── NewsletterCard.tsx     # Floating banner with form validation
│   │   │   └── Footer.tsx             # Comprehensive footer with payment badges
│   │   ├── sections/                  # Homepage page sections
│   │   │   ├── HeroSection.tsx        # GSAP intro & parallax scroll effect
│   │   │   ├── BrandMarquee.tsx       # Dark coffee strip with luxury brands
│   │   │   ├── ProductGridSection.tsx # Reusable grid for New Arrivals & Top Selling
│   │   │   ├── DressStyleSection.tsx  # Asymmetric 4-card category grid
│   │   │   └── TestimonialsSection.tsx# Horizontal customer review carousel
│   │   └── ui/
│   │       └── ProductCard.tsx        # Individual product card with badges
│   ├── data/
│   │   ├── products.ts                # Products dataset with ratings & prices
│   │   ├── dressStyles.ts             # Dress style categories
│   │   └── testimonials.ts            # Verified customer testimonials
│   ├── types/
│   │   └── index.ts                   # Strict TypeScript contracts
│   ├── App.tsx                        # Master layout assembler
│   ├── index.css                      # CSS custom properties & base styles
│   └── main.tsx                       # React 19 root
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🏃 Running the Project

1. **Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

2. **Production Build**:
   ```bash
   npm run build
   ```
