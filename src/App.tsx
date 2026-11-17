import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  CircleDot,
  Compass,
  Network,
  Radio,
  Sparkles,
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
import type { Theme } from './components/ThemeToggle'
import {
  learningModuleOrder,
  type LearningModuleId,
} from './data/learningModules'

const LearningExperience = lazy(
  () =>
    import('./components/learning/LearningExperience').then((module) => ({
      default: module.LearningExperience,
    })),
)

const lessonProgressStorageKey = 'optimum-network-lab.lesson-progress.v1'
const themeStorageKey = 'optimum-network-lab.theme.v1'

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
    concepts: ['Gateway mesh', 'Block delivery'],
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
    concepts: ['Peer discovery', 'Direct connections'],
  },
  {
    id: 'gossipsub',
    acronym: 'GossipSub',
    title: 'GossipSub',
    description:
      'Explore publish-subscribe messaging and how information propagates between peers.',
    category: 'MESSAGE PROPAGATION',
    icon: CircleDot,
    tone: 'violet',
    concepts: ['Publish and subscribe', 'Mesh propagation'],
  },
  {
    id: 'rlnc',
    acronym: 'RLNC',
    title: 'Random linear network coding',
    description:
      'Learn how coded shards represent linear combinations and why independence matters for decoding.',
    category: 'NETWORK CODING',
    icon: Sparkles,
    tone: 'mint',
    concepts: ['Coded shards', 'Independent equations'],
  },
  {
    id: 'mump2p',
    acronym: 'mump2p',
    title: 'mump2p',
    description:
      'Explore Optimum’s RLNC-based gossip protocol and how coded shards move through a peer mesh.',
    category: 'RLNC GOSSIP',
    icon: Compass,
    tone: 'amber',
    concepts: ['Coded shards', 'Peer recoding'],
  },
  {
    id: 'gateway',
    acronym: 'OPTIMUM GATEWAY',
    title: 'Gateway Architecture',
    description:
      'Trace how Optimum bridges Ethereum consensus-layer GossipSub with the mump2p mesh.',
    category: 'NETWORK BRIDGE',
    icon: Network,
    tone: 'cyan',
    concepts: ['CL GossipSub', 'mump2p bridge'],
  },
  {
    id: 'beacon',
    acronym: 'BEACON NODE',
    title: 'Beacon Node Integration',
    description:
      'Trace the Validator Client API path and the separate Beacon Node–Gateway peer connection.',
    category: 'ETHEREUM INTEGRATION',
    icon: Network,
    tone: 'blue',
    concepts: ['Beacon API', 'CL peer connection'],
  },
  {
    id: 'signal',
    acronym: 'SIGNAL',
    title: 'Gateway Connectivity & Network Discovery',
    description:
      'Learn what Signal can verify about Gateway enrollment, reporting, and blocks arriving at the mesh.',
    category: 'GATEWAY CONNECTIVITY',
    icon: Network,
    tone: 'violet',
    concepts: ['Gateway enrollment', 'Connection checks'],
  },
  {
    id: 'block-stream',
    acronym: 'BLOCK STREAM',
    title: 'Consumer Block Stream',
    description:
      'Follow decoded Beacon Blocks to authenticated WebSocket and gRPC consumers.',
    category: 'DOWNSTREAM DATA',
    icon: Radio,
    tone: 'mint',
    concepts: ['Consumer tokens', 'Live block events'],
  },
]

function NetworkIllustration() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center"
    >
      <motion.div
        className="absolute inset-[7%] rounded-full border border-dashed border-cyan-200/[0.12]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[12%] rounded-full border border-cyan-300/10" />
      <div className="absolute inset-[25%] rounded-full border border-violet-300/15" />
      <div className="absolute inset-[39%] rounded-full border border-white/[0.08]" />
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        viewBox="0 0 300 300"
      >
        <path
          d="M75 91 146 64l75 48-18 92-91 28-68-65 31-76Z"
          stroke="url(#network-line)"
          strokeDasharray="4 7"
          strokeWidth="1.5"
        />
        <path
          d="m75 91 106 54m40-33-40 33-69 82m109-23-109-59-80 32m149-65-18 92"
          stroke="url(#network-line)"
          strokeOpacity=".5"
          strokeWidth="1"
        />
        <motion.circle
          r="3"
          fill="var(--diagram-cyan-dot)"
          animate={
            reduceMotion
              ? { cx: 75, cy: 91 }
              : {
                  cx: [75, 146, 221, 203, 112, 44, 75],
                  cy: [91, 64, 112, 204, 232, 167, 91],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
        <defs>
          <linearGradient
            id="network-line"
            x1="46"
            x2="240"
            y1="64"
            y2="224"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--diagram-cyan)" stopOpacity=".75" />
            <stop
              offset="1"
              stopColor="var(--diagram-violet-line)"
              stopOpacity=".3"
            />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[25px] border border-cyan-100/20 bg-gradient-to-br from-[#172c3a] to-[#111925] shadow-[0_0_70px_rgba(34,211,238,0.2)] sm:h-[82px] sm:w-[82px] sm:rounded-[28px]">
        <div className="absolute inset-2 rounded-[18px] border border-white/[0.06]" />
        <Network className="relative h-8 w-8 text-cyan-100" strokeWidth={1.5} />
      </div>
      <motion.span
        className="absolute left-[18%] top-[25%] h-3 w-3 rounded-full border-2 border-[#10131b] bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute right-[18%] top-[36%] h-2.5 w-2.5 rounded-full border-2 border-[#10131b] bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,0.8)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
        transition={{
          duration: 3.2,
          delay: 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.span
        className="absolute bottom-[20%] left-[28%] h-2.5 w-2.5 rounded-full border-2 border-[#10131b] bg-blue-300 shadow-[0_0_18px_rgba(147,197,253,0.8)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
        transition={{
          duration: 3.5,
          delay: 0.9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.span
        className="absolute bottom-[27%] right-[21%] h-3 w-3 rounded-full border-2 border-[#10131b] bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.8)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
        transition={{
          duration: 3,
          delay: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>('overview')
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [activeLesson, setActiveLesson] = useState<LearningModuleId | null>(
    null,
  )
  const [lessonProgress, setLessonProgress] = useState(loadLessonProgress)
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const [themeStorageError, setThemeStorageError] = useState(false)
  const reduceMotion = useReducedMotion()
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

    window.scrollTo({ top: 0, behavior: 'smooth' })

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0]

        if (
          visibleEntry?.target.id === 'overview' ||
          visibleEntry?.target.id === 'learning-modules' ||
          visibleEntry?.target.id === 'network-simulator'
        ) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    )

    document
      .querySelectorAll('#overview, #learning-modules, #network-simulator')
      .forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [activeLesson])

  const handleNavigate = (section: DashboardSection) => {
    setActiveSection(section)
  }

  const openLesson = (id: LearningModuleId) => {
    setActiveSection('learning-modules')
    setActiveLesson(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectLesson = (id: LearningModuleId) => {
    setActiveLesson(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
          <motion.section
            id="overview"
            aria-labelledby="welcome-heading"
            className="relative isolate overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#101721] px-5 py-7 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:rounded-[32px] sm:px-9 sm:py-10 lg:px-12 lg:py-12"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_48%,rgba(30,126,150,0.2),transparent_48%),linear-gradient(115deg,rgba(17,26,38,0.98),rgba(14,18,29,0.9))]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-32 -z-10 h-80 w-80 rounded-full bg-cyan-400/[0.06] blur-3xl"
            />
            <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(250px,0.85fr)] lg:gap-8">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.16] bg-cyan-200/[0.055] px-3 py-1.5 text-[10px] font-semibold tracking-[0.13em] text-cyan-100/90 sm:text-[11px]">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]"
                    animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  YOUR DECENTRALIZED NETWORKING LAB
                </div>
                <h1
                  id="welcome-heading"
                  className="max-w-[700px] text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4rem]"
                >
                  Understand the network{' '}
                  <span className="bg-gradient-to-r from-cyan-100 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                    beneath the network.
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-[13px] leading-7 text-slate-400 sm:text-[15px] sm:leading-7">
                  A guided space to explore the building blocks of decentralized
                  networking, one concept at a time.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
                  <a
                    className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-200 px-4 py-2.5 text-[13px] font-semibold text-[#07131a] shadow-[0_8px_24px_rgba(34,211,238,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-100 hover:shadow-[0_12px_28px_rgba(34,211,238,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:px-5"
                    href="#learning-modules"
                    onClick={() => handleNavigate('learning-modules')}
                  >
                    Explore modules
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.015] px-4 py-2.5 text-[13px] font-medium text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.17] hover:bg-white/[0.045] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:px-5"
                    href="#network-simulator"
                    onClick={() => handleNavigate('network-simulator')}
                  >
                    Meet the simulator
                    <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                  </a>
                </div>
              </div>
              <div className="mx-auto -mb-5 w-full max-w-[175px] sm:max-w-[210px] lg:mb-0 lg:max-w-[320px]">
                <NetworkIllustration />
              </div>
            </div>
          </motion.section>

          <section aria-label="Learning overview" className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-3.5 xl:grid-cols-4">
            <MetricCard
              index={0}
              icon={BookOpen}
              label="Learning modules"
              value={String(modules.length).padStart(2, '0')}
              detail="Curated concept paths"
              tone="cyan"
            />
            <MetricCard
              index={1}
              icon={CircleDot}
              label="Lessons completed"
              value={String(completedCount).padStart(2, '0')}
              detail="Confirmed learning progress"
              tone="violet"
            />
            <MetricCard
              index={2}
              icon={Check}
              label="Ready to explore"
              value={String(modulesReadyToExplore).padStart(2, '0')}
              detail="New ideas to discover"
              tone="blue"
            />
            <MetricCard
              index={3}
              icon={Network}
              label="Network simulator"
              value="Soon"
              detail="Interactive lab in the works"
              tone="mint"
            />
          </section>

          <div className="mt-11 grid items-start gap-7 xl:grid-cols-[minmax(0,1.6fr)_minmax(290px,0.8fr)]">
            <section id="learning-modules" aria-labelledby="modules-heading" className="scroll-mt-28">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
                    THE LEARNING PATH
                  </p>
                  <h2
                    id="modules-heading"
                    className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-[1.7rem]"
                  >
                    Explore the modules
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-400">
                    Start with the fundamentals, then follow your curiosity.
                  </p>
                </div>
                <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {modules.length} guided topics
                </span>
              </div>
              <div className="grid gap-3.5 md:grid-cols-2">
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
                    expanded={expandedModule === module.id}
                    onOpenLesson={() => openLesson(module.id)}
                    onToggle={() =>
                      setExpandedModule((current) =>
                        current === module.id ? null : module.id,
                      )
                    }
                  />
                ))}
              </div>
            </section>

            <aside className="space-y-4">
              <motion.section
                aria-labelledby="progress-heading"
                className="rounded-2xl border border-white/[0.08] bg-[#10141d] p-5 sm:p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.45, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                      YOUR MOMENTUM
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
                      <circle
                        cx="28"
                        cy="28"
                        r="23"
                        fill="none"
                        stroke="var(--diagram-cyan)"
                        strokeDasharray="144.5"
                        strokeDashoffset={144.5 * (1 - completedPercentage / 100)}
                        strokeLinecap="round"
                        strokeWidth="4"
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
                  learning modules. Keep building your network intuition.
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
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                    style={{ width: `${completedPercentage}%` }}
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

              <motion.section
                id="network-simulator"
                aria-labelledby="simulator-heading"
                className="scroll-mt-28 overflow-hidden rounded-2xl border border-violet-200/10 bg-[#12131d] p-5 sm:p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45, ease: 'easeOut' }}
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
            </aside>
          </div>

          <footer className="mt-12 flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>Optimum Network Lab</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              A learning environment for decentralized systems
            </span>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
