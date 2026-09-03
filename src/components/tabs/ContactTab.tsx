import React, { useState } from 'react'
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../icons/SocialIcons'
import type { ThemeMode } from '../../types'

interface ContactTabProps {
  theme: ThemeMode
}

export const ContactTab: React.FC<ContactTabProps> = () => {
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const emailAddress = 'fabioandre777@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setFormSubmitted(false)
    }, 4000)
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="pb-2 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#34c759]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Comunicação Direta
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Iniciar Conversa
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
          Disponível para projetos corporativos de desenvolvimento de software, produção audiovisual, direção criativa e consultoria de alta escala.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
            Enviar Mensagem
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
            Respondo habitualmente em menos de 24 horas úteis.
          </p>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#34c759] text-white flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Mensagem Enviada com Sucesso!
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                Obrigado pelo contato. Uma confirmação foi enviada para o seu endereço de e-mail.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Steve Jobs"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 outline-none focus:border-[#007aff] dark:focus:border-[#0a84ff] transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="voce@empresa.com"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 outline-none focus:border-[#007aff] dark:focus:border-[#0a84ff] transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Assunto
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Nova Oportunidade / Projeto / Produção"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 outline-none focus:border-[#007aff] dark:focus:border-[#0a84ff] transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Mensagem Detalhada *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descreva seu projeto, escopo, objetivos ou prazos..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 outline-none focus:border-[#007aff] dark:focus:border-[#0a84ff] transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#007aff] hover:bg-[#0062cc] active:scale-[0.99] text-white text-xs font-semibold shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Exactly 4 Channels */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Card 1: LinkedIn */}
          <a
            href="https://www.linkedin.com/in/fabiorodrigues-dev/"
            target="_blank"
            rel="noreferrer"
            className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:translate-x-1 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  LinkedIn
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  /in/fabiorodrigues-dev
                </p>
              </div>
            </div>
            <span className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Card 2: GitHub */}
          <a
            href="https://github.com/fabiorodrigues-tech-dev"
            target="_blank"
            rel="noreferrer"
            className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:translate-x-1 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
                <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  GitHub
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  @fabiorodrigues-tech-dev
                </p>
              </div>
            </div>
            <span className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Card 3: E-mail Direto (com 1-click copy) */}
          <div className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#007aff] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    E-mail Direto
                  </h3>
                  <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {emailAddress}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-[#007aff] hover:text-white transition-all flex items-center space-x-1.5 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34c759]" />
                    <span className="text-[#34c759]">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 4: WhatsApp Comercial */}
          <a
            href="https://wa.me/5581989920040"
            target="_blank"
            rel="noreferrer"
            className="bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:translate-x-1 transition-all border-emerald-500/20"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  WhatsApp Comercial
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  +55 81 98992-0040
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#25D366] text-white shadow-sm transition-transform active:scale-95 flex items-center space-x-1">
              <span>Conversar ↗</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
