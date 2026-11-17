import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  Network,
} from 'lucide-react'
import { learningModuleOrder } from '../data/learningModules'
import { ThemeToggle, type Theme } from './ThemeToggle'

export type DashboardSection =
  | 'overview'
  | 'learning-modules'
  | 'network-simulator'

type NavigationItem = {
  id: DashboardSection
  label: string
  mobileLabel: string
  icon: LucideIcon
}

const navigationItems: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    mobileLabel: 'Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'learning-modules',
    label: 'Learning modules',
    mobileLabel: 'Modules',
    icon: BookOpen,
  },
  {
    id: 'network-simulator',
    label: 'Network simulator',
    mobileLabel: 'Simulator',
    icon: Network,
  },
]

type NavigationProps = {
  activeSection: DashboardSection
  completedCount?: number
  onNavigate: (section: DashboardSection) => void
}

type ThemeToggleProps = {
  theme: Theme
  themeStorageError: boolean
  onToggleTheme: () => void
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-cyan-100/15 bg-gradient-to-br from-cyan-200/15 to-blue-300/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <Network className="h-[19px] w-[19px] text-cyan-100" strokeWidth={1.8} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#11151c] bg-cyan-200" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold tracking-[-0.02em] text-white">
          Optimum Network Lab
        </p>
        {!compact && (
          <p className="mt-0.5 text-[11px] tracking-wide text-slate-500">
            DECENTRALIZED SYSTEMS
          </p>
        )}
      </div>
    </div>
  )
}

function NavLinks({
  activeSection,
  onNavigate,
  mobile = false,
}: NavigationProps & { mobile?: boolean }) {
  return (
    <nav
      aria-label={mobile ? 'Mobile navigation' : 'Primary navigation'}
      className={
        mobile
          ? 'flex min-w-max items-center gap-1.5'
          : 'flex flex-col gap-1'
      }
    >
      {navigationItems.map(({ id, label, mobileLabel, icon: Icon }) => {
        const active = activeSection === id
        return (
          <a
            key={id}
            aria-current={active ? 'page' : undefined}
            className={
              mobile
                ? `inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-medium transition ${
                    active
                      ? 'bg-cyan-200/[0.1] text-cyan-100'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`
                : `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition ${
                    active
                      ? 'border border-cyan-100/[0.08] bg-cyan-100/[0.07] text-cyan-100 shadow-[inset_2px_0_0_#67e8f9]'
                      : 'border border-transparent text-slate-400 hover:bg-white/[0.035] hover:text-slate-200'
                  }`
            }
            href={`#${id}`}
            onClick={() => onNavigate(id)}
          >
            <Icon
              aria-hidden="true"
              className={
                mobile
                  ? 'h-4 w-4'
                  : `h-[17px] w-[17px] ${
                      active
                        ? 'text-cyan-200'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`
              }
              strokeWidth={1.8}
            />
            <span>{mobile ? mobileLabel : label}</span>
            {!mobile && active && (
              <ChevronRight className="ml-auto h-4 w-4 text-cyan-100/50" />
            )}
          </a>
        )
      })}
    </nav>
  )
}

export function DashboardSidebar({
  activeSection,
  completedCount = 0,
  onNavigate,
}: NavigationProps) {
  const completedPercentage = Math.round(
    (completedCount / learningModuleOrder.length) * 100,
  )

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-white/[0.07] bg-[#0b0e15] px-4 pb-5 pt-6 lg:flex">
      <a
        aria-label="Optimum Network Lab overview"
        className="mb-10 px-2"
        href="#overview"
        onClick={() => onNavigate('overview')}
      >
        <BrandMark />
      </a>

      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-600">
        Workspace
      </p>
      <NavLinks activeSection={activeSection} onNavigate={onNavigate} />

      <div className="mt-9">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-600">
          Your learning path
        </p>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-300">
              Foundations
            </span>
            <span className="text-[11px] text-slate-500">
              {completedCount} / {learningModuleOrder.length}
            </span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
              style={{ width: `${completedPercentage}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11px] leading-5 text-slate-500">
            {completedPercentage}% complete. One step at a time.
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-white/[0.07] pt-4">
        <a
          className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-xs text-slate-500 transition hover:bg-white/[0.035] hover:text-slate-300"
          href="#overview"
          onClick={() => onNavigate('overview')}
        >
          <CircleHelp className="h-4 w-4" strokeWidth={1.8} />
          About the lab
        </a>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-[10px] font-semibold text-slate-200">
            ON
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-300">
              Learning workspace
            </p>
            <p className="mt-0.5 text-[10px] text-slate-600">Self-paced</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export function DashboardTopBar({
  activeSection,
  onNavigate,
  theme,
  themeStorageError,
  onToggleTheme,
}: NavigationProps & ThemeToggleProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#090c13]/85 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between gap-4">
        <a
          aria-label="Optimum Network Lab overview"
          className="lg:hidden"
          href="#overview"
          onClick={() => onNavigate('overview')}
        >
          <BrandMark compact />
        </a>
        <div className="hidden min-w-0 items-center gap-3 lg:flex">
          <BrandMark compact />
          <span aria-hidden="true" className="h-5 w-px bg-white/10" />
          <span className="truncate text-sm text-slate-400">
            {activeSection === 'overview'
              ? 'Learning dashboard'
              : sectionTitles[activeSection]}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle
            theme={theme}
            storageError={themeStorageError}
            onToggle={onToggleTheme}
          />
          <span className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Learning workspace
          </span>
          <div
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#171c26] text-[10px] font-semibold tracking-wide text-slate-300"
          >
            ON
          </div>
        </div>
      </div>
      <div className="hide-scrollbar -mx-4 overflow-x-auto border-t border-white/[0.05] px-3 py-2 lg:hidden">
        <NavLinks
          activeSection={activeSection}
          onNavigate={onNavigate}
          mobile
        />
      </div>
    </header>
  )
}

const sectionTitles: Record<DashboardSection, string> = {
  overview: 'Overview',
  'learning-modules': 'Learning modules',
  'network-simulator': 'Network simulator',
}
