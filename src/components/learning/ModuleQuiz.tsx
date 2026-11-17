import { useState } from 'react'
import {
  ArrowRight,
  Check,
  Lightbulb,
  RotateCcw,
  Trophy,
  X,
} from 'lucide-react'
import type { LearningModuleId } from '../../data/learningModules'
import {
  learningModuleOrder,
  learningModules,
} from '../../data/learningModules'
import { learningQuizzes } from '../../data/learningQuizzes'

type QuizResult = {
  latestScore: number
  bestScore: number
  total: number
  attempts: number
  completedAt: string
}

type QuizProgress = Partial<Record<LearningModuleId, QuizResult>>

const storageKey = 'optimum-network-lab.quiz-progress.v1'

const quizCardClass =
  'rounded-2xl border border-white/[0.075] bg-[#10141c] p-5 shadow-[0_8px_28px_rgba(0,0,0,0.12)] sm:rounded-[20px] sm:p-6'

const primaryButton =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-cyan-200 px-4 text-xs font-semibold text-[#07131a] transition hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200'

const secondaryButton =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseQuizProgress(value: unknown): QuizProgress {
  if (!isRecord(value)) {
    throw new Error('Stored quiz progress must be an object.')
  }

  const progress: QuizProgress = {}
  for (const [key, valueForModule] of Object.entries(value)) {
    const moduleId = learningModuleOrder.find((id) => id === key)
    if (!moduleId) {
      continue
    }

    if (!isRecord(valueForModule)) {
      throw new Error('Stored quiz result is invalid.')
    }

    const { latestScore, bestScore, attempts, completedAt } = valueForModule
    const resultTotal = valueForModule.total ?? 5
    if (
      !Number.isInteger(resultTotal) ||
      typeof resultTotal !== 'number' ||
      resultTotal < 1 ||
      !Number.isInteger(latestScore) ||
      typeof latestScore !== 'number' ||
      latestScore < 0 ||
      latestScore > resultTotal ||
      !Number.isInteger(bestScore) ||
      typeof bestScore !== 'number' ||
      bestScore < latestScore ||
      bestScore > resultTotal ||
      !Number.isInteger(attempts) ||
      typeof attempts !== 'number' ||
      attempts < 1 ||
      typeof completedAt !== 'string' ||
      Number.isNaN(Date.parse(completedAt))
    ) {
      throw new Error('Stored quiz result is invalid.')
    }

    progress[moduleId] = {
      latestScore,
      bestScore,
      total: resultTotal,
      attempts,
      completedAt,
    }
  }

  return progress
}

function loadQuizProgress(): {
  progress: QuizProgress
  storageError: boolean
} {
  try {
    const storedProgress = window.localStorage.getItem(storageKey)
    return {
      progress: storedProgress
        ? parseQuizProgress(JSON.parse(storedProgress))
        : {},
      storageError: false,
    }
  } catch {
    return { progress: {}, storageError: true }
  }
}

export function ModuleQuiz({ moduleId }: { moduleId: LearningModuleId }) {
  const questions = learningQuizzes[moduleId]
  const [savedProgress, setSavedProgress] = useState(loadQuizProgress)
  const { progress, storageError } = savedProgress
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [hintVisible, setHintVisible] = useState(false)
  const [complete, setComplete] = useState(false)

  const question = questions[questionIndex]
  const previousResult = progress[moduleId]
  const percentage = Math.round((score / questions.length) * 100)
  const completedCount = learningModuleOrder.filter(
    (id) => progress[id] !== undefined,
  ).length

  const recordCompletion = () => {
    const previous = progress[moduleId]
    const result: QuizResult = {
      latestScore: score,
      bestScore:
        previous?.total === questions.length
          ? Math.max(previous.bestScore, score)
          : score,
      total: questions.length,
      attempts: (previous?.attempts ?? 0) + 1,
      completedAt: new Date().toISOString(),
    }
    const nextProgress: QuizProgress = { ...progress, [moduleId]: result }

    let failedToSave = false
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextProgress))
    } catch {
      failedToSave = true
    }
    setSavedProgress({ progress: nextProgress, storageError: failedToSave })
  }

  const selectOption = (optionIndex: number) => {
    if (selectedOption !== null) {
      return
    }
    setSelectedOption(optionIndex)
    if (optionIndex === question.correctOption) {
      setScore((currentScore) => currentScore + 1)
    }
  }

  const advanceQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setComplete(true)
      recordCompletion()
      return
    }

    setQuestionIndex((currentIndex) => currentIndex + 1)
    setSelectedOption(null)
    setHintVisible(false)
  }

  const retryQuiz = () => {
    setQuestionIndex(0)
    setSelectedOption(null)
    setScore(0)
    setHintVisible(false)
    setComplete(false)
  }

  return (
    <section aria-labelledby="quiz-heading" className="mt-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/70">
            CHECK WHAT YOU KNOW
          </p>
          <h2
            id="quiz-heading"
            className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-[1.7rem]"
          >
            Quick knowledge check
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">
            {questions.length} questions. Take your time, and ask for a hint
            whenever you need one.
          </p>
        </div>
        <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
          <Trophy aria-hidden="true" className="h-3.5 w-3.5 text-amber-200" />
          {completedCount} of {learningModuleOrder.length} quizzes completed
        </span>
      </div>

      {storageError && (
        <p
          className="mb-4 rounded-xl border border-amber-200/15 bg-amber-200/[0.04] px-4 py-3 text-xs leading-5 text-amber-100/80"
          role="status"
        >
          We couldn’t access saved quiz scores in this browser. You can still
          take the quiz, but your progress may not persist.
        </p>
      )}

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(250px,0.75fr)]">
        <div className={quizCardClass}>
          {complete ? (
            <div className="py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-amber-200/10 bg-amber-200/[0.06] text-amber-100">
                <Trophy aria-hidden="true" className="h-5 w-5" />
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-200/70">
                QUIZ COMPLETE
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {score === questions.length
                  ? 'Perfect run!'
                  : score >= Math.ceil(questions.length * 0.6)
                    ? 'Nice work!'
                    : 'Good start!'}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                {score === questions.length
                  ? 'You got every question right. You really know this topic.'
                  : `You finished all ${questions.length} questions. Review the lesson or give it another try to improve your score.`}
              </p>
              <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
                <p className="text-4xl font-semibold tracking-[-0.06em] text-white">
                  {score}
                  <span className="text-xl text-slate-500">
                    {' '}
                    / {questions.length}
                  </span>
                </p>
                <p className="pb-1 text-sm font-medium text-cyan-100">
                  {percentage}%
                </p>
              </div>
              <div
                aria-label={`Quiz score ${percentage}%`}
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
                role="img"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-[width]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {previousResult && (
                <p className="mt-3 text-xs text-slate-500">
                  Best so far: {previousResult.bestScore} /{' '}
                  {previousResult.total}
                </p>
              )}
              <button
                className={`${primaryButton} mt-5`}
                onClick={retryQuiz}
                type="button"
              >
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Retry quiz
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  QUESTION {questionIndex + 1} OF {questions.length}
                </p>
                <p className="text-xs tabular-nums text-slate-500">
                  Score so far: {score} / {questions.length}
                </p>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-cyan-200 transition-[width]"
                  style={{
                    width: `${((questionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
              {previousResult && (
                <p className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] text-slate-400">
                  Last time: {previousResult.latestScore} / {previousResult.total}
                  {' · '}Best: {previousResult.bestScore} / {previousResult.total}
                  {' · '}{previousResult.attempts} attempt
                  {previousResult.attempts === 1 ? '' : 's'}
                </p>
              )}

              <h3 className="mt-5 text-base font-semibold leading-6 text-white sm:text-lg">
                {question.prompt}
              </h3>
              <div className="mt-4 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === question.correctOption
                  const isSelected = optionIndex === selectedOption
                  const feedbackStyle =
                    selectedOption === null
                      ? 'border-white/[0.07] bg-white/[0.02] text-slate-300 hover:border-white/[0.14] hover:bg-white/[0.045]'
                      : isCorrect
                        ? 'border-emerald-200/20 bg-emerald-200/[0.055] text-emerald-50'
                        : isSelected
                          ? 'border-rose-200/20 bg-rose-200/[0.05] text-rose-50'
                          : 'border-white/[0.05] bg-white/[0.015] text-slate-500'

                  return (
                    <button
                      key={option}
                      aria-pressed={isSelected}
                      className={`flex min-h-11 items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-xs leading-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${feedbackStyle}`}
                      disabled={selectedOption !== null}
                      onClick={() => selectOption(optionIndex)}
                      type="button"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-black/10 font-mono text-[10px] text-slate-500">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selectedOption !== null && isCorrect && (
                        <Check
                          aria-label="Correct answer"
                          className="h-4 w-4 shrink-0 text-emerald-200"
                        />
                      )}
                      {selectedOption !== null && isSelected && !isCorrect && (
                        <X
                          aria-label="Your answer"
                          className="h-4 w-4 shrink-0 text-rose-200"
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {selectedOption !== null && (
                <div
                  aria-live="polite"
                  className={`mt-4 rounded-xl border p-3.5 ${
                    selectedOption === question.correctOption
                      ? 'border-emerald-200/15 bg-emerald-200/[0.04]'
                      : 'border-amber-200/15 bg-amber-200/[0.035]'
                  }`}
                  role="status"
                >
                  <p
                    className={`text-xs font-semibold ${
                      selectedOption === question.correctOption
                        ? 'text-emerald-100'
                        : 'text-amber-100'
                    }`}
                  >
                    {selectedOption === question.correctOption
                      ? 'That’s right!'
                      : 'Not quite — here’s the idea.'}
                  </p>
                  {selectedOption !== question.correctOption && (
                    <p className="mt-1.5 text-xs leading-5 text-slate-300">
                      The correct answer is:{' '}
                      <span className="font-medium text-white">
                        {question.options[question.correctOption]}
                      </span>
                    </p>
                  )}
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">
                    {question.explanation}
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <button
                    aria-expanded={hintVisible}
                    className={`${secondaryButton} min-h-9 px-3 text-[11px]`}
                    onClick={() => setHintVisible((visible) => !visible)}
                    type="button"
                  >
                    <Lightbulb
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-amber-200"
                    />
                    {hintVisible ? 'Hide hint' : 'Show hint'}
                  </button>
                  {hintVisible && (
                    <p className="mt-2 max-w-md text-xs leading-5 text-amber-100/75">
                      {question.hint}
                    </p>
                  )}
                </div>
                {selectedOption !== null && (
                  <button
                    className={primaryButton}
                    onClick={advanceQuestion}
                    type="button"
                  >
                    {questionIndex === questions.length - 1
                      ? 'See my score'
                      : 'Next question'}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <aside
          aria-label="Quiz results across all modules"
          className={quizCardClass}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                YOUR QUIZ TRACKER
              </p>
              <h3 className="mt-1 text-sm font-semibold text-white">
                Module scores
              </h3>
            </div>
            <span className="text-xs tabular-nums text-cyan-100">
              {completedCount} / {learningModuleOrder.length}
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {learningModuleOrder.map((id) => {
              const result = progress[id]
              return (
                <li
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.055] bg-white/[0.018] px-3 py-2.5"
                  key={id}
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-300">
                      {learningModules[id].navTitle}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-600">
                      {result
                        ? `Best ${result.bestScore} / ${result.total} · ${Math.round((result.bestScore / result.total) * 100)}%`
                        : 'Not completed yet'}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs tabular-nums ${
                      result ? 'text-cyan-100' : 'text-slate-600'
                    }`}
                  >
                    {result ? `${result.latestScore} / ${result.total}` : '—'}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-[10px] leading-4 text-slate-600">
            Scores are saved in this browser. Your latest and best result are
            kept for each module.
          </p>
        </aside>
      </div>
    </section>
  )
}
