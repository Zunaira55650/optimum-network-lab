import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { DashboardSection } from '../DashboardNavigation'
import { profile, socialLinks } from '../../data/portfolioProfile'
import { premiumEase, revealDuration, revealStagger } from '../../motion'
import { OptimumMark } from './OptimumMark'

type PortfolioNavigationProps = {
  onNavigate: (section: DashboardSection) => void
}

function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string
  title: string
  description?: string
  titleId?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="portfolio-section-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduceMotion ? 0 : revealDuration,
        ease: premiumEase,
      }}
    >
      <p className="portfolio-eyebrow">{eyebrow}</p>
      <h2 className="portfolio-section-title" id={titleId}>
        {title.split(/\s+/).map((word, index, words) => (
          <motion.span
            className="portfolio-heading-word"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            key={`${word}-${index}`}
            transition={{
              duration: reduceMotion ? 0 : 0.48,
              delay: reduceMotion ? 0 : index * 0.045,
              ease: premiumEase,
            }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </h2>
      {description && <p className="portfolio-copy">{description}</p>}
    </motion.div>
  )
}

export function PortfolioHero({
  onNavigate,
}: PortfolioNavigationProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="overview"
      aria-labelledby="welcome-heading"
      className="portfolio-hero scroll-mt-28"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.72,
        ease: premiumEase,
      }}
    >
      <div aria-hidden="true" className="portfolio-hero-glow" />
      <div className="portfolio-hero-grid">
        <div className="portfolio-hero-copy">
          <motion.p
            className="portfolio-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.46,
              delay: reduceMotion ? 0 : 0.08,
              ease: premiumEase,
            }}
          >
            <span className="portfolio-eyebrow-mark" />
            OPTIMUM NETWORK LAB · INDEPENDENT LEARNING PROJECT
          </motion.p>
          <h1 id="welcome-heading" className="portfolio-title">
            <motion.span
              className="portfolio-title-line"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }
              }
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: reduceMotion ? 0 : 0.72,
                delay: reduceMotion ? 0 : 0.16,
                ease: premiumEase,
              }}
            >
              Optimum
            </motion.span>
            <motion.span
              className="portfolio-title-line portfolio-title-line-accent"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }
              }
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: reduceMotion ? 0 : 0.72,
                delay: reduceMotion ? 0 : 0.29,
                ease: premiumEase,
              }}
            >
              Network Lab
            </motion.span>
          </h1>
          <motion.p
            className="portfolio-role"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.48,
              delay: reduceMotion ? 0 : 0.42,
              ease: premiumEase,
            }}
          >
            A guided path through Optimum’s networking concepts.
          </motion.p>
          <motion.p
            className="portfolio-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.48,
              delay: reduceMotion ? 0 : 0.5,
              ease: premiumEase,
            }}
          >
            Follow how peer-to-peer foundations, GossipSub, mump2p, the Gateway,
            and downstream block streams fit together through lessons, quizzes,
            and interactive demonstrations.
          </motion.p>
          <motion.div
            className="portfolio-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.48,
              delay: reduceMotion ? 0 : 0.58,
              ease: premiumEase,
            }}
          >
            <a
              className="portfolio-button portfolio-button-primary"
              href="#learning-modules"
              onClick={() => onNavigate('learning-modules')}
            >
              Explore the modules
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              className="portfolio-button portfolio-button-secondary"
              href="#featured-project"
              onClick={() => onNavigate('featured-project')}
            >
              Why I built it
              <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="portfolio-portrait-column"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 24, scale: 0.96, clipPath: 'inset(4% 4% 0 4%)' }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0 0 0 0)',
          }}
          viewport={{ once: true, amount: 0.25 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.78,
            delay: reduceMotion ? 0 : 0.2,
            ease: premiumEase,
          }}
        >
          <div className="portfolio-portrait-orbit" aria-hidden="true" />
          <motion.div
            className="portfolio-portrait-caption"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reduceMotion ? 0 : 0.52,
              delay: reduceMotion ? 0 : 0.42,
              ease: premiumEase,
            }}
          >
            <span className="portfolio-caption-mark" />
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.title}</small>
            </span>
          </motion.div>
          <div className="portfolio-portrait-frame">
            <img
              alt="Zunaira"
              className="portfolio-portrait"
              height="400"
              src={profile.image}
              width="400"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export function AboutSection() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="about"
      aria-labelledby="about-heading"
      className="portfolio-section portfolio-about-supporting scroll-mt-28"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : revealDuration,
        ease: premiumEase,
      }}
    >
      <div className="portfolio-about-grid">
        <SectionHeading
          eyebrow="ABOUT THE BUILDER"
          title="A little about me."
          titleId="about-heading"
        />
        <motion.div
          aria-hidden="true"
          className="portfolio-about-connector"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.45 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduceMotion ? 0 : 0.72,
            delay: reduceMotion ? 0 : 0.12,
            ease: premiumEase,
          }}
        >
          <svg fill="none" stroke="currentColor" strokeLinecap="round" viewBox="0 0 72 24">
            <motion.path
              d="M1 12h63"
              pathLength="1"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                ease: premiumEase,
              }}
            />
            <path d="m57 5 7 7-7 7" />
            <circle cx="3" cy="12" r="2" fill="currentColor" />
          </svg>
        </motion.div>
        <div className="portfolio-about-copy portfolio-card">
          <span aria-hidden="true" className="portfolio-card-accent" />
          <p className="portfolio-about-text">
            {profile.name}
            <span className="portfolio-about-title"> · {profile.title}</span>
          </p>
          <p className="portfolio-copy">
            {profile.tagline}
          </p>
          <p className="portfolio-copy">
            Optimum Network Lab is my personal learning project for connecting
            the networking concepts and data paths described across the Optimum
            ecosystem.
          </p>
        </div>
      </div>
    </motion.section>
  )
}

export function FeaturedProjectSection({
  onNavigate,
}: PortfolioNavigationProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="featured-project"
      aria-labelledby="featured-project-heading"
      className="portfolio-section scroll-mt-28"
    >
      <motion.div
        className="portfolio-section-heading portfolio-project-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: reduceMotion ? 0 : revealDuration,
          ease: premiumEase,
        }}
      >
        <p className="portfolio-eyebrow">PROJECT STORY</p>
        <h2 id="featured-project-heading" className="portfolio-section-title">
          Why I built Optimum Network Lab
        </h2>
      </motion.div>

      <motion.article
        className="portfolio-feature-card"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: reduceMotion ? 0 : revealDuration,
          ease: premiumEase,
        }}
      >
        <div className="portfolio-feature-content">
          <motion.div
            className="portfolio-feature-brand"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduceMotion ? 0 : 0.54,
              ease: premiumEase,
            }}
          >
            <OptimumMark className="portfolio-feature-logo" />
            <span className="portfolio-feature-brand-copy">
              <span className="portfolio-feature-name">Optimum Network Lab</span>
              <span className="portfolio-project-label">
                INDEPENDENT EDUCATIONAL PROJECT
              </span>
            </span>
          </motion.div>
          <h3 className="portfolio-project-title">
            One path through connected network concepts.
          </h3>
          <p className="portfolio-copy portfolio-project-description">
            Optimum Network Lab is a learning guide to the Optimum ecosystem. I
            built it to connect the topics in one place: peer-to-peer
            foundations, GossipSub and RLNC, mump2p, the Gateway, Beacon Node
            integration, Signal, and the Consumer Block Stream.
          </p>
          <div className="portfolio-story-points">
            <div className="portfolio-story-point">
              <h4>The learning gap</h4>
              <p>
                These related ideas can be hard to follow as separate terms. The
                lab puts them into a guided path so visitors can trace how the
                components relate.
              </p>
            </div>
            <div className="portfolio-story-point">
              <h4>What visitors can explore</h4>
              <p>
                Nine modules pair explanations and examples with 72 quiz
                questions and nine interactive demonstrations. Lesson progress
                is saved in the browser.
              </p>
            </div>
          </div>
          <div className="portfolio-project-actions">
            <a
              className="portfolio-button portfolio-button-primary"
              href="#learning-modules"
              onClick={() => onNavigate('learning-modules')}
            >
              Explore the learning path
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              className="portfolio-text-link"
              href="https://github.com/Zunaira55650/optimum-network-lab"
              rel="noopener noreferrer"
              target="_blank"
            >
              View on GitHub
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="portfolio-project-visual">
          <div className="portfolio-visual-topline">
            <span>TOPICS IN THE LAB</span>
            <span className="portfolio-visual-count">09 MODULES</span>
          </div>
          <div className="portfolio-visual-title">
            <span>How the topics connect</span>
          </div>
          <div className="portfolio-module-list">
            {[
              'Optimum & P2P foundations',
              'GossipSub & network coding',
              'mump2p peer mesh',
              'Gateway & Beacon Node',
              'Signal & Consumer Block Stream',
            ].map((module, index) => (
              <motion.div
                className="portfolio-module-row"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                key={module}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: premiumEase,
                }}
                viewport={{ once: true, amount: 0.5 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="portfolio-module-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{module}</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </motion.div>
            ))}
          </div>
          <div className="portfolio-visual-footer">
            <span>9 modules</span>
            <span>72 quiz questions</span>
            <span>9 demos</span>
          </div>
        </div>
      </motion.article>
    </section>
  )
}

const projectHighlights = [
  {
    icon: BookOpen,
    number: '09',
    label: 'Learning modules',
    description: 'From peer-to-peer foundations to consumer block streams.',
  },
  {
    icon: CircleHelp,
    number: '72',
    label: 'Quiz questions',
    description: 'Checks for the concepts covered in each learning path.',
  },
  {
    icon: Sparkles,
    number: '09',
    label: 'Interactive demos',
    description: 'Interactive examples for exploring networking concepts.',
  },
]

export function ProjectHighlightsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="project-highlights"
      aria-labelledby="highlights-heading"
      className="portfolio-section scroll-mt-28"
    >
      <SectionHeading
        eyebrow="INSIDE THE LEARNING LAB"
        title="Three ways to work through the material."
        description="Read a module, check your understanding, or explore a concept in an interactive demo."
        titleId="highlights-heading"
      />
      <div className="portfolio-highlights-grid">
        {projectHighlights.map(
          ({ icon: Icon, number, label, description }, index) => (
            <motion.article
              key={label}
              aria-labelledby={`highlight-${index}`}
              className="portfolio-highlight-card"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : revealDuration,
                delay: reduceMotion ? 0 : index * revealStagger,
                ease: premiumEase,
              }}
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
            >
              <div className="portfolio-highlight-top">
                <span className="portfolio-highlight-icon">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="portfolio-highlight-number">{number}</span>
              </div>
              <h3 id={`highlight-${index}`} className="portfolio-highlight-title">
                {label}
              </h3>
              <p className="portfolio-copy">{description}</p>
            </motion.article>
          ),
        )}
      </div>
    </section>
  )
}

export function ContactSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="portfolio-section portfolio-contact-section scroll-mt-28"
    >
      <motion.div
        className="portfolio-contact-panel"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduceMotion ? 0 : revealDuration,
          ease: premiumEase,
        }}
      >
        <div className="portfolio-contact-copy">
          <p className="portfolio-eyebrow">SOCIALS & CONTACT</p>
          <h2 id="contact-heading" className="portfolio-section-title">
            Find me online.
          </h2>
          <p className="portfolio-copy">
            LinkedIn, GitHub, X, and Discord.
          </p>
        </div>
        <div className="portfolio-contact-links">
          {socialLinks.map(({ label, href, mark }, index) => (
            <motion.a
              key={label}
              className="portfolio-contact-link"
              href={href}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              rel="noopener noreferrer"
              target="_blank"
              transition={{
                duration: reduceMotion ? 0 : 0.48,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: premiumEase,
              }}
              viewport={{ once: true, amount: 0.4 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="portfolio-contact-mark">{mark}</span>
              <span>{label}</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </motion.a>
          ))}
          <div className="portfolio-contact-link portfolio-discord">
            <span className="portfolio-contact-mark">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
            </span>
            <span>
              <strong>Discord</strong>
              <small>{profile.discord}</small>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
