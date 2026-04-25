# Design Brief

## Overview
Futuristic personal research portfolio for Dr. Ashwin Singh Chouhan. Deep space navy foundation with electric cyan and neon fuchsia accents. Scientific precision meets maximalist energy — professional yet daring, inspired by quantum computing interfaces and molecular visualization.

## Tone & Differentiation
Futuristic maximalism with scientific rigor. Molecular-inspired motion (floating atoms, orbital rings). Neon-bordered 3D flip cards. Animated staggered timeline. Full-viewport 3D hero canvas with particle fields. Premium deep-tech aesthetic — think quantum labs, not generic fintech.

## Palette
| Semantic | OKLCH | Role |
| --- | --- | --- |
| Background | `0.12 0.02 280` | Deep navy foundation, minimal chroma for focus |
| Foreground | `0.97 0.02 280` | Almost-white for maximum contrast |
| Primary | `0.65 0.20 200` | Electric cyan, action & highlight |
| Accent | `0.65 0.25 320` | Neon fuchsia, sparse highlights & emphasis |
| Secondary | `0.25 0.12 270` | Deep purple-navy, subtle layering |
| Muted | `0.28 0.06 270` | Soft purple-grey, secondary text & borders |
| Destructive | `0.58 0.21 22` | Red-orange for errors & critical actions |
| Card | `0.18 0.04 270` | Slightly lighter than background for depth |
| Border | `0.22 0.08 200` | Subtle cyan-tint for separation |

## Typography
| Layer | Font | Scale | Weight |
| --- | --- | --- | --- |
| Display | Space Grotesk | 3.5rem / 2.25rem / 1.875rem | 700 |
| Body | Plus Jakarta Sans | 1rem / 0.875rem | 400 |
| Mono | JetBrains Mono | 0.875rem | 400 |

## Structural Zones
| Zone | Treatment | Rationale |
| --- | --- | --- |
| Header / Nav | `bg-sidebar border-b border-primary/30 shadow-glow-cyan` | Anchors interface with cyan accent, subtle glow |
| Hero Section | Full-viewport 3D Canvas (React Three Fiber) | Dramatic entry, showcases 3D capability |
| Content Cards | `glass-card neon-border-cyan` or `neon-border-fuchsia` | Glass-morphic with neon outlines, elevated depth |
| Timeline (About) | Staggered reveal with alternating left/right | Professional narrative flow |
| Footer | `bg-card border-t border-primary/20` | Symmetry with header, minimal visual weight |

## Component Patterns
- **3D Cards (Research/Publications)**: React Three Fiber flip animation on hover, neon cyan/fuchsia borders, floating effect
- **CTA Buttons**: `gradient-primary text-foreground font-semibold rounded-sm`, hover scale 1.05 with glow-cyan
- **Form Inputs**: `bg-input border border-border placeholder:text-muted-foreground focus:ring-primary focus:border-primary`
- **Timeline**: SVG line with animated milestone dots, staggered `opacity-0 → opacity-100`

## Motion & Animation
- **Hero Canvas**: Particle field, orbital rings, floating molecular structures — continuous subtle motion
- **Cards**: Entrance stagger (150ms intervals), hover flip (0.6s), glow pulse (2s)
- **Timeline**: Dots appear bottom-to-top on scroll, lines stroke in
- **Floating**: 3s ease-in-out cycle for non-interactive elements (±12px vertical shift)
- **Hover**: Scale 1.02–1.05, glow intensifies, cyan → fuchsia fade possible

## Spacing & Density
- Container padding: 2rem (responsive: 1rem mobile)
- Card gap: 1.5rem
- Typography line-height: 1.6 (body), 1.2 (display)
- Border radius: minimal (0.375rem) to maintain sharp, geometric feel

## Constraints
- NO blur gradients on text (readability priority)
- NO bouncy animations (professional tone)
- NO multiple simultaneous glow effects on one element (focus conflict)
- Dark mode only (no light theme toggle)
- 3D hero hero on Home only; 3D flip cards on Research/Publications only
- Fully responsive: mobile-first design, tested sm/md/lg/xl breakpoints

## Signature Details
- Cyan glow accent on interactive elements (buttons, card borders, focus states)
- Neon fuchsia as rare, high-impact accent (accent buttons, special highlights only)
- Molecular/orbital visual metaphor woven into 3D hero (DNA helix, electron orbits, particle swarms)
- Glass-morphic cards with minimal blur (12px) for depth without obscuring content
- Geometric, minimal border-radius for sharp, future-forward feel
