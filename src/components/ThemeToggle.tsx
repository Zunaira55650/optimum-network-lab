import { Moon, Sun } from 'lucide-react'

export type Theme = 'dark' | 'light'

export function ThemeToggle({
  theme,
  storageError,
  onToggle,
}: {
  theme: Theme
  storageError: boolean
  onToggle: () => void
}) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <>
      <button
        aria-label={`Switch to ${nextTheme} mode`}
        aria-pressed={theme === 'light'}
        className="theme-toggle"
        onClick={onToggle}
        title={`Switch to ${nextTheme} mode`}
        type="button"
      >
        {theme === 'dark' ? (
          <Sun aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Moon aria-hidden="true" className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </span>
      </button>
      {storageError && (
        <span className="sr-only" role="status">
          The theme preference could not be saved in this browser.
        </span>
      )}
    </>
  )
}
