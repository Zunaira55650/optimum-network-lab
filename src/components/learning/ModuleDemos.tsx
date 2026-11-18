import { useState } from 'react'
import {
  ArrowLeftRight,
  ArrowRight,
  CircleDot,
  Network,
  Radio,
  RotateCcw,
  Send,
  Server,
  Share2,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { LearningDemoType } from '../../data/learningModules'

const primaryButton =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-cyan-200 px-4 text-xs font-semibold text-[#07131a] transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200'
const secondaryButton =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200'

function PeerToPeerDemo() {
  const reduceMotion = useReducedMotion()
  const [discovered, setDiscovered] = useState(false)
  const [connected, setConnected] = useState(false)
  const [messageReceived, setMessageReceived] = useState(false)

  const toggleConnection = () => {
    setConnected((current) => !current)
    setMessageReceived(false)
  }

  const reset = () => {
    setDiscovered(false)
    setConnected(false)
    setMessageReceived(false)
  }

  return (
    <div
      aria-label="Peer-to-peer network diagrams and demonstration"
      className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <section aria-labelledby="p2p-patterns-title">
        <div className="mb-3">
          <h3
            className="text-xs font-semibold text-slate-200"
            id="p2p-patterns-title"
          >
            Two ways to arrange communication
          </h3>
          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            These are simplified examples. A P2P network can still use
            supporting services for discovery.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Centralized example
            </p>
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5">
              <div className="flex min-h-11 items-center justify-center rounded-lg border border-white/[0.08] bg-[#171d27] px-1 text-center text-[10px] font-medium text-slate-300">
                Client A
              </div>
              <ArrowRight
                aria-hidden="true"
                className="h-3 w-3 text-slate-500"
              />
              <div className="flex min-h-11 items-center justify-center rounded-lg border border-white/[0.08] bg-[#171d27] px-1 text-center text-[10px] font-medium text-slate-300">
                <Server
                  aria-hidden="true"
                  className="mr-1 h-3 w-3 shrink-0 text-amber-200"
                />
                Server
              </div>
              <ArrowRight
                aria-hidden="true"
                className="h-3 w-3 text-slate-500"
              />
              <div className="flex min-h-11 items-center justify-center rounded-lg border border-white/[0.08] bg-[#171d27] px-1 text-center text-[10px] font-medium text-slate-300">
                Client B
              </div>
            </div>
            <p className="mt-2 text-[10px] leading-4 text-slate-500">
              The server is on the example message path.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              P2P example
            </p>
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5">
              {['Peer A', 'Peer B', 'Peer C'].map((label, index) => (
                <div key={label} className="contents">
                  <div className="flex min-h-11 items-center justify-center rounded-lg border border-cyan-200/10 bg-cyan-200/[0.035] px-1 text-center text-[10px] font-medium text-slate-300">
                    <CircleDot
                      aria-hidden="true"
                      className="mr-1 h-3 w-3 shrink-0 text-cyan-100"
                    />
                    {label}
                  </div>
                  {index < 2 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3 w-3 text-cyan-200/60"
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-4 text-slate-500">
              Peers connect to neighbors; the network need not be all-to-all.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="optimum-p2p-path-title">
        <h3
          className="mb-3 text-xs font-semibold text-slate-200"
          id="optimum-p2p-path-title"
        >
          Optimum’s Gateway and peer connections
        </h3>
        <div className="grid items-stretch gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)_auto_minmax(0,0.9fr)]">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
            <p className="text-[10px] font-semibold text-slate-300">
              Ethereum clients
            </p>
            <div className="mt-2 rounded-lg border border-dashed border-white/10 px-2 py-1.5 text-center text-[10px] text-slate-400">
              Validator Client
            </div>
            <div className="my-1 text-center text-[9px] text-slate-600">
              uses local API
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-[#171d27] px-2 py-1.5 text-center text-[10px] text-slate-300">
              Beacon Node
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              The Beacon Node is the Gateway’s CL P2P peer.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-center text-[9px] text-slate-500">
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 text-cyan-200/70 lg:rotate-0"
            />
            <span>CL libp2p</span>
          </div>

          <div className="rounded-xl border border-cyan-200/15 bg-cyan-200/[0.035] p-3">
            <p className="text-[10px] font-semibold text-cyan-100">
              Optimum Gateway
            </p>
            <div className="mt-2 space-y-1.5">
              <div className="rounded-lg border border-white/[0.08] bg-[#171d27] px-2 py-1.5 text-center text-[9px] text-slate-300">
                CL-facing libp2p host
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#171d27] px-2 py-1.5 text-center text-[9px] text-slate-300">
                Embedded mump2p host
              </div>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Bridges selected messages between the two sides.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-center text-[9px] text-slate-500">
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 text-violet-200/70 lg:rotate-0"
            />
            <span>mump2p</span>
          </div>

          <div className="rounded-xl border border-violet-200/15 bg-violet-200/[0.035] p-3">
            <p className="text-[10px] font-semibold text-violet-100">
              mump2p mesh
            </p>
            <div className="mt-2 rounded-lg border border-white/[0.08] bg-[#171d27] px-2 py-2 text-center text-[10px] text-slate-300">
              Other Gateways
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Gateway peers exchange mesh messages here.
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-dashed border-amber-200/15 bg-amber-200/[0.025] p-3">
          <p className="text-[10px] font-semibold text-amber-100/90">
            Supporting services — not on the block-message path
          </p>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">
            Bootstrap supports registration and peer discovery; Console supports
            operator workflows. They are separate from the Gateway-to-Gateway
            mump2p message route.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="peer-connection-demo-title"
        className="border-t border-white/[0.07] pt-4"
      >
        <div className="mb-3">
          <h3
            className="text-xs font-semibold text-slate-200"
            id="peer-connection-demo-title"
          >
            Try the steps: discover, connect, send
          </h3>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">
            This small state model is illustrative; it does not open a real
            network connection.
          </p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)] sm:gap-4">
          <div
            className={`rounded-xl border p-3 text-center transition-colors sm:p-4 ${
              connected
                ? 'border-cyan-200/20 bg-cyan-200/[0.045]'
                : 'border-white/[0.07] bg-white/[0.02]'
            }`}
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#171d27] text-cyan-100">
              <CircleDot aria-hidden="true" className="h-4 w-4" />
            </div>
            <p className="mt-2.5 text-xs font-semibold text-slate-200">Peer A</p>
            <p className="mt-1 text-[10px] text-slate-500">Participant</p>
          </div>

          <div className="relative flex h-14 items-center justify-center">
            <div
              className={`absolute h-px w-full ${
                connected
                  ? 'bg-cyan-200/45'
                  : discovered
                    ? 'border-t border-dashed border-cyan-200/30'
                    : 'border-t border-dashed border-slate-700'
              }`}
            />
            {connected && messageReceived && (
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,0.8)]"
                animate={
                  reduceMotion ? { left: '50%' } : { left: ['0%', '100%'] }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  ease: 'easeInOut',
                }}
              />
            )}
            <span className="relative z-0 rounded-full border border-white/[0.08] bg-[#0b0f17] px-2 py-1 text-center text-[9px] leading-3 text-slate-500">
              {connected
                ? 'connected'
                : discovered
                  ? 'address known'
                  : 'not discovered'}
            </span>
          </div>

          <div
            className={`rounded-xl border p-3 text-center transition-colors sm:p-4 ${
              messageReceived
                ? 'border-cyan-200/20 bg-cyan-200/[0.045]'
                : 'border-white/[0.07] bg-white/[0.02]'
            }`}
          >
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#171d27] text-violet-200">
              <CircleDot aria-hidden="true" className="h-4 w-4" />
            </div>
            <p className="mt-2.5 text-xs font-semibold text-slate-200">Peer B</p>
            <p className="mt-1 text-[10px] text-slate-500">
              {messageReceived
                ? 'Message received'
                : discovered
                  ? 'Address discovered'
                  : 'Not found yet'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={secondaryButton}
            disabled={discovered}
            onClick={() => setDiscovered(true)}
            type="button"
          >
            <Network aria-hidden="true" className="h-3.5 w-3.5" />
            {discovered ? 'Peer discovered' : 'Discover peer'}
          </button>
          <button
            className={secondaryButton}
            disabled={!discovered}
            onClick={toggleConnection}
            type="button"
          >
            <Share2 aria-hidden="true" className="h-3.5 w-3.5" />
            {connected ? 'Disconnect peers' : 'Connect peers'}
          </button>
          <button
            className={primaryButton}
            disabled={!connected}
            onClick={() => setMessageReceived(true)}
            type="button"
          >
            <Send aria-hidden="true" className="h-3.5 w-3.5" />
            Send a message
          </button>
          <button
            className={secondaryButton}
            disabled={!discovered && !connected && !messageReceived}
            onClick={reset}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            Reset demo
          </button>
        </div>
        <p aria-live="polite" className="mt-3 min-h-5 text-xs text-slate-400">
          {messageReceived
            ? 'The sample message reached Peer B over the open connection. The demo does not show network-wide forwarding.'
            : connected
              ? 'The peers are connected. A protocol can now carry a message.'
              : discovered
                ? 'Peer B’s address is known, but there is no live connection yet.'
                : 'First find a peer address. Discovery does not itself open a connection.'}
        </p>
      </section>
    </div>
  )
}

const optimumFlowNodes = [
  {
    label: 'Local Ethereum clients',
    detail: 'The Validator Client uses the Beacon Node; the Beacon Node peers with the Gateway.',
    icon: CircleDot,
  },
  {
    label: 'Optimum Gateway',
    detail: 'One process bridges the local CL gossip side and the mump2p side.',
    icon: Server,
  },
  {
    label: 'mump2p mesh',
    detail: 'Gateway nodes exchange messages as coded shards.',
    icon: Network,
  },
  {
    label: 'Other Gateways',
    detail: 'Validator-path peers bridge to local CL; stream-only peers serve consumers.',
    icon: Server,
  },
]

const optimumFlowStages = [
  'The Validator Client uses its Beacon Node for Ethereum duties. The Beacon Node—not the Validator Client—peers with the Optimum Gateway.',
  'The Gateway’s CL-facing libp2p host peers with the Beacon Node. Its bridge can carry selected consensus-layer messages both ways.',
  'The Gateway’s mump2p host exchanges coded shards with other Gateway nodes in the mesh.',
  'A validator-path Gateway republishes selected messages to its local CL gossip peers. A stream-only Gateway serves its configured consumers instead.',
]

function OptimumIntroductionDemo() {
  const [step, setStep] = useState(0)

  const advance = () => {
    setStep((current) =>
      current === optimumFlowNodes.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <div
      aria-label="Optimum architecture and message path demonstration"
      className="rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-100/70">
          Actual message path
        </p>
        <p className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
          <span aria-hidden="true" className="h-px w-5 bg-cyan-200/60" />
          Solid arrows show one example direction
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-4">
        {optimumFlowNodes.map(({ label, detail, icon: Icon }, index) => {
          const reached = index <= step

          return (
            <motion.div
              key={label}
              aria-current={index === step ? 'step' : undefined}
              className={`relative rounded-xl border p-3 transition-colors sm:p-3.5 ${
                reached
                  ? 'border-cyan-200/20 bg-cyan-200/[0.045]'
                  : 'border-white/[0.07] bg-white/[0.02]'
              }`}
              animate={{ opacity: reached ? 1 : 0.62, y: reached ? 0 : 2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-mono text-[9px] text-slate-600">
                STEP 0{index + 1}
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                    reached
                      ? 'border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-100'
                      : 'border-white/[0.08] bg-[#171d27] text-slate-500'
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <p className="text-xs font-semibold text-slate-200">{label}</p>
              </div>
              <p className="mt-2 min-h-10 text-[10px] leading-5 text-slate-500">
                {detail}
              </p>
              {index === 0 && (
                <div className="mt-3 space-y-1.5 text-center">
                  <div className="rounded-lg border border-dashed border-white/[0.09] bg-white/[0.015] px-2 py-1.5">
                    <p className="text-[10px] font-medium text-slate-300">
                      Validator Client
                    </p>
                    <p className="mt-0.5 text-[9px] text-slate-600">
                      uses the Beacon Node
                    </p>
                  </div>
                  <p aria-hidden="true" className="text-[9px] text-slate-600">
                    client API
                  </p>
                  <div className="rounded-lg border border-cyan-200/[0.12] bg-cyan-200/[0.025] px-2 py-1.5">
                    <p className="text-[10px] font-medium text-cyan-50">
                      Beacon Node
                    </p>
                    <p className="mt-0.5 text-[9px] text-slate-500">
                      CL gossip peer
                    </p>
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="mt-3 space-y-1.5 text-center">
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1.5 text-[9px] text-slate-400">
                    CL-facing libp2p host
                  </div>
                  <p className="text-[9px] font-medium text-cyan-100/70">
                    selected messages bridged both ways
                  </p>
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1.5 text-[9px] text-slate-400">
                    mump2p host
                  </div>
                </div>
              )}
              {index === 2 && (
                <p className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.015] px-2 py-1.5 text-center text-[9px] text-slate-500">
                  RLNC shard exchange
                </p>
              )}
              {index === 3 && (
                <p className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.015] px-2 py-1.5 text-center text-[9px] text-slate-500">
                  local CL peers or stream consumers, by mode
                </p>
              )}
              {index < optimumFlowNodes.length - 1 && (
                <>
                  <ArrowRight
                    aria-hidden="true"
                    className={`absolute -right-[13px] top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 lg:block ${
                      step > index ? 'text-cyan-200/60' : 'text-slate-700'
                    }`}
                  />
                  <ArrowRight
                    aria-hidden="true"
                    className={`mx-auto mt-2 h-4 w-4 rotate-90 lg:hidden ${
                      step > index ? 'text-cyan-200/60' : 'text-slate-700'
                    }`}
                  />
                </>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className={primaryButton} onClick={advance} type="button">
          {step === optimumFlowNodes.length - 1 ? 'Replay the flow' : 'Next step'}
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
        <button
          className={secondaryButton}
          disabled={step === 0}
          onClick={() => setStep(0)}
          type="button"
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-10 text-xs leading-5 text-slate-400">
        {optimumFlowStages[step]}
      </p>
      <div className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Supporting services — not a block-message hop
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-dashed border-white/[0.09] bg-black/10 px-2.5 py-2">
            <p className="text-[10px] font-medium text-slate-300">Console</p>
            <p className="mt-1 text-[9px] leading-4 text-slate-500">
              Operator enrollment and Signal setup/results
            </p>
          </div>
          <div className="rounded-lg border border-dashed border-white/[0.09] bg-black/10 px-2.5 py-2">
            <p className="text-[10px] font-medium text-slate-300">Bootstrap</p>
            <p className="mt-1 text-[9px] leading-4 text-slate-500">
              Gateway registration, peer discovery and fork-digest information
            </p>
          </div>
          <div className="rounded-lg border border-dashed border-white/[0.09] bg-black/10 px-2.5 py-2">
            <p className="text-[10px] font-medium text-slate-300">
              Gateway API key and telemetry
            </p>
            <p className="mt-1 text-[9px] leading-4 text-slate-500">
              Credentials support Gateway operation; telemetry reports health
              and metrics, not block payloads
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const gossipNodes = [
  { id: 'publisher', label: 'Publisher', detail: 'subscribed', x: 50, y: 112 },
  { id: 'mesh-a', label: 'Peer B', detail: 'in mesh', x: 150, y: 50 },
  { id: 'mesh-b', label: 'Peer C', detail: 'in mesh', x: 150, y: 175 },
  { id: 'mesh-c', label: 'Peer D', detail: 'in mesh', x: 260, y: 50 },
  { id: 'mesh-d', label: 'Peer E', detail: 'in mesh', x: 260, y: 175 },
  { id: 'joining-peer', label: 'Peer F', detail: 'joining', x: 365, y: 50 },
  { id: 'outside-mesh', label: 'Peer G', detail: 'outside mesh', x: 365, y: 175 },
]

const gossipLinks = [
  { from: 0, to: 1, kind: 'mesh' },
  { from: 0, to: 2, kind: 'mesh' },
  { from: 1, to: 2, kind: 'mesh' },
  { from: 1, to: 3, kind: 'mesh' },
  { from: 2, to: 4, kind: 'mesh' },
  { from: 3, to: 4, kind: 'mesh' },
  { from: 3, to: 5, kind: 'connection' },
  { from: 3, to: 5, kind: 'graft' },
  { from: 3, to: 5, kind: 'joined' },
  { from: 4, to: 6, kind: 'connection' },
  { from: 4, to: 6, kind: 'ihave' },
  { from: 6, to: 4, kind: 'iwant' },
  { from: 4, to: 6, kind: 'response' },
]

const gossipStages = [
  {
    title: '1. Start with one topic',
    detail:
      'Peers B–E are subscribed to weather/alerts and have a topic mesh. Peer G is also a topic peer, but is outside this full-message mesh.',
  },
  {
    title: '2. GRAFT adds a topic link',
    detail:
      'Peer F is already connected and subscribed. Peer D adds F to its mesh and sends GRAFT; if F is still subscribed, it adds D to its mesh too. GRAFT does not create the underlying network connection.',
  },
  {
    title: '3. Publish and forward the full message',
    detail:
      'The publisher sends a valid, new alert to its mesh neighbors. Each peer checks it and forwards it to its own mesh peers only if the message ID is new there.',
  },
  {
    title: '4. PRUNE removes a topic link',
    detail:
      'Peer F leaves weather/alerts and sends PRUNE to its mesh peers, which remove F from that topic mesh. The libp2p connection can remain open for other topics.',
  },
  {
    title: '5. IHAVE advertises an ID',
    detail:
      'Peer E tells the subscribed, off-mesh Peer G that it has recently seen an alert ID. IHAVE carries message IDs, not the full alert.',
  },
  {
    title: '6. IWANT requests the missing message',
    detail:
      'Peer G has not seen that ID, so it sends IWANT to ask Peer E for the message content.',
  },
  {
    title: '7. The cached message is returned',
    detail:
      'If Peer E still has the alert in its message cache, it can send the full message. If the cached copy has expired, this request cannot recover it.',
  },
  {
    title: '8. A duplicate arrives on another path',
    detail:
      'Peer C receives the same message ID again from a second route. Its seen-message cache lets it avoid treating that copy as new and forwarding it again.',
  },
  {
    title: '9. A mesh peer disconnects',
    detail:
      'Peer E goes offline and its links stop working. Heartbeat maintenance may find another known, eligible topic peer, but a replacement and successful delivery are not guaranteed.',
  },
]

function GossipSubDemo() {
  const [step, setStep] = useState(0)
  const isComplete = step === gossipStages.length - 1

  return (
    <div
      aria-label="GossipSub topic mesh and control-message demonstration"
      className="space-y-3 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/10 bg-violet-200/[0.045] px-3 py-1.5 text-[11px] font-medium text-violet-100">
          <Radio aria-hidden="true" className="h-3.5 w-3.5" />
          Topic · weather/alerts
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
          Step {step + 1} / {gossipStages.length}
        </span>
      </div>

      <svg
        aria-hidden="true"
        className="h-auto w-full"
        role="presentation"
        viewBox="0 0 420 245"
      >
        <defs>
          <marker
            id="gossipsub-arrow-amber"
            markerHeight="6"
            markerWidth="6"
            orient="auto"
            refX="5"
            refY="3"
          >
            <path d="M0,0 L6,3 L0,6 z" fill="var(--diagram-amber)" />
          </marker>
          <marker
            id="gossipsub-arrow-violet"
            markerHeight="6"
            markerWidth="6"
            orient="auto"
            refX="5"
            refY="3"
          >
            <path d="M0,0 L6,3 L0,6 z" fill="var(--diagram-violet)" />
          </marker>
          <marker
            id="gossipsub-arrow-pink"
            markerHeight="6"
            markerWidth="6"
            orient="auto"
            refX="5"
            refY="3"
          >
            <path d="M0,0 L6,3 L0,6 z" fill="var(--diagram-pink)" />
          </marker>
        </defs>
        {gossipLinks.map((link) => {
          const from = gossipNodes[link.from]
          const to = gossipNodes[link.to]
          const joiningControlActive = link.kind === 'graft' && step === 1
          const joinedLinkActive = link.kind === 'joined' && step === 2
          const peerConnectionActive =
            link.kind === 'connection' &&
            (link.from === 3 ? step === 0 || step >= 3 : step < 4 || step > 6)
          const gossipMessageActive =
            (link.kind === 'ihave' && step === 4) ||
            (link.kind === 'iwant' && step === 5) ||
            (link.kind === 'response' && step === 6)
          const isMeshLink = link.kind === 'mesh' || joinedLinkActive
          const isOfflineLink =
            step >= 8 &&
            (link.kind === 'mesh' || link.kind === 'connection') &&
            (link.from === 4 || link.to === 4)
          const visible =
            isMeshLink ||
            peerConnectionActive ||
            joiningControlActive ||
            gossipMessageActive
          if (!visible) return null

          const stroke =
            link.kind === 'graft'
              ? 'var(--diagram-amber)'
              : link.kind === 'ihave' || link.kind === 'response'
                ? 'var(--diagram-violet)'
                : link.kind === 'iwant'
                  ? 'var(--diagram-pink)'
                  : link.kind === 'connection' || isOfflineLink
                    ? 'var(--diagram-slate)'
                    : 'var(--diagram-cyan)'
          const markerEnd =
            link.kind === 'graft'
              ? 'url(#gossipsub-arrow-amber)'
              : link.kind === 'ihave' || link.kind === 'response'
                ? 'url(#gossipsub-arrow-violet)'
                : link.kind === 'iwant'
                  ? 'url(#gossipsub-arrow-pink)'
                  : undefined
          return (
            <line
              key={`${from.id}-${to.id}-${link.kind}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              markerEnd={markerEnd}
              stroke={stroke}
              strokeDasharray={
                isOfflineLink || link.kind === 'connection'
                  ? '3 6'
                  : link.kind === 'graft' ||
                      link.kind === 'ihave' ||
                      link.kind === 'iwant'
                    ? '5 5'
                    : undefined
              }
              strokeOpacity={isOfflineLink ? 0.65 : 0.92}
              strokeWidth={link.kind === 'mesh' || link.kind === 'joined' ? 1.8 : 2}
            />
          )
        })}
        {gossipNodes.map((node) => {
          const isJoiningPeer = node.id === 'joining-peer'
          const isJoining = isJoiningPeer && step === 2
          const isGrafting = isJoiningPeer && step === 1
          const hasLeftTopic = isJoiningPeer && step >= 3
          const isDisconnected = node.id === 'mesh-d' && step >= 8
          const isDuplicatePeer = node.id === 'mesh-b' && step === 7
          const isOutsideMesh = node.id === 'outside-mesh'
          const isPublisher = node.id === 'publisher'
          const isMeshPeer = node.id.startsWith('mesh-')
          const active =
            !isDisconnected &&
            (isOutsideMesh ||
              isPublisher ||
              isMeshPeer ||
              isJoining ||
              isDuplicatePeer)
          const activeColor = isOutsideMesh
            ? 'var(--diagram-violet)'
            : isDuplicatePeer
              ? 'var(--diagram-amber)'
            : isJoiningPeer && !hasLeftTopic
              ? 'var(--diagram-amber)'
              : 'var(--diagram-cyan)'
          const activeWash = isOutsideMesh
            ? 'var(--diagram-violet-wash)'
            : isDuplicatePeer || (isJoiningPeer && !hasLeftTopic)
              ? 'var(--diagram-amber-wash)'
              : 'var(--diagram-cyan-wash)'
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="17"
                fill={active ? activeWash : 'var(--diagram-idle)'}
                stroke={
                  active || isGrafting
                    ? activeColor
                    : 'var(--diagram-slate)'
                }
                strokeWidth="1.5"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill={
                  isDisconnected
                    ? 'var(--diagram-slate)'
                    : active || isGrafting
                      ? activeColor
                      : 'var(--diagram-muted)'
                }
              />
              <text
                x={node.x}
                y={node.y + 32}
                fill={
                  isDisconnected
                    ? 'var(--diagram-muted)'
                    : active || isGrafting
                      ? activeColor
                      : 'var(--diagram-muted)'
                }
                fontSize="8.5"
                textAnchor="middle"
              >
                {isJoining
                  ? 'Peer F · mesh'
                  : isDisconnected
                    ? 'Peer E · offline'
                    : node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 44}
                fill="var(--diagram-muted)"
                fontSize="7.5"
                textAnchor="middle"
              >
                {isJoiningPeer
                  ? isJoining
                    ? 'topic mesh'
                    : hasLeftTopic
                      ? 'left topic'
                      : 'connected · off mesh'
                  : isDuplicatePeer
                    ? 'duplicate suppressed'
                  : isDisconnected
                    ? 'link lost'
                    : node.detail}
              </text>
            </g>
          )
        })}
      </svg>

      <div
        aria-label="Diagram legend"
        className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500"
      >
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-5 bg-cyan-200" />
          Topic mesh / full-message path
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t border-dashed border-slate-500" />
          Connection outside this topic mesh
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t border-dashed border-amber-300" />
          GRAFT control
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t border-dashed border-violet-300" />
          IHAVE / returned message
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t border-dashed border-fuchsia-300" />
          IWANT request
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-3">
        <button
          className={primaryButton}
          disabled={isComplete}
          onClick={() =>
            setStep((current) => Math.min(current + 1, gossipStages.length - 1))
          }
          type="button"
        >
          {isComplete
            ? 'Demo complete'
            : step === 0
              ? 'Start example'
              : 'Next event'}
          {!isComplete && (
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          className={secondaryButton}
          disabled={step === 0}
          onClick={() => setStep(0)}
          type="button"
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
      <div
        aria-live="polite"
        className="min-h-16 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
      >
        <p className="text-[11px] font-semibold text-slate-300">
          {gossipStages[step].title}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {gossipStages[step].detail}
        </p>
        {step === 3 && (
          <p className="mt-2 text-[10px] text-amber-200/80">
            PRUNE removes F from this topic mesh; it does not necessarily close
            the libp2p connection.
          </p>
        )}
        {step === 6 && (
          <p className="mt-2 text-[10px] text-violet-200/80">
            IHAVE + IWANT can repair recent loss only while a reachable peer
            still has the message cached.
          </p>
        )}
        {step === 7 && (
          <p className="mt-2 text-[10px] text-cyan-200/80">
            Duplicate suppression is not an exactly-once delivery guarantee
            for the application.
          </p>
        )}
      </div>
    </div>
  )
}

const rlncFieldSize = 5
type RlncCoefficients = [number, number, number]
type RlncShard = {
  id: string
  label: string
  coefficients: RlncCoefficients
  value: number
}

const rlncSourceSymbols: RlncCoefficients = [1, 2, 3]
const rlncSourceLabels = ['x₁', 'x₂', 'x₃'] as const
const rlncSampleRows: Array<{ label: string; coefficients: RlncCoefficients }> = [
  { label: 'Sample 1', coefficients: [1, 0, 1] },
  { label: 'Sample 2', coefficients: [0, 1, 1] },
  { label: 'Sample 3', coefficients: [1, 1, 0] },
]

function modField(value: number) {
  return ((value % rlncFieldSize) + rlncFieldSize) % rlncFieldSize
}

function inverseInField(value: number) {
  for (let candidate = 1; candidate < rlncFieldSize; candidate += 1) {
    if (modField(value * candidate) === 1) {
      return candidate
    }
  }
  throw new RangeError('A non-zero GF(5) value must have an inverse.')
}

function coefficientRank(rows: readonly RlncCoefficients[]) {
  const matrix = rows.map((row) => row.map(modField))
  let pivotRow = 0

  for (
    let column = 0;
    column < rlncSourceSymbols.length && pivotRow < matrix.length;
    column += 1
  ) {
    const candidateRow = matrix.findIndex(
      (row, index) => index >= pivotRow && row[column] !== 0,
    )
    if (candidateRow === -1) {
      continue
    }

    const pivot = matrix[pivotRow]
    matrix[pivotRow] = matrix[candidateRow]
    matrix[candidateRow] = pivot
    const inverse = inverseInField(matrix[pivotRow][column])
    matrix[pivotRow] = matrix[pivotRow].map((value) =>
      modField(value * inverse),
    )

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
      if (rowIndex === pivotRow) {
        continue
      }
      const factor = matrix[rowIndex][column]
      if (factor === 0) {
        continue
      }
      for (let entry = 0; entry < rlncSourceSymbols.length; entry += 1) {
        matrix[rowIndex][entry] = modField(
          matrix[rowIndex][entry] - factor * matrix[pivotRow][entry],
        )
      }
    }
    pivotRow += 1
  }

  return pivotRow
}

function decodeRlncShards(shards: readonly RlncShard[]) {
  const matrix = shards.map((shard) => [
    ...shard.coefficients,
    shard.value,
  ])
  let pivotRow = 0

  for (
    let column = 0;
    column < rlncSourceSymbols.length && pivotRow < matrix.length;
    column += 1
  ) {
    const candidateRow = matrix.findIndex(
      (row, index) => index >= pivotRow && row[column] !== 0,
    )
    if (candidateRow === -1) {
      continue
    }

    const pivot = matrix[pivotRow]
    matrix[pivotRow] = matrix[candidateRow]
    matrix[candidateRow] = pivot
    const inverse = inverseInField(matrix[pivotRow][column])
    matrix[pivotRow] = matrix[pivotRow].map((value) =>
      modField(value * inverse),
    )

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
      if (rowIndex === pivotRow) {
        continue
      }
      const factor = matrix[rowIndex][column]
      if (factor === 0) {
        continue
      }
      for (let entry = 0; entry <= rlncSourceSymbols.length; entry += 1) {
        matrix[rowIndex][entry] = modField(
          matrix[rowIndex][entry] - factor * matrix[pivotRow][entry],
        )
      }
    }
    pivotRow += 1
  }

  const inconsistent = matrix.some(
    (row) =>
      row.slice(0, rlncSourceSymbols.length).every((value) => value === 0) &&
      row[rlncSourceSymbols.length] !== 0,
  )
  if (pivotRow < rlncSourceSymbols.length || inconsistent) {
    return null
  }

  const decodedSymbols: RlncCoefficients = [
    matrix[0][rlncSourceSymbols.length],
    matrix[1][rlncSourceSymbols.length],
    matrix[2][rlncSourceSymbols.length],
  ]
  return decodedSymbols
}

function encodeRlncShard(
  id: string,
  label: string,
  coefficients: RlncCoefficients,
): RlncShard {
  const value = coefficients.reduce(
    (sum, coefficient, index) =>
      modField(sum + coefficient * rlncSourceSymbols[index]),
    0,
  )
  return { id, label, coefficients, value }
}

function findIndependentPair(shards: readonly RlncShard[]) {
  for (let first = 0; first < shards.length; first += 1) {
    for (let second = first + 1; second < shards.length; second += 1) {
      if (
        coefficientRank([
          shards[first].coefficients,
          shards[second].coefficients,
        ]) === 2
      ) {
        return [shards[first], shards[second]] as const
      }
    }
  }
  return null
}

function shardCalculation(shard: RlncShard) {
  return shard.coefficients
    .map(
      (coefficient, index) =>
        `${coefficient}×${rlncSourceSymbols[index]}`,
    )
    .join(' + ')
}

function shardRow(shard: RlncShard) {
  return `[${shard.coefficients.join(', ')}] → ${shard.value}`
}

function RLNCDemo() {
  const [shards, setShards] = useState<RlncShard[]>([])
  const [relayShards, setRelayShards] = useState<RlncShard[]>([])
  const [receiverShards, setReceiverShards] = useState<RlncShard[]>([])
  const [sampleIndex, setSampleIndex] = useState(0)
  const [nextShardNumber, setNextShardNumber] = useState(1)
  const [status, setStatus] = useState(
    'Generate a sample shard, then choose which peer receives it.',
  )

  const relayRank = coefficientRank(
    relayShards.map((shard) => shard.coefficients),
  )
  const receiverRank = coefficientRank(
    receiverShards.map((shard) => shard.coefficients),
  )
  const decodedSymbols =
    receiverRank === rlncSourceSymbols.length
      ? decodeRlncShards(receiverShards)
      : null
  const independentRelayPair = findIndependentPair(relayShards)

  const addGeneratedShard = (shard: RlncShard) => {
    setShards((current) => [...current, shard])
    setStatus(
      `${shard.label} generated: ${shardCalculation(shard)} = ${shard.value} (mod 5).`,
    )
  }

  const generateSample = () => {
    const sample = rlncSampleRows[sampleIndex]
    if (!sample) {
      return
    }
    addGeneratedShard(
      encodeRlncShard(
        `sample-${sampleIndex + 1}`,
        sample.label,
        sample.coefficients,
      ),
    )
    setSampleIndex((current) => current + 1)
  }

  const generateRandomShard = () => {
    let coefficients: RlncCoefficients = [0, 0, 0]
    while (coefficients.every((coefficient) => coefficient === 0)) {
      coefficients = [
        Math.floor(Math.random() * rlncFieldSize),
        Math.floor(Math.random() * rlncFieldSize),
        Math.floor(Math.random() * rlncFieldSize),
      ]
    }
    const shard = encodeRlncShard(
      `generated-${nextShardNumber}`,
      `Random ${nextShardNumber}`,
      coefficients,
    )
    setNextShardNumber((current) => current + 1)
    addGeneratedShard(shard)
  }

  const generateDependentShard = () => {
    const sample = shards.find((shard) => shard.id === 'sample-1')
    if (!sample) {
      return
    }
    const coefficients: RlncCoefficients = [
      modField(2 * sample.coefficients[0]),
      modField(2 * sample.coefficients[1]),
      modField(2 * sample.coefficients[2]),
    ]
    const shard = encodeRlncShard(
      `generated-${nextShardNumber}`,
      `Dependent: 2 × ${sample.label}`,
      coefficients,
    )
    setNextShardNumber((current) => current + 1)
    addGeneratedShard(shard)
  }

  const sendShard = (shard: RlncShard, peer: 'Relay' | 'Receiver') => {
    const currentShards = peer === 'Relay' ? relayShards : receiverShards
    const setPeerShards =
      peer === 'Relay' ? setRelayShards : setReceiverShards

    if (currentShards.some((received) => received.id === shard.id)) {
      setStatus(
        `${peer} already received ${shard.label}. The duplicate is ignored; rank remains ${coefficientRank(
          currentShards.map((received) => received.coefficients),
        )} / 3.`,
      )
      return
    }

    const previousRank = coefficientRank(
      currentShards.map((received) => received.coefficients),
    )
    const nextShards = [...currentShards, shard]
    const nextRank = coefficientRank(
      nextShards.map((received) => received.coefficients),
    )
    setPeerShards(nextShards)

    setStatus(
      nextRank > previousRank
        ? `${peer} received ${shard.label} (${shardRow(shard)}). It is innovative here: rank ${previousRank} → ${nextRank} / 3.`
        : `${peer} received ${shard.label} (${shardRow(shard)}). It is a different shard, but its row is dependent on what this peer already has; rank stays ${nextRank} / 3.`,
    )
  }

  const recodeAtRelay = () => {
    if (!independentRelayPair) {
      return
    }
    const [first, second] = independentRelayPair
    const coefficients: RlncCoefficients = [
      modField(first.coefficients[0] + second.coefficients[0]),
      modField(first.coefficients[1] + second.coefficients[1]),
      modField(first.coefficients[2] + second.coefficients[2]),
    ]
    const shard = encodeRlncShard(
      `generated-${nextShardNumber}`,
      `Relay recode ${nextShardNumber}`,
      coefficients,
    )
    setNextShardNumber((current) => current + 1)
    addGeneratedShard(shard)
    setStatus(
      `Relay combined ${first.label} + ${second.label} with weights [1, 1]. It made ${shardRow(
        shard,
      )} directly from its shards; no decode step was used. Relay rank remains ${relayRank} / 3.`,
    )
  }

  const resetDemo = () => {
    setShards([])
    setRelayShards([])
    setReceiverShards([])
    setSampleIndex(0)
    setNextShardNumber(1)
    setStatus('Generate a sample shard, then choose which peer receives it.')
  }

  return (
    <div
      aria-label="Interactive random linear network coding demonstration over GF(5)"
      className="rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-200">
            A small, fully worked coding network
          </p>
          <p className="mt-1 max-w-2xl text-[11px] leading-5 text-slate-500">
            Teaching model only: three source symbols in GF(5), with all
            arithmetic modulo 5. These are not Optimum production parameters.
          </p>
        </div>
        <button
          className={secondaryButton}
          disabled={shards.length === 0}
          onClick={resetDemo}
          type="button"
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Reset demo
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <section className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Original symbols
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {rlncSourceSymbols.map((value, index) => (
              <span
                className="rounded-lg border border-cyan-200/10 bg-cyan-200/[0.035] px-3 py-2 font-mono text-xs text-cyan-100"
                key={`source-${index}`}
              >
                {rlncSourceLabels[index]} = {value}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            In GF(5), results wrap around: 2 × 3 = 6 ≡ 1 (mod 5).
          </p>
        </section>

        <section className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Create coded shards
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              className={primaryButton}
              disabled={sampleIndex >= rlncSampleRows.length}
              onClick={generateSample}
              type="button"
            >
              Generate next sample
            </button>
            <button
              className={secondaryButton}
              onClick={generateRandomShard}
              type="button"
            >
              Generate random shard
            </button>
            <button
              className={secondaryButton}
              disabled={!shards.some((shard) => shard.id === 'sample-1')}
              onClick={generateDependentShard}
              type="button"
            >
              Make dependent shard
            </button>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            Sample rows are fixed so you can follow the arithmetic. Random
            shards choose a non-zero visible coefficient vector from GF(5).
          </p>
        </section>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Available shards · choose a peer for each delivery
        </p>
        {shards.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/[0.08] px-3 py-4 text-xs text-slate-500">
            Your generated shards will appear here with their coefficients,
            equations, and values.
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {shards.map((shard) => (
              <article
                className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
                key={shard.id}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {shard.label}
                </p>
                <p className="mt-1 break-words font-mono text-xs text-cyan-100">
                  [{shard.coefficients.join(', ')}] → {shard.value}
                </p>
                <p className="mt-1 break-words font-mono text-[10px] leading-4 text-slate-500">
                  {shardCalculation(shard)} ≡ {shard.value} (mod 5)
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    className={`${secondaryButton} min-h-8 px-2.5 text-[10px]`}
                    onClick={() => sendShard(shard, 'Relay')}
                    type="button"
                  >
                    Send to relay
                  </button>
                  <button
                    className={`${secondaryButton} min-h-8 px-2.5 text-[10px]`}
                    onClick={() => sendShard(shard, 'Receiver')}
                    type="button"
                  >
                    Send to receiver
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 grid items-stretch gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        <section className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <div className="flex items-center gap-2">
            <Send aria-hidden="true" className="h-4 w-4 text-cyan-200" />
            <p className="text-xs font-semibold text-slate-200">Publisher</p>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            Holds the original symbols and offers each generated shard to
            either simulated peer.
          </p>
        </section>
        <ArrowRight
          aria-hidden="true"
          className="hidden h-4 w-4 self-center text-slate-600 lg:block"
        />
        <section className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Network aria-hidden="true" className="h-4 w-4 text-violet-200" />
              <p className="text-xs font-semibold text-slate-200">Relay peer</p>
            </div>
            <span className="rounded-full border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-slate-400">
              rank {relayRank} / 3
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            {relayRank < 3
              ? 'Not enough independent rows to decode the three symbols.'
              : 'This peer has enough rank to decode, but recoding still works directly on its shards.'}
          </p>
          <div className="mt-2 space-y-1">
            {relayShards.length === 0 ? (
              <p className="text-[10px] text-slate-600">Waiting for shards</p>
            ) : (
              relayShards.map((shard) => (
                <p
                  className="break-words font-mono text-[10px] text-slate-400"
                  key={shard.id}
                >
                  {shard.label}: {shardRow(shard)}
                </p>
              ))
            )}
          </div>
          <button
            className={`${secondaryButton} mt-3 min-h-9 w-full px-2 text-[10px]`}
            disabled={!independentRelayPair}
            onClick={recodeAtRelay}
            type="button"
          >
            Recode an independent pair
          </button>
        </section>
        <ArrowRight
          aria-hidden="true"
          className="hidden h-4 w-4 self-center text-slate-600 lg:block"
        />
        <section className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Server aria-hidden="true" className="h-4 w-4 text-emerald-200" />
              <p className="text-xs font-semibold text-slate-200">Receiver</p>
            </div>
            <span
              className={`rounded-full border px-2 py-1 font-mono text-[10px] ${
                receiverRank === 3
                  ? 'border-emerald-200/15 bg-emerald-200/[0.04] text-emerald-100'
                  : 'border-white/[0.08] text-slate-400'
              }`}
            >
              rank {receiverRank} / 3
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            {receiverRank === 3
              ? 'Enough independent equations to solve for all three symbols.'
              : `Needs ${3 - receiverRank} more independent ${
                  3 - receiverRank === 1 ? 'row' : 'rows'
                } to decode.`}
          </p>
          <div className="mt-2 space-y-1">
            {receiverShards.length === 0 ? (
              <p className="text-[10px] text-slate-600">Waiting for shards</p>
            ) : (
              receiverShards.map((shard) => (
                <p
                  className="break-words font-mono text-[10px] text-slate-400"
                  key={shard.id}
                >
                  {shard.label}: {shardRow(shard)}
                </p>
              ))
            )}
          </div>
          {decodedSymbols && (
            <div className="mt-3 rounded-lg border border-emerald-200/15 bg-emerald-200/[0.04] p-2.5">
              <p className="text-[10px] font-semibold text-emerald-100">
                Decoded at full rank
              </p>
              <p className="mt-1 font-mono text-[10px] leading-4 text-emerald-100/80">
                x₁ = {decodedSymbols[0]}, x₂ = {decodedSymbols[1]}, x₃ ={' '}
                {decodedSymbols[2]}
              </p>
            </div>
          )}
        </section>
      </div>

      <p
        aria-live="polite"
        className="mt-4 min-h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-xs leading-5 text-slate-400"
      >
        {status}
      </p>
      <p className="mt-2 text-[10px] leading-4 text-slate-600">
        Delivery is simulated. A peer’s rank comes from Gaussian elimination
        over its received coefficient rows; repeated or dependent rows never
        increase it.
      </p>
    </div>
  )
}

function Mump2pDemo() {
  type NodeId = 'A' | 'B' | 'C' | 'D'
  type AccessPath = 'proxy' | 'direct'
  const nodeIds: NodeId[] = ['A', 'B', 'C', 'D']
  const nodeNames: Record<NodeId, string> = {
    A: 'Publisher',
    B: 'Relay / recoder',
    C: 'Mesh peer',
    D: 'Subscriber',
  }
  const [accessPath, setAccessPath] = useState<AccessPath>('proxy')
  const [connected, setConnected] = useState(false)
  const [joined, setJoined] = useState(false)
  const [published, setPublished] = useState(false)
  const [eventIndex, setEventIndex] = useState(0)
  const [network, setNetwork] = useState<Record<NodeId, RlncShard[]>>({
    A: [],
    B: [],
    C: [],
    D: [],
  })
  const [events, setEvents] = useState<string[]>([
    'Ready. Choose an application access path, then connect the simulated P2P nodes.',
  ])
  const shard1 = encodeRlncShard('S1', 'S₁', [1, 0, 1])
  const shard2 = encodeRlncShard('S2', 'S₂', [0, 1, 1])
  const shard3 = encodeRlncShard('S3', 'S₃', [1, 1, 0])
  const dependentShard = encodeRlncShard('S1x2', '2 × S₁', [2, 0, 2])
  const recodedShard = encodeRlncShard('R1', 'Z (recoded)', [1, 1, 2])
  const topology = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'C'],
    ['B', 'D'],
    ['C', 'D'],
  ] as const
  const receiverRank = coefficientRank(network.D.map((shard) => shard.coefficients))
  const decoded = receiverRank === rlncSourceSymbols.length
    ? decodeRlncShards(network.D)
    : null
  const isReady = connected && joined && published

  const appendEvent = (message: string) => {
    setEvents((current) => [...current, message])
  }

  const resetFlow = () => {
    setConnected(false)
    setJoined(false)
    setPublished(false)
    setEventIndex(0)
    setNetwork({ A: [], B: [], C: [], D: [] })
    setEvents([
      'Ready. Choose an application access path, then connect the simulated P2P nodes.',
    ])
  }

  const connectNodes = () => {
    setConnected(true)
    appendEvent(
      'ADD_PEER: the four simulated P2P nodes connect using the fixed teaching topology.',
    )
  }

  const joinTopic = () => {
    setJoined(true)
    appendEvent('JOIN: nodes A, B, C, and D join the demo/blocks topic.')
  }

  const publishMessage = () => {
    setPublished(true)
    setNetwork((current) => ({ ...current, A: [shard1, shard2, shard3] }))
    appendEvent(
      `PUBLISH_MESSAGE: Publisher A submits “block update” via ${
        accessPath === 'proxy' ? 'the optional Proxy' : 'direct P2P access'
      } to the P2P node. Node A creates S₁, S₂, and S₃.`,
    )
    appendEvent(
      'NEW_SHARD: GF(5) teaching example only — [1,0,1] → 4, [0,1,1] → 0, [1,1,0] → 3.',
    )
  }

  const receiveShard = (
    from: NodeId,
    to: NodeId,
    shard: RlncShard,
  ) => {
    const currentShards = network[to]
    const currentRank = coefficientRank(
      currentShards.map((currentShard) => currentShard.coefficients),
    )
    if (currentShards.some((currentShard) => currentShard.id === shard.id)) {
      appendEvent(
        `DUPLICATE_SHARD: ${nodeNames[to]} receives ${shard.label} from ${from}, but already has that shard; rank stays ${currentRank}/3.`,
      )
      return
    }
    if (currentRank === rlncSourceSymbols.length) {
      appendEvent(
        `UNNECESSARY_SHARD: ${nodeNames[to]} already decoded the message; ${shard.label} is not needed in this simulation.`,
      )
      return
    }
    const nextRank = coefficientRank([
      ...currentShards.map((currentShard) => currentShard.coefficients),
      shard.coefficients,
    ])
    if (nextRank === currentRank) {
      appendEvent(
        `UNHELPFUL_SHARD: ${nodeNames[to]} receives ${shard.label} from ${from}, but its row is dependent; rank stays ${currentRank}/3. This is a simplified teaching interpretation of the trace label.`,
      )
      return
    }
    const updatedShards = [...currentShards, shard]
    setNetwork((current) => ({ ...current, [to]: updatedShards }))
    const status = nextRank === rlncSourceSymbols.length
      ? 'rank reaches 3/3; the node can decode'
      : `rank increases to ${nextRank}/3`
    appendEvent(
      `NEW_SHARD: ${nodeNames[to]} accepts ${shard.label} from ${from}; ${status}.`,
    )
    if (to === 'D' && nextRank === rlncSourceSymbols.length) {
      appendEvent(
        `DELIVER_MESSAGE: Subscriber D reconstructs [${rlncSourceSymbols.join(', ')}] over GF(5).`,
      )
    }
  }

  const runNextEvent = () => {
    if (!isReady) {
      return
    }
    switch (eventIndex) {
      case 0:
        receiveShard('A', 'B', shard1)
        break
      case 1:
        receiveShard('A', 'B', shard1)
        break
      case 2:
        receiveShard('A', 'B', dependentShard)
        break
      case 3:
        receiveShard('A', 'C', shard2)
        break
      case 4:
        receiveShard('C', 'B', shard2)
        break
      case 5: {
        const independentPair = findIndependentPair(network.B)
        if (!independentPair) {
          appendEvent(
            'Recoding paused: Node B needs two independent shards first.',
          )
          return
        }
        setNetwork((current) => ({
          ...current,
          B: [...current.B, recodedShard],
        }))
        appendEvent(
          'Recoding: Node B combines S₁ and S₂ into Z = [1,1,2] → 4 without decoding. It sends Z to Subscriber D.',
        )
        receiveShard('B', 'D', recodedShard)
        break
      }
      case 6:
        receiveShard('A', 'C', shard3)
        break
      case 7:
        receiveShard('C', 'D', shard3)
        break
      case 8:
        receiveShard('A', 'C', shard1)
        break
      case 9:
        receiveShard('C', 'D', shard1)
        break
      case 10:
        receiveShard('C', 'D', shard2)
        break
      default:
        return
    }
    setEventIndex((current) => current + 1)
  }

  const eventDescriptions = [
    'A sends S₁ to B.',
    'A sends the same S₁ to B again.',
    'A sends a distinct but dependent equation, 2 × S₁, to B.',
    'A sends S₂ to C.',
    'C forwards S₂ to B; B now has two independent equations.',
    'B recodes S₁ and S₂ into Z and sends it to D.',
    'A sends S₃ to C.',
    'C forwards S₃ to D.',
    'A sends S₁ to C.',
    'C forwards S₁ to D; D reaches full rank and decodes.',
    'C sends another shard after D has decoded.',
  ]
  const resetButton = (
    <button
      className={secondaryButton}
      onClick={resetFlow}
      type="button"
    >
      <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
      Replay / reset
    </button>
  )

  return (
    <div
      aria-label="Interactive mump2p coded-shard network simulation"
      className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <div className="rounded-xl border border-amber-200/10 bg-amber-200/[0.025] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-100/80">
          Educational simulation — not a live network
        </p>
        <p className="mt-1 text-[10px] leading-4 text-slate-400">
          Fixed topology, event order, GF(5), payload symbols, and shard
          coefficients are teaching choices, not Optimum production settings.
        </p>
      </div>

      <section className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-200">
              Application access path
            </p>
            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              Both paths enter the same P2P mesh. A proxy is optional and is
              outside the mesh.
            </p>
          </div>
          <div className="flex gap-2" role="group" aria-label="Choose access path">
            {(['proxy', 'direct'] as const).map((path) => (
              <button
                aria-pressed={accessPath === path}
                className={`min-h-9 rounded-lg border px-3 text-[10px] font-medium transition ${
                  accessPath === path
                    ? 'border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100'
                    : 'border-white/[0.08] text-slate-400 hover:text-white'
                }`}
                key={path}
                onClick={() => setAccessPath(path)}
                type="button"
              >
                {path === 'proxy' ? 'Via proxy' : 'Direct P2P'}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          <div className="rounded-lg border border-white/[0.08] bg-[#111722] p-2.5 text-center text-[10px] text-slate-300">
            Publisher / Application
          </div>
          {accessPath === 'proxy' && (
            <>
              <ArrowRight aria-hidden="true" className="mx-auto h-3.5 w-3.5 rotate-90 text-slate-600 sm:rotate-0" />
              <div className="rounded-lg border border-amber-200/10 bg-amber-200/[0.035] p-2.5 text-center text-[10px] text-amber-100/80">
                Optional Proxy · client access
              </div>
            </>
          )}
          <ArrowRight aria-hidden="true" className="mx-auto h-3.5 w-3.5 rotate-90 text-slate-600 sm:rotate-0" />
          <div className="rounded-lg border border-cyan-200/10 bg-cyan-200/[0.035] p-2.5 text-center text-[10px] text-cyan-100">
            P2P Node A · mesh participant
          </div>
        </div>
      </section>

      <section
        aria-label="Simulated P2P mesh and shard holdings"
        className="rounded-xl border border-cyan-200/10 bg-cyan-200/[0.015] p-3"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-slate-200">
              RLNC-enhanced P2P mesh · topic: demo/blocks
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              Node connections are separate from the optional proxy access layer.
            </p>
          </div>
          <span className="rounded-full border border-white/[0.08] px-2 py-1 text-[9px] text-slate-400">
            {connected ? 'Peers connected' : 'Not connected'} ·{' '}
            {joined ? 'topic joined' : 'not joined'}
          </span>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-1.5" aria-label="Teaching topology connections">
          {topology.map(([from, to]) => (
            <span
              className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-1 font-mono text-[9px] text-slate-500"
              key={`${from}-${to}`}
            >
              {from} ↔ {to}
            </span>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {nodeIds.map((id) => {
            const rank = coefficientRank(
              network[id].map((shard) => shard.coefficients),
            )
            const Icon = id === 'A' ? Send : id === 'D' ? Server : Network
            return (
              <div
                className={`min-w-0 rounded-lg border p-3 ${
                  id === 'D' && decoded
                    ? 'border-emerald-200/20 bg-emerald-200/[0.04]'
                    : 'border-white/[0.07] bg-[#10151e]'
                }`}
                key={id}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-cyan-100" />
                    <p className="truncate text-[10px] font-semibold text-slate-200">
                      Node {id} · {nodeNames[id]}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/[0.08] px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
                    rank {rank}/3
                  </span>
                </div>
                <div className="mt-2 min-h-8 space-y-1">
                  {network[id].length === 0 ? (
                    <p className="text-[9px] text-slate-600">No shards yet</p>
                  ) : (
                    network[id].map((shard) => (
                      <p
                        className="break-words font-mono text-[9px] leading-4 text-violet-100/80"
                        key={`${id}-${shard.id}`}
                      >
                        {shard.label}: {shardRow(shard)}
                      </p>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {decoded && (
          <p className="mt-3 rounded-lg border border-emerald-200/15 bg-emerald-200/[0.04] px-3 py-2 font-mono text-[10px] text-emerald-100">
            DELIVER_MESSAGE · decoded symbols: [{decoded.join(', ')}]
          </p>
        )}
      </section>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        <button
          className={primaryButton}
          disabled={connected}
          onClick={connectNodes}
          type="button"
        >
          <Network aria-hidden="true" className="h-3.5 w-3.5" />
          {connected ? 'Nodes connected' : 'Connect P2P nodes'}
        </button>
        <button
          className={secondaryButton}
          disabled={!connected || joined}
          onClick={joinTopic}
          type="button"
        >
          <Radio aria-hidden="true" className="h-3.5 w-3.5" />
          {joined ? 'Topic joined' : 'Join topic'}
        </button>
        <button
          className={secondaryButton}
          disabled={!connected || !joined || published}
          onClick={publishMessage}
          type="button"
        >
          <Send aria-hidden="true" className="h-3.5 w-3.5" />
          {published ? 'Message published' : 'Publish message'}
        </button>
        <button
          className={secondaryButton}
          disabled={!isReady || eventIndex >= eventDescriptions.length}
          onClick={runNextEvent}
          type="button"
        >
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          {eventIndex >= eventDescriptions.length
            ? 'Flow complete'
            : 'Next network event'}
        </button>
        {resetButton}
      </div>
      <p aria-live="polite" className="min-h-8 text-xs leading-5 text-slate-400">
        {isReady
          ? eventIndex < eventDescriptions.length
            ? eventDescriptions[eventIndex]
            : 'The subscriber has decoded; replay to explore the message path again.'
          : !connected
            ? 'First connect the simulated P2P nodes.'
            : !joined
              ? 'Next, join the nodes to the topic.'
              : 'Now publish the message before stepping through shard events.'}
      </p>

      <section
        aria-label="Simulation event log"
        className="rounded-xl border border-white/[0.07] bg-black/20 p-3"
      >
        <div className="mb-2 flex items-center gap-2">
          <Share2 aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Event log
          </p>
        </div>
        <ol aria-live="polite" className="max-h-44 space-y-1.5 overflow-y-auto">
          {events.map((event, index) => (
            <li
              className="break-words rounded-md bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] leading-4 text-slate-400"
              key={`${index}-${event}`}
            >
              {String(index + 1).padStart(2, '0')} · {event}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function GatewayDemo() {
  const [publisherConnected, setPublisherConnected] = useState(false)
  const [subscriberConnected, setSubscriberConnected] = useState(false)
  const [meshConnected, setMeshConnected] = useState(false)
  const [subscriberSubscribed, setSubscriberSubscribed] = useState(false)
  const [outboundAtGateway, setOutboundAtGateway] = useState(false)
  const [outboundOnMesh, setOutboundOnMesh] = useState(false)
  const [inboundAtGateway, setInboundAtGateway] = useState(false)
  const [republishedToCl, setRepublishedToCl] = useState(false)
  const [deliveredToSubscriber, setDeliveredToSubscriber] = useState(false)
  const [events, setEvents] = useState<string[]>([
    'Ready. Connect the two CL peers and a remote mump2p peer to explore both directions.',
  ])
  const meshEventReady = outboundAtGateway || inboundAtGateway

  const appendEvent = (message: string) => {
    setEvents((current) => [...current, message])
  }

  const toggleConnection = (connection: 'publisher' | 'subscriber' | 'mesh') => {
    if (connection === 'publisher') {
      const next = !publisherConnected
      setPublisherConnected(next)
      appendEvent(
        `${next ? 'ADD_PEER' : 'REMOVE_PEER'}: CL Client A ${
          next ? 'connects to' : 'disconnects from'
        } the Gateway’s CL-facing libp2p host.`,
      )
      return
    }
    if (connection === 'subscriber') {
      const next = !subscriberConnected
      setSubscriberConnected(next)
      appendEvent(
        `${next ? 'ADD_PEER' : 'REMOVE_PEER'}: CL Client B ${
          next ? 'connects to' : 'disconnects from'
        } the Gateway’s CL-facing libp2p host.`,
      )
      return
    }
    const next = !meshConnected
    setMeshConnected(next)
    appendEvent(
      `${next ? 'ADD_PEER' : 'REMOVE_PEER'}: the Gateway’s embedded mump2p node ${
        next ? 'connects to' : 'disconnects from'
      } the remote mesh peer.`,
    )
  }

  const toggleSubscription = () => {
    const next = !subscriberSubscribed
    setSubscriberSubscribed(next)
    appendEvent(
      `TOPIC_SUBSCRIPTION: Client B ${
        next ? 'subscribes to' : 'leaves'
      } the demo/blocks CL topic.`,
    )
  }

  const reset = () => {
    setPublisherConnected(false)
    setSubscriberConnected(false)
    setMeshConnected(false)
    setSubscriberSubscribed(false)
    setOutboundAtGateway(false)
    setOutboundOnMesh(false)
    setInboundAtGateway(false)
    setRepublishedToCl(false)
    setDeliveredToSubscriber(false)
    setEvents([
      'Ready. Connect the two CL peers and a remote mump2p peer to explore both directions.',
    ])
  }

  const publishFromClient = () => {
    if (!publisherConnected) {
      appendEvent(
        'PUBLISH_BLOCKED: Client A is not connected to the Gateway’s CL-facing libp2p host.',
      )
      return
    }
    setOutboundAtGateway(true)
    appendEvent(
      'CL_GOSSIP_RECEIVED: Gateway receives Client A’s demo/blocks message on a subscribed CL GossipSub topic.',
    )
    appendEvent(
      'BRIDGE_TO_MUMP2P: Gateway maps the CL topic/payload and passes the message to its embedded mump2p node.',
    )
  }

  const forwardToMesh = () => {
    if (!outboundAtGateway) {
      return
    }
    if (!meshConnected) {
      appendEvent(
        'MESH_UNAVAILABLE: the Gateway has the CL message, but its mump2p peer link is disconnected; mesh forwarding cannot proceed in this simulation.',
      )
      return
    }
    setOutboundOnMesh(true)
    appendEvent(
      'MUMP2P_PUBLISH: the embedded mump2p node forwards the message through its connected mesh peer.',
    )
  }

  const receiveFromMesh = () => {
    if (!meshConnected) {
      appendEvent(
        'MESH_UNAVAILABLE: no remote mump2p connection is available to deliver a message back to this Gateway.',
      )
      return
    }
    setInboundAtGateway(true)
    appendEvent(
      'MUMP2P_RECEIVED: the embedded node delivers an incoming message from the remote mump2p peer to the Gateway bridge.',
    )
  }

  const republishToCl = () => {
    if (!inboundAtGateway) {
      return
    }
    setRepublishedToCl(true)
    appendEvent(
      'CL_GOSSIP_PUBLISH: Gateway maps the message to its CL topic and publishes it to the local libp2p topic.',
    )
  }

  const deliverToSubscriber = () => {
    if (!republishedToCl) {
      return
    }
    if (!subscriberConnected) {
      appendEvent(
        'CLIENT_UNAVAILABLE: the CL message was published locally, but Client B is disconnected.',
      )
      return
    }
    if (!subscriberSubscribed) {
      appendEvent(
        'NO_SUBSCRIPTION: Client B is connected but has not subscribed to demo/blocks.',
      )
      return
    }
    setDeliveredToSubscriber(true)
    appendEvent(
      'CLIENT_DELIVERED: subscribed CL Client B receives the message from its local gossip network.',
    )
  }

  const connectionButton = (
    label: string,
    isConnected: boolean,
    onClick: () => void,
  ) => (
    <button
      className={`${isConnected ? secondaryButton : primaryButton} min-h-9 w-full px-2.5 text-[10px]`}
      onClick={onClick}
      type="button"
    >
      <CircleDot
        aria-hidden="true"
        className={`h-3 w-3 ${isConnected ? 'text-emerald-200' : ''}`}
      />
      {isConnected ? `Disconnect ${label}` : `Connect ${label}`}
    </button>
  )

  return (
    <div
      aria-label="Interactive Optimum Gateway message-flow simulation"
      className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <div className="rounded-xl border border-amber-200/10 bg-amber-200/[0.025] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-100/80">
          Educational simulation — not a live Gateway
        </p>
        <p className="mt-1 text-[10px] leading-4 text-slate-400">
          The diagram simplifies topic routing and peer behavior. It does not
          model real discovery, payload validation, aggregation, RLNC, or
          delivery guarantees.
        </p>
      </div>

      <section
        aria-label="Optimum Gateway and peer architecture"
        className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4"
      >
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-slate-200">
              One Gateway process, two networking sides
            </p>
            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              Client links use CL libp2p GossipSub; mesh links use the
              Gateway’s embedded mump2p node.
            </p>
          </div>
          <span className="rounded-full border border-amber-200/10 bg-amber-200/[0.025] px-2 py-1 text-[9px] text-amber-100/70">
            Not the Module 05 REST/WebSocket proxy
          </span>
        </div>

        <div className="grid min-w-0 gap-3 2xl:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.8fr)_auto_minmax(0,0.9fr)] 2xl:items-stretch">
          <div className="grid min-w-0 gap-2 sm:grid-cols-2 2xl:grid-cols-1">
            <div className="min-w-0 rounded-lg border border-cyan-200/10 bg-cyan-200/[0.035] p-2.5">
              <div className="flex items-center gap-2">
                <Send aria-hidden="true" className="h-3.5 w-3.5 text-cyan-100" />
                <p className="text-[10px] font-semibold text-slate-200">
                  CL Client A
                </p>
              </div>
              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Publisher · Ethereum libp2p peer
              </p>
              <span className={`mt-2 inline-flex items-center gap-1 text-[9px] ${publisherConnected ? 'text-emerald-200' : 'text-slate-600'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${publisherConnected ? 'bg-emerald-300' : 'bg-slate-600'}`} />
                {publisherConnected ? 'Connected to CL host' : 'Disconnected'}
              </span>
            </div>
            <div className="min-w-0 rounded-lg border border-cyan-200/10 bg-cyan-200/[0.035] p-2.5">
              <div className="flex items-center gap-2">
                <Radio aria-hidden="true" className="h-3.5 w-3.5 text-cyan-100" />
                <p className="text-[10px] font-semibold text-slate-200">
                  CL Client B
                </p>
              </div>
              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Subscriber · Ethereum libp2p peer
              </p>
              <span className={`mt-2 inline-flex items-center gap-1 text-[9px] ${subscriberConnected ? 'text-emerald-200' : 'text-slate-600'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${subscriberConnected ? 'bg-emerald-300' : 'bg-slate-600'}`} />
                {subscriberConnected ? 'Connected to CL host' : 'Disconnected'}
              </span>
              <span className={`ml-2 inline-flex items-center gap-1 text-[9px] ${subscriberSubscribed ? 'text-violet-200' : 'text-slate-600'}`}>
                {subscriberSubscribed ? 'Subscribed' : 'No topic subscription'}
              </span>
            </div>
          </div>

          <ArrowRight
            aria-hidden="true"
            className="mx-auto h-4 w-4 rotate-90 self-center text-slate-600 2xl:rotate-0"
          />

          <div className="min-w-0 rounded-xl border border-cyan-200/15 bg-cyan-200/[0.025] p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                Optimum Gateway
              </p>
              <span className="rounded-full border border-white/[0.08] px-2 py-1 text-[9px] text-slate-500">
                one process
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className={`rounded-lg border p-2.5 ${publisherConnected || subscriberConnected ? 'border-cyan-200/15 bg-cyan-200/[0.045]' : 'border-white/[0.07] bg-white/[0.015]'}`}>
                <p className="text-[9px] font-semibold text-slate-200">
                  CL-facing libp2p host
                </p>
                <p className="mt-1 text-[9px] leading-4 text-slate-500">
                  Subscribes/publishes on selected CL GossipSub topics
                </p>
              </div>
              <div className="rounded-lg border border-violet-200/10 bg-violet-200/[0.025] p-2.5">
                <p className="text-[9px] font-semibold text-slate-200">
                  Gateway bridge
                </p>
                <p className="mt-1 text-[9px] leading-4 text-slate-500">
                  Topic mapping · dedup · payload conversion
                </p>
              </div>
              <div className={`rounded-lg border p-2.5 ${meshConnected ? 'border-emerald-200/15 bg-emerald-200/[0.035]' : 'border-white/[0.07] bg-white/[0.015]'}`}>
                <p className="text-[9px] font-semibold text-slate-200">
                  Embedded mump2p node
                </p>
                <p className="mt-1 text-[9px] leading-4 text-slate-500">
                  Gateway’s participant in the separate mesh
                </p>
              </div>
            </div>
          </div>

          <ArrowRight
            aria-hidden="true"
            className="mx-auto h-4 w-4 rotate-90 self-center text-slate-600 2xl:rotate-0"
          />

          <div className="min-w-0 rounded-xl border border-emerald-200/10 bg-emerald-200/[0.025] p-3">
            <p className="text-[10px] font-semibold text-emerald-100/90">
              mump2p mesh
            </p>
            <div className="mt-2 rounded-lg border border-white/[0.07] bg-[#10151e] p-2.5">
              <div className="flex items-center gap-2">
                <Network aria-hidden="true" className="h-3.5 w-3.5 text-emerald-200" />
                <p className="text-[9px] font-semibold text-slate-200">
                  Other mump2p peer
                </p>
              </div>
              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                May be another Gateway’s embedded node
              </p>
              <span className={`mt-2 inline-flex items-center gap-1 text-[9px] ${meshConnected ? 'text-emerald-200' : 'text-slate-600'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${meshConnected ? 'bg-emerald-300' : 'bg-slate-600'}`} />
                {meshConnected ? 'Mesh link connected' : 'Mesh link disconnected'}
              </span>
            </div>
          </div>
        </div>

        {(outboundAtGateway || outboundOnMesh || inboundAtGateway || republishedToCl || deliveredToSubscriber) && (
          <div aria-label="Active message paths" className="mt-3 flex flex-wrap gap-2">
            {outboundAtGateway && (
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-cyan-200/10 bg-cyan-200/[0.04] px-2.5 py-1.5 text-[9px] text-cyan-100"
                initial={{ opacity: 0, x: -8 }}
              >
                CL Client A → Gateway
              </motion.span>
            )}
            {outboundOnMesh && (
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-emerald-200/10 bg-emerald-200/[0.04] px-2.5 py-1.5 text-[9px] text-emerald-100"
                initial={{ opacity: 0, x: -8 }}
              >
                Gateway → mump2p mesh
              </motion.span>
            )}
            {inboundAtGateway && (
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-emerald-200/10 bg-emerald-200/[0.04] px-2.5 py-1.5 text-[9px] text-emerald-100"
                initial={{ opacity: 0, x: 8 }}
              >
                mump2p mesh → Gateway
              </motion.span>
            )}
            {republishedToCl && (
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-violet-200/10 bg-violet-200/[0.04] px-2.5 py-1.5 text-[9px] text-violet-100"
                initial={{ opacity: 0, x: 8 }}
              >
                Gateway → CL GossipSub
              </motion.span>
            )}
            {deliveredToSubscriber && (
              <motion.span
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-cyan-200/10 bg-cyan-200/[0.04] px-2.5 py-1.5 text-[9px] text-cyan-100"
                initial={{ opacity: 0, x: 8 }}
              >
                CL GossipSub → Client B
              </motion.span>
            )}
          </div>
        )}
      </section>

      <section aria-label="Connection controls" className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            CL Client A · publisher link
          </p>
          {connectionButton('Client A', publisherConnected, () =>
            toggleConnection('publisher'),
          )}
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            CL Client B · subscriber link
          </p>
          <div className="space-y-2">
            {connectionButton('Client B', subscriberConnected, () =>
              toggleConnection('subscriber'),
            )}
            <button
              aria-pressed={subscriberSubscribed}
              className={`${secondaryButton} min-h-9 w-full px-2.5 text-[10px]`}
              onClick={toggleSubscription}
              type="button"
            >
              <Radio aria-hidden="true" className="h-3 w-3" />
              {subscriberSubscribed ? 'Leave demo/blocks topic' : 'Subscribe to demo/blocks'}
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            Embedded node · mesh link
          </p>
          {connectionButton('mump2p peer', meshConnected, () =>
            toggleConnection('mesh'),
          )}
        </div>
      </section>

      <section aria-label="Message flow controls" className="space-y-3">
        <div className="rounded-xl border border-cyan-200/10 bg-cyan-200/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <Send aria-hidden="true" className="h-3.5 w-3.5 text-cyan-100" />
            <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-100/80">
              Client → Gateway → mump2p
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={primaryButton}
              disabled={!publisherConnected || outboundAtGateway}
              onClick={publishFromClient}
              type="button"
            >
              {outboundAtGateway ? 'Message reached Gateway' : 'Publish from Client A'}
            </button>
            <button
              className={secondaryButton}
              disabled={!outboundAtGateway || outboundOnMesh}
              onClick={forwardToMesh}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              {outboundOnMesh ? 'Forwarded to mesh' : 'Forward through mump2p'}
            </button>
          </div>
          {!publisherConnected && (
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Connect Client A before it can gossip a message to the Gateway.
            </p>
          )}
          {outboundAtGateway && !meshConnected && !outboundOnMesh && (
            <p className="mt-2 text-[9px] leading-4 text-amber-100/70">
              The Gateway has the CL message, but the disconnected mesh link
              prevents forwarding. Reconnect the peer and retry.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-emerald-200/10 bg-emerald-200/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 rotate-180 text-emerald-100" />
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-100/80">
              mump2p → Gateway → subscribed CL client
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={secondaryButton}
              onClick={receiveFromMesh}
              type="button"
            >
              <Network aria-hidden="true" className="h-3.5 w-3.5" />
              Simulate message from mesh peer
            </button>
            <button
              className={secondaryButton}
              disabled={!inboundAtGateway || republishedToCl}
              onClick={republishToCl}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              Republish to local CL topic
            </button>
            <button
              className={secondaryButton}
              disabled={!republishedToCl || deliveredToSubscriber}
              onClick={deliverToSubscriber}
              type="button"
            >
              <Radio aria-hidden="true" className="h-3.5 w-3.5" />
              Deliver to Client B
            </button>
          </div>
          {republishedToCl && !deliveredToSubscriber && (
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              {subscriberConnected
                ? subscriberSubscribed
                  ? 'Client B is subscribed and can receive the local CL gossip.'
                  : 'Client B is connected but has not joined the topic; delivery is not shown until it subscribes.'
                : 'The Gateway published locally, but Client B is disconnected.'}
            </p>
          )}
        </div>
      </section>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        <button className={secondaryButton} onClick={reset} type="button">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Replay / reset
        </button>
        <span className="self-center text-[9px] text-slate-600">
          {meshEventReady
            ? outboundOnMesh
              ? 'Outbound path reached a mesh peer.'
              : 'A message is at the Gateway; check the peer link before forwarding.'
            : 'Connect peers, publish in one direction, then simulate the return path.'}
        </span>
      </div>

      <section
        aria-label="Gateway simulation event log"
        className="rounded-xl border border-white/[0.07] bg-black/20 p-3"
      >
        <div className="mb-2 flex items-center gap-2">
          <Share2 aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Event log
          </p>
        </div>
        <ol aria-live="polite" className="max-h-52 space-y-1.5 overflow-y-auto">
          {events.map((event, index) => (
            <motion.li
              animate={{ opacity: 1, y: 0 }}
              className="break-words rounded-md bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] leading-4 text-slate-400"
              initial={{ opacity: 0, y: 4 }}
              key={`${index}-${event}`}
            >
              {String(index + 1).padStart(2, '0')} · {event}
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function BeaconNodeDemo() {
  const [apiConnected, setApiConnected] = useState(false)
  const [clConnected, setClConnected] = useState(false)
  const [meshConnected, setMeshConnected] = useState(false)
  const [dutyReady, setDutyReady] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [gatewaySawMessage, setGatewaySawMessage] = useState(false)
  const [meshPublished, setMeshPublished] = useState(false)
  const [meshMessageAtGateway, setMeshMessageAtGateway] = useState(false)
  const [gatewayRepublished, setGatewayRepublished] = useState(false)
  const [beaconNodeHandled, setBeaconNodeHandled] = useState(false)
  const [validatorRead, setValidatorRead] = useState(false)
  const [events, setEvents] = useState([
    'Ready · Connect the links to explore the separate API and P2P paths.',
  ])

  const addEvent = (message: string) => {
    setEvents((current) => [...current, message].slice(-14))
  }

  const toggleLink = (link: 'api' | 'cl' | 'mesh') => {
    const current =
      link === 'api'
        ? apiConnected
        : link === 'cl'
          ? clConnected
          : meshConnected
    const next = !current
    if (link === 'api') setApiConnected(next)
    if (link === 'cl') setClConnected(next)
    if (link === 'mesh') setMeshConnected(next)
    const name =
      link === 'api'
        ? 'Validator Client ↔ Beacon API'
        : link === 'cl'
          ? 'Beacon Node ↔ Gateway CL peer'
          : 'Gateway ↔ mump2p mesh'
    addEvent(`${next ? 'Connected' : 'Disconnected'} · ${name}`)
  }

  const requestDuty = () => {
    setDutyReady(true)
    addEvent(
      'Beacon API · Validator Client requests duty data; Beacon Node returns a teaching-example response.',
    )
  }

  const submitSignedMessage = () => {
    setSubmitted(true)
    addEvent(
      'Beacon API · Validator Client simulates signing and submits a consensus message to its Beacon Node.',
    )
  }

  const gossipFromBeaconNode = () => {
    if (!clConnected) {
      addEvent(
        'Consensus GossipSub · Beacon Node can have other CL peers, but this Gateway is disconnected and cannot observe this example message.',
      )
      return
    }
    setGatewaySawMessage(true)
    addEvent(
      'Consensus GossipSub · Beacon Node shares the example message with its connected Gateway peer on a selected topic.',
    )
  }

  const forwardToMesh = () => {
    if (!meshConnected) {
      addEvent(
        'Blocked · Gateway has the CL-side message, but its mump2p mesh link is disconnected.',
      )
      return
    }
    setMeshPublished(true)
    addEvent(
      'mump2p · Gateway hands the eligible message to its embedded node for mesh propagation.',
    )
  }

  const receiveFromMesh = () => {
    if (!meshConnected) {
      addEvent(
        'Blocked · Gateway cannot receive this example message while its mump2p mesh link is disconnected.',
      )
      return
    }
    setMeshMessageAtGateway(true)
    addEvent(
      'mump2p · A message from another mesh participant reaches the Gateway’s embedded node.',
    )
  }

  const republishToConsensus = () => {
    if (!clConnected) {
      addEvent(
        'Blocked · Gateway received the mesh message, but the Beacon Node CL peer link is disconnected.',
      )
      return
    }
    setGatewayRepublished(true)
    addEvent(
      'Consensus GossipSub · Gateway maps the message and publishes it on its local CL topic.',
    )
  }

  const processAtBeaconNode = () => {
    setBeaconNodeHandled(true)
    addEvent(
      'Beacon Node · The incoming CL message reaches the node’s ordinary consensus-client processing; this simulation does not model validation.',
    )
  }

  const queryUpdatedState = () => {
    if (!apiConnected) {
      addEvent(
        'Blocked · Validator Client cannot query this Beacon Node while the simulated Beacon API link is disconnected.',
      )
      return
    }
    setValidatorRead(true)
    addEvent(
      'Beacon API · Validator Client requests relevant current node data; this is a query, not a direct Gateway push.',
    )
  }

  const reset = () => {
    setApiConnected(false)
    setClConnected(false)
    setMeshConnected(false)
    setDutyReady(false)
    setSubmitted(false)
    setGatewaySawMessage(false)
    setMeshPublished(false)
    setMeshMessageAtGateway(false)
    setGatewayRepublished(false)
    setBeaconNodeHandled(false)
    setValidatorRead(false)
    setEvents([
      'Ready · Connect the links to explore the separate API and P2P paths.',
    ])
  }

  const linkClass = (connected: boolean, color: string) =>
    `flex min-w-0 flex-col items-center justify-center gap-1 px-1 text-center text-[9px] ${connected ? color : 'text-slate-600'}`
  const controlButton = (
    label: string,
    connected: boolean,
    onClick: () => void,
  ) => (
    <button
      aria-pressed={connected}
      className={`${connected ? secondaryButton : primaryButton} min-h-9 w-full px-2.5 text-[10px]`}
      onClick={onClick}
      type="button"
    >
      <CircleDot
        aria-hidden="true"
        className={`h-3 w-3 ${connected ? 'text-emerald-200' : ''}`}
      />
      {connected ? `Disconnect ${label}` : `Connect ${label}`}
    </button>
  )

  return (
    <div
      aria-label="Beacon Node integration simulation"
      className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <section aria-labelledby="beacon-architecture-title">
        <div className="mb-3">
          <h3
            className="text-xs font-semibold text-slate-200"
            id="beacon-architecture-title"
          >
            Two links, three networking roles
          </h3>
          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            The Validator Client uses the Beacon API. The Beacon Node peers with
            Gateway over consensus-layer libp2p. Gateway’s embedded node joins
            the separate mump2p mesh.
          </p>
        </div>

        <div className="grid items-stretch gap-2 lg:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.05fr)_auto_minmax(0,1.3fr)_auto_minmax(0,1fr)]">
          <div className="rounded-xl border border-violet-200/10 bg-violet-200/[0.025] p-3">
            <div className="flex items-center gap-2">
              <Server aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
              <p className="text-[10px] font-semibold text-slate-200">
                Validator Client
              </p>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Uses validator keys and requests data from its Beacon Node.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[9px] text-slate-500">
              <span className={`h-1.5 w-1.5 rounded-full ${validatorRead ? 'bg-violet-200' : 'bg-slate-600'}`} />
              {validatorRead ? 'Queried Beacon API' : 'No API query yet'}
            </span>
          </div>

          <div className={linkClass(apiConnected, 'text-violet-200')}>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 lg:rotate-0"
            />
            <span>Beacon API</span>
            <span className="text-slate-600">HTTP</span>
          </div>

          <div className="rounded-xl border border-cyan-200/10 bg-cyan-200/[0.025] p-3">
            <div className="flex items-center gap-2">
              <Network aria-hidden="true" className="h-3.5 w-3.5 text-cyan-200" />
              <p className="text-[10px] font-semibold text-slate-200">
                Beacon Node
              </p>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Consensus client; the Gateway is an additional CL peer.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[9px] text-slate-500">
              <span className={`h-1.5 w-1.5 rounded-full ${beaconNodeHandled ? 'bg-cyan-200' : 'bg-slate-600'}`} />
              {beaconNodeHandled ? 'Handled simulated CL message' : 'Consensus processing not simulated'}
            </span>
          </div>

          <div className={linkClass(clConnected, 'text-cyan-200')}>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 lg:rotate-0"
            />
            <span>CL libp2p</span>
            <span className="text-slate-600">selected gossip</span>
          </div>

          <div className="rounded-xl border border-cyan-200/15 bg-cyan-200/[0.035] p-3">
            <div className="flex items-center gap-2">
              <Radio aria-hidden="true" className="h-3.5 w-3.5 text-cyan-100" />
              <p className="text-[10px] font-semibold text-cyan-100">
                Optimum Gateway
              </p>
            </div>
            <div className="mt-2 grid gap-1.5">
              <div className="rounded-lg border border-white/[0.07] bg-black/20 px-2 py-1.5 text-center text-[9px] text-slate-400">
                CL-facing libp2p host + message bridge
              </div>
              <div className="text-center text-[9px] text-slate-600">separate interfaces</div>
              <div className="rounded-lg border border-emerald-200/10 bg-emerald-200/[0.025] px-2 py-1.5 text-center text-[9px] text-emerald-100/80">
                Embedded mump2p node
              </div>
            </div>
            <div className="mt-2 space-y-1 text-[9px] text-slate-500">
              <p>{gatewaySawMessage ? 'CL message observed by Gateway' : 'Waiting for selected CL gossip'}</p>
              <p>{meshMessageAtGateway ? 'Mesh message received' : 'No mesh message received'}</p>
            </div>
          </div>

          <div className={linkClass(meshConnected, 'text-emerald-200')}>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 lg:rotate-0"
            />
            <span>mump2p</span>
            <span className="text-slate-600">mesh</span>
          </div>

          <div className="rounded-xl border border-emerald-200/10 bg-emerald-200/[0.025] p-3">
            <div className="flex items-center gap-2">
              <CircleDot aria-hidden="true" className="h-3.5 w-3.5 text-emerald-200" />
              <p className="text-[10px] font-semibold text-slate-200">
                Other mesh peers
              </p>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Separate P2P network; not Beacon API clients.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[9px] text-slate-500">
              <span className={`h-1.5 w-1.5 rounded-full ${meshPublished ? 'bg-emerald-200' : 'bg-slate-600'}`} />
              {meshPublished ? 'Outbound example forwarded' : 'No outbound example yet'}
            </span>
          </div>
        </div>

        <p className="mt-3 rounded-lg border border-amber-200/10 bg-amber-200/[0.025] px-3 py-2 text-[9px] leading-4 text-amber-100/70">
          There is no direct Validator Client → Gateway connection in this
          diagram. The exact Beacon Node/Gateway dial direction varies by
          consensus client.
        </p>
      </section>

      <section aria-label="Connection controls" className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            Validator Client ↔ Beacon API
          </p>
          {controlButton('API link', apiConnected, () => toggleLink('api'))}
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            Beacon Node ↔ Gateway
          </p>
          {controlButton('CL peer', clConnected, () => toggleLink('cl'))}
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            Gateway ↔ mump2p mesh
          </p>
          {controlButton('mesh link', meshConnected, () => toggleLink('mesh'))}
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2" aria-label="Message flow controls">
        <div className="rounded-xl border border-violet-200/10 bg-violet-200/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <Send aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
            <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-100/80">
              Validator Client → Beacon Node → Gateway
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={primaryButton}
              disabled={!apiConnected || dutyReady}
              onClick={requestDuty}
              type="button"
            >
              {dutyReady ? 'Duty data returned' : 'Request duty data'}
            </button>
            <button
              className={secondaryButton}
              disabled={!apiConnected || !dutyReady || submitted}
              onClick={submitSignedMessage}
              type="button"
            >
              {submitted ? 'Submitted to Beacon Node' : 'Sign & submit (simulate)'}
            </button>
            <button
              className={secondaryButton}
              disabled={!submitted}
              onClick={gossipFromBeaconNode}
              type="button"
            >
              <Radio aria-hidden="true" className="h-3.5 w-3.5" />
              Beacon Node gossips
            </button>
            <button
              className={secondaryButton}
              disabled={!gatewaySawMessage || meshPublished}
              onClick={forwardToMesh}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              Forward from Gateway to mesh
            </button>
          </div>
          {!apiConnected && (
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Connect the Beacon API link before requesting duties or submitting
              a simulated signed message.
            </p>
          )}
          {gatewaySawMessage && !meshConnected && !meshPublished && (
            <p className="mt-2 text-[9px] leading-4 text-amber-100/70">
              Gateway observed the CL-side message, but its disconnected mesh
              link prevents forwarding. Reconnect and retry.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-emerald-200/10 bg-emerald-200/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 rotate-180 text-emerald-100"
            />
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-100/80">
              Mesh → Gateway → Beacon Node → Validator Client
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={secondaryButton}
              onClick={receiveFromMesh}
              type="button"
            >
              <Network aria-hidden="true" className="h-3.5 w-3.5" />
              Simulate message from mesh
            </button>
            <button
              className={secondaryButton}
              disabled={!meshMessageAtGateway || gatewayRepublished}
              onClick={republishToConsensus}
              type="button"
            >
              Republish to CL topic
            </button>
            <button
              className={secondaryButton}
              disabled={!gatewayRepublished || beaconNodeHandled}
              onClick={processAtBeaconNode}
              type="button"
            >
              Beacon Node handles message
            </button>
            <button
              className={secondaryButton}
              disabled={!beaconNodeHandled || validatorRead}
              onClick={queryUpdatedState}
              type="button"
            >
              Validator queries API
            </button>
          </div>
          {meshMessageAtGateway && !clConnected && !gatewayRepublished && (
            <p className="mt-2 text-[9px] leading-4 text-amber-100/70">
              Gateway has the mesh message, but cannot publish it to the
              disconnected Beacon Node peer.
            </p>
          )}
          {beaconNodeHandled && !apiConnected && !validatorRead && (
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              The Validator Client would need its Beacon API connection to
              request relevant node data; Gateway does not push directly to it.
            </p>
          )}
        </div>
      </section>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        <button className={secondaryButton} onClick={reset} type="button">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Reset simulation
        </button>
        <span className="self-center text-[9px] text-slate-600">
          Signing, gossip, and message handling are conceptual events only.
        </span>
      </div>

      <section
        aria-label="Beacon Node integration event log"
        className="rounded-xl border border-white/[0.07] bg-black/20 p-3"
      >
        <div className="mb-2 flex items-center gap-2">
          <Share2 aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Event log
          </p>
        </div>
        <ol aria-live="polite" className="max-h-52 space-y-1.5 overflow-y-auto">
          {events.map((event, index) => (
            <motion.li
              animate={{ opacity: 1, y: 0 }}
              className="break-words rounded-md bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] leading-4 text-slate-400"
              initial={{ opacity: 0, y: 4 }}
              key={`${index}-${event}`}
            >
              {String(index + 1).padStart(2, '0')} · {event}
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function SignalConnectivityDemo() {
  type CheckValue = 'yes' | 'no' | 'unknown'
  type CheckResults = {
    enrolled: CheckValue
    seen: CheckValue
    blocks: CheckValue
  }
  type LocalSnapshot = {
    clPeers: string
    meshPeers: string
    blockTraffic: string
  }

  const [keyCreated, setKeyCreated] = useState(false)
  const [gatewayRunning, setGatewayRunning] = useState(false)
  const [gatewayEnrolled, setGatewayEnrolled] = useState(false)
  const [outboundAccess, setOutboundAccess] = useState(true)
  const [clPeerConnected, setClPeerConnected] = useState(false)
  const [meshPeerConnected, setMeshPeerConnected] = useState(false)
  const [blocksArriving, setBlocksArriving] = useState(false)
  const [lookupAvailable, setLookupAvailable] = useState(true)
  const [checkResults, setCheckResults] = useState<CheckResults | null>(null)
  const [localSnapshot, setLocalSnapshot] = useState<LocalSnapshot | null>(null)
  const [events, setEvents] = useState([
    'Ready · Create a demo enrollment key, then start the Gateway.',
  ])

  const addEvent = (message: string) => {
    setEvents((current) => [...current, message].slice(-14))
  }

  const generateKey = () => {
    setKeyCreated(true)
    addEvent(
      'Signal Console · A demo enrollment key for the selected network is ready; one real key can enroll multiple Gateways.',
    )
  }

  const startOrEnroll = () => {
    if (!gatewayRunning) {
      setGatewayRunning(true)
      addEvent('Gateway · Process started on the operator’s host.')
    }

    if (gatewayEnrolled) {
      addEvent(
        'Gateway · Existing enrolled credential is used; the Gateway identity is retained.',
      )
      return
    }
    if (!keyCreated) {
      addEvent(
        'Enrollment blocked · Create an enrollment key in Signal before first enrollment.',
      )
      return
    }
    if (!outboundAccess) {
      addEvent(
        'Enrollment blocked · The running Gateway cannot reach the required Optimum services in this simulation.',
      )
      return
    }

    setGatewayEnrolled(true)
    addEvent(
      'Optimum enrollment · Gateway creates its own identity, enrolls, and stores the credential for later starts.',
    )
  }

  const stopGateway = () => {
    if (!gatewayRunning) {
      addEvent('Gateway · The process is already stopped.')
      return
    }
    setGatewayRunning(false)
    setClPeerConnected(false)
    setMeshPeerConnected(false)
    setBlocksArriving(false)
    setLocalSnapshot(null)
    addEvent(
      gatewayEnrolled
        ? 'Gateway · Process stopped. Its enrolled credential remains in persistent identity storage.'
        : 'Gateway · Process stopped before enrollment; no enrolled credential was created.',
    )
  }

  const toggleOutboundAccess = () => {
    const next = !outboundAccess
    setOutboundAccess(next)
    if (!next) {
      setMeshPeerConnected(false)
      setBlocksArriving(false)
    }
    addEvent(
      `${next ? 'Restored' : 'Blocked'} · Simulated Gateway outbound access to Optimum services and mesh peers.`,
    )
  }

  const toggleClPeer = () => {
    if (!gatewayRunning || !gatewayEnrolled) {
      addEvent(
        'CL peer blocked · Start and enroll the Gateway before connecting the Beacon Node.',
      )
      return
    }
    const next = !clPeerConnected
    setClPeerConnected(next)
    if (!next) setBlocksArriving(false)
    addEvent(
      `${next ? 'Connected' : 'Disconnected'} · Beacon Node ↔ Gateway consensus peer.`,
    )
  }

  const toggleMeshPeer = () => {
    if (!gatewayRunning || !gatewayEnrolled) {
      addEvent(
        'Mesh peer blocked · Start and enroll the Gateway before connecting to the Optimum mesh.',
      )
      return
    }
    if (!outboundAccess && !meshPeerConnected) {
      addEvent(
        'Mesh peer blocked · The simulated Gateway outbound path to Optimum peers is unavailable.',
      )
      return
    }
    const next = !meshPeerConnected
    setMeshPeerConnected(next)
    if (!next) setBlocksArriving(false)
    addEvent(
      `${next ? 'Connected' : 'Disconnected'} · Gateway ↔ Optimum mesh peer.`,
    )
  }

  const simulateBlockArrival = () => {
    if (
      !gatewayRunning ||
      !gatewayEnrolled ||
      !outboundAccess ||
      !clPeerConnected ||
      !meshPeerConnected
    ) {
      addEvent(
        'No block arrival · This teaching path needs a running, enrolled Gateway, a Beacon Node peer, and a mesh peer.',
      )
      return
    }
    setBlocksArriving(true)
    addEvent(
      'Mesh path · A teaching-example block passes from the Beacon Node through Gateway to a mesh peer.',
    )
  }

  const toggleLookup = () => {
    const next = !lookupAvailable
    setLookupAvailable(next)
    addEvent(
      `Signal lookup ${next ? 'available' : 'unavailable'} · This only changes whether the simulated external check responds.`,
    )
  }

  const runSignalCheck = () => {
    if (!lookupAvailable) {
      setCheckResults({
        enrolled: 'unknown',
        seen: 'unknown',
        blocks: 'unknown',
      })
      addEvent(
        'Signal Verify · Could not check. The lookup did not answer; this does not establish that the Gateway is down.',
      )
      return
    }

    const seen =
      gatewayRunning && gatewayEnrolled && outboundAccess
    const result: CheckResults = {
      enrolled: gatewayEnrolled ? 'yes' : 'no',
      seen: seen ? 'yes' : 'no',
      blocks: blocksArriving ? 'yes' : 'no',
    }
    setCheckResults(result)
    addEvent(
      `Signal Verify · Enrolled: ${result.enrolled}; Seen recently: ${result.seen}; Blocks arriving at mesh: ${result.blocks}.`,
    )
  }

  const inspectLocalHealth = () => {
    const snapshot: LocalSnapshot = {
      clPeers: gatewayRunning && clPeerConnected ? '1' : '0',
      meshPeers: gatewayRunning && meshPeerConnected ? '1' : '0',
      blockTraffic: blocksArriving ? 'recent in this demo' : 'not shown yet',
    }
    setLocalSnapshot(snapshot)
    addEvent(
      `Gateway host · Local health cues: cl_peers=${snapshot.clPeers}, mump2p peers=${snapshot.meshPeers}; Signal Verify does not show the CL peer count.`,
    )
  }

  const reset = () => {
    setKeyCreated(false)
    setGatewayRunning(false)
    setGatewayEnrolled(false)
    setOutboundAccess(true)
    setClPeerConnected(false)
    setMeshPeerConnected(false)
    setBlocksArriving(false)
    setLookupAvailable(true)
    setCheckResults(null)
    setLocalSnapshot(null)
    setEvents([
      'Ready · Create a demo enrollment key, then start the Gateway.',
    ])
  }

  const statusText = (value: CheckValue) => {
    if (value === 'unknown') return 'Could not check'
    if (value === 'yes') return 'Yes'
    return 'No'
  }

  const checkRows: [string, string][] = [
    [
      'Gateway enrolled',
      checkResults ? statusText(checkResults.enrolled) : 'Not checked',
    ],
    [
      'Seen recently',
      checkResults ? statusText(checkResults.seen) : 'Not checked',
    ],
    [
      'Blocks arriving at mesh',
      checkResults ? statusText(checkResults.blocks) : 'Not checked',
    ],
  ]
  const healthRows: [string, string][] = [
    ['cl_peers', localSnapshot?.clPeers ?? 'Not checked'],
    ['mump2p peers', localSnapshot?.meshPeers ?? 'Not checked'],
    ['Block traffic', localSnapshot?.blockTraffic ?? 'Not checked'],
  ]

  const stateBadge = (active: boolean, text: string) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] ${
        active
          ? 'border-emerald-200/15 bg-emerald-200/[0.04] text-emerald-100'
          : 'border-white/[0.07] bg-white/[0.02] text-slate-500'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-200' : 'bg-slate-600'}`}
      />
      {text}
    </span>
  )

  const controlButton = (
    label: string,
    active: boolean,
    onClick: () => void,
    disabled = false,
  ) => (
    <button
      aria-pressed={active}
      className={`${active ? secondaryButton : primaryButton} min-h-9 w-full px-2.5 text-[10px] disabled:cursor-not-allowed disabled:opacity-40`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <CircleDot
        aria-hidden="true"
        className={`h-3 w-3 ${active ? 'text-emerald-200' : ''}`}
      />
      {label}
    </button>
  )

  return (
    <div
      aria-label="Signal and Gateway connectivity simulation"
      className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <section aria-labelledby="signal-architecture-title">
        <div className="mb-3">
          <h3
            className="text-xs font-semibold text-slate-200"
            id="signal-architecture-title"
          >
            Operator checks are separate from the block path
          </h3>
          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Solid links show the Beacon Node, Gateway, and mesh path. The
            dashed support lane represents Console setup, enrollment, and
            status checks—not block forwarding through Signal.
          </p>
        </div>

        <div className="rounded-xl border border-violet-200/10 bg-violet-200/[0.02] p-3">
          <div className="grid items-center gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)]">
            <div className="rounded-lg border border-violet-200/10 bg-black/20 p-2.5">
              <p className="text-[10px] font-semibold text-violet-100">
                Signal Console
              </p>
              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Operator setup · enrollment key · Verify results
              </p>
            </div>
            <div className="flex items-center justify-center gap-1 text-center text-[9px] text-violet-200/70">
              <ArrowLeftRight
                aria-hidden="true"
                className="h-3.5 w-3.5 rotate-90 md:rotate-0"
              />
              <span>setup ↔ results</span>
            </div>
            <div className="rounded-lg border border-violet-200/10 bg-black/20 p-2.5">
              <p className="text-[10px] font-semibold text-slate-200">
                Optimum services
              </p>
              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Enrollment · bootstrap · reported status
              </p>
            </div>
          </div>
          <div className="mt-2 text-center text-[9px] text-violet-100/60">
            Gateway connects outbound for enrollment and documented services;
            Signal shows external observations.
          </div>
        </div>

        <div className="my-2 flex items-center justify-center gap-2 text-[9px] text-slate-600">
          <span className="h-px w-8 border-t border-dashed border-violet-200/20" />
          <span>support plane is not the message route</span>
          <span className="h-px w-8 border-t border-dashed border-violet-200/20" />
        </div>

        <div className="grid items-stretch gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1fr)]">
          <div className="rounded-xl border border-cyan-200/10 bg-cyan-200/[0.025] p-3">
            <div className="flex items-center gap-2">
              <Server aria-hidden="true" className="h-3.5 w-3.5 text-cyan-200" />
              <p className="text-[10px] font-semibold text-slate-200">
                Beacon Node
              </p>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Consensus client sends/receives selected CL gossip.
            </p>
            <div className="mt-2">
              {stateBadge(
                clPeerConnected,
                clPeerConnected ? 'CL peer connected' : 'No CL peer',
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-[9px] text-slate-500">
            <ArrowLeftRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 text-cyan-200/70 md:rotate-0"
            />
            <span>33212/tcp</span>
            <span>CL peer</span>
          </div>

          <div className="rounded-xl border border-cyan-200/15 bg-cyan-200/[0.035] p-3">
            <div className="flex items-center gap-2">
              <Radio aria-hidden="true" className="h-3.5 w-3.5 text-cyan-100" />
              <p className="text-[10px] font-semibold text-cyan-100">
                Optimum Gateway
              </p>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              CL-facing peer and a separate mesh-facing node.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {stateBadge(gatewayRunning, gatewayRunning ? 'Running' : 'Stopped')}
              {stateBadge(gatewayEnrolled, gatewayEnrolled ? 'Enrolled' : 'Not enrolled')}
              {stateBadge(meshPeerConnected, meshPeerConnected ? 'Mesh peer' : 'No mesh peer')}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 text-[9px] text-slate-500">
            <ArrowLeftRight
              aria-hidden="true"
              className="h-4 w-4 rotate-90 text-emerald-200/70 md:rotate-0"
            />
            <span>33213/tcp</span>
            <span>mesh</span>
          </div>

          <div className="rounded-xl border border-emerald-200/10 bg-emerald-200/[0.025] p-3">
            <div className="flex items-center gap-2">
              <Network aria-hidden="true" className="h-3.5 w-3.5 text-emerald-200" />
              <p className="text-[10px] font-semibold text-slate-200">
                Optimum mesh
              </p>
            </div>
            <p className="mt-2 text-[9px] leading-4 text-slate-500">
              Other Gateway mesh peers; not the Signal Console.
            </p>
            <div className="mt-2">
              {stateBadge(blocksArriving, blocksArriving ? 'Block reached mesh' : 'No block shown')}
            </div>
          </div>
        </div>

        <p className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2 text-[9px] leading-4 text-slate-500">
          48123/tcp is a separate, loopback-only Gateway health/metrics/self-info
          endpoint. Check it on the Gateway host; do not expose it publicly.
        </p>
      </section>

      <section aria-label="Signal and Gateway controls" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            1 · Enrollment
          </p>
          <div className="space-y-2">
            <button
              aria-pressed={keyCreated}
              className={`${keyCreated ? secondaryButton : primaryButton} min-h-9 w-full px-2.5 text-[10px]`}
              disabled={keyCreated}
              onClick={generateKey}
              type="button"
            >
              {keyCreated ? 'Demo enrollment key ready' : 'Create demo enrollment key'}
            </button>
            <button
              className={primaryButton}
              onClick={startOrEnroll}
              type="button"
            >
              {gatewayRunning && gatewayEnrolled
                ? 'Reuse credential / confirm start'
                : gatewayRunning
                  ? 'Retry Gateway enrollment'
                  : 'Start Gateway / enroll'}
            </button>
            <button
              className={`${secondaryButton} min-h-9 w-full px-2.5 text-[10px] disabled:cursor-not-allowed disabled:opacity-40`}
              disabled={!gatewayRunning}
              onClick={stopGateway}
              type="button"
            >
              Stop Gateway
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            2 · Gateway network
          </p>
          <div className="space-y-2">
            {controlButton(
              outboundAccess
                ? 'Block outbound Optimum access'
                : 'Restore outbound Optimum access',
              outboundAccess,
              toggleOutboundAccess,
            )}
            {controlButton(
              clPeerConnected
                ? 'Disconnect Beacon Node peer'
                : 'Connect Beacon Node peer',
              clPeerConnected,
              toggleClPeer,
            )}
            {controlButton(
              meshPeerConnected
                ? 'Disconnect mesh peer'
                : 'Connect mesh peer',
              meshPeerConnected,
              toggleMeshPeer,
            )}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] font-semibold text-slate-300">
            3 · Checks and block flow
          </p>
          <div className="space-y-2">
            {controlButton(
              lookupAvailable
                ? 'Make Signal lookup unavailable'
                : 'Restore Signal lookup',
              lookupAvailable,
              toggleLookup,
            )}
            <button
              className={secondaryButton}
              onClick={simulateBlockArrival}
              type="button"
            >
              <Send aria-hidden="true" className="h-3.5 w-3.5" />
              Simulate block reaching mesh
            </button>
            <button
              className={primaryButton}
              onClick={runSignalCheck}
              type="button"
            >
              Run Signal Verify
            </button>
            <button
              className={secondaryButton}
              onClick={inspectLocalHealth}
              type="button"
            >
              Inspect host-local health cues
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2" aria-label="Check results">
        <div className="rounded-xl border border-violet-200/10 bg-violet-200/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <CircleDot aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
            <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-100/80">
              Signal Verify · external observation
            </p>
          </div>
          <dl className="space-y-2 text-[10px]">
            {checkRows.map(([label, value]) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg bg-black/20 px-2.5 py-2"
                key={label}
              >
                <dt className="text-slate-400">{label}</dt>
                <dd className="font-medium text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[9px] leading-4 text-slate-600">
            One simulated Gateway. Real organization checks can aggregate
            several Gateways; these rows do not show CL peer state.
          </p>
        </div>

        <div className="rounded-xl border border-cyan-200/10 bg-cyan-200/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <Network aria-hidden="true" className="h-3.5 w-3.5 text-cyan-200" />
            <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-100/80">
              Gateway host · local health cues
            </p>
          </div>
          <dl className="space-y-2 text-[10px]">
            {healthRows.map(([label, value]) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg bg-black/20 px-2.5 py-2"
                key={label}
              >
                <dt className="font-mono text-slate-400">{label}</dt>
                <dd className="text-right font-medium text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[9px] leading-4 text-slate-600">
            Teaching snapshot only. Real `/health` includes additional checks;
            an initial 503 can be expected before the CL peer connects.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
        <button className={secondaryButton} onClick={reset} type="button">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Reset demo
        </button>
        <span className="self-center text-[9px] text-slate-600">
          Educational model · no live Signal account or Gateway connection.
        </span>
      </div>

      <section
        aria-label="Signal Gateway simulation event log"
        className="rounded-xl border border-white/[0.07] bg-black/20 p-3"
      >
        <div className="mb-2 flex items-center gap-2">
          <Share2 aria-hidden="true" className="h-3.5 w-3.5 text-violet-200" />
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Event log
          </p>
        </div>
        <ol aria-live="polite" className="max-h-52 space-y-1.5 overflow-y-auto">
          {events.map((event, index) => (
            <motion.li
              animate={{ opacity: 1, y: 0 }}
              className="break-words rounded-md bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] leading-4 text-slate-400"
              initial={{ opacity: 0, y: 4 }}
              key={`${index}-${event}`}
            >
              {String(index + 1).padStart(2, '0')} · {event}
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function ConsumerBlockStreamDemo() {
  type Transport = 'websocket' | 'grpc'
  type InputPath = 'cl' | 'mesh'

  const [streamEnabled, setStreamEnabled] = useState(false)
  const [streamOnly, setStreamOnly] = useState(false)
  const [transport, setTransport] = useState<Transport>('websocket')
  const [inputPath, setInputPath] = useState<InputPath>('cl')
  const [rawMode, setRawMode] = useState(false)
  const [consumerToken, setConsumerToken] = useState<
    'missing' | 'valid' | 'invalid'
  >('missing')
  const [consumerConnected, setConsumerConnected] = useState(false)
  const [paused, setPaused] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [dropped, setDropped] = useState(0)
  const [delivered, setDelivered] = useState(0)
  const [events, setEvents] = useState([
    'Ready · Enable the optional stream, issue a demo consumer token, and simulate block arrival.',
  ])

  const addEvent = (message: string) => {
    setEvents((current) => [...current, message].slice(-14))
  }

  const reset = () => {
    setStreamEnabled(false)
    setStreamOnly(false)
    setTransport('websocket')
    setInputPath('cl')
    setRawMode(false)
    setConsumerToken('missing')
    setConsumerConnected(false)
    setPaused(false)
    setBuffered(0)
    setDropped(0)
    setDelivered(0)
    setEvents([
      'Ready · Enable the optional stream, issue a demo consumer token, and simulate block arrival.',
    ])
  }

  const receiveBlock = () => {
    if (streamOnly && inputPath === 'cl') {
      addEvent(
        'CL input unavailable · Stream-only mode skips the CL host; choose a mesh observation.',
      )
      return
    }

    addEvent(
      `Gateway · Simulated Beacon Block observed through the ${inputPath === 'cl' ? 'CL' : 'mump2p mesh'} path and decoded by the Gateway.`,
    )
    if (!streamEnabled) {
      addEvent('Stream · Disabled; this block is not exposed to consumers.')
      return
    }
    if (!consumerConnected) {
      addEvent(
        'Consumer · No authenticated stream connection is open; this event is not queued for a later connection.',
      )
      return
    }
    if (paused) {
      if (buffered < 2) {
        setBuffered((count) => count + 1)
        addEvent(
          `Consumer · Paused; one event entered the tiny illustrative buffer (${buffered + 1}/2).`,
        )
      } else {
        setDropped((count) => count + 1)
        addEvent(
          `Consumer · Buffer full; event dropped. lagged cumulative dropped count: ${dropped + 1}.`,
        )
      }
      return
    }
    setDelivered((count) => count + 1)
    addEvent(
      `Stream · Block event delivered over ${transport === 'websocket' ? 'WebSocket' : 'gRPC'} in ${rawMode ? 'raw' : 'metadata'} mode.`,
    )
  }

  const connectConsumer = () => {
    if (!streamEnabled) {
      addEvent(
        'Stream unavailable · Enable the opt-in Consumer Block Stream before connecting.',
      )
      return
    }
    if (consumerToken !== 'valid') {
      addEvent(
        `Authentication failed · ${consumerToken === 'missing' ? 'No consumer JWT was supplied.' : 'The simulated consumer JWT was rejected.'}`,
      )
      return
    }
    if (consumerConnected) {
      addEvent(
        `Consumer · Already connected over ${transport === 'websocket' ? 'WebSocket' : 'gRPC'}.`,
      )
      return
    }
    setConsumerConnected(true)
    addEvent(
      `Connected · Authenticated consumer stream opened over ${transport === 'websocket' ? 'WebSocket' : 'gRPC'} in ${rawMode ? 'raw' : 'metadata'} mode.`,
    )
  }

  const toggleStreamOnly = () => {
    const next = !streamOnly
    setStreamOnly(next)
    if (next) setInputPath('mesh')
    addEvent(
      next
        ? 'Mode · Stream-only still joins the mesh, but skips the CL host and does not publish.'
        : 'Mode · Normal Gateway mode selected; the CL host may provide an input path.',
    )
  }

  const simulateConnectionLimit = () => {
    addEvent(
      `Connection limit · ${transport === 'websocket' ? 'WebSocket responds with HTTP 503' : 'gRPC responds with ResourceExhausted'} when its configured stream connection cap is full.`,
    )
  }

  const simulateFastKeepalive = () => {
    addEvent(
      'gRPC keepalive · A client ping faster than the default 20-second minimum may receive GOAWAY: too_many_pings. This is separate from in-band heartbeats.',
    )
  }

  const emitHeartbeat = () => {
    addEvent(
      'Heartbeat · Simulated liveness event includes expected-slot metadata; a slot gap alone does not establish block loss.',
    )
  }

  return (
    <div
      aria-label="Consumer Block Stream educational simulation"
      className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#0b0f17] p-4 sm:p-5"
      role="group"
    >
      <section aria-label="Consumer Block Stream architecture">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold text-slate-200">
              Follow one block to a consumer
            </h3>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              The Gateway observes and decodes blocks; this optional, read-only
              stream delivers events downstream.
            </p>
          </div>
          <span className="rounded-full border border-amber-200/15 bg-amber-200/[0.04] px-2.5 py-1 text-[9px] font-medium text-amber-100/80">
            Educational simulation
          </span>
        </div>
        <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-xl border border-cyan-200/10 bg-cyan-200/[0.035] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-cyan-100/70">
              Block inputs
            </p>
            <p className="mt-2 text-[11px] text-slate-200">CL · mump2p mesh</p>
            <p className="mt-1 text-[9px] leading-4 text-slate-500">
              {streamOnly
                ? 'Stream-only: mesh remains; CL host is skipped.'
                : 'The Gateway can observe blocks via either documented path.'}
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="hidden h-4 w-4 self-center text-slate-600 sm:block"
          />
          <div className="rounded-xl border border-violet-200/10 bg-violet-200/[0.035] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-violet-100/70">
              Optimum Gateway
            </p>
            <p className="mt-2 text-[11px] text-slate-200">
              Observe · decode · expose
            </p>
            <p className="mt-1 text-[9px] leading-4 text-slate-500">
              Stream output is read-only and disabled by default.
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="hidden h-4 w-4 self-center text-slate-600 sm:block"
          />
          <div className="rounded-xl border border-emerald-200/10 bg-emerald-200/[0.035] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-100/70">
              Consumer
            </p>
            <p className="mt-2 text-[11px] text-slate-200">
              WebSocket or gRPC
            </p>
            <p className="mt-1 text-[9px] leading-4 text-slate-500">
              Authenticated with a consumer JWT, not a Gateway credential.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2" aria-label="Simulation controls">
        <div className="space-y-3 rounded-xl border border-white/[0.07] bg-white/[0.015] p-3">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              1 · Gateway and stream setup
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                aria-pressed={streamEnabled}
                className={streamEnabled ? primaryButton : secondaryButton}
                onClick={() => {
                  const next = !streamEnabled
                  setStreamEnabled(next)
                  if (!next) {
                    setConsumerConnected(false)
                    setBuffered(0)
                    setPaused(false)
                  }
                  addEvent(
                    !next
                      ? 'Configuration · Consumer stream disabled; its consumer connection is closed.'
                      : 'Configuration · Optional Consumer Block Stream enabled for this simulation.',
                  )
                }}
                type="button"
              >
                {streamEnabled ? 'Stream enabled' : 'Enable stream'}
              </button>
              <button
                aria-pressed={streamOnly}
                className={streamOnly ? primaryButton : secondaryButton}
                disabled={streamEnabled}
                onClick={toggleStreamOnly}
                type="button"
              >
                {streamOnly ? 'Stream-only mode' : 'Normal Gateway mode'}
              </button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              2 · Choose event representation and transport
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                aria-pressed={transport === 'websocket'}
                className={`${transport === 'websocket' ? primaryButton : secondaryButton} disabled:cursor-not-allowed disabled:opacity-40`}
                disabled={consumerConnected}
                onClick={() => setTransport('websocket')}
                type="button"
              >
                WebSocket
              </button>
              <button
                aria-pressed={transport === 'grpc'}
                className={`${transport === 'grpc' ? primaryButton : secondaryButton} disabled:cursor-not-allowed disabled:opacity-40`}
                disabled={consumerConnected}
                onClick={() => setTransport('grpc')}
                type="button"
              >
                gRPC
              </button>
              <button
                aria-pressed={!rawMode}
                className={`${!rawMode ? primaryButton : secondaryButton} disabled:cursor-not-allowed disabled:opacity-40`}
                disabled={consumerConnected}
                onClick={() => setRawMode(false)}
                type="button"
              >
                Metadata
              </button>
              <button
                aria-pressed={rawMode}
                className={`${rawMode ? primaryButton : secondaryButton} disabled:cursor-not-allowed disabled:opacity-40`}
                disabled={consumerConnected}
                onClick={() => setRawMode(true)}
                type="button"
              >
                Raw bytes
              </button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              3 · Consumer authentication
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                className={secondaryButton}
                onClick={() => {
                  setConsumerToken('valid')
                  addEvent(
                    'Auth service · Simulated consumer key exchanged for a short-lived JWT.',
                  )
                }}
                type="button"
              >
                Issue demo consumer token
              </button>
              <button
                className={secondaryButton}
                onClick={() => {
                  setConsumerToken('invalid')
                  addEvent('Consumer · Invalid-token case selected for the next connection.')
                }}
                type="button"
              >
                Simulate invalid token
              </button>
              <span className="self-center text-[9px] text-slate-500">
                Token: {consumerToken}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-white/[0.07] bg-white/[0.015] p-3">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              4 · Observe and deliver a block
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                aria-pressed={inputPath === 'cl'}
                className={inputPath === 'cl' ? primaryButton : secondaryButton}
                disabled={streamOnly}
                onClick={() => setInputPath('cl')}
                type="button"
              >
                CL input
              </button>
              <button
                aria-pressed={inputPath === 'mesh'}
                className={inputPath === 'mesh' ? primaryButton : secondaryButton}
                onClick={() => setInputPath('mesh')}
                type="button"
              >
                mump2p input
              </button>
              <button className={secondaryButton} onClick={receiveBlock} type="button">
                Simulate block arrival
              </button>
              <button className={primaryButton} onClick={connectConsumer} type="button">
                Connect consumer
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              aria-pressed={paused}
              className={secondaryButton}
              onClick={() => {
                setPaused((current) => !current)
                addEvent(
                  paused
                    ? 'Consumer · Reading resumed; queued events can now be delivered.'
                    : 'Consumer · Reading paused; incoming events use a tiny illustrative buffer.',
                )
              }}
              type="button"
            >
              {paused ? 'Resume consumer' : 'Pause consumer'}
            </button>
            {paused && (
              <button
                className={secondaryButton}
                onClick={() => {
                  setDelivered((count) => count + buffered)
                  addEvent(
                    `Consumer · Resumed and drained ${buffered} buffered event${buffered === 1 ? '' : 's'}; ${dropped} event${dropped === 1 ? ' was' : 's were'} dropped and are not replayed.`,
                  )
                  setBuffered(0)
                  setDropped(0)
                  setPaused(false)
                }}
                type="button"
              >
                Resume and drain
              </button>
            )}
            <span className="text-[9px] text-slate-500">
              Buffered: {buffered} · Dropped: {dropped} · Delivered: {delivered}
            </span>
          </div>
          <p className="text-[9px] leading-4 text-slate-600">
            The two-event buffer is only a small teaching device, not a Gateway
            setting. The documented default per-connection buffer is 64.
          </p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2" aria-label="Connection diagnostics">
        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Connection behavior
          </p>
          <div className="flex flex-wrap gap-2">
            <button className={secondaryButton} onClick={simulateConnectionLimit} type="button">
              Simulate full connection cap
            </button>
            <button className={secondaryButton} onClick={simulateFastKeepalive} type="button">
              Test fast gRPC keepalive
            </button>
            <button className={secondaryButton} onClick={emitHeartbeat} type="button">
              Emit heartbeat
            </button>
          </div>
          <p className="mt-2 text-[9px] leading-4 text-slate-600">
            These controls report documented behaviors; they do not open a real
            socket or change a Gateway configuration.
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Current simulation state
          </p>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[9px]">
            <dt className="text-slate-500">Input path</dt>
            <dd className="text-right text-slate-300">{inputPath}</dd>
            <dt className="text-slate-500">Stream</dt>
            <dd className="text-right text-slate-300">
              {streamEnabled ? 'enabled' : 'disabled · default'}
            </dd>
            <dt className="text-slate-500">Mode</dt>
            <dd className="text-right text-slate-300">
              {streamOnly ? 'stream-only' : 'normal'}
            </dd>
            <dt className="text-slate-500">Pending events</dt>
            <dd className="text-right text-slate-300">
              {consumerConnected ? 'connected' : 'not connected'}
            </dd>
          </dl>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
        <button className={secondaryButton} onClick={reset} type="button">
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Reset demo
        </button>
        <span className="text-[9px] text-slate-600">
          Educational model · no live Gateway, auth service, or consumer connection.
        </span>
      </div>

      <section
        aria-label="Consumer Block Stream event log"
        className="rounded-xl border border-white/[0.07] bg-black/20 p-3"
      >
        <div className="mb-2 flex items-center gap-2">
          <Radio aria-hidden="true" className="h-3.5 w-3.5 text-cyan-200" />
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            Event log
          </p>
        </div>
        <ol aria-live="polite" className="max-h-52 space-y-1.5 overflow-y-auto">
          {events.map((event, index) => (
            <motion.li
              animate={{ opacity: 1, y: 0 }}
              className="break-words rounded-md bg-white/[0.02] px-2.5 py-1.5 font-mono text-[9px] leading-4 text-slate-400"
              initial={{ opacity: 0, y: 4 }}
              key={`${index}-${event}`}
            >
              {String(index + 1).padStart(2, '0')} · {event}
            </motion.li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export function ModuleDemo({ type }: { type: LearningDemoType }) {
  switch (type) {
    case 'introduction':
      return <OptimumIntroductionDemo />
    case 'p2p':
      return <PeerToPeerDemo />
    case 'gossipsub':
      return <GossipSubDemo />
    case 'rlnc':
      return <RLNCDemo />
    case 'mump2p':
      return <Mump2pDemo />
    case 'gateway':
      return <GatewayDemo />
    case 'beacon':
      return <BeaconNodeDemo />
    case 'signal':
      return <SignalConnectivityDemo />
    case 'block-stream':
      return <ConsumerBlockStreamDemo />
  }
}
