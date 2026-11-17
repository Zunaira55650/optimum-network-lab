import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Network,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { learningModuleOrder } from '../data/learningModules'
import { profile, socialLinks } from '../data/portfolioProfile'
import { navigationSpring, premiumEase } from '../motion'
import { OptimumMark } from './portfolio/OptimumMark'
import { ThemeToggle, type Theme } from './ThemeToggle'

export type DashboardSection =
  | 'overview'
  | 'about'
  | 'featured-project'
  | 'learning-modules'
  | 'project-highlights'
  | 'contact'
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
    label: 'Home',
    mobileLabel: 'Home',
    icon: LayoutDashboard,
  },
  {
    id: 'featured-project',
    label: 'Featured project',
    mobileLabel: 'Project',
    icon: BriefcaseBusiness,
  },
  {
    id: 'about',
    label: 'About me',
    mobileLabel: 'About',
    icon: UserRound,
  },
  {
    id: 'learning-modules',
    label: 'Learning path',
    mobileLabel: 'Learning',
    icon: BookOpen,
  },
  {
    id: 'project-highlights',
    label: 'Project highlights',
    mobileLabel: 'Highlights',
    icon: Sparkles,
  },
  {
    id: 'contact',
    label: 'Socials & contact',
    mobileLabel: 'Contact',
    icon: Mail,
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
    <div
      className={`portfolio-brand-lockup${compact ? ' portfolio-brand-lockup--compact' : ''}`}
    >
      <OptimumMark className="portfolio-brand-symbol" />
      <div className="min-w-0">
        <span className="portfolio-brand-name">Optimum Network Lab</span>
        {!compact && (
          <p className="portfolio-brand-caption">
            INDEPENDENT LEARNING PROJECT
          </p>
        )}
      </div>
    </div>
  )
}

function ProfileMenu({
  onNavigate,
  placement,
}: {
  onNavigate: (section: DashboardSection) => void
  placement: 'above' | 'below'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = `profile-menu-${placement}`

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        !(event.target instanceof Node) ||
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Open ${profile.name}'s profile menu`}
        className={`profile-menu-trigger ${
          placement === 'above'
            ? 'profile-menu-trigger--sidebar'
            : 'profile-menu-trigger--compact'
        }`}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true" className="profile-menu-trigger-mark">
          Z
        </span>
        {placement === 'above' && (
          <span className="min-w-0 text-left">
            <span className="block truncate text-xs font-medium">
              {profile.name}
            </span>
            <span className="mt-0.5 block text-[10px] text-slate-500">
              Profile & links
            </span>
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-labelledby={`profile-menu-title-${placement}`}
            className={`profile-menu profile-menu--${placement}`}
            id={menuId}
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.985 }}
            style={{
              transformOrigin:
                placement === 'above' ? 'bottom left' : 'top right',
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: premiumEase,
            }}
            role="region"
          >
            <div className="profile-menu-person">
              <img alt="" src={profile.image} />
              <div className="min-w-0">
                <p
                  className="truncate text-sm font-semibold"
                  id={`profile-menu-title-${placement}`}
                >
                  {profile.name}
                </p>
                <div className="profile-menu-brand">
                  <OptimumMark className="profile-menu-brand-symbol" />
                  <span>Optimum Network Lab</span>
                </div>
              </div>
            </div>
            <a
              className="profile-menu-about"
              href="#about"
              onClick={() => {
                onNavigate('about')
                setIsOpen(false)
              }}
            >
              <UserRound aria-hidden="true" className="h-4 w-4" />
              About me
              <ChevronRight aria-hidden="true" className="ml-auto h-4 w-4" />
            </a>
            <div className="profile-menu-socials">
              <p className="profile-menu-label">SOCIAL PROFILES</p>
              {socialLinks.map(({ label, href, mark }) => (
                <a
                  key={label}
                  className="profile-menu-social-link"
                  href={href}
                  onClick={() => setIsOpen(false)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    aria-hidden="true"
                    className="profile-menu-social-mark"
                  >
                    {mark}
                  </span>
                  <span>{label}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto h-3.5 w-3.5"
                  />
                </a>
              ))}
              <div className="profile-menu-discord">
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                <span>Discord</span>
                <span className="ml-auto text-[11px] text-slate-500">
                  {profile.discord}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavLinks({
  activeSection,
  onNavigate,
  mobile = false,
}: NavigationProps & { mobile?: boolean }) {
  const reduceMotion = useReducedMotion()

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
                ? `navigation-link relative isolate inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-medium transition ${
                    active
                      ? 'text-cyan-100'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`
                : `navigation-link group relative isolate flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition ${
                    active
                      ? 'text-cyan-100'
                      : 'border border-transparent text-slate-400 hover:bg-white/[0.035] hover:text-slate-200'
                  }`
            }
            href={`#${id}`}
            onClick={() => onNavigate(id)}
          >
            {active && (
              <motion.span
                aria-hidden="true"
                className="navigation-active-marker"
                layoutId={`active-navigation-${mobile ? 'mobile' : 'desktop'}`}
                transition={reduceMotion ? { duration: 0 } : navigationSpring}
              />
            )}
            <Icon
              aria-hidden="true"
              className={
                mobile
                  ? 'h-4 w-4'
                  : `relative z-10 h-[17px] w-[17px] ${
                      active
                        ? 'text-cyan-200'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`
              }
              strokeWidth={1.8}
            />
            <span className="relative z-10">{mobile ? mobileLabel : label}</span>
            {!mobile && active && (
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                initial={reduceMotion ? false : { opacity: 0, x: -5 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: premiumEase }}
                className="relative z-10 ml-auto flex"
              >
                <ChevronRight className="h-4 w-4 text-cyan-100/50" />
              </motion.span>
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
  const reduceMotion = useReducedMotion()
  const completedPercentage = Math.round(
    (completedCount / learningModuleOrder.length) * 100,
  )

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col overflow-y-auto border-r border-white/[0.07] bg-[#0b0e15] px-4 pb-5 pt-6 lg:flex">
      <a
        aria-label="Optimum Network Lab overview"
        className="mb-10 px-2"
        href="#overview"
        onClick={() => onNavigate('overview')}
      >
        <BrandMark />
      </a>

      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-600">
        Explore
      </p>
      <NavLinks activeSection={activeSection} onNavigate={onNavigate} />

      <div className="mt-9">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-600">
          Learning progress
        </p>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-300">
              Learning modules
            </span>
            <span className="text-[11px] text-slate-500">
              {completedCount} / {learningModuleOrder.length}
            </span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: `${completedPercentage}%` }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: premiumEase,
              }}
            />
          </div>
          <p className="mt-2.5 text-[11px] leading-5 text-slate-500">
            {completedPercentage}% of modules complete.
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-white/[0.07] pt-4">
        <ProfileMenu onNavigate={onNavigate} placement="above" />
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
          <span className="truncate text-sm font-semibold text-slate-200">
            {sectionTitles[activeSection]}
          </span>
          <span aria-hidden="true" className="h-4 w-px bg-white/10" />
          <span className="topbar-project-brand">
            <OptimumMark className="topbar-project-symbol" />
            <span>Optimum Network Lab</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle
            theme={theme}
            storageError={themeStorageError}
            onToggle={onToggleTheme}
          />
          <ProfileMenu onNavigate={onNavigate} placement="below" />
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
  about: 'About me',
  'featured-project': 'Featured project',
  'learning-modules': 'Learning path',
  'project-highlights': 'Project highlights',
  contact: 'Socials & contact',
  'network-simulator': 'Network simulator',
}
