# 🏛️ Technical Architecture & Design System Dossier

> **Project**: macOS 26 Tahoe & iOS 26 Liquid Glass Experience  
> **Author**: Fábio Rodrigues — Creative Technologist & Full Stack Developer  
> **Repository**: [github.com/fabiorodrigues-tech-dev/portfolio-liquid-glass-experience](https://github.com/fabiorodrigues-tech-dev/portfolio-liquid-glass-experience)  
> **Specification Reference**: [Apple Developer — Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)  
> **Live Deployment**: [portfolio-liquid-glass-experience.vercel.app](https://portfolio-liquid-glass-experience.vercel.app)

---

## 1. Executive Summary & Design Engineering Philosophy
This project implements an enterprise-grade dual-platform Web Operating System adapting between:
- Desktop (>= 1024px): macOS 26 Tahoe desktop shell with floating windows and segmented controls.
- Mobile (< 1024px): Native iOS 26 iPhone environment with Springboard widgets, App Store-style cards, Control Center, and dual-theme dock icons.

The core goal is achieving optical fidelity to Apple Human Interface Guidelines (HIG) with 60/120 FPS performance, zero touch latency, and WCAG AAA contrast.

---

## 2. Optical Physics & Liquid Glass Material Specification
Adhering to Apple's official Liquid Glass specifications, materials are functional optical layers with multi-pass filters:

- Core Filter: backdrop-filter: blur(28px) saturate(190%) contrast(102%)
- Dark Calibration (Obsidian): background: rgba(14, 16, 23, 0.42); inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
- Light Calibration (Pearlescent): background: rgba(255, 255, 255, 0.52); inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.75);

### GPU Backdrop-Filter Invalidation Solution:
Eliminated root-level CSS filters that cause mobile GPU bounding-box artifacts. Screen brightness is mapped to a hardware-accelerated physical black scrim layer (z-30), positioning the Control Center at z-50 above the scrim.

---

## 3. Dual-Platform Adaptive Engine
Decoupled platform rendering via viewport conditional orchestration:
- Desktop: WindowFrame with multi-window support and authentic traffic lights.
- Mobile: Slender vertical capsule sliders (76px x 160px), 3-tier right navigation rail, and dual-theme dock asset mapping.

---

## 4. Touch Physics & Decoupled Audio Pipeline
- Zero-Latency Touch Drag: Custom touch engine computing coordinates directly from viewport geometry with transition: none during drag.
- Throttled Audio Subsystem: External YouTube IFrame API volume calls throttled at 50ms (20 Hz) while visual level updates at 120 FPS.

---

## 5. Full Stack Ecosystem Integration
Orchestrates independent enterprise repositories:
- Projeto NOVA: Java 21 LTS, Spring Boot 3.3.3, JUnit 5, LGPD Compliance.
- Projeto Sofia: Realtime Voice AI, Vapi Framework, ElevenLabs API, Webhooks.
- Unreal 5.2 MetaHuman: Lumen, Nanite, Quixel Megascans, Realtime Rigging.

---

## 6. NOVA Assistant — Apple Intelligence Layer

**Component**: [`NovaAssistant.tsx`](../src/components/NovaAssistant.tsx)  
**State Types**: `NovaState = 'idle' | 'listening' | 'executing'` (see [`types/index.ts`](../src/types/index.ts))

### 6.1 Activation Vectors
| Trigger | Behaviour |
|---------|-----------|
| `Space` held ≥ 700ms | Toggle NOVA (long-press via `keydown` timer, prevents default scroll) |
| MenuBar `🎙️` button | Toggle NOVA with single click |
| `Esc` key | Deactivate NOVA unconditionally |

### 6.2 Perimeter Glow — CSS Optical Engine
Two-layer pseudo-element system on `.nova-glow-frame` (z-index: 60):
- **`::before`** — 5px hard-edge conic border using `padding-box / border-box` gradient trick (no SVG, no canvas)
- **`::after`** — 14px soft halo with `filter: blur(10px)` for the luminous spread
- Gradient: `#00f2fe → #a855f7 → #ec4899 → #f59e0b → #22d3ee` rotating at 3s linear cycle
- Outer ring pulses via `nova-pulse-ring` (opacity 0.82 ↔ 1.0, 2s ease-in-out)

### 6.3 Harmonic Chime — Web Audio API
Pure synthesis via `AudioContext` singleton (`_chimeCtx`). Two sinusoidal oscillators in major-third interval:

| Note | Frequency | Delay | Attack | Release |
|------|-----------|-------|--------|---------|
| C5   | 523.25 Hz | 0ms   | 25ms   | 420ms   |
| E5   | 659.25 Hz | 80ms  | 25ms   | 420ms   |

Gain envelope: `linearRamp(0→0.16, 25ms)` → `exponentialRamp(0.16→0.0001, 420ms)`. Matches Apple Intelligence double-chime harmonic signature.

### 6.4 Voice Command Pipeline
Uses `webkitSpeechRecognition` (PT-BR locale) in continuous + interimResults mode. Commands are parsed via `parseCommand()` against a priority-ordered string-match table:

```
tocar/play          → togglePlay()
pausar/pause        → togglePlay()
modo claro/escuro   → toggleTheme()
modo foco           → toggleFocus()
buscar [termo]      → openSpotlight(termo)
abrir [seção]       → selectTab(seção)
```

On `isFinal = true`: executes command → `onStateChange('executing')` → `onDeactivate()` after 800ms.  
Auto-restart on `onend` while `isNovaActive = true` (prevents recognition timeout).

### 6.5 Transcript Caption Capsule
`.nova-caption-capsule` — fixed bottom center pill (z-65):
- `backdrop-filter: blur(32px) saturate(190%)`
- Animated entry via `nova-caption-appear` keyframe (translateY + scale from 0.95)
- Pulsing gradient dot (`nova-caption-dot`) indicating live mic state

---

## 7. Desktop Control Center — macOS 26 Reconstruction

**Component**: [`ControlCenter.tsx`](../src/components/ControlCenter.tsx)

### 7.1 Native Popover Behaviour (Desktop vs Mobile)
| Platform | Scrim | z-index | Position |
|----------|-------|---------|----------|
| Desktop ≥ 768px | **None** — content visible behind | z-40 | `fixed top-9 right-3 w-[330px]` |
| Mobile < 768px | Full-screen dismiss overlay | z-50 | Bottom sheet `rounded-t-[28px]` |

O popover flutua nativamente sobre o conteúdo com Liquid Glass e sem backdrop escuro. A paleta de cores de acento foi completamente removida no desktop, aderindo ao design real do macOS 26.

### 7.2 Estrutura Oficial em 5 Linhas (Fiel ao macOS Nativo)
```
┌──────────────────────────────────────────────────────────┐
│ LINHA 1 (Topo):                                         │
│ ┌─────────────────────────┐ ┌──────────────────────────┐ │
│ │ Conexões (Pílulas):     │ │ Mídia:                   │ │
│ │ • Status (Recife, PE)   │ │ • Capa álbum (EQ animado)│ │
│ │ • LinkedIn Oficial      │ │ • Faixa MIDNIGHT         │ │
│ │ • GitHub Repositórios   │ │ • Botão Play/Pause + Pular││
│ └─────────────────────────┘ └──────────────────────────┘ │
│                                                          │
│ LINHA 2:                                                 │
│ [ 🌙 Foco                              Ativo / Desativar ]│
│                                                          │
│ LINHA 3:                                                 │
│ Tela                                             [ 100% ]│
│ ☀ dim ──────[━━━━●────────]────── ☀ bright                │
│                                                          │
│ LINHA 4:                                                 │
│ Som                                               [ 70% ]│
│ 🔊 dim ─────[━━━━●────────]────── 🔊 bright               │
│                                                          │
│ LINHA 5 (Base):                                          │
│ [ ☀ / 🌙 Modo Dia / Modo Noite ]  ( 💬 WPP )  ( 📁 Drive ) │
└──────────────────────────────────────────────────────────┘
```

---

## 8. NOVA — Assistente Apple Intelligence

- **Borda Fina Perimetral de 3.5px**: Utiliza cantos arredondados (`rounded-[28px]`, `inset-2 sm:inset-3`) com gradiente fluido (#00f2fe, #a855f7, #ec4899, #f59e0b) estritamente restrito à borda via técnica `border-box`/`padding-box`. O centro da tela permanece 100% limpo, transparente, nítido e interativo.
- **Reconhecimento de Voz (pt-BR)**: Web Speech API configurado com `lang = 'pt-BR'`, `continuous = false`, `interimResults = true`, com execução instantânea dos comandos de voz:
  - "Tocar" / "Música" / "Musica" / "Play" -> `togglePlay()`, `closeNova()`
  - "Pausar" / "Pause" / "Parar" -> `togglePlay()`, `closeNova()`
  - "Claro" / "Dia" -> `setTheme('light')`, `closeNova()`
  - "Escuro" / "Noite" -> `setTheme('dark')`, `closeNova()`
  - "Foco" / "Ocultar dock" -> `toggleFocus()`, `closeNova()`
  - "Buscar" -> `openSpotlightWith(term)`, `closeNova()`
- **Feedback Visual**: Cápsula de transcrição inferior flutuante exibindo em tempo real o que o usuário está falando.
