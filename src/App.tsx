import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import {
  ArrowRight,
  Binary,
  BookOpen,
  Cable,
  Check,
  CircleDot,
  GitBranch,
  Network,
  Radio,
  RadioTower,
  Signal,
  Workflow,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import {
  MetricCard,
  ModuleCard,
  type ModuleCardData,
} from './components/DashboardCards'
import {
  DashboardSidebar,
  DashboardTopBar,
  type DashboardSection,
} from './components/DashboardNavigation'
import {
  AboutSection,
  ContactSection,
  FeaturedProjectSection,
  PortfolioHero,
  ProjectHighlightsSection,
} from './components/portfolio/PortfolioSections'
import type { Theme } from './components/ThemeToggle'
import {
  learningModuleOrder,
  type LearningModuleId,
} from './data/learningModules'
import { premiumEase, revealDuration } from './motion'

const LearningExperience = lazy(
  () =>
    import('./components/learning/LearningExperience').then((module) => ({
      default: module.LearningExperience,
    })),
)

let lessonPreparation: Promise<void> | undefined

function prepareLesson() {
  if (!lessonPreparation) {
    lessonPreparation = Promise.all([
      import('./components/learning/LearningExperience'),
      import('./components/learning/ModuleDemos'),
    ])
      .then(() => undefined)
      .catch((error: unknown) => {
        lessonPreparation = undefined
        console.error('Unable to preload lesson content.', error)
      })
  }
}

const lessonProgressStorageKey = 'optimum-network-lab.lesson-progress.v1'
const themeStorageKey = 'optimum-network-lab.theme.v1'
const dashboardSectionIds: DashboardSection[] = [
  'overview',
  'featured-project',
  'about',
  'learning-modules',
  'project-highlights',
  'contact',
  'network-simulator',
]

function loadTheme(): Theme {
  try {
    return window.localStorage.getItem(themeStorageKey) === 'light'
      ? 'light'
      : 'dark'
  } catch {
    return 'dark'
  }
}

type LessonProgress = {
  completedModuleIds: LearningModuleId[]
  storageError: boolean
}

function loadLessonProgress(): LessonProgress {
  try {
    const storedProgress = window.localStorage.getItem(lessonProgressStorageKey)
    if (!storedProgress) {
      return { completedModuleIds: [], storageError: false }
    }

    const parsedProgress: unknown = JSON.parse(storedProgress)
    if (
      !Array.isArray(parsedProgress) ||
      parsedProgress.some((id) => typeof id !== 'string')
    ) {
      throw new Error('Stored lesson progress is invalid.')
    }

    return {
      completedModuleIds: learningModuleOrder.filter((id) =>
        parsedProgress.includes(id),
      ),
      storageError: false,
    }
  } catch {
    return { completedModuleIds: [], storageError: true }
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

const modules: Omit<ModuleCardData, 'progress'>[] = [
  {
    id: 'introduction',
    acronym: 'OPTIMUM',
    title: 'Introduction to Optimum',
    description:
      'See why Optimum was created, how its gateway mesh delivers block data, and where each component fits.',
    category: 'START HERE',
    icon: BookOpen,
    tone: 'cyan',
  },
  {
    id: 'p2p',
    acronym: 'P2P',
    title: 'Peer-to-peer networks',
    description:
      'Discover how peers find one another and exchange data without relying on one central relay.',
    category: 'FOUNDATIONS',
    icon: Network,
    tone: 'blue',
  },
  {
    id: 'gossipsub',
    acronym: 'GossipSub',
    title: 'GossipSub',
    description:
      'Explore publish-subscribe messaging and how information propagates between peers.',
    category: 'MESSAGE PROPAGATION',
    icon: Radio,
    tone: 'violet',
  },
  {
    id: 'rlnc',
    acronym: 'RLNC',
    title: 'Random linear network coding',
    description:
      'Learn how coded shards represent linear combinations and why independence matters for decoding.',
    category: 'NETWORK CODING',
    icon: Binary,
    tone: 'mint',
  },
  {
    id: 'mump2p',
    acronym: 'mump2p',
    title: 'mump2p',
    description:
      'Explore Optimum’s RLNC-based gossip protocol and how coded shards move through a peer mesh.',
    category: 'RLNC GOSSIP',
    icon: GitBranch,
    tone: 'amber',
  },
  {
    id: 'gateway',
    acronym: 'OPTIMUM GATEWAY',
    title: 'Gateway Architecture',
    description:
      'Trace how Optimum bridges Ethereum consensus-layer GossipSub with the mump2p mesh.',
    category: 'NETWORK BRIDGE',
    icon: Workflow,
    tone: 'cyan',
  },
  {
    id: 'beacon',
    acronym: 'BEACON NODE',
    title: 'Beacon Node Integration',
    description:
      'Trace the Validator Client API path and the separate Beacon Node–Gateway peer connection.',
    category: 'ETHEREUM INTEGRATION',
    icon: RadioTower,
    tone: 'blue',
  },
  {
    id: 'signal',
    acronym: 'SIGNAL',
    title: 'Gateway Connectivity & Network Discovery',
    description:
      'Learn what Signal can verify about Gateway enrollment, reporting, and blocks arriving at the mesh.',
    category: 'GATEWAY CONNECTIVITY',
    icon: Signal,
    tone: 'violet',
  },
  {
    id: 'block-stream',
    acronym: 'BLOCK STREAM',
    title: 'Consumer Block Stream',
    description:
      'Follow decoded Beacon Blocks to authenticated WebSocket and gRPC consumers.',
    category: 'DOWNSTREAM DATA',
    icon: Cable,
    tone: 'mint',
  },
]

function App() {
  const reduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] =
    useState<DashboardSection>('overview')
  const [activeLesson, setActiveLesson] = useState<LearningModuleId | null>(
    null,
  )
  const [lessonProgress, setLessonProgress] = useState(loadLessonProgress)
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const [themeStorageError, setThemeStorageError] = useState(false)
  const completedCount = lessonProgress.completedModuleIds.length
  const modulesReadyToExplore = modules.length - completedCount
  const completedPercentage = Math.round((completedCount / modules.length) * 100)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    )
    if (themeColor) {
      themeColor.content = theme === 'light' ? '#f4f7fb' : '#090c13'
    }
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    setTheme(nextTheme)

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme)
      setThemeStorageError(false)
    } catch {
      setThemeStorageError(true)
    }
  }

  const updateLessonCompletion = (
    moduleId: LearningModuleId,
    completed: boolean,
  ) => {
    const completedModuleIds = completed
      ? [...lessonProgress.completedModuleIds, moduleId]
      : lessonProgress.completedModuleIds.filter((id) => id !== moduleId)
    const uniqueCompletedModuleIds = learningModuleOrder.filter((id) =>
      completedModuleIds.includes(id),
    )

    try {
      window.localStorage.setItem(
        lessonProgressStorageKey,
        JSON.stringify(uniqueCompletedModuleIds),
      )
      setLessonProgress({
        completedModuleIds: uniqueCompletedModuleIds,
        storageError: false,
      })
    } catch {
      setLessonProgress((currentProgress) => ({
        ...currentProgress,
        storageError: true,
      }))
    }
  }

  useEffect(() => {
    if (activeLesson) {
      return
    }

    scrollToTop()

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0]

        const visibleSection = dashboardSectionIds.find(
          (section) => section === visibleEntry?.target.id,
        )
        if (visibleSection) {
          setActiveSection(visibleSection)
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    )

    dashboardSectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [activeLesson])

  const handleNavigate = (section: DashboardSection) => {
    setActiveSection(section)
  }

  const openLesson = (id: LearningModuleId) => {
    prepareLesson()
    setActiveSection('learning-modules')
    setActiveLesson(id)
    scrollToTop()
  }

  const selectLesson = (id: LearningModuleId) => {
    setActiveLesson(id)
    scrollToTop()
  }

  const closeLesson = () => {
    setActiveLesson(null)
    setActiveSection('learning-modules')
  }

  if (activeLesson) {
    return (
      <Suspense
        fallback={
          <div
            aria-live="polite"
            className="flex min-h-screen items-center justify-center bg-[#090c13] text-sm text-slate-400"
            role="status"
          >
            Loading lesson…
          </div>
        }
      >
        <LearningExperience
          moduleId={activeLesson}
          isComplete={lessonProgress.completedModuleIds.includes(activeLesson)}
          progressStorageError={lessonProgress.storageError}
          theme={theme}
          themeStorageError={themeStorageError}
          onToggleTheme={toggleTheme}
          onToggleCompletion={(completed) =>
            updateLessonCompletion(activeLesson, completed)
          }
          onExit={closeLesson}
          onSelectModule={selectLesson}
        />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090c13] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_55%_-20%,rgba(35,90,116,0.16),transparent_48%)]"
      />
      <DashboardSidebar
        activeSection={activeSection}
        completedCount={completedCount}
        onNavigate={handleNavigate}
      />
      <div className="relative z-10 min-h-screen lg:pl-[264px]">
        <DashboardTopBar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          theme={theme}
          themeStorageError={themeStorageError}
          onToggleTheme={toggleTheme}
        />

        <main className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-7 sm:px-7 sm:pt-9 lg:px-10 lg:pt-11">
          <PortfolioHero onNavigate={handleNavigate} />
          <FeaturedProjectSection onNavigate={handleNavigate} />
          <AboutSection />

          <section
            aria-label="Learning overview"
            className="mt-11 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-3.5 xl:grid-cols-4"
          >
            <MetricCard
              index={0}
              icon={BookOpen}
              label="Learning modules"
              value={String(modules.length).padStart(2, '0')}
              detail="Guided topics"
              tone="cyan"
            />
            <MetricCard
              index={1}
              icon={CircleDot}
              label="Lessons completed"
              value={String(completedCount).padStart(2, '0')}
              detail="Saved in this browser"
              tone="violet"
            />
            <MetricCard
              index={2}
              icon={Check}
              label="Ready to explore"
              value={String(modulesReadyToExplore).padStart(2, '0')}
              detail="Modules remaining"
              tone="blue"
            />
            <MetricCard
              index={3}
              icon={Network}
              label="Network simulator"
              value="Soon"
              detail="Coming soon"
              tone="mint"
            />
          </section>

          <div className="mt-14">
            <section
              id="learning-modules"
              aria-labelledby="modules-heading"
              className="scroll-mt-28"
            >
              <div className="portfolio-section-heading mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="portfolio-eyebrow">
                    THE LEARNING PATH
                  </p>
                  <h2
                    id="modules-heading"
                    className="portfolio-section-title mt-2 text-2xl sm:text-[1.7rem]"
                  >
                    Explore the modules
                  </h2>
                  <p className="portfolio-copy mt-1.5 text-sm">
                    Follow the modules in order or open any topic directly.
                  </p>
                </div>
                <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {modules.length} guided topics
                </span>
              </div>
              <div className="grid gap-3">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={{
                      ...module,
                      progress: lessonProgress.completedModuleIds.includes(
                        module.id,
                      )
                        ? 100
                        : 0,
                    }}
                    index={index}
                    onPrepareLesson={prepareLesson}
                    onOpenLesson={() => openLesson(module.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="mt-5 grid items-start gap-4 md:grid-cols-2">
            <aside>
              <motion.section
                aria-labelledby="progress-heading"
                className="rounded-2xl border border-white/[0.08] bg-[#10141d] p-5 sm:p-6"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.1,
                  duration: reduceMotion ? 0 : revealDuration,
                  ease: premiumEase,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                      YOUR PROGRESS
                    </p>
                    <h2
                      id="progress-heading"
                      className="mt-1.5 text-lg font-semibold tracking-tight text-white"
                    >
                      Learning progress
                    </h2>
                  </div>
                  <div
                    aria-label={`${completedPercentage} percent of modules completed`}
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center"
                    role="img"
                  >
                    <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="23"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="28"
                        cy="28"
                        r="23"
                        fill="none"
                        stroke="var(--diagram-cyan)"
                        strokeDasharray="144.5"
                        strokeLinecap="round"
                        strokeWidth="4"
                        initial={
                          reduceMotion
                            ? false
                            : { strokeDashoffset: 144.5 }
                        }
                        animate={{
                          strokeDashoffset:
                            144.5 * (1 - completedPercentage / 100),
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.9,
                          ease: premiumEase,
                        }}
                      />
                    </svg>
                    <span className="absolute text-xs font-semibold text-cyan-100">
                      {completedPercentage}%
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  You have completed{' '}
                  <span className="font-medium text-slate-200">
                    {completedCount} of {modules.length}
                  </span>{' '}
                  learning modules.
                </p>
                {lessonProgress.storageError && (
                  <p
                    className="mt-3 text-xs leading-5 text-amber-100/80"
                    role="status"
                  >
                    Lesson progress could not be loaded or saved in this
                    browser.
                  </p>
                )}
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                    initial={reduceMotion ? false : { width: 0 }}
                    animate={{ width: `${completedPercentage}%` }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      ease: premiumEase,
                    }}
                  />
                </div>
                <a
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
                  href="#learning-modules"
                  onClick={() => handleNavigate('learning-modules')}
                >
                  Continue learning
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.section>
            </aside>

            <motion.section
              id="network-simulator"
              aria-labelledby="simulator-heading"
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-violet-200/10 bg-[#12131d] p-5 sm:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: reduceMotion ? 0 : 0.16,
                duration: reduceMotion ? 0 : revealDuration,
                ease: premiumEase,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200/10 bg-violet-300/[0.08]">
                  <Network className="h-5 w-5 text-violet-200" />
                </div>
                <span className="rounded-full border border-violet-200/15 bg-violet-200/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-200">
                  Coming soon
                </span>
              </div>
              <h2
                id="simulator-heading"
                className="mt-4 text-lg font-semibold tracking-tight text-white"
              >
                Network simulator
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Visualize how peers connect and messages travel through a
                decentralized network.
              </p>
              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                Interactive network lab in development
              </div>
            </motion.section>
          </div>

          <ProjectHighlightsSection />
          <ContactSection />

          <footer className="portfolio-footer mt-16 flex flex-col gap-2 border-t border-white/[0.07] py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Optimum Network Lab · Built by Zunaira</span>
            <a
              className="inline-flex items-center gap-1.5 transition hover:text-cyan-200"
              href="#overview"
              onClick={() => handleNavigate('overview')}
            >
              Back to top
              <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
            </a>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
