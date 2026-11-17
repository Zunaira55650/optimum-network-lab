export function OptimumMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`optimum-mark${className ? ` ${className}` : ''}`}
      fill="none"
      focusable="false"
      viewBox="0 0 36 36"
    >
      <path
        className="optimum-mark-route"
        d="M7 18h8m0 0 7.5-7.5M15 18l7.5 7.5M15 18h7.5m0-7.5H30m-7.5 7.5H30m-7.5 7.5H30"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <rect
        className="optimum-mark-node optimum-mark-node-source"
        height="6"
        rx="2"
        width="6"
        x="3"
        y="15"
      />
      <circle className="optimum-mark-node optimum-mark-node-hub" cx="15" cy="18" r="2.4" />
      <rect
        className="optimum-mark-node"
        height="5"
        rx="1.8"
        width="5"
        x="28"
        y="8"
      />
      <rect
        className="optimum-mark-node"
        height="5"
        rx="1.8"
        width="5"
        x="28"
        y="15.5"
      />
      <rect
        className="optimum-mark-node"
        height="5"
        rx="1.8"
        width="5"
        x="28"
        y="23"
      />
    </svg>
  )
}
