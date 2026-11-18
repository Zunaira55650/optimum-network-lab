import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check } from 'lucide-react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  learningModuleOrder,
  type LearningModuleId,
} from '../data/learningModules'
import { premiumEase, revealDuration, revealStagger } from '../motion'

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
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.35 })
  const isNumeric = /^\d+$/.test(value)
  const numericValue = Number(value)
  const counter = useMotionValue(0)
  const [animatedValue, setAnimatedValue] = useState(0)

  useMotionValueEvent(counter, 'change', (current) => {
    setAnimatedValue(Math.round(current))
  })

  useEffect(() => {
    if (!isNumeric || reduceMotion || !isInView) {
      return
    }

    const controls = animate(counter, numericValue, {
      delay: index * 0.06,
      duration: 0.9,
      ease: premiumEase,
    })

    return () => controls.stop()
  }, [counter, index, isInView, isNumeric, numericValue, reduceMotion])

  const displayValue = !isNumeric || reduceMotion
    ? value
    : String(animatedValue).padStart(value.length, '0')

  return (
    <motion.article
      ref={cardRef}
      className="portfolio-metric-card group relative isolate overflow-hidden rounded-[19px] border border-white/[0.075] bg-[#10141c] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-colors duration-300 hover:border-white/[0.14] hover:bg-[#121822] hover:shadow-[0_16px_34px_rgba(0,0,0,0.2)] sm:p-5"
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.005 }}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        delay: reduceMotion ? 0 : 0.08 + index * 0.07,
        duration: reduceMotion ? 0 : revealDuration,
        ease: premiumEase,
      }}
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
            <p className="text-[26px] font-semibold leading-none tracking-[-0.05em] text-white tabular-nums">
              {displayValue}
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
}

export function ModuleCard({
  module,
  index,
  onPrepareLesson,
  onOpenLesson,
}: {
  module: ModuleCardData
  index: number
  onPrepareLesson: () => void
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
  } = module
  const reduceMotion = useReducedMotion()
  const completed = progress === 100

  return (
    <motion.article
      id={`module-${id}`}
      aria-labelledby={`module-title-${id}`}
      className="portfolio-module-card group relative isolate overflow-hidden rounded-[18px] border border-l-2 bg-[#10141c] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/[0.15] hover:bg-[#121822] hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)]"
      data-tone={tone}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.006 }}
      transition={{
        delay: reduceMotion ? 0 : index * revealStagger,
        duration: reduceMotion ? 0 : revealDuration,
        ease: premiumEase,
      }}
    >
      <div className="module-card-identity">
        <div
          className={`module-card-icon flex h-11 w-11 items-center justify-center rounded-[14px] border ${toneStyles[tone].icon}`}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
        </div>
        <span className="module-card-index">
          {String(index + 1).padStart(2, '0')}
          <span>/{String(learningModuleOrder.length).padStart(2, '0')}</span>
        </span>
      </div>
      <div className="module-card-content">
        <span
          className={`module-card-category rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] ${toneStyles[tone].badge}`}
        >
          {category}
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {acronym}
        </p>
        <h3
          id={`module-title-${id}`}
          className="mt-1 text-base font-semibold leading-snug tracking-[-0.025em] text-slate-100"
        >
          {title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-[1.65] text-slate-400">
          {description}
        </p>
        {progress > 0 && (
          <div className="module-card-progress">
            <div className="mb-1.5 flex items-center justify-between gap-2">
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
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  delay: reduceMotion ? 0 : 0.35 + index * 0.06,
                  duration: reduceMotion ? 0 : 0.8,
                }}
              />
            </div>
          </div>
        )}
      </div>
      <motion.button
        aria-label={`Open ${title} lesson`}
        className="module-card-action"
        onClick={onOpenLesson}
        onFocus={onPrepareLesson}
        onPointerEnter={onPrepareLesson}
        type="button"
        whileHover={reduceMotion ? undefined : { x: 3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        Open Lesson
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </motion.button>
    </motion.article>
  )
}
