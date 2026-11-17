import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { LearningModuleId } from '../data/learningModules'

type Tone = 'cyan' | 'violet' | 'blue' | 'mint' | 'amber'

const toneStyles: Record<
  Tone,
  { icon: string; bar: string; badge: string; glow: string }
> = {
  cyan: {
    icon: 'border-cyan-200/10 bg-cyan-200/[0.07] text-cyan-200',
    bar: 'bg-cyan-300',
    badge: 'border-cyan-200/10 bg-cyan-200/[0.06] text-cyan-100',
    glow: 'bg-cyan-300/[0.055]',
  },
  violet: {
    icon: 'border-violet-200/10 bg-violet-200/[0.07] text-violet-200',
    bar: 'bg-violet-300',
    badge: 'border-violet-200/10 bg-violet-200/[0.06] text-violet-100',
    glow: 'bg-violet-300/[0.055]',
  },
  blue: {
    icon: 'border-blue-200/10 bg-blue-200/[0.07] text-blue-200',
    bar: 'bg-blue-300',
    badge: 'border-blue-200/10 bg-blue-200/[0.06] text-blue-100',
    glow: 'bg-blue-300/[0.055]',
  },
  mint: {
    icon: 'border-emerald-200/10 bg-emerald-200/[0.07] text-emerald-200',
    bar: 'bg-emerald-300',
    badge: 'border-emerald-200/10 bg-emerald-200/[0.06] text-emerald-100',
    glow: 'bg-emerald-300/[0.055]',
  },
  amber: {
    icon: 'border-amber-200/10 bg-amber-200/[0.07] text-amber-200',
    bar: 'bg-amber-300',
    badge: 'border-amber-200/10 bg-amber-200/[0.06] text-amber-100',
    glow: 'bg-amber-300/[0.055]',
  },
}

type MetricCardProps = {
  icon: LucideIcon
  label: string
  value: string
  detail: string
  tone: Extract<Tone, 'cyan' | 'violet' | 'blue' | 'mint'>
  index: number
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
  index,
}: MetricCardProps) {
  return (
    <motion.article
      className="group relative isolate overflow-hidden rounded-[19px] border border-white/[0.075] bg-[#10141c] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-colors duration-300 hover:border-white/[0.14] hover:bg-[#121822] hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)] sm:p-5"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.4, ease: 'easeOut' }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-14 -z-10 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${toneStyles[tone].glow}`}
      />
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border transition-transform duration-300 group-hover:scale-105 ${toneStyles[tone].icon}`}
        >
          <Icon
            aria-hidden="true"
            className="h-[18px] w-[18px]"
            strokeWidth={1.8}
          />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-slate-400">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-[26px] font-semibold leading-none tracking-[-0.05em] text-white">
              {value}
            </p>
            <p className="truncate text-[10px] text-slate-600">{detail}</p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export type ModuleCardData = {
  id: LearningModuleId
  acronym: string
  title: string
  description: string
  category: string
  icon: LucideIcon
  tone: Tone
  progress: number
  concepts: [string, string]
}

export function ModuleCard({
  module,
  index,
  expanded,
  onToggle,
  onOpenLesson,
}: {
  module: ModuleCardData
  index: number
  expanded: boolean
  onToggle: () => void
  onOpenLesson: () => void
}) {
  const {
    id,
    acronym,
    title,
    description,
    category,
    icon: Icon,
    tone,
    progress,
    concepts,
  } = module
  const completed = progress === 100
  const inProgress = progress > 0 && !completed

  return (
    <motion.article
      id={`module-${id}`}
      aria-labelledby={`module-title-${id}`}
      className={`group relative isolate flex min-h-[242px] flex-col overflow-hidden rounded-[20px] border bg-[#10141c] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/[0.15] hover:bg-[#121822] hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:p-[22px] ${
        expanded
          ? 'border-white/[0.16] shadow-[0_18px_42px_rgba(0,0,0,0.24)]'
          : 'border-white/[0.075]'
      }`}
      layout="position"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.07, duration: 0.42, ease: 'easeOut' }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-14 -top-16 -z-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
          expanded ? `opacity-100 ${toneStyles[tone].glow}` : 'opacity-0 group-hover:opacity-100'
        } ${toneStyles[tone].glow}`}
      />
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-[14px] border transition duration-300 group-hover:scale-105 group-hover:rotate-[-3deg] ${toneStyles[tone].icon}`}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] ${toneStyles[tone].badge}`}
        >
          {category}
        </span>
      </div>
      <div className="mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {acronym}
        </p>
        <h3
          id={`module-title-${id}`}
          className="mt-1.5 text-base font-semibold leading-snug tracking-[-0.025em] text-slate-100"
        >
          {title}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.7] text-slate-400">
          {description}
        </p>
      </div>
      <div className="mt-auto pt-5">
        {progress > 0 && (
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                  completed ? 'text-emerald-100/90' : 'text-cyan-100/90'
                }`}
              >
                {completed ? (
                  <Check aria-hidden="true" className="h-3 w-3" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                )}
                {completed ? 'Completed' : 'In progress'}
              </span>
              <span className="text-[10px] tabular-nums text-slate-500">
                {progress}%
              </span>
            </div>
            <div
              aria-label={`${progress}% complete`}
              className="h-1 overflow-hidden rounded-full bg-white/[0.07]"
              role="img"
            >
              <motion.div
                className={`h-full rounded-full ${toneStyles[tone].bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.35 + index * 0.06, duration: 0.8 }}
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
          <span
            className={`text-[11px] ${
              inProgress ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {completed
              ? 'Review this lesson'
              : inProgress
                ? 'Continue your path'
                : 'Ready to explore'}
          </span>
          <button
            aria-controls={expanded ? `module-preview-${id}` : undefined}
            aria-expanded={expanded}
            className="group/preview inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2 text-[11px] font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            onClick={onToggle}
            type="button"
          >
            {expanded ? 'Close preview' : 'Preview'}
            <ChevronDown
              aria-hidden="true"
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                expanded ? 'rotate-180' : 'group-hover/preview:translate-y-0.5'
              }`}
            />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`module-preview-${id}`}
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <div className="mt-4 border-t border-white/[0.07] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  In this module
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {concepts.map((concept) => (
                    <span
                      key={concept}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-slate-300"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
                <button
                  className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-lg bg-white/[0.045] px-3 text-[11px] font-medium text-slate-200 transition hover:bg-cyan-200/[0.1] hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  onClick={onOpenLesson}
                  type="button"
                >
                  Open lesson
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
