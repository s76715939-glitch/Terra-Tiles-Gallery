# TERRA Tiles Gallery Studio

Discover and curate your perfect room surface aesthetic. A luxury online tile showroom and designer specification catalog designed for elite architects and interior planners.

## 🔗 Live Application

- **Live Link**: `https://terra-tiles-gallery.netlify.app/`

---

## 💎 Project Purpose & Concept

TERRA is a custom-coded responsive showroom gallery presenting handcrafted tiles, luxury Italian Carrara marbles, sun-dried Spanish clay terracota hexes, and Venetian emerald composites. It serves modern interior designers looking to browse, inspect granular chemical/physical compositions, examine raw measurements and creator backgrounds, and maintain synchronized curator credentials securely via dynamic databases.

The design breaks away from generic template layouts, embracing a custom **"Warm Sand & Obsidian Black Wood"** visual palette with gorgeous high-contrast negative space, modern structural lines, and elegant typographic hierarchies using Space Grotesk, Plus Jakarta Sans, and Playfair Display serif.

---

## 🌟 Key Features & Requirements Met

1. **Layout & Multi-Route Architecture**:
   - High-end sticky Navbar with dynamic glass frosted blur effect, responsive screen sizes, brand layout, and interactive Member authentication indicators.
   - Comprehensive multi-route mapping (Public vs. private checks).
2. **"Discover Aesthetic" Home Lobby**:
   - Premium background image cross-fade slideshow powered natively by **SwiperJS**.
   - Continuous marquee-notice scrolling bar showing new dynamic tile releases.
   - Showcase grids carrying top 4 items fetched live via Next API, backed by full visual loading spinners.
3. **Curator Registration & Social Google credentials**:
   - Advanced registration schema collecting Name, Email, Avatar Photo, and Password.
   - Encrypted Login panels feeding authentication credentials to session cookies.
   - Singe-click social authentication linked directly to verified Google Auth callbacks.
4. **Interactive All-Tiles Gallery**:
   - Real-time responsive search index query text filtration by Title.
   - Interactive premium Category tabs array (Ceramic, Marble, Terracotta, Terrazzo, Slate).
   - High-density visual cards holding details button.
5. **Single Tile Visual Core Space**:
   - Large high-resolution product preview with material-base labels, designer creator portfolio name, price specs, dimensions, stock counts (In Stock / Out of Stock alerts), and responsive tags.
6. **🔒 Member Security (Private Routes & Fallbacks)**:
   - Interactive redirect-wall modals triggered when unauthenticated visitors try to breach `/tile/[id]` or `/my-profile`.
7. **Curator Dashboard Profile (Challenge #1 & #2)**:
   - Member stats details carrying generated account dates, user photo avatars, and encrypted badge tickers.
   - Full client-side `updateUser` route allowing direct name/avatar URL alteration with live database synchronizations.
8. **Artistic 404 Room Handling**:
   - Custom not-found layout featuring revolving compass micro-animations guiding lost visitors back to the lobby.

---

## 📦 Installed NPM Packages

| Package                  | Version     | Purpose                                   |
| :----------------------- | :---------- | :---------------------------------------- |
| **next**                 | `^16.2.9`   | Core React App Router Framework           |
| **better-auth**          | `^1.6.20`   | Secure Credentials & OAuth Handlers       |
| **mongodb**              | `^7.3.0`    | Atlas Database driver                     |
| **swiper**               | `^12.2.0`   | Touch-triggered premium slider slideshows |
| **lucide-react**         | `^0.546.0`  | Modular visual vector stroke icons        |
| **motion**               | `^12.23.24` | Animation layer (micro-interactions)      |
| **@tailwindcss/postcss** | `^4.3.1`    | Tailwind CSS v4 processor                 |

---
