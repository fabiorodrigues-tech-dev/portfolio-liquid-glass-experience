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

### 6.2 Perimeter Edge Glow (Edge-to-Edge)
SVG optical engine locked 100% to screen boundaries (no insets or margins):
- Container: `fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen pointer-events-none z-50 overflow-hidden`
- SVG Rect: `x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="0"`
- Stroke: 5px gradient (`#00f2fe → #a855f7 → #ec4899 → #f59e0b → #00f2fe`) with `filter="url(#edge-glow)"`
- Interior: `fill="none"` ensuring 100% transparency and center sharpness.

### 6.3 Harmonic Chime — Web Audio API
Pure synthesis via `AudioContext` singleton (`_chimeCtx`). Two sinusoidal oscillators in major-third interval:

| Note | Frequency | Delay | Attack | Release |
|------|-----------|-------|--------|---------|
| C5   | 523.25 Hz | 0ms   | 25ms   | 420ms   |
| E5   | 659.25 Hz | 80ms  | 25ms   | 420ms   |

Gain envelope: `linearRamp(0→0.16, 25ms)` → `exponentialRamp(0.16→0.0001, 420ms)`. Matches Apple Intelligence double-chime harmonic signature.

### 6.4 Voice Recognition Pipeline & Microphone Permissions
1. **Explicit Permission**: Requests access via `navigator.mediaDevices.getUserMedia({ audio: true })`.
2. **Recognition Engine**: `webkitSpeechRecognition` / `SpeechRecognition` configured for `pt-BR`, `continuous: true`, and `interimResults: true`.
3. **NFD Normalization**: Raw transcript is normalized via `.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()` to strip accents and match voice intents robustly.
4. **Global Event Dispatch**:
   - `portfolio-music-play`: Plays audio track via YouTube Iframe API.
   - `portfolio-music-pause`: Pauses audio playback.
   - `portfolio-navigate`: Navigates to target tab ('projects', 'about', 'skills', 'contact').
   - Theme toggle: switches `dark` class on root document.
   - Spotlight search & Focus mode toggles.
5. **Resource Cleanup**: On closing, tracks are stopped (`track.stop()`), safely releasing browser recording status.

### 6.5 Transcript Caption Capsule
`.nova-caption-capsule` — fixed bottom center pill (z-65):
- `backdrop-filter: blur(32px) saturate(190%)`
- Displays live feedback: `Ouvi: "${raw}"`, `"▶ Tocando música..."`, `"☀️ Modo Claro."`, etc.
- Pulsing gradient dot (`nova-caption-dot`) indicating live mic state.

---

## 7. Desktop Control Center — macOS 26 Reconstruction

**Component**: [`ControlCenter.tsx`](../src/components/ControlCenter.tsx)

### 7.1 Native Popover Behaviour (Desktop vs Mobile)
| Platform | Scrim | z-index | Position |
|----------|-------|---------|----------|
| Desktop ≥ 768px | **None** — content visible behind | z-40 | `fixed top-9 right-3 w-[330px]` |
| Mobile < 768px | Full-screen dismiss overlay | z-50 | Bottom sheet `rounded-t-[28px]` |

O popover flutua nativamente sobre o conteúdo com Liquid Glass e sem backdrop escuro.

### 7.2 Estrutura Oficial em 5 Linhas (Fiel ao macOS Nativo)
```
┌──────────────────────────────────────────────────────────┐
│ LINHA 1 (Topo):                                         │
│ ┌─────────────────────────┐ ┌──────────────────────────┐ │
│ │ Conexões (Pílulas):     │ │ Mídia:                   │ │
│ │ • Status (Recife, PE)   │ │ • Capa álbum (EQ animado)│ │
│ │ • Liquid Glass (Modo)   │ │ • Faixa MIDNIGHT         │ │
│ │ • Som do Site (Ativo)   │ │ • Botão Tocar + Pular    │ │
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
│ [ ☀ / 🌙 Modo Dia / Modo Noite ]        [ CLARO / ESCURO ]│
└──────────────────────────────────────────────────────────┘
```

- **Pílula Liquid Glass**: Alterna dinamicamente entre os modos ópticos *Translúcido* (vidro de alta refração) e *Tonalizado* (vidro de maior densidade com matiz do sistema).
- **Pílula Som do Site**: Permite habilitar ou silenciar imediatamente a camada de efeitos sonoros e respostas hápticas do portfólio.
- **Botão de Aparência**: Layout em largura total com rótulo dinâmico e badge de status.

---

## 8. Liquid Glass Quick Look Modal Specification

**Component**: [`ProjectQuickLook.tsx`](../src/components/ProjectQuickLook.tsx)

- **Translucent High-Refraction Optics**:
  - `backgroundColor: isDark ? 'rgba(13, 16, 25, 0.62)' : 'rgba(255, 255, 255, 0.68)'`
  - `backdropFilter: 'blur(32px) saturate(190%)'`
  - `border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.8)'`
- **Subtle Backdrop**: `bg-black/40 backdrop-blur-sm` leaves desktop wallpaper visible and luminous behind modal.
- **Scroll Architecture**: Single unified scroll container with custom scrollbar, avoiding double-nested bars.

---

## 9. Desktop Dock Ergonomics & Scaling

**Component**: [`Dock.tsx`](../src/components/Dock.tsx)

- **Container Dimensions**:
  - Height: `h-[68px]`
  - Padding: `px-3.5 py-2`
  - Radius: `rounded-[24px]`
  - Glass: `bg-white/20 dark:bg-white/[0.12] backdrop-blur-3xl border border-white/25 dark:border-white/18 shadow-2xl`
- **Screen Positioning**: `bottom-2` for base alignment.
- **Icon Sizing**:
  - Standard 48px × 48px square buttons: `w-12 h-12 rounded-xl`
  - Internal icons / SVGs: `w-12 h-12 object-contain`
  - Hover physics: `hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all`
- **Active Indicator**: Centered dot positioned at `-bottom-1.5`.

---

## 10. macOS Window Physics & Tahoe Elastic Zoom Engine

**Components**: [`WindowFrame.tsx`](../src/components/WindowFrame.tsx), [`TrafficLights.tsx`](../src/components/TrafficLights.tsx), [`index.css`](../src/index.css)

- **Elastic Easing Curve**:
  ```css
  .window-frame {
    transition: max-width 480ms cubic-bezier(0.16, 1, 0.3, 1),
                width 480ms cubic-bezier(0.16, 1, 0.3, 1),
                height 480ms cubic-bezier(0.16, 1, 0.3, 1),
                margin 480ms cubic-bezier(0.16, 1, 0.3, 1),
                transform 480ms cubic-bezier(0.16, 1, 0.3, 1),
                border-radius 480ms cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 480ms cubic-bezier(0.16, 1, 0.3, 1),
                background-color 300ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: max-width, height, transform;
  }
  ```
- **Symmetric Geometry**: Centralized alignment (`my-auto`) guarantees smooth expansion and retraction from center without visual jumping.
- **Dual Zoom Vectors**:
  1. Green Traffic Light button with dynamic glyphs (outward diagonal arrows for maximize, inward arrows for restore).
  2. Double-click anywhere on the window title bar header.

---

## 11. macOS Genie Effect Minimization & Dock Pipeline

**Components**: [`App.tsx`](../src/App.tsx), [`WindowFrame.tsx`](../src/components/WindowFrame.tsx), [`Dock.tsx`](../src/components/Dock.tsx), [`index.css`](../src/index.css)

- **3D Funnel Vortex Deformation**:
  - `@keyframes macos-genie-minimize`: Non-linear suction sequence tapering the base toward the dock target (`clip-path: polygon(...)`), tilting in 3D perspective (`perspective(700px) rotateX(...)`), and plunging into zero-scale at the dock center.
  - `@keyframes macos-genie-restore`: Reverse elastic emergence with Apple bounce curve (`cubic-bezier(0.16, 1, 0.3, 1)`), uncreasing the window back onto the desktop.
  - GPU Acceleration: `transform-origin: 50% 100% !important; will-change: transform, clip-path, opacity, filter;`.
- **Minimized Dock Miniature**:
  - A dedicated miniature window card mounts dynamically on the right side of the Dock separator when the window is minimized.
  - Displays miniature traffic lights, content lines, and a glowing amber minimize indicator dot.
- **Omni-Directional Restoration**:
  - Clicking the Dock miniature card restores the window.
  - Clicking any active app in the Dock (Finder/Projetos, Sobre Mim, Terminal, Contato) automatically restores the window.
  - Keyboard shortcut **`Cmd + M`** (or `Ctrl + M`) minimizes and restores the window seamlessly.

---

## 12. High-Contrast Day Mode Optical Calibration (Tailwind CSS v4)

**Files**: [`src/index.css`](../src/index.css), [`src/components/ControlCenter.tsx`](../src/components/ControlCenter.tsx)

- **Root Issue Resolution**: Tailwind CSS v4 defaults `dark:` variants to `@media (prefers-color-scheme: dark)`. On macOS systems in dark mode, light theme was incorrectly inheriting dark text styles.
- **Class-Based Variant Directive**:
  ```css
  @import "tailwindcss";
  @custom-variant dark (&:where(.dark, .dark *));
  ```
- **Optical Typography Tokens**:
  - `.control-center-panel`: Frosted glass background `rgba(246, 248, 252, 0.88)` with 48px blur and 200% saturation.
  - `.cc-tile`: Internal module card `rgba(255, 255, 255, 0.68)` with subtle specular highlight `inset 0 1px 0 0 rgba(255, 255, 255, 0.85)`.
  - `.cc-text-primary`: Deep black `#09090b` with weight 700 (WCAG AAA contrast).
  - `.cc-text-secondary`: Refined gray `#4b5563` with weight 500 for secondary text and percentages.
  - `.cc-divider`: Subtle hairline separator `rgba(0, 0, 0, 0.08)`.


