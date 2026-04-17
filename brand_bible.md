# DhikrFlow Brand Bible

## Overview
This Brand Bible defines the authentic visual identity for DhikrFlow. The design system is constructed around a true pitch-black aesthetic, prioritizing completely immersive flow-states, particularly suitable for OLED displays and reducing battery consumption.

## Typography
The overall typographic execution feels meditative, timeless, and rooted in classical script forms.

- **English Body & Transliteration**: `Crimson Pro`, falling back to `Georgia` or `serif`. Used because of its highly legible, elegant proportions and classical feel.
- **Arabic Text**: `Scheherazade New`, falling back to `serif`. Extensively tailored to render pure Arabic glyphs with clarity, grace, and ample vertical spacing.

## Color Palette

### Base Structure (OLED Noir)
The environment favors true blacks and deeply subdued surfaces, drawing maximum focus only to the Dhikr being recited.

- **Background (True Void)**: `#000000` — Ensures absolute contrast and OLED optimization.
- **Surface Level 1**: `#0a0a0a` — Used for active cards and interactive backgrounds.
- **Surface Level 2**: `#111111` — Used for secondary elements, borders, and input fields.
- **Surface Level 3**: `#1a1a1a` — Used sparingly for overlays, toggles, and raised modal menus.
- **Borders**: `#1f1f1f` — Minimal distinction to separate sections without distracting the eye.

### Typography Colors
- **Primary Text**: `#e8e8e4` — A soft, off-white bone color. Much easier on the eyes in a pitch-black environment than stark `#ffffff`.
- **Muted Text**: `#5a5a54` — Used for translations, subheadings, and UI states.
- **Dim Text**: `#3a3a36` — Barely visible elements, hints, and placeholder text.

### Thematic Accents
DhikrFlow allows personalization while retaining its dark aesthetic. Each accent brings life to the circular progress ring and interaction ripples.

- **Emerald (Default)**: `#10b981` — Classic Islamic green; soothing and universally recognized.
- **Gold**: `#f59e0b` — Warm, reflective, and premium.
- **Sapphire**: `#3b82f6` — Cool and calming.
- **Rose**: `#f43f5e` — Expressive and vibrant.
- **Violet**: `#8b5cf6` — Deep, contemplative energy.
- **Teal**: `#14b8a6` — A modern alternative to Emerald.

*(Accents are paired with a 25% opacity `rgba()` exact equivalent for "glow" effects—e.g., surrounding the ring or lighting the background of the ripple effect).*

## Visual Assets & UI Delivery
1. **Uninterrupted Interfaces**: Bottom navigation remains clean with only essential icons. Settings are tucked away discreetly at the top right, freeing the entire center and lower screen for the gesture interaction area.
2. **Invisible Geometry**: Cards do not use hard drop shadows. They rely heavily on sub-10% lightness differences and 1px borders.
3. **PWA Standalone Integrity**: The application must be delivered without native browser UI (`standalone`).
