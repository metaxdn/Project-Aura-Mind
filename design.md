# Mental Health Tracker Design System & Guidelines

## Visual System Tokens

### Colors
- **Ink Primary (`--ink`)**: `#182420` (Dark slate-green body text)
- **Ink Soft (`--ink-soft`)**: `#4A5850` (Secondary labels and descriptions)
- **Paper Background (`--paper`)**: `#EEF2EE` (Calming light background)
- **Paper Deep (`--paper-deep`)**: `#E2E8E1` (Slightly deeper background accent)
- **Surface (`--surface`)**: `#FFFFFF` (Card and panel background)
- **Line Border (`--line`)**: `#D6DED5` (Subtle borders and dividers)

- **Pine Primary (`--pine`)**: `#21594A` (Primary interactive color, deep forest green)
- **Pine Deep (`--pine-deep`)**: `#163D33` (Dark forest green hover/header shade)
- **Pine Tint (`--pine-tint`)**: `#E4EFE9` (Soft green background tint)

- **Accent Amber (`--amber`)**: `#E3B341` (Warm highlight accent)
- **Accent Coral (`--coral`)**: `#D9534F` (Alerts and high stress indicator)
- **Accent Sage (`--sage`)**: `#4C9A78` (Balanced wellness indicator)

### Typography
- **Display Font**: `'Fraunces', Georgia, serif` (Elegant, soothing headings)
- **Body Font**: `'Inter', -apple-system, sans-serif` (Clean, highly legible UI text)
- **Mono Font**: `'JetBrains Mono', monospace` (Badges, stats, numerical values)

### Radii & Spacing
- **Radius Small (`--radius-sm`)**: `8px` (Inputs, small buttons, tags)
- **Radius Medium (`--radius-md`)**: `14px` (Nav items, sub-cards)
- **Radius Large (`--radius-lg`)**: `22px` (Main card containers and panels)

### Elevations & Shadows
- **Card Shadow (`--shadow-card`)**: `0 1px 2px rgba(24,36,32,0.04), 0 12px 28px -8px rgba(24,36,32,0.10)`
- **Lift Shadow (`--shadow-lift`)**: `0 2px 4px rgba(24,36,32,0.06), 0 20px 40px -12px rgba(22,61,51,0.20)`

---

## Component Layout & Motion Standards

1. **Flat Elevation Styling**: Clean flat cards with 1px border (`#D6DED5`) and soft ambient shadows.
2. **Rounded Card Containers**: 22px rounded corners on all major cards.
3. **Calming Motion System**:
   - Page transitions: `initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}` with ease `[0.22, 1, 0.36, 1]`.
   - Grid Staggering: `staggerChildren: 0.08` for cascading card entrance.
   - Interactive Elements: `whileHover={{ scale: 1.02, translateY: -2 }}` and `whileTap={{ scale: 0.98 }}`.
