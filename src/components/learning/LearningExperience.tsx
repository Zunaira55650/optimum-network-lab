import { lazy, Suspense } from 'react'
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  Info,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react'
import {
  learningModuleOrder,
  learningModules,
  type LearningChapterSection,
  type LearningModuleId,
} from '../../data/learningModules'
import { ModuleQuiz } from './ModuleQuiz'
import { ThemeToggle, type Theme } from '../ThemeToggle'
import { OptimumMark } from '../portfolio/OptimumMark'
import { navigationSpring, premiumEase, revealDuration } from '../../motion'

const ModuleDemo = lazy(() =>
  import('./ModuleDemos').then((module) => ({ default: module.ModuleDemo })),
)

type LearningExperienceProps = {
  moduleId: LearningModuleId
  isComplete: boolean
  progressStorageError: boolean
  theme: Theme
  themeStorageError: boolean
  onExit: () => void
  onSelectModule: (id: LearningModuleId) => void
  onToggleCompletion: (completed: boolean) => void
  onToggleTheme: () => void
}

const panelClass =
  'rounded-2xl border border-white/[0.075] bg-[#10141c] p-5 shadow-[0_8px_28px_rgba(0,0,0,0.12)] sm:rounded-[20px] sm:p-6'

function LessonReveal({
  className,
  ...props
}: HTMLMotionProps<'section'>) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      {...props}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduceMotion ? 0 : revealDuration,
        ease: premiumEase,
      }}
    />
  )
}

const highlightedConceptPattern =
  /(Optimum Network Lab|Optimum Gateway|Beacon Node|GossipSub|mump2p|RLNC|WebSocket|gRPC|Optimum)/g
const highlightedConcepts = new Set([
  'Optimum Network Lab',
  'Optimum Gateway',
  'Beacon Node',
  'GossipSub',
  'mump2p',
  'RLNC',
  'WebSocket',
  'gRPC',
  'Optimum',
])

function HighlightedText({ text }: { text: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      {text.split(highlightedConceptPattern).map((part, index) =>
        highlightedConcepts.has(part) ? (
          <motion.span
            className="lesson-concept-term"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            key={`${part}-${index}`}
            transition={{
              duration: reduceMotion ? 0 : 0.38,
              delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.15),
              ease: premiumEase,
            }}
            animate={{ opacity: 1, y: 0 }}
          >
            {part}
          </motion.span>
        ) : (
          part
        ),
      )}
    </>
  )
}

function SectionHeading({
  number,
  eyebrow,
  title,
  titleId,
}: {
  number: string
  eyebrow: string
  title: string
  titleId?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="mb-5 flex items-start gap-3.5"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduceMotion ? 0 : 0.52,
        ease: premiumEase,
      }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-cyan-200/10 bg-cyan-200/[0.045] font-mono text-[11px] text-cyan-100">
        {number}
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-200/70">
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className="mt-1 text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl"
        >
          <HighlightedText text={title} />
        </h2>
      </div>
    </motion.div>
  )
}

function ReferencesPanel({
  title,
  description,
  sources,
}: {
  title: string
  description: string
  sources: { label: string; href: string }[]
}) {
  if (sources.length === 0) {
    return null
  }

  return (
    <section aria-label={title} className="lesson-reference-panel">
      <div className="lesson-reference-heading">
        <div>
          <p className="lesson-reference-kicker">SOURCE MATERIAL</p>
          <h3 className="lesson-reference-title-heading">{title}</h3>
          <p className="lesson-reference-description">{description}</p>
        </div>
        <span className="lesson-reference-count">
          {sources.length} {sources.length === 1 ? 'source' : 'sources'}
        </span>
      </div>
      <div className="lesson-reference-grid">
        {sources.map((source, index) => (
          <a
            key={`${source.href}-${index}`}
            className="lesson-reference-link"
            href={source.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="lesson-reference-link-title">{source.label}</span>
            <span className="lesson-reference-host">
              {new URL(source.href).hostname.replace(/^www\./, '')}
            </span>
            <span className="lesson-reference-action">
              Open source
              <ExternalLink aria-hidden="true" className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

function ChapterSection({
  section,
  index,
}: {
  section: LearningChapterSection
  index: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className={panelClass}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : revealDuration,
        delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.24),
        ease: premiumEase,
      }}
    >
      <SectionHeading
        number={String(index + 1).padStart(2, '0')}
        eyebrow="CHAPTER SECTION"
        title={section.title}
      />
      <p className="text-[13px] leading-7 text-slate-300 sm:text-sm">
        {section.explanation}
      </p>
      <div className="mt-4 rounded-xl border border-cyan-200/[0.08] bg-cyan-200/[0.025] p-3.5 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-100/70">
          A practical example
        </p>
        <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-[13px]">
          {section.example}
        </p>
        {section.exampleSteps && (
          <ol className="mt-3 space-y-2.5">
            {section.exampleSteps.map((step, stepIndex) => (
              <li className="flex gap-2.5" key={step}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] font-mono text-[9px] text-slate-500">
                  {stepIndex + 1}
                </span>
                <p className="text-xs leading-5 text-slate-400 sm:text-[13px]">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
          Visual concept
        </p>
        <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-[13px]">
          {section.visualConcept}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
          Technical details
        </p>
        <ul className="mt-2 space-y-2.5">
          {section.technicalDetails.map((detail) => (
            <li className="flex gap-2.5" key={detail}>
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/70" />
              <p className="text-xs leading-5 text-slate-400 sm:text-[13px]">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <ReferencesPanel
        title="References"
        description={`Original sources for ${section.title}. Links open the referenced material in a new tab.`}
        sources={section.sources}
      />
    </motion.section>
  )
}

export function LearningExperience({
  moduleId,
  isComplete,
  progressStorageError,
  theme,
  themeStorageError,
  onExit,
  onSelectModule,
  onToggleCompletion,
  onToggleTheme,
}: LearningExperienceProps) {
  const reduceMotion = useReducedMotion()
  const module = learningModules[moduleId]
  const currentIndex = learningModuleOrder.indexOf(moduleId)
  const previousModule = learningModuleOrder[currentIndex - 1]
  const nextModule = learningModuleOrder[currentIndex + 1]

  return (
    <div className="min-h-screen bg-[#090c13] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_55%_-20%,rgba(35,90,116,0.12),transparent_48%)]"
      />
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#090c13]/90 px-4 backdrop-blur-xl sm:px-7">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center">
            <div className="portfolio-lesson-brand">
              <OptimumMark className="portfolio-lesson-logo" />
              <span className="portfolio-lesson-name">Optimum Network Lab</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle
              theme={theme}
              storageError={themeStorageError}
              onToggle={onToggleTheme}
            />
            <button
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 text-xs font-medium text-slate-300 transition hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:px-4"
              onClick={onExit}
              type="button"
            >
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-7 sm:py-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-9 lg:px-10 lg:py-9">
        <aside className="min-w-0 lg:sticky lg:top-[92px] lg:h-[calc(100vh-116px)]">
          <div className="mb-3 hidden lg:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              COURSE CONTENTS
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {learningModuleOrder.length} ideas, one learning path
            </p>
          </div>
          <div className="relative">
            <nav
              aria-label="Learning modules"
              className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 pr-14 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0 lg:pr-0"
            >
              {learningModuleOrder.map((id) => {
                const item = learningModules[id]
                const active = id === moduleId
                return (
                  <motion.button
                    key={id}
                    aria-current={active ? 'step' : undefined}
                    className={`lesson-navigation-link relative isolate flex min-h-11 shrink-0 items-center gap-3 rounded-xl border px-3 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 lg:w-full ${
                      active
                        ? 'text-cyan-50'
                        : 'border-white/[0.06] bg-[#10141c] text-slate-400 hover:border-white/[0.12] hover:bg-[#141923] hover:text-slate-200 lg:border-transparent lg:bg-transparent'
                    }`}
                    onClick={() => onSelectModule(id)}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    type="button"
                  >
                    {active && (
                      <motion.span
                        aria-hidden="true"
                        className="lesson-navigation-active"
                        layoutId={
                          reduceMotion ? undefined : 'active-lesson-navigation'
                        }
                        transition={
                          reduceMotion ? { duration: 0 } : navigationSpring
                        }
                      />
                    )}
                    <span
                      className={`relative z-10 font-mono text-[10px] ${
                        active ? 'text-cyan-200' : 'text-slate-600'
                      }`}
                    >
                      {item.order}
                    </span>
                    <span className="relative z-10 whitespace-nowrap text-xs font-medium">
                      {item.navTitle}
                    </span>
                    {active && (
                      <motion.span
                        className="relative z-10 ml-auto hidden lg:flex"
                        initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.22,
                          ease: premiumEase,
                        }}
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-cyan-100/50" />
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </nav>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-center gap-0.5 rounded-r-xl border-y border-r border-white/[0.06] bg-[#090c13]/90 text-[10px] font-medium text-slate-500 lg:hidden"
            >
              Scroll
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="mt-7 hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 lg:block">
            <div className="flex items-center gap-2 text-slate-300">
              <BookOpen aria-hidden="true" className="h-4 w-4 text-cyan-200" />
              <p className="text-xs font-medium">A note on the demos</p>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              These are small teaching models, not live network connections or
              performance simulations.
            </p>
          </div>
        </aside>

        <main className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={module.id}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 18, scale: 0.992 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.36,
                ease: premiumEase,
              }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <button
                  className="transition hover:text-slate-200"
                  onClick={onExit}
                  type="button"
                >
                  Learning modules
                </button>
                <ChevronRight aria-hidden="true" className="h-3 w-3" />
                <span className="text-slate-300">{module.navTitle}</span>
              </div>

              <section
                aria-labelledby="lesson-title"
                className="relative isolate overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#111823] px-5 py-6 shadow-[0_22px_70px_rgba(0,0,0,0.2)] sm:rounded-[28px] sm:px-8 sm:py-8 lg:px-10 lg:py-9"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_0%,rgba(47,145,164,0.13),transparent_48%),linear-gradient(120deg,rgba(17,26,38,0.6),rgba(14,18,29,0.35))]"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-cyan-200/[0.12] bg-cyan-200/[0.04] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-cyan-100/90">
                    MODULE {module.order} /{' '}
                    {String(learningModuleOrder.length).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500">
                    {module.category}
                  </span>
                </div>
                <motion.h1
                  id="lesson-title"
                  className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.05em] text-white sm:text-4xl lg:text-[3.25rem]"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.58,
                    delay: reduceMotion ? 0 : 0.1,
                    ease: premiumEase,
                  }}
                >
                  <HighlightedText text={module.title} />
                </motion.h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                  <HighlightedText text={module.summary} />
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                      initial={
                        reduceMotion ? false : { width: 0 }
                      }
                      animate={{
                        width: `${((currentIndex + 1) / learningModuleOrder.length) * 100}%`,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.8,
                        ease: premiumEase,
                      }}
                    />
                  </div>
                  <span className="shrink-0 text-[10px] tabular-nums text-slate-500">
                    {currentIndex + 1} of {learningModuleOrder.length}
                  </span>
                </div>
              </section>

              <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.75fr)] xl:gap-6">
                <div className="min-w-0 space-y-5">
                  {module.chapterSections ? (
                    <>
                      <LessonReveal className={panelClass}>
                        <SectionHeading
                          number="00"
                          eyebrow="CHAPTER OVERVIEW"
                          title="The short version"
                        />
                        <p className="text-[13px] leading-7 text-slate-300 sm:text-sm">
                          {module.beginnerExplanation}
                        </p>
                        <div className="mt-4 rounded-xl border border-cyan-200/[0.08] bg-cyan-200/[0.025] p-3.5 sm:p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-100/70">
                            A practical example
                          </p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-[13px]">
                            {module.realWorldExample}
                          </p>
                        </div>
                      </LessonReveal>
                      {module.chapterSections.map((section, index) => (
                        <ChapterSection
                          index={index}
                          key={section.title}
                          section={section}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <LessonReveal className={panelClass}>
                        <SectionHeading
                          number="01"
                          eyebrow="START WITH THE IDEA"
                          title="In plain language"
                        />
                        <p className="text-[13px] leading-7 text-slate-300 sm:text-sm">
                          {module.beginnerExplanation}
                        </p>
                        <div className="mt-4 rounded-xl border border-cyan-200/[0.08] bg-cyan-200/[0.025] p-3.5 sm:p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-100/70">
                            A familiar example
                          </p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-[13px]">
                            {module.realWorldExample}
                          </p>
                        </div>
                      </LessonReveal>

                      <LessonReveal className={panelClass}>
                        <SectionHeading
                          number="02"
                          eyebrow="FOLLOW THE FLOW"
                          title="How it works"
                        />
                        <ol className="space-y-4">
                          {module.howItWorks.map((step, index) => (
                            <li className="flex gap-3.5" key={step}>
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] font-mono text-[10px] text-slate-400">
                                {index + 1}
                              </span>
                              <p className="text-[13px] leading-6 text-slate-400 sm:text-sm">
                                {step}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </LessonReveal>
                    </>
                  )}

                  <LessonReveal
                    aria-labelledby="demo-heading"
                    className={panelClass}
                  >
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                      <SectionHeading
                        number={module.chapterSections ? '07' : '03'}
                        eyebrow="TRY THE CONCEPT"
                        title="Interactive demonstration"
                        titleId="demo-heading"
                      />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/10 bg-emerald-200/[0.035] px-2.5 py-1 text-[10px] text-emerald-100/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Teaching model
                      </span>
                    </div>
                    <Suspense
                      fallback={
                        <div
                          aria-live="polite"
                          className="flex min-h-36 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0b0f17] text-xs text-slate-500"
                          role="status"
                        >
                          Loading demonstration…
                        </div>
                      }
                    >
                      <ModuleDemo type={module.demoType} />
                    </Suspense>
                    <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
                      <Info
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600"
                      />
                      {module.demoNote}
                    </p>
                  </LessonReveal>

                  {!module.chapterSections && (
                    <>
                      <LessonReveal className={panelClass}>
                        <SectionHeading
                          number="04"
                          eyebrow="CONNECT THE DOTS"
                          title="Why it matters"
                        />
                        <p className="text-[13px] leading-7 text-slate-300 sm:text-sm">
                          {module.whyItMatters}
                        </p>
                      </LessonReveal>
                      {module.practicalUseCases && (
                        <LessonReveal className={panelClass}>
                          <SectionHeading
                            number="05"
                            eyebrow="IN PRACTICE"
                            title="Where it can be useful"
                          />
                          <ul className="space-y-3">
                            {module.practicalUseCases.map((useCase) => (
                              <li className="flex gap-2.5" key={useCase}>
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/70" />
                                <p className="text-[13px] leading-6 text-slate-400 sm:text-sm">
                                  {useCase}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </LessonReveal>
                      )}
                    </>
                  )}
                </div>

                <aside className="space-y-5 xl:sticky xl:top-[92px]">
                  <LessonReveal className={panelClass}>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-emerald-200/10 bg-emerald-200/[0.045] text-emerald-200">
                        <Check aria-hidden="true" className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/70">
                          RECAP
                        </p>
                        <h2 className="mt-0.5 text-base font-semibold text-white">
                          Key takeaways
                        </h2>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {module.keyTakeaways.map((takeaway) => (
                        <li className="flex gap-2.5" key={takeaway}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/70" />
                          <p className="text-xs leading-5 text-slate-400">
                            <HighlightedText text={takeaway} />
                          </p>
                        </li>
                      ))}
                    </ul>
                  </LessonReveal>

                  {module.terminologyNote && (
                    <LessonReveal className="rounded-2xl border border-amber-200/10 bg-amber-200/[0.025] p-5">
                      <div className="flex items-center gap-2 text-amber-100/90">
                        <Info aria-hidden="true" className="h-4 w-4" />
                        <h2 className="text-xs font-semibold">
                          Terminology & scope
                        </h2>
                      </div>
                      <p className="mt-2.5 text-xs leading-5 text-slate-400">
                        {module.terminologyNote}
                      </p>
                    </LessonReveal>
                  )}

                  {!module.chapterSections && (
                    <ReferencesPanel
                      title="Further reading"
                      description="Original documentation and technical references for this module."
                      sources={module.sources}
                    />
                  )}
                </aside>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: reduceMotion ? 0 : revealDuration,
                  ease: premiumEase,
                }}
              >
                <ModuleQuiz key={moduleId} moduleId={moduleId} />
              </motion.div>

              <section
                aria-label="Lesson completion"
                className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#10141c] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {isComplete
                      ? 'Lesson completed'
                      : 'Ready to complete this lesson?'}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Mark it complete after reviewing the lesson and key
                    takeaways.
                  </p>
                  {progressStorageError && (
                    <p className="mt-2 text-xs text-amber-100/80" role="status">
                      Lesson progress could not be saved in this browser.
                    </p>
                  )}
                </div>
                <button
                  aria-pressed={isComplete}
                  className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${
                    isComplete
                      ? 'border-emerald-200/15 bg-emerald-200/[0.06] text-emerald-100 hover:bg-emerald-200/[0.1]'
                      : 'border-cyan-200/15 bg-cyan-200/[0.08] text-cyan-100 hover:bg-cyan-200/[0.13]'
                  }`}
                  onClick={() => onToggleCompletion(!isComplete)}
                  type="button"
                >
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  {isComplete ? 'Mark lesson incomplete' : 'Mark lesson complete'}
                </button>
              </section>

              <nav
                aria-label="Lesson navigation"
                className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-[#10141c] p-4 sm:p-5"
              >
                <button
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-left text-xs text-slate-400 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                  disabled={!previousModule}
                  onClick={() => previousModule && onSelectModule(previousModule)}
                  type="button"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  <span>
                    <span className="hidden sm:block">Previous module</span>
                    <span className="sm:hidden">Previous</span>
                    {previousModule && (
                      <span className="mt-0.5 hidden text-[10px] text-slate-600 sm:block">
                        {learningModules[previousModule].navTitle}
                      </span>
                    )}
                  </span>
                </button>
                <span className="shrink-0 text-[10px] tabular-nums text-slate-600">
                  {module.order} /{' '}
                  {String(learningModuleOrder.length).padStart(2, '0')}
                </span>
                <button
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white/[0.04] px-3 text-right text-xs font-medium text-slate-200 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:px-4"
                  onClick={() =>
                    nextModule ? onSelectModule(nextModule) : onExit()
                  }
                  type="button"
                >
                  <span>
                    <span className="block">
                      {nextModule ? 'Next module' : 'Finish learning path'}
                    </span>
                    {nextModule && (
                      <span className="mt-0.5 hidden text-[10px] font-normal text-slate-500 sm:block">
                        {learningModules[nextModule].navTitle}
                      </span>
                    )}
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </nav>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
