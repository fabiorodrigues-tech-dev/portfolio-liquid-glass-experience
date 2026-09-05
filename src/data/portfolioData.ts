import type { ExperienceItem, Project, SkillCategory } from '../types'

export const PROFILE_LINKS = {
  whatsapp: 'https://wa.me/5581991851507',
  whatsappDisplay: '+55 (81) 99185-1507',
  phone: '+55 (81) 99185-1507',
  email: 'fabioandre777@gmail.com',
  github: 'https://github.com/fabiorodrigues-tech-dev',
  linkedin: 'https://www.linkedin.com/in/fabiorodrigues-dev/',
  instagram: 'https://www.instagram.com/f.a.rodrigues/',
  drive: 'https://drive.google.com/drive/folders/1rl-SPjOi4tisk2tACb2RcKKAmo6OmBrw',
}

export const ABOUT_DATA = {
  name: 'Fábio Rodrigues',
  title: 'Full Stack & Creative Technologist',
  location: 'Recife, PE • Brasil',
  phone: '+55 (81) 99185-1507',
  whatsappUrl: 'https://wa.me/5581991851507',
  email: 'fabioandre777@gmail.com',
  status: 'Disponível para contratação e projetos corporativos',
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'nova-enterprise',
    title: 'NOVA Enterprise Platform',
    subtitle: 'Arquitetura de Microsserviços Corporativa • Java 21, Spring Boot & LGPD',
    category: 'backend',
    description:
      'Plataforma corporativa de missão crítica construída com Java 21 LTS e Spring Boot 3 sob rigorosos padrões de conformidade com a LGPD. Arquitetura em microsserviços com APIs RESTful seguras, persistência relacional com Spring Data JPA e suíte rigorosa de testes automatizados com JUnit 5.',
    longDescription:
      'Arquitetura em microsserviços com APIs RESTful seguras, persistência relacional com Spring Data JPA e suíte rigorosa de testes automatizados com JUnit 5, particionamento de dados sensíveis, controle de acesso baseado em papéis (RBAC) e auditoria criptográfica para conformidade total com a LGPD.',
    accentColor: 'blue',
    metrics: [
      { label: 'Uptime Global', value: '99.99%' },
      { label: 'Conformidade', value: '100% LGPD' },
      { label: 'Latência P95', value: '< 45ms' },
    ],
    tags: [
      'Java 21 LTS',
      'Spring Boot 3',
      'JUnit 5',
      'Spring Data JPA',
      'PostgreSQL',
      'Docker',
      'RESTful APIs',
      'Render Cloud',
    ],
    githubUrl: 'https://github.com/fabiorodrigues-tech-dev/NOVA',
    liveUrl: 'https://nova-control-center-alsl.onrender.com/',
    actionButtons: [
      {
        label: 'DEMO ONLINE (LGPD)',
        url: 'https://nova-control-center-alsl.onrender.com/',
        customClass: 'bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl',
      },
      {
        label: 'REPOSITÓRIO GITHUB',
        url: 'https://github.com/fabiorodrigues-tech-dev/NOVA',
        customClass: 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/15 font-bold px-4 py-2 rounded-xl',
      },
    ],
    imageGradient: 'from-blue-600/30 via-indigo-500/20 to-cyan-600/30',
    featured: true,
  },
  {
    id: 'sofia-voice-ai',
    title: 'SOFIA Voice AI Assistant',
    subtitle: 'Agente Autônomo de Voz em Tempo Real • Vapi, ElevenLabs & GPT-4o',
    category: 'ai',
    description:
      'Agente conversacional de inteligência artificial por voz com latência ultra-baixa, integrando a orquestração do framework Vapi à síntese de voz ultra-realista da ElevenLabs e webhooks assíncronos para automação em tempo real.',
    longDescription:
      'Desenvolvido com orquestração no framework Vapi integrada à síntese de voz ultra-realista da ElevenLabs, interpretação de intenções via OpenAI GPT-4o e webhooks assíncronos em tempo real com TypeScript/Node.js para automação e atendimento com latência inferior a 600ms.',
    accentColor: 'purple',
    metrics: [
      { label: 'Latência Voz', value: '< 600ms' },
      { label: 'Acurácia Intenção', value: '98.5%' },
      { label: 'Disponibilidade', value: '24/7 Ativo' },
    ],
    tags: [
      'Vapi Framework',
      'ElevenLabs (Voice)',
      'Webhooks Assíncronos',
      'OpenAI GPT-4o',
      'TypeScript',
      'Node.js',
      'Realtime Audio',
    ],
    githubUrl: 'https://github.com/fabiorodrigues-tech-dev',
    liveUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7493208152142794754/',
    actionButtons: [
      {
        label: 'DEMO SOFIA (VOICE AI)',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7493208152142794754/',
        customClass: 'bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl',
      },
      {
        label: 'REPOSITÓRIO GITHUB',
        url: 'https://github.com/fabiorodrigues-tech-dev',
        customClass: 'bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-900 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/15 font-bold px-4 py-2 rounded-xl',
      },
    ],
    imageGradient: 'from-purple-600/30 via-pink-500/20 to-indigo-700/30',
    featured: true,
  },
  {
    id: 'unreal-metahuman-vivian',
    title: 'UNREAL 5.2 — MetaHuman Vivian',
    subtitle: 'Avatar Digital Hiper-realista • Lumen, Nanite & Quixel Megascans',
    category: '3d',
    description:
      'Integração do ecossistema Unreal Engine 5.2 com o avatar MetaHuman Vivian (Vivian.mhb), iluminação global Lumen, virtualização Nanite e texturização fotorrealista com Quixel Megascans e Blueprints.',
    longDescription:
      'Integração do ecossistema Unreal Engine 5.2 com o avatar MetaHuman Vivian (Vivian.mhb), iluminação global Lumen, virtualização Nanite e texturização fotorrealista com Quixel Megascans e Blueprints.',
    accentColor: 'cyan',
    metrics: [
      { label: 'Resolução Real-time', value: '4K 60FPS' },
      { label: 'Geometria', value: 'Nanite Mesh' },
      { label: 'Iluminação', value: 'Lumen GI' },
    ],
    tags: ['Unreal Engine 5.2', 'MetaHuman', 'Lumen', 'Nanite', 'Megascans', 'Blueprints', 'Blink & Dash VFX'],
    githubUrl: 'https://github.com/fabiorodrigues-tech-dev',
    liveUrl: 'https://drive.google.com/drive/folders/1AsF5mKlXNVl4OMfU4rnzychZqWkDMy63?usp=sharing',
    imageGradient: 'from-cyan-500/30 via-blue-600/20 to-teal-500/30',
    featured: true,
  },
  {
    id: 'futureprint-sp-infinit',
    title: 'FUTUREPRINT SP 2026 // INFINIT TECNOLOGIA',
    subtitle: 'Cobertura Audiovisual Oficial & Demonstração Industrial • FuturePrint 2026',
    category: 'b2b',
    description:
      'Cobertura audiovisual oficial e produção de conteúdos dinâmicos na FuturePrint 2026 (Expo Center Norte, SP) — maior feira de comunicação visual e impressão digital da América Latina. CR (Comunicação e Relacionamento B2B), integração do projeto VAPI SOFIA (Voice AI & automação de roteiros), captação 4K ProRes (60fps), lâminas comerciais institucionais e geração de +120 leads B2B qualificados.',
    longDescription:
      'Produção executiva e captação multimídia na FuturePrint SP 2026 representando a Infinit Tecnologia no Expo Center Norte em São Paulo. Operação técnica de demonstração de impressoras industriais e prensas térmicas, gravação com Câmera 4K ProRes (60fps) em tempo real e entrega diária (same-day) para redes sociais. Aplicação prática de ferramentas de IA Generativa na automação de roteiros e pré-produção multimídia, além do design de lâminas comerciais institucionais que geraram mais de 120 leads B2B qualificados.',
    accentColor: 'amber',
    metrics: [
      { label: 'Leads B2B Qualificados', value: '+120' },
      { label: 'Captação 4K', value: 'ProRes 60fps' },
      { label: 'Entrega Diária', value: 'Same-Day' },
    ],
    tags: [
      'Final Cut Pro',
      'CapCut Pro',
      'Captação 4K ProRes (60fps)',
      'Vapi Voice Sofia',
      'IA Generativa (Roteiros)',
      'CR & B2B',
    ],
    liveUrl: 'https://www.instagram.com/infinit.sublimacao/',
    actionButtons: [
      {
        label: 'VER INSTAGRAM INSTITUCIONAL',
        url: 'https://www.instagram.com/infinit.sublimacao/',
        customClass: 'bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-sm',
      },
      {
        label: 'RELATÓRIO EXECUTIVO (DRIVE)',
        url: 'https://drive.google.com/file/d/12XZ2AXfChOl-CMwwQnqybZ028MCq3ijt/view?usp=drivesdk',
        customClass: 'bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-sm',
      },
    ],
    imageGradient: 'from-amber-500/30 via-orange-500/20 to-yellow-600/30',
    featured: true,
  },
  {
    id: 'marketing-hub-intelligence',
    title: 'MARKETING HUB — Inteligência Multicanal',
    subtitle: 'Central de Automação & Atribuição de Tráfego • Meta & Google Ads',
    category: 'marketing',
    description:
      'Planejamento e gestão de campanhas de tráfego pago (Google Ads e Meta Ads) orientadas a ROAS e redução de CPA, integradas à produção de criativos audiovisuais de alta retenção e virais com sound design no Logic Pro.',
    longDescription:
      'Gestão completa de mídia de performance e criação multimídia unificada: campanhas orientadas a dados no Google Ads e Meta Ads Manager com otimização diária de ROAS e CPA, combinadas a criativos cinematográficos verticais editados no Final Cut Pro e masterizados no Logic Pro para máxima retenção de audiência.',
    accentColor: 'emerald',
    metrics: [
      { label: 'ROAS Médio', value: '+185%' },
      { label: 'Canais Integrados', value: '15+' },
      { label: 'Impressões Rastreadas', value: '2.8M+' },
    ],
    tags: [
      'Google Ads (Search, Display, PMax)',
      'Meta Ads Manager',
      'GA4',
      'Looker Studio',
      'Canva Pro',
      'Figma',
      'Final Cut Pro',
      'Logic Pro (Masterização/ASMR)',
    ],
    githubUrl: 'https://github.com/fabiorodrigues-tech-dev',
    liveUrl: 'https://drive.google.com/drive/folders/1Mz7BoxVzmUnZd24H7n9zrvByGN_bzFxm?usp=sharing',
    actionButtons: [
      {
        label: 'PORTFÓLIO ANALISTA DE MARKETING (DRIVE)',
        url: 'https://drive.google.com/drive/folders/1Mz7BoxVzmUnZd24H7n9zrvByGN_bzFxm?usp=sharing',
        customClass: 'bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md',
      },
      {
        label: 'PORTFÓLIO AUDIOVISUAL & FILMMAKER (DRIVE)',
        url: 'https://drive.google.com/drive/folders/1fhmqNSZG9h7Tv4pFzqysuuBcIY4Sw-ri?usp=sharing',
        customClass: 'bg-red-600 hover:bg-red-500 text-white font-bold shadow-md',
      },
    ],
    imageGradient: 'from-emerald-500/30 via-green-500/20 to-teal-600/30',
    featured: true,
  },
]

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-infinit',
    role: 'Comunicação Visual & Criação Multimídia',
    company: 'Infinit Tecnologia',
    period: '2026 – Atual',
    type: 'Híbrido / Recife, PE & São Paulo, SP',
    description:
      'Cobertura audiovisual oficial e produção de conteúdos dinâmicos na FuturePrint 2026 (Expo Center Norte, SP) — maior feira de comunicação visual e impressão digital da América Latina. Realização de demonstrações técnicas de maquinário industrial, criação de lâminas comerciais institucionais, captação 4K dinâmica em tempo real (Reels/Stories) e geração de +120 leads B2B qualificados.',
    achievements: [
      'CR (Comunicação e Relacionamento B2B) e geração de mais de 120 leads comerciais qualificados.',
      'Integração do Projeto VAPI SOFIA (Voice AI & Automação de Roteiros) com IA Generativa.',
      'Captação 4K ProRes (60fps) dinâmica em tempo real e edição same-day para redes sociais (@infinit.sublimacao).',
      'Demonstrações técnicas presenciais de maquinário industrial e criação de lâminas comerciais institucionais.',
    ],
    accentColor: 'amber',
    technologies: ['Final Cut Pro', 'CapCut Pro', '4K ProRes', 'Vapi Voice Sofia', 'IA Generativa (Roteiros)', 'CR & B2B'],
  },
  {
    id: 'exp-unigames',
    role: 'Consultor de Conteúdo & Customer Seller (CRM / CX)',
    company: 'Unigames',
    period: 'Jul/2025 – Dez/2025',
    type: 'Remoto / Recife, PE',
    description:
      'Consultoria estratégica e atendimento consultivo especializado: CRM, CX (Customer Experience) e Customer Seller (Consultor de Vendas de Alta Conversão). Gestão de comunidade digital, vendas diretas via WhatsApp e criação de conteúdos dinâmicos com alta retenção.',
    achievements: [
      'Atuação como Customer Seller (Consultor de Vendas de Alta Conversão) com foco em fechamento ágil via WhatsApp.',
      'Estruturação de fluxos de CRM e Customer Experience (CX) para fidelização e engajamento da comunidade digital.',
      'Criação de trailers, peças dinâmicas e copywriting persuasivo para lançamentos e eventos interativos.',
    ],
    accentColor: 'purple',
    technologies: ['CRM', 'CX', 'Customer Seller', 'Copywriting', 'Vendas Diretas', 'Conteúdo Dinâmico'],
  },
  {
    id: 'exp-wolf-agency',
    role: 'Sócio-Fundador & Diretor de Mídia/Performance',
    company: 'Wolf Agency',
    period: 'Jan/2025 – Jun/2025',
    type: 'Remoto / Recife, PE',
    description:
      'Liderança executiva e operacional da agência. Gestão de tráfego pago em escala (Meta Ads & Google Ads com foco estrito em ROAS e redução de CPA), testes A/B de criativos, direção e edição de vídeos de alta retenção, elaboração de contratos comerciais e estruturação no Google Workspace.',
    achievements: [
      'Gestão avançada de tráfego pago (Meta Ads & Google Ads) com foco estrito em ROAS superior a 185% e redução contínua de CPA.',
      'Direção, roteirização e edição de criativos audiovisuais verticais de alta retenção no Final Cut Pro e CapCut Pro.',
      'Elaboração de contratos comerciais B2B, governança administrativa e estruturação de operações no Google Workspace.',
    ],
    accentColor: 'blue',
    technologies: ['Google Workspace', 'Gestão de Tráfego (Meta & Google Ads)', 'Final Cut Pro', 'CapCut Pro', 'Canva Pro', 'Gestão de Contratos', 'ROAS & CRO'],
  },
  {
    id: 'exp-quintal',
    role: 'Gerente Geral & Gestor de Marketing (PDV / iFood)',
    company: 'Quintal dos Primos',
    period: 'Jun/2024 – Dez/2024',
    type: 'Recife, PE',
    description:
      'Gestão operacional, financeira e de marketing gastronômico. Operação e otimização da loja no iFood, desenvolvimento e operação de Sistema de PDV Proprietário para controle de comandas, fechamento diário de caixa, controle de inventário/estoque e produção de vídeos Food Appeal.',
    achievements: [
      'Desenvolvimento e operação de Sistema de PDV Proprietário para controle ágil de comandas e fechamento diário de caixa.',
      'Gestão e otimização da operação no iFood Delivery, controle de inventário/estoque e governança financeira.',
      'Captação 4K ProRes (60fps) com Food Appeal gastronômico e campanhas de tráfego local no Meta Ads.',
    ],
    accentColor: 'green',
    technologies: ['Sistema PDV Proprietário', 'Gestão iFood Delivery', 'Fechamento de Caixa', 'Controle de Inventário', 'CapCut Pro', 'Final Cut Pro', 'Meta Ads Local'],
  },
  {
    id: 'exp-olimac',
    role: 'Gestor de Marketing B2B (Tráfego Pago / Catálogos)',
    company: 'Olimac',
    period: 'Jan/2024 – Mai/2024',
    type: 'Recife, PE',
    description:
      'Gestão de tráfego pago e campanhas de prospecção B2B (Google Ads Search & Meta Ads), produção de catálogos técnicos no Canva Pro e edição de vídeos industriais no CapCut Pro e Final Cut Pro.',
    achievements: [
      'Planejamento e execução de campanhas no Google Ads Search e Meta Ads focadas na geração de leads qualificados B2B.',
      'Produção e diagramação de catálogos técnicos industriais no Canva Pro para suporte à equipe comercial.',
      'Edição de vídeos de demonstração de maquinário industrial no CapCut Pro e Final Cut Pro.',
    ],
    accentColor: 'orange',
    technologies: ['Gestão de Tráfego B2B', 'Google Ads', 'Meta Ads', 'Canva Pro', 'CapCut Pro', 'Edição de Vídeo'],
  },
  {
    id: 'exp-qyon',
    role: 'Gerente Comercial & Agente de Registro (AGR)',
    company: 'Qyon Multinacional',
    period: 'Jan/2022 – Mai/2024',
    type: 'Remoto / Recife, PE',
    description:
      'Gerente Comercial e Rotinas Administrativas de ERP. Operação avançada com sistemas ERP corporativos em nuvem, treinamentos visuais para equipes e atuação como Agente de Registro (AGR) na validação, emissão e conformidade técnica de Certificados Digitais ICP-Brasil.',
    achievements: [
      'Atuação técnica como Agente de Registro (AGR) na validação, emissão e conformidade de Certificados Digitais ICP-Brasil.',
      'Operação corporativa com sistemas de gestão ERP Qyon e liderança de rotinas comerciais e administrativas.',
      'Produção, gravação e roteirização de dezenas de módulos de treinamentos visuais para equipes e parceiros.',
    ],
    accentColor: 'indigo',
    technologies: ['Sistema ERP Qyon', 'Agente de Registro (AGR)', 'Certificação Digital ICP-Brasil', 'Gestão Comercial', 'Rotinas Administrativas', 'Treinamento Visual'],
  },
  {
    id: 'exp-unifbv',
    role: 'Bacharelado em Design',
    company: 'Faculdade Boa Viagem (UniFBV)',
    period: 'Formação Superior',
    type: 'Formação Acadêmica Superior',
    description:
      'Formação sólida com ênfase em design centrado no usuário, metodologia projetual, ergonomia cognitiva, semiótica e arquitetura da informação para sistemas digitais e interfaces de prestígio.',
    achievements: [
      'Aplicação estrita dos princípios de ergonomia e psicologia da percepção fundamentando interfaces no padrão Apple Human Interface Guidelines.',
      'Domínio de tipografia, harmonia cromática, design systems atômicos e acessibilidade digital inclusiva (WCAG AAA).',
    ],
    accentColor: 'pink',
    technologies: ['Ergonomia Cognitiva', 'UX/UI', 'Design Systems', 'Semiótica', 'Arquitetura de Informação', 'Figma'],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Desenvolvimento de Software & Dev',
    description: 'Arquitetura de sistemas distribuídos, microsserviços, inteligência artificial e frontend reativo',
    accentColor: 'blue',
    skills: [
      { name: 'Java 21 & Spring Boot 3', level: 95, accentColor: 'blue', tag: 'Backend', description: 'Microsserviços, LGPD compliance, JPA/Hibernate, Spring Security, arquitetura limpa' },
      { name: 'React 19 & Next.js', level: 98, accentColor: 'cyan', tag: 'Frontend', description: 'Arquitetura por componentes, Server Actions, estado reativo, fidelidade Apple' },
      { name: 'TypeScript & Node.js', level: 96, accentColor: 'mint', tag: 'Full Stack', description: 'Tipagem rigorosa, APIs assíncronas, WebSockets para streaming de dados' },
      { name: 'Voice AI & Agentes (Vapi / LLMs)', level: 92, accentColor: 'purple', tag: 'Inteligência Artificial', description: 'Pipelines de áudio bidirecional em tempo real, prompt development e tool calling' },
    ],
  },
  {
    title: 'Estratégia de Mídia & Negócios',
    description: 'Gestão avançada de tráfego pago, direção de arte, posicionamento de marca e métricas de ROI',
    accentColor: 'emerald',
    skills: [
      { name: 'Gestão de Tráfego (Meta & Google Ads)', level: 96, accentColor: 'emerald', tag: 'Performance', description: 'Campanhas de conversão de alto orçamento, escala de ROAS, testes A/B estruturados' },
      { name: 'Direção de Arte & Branding (UniFBV)', level: 94, accentColor: 'pink', tag: 'Design', description: 'Identidade visual de prestígio, storytelling persuasivo e consistência de marca' },
      { name: 'Inteligência de Dados & Atribuição', level: 90, accentColor: 'amber', tag: 'Growth', description: 'Rastreamento avançado via CAPI, modelagem preditiva de CAC e Lifetime Value (LTV)' },
      { name: 'Rotinas Administrativas & Liderança (Wolf)', level: 92, accentColor: 'blue', tag: 'Gestão', description: 'Planejamento orçamentário, gestão financeira de agência e liderança de times' },
    ],
  },
  {
    title: 'Computação Gráfica & 3D em Tempo Real',
    description: 'Renderização em tempo real, avatares digitais hiper-realistas e ambientes virtuais',
    accentColor: 'cyan',
    skills: [
      { name: 'Unreal Engine 5.2', level: 88, accentColor: 'cyan', tag: 'Real-Time 3D', description: 'Iluminação global dinâmica com Lumen, micropolígonos com Nanite e Blueprints' },
      { name: 'MetaHuman & Quixel Megascans', level: 90, accentColor: 'purple', tag: 'Avatares Digitais', description: 'Criação de avatares hiper-realistas, texturização Megascans e animação em tempo real' },
      { name: 'WebGL & Three.js', level: 86, accentColor: 'blue', tag: 'Web 3D', description: 'Shaders GLSL, renderização acelerada por GPU e interatividade tridimensional no navegador' },
      { name: 'Design de Interação 3D', level: 90, accentColor: 'amber', tag: 'Ergonomia', description: 'Navegação espacial, interfaces holográficas e otimização para altas taxas de quadros' },
    ],
  },
  {
    title: 'Arquitetura, Cloud & Qualidade',
    description: 'Bancos de dados relacionais, segurança corporativa, conformidade e infraestrutura',
    accentColor: 'amber',
    skills: [
      { name: 'PostgreSQL, Redis & Bancos', level: 92, accentColor: 'amber', tag: 'Database', description: 'Modelagem relacional para LGPD, índices otimizados, caching em memória' },
      { name: 'Docker & Ambientes em Nuvem', level: 90, accentColor: 'mint', tag: 'DevOps', description: 'Containerização, ambientes reproduzíveis, CI/CD automatizado e segurança de rede' },
      { name: 'Conformidade LGPD & Segurança', level: 95, accentColor: 'emerald', tag: 'Governança', description: 'Criptografia em repouso e trânsito, auditoria de logs e privacidade por design' },
      { name: 'Ergonomia & Apple Human Interface', level: 98, accentColor: 'purple', tag: 'Design Apple', description: 'Física de Liquid Glass, microinterações hápticas e fluidez a 120 FPS' },
    ],
  },
  {
    title: 'Audiovisual, Edição & Social Media',
    description: 'Captação 4K ProRes (60fps), edição diária same-day, roteirização para Reels/TikTok e masterização no Logic Pro',
    accentColor: 'pink',
    skills: [
      { name: 'Final Cut Pro & DaVinci Resolve', level: 96, accentColor: 'pink', tag: 'NLE Video', description: 'Edição dinâmica de alta retenção, color grading cinematográfico e ritmo de cortes ágil' },
      { name: 'Logic Pro (Masterização Sonora)', level: 93, accentColor: 'purple', tag: 'Sound Design', description: 'Masterização e mixagem de áudio, sound design imersivo, equalização e voz limpa' },
      { name: 'Captação 4K ProRes (60fps) & Food Appeal', level: 95, accentColor: 'amber', tag: 'Cinematografia', description: 'Captação 4K em 60fps, iluminação cênica, food appeal gastronômico e enquadramentos premium' },
      { name: 'CapCut Pro, Roteirização & Gestão de Canais', level: 98, accentColor: 'cyan', tag: 'Social Media', description: 'Hooks magnéticos nos primeiros 3s, roteirização para retenção em Reels/TikTok e entrega same-day' },
    ],
  },
]

