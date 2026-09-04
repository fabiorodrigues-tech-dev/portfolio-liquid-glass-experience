# Portfolio Creative Technologist — macOS 26 Tahoe / Liquid Glass Experience

<div align="center">

![macOS Tahoe Portfolio Banner](https://img.shields.io/badge/macOS%2026-Tahoe%20Concept-007AFF?style=for-the-badge&logo=apple&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

### 🌐 [Acesse a Experiência Online (Vercel)](https://portfolio-liquid-glass-experience.vercel.app/)

</div>

---

## 🧭 Visão Geral

Portfólio interativo de **Fábio Rodrigues** (Desenvolvedor Full Stack & Creative Technologist), concebido como uma interface de sistema operacional desktop de última geração: o conceito **macOS 26 Tahoe**.

O projeto utiliza um motor óptico proprietário de **Liquid Glass (Vidro Líquido)** com desfoque dinâmico de alta densidade, refração realista, profundidade tridimensional e uma arquitetura estritamente responsiva que entrega a experiência de desktop no computador e uma experiência nativa de **iOS Edge-to-Edge** em dispositivos móveis.

---

## ✨ Principais Funcionalidades

### 🖥️ Experiência Desktop (macOS Tahoe)
- **Janela Flutuante Centralizada:** Moldura em vidro líquido com cantos arredondados (`rounded-3xl`), reflexos especulares e sombras 3D profundas.
- **Traffic Lights Oficiais da Apple:** Botões funcionais de fechar, minimizar (com indicador de restauração no dock) e zoom/maximizar.
- **Barra de Menus macOS:** Menu Apple dinâmico com popover *"Sobre Este Mac"*, abas de navegação rápida, controle de som ambiente e relógio ao vivo sincronizado com o Horário Oficial de Brasília / Recife.
- **Spotlight Search (`⌘K`):** Sistema de busca global por teclado com filtragem instantânea de projetos, tecnologias, histórico profissional e formas de contato.
- **Central de Controle Oficial:** Painel flyout no canto superior direito inspirado no macOS, com ajuste dinâmico de brilho de tela, seletor de paleta de cores de destaque da Apple (8 variações), controle de volume e reprodutor de áudio ambiente integrado.
- **Dock Suspenso de Vidro:** Dock inferior com física de ampliação, micro-indicadores perolados de aplicativo ativo e atalhos rápidos.

### 📱 Experiência Mobile (iOS Edge-to-Edge)
- **Layout de Ponta a Ponta:** Em telas $< 768\text{px}$, a moldura de janela de computador é automaticamente substituída por uma tela cheia fluida com preenchimento total da viewport (`100dvh`).
- **Liquid Glass Contínuo:** A barra superior de status e a barra inferior de abas aplicam desfoque contínuo, permitindo que o conteúdo deslize suavemente por baixo dos elementos translúcidos conforme as diretrizes de design da Apple (iOS Human Interface Guidelines).
- **Painéis como *Bottom Sheets*:** A Central de Controle, o Quick Look e os menus abrem como folhas deslizantes inferiores com alças de arraste (*grabber handles*), suporte a áreas seguras (*safe areas*) e rolagem fluida por toque (*momentum touch scrolling*).

### 🎨 Motor Óptico e Temas
- **Liquid Glass Calibrado:** Camadas sobrepostas de `backdrop-filter: blur(30px) saturate(200%)` calibradas especificamente para renderização a 60/120fps tanto no modo claro quanto no modo noturno profundo.
- **Modo Claro & Noturno Realistas:**
  - **Dark Mode:** Vidro fumê escuro perolado com bordas sutis e alta legibilidade.
  - **Light Mode:** Translucidez leitosa cristalina com alto contraste tipográfico e relevo pronunciado nos cartões e formulários.
- **Cores de Destaque da Apple:** Azul Tahoe, Roxo, Rosa, Vermelho, Laranja, Amarelo, Verde e Grafite aplicados dinamicamente via variáveis CSS.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React 19** | Biblioteca de interface reativa e componentes modulares |
| **TypeScript** | Tipagem estática rigorosa para segurança em tempo de compilação |
| **Vite 8** | Bundler ultra-rápido com Hot Module Replacement (HMR) instantâneo |
| **Tailwind CSS v4** | Motor de estilos atômico moderno com suporte nativo a `@theme` e variantes responsivas |
| **Lucide React** | Conjunto de ícones vetoriais modernos |
| **Vercel** | Hospedagem em nuvem com Continuous Deployment (CI/CD) conectado ao branch `main` |

---

## 📂 Estrutura do Projeto

```text
portfolio-v2-macos/
├── public/                  # Ícones oficiais, logos e wallpapers
├── src/
│   ├── components/
│   │   ├── icons/           # Ícones vetoriais customizados (Apple Control Center, etc.)
│   │   ├── tabs/            # Conteúdo das abas (Projetos, Sobre Mim, Habilidades, Contato)
│   │   ├── AudioPlayer.tsx  # Reprodutor de música ambiente com controle de volume
│   │   ├── ControlCenter.tsx# Central de controle com toggles e seletores de tema/brilho
│   │   ├── Dock.tsx         # Dock de navegação flutuante em Liquid Glass
│   │   ├── MenuBar.tsx      # Barra de menus superior do macOS
│   │   ├── ProjectCard.tsx  # Cards dos projetos com métricas e divisórias de alto contraste
│   │   ├── ProjectQuickLook.tsx # Visualização rápida (Quick Look) modal / bottom sheet
│   │   ├── SegmentedControl.tsx # Alternador de abas no estilo Apple
│   │   ├── SpotlightModal.tsx   # Busca global Spotlight via ⌘K
│   │   ├── TahoeWallpaper.tsx   # Wallpaper de ondas de seda dinâmicas
│   │   ├── TrafficLights.tsx    # Botões de fechar, minimizar e maximizar da janela
│   │   └── WindowFrame.tsx      # Moldura da janela macOS com isolamento responsivo
│   ├── data/                # Dados estruturados de projetos, perfil e cores de destaque
│   ├── types/               # Definições de tipos TypeScript
│   ├── App.tsx              # Componente raiz e gerenciador de estado da experiência
│   ├── index.css            # Configurações do Tailwind v4, safe areas e motor Liquid Glass
│   └── main.tsx             # Ponto de entrada da aplicação
├── index.html               # Documento HTML com suporte a viewport-fit=cover
├── package.json             # Dependências e scripts do projeto
├── tsconfig.json            # Configurações do compilador TypeScript
└── vite.config.ts           # Configuração do Vite com plugin do React e Tailwind
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- Gerenciador de pacotes **npm**, **yarn** ou **pnpm**

### Passo a Passo
1. Clone o repositório:
   ```bash
   git clone https://github.com/fabiorodrigues-tech-dev/portfolio-creative-technologist.git
   cd portfolio-creative-technologist
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

4. Para gerar o build de produção:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy em Produção

O projeto está configurado com implantação contínua na **Vercel**. Cada alteração enviada para a branch `main` dispara automaticamente uma nova compilação e publicação:

🔗 **Link Oficial:** [https://portfolio-liquid-glass-experience.vercel.app/](https://portfolio-liquid-glass-experience.vercel.app/)

---

## 👨‍💻 Desenvolvedor

**Fábio Rodrigues**  
*Desenvolvedor Full Stack & Creative Technologist*

- 💼 **LinkedIn:** [linkedin.com/in/fabiorodrigues-dev](https://www.linkedin.com/in/fabiorodrigues-dev/)
- ✉️ **E-mail:** [fabiorodrigues.tech.dev@gmail.com](mailto:fabiorodrigues.tech.dev@gmail.com)

---

<div align="center">
  <sub>Desenvolvido com carinho e obsessão por detalhes inspirados na Apple Inc.</sub>
</div>
