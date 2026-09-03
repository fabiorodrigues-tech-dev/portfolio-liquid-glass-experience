export type TabType = 'projetos' | 'sobre' | 'habilidades' | 'contato'

export type ThemeMode = 'light' | 'dark'

export type AccentColor =
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'amber'
  | 'pink'
  | 'mint'
  | 'green'
  | 'orange'
  | 'red'
  | 'purple'
  | 'indigo'

export interface AccentColorDef {
  id: AccentColor
  name: string
  light: string
  dark: string
  bgLight: string
  bgDark: string
  borderLight: string
  borderDark: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: 'backend' | 'ai' | '3d' | 'b2b' | 'marketing' | 'web' | 'system' | 'cloud' | 'mobile'
  description: string
  longDescription?: string
  accentColor: AccentColor
  metrics: {
    label: string
    value: string
  }[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  actionButtons?: {
    label: string
    url: string
    variant?: 'primary' | 'secondary' | 'marketing' | 'filmmaker'
    customClass?: string
  }[]
  imageGradient: string
  featured?: boolean
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  type: string
  description: string
  achievements: string[]
  accentColor: AccentColor
  technologies: string[]
}

export interface SkillItem {
  name: string
  level: number // 1 to 100
  accentColor: AccentColor
  tag: string
  description: string
}

export interface SkillCategory {
  title: string
  description: string
  accentColor: AccentColor
  skills: SkillItem[]
}
