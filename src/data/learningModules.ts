export type LearningModuleId =
  | 'introduction'
  | 'p2p'
  | 'gossipsub'
  | 'rlnc'
  | 'mump2p'
  | 'gateway'
  | 'beacon'
  | 'signal'
  | 'block-stream'

export type LearningDemoType = LearningModuleId

type LearningSource = {
  label: string
  href: string
}

export type LearningChapterSection = {
  title: string
  explanation: string
  example: string
  exampleSteps?: string[]
  visualConcept: string
  technicalDetails: string[]
  sources: LearningSource[]
}

export type LearningModule = {
  id: LearningModuleId
  order: string
  navTitle: string
  title: string
  category: string
  summary: string
  beginnerExplanation: string
  realWorldExample: string
  howItWorks: string[]
  whyItMatters: string
  practicalUseCases?: string[]
  terminologyNote?: string
  keyTakeaways: string[]
  demoType: LearningDemoType
  demoNote: string
  sources: LearningSource[]
  chapterSections?: LearningChapterSection[]
}

export const learningModuleOrder: LearningModuleId[] = [
  'introduction',
  'p2p',
  'gossipsub',
  'rlnc',
  'mump2p',
  'gateway',
  'beacon',
  'signal',
  'block-stream',
]

export const learningModules: Record<LearningModuleId, LearningModule> = {
  introduction: {
    id: 'introduction',
    order: '01',
    navTitle: 'Introduction',
    title: 'Introduction to Optimum',
    category: 'START HERE',
    summary:
      'Follow an Ethereum consensus message from a beacon node, through an operator-run Optimum Gateway and the mump2p mesh, to another beacon node. Learn what this network aims to improve, what the gateway actually does, and where the public evidence stops.',
    beginnerExplanation:
      'Optimum is an operator-run network of gateways that bridges Ethereum consensus-layer gossip with a peer-to-peer mesh using mump2p. A consensus-layer (CL) client, often called a beacon node, peers with the operator’s local Optimum Gateway. That gateway also joins the Optimum mesh and can relay selected messages between the two networks. The gateway does not replace the beacon node or validator client, and it does not handle validator signing keys.',
    realWorldExample:
      'Suppose a staking provider runs a beacon node for its validators. It runs an Optimum Gateway on a host that can reach that node, then connects the two as peers. If a block reaches the gateway through the Optimum mesh, the gateway can publish it into the beacon node’s consensus-layer gossip network. The validator client still gets its duties and signs through its own beacon node; Optimum is an additional message path, not a replacement validator stack.',
    howItWorks: [
      'The operator runs a Gateway and enrolls it through Console. Console supports operator setup and reporting; the operator runs the Gateway on their own infrastructure.',
      'The Gateway has a consensus-client-facing libp2p host and an embedded mump2p node that connects to the Optimum mesh.',
      'The Gateway and local beacon node peer with each other. The connection lets the Gateway observe consensus-layer gossip and publish messages it receives from the mesh back into local gossip.',
      'When a selected message comes from the local beacon node, the Gateway can forward it into mump2p. When a message arrives from mump2p, the Gateway can decode and publish it to its local consensus-layer peers.',
      'The beacon node continues to perform its consensus-layer work. The validator client continues to use that beacon node for duties and signing.',
    ],
    whyItMatters:
      'A validator’s beacon node needs to receive and process a block before the validator can use that view of the chain for its duties. A late block can leave less time to act and can affect which head the validator sees. Optimum’s published goal is to improve the block-propagation path; the documentation does not promise that every block will arrive earlier or that every validator outcome will improve.',
    practicalUseCases: [
      'A validator operator runs a Gateway beside a beacon node so it can exchange selected consensus-layer messages with the Optimum mesh.',
      'A staking provider can run gateways for its beacon nodes, register validator indices in Console and use Signal reports when the feature is enabled for its account.',
      'A participant without validators can run a stream-only Gateway to receive blocks from the mesh and serve its own consumers. This mode does not peer with a beacon node.',
      'Accelerate is a separate Console feature for eligible organizations: it recommends a bid cutoff for an MEV sidecar the operator already runs. It is not the Gateway mesh or its block-delivery mechanism.',
    ],
    terminologyNote:
      '“Optimum network” means the gateway network; “Optimum Gateway” means the software an operator runs; “mump2p” names the protocol used for the mesh. Console, authentication and bootstrap services support enrollment and operation but are not the path that carries every block. The official mump2p guide describes mump2p both as an alternative to GossipSub and as building upon GossipSub. That relationship is unresolved in the public guide, so this chapter does not present either wording as settled.',
    keyTakeaways: [
      'Optimum’s Gateway bridges selected Ethereum consensus-layer gossip and the mump2p mesh.',
      'The Gateway peers with the operator’s beacon node and runs on infrastructure the operator controls.',
      'The Gateway can relay messages in both directions; the validator client still uses its beacon node and keeps its signing setup.',
      'Signal and stream-only gateways are documented uses. Accelerate is a separate MEV-sidecar recommendation feature.',
      'Earlier block delivery is an aim, not a guaranteed timing or validator-performance result.',
    ],
    demoType: 'introduction',
    demoNote:
      'This diagram follows one example path from a local beacon node into the mesh and toward another gateway. The Gateway also relays selected messages in the reverse direction. It is a teaching model, not a live network connection, a complete topology, or a latency simulation.',
    sources: [
      {
        label: 'Optimum: What Optimum does',
        href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
      },
      {
        label: 'Optimum documentation overview',
        href: 'https://github.com/getoptimum/docs/blob/main/index.md',
      },
      {
        label: 'Optimum mump2p protocol guide',
        href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
      },
      {
        label: 'Optimum Gateway implementation overview',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
      },
      {
        label: 'Gateway architecture and message-flow decision',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
      },
      {
        label: 'Choose a validator or stream-only path',
        href: 'https://github.com/getoptimum/docs/blob/main/start/choose-a-path.md',
      },
      {
        label: 'Consumer block stream',
        href: 'https://github.com/getoptimum/docs/blob/main/operate/block-stream.md',
      },
      {
        label: 'Gateway metrics methodology',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/metrics-methodology',
      },
    ],
    chapterSections: [
      {
        title: 'The timing problem Optimum targets',
        explanation:
          'Ethereum’s consensus layer exchanges blocks and attestations between beacon nodes. A validator client relies on its beacon node for the chain view it uses to perform validator duties. If a block reaches a beacon node late, there is less time to react; the official Console guide says late arrival can contribute to missed attestations or votes for the wrong head. Optimum’s stated aim is to improve how quickly block data can reach participating beacon nodes by adding a gateway-to-gateway path. It does not change Ethereum’s consensus rules, and “aims to arrive sooner” is not a promise about any particular block.',
        example:
          'Imagine a block is proposed while two beacon nodes are waiting for it. One node hears about it through its existing Ethereum peers; another may also receive it through an Optimum Gateway connected to the mesh. The useful question is whether the block reaches the second node in time for its work—not whether the mesh guarantees a win in every slot.',
        visualConcept:
          'Draw the same proposed block taking two routes toward one beacon node: ordinary Ethereum gossip and the Optimum gateway mesh. Show both arrows meeting at the beacon node, with a slot timeline below. Do not draw a guaranteed winner or fixed time advantage.',
        technicalDetails: [
          'The gateway implementation describes bridging Ethereum consensus-layer gossip for beacon blocks and attestations.',
          'Optimum’s metrics ADR warns that a local “Ethereum seen versus mump2p seen” timestamp difference is not by itself a stable performance KPI: the paths can feed one another, and proposer timing also affects when a block first exists.',
          'The official sources describe a goal and measurement approach, not a universal delivery-time or rewards guarantee.',
        ],
        sources: [
          {
            label: 'Optimum documentation home',
            href: 'https://github.com/getoptimum/docs/blob/main/index.md',
          },
          {
            label: 'What Optimum does',
            href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
          },
          {
            label: 'Gateway metrics methodology',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/metrics-methodology',
          },
        ],
      },
      {
        title: 'The network and the jobs its components do',
        explanation:
          'An operator runs an Optimum Gateway beside a beacon node. Inside the Gateway, one networking side connects to Ethereum consensus-layer gossip; another is an embedded mump2p node that joins the Optimum mesh. Other operator-run gateways form the other participants in that mesh. mump2p is the protocol, not the name of the whole network. Console is used for enrollment and operator information. Authentication and bootstrap services support the Gateway’s setup and mesh participation; they are not a central relay through which every block is sent.',
        example:
          'A staking provider with two beacon nodes can run a Gateway beside each one. Each Gateway connects to its local node and to the mesh. The two Gateways are separate participants; Console helps the provider manage them but does not host their networking process.',
        visualConcept:
          'Show a two-sided Gateway box: “Ethereum CL gossip / libp2p” on one side and “mump2p” on the other. Connect several Gateway boxes in a mesh. Put Console, auth and bootstrap in a separate support-services area, not on the block arrows.',
        technicalDetails: [
          'The Gateway repository describes a CL-facing libp2p host and an embedded mump2p host in one process.',
          'In the documented default configuration, TCP 33212 is the CL-facing listener and TCP 33213 is the mump2p mesh listener; operators should use the release-specific network requirements rather than treating defaults as universal.',
          'The Gateway repository describes bootstrap as providing peer discovery and fork-digest information, while the Console runbook handles operator setup and Signal.',
        ],
        sources: [
          {
            label: 'Optimum Gateway README',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway integration guide',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Gateway network requirements',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/network-requirements',
          },
          {
            label: 'Gateway architecture ADR',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
        ],
      },
      {
        title: 'How the Gateway works with a Beacon Node',
        explanation:
          'A beacon node is an Ethereum consensus-layer client. The Optimum Gateway is a separate peer that the operator runs where it can reach that node. The node and Gateway exchange consensus-layer gossip over libp2p, Ethereum’s peer-to-peer networking stack. When the Gateway has a message from the mesh, it can publish it into its local consensus-layer gossip network; when it receives a selected message from that network, it can pass it toward the mesh. The validator client remains connected to its beacon node and continues to use that node for validator duties.',
        example:
          'For a Prysm setup, the operator reads the Gateway’s peer ID and gives Prysm a reachable multiaddress for the Gateway. The beacon node then has a direct peer relationship with that Gateway. The exact client flag and any reverse-dial configuration depend on the consensus client, so an operator follows the matching client guide.',
        visualConcept:
          'Show the Validator Client above its Beacon Node with a short “uses Beacon Node” connector. Start the solid message route at the Beacon Node, then connect it to the Optimum Gateway and mump2p mesh. Mark that the Validator Client is not an Optimum mesh peer and keep its signing role with it.',
        technicalDetails: [
          'A peer ID identifies a libp2p peer; a multiaddress describes how another peer can reach it. The Gateway exposes peer information through its self-info endpoint.',
          'The Gateway README gives port 33212 as the CL-facing default and describes configuring the beacon node to peer with the Gateway. The current CL-client guide documents client-specific flags and reconnect behavior.',
          'Optimum’s product documentation says the Gateway does not receive validator keys and does not replace the beacon node or validator client.',
        ],
        sources: [
          {
            label: 'Connecting your CL client',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
          {
            label: 'Gateway quick start',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/quick-start',
          },
          {
            label: 'What Optimum does',
            href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
          },
        ],
      },
      {
        title: 'Trace a message through the network',
        explanation:
          'Start with a beacon block arriving at an operator’s beacon node. The Gateway observes configured Ethereum consensus-layer gossip and can forward selected messages into mump2p. mump2p splits a message into source fragments, then creates coded shards as random linear combinations of those fragments over a finite field—a fixed set of numbers with defined arithmetic rules. A receiving peer can forward a shard or combine received shards into a new coded shard (recoding) without waiting for the whole message. The receiver tracks the information each shard adds; once it has enough linearly independent shards—each adding information rather than repeating an equation—it solves the equations to recover the original fragments. On the reverse path, the Gateway maps a received message to a local consensus-layer gossip topic and publishes it there. The available implementation evidence does not establish that Beacon Block payloads must be decoded and re-encoded in that step. The bridge can also carry selected messages the other way, from local consensus-layer gossip into the mesh.',
        example:
          'Gateway A can publish a selected block message into mump2p. Gateway B receives coded shards, reconstructs the message after enough independent information arrives, maps it to a local consensus-layer topic, and publishes it there. Its beacon node then processes the message through its usual client behavior. This is the documented path, not a promise that B receives every block before its ordinary Ethereum peers.',
        exampleSteps: [
          'Simplified teaching example—not Optimum’s production parameters: imagine a tiny message split into two symbols, A = 2 and B = 3. We will use arithmetic modulo 7 and choose small coefficients for hand calculation; these are not Optimum’s production field or shard settings.',
          'Make shard 1 from A + B. Its value is 2 + 3 = 5 (mod 7), so the receiver has the equation A + B = 5.',
          'Make shard 2 from A + 2B. Its value is 2 + 2×3 = 8, which wraps to 1 (mod 7). The receiver now has A + 2B = 1.',
          'Subtract the first equation from the second: B = 1 − 5 = −4, which is 3 (mod 7).',
          'Put B = 3 into A + B = 5. Then A = 2. The receiver has recovered both original symbols.',
          'The two shards help because their coefficient pairs, (1, 1) and (1, 2), are independent equations. Receiving a duplicate of shard 1 would add no new information, so it would not be enough to recover both symbols.',
        ],
        visualConcept:
          'Use two lanes, “CL → mesh” and “mesh → CL,” around the Gateway. In the mesh lane, show a message split into source fragments, multiple coded-shard equations moving through peers, and a receiver collecting independent equations before reconstructing the message. Use the modulo-7 example beside the flow as a clearly labeled teaching inset; do not imply those are production parameters.',
        technicalDetails: [
          'The Gateway README and ADR describe decode/re-encode in the reverse bridge. The reviewed Beacon Block implementation path establishes topic mapping and local publication, but does not establish decode/re-encode as a required step for Beacon Block payloads.',
          'The README describes a short-lived hash cache for duplicate handling and optional aggregation for non-block topics. These are implementation details and can change between releases.',
          'The mump2p guide says a message is split into k source fragments, coded into shards, and reconstructed when k linearly independent shards are available. Intermediate nodes can recode shards from what they have received.',
          'A Gateway ADR documents validator-scoped filtering for outbound attestations and aggregation. Attestation forwarding rules are more specific than the simple block path shown here.',
        ],
        sources: [
          {
            label: 'Optimum Gateway README',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway Beacon Block reverse-path implementation (audited commit)',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/2b75d7c37b050db9f3012d12083e574f538dfa6d/pkg/service/gossipsub-gateway/messages_proxy.go#L99-L160',
          },
          {
            label: 'mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
          {
            label: 'Gateway architecture ADR',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Attestation filtering ADR',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0008-attestation-subnet-boost.md',
          },
        ],
      },
      {
        title: 'Who can use Optimum, and for what',
        explanation:
          'The official operator runbook describes validator operators and staking providers running Gateways beside their beacon nodes. These operators can register validator indices in Console so Signal can report on their setup when the feature is enabled for their account. Optimum also documents a stream-only Gateway for participants who do not run validators: it receives blocks from the mesh and serves them to the operator’s own consumers. Separately, Accelerate can recommend a bid cutoff for an MEV sidecar an eligible operator already runs. That recommendation is a Console feature; it is not how the mump2p mesh delivers blocks.',
        example:
          'A person who runs validators uses a Gateway that peers with a beacon node. A data consumer without validators can instead run a stream-only Gateway and consume its block feed. A staking organization may also use Accelerate if eligible, but it reviews and deploys any sidecar configuration itself.',
        visualConcept:
          'Show three distinct lanes: validator operator (Gateway ↔ beacon node), stream-only operator (Gateway → own consumer), and Accelerate (Console recommendation → operator-managed MEV sidecar). Do not connect the Accelerate lane to the mump2p block path.',
        technicalDetails: [
          'The stream-only mode does not peer with a beacon node and does not require validator indices in Console.',
          'The public docs say stream-consumer token availability is controlled by an Optimum-wide switch; the presence of the documented API does not mean every account can currently mint a consumer token.',
          'Accelerate uses previously proposed slots to recommend a bid cutoff; Console does not make the change on the operator’s infrastructure.',
        ],
        sources: [
          {
            label: 'Choose a path',
            href: 'https://github.com/getoptimum/docs/blob/main/start/choose-a-path.md',
          },
          {
            label: 'Block stream',
            href: 'https://github.com/getoptimum/docs/blob/main/operate/block-stream.md',
          },
          {
            label: 'Consumer block stream manual',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream',
          },
          {
            label: 'What Accelerate does',
            href: 'https://github.com/getoptimum/docs/blob/main/accelerate/what-accelerate-does.md',
          },
        ],
      },
      {
        title: 'Limits, uncertainties and what not to assume',
        explanation:
          'Optimum is an additional propagation path, not a new consensus protocol. A Gateway still depends on the operator’s host, network connectivity, correct peer configuration and the surrounding Ethereum clients. The official material describes intended benefits and operational measurements, but it does not promise a delivery time, validator reward, or improvement for every block. Some detailed protocol statements also need careful qualification: the public mump2p guide calls mump2p both an alternative to GossipSub and a mechanism that builds on GossipSub. The publicly listed Optimum repositories reviewed for this chapter include the Gateway and its mump2p integration, but not a standalone mump2p implementation that would let us independently verify every protocol-level detail.',
        example:
          'If a block arrives late, that fact alone does not prove which network path caused the delay: the block may have been published late, the operator’s beacon node may have connectivity issues, or the mesh path may have been slow. The Gateway’s own metrics guidance cautions against treating one local path-to-path timestamp comparison as proof that Optimum did or did not help.',
        visualConcept:
          'Use a boundary diagram: inside the Gateway’s documented responsibilities, show bridging and local observations; outside it, show proposer timing, operator connectivity and validator duties. Put a question mark beside the unresolved mump2p/GossipSub relationship rather than drawing an unverified protocol stack.',
        technicalDetails: [
          'The Gateway does not replace a beacon node or validator client, and validator keys remain outside the Gateway.',
          'The official metrics ADR separates raw arrival observations from derived KPIs and explains why raw Ethereum-versus-mump2p deltas can mislead.',
          'The available public material does not settle mump2p’s exact relationship to GossipSub, independently verify all production RLNC parameters or establish a universal performance benchmark.',
          'The sources explain the engineering goal, but do not provide a complete historical account of why the project was originally founded.',
        ],
        sources: [
          {
            label: 'mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
          {
            label: 'Gateway metrics ADR',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0003-validator-metrics.md',
          },
          {
            label: 'Gateway security model',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/SECURITY.md',
          },
          {
            label: 'Optimum Gateway README',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
        ],
      },
    ],
  },
  p2p: {
    id: 'p2p',
    order: '02',
    navTitle: 'Peer-to-peer',
    title: 'Peer-to-Peer Networking',
    category: 'NETWORK FUNDAMENTALS',
    summary:
      'Build a peer-to-peer network from first principles: identify a peer, find an address, establish a connection, move a message, and understand what changes when a peer disappears. Then trace the same ideas through Ethereum and Optimum.',
    beginnerExplanation:
      'A peer-to-peer (P2P) network is made of participating computers or software nodes that communicate with one another. A node usually knows only some of the other nodes, so messages can travel across several connections. P2P describes how participants communicate; it does not mean there are no support services, that every node connects to every other node, or that delivery is guaranteed.',
    realWorldExample:
      'Think of two ways to share a class announcement. In one, every student sends it to a school office and the office sends it out. In another, students pass it to classmates they are connected to, who may pass it along. Real networks can mix these patterns: a directory or bootstrap service might help people find one another even when the data later travels between peers.',
    howItWorks: [
      'A peer is a running network participant. A Peer ID identifies it; a multiaddress describes one way to reach it.',
      'Discovery gives a node addresses for possible peers. A node can then dial a peer that is listening on a compatible transport.',
      'The peers secure the connection, identify the remote peer, and agree on a protocol or stream for exchanging data.',
      'A protocol determines what a message means and whether it is sent to one peer or forwarded to more peers.',
      'If a connection drops, that path stops working. A node may reconnect or use another path, but the result depends on the application and network.',
    ],
    whyItMatters:
      'Ethereum uses peer-to-peer networking to exchange transactions and consensus messages. Optimum adds a Gateway that peers with an operator’s Beacon Node and joins the mump2p mesh, creating another path for selected consensus-layer messages.',
    terminologyNote:
      'General libp2p behavior and Optimum’s configuration are not the same thing. libp2p defines building blocks such as peer identity, addresses, transports and streams; an application chooses discovery and message protocols. Optimum’s Gateway guide documents its own Beacon Node connection and Bootstrap workflow. Neither description means every P2P network behaves identically.',
    keyTakeaways: [
      'A Peer ID is an identity; a multiaddress is a possible route to a peer.',
      'Discovery, dialing, connection security and message protocols are separate jobs.',
      'P2P nodes communicate over a set of peer connections; they do not need an all-to-all graph.',
      'A connection loss can interrupt a route. Reconnection and alternate paths depend on the implementation.',
      'Optimum’s Gateway peers with the local Beacon Node and separately joins the mump2p mesh.',
    ],
    demoType: 'p2p',
    demoNote:
      'The diagrams compare common communication patterns and show Optimum’s documented Gateway relationships. The controls demonstrate discovery, connection and message states; nothing here opens a real network connection or implements libp2p.',
    sources: [
      {
        label: 'libp2p: Peers and Peer IDs',
        href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/peers.md',
      },
      {
        label: 'libp2p: Addressing',
        href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/addressing.md',
      },
      {
        label: 'libp2p: Discovery and routing',
        href: 'https://github.com/libp2p/docs/blob/master/content/concepts/discovery-routing/overview.md',
      },
      {
        label: 'Ethereum networking layer',
        href: 'https://ethereum.org/developers/docs/networking-layer/',
      },
      {
        label: 'Optimum Gateway integration guide',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
      },
      {
        label: 'Optimum Gateway implementation',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
      },
    ],
    chapterSections: [
      {
        title: 'What peer-to-peer means',
        explanation:
          'A peer is a computer or software node taking part in a network. In a peer-to-peer design, peers can exchange data with other peers over network connections instead of sending every message through one central application server. Each peer usually has only a subset of all possible connections. A P2P network can still use supporting services—for example, a service that introduces new peers—so “peer-to-peer” does not mean “there are no servers anywhere.”',
        example:
          'In a centralized announcement service, Student A sends a notice to the school server, which sends it to Student B. In a P2P example, A sends it to a connected classmate, who may pass it to B. The first is a simple hub-and-spoke path; the second depends on the connections and forwarding rules between peers.',
        visualConcept:
          'The interactive demo compares a hub-and-spoke diagram with a direct peer link. Show the hub on the message route in the centralized example; show only peer nodes and peer connections in the P2P example. Label both as examples, not rules for every system.',
        technicalDetails: [
          'P2P describes a communication model, while topology is the shape of the connections and a protocol defines how messages are exchanged.',
          'A P2P application can use centralized or federated services for account management, rendezvous or bootstrapping without routing all application messages through them.',
          'P2P alone does not promise privacy, anonymity, fault tolerance or delivery to every node.',
        ],
        sources: [
          {
            label: 'libp2p documentation: Peers',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/peers.md',
          },
          {
            label: 'libp2p documentation: Discovery and routing',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/discovery-routing/overview.md',
          },
        ],
      },
      {
        title: 'A peer’s identity is not its address',
        explanation:
          'libp2p gives a peer a Peer ID: a network identity derived from its public key. The key pair lets peers check that the machine on a connection controls the key associated with the expected Peer ID. This proves control of a cryptographic identity, not a person’s real-world identity. A Peer ID is different from an IP address, which can change and says where a network interface may be reached.',
        example:
          'A multiaddress such as `/ip4/198.51.100.10/tcp/4242/p2p/<PeerID>` can be read in layers: use IPv4 address `198.51.100.10`, connect over TCP port `4242`, then expect the peer with the stated Peer ID. The address is an illustrative example, not a reachable Optimum address.',
        visualConcept:
          'Draw a Peer ID as a name tag attached to a peer. Separately show a multiaddress as a route card with protocol, network address, port and `/p2p/PeerID`. Keep the name tag when the route changes.',
        technicalDetails: [
          'A libp2p Peer Info record pairs a Peer ID with one or more multiaddresses; a peer store acts like a temporary address book for known peer information.',
          'A multiaddress encodes multiple protocol layers in order. It may describe a dial route, but it does not prove that the route is currently reachable.',
          'Optimum’s CL-client guide distinguishes the Gateway peer ID used by a Beacon Node from the Gateway’s `mump2p.peer_ids` used by the mesh.',
        ],
        sources: [
          {
            label: 'libp2p documentation: Peer IDs and Peer Info',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/peers.md',
          },
          {
            label: 'libp2p documentation: Multiaddresses',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/addressing.md',
          },
          {
            label: 'Optimum Gateway: Connecting your CL client',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
        ],
      },
      {
        title: 'Finding peers before connecting',
        explanation:
          'Peer discovery is how a node learns about possible peers and their addresses. Peer routing is the related job of finding information for a particular Peer ID. A new node often starts with a small amount of known information, then learns more. libp2p documents several mechanisms: a bootstrap peer can provide starting contacts, mDNS can find peers on a local network, rendezvous can help peers meet through a shared point, and a distributed hash table (DHT) can help locate peers by ID. An application can choose one or combine several; they are not all enabled in every libp2p network.',
        example:
          'Imagine a new node starts with the address of one bootstrap peer. It connects, learns addresses for some other peers, and tries those addresses. Once it has a few working connections, it can participate in the discovery or routing mechanisms configured for that network. The bootstrap peer helped it get started; that does not mean every later message must pass through the bootstrap peer.',
        visualConcept:
          'Show “new node → known bootstrap address → peer addresses learned → several peer connections.” In a separate note, show local mDNS or a DHT as alternative discovery mechanisms, not mandatory boxes in every network.',
        technicalDetails: [
          'The peer store keeps known Peer IDs, addresses and metadata; discovery may add newly found peer information to that store.',
          'Discovery and routing often operate together, but they answer different questions: “who might I connect to?” versus “where can I find this peer?”',
          'Optimum’s Gateway guide says its Bootstrap service supports gateway registration, peer discovery and fork-digest information. This is Optimum’s workflow, not a claim that every libp2p application uses that service.',
        ],
        sources: [
          {
            label: 'libp2p documentation: Discovery and routing',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/discovery-routing/overview.md',
          },
          {
            label: 'libp2p documentation: Peers and peer store',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/peers.md',
          },
          {
            label: 'Optimum Gateway integration guide',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
        ],
      },
      {
        title: 'From an address to a live connection',
        explanation:
          'A peer that accepts incoming connections is listening; a peer that opens an outgoing connection is dialing. The dialer needs a usable address and a compatible transport, such as TCP or QUIC. After the transport connects, libp2p secures the channel and checks the remote Peer ID. The peers then negotiate the application protocol they will use. A stream is a logical channel for one protocol. Stream multiplexing lets several streams share one underlying connection, so peers do not need to establish a separate network connection for every conversation.',
        example:
          'Peer B starts listening on an address. Peer A gets B’s multiaddress from discovery and dials it. The connection stack establishes a transport, authenticates the expected Peer ID with a secure handshake, and selects a protocol both sides support. A then opens a stream for that protocol and exchanges messages with B.',
        visualConcept:
          'Draw a four-step sequence: B listens → A dials B’s multiaddress → both authenticate and negotiate → A and B exchange data over a protocol stream. Show a second stream sharing the same connection.',
        technicalDetails: [
          'libp2p describes TCP, QUIC, WebSocket and other transports; which transports work depends on the implementation and the peers’ network conditions.',
          'libp2p’s secure-channel layer uses TLS 1.3 or Noise, depending on the implementation and configuration, and verifies peer identity during the handshake.',
          'The libp2p switch tracks known peers and connections, coordinates dialing/listening and selects a shared stream multiplexer. The application still defines the messages sent over each stream.',
        ],
        sources: [
          {
            label: 'libp2p documentation: Listening and dialing',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/transports/listen-and-dial.md',
          },
          {
            label: 'libp2p documentation: Secure channels',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/secure-comm/overview.md',
          },
          {
            label: 'libp2p documentation: Protocols and streams',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/protocols.md',
          },
          {
            label: 'libp2p documentation: Stream multiplexing',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/multiplex/overview.md',
          },
        ],
      },
      {
        title: 'How messages move—and what a disconnect changes',
        explanation:
          'A connection gives two peers a path to communicate; it does not decide how an application’s messages spread. A protocol may send a request to one peer and wait for a response, or it may forward a message through a group of peers. For example, a gossip protocol forwards selected messages to connected neighbors, which may forward them onward. A peer can only pass on a message it has received and that its protocol is allowed to forward. If a connection drops, its active streams stop working. Other peers may still carry a message along another live route, or a node may discover and dial the peer again, but neither outcome is automatic for every application.',
        example:
          'In a simple network A—B—C, B is the only link between A and C. If B disconnects, A cannot reach C along that path. If there is also a live route A—D—C and the message protocol forwards the message there, C may still receive it. This is a general topology example, not a guarantee about Ethereum or Optimum.',
        visualConcept:
          'Draw A—B—C with B disconnected, then show an optional alternate route A—D—C in a different style. Label the alternate route “works only if these peers are connected and the protocol forwards the message.”',
        technicalDetails: [
          'A link failure can interrupt streams using that connection; application-level retry, peer rediscovery and message replay policies are implementation-specific.',
          'An address can become stale, a peer can go offline, or a firewall/NAT can prevent a new inbound connection. libp2p implementations may support relays or other NAT-traversal mechanisms, but support and configuration vary.',
          'Optimum’s CL-client guide documents client-specific reconnection behavior. For example, a configured Gateway `direct_cl_peers` list can make the Gateway retry peers in that list; this is not a universal libp2p retry rule.',
        ],
        sources: [
          {
            label: 'libp2p documentation: Protocols and streams',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/protocols.md',
          },
          {
            label: 'libp2p documentation: NAT traversal',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/nat/overview.md',
          },
          {
            label: 'Optimum Gateway: Connecting your CL client',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
        ],
      },
      {
        title: 'How Ethereum uses peer-to-peer networking',
        explanation:
          'Ethereum nodes use P2P networking to exchange information with other nodes. The execution layer has a peer network for transactions and execution-related data; the consensus layer has a separate peer network for Beacon Chain messages such as blocks. Ethereum’s networking documentation describes both one-to-many gossip and one-to-one request/response communication. The execution and consensus clients also communicate locally with one another, so not every exchange between the two client roles travels through the public P2P network.',
        example:
          'A transaction can be shared among execution-layer peers. Later, when a validator proposes a Beacon block, the execution client provides execution data to the local consensus client, and consensus clients gossip the Beacon block to their peers. These are related steps, but they use distinct client roles and networking paths.',
        visualConcept:
          'Draw two separate peer networks: execution clients sharing transactions, and consensus clients sharing Beacon blocks. Connect the execution and consensus client on one machine with a short local link. Do not merge the two P2P networks into one.',
        technicalDetails: [
          'Ethereum.org describes separate execution-layer and consensus-layer P2P networks and distinguishes gossip from request/response traffic.',
          'A node’s peer list is only part of the network; one node is not necessarily connected directly to every other Ethereum node.',
          'This overview avoids version-specific protocol details and port numbers; use the relevant client documentation for operational setup.',
        ],
        sources: [
          {
            label: 'Ethereum.org: Networking layer',
            href: 'https://ethereum.org/developers/docs/networking-layer/',
          },
          {
            label: 'Ethereum consensus and execution client roles',
            href: 'https://ethereum.org/developers/docs/nodes-and-clients/',
          },
        ],
      },
      {
        title: 'Where Optimum’s Gateway fits',
        explanation:
          'An Optimum Gateway is an additional peer beside an operator’s Beacon Node. The node connects to the Gateway over libp2p and shares consensus-layer gossip with it. The Gateway runs a CL-facing libp2p host and an embedded mump2p host: it can forward selected messages from local CL gossip into the mump2p mesh, and it can decode and republish selected mesh messages into its local CL gossip. Other Gateway nodes connect through the mesh. The Beacon Node and Validator Client keep their Ethereum roles; the Gateway does not replace them.',
        example:
          'An operator obtains the Gateway’s CL-facing peer information and configures the supported Beacon Node client to connect to it. When a selected block message arrives through the mesh, the Gateway can publish it into the local CL gossip network. The Beacon Node then handles that network message as part of its normal client work. Exact peer flags and which side retries the connection vary by CL client.',
        visualConcept:
          'Show Validator Client → Beacon Node ↔ Optimum Gateway ↔ mump2p mesh ↔ other Gateway nodes. Label the first link “local client API,” the Beacon Node–Gateway link “CL libp2p gossip,” and the Gateway–mesh link “mump2p.” Put Console and Bootstrap in a separate dashed “operations and discovery” box, not on the block-message arrows.',
        technicalDetails: [
          'The Gateway README describes two P2P sides and message bridges in both directions: the local Ethereum CL gossip/libp2p side and the mump2p mesh side.',
          'Optimum’s CL-client guide distinguishes the Gateway peer ID used in the CL client’s direct-peer setting from the mump2p peer IDs used by the mesh. The Gateway can use `direct_cl_peers` for dialing/retries, depending on configuration and CL-client behavior.',
          'The Gateway integration guide assigns Bootstrap peer discovery, registration and fork-digest tasks. Console is used for operator onboarding and account workflows; neither is the Gateway-to-Gateway block-message hop.',
        ],
        sources: [
          {
            label: 'Optimum Gateway README',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Optimum Gateway integration guide',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Optimum Gateway: Connecting your CL client',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
          {
            label: 'Optimum: What Optimum does',
            href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
          },
        ],
      },
      {
        title: 'Practical limits: P2P is not a guarantee',
        explanation:
          'A P2P design can remove the need for one central relay to carry every message, but it also makes connectivity and routing a shared job. A peer must have a usable route, the two sides must support compatible transports and protocols, and the network must have a live path for the message. Firewalls, NAT, stale addresses, software restarts and overloaded links can all affect availability. A Peer ID proves control of a key, not that the peer is trustworthy or that its messages are correct. Protocols and applications must provide their own validation, reliability and authorization rules.',
        example:
          'If a peer’s IP address changes, its old multiaddress may no longer work even though its Peer ID is unchanged. The application needs a way to learn a current address and attempt a new connection. If no suitable address or alternate path exists, that peer may remain unreachable.',
        visualConcept:
          'Show the Peer ID as a stable identity label, two possible multiaddresses with one marked stale, and a disconnected link. Beside it, list the separate mechanisms needed for discovery, transport reachability and application-level message validation.',
        technicalDetails: [
          'libp2p documents NAT traversal techniques such as automatic port mapping and relay protocols; implementation support varies, and a multiaddress is not a promise of reachability.',
          'A Peer ID is a cryptographic network identity. It does not identify a person, prove benign behavior or validate application data.',
          'Optimum’s documentation describes the Gateway’s connections and forwarding role, but this chapter does not infer a delivery guarantee, a fixed mesh topology or a universal reconnect policy.',
        ],
        sources: [
          {
            label: 'libp2p documentation: NAT traversal',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/nat/overview.md',
          },
          {
            label: 'libp2p documentation: Peer IDs',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/peers.md',
          },
          {
            label: 'libp2p documentation: Addressing',
            href: 'https://github.com/libp2p/docs/blob/master/content/concepts/fundamentals/addressing.md',
          },
          {
            label: 'Optimum Gateway: Connecting your CL client',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
        ],
      },
    ],
  },
  gossipsub: {
    id: 'gossipsub',
    order: '03',
    navTitle: 'GossipSub',
    title: 'GossipSub',
    category: 'PUBLISH / SUBSCRIBE',
    summary:
      'Follow a message from a topic subscription through GossipSub’s forwarding mesh, then see how GRAFT, PRUNE, IHAVE, and IWANT help peers manage links and recover recent messages.',
    beginnerExplanation:
      'Publish/Subscribe lets an application publish a message to a named topic instead of listing every receiver. GossipSub is libp2p’s protocol for carrying those topic messages: a selected group of peers forwards full messages through a mesh, while other topic peers can hear about recent message IDs and ask for messages they missed.',
    realWorldExample:
      'Imagine a neighborhood alert topic. A few subscribed neighbors form forwarding links and pass the full alert along. Another subscribed neighbor outside that mesh may hear “alert 42 is available” and ask a nearby peer for its contents. Those short names are teaching language: GossipSub sends protocol messages, not notes on a literal bulletin board.',
    howItWorks: [
      'An application subscribes to a topic, and PubSub announces that subscription to known PubSub peers.',
      'For each topic, GossipSub selects a smaller mesh of peers that forward full messages. The mesh is a topic-specific overlay on top of existing network connections.',
      'When a valid, previously unseen message arrives, a peer forwards it to its mesh peers. Message IDs and a local seen-message cache help prevent repeatedly forwarding the same message.',
      'Peers outside the mesh can receive IHAVE metadata listing recent message IDs. If a peer is missing one, it can send IWANT; the other peer can return the full message if it is still in its message cache.',
      'GRAFT and PRUNE announce the addition or removal of a peer from a topic mesh. They change the topic forwarding relationship, not necessarily the underlying network connection.',
    ],
    whyItMatters:
      'Sending every full message to every known topic peer can waste bandwidth as a network grows. GossipSub limits eager full-message forwarding to mesh peers and uses smaller metadata messages outside the mesh. This is a trade-off, not a delivery guarantee: reachability, peer behavior, message validation, cache lifetime, and the chosen implementation still matter.',
    terminologyNote:
      'The main walkthrough follows the libp2p GossipSub v1.0 baseline; v1.1 adds optional security and mesh-management extensions, and the v1.2 document is a working draft. Optimum’s Beacon Node-facing Gateway subscribes to Ethereum GossipSub topics, while its Gateway-to-Gateway mump2p side is a separate RLNC-based path. The Optimum guide uses some of the same control-message names for coded shards, so do not assume their payload meanings are identical.',
    keyTakeaways: [
      'PubSub separates the publisher from the list of subscribers; a topic groups related messages.',
      'GossipSub forwards full messages over a selected per-topic mesh, not to every peer.',
      'GRAFT and PRUNE add or remove a topic-mesh link; they do not necessarily open or close a transport connection.',
      'IHAVE advertises recent message IDs; IWANT requests missing message content that may still be cached.',
      'Message-ID deduplication and recent caches help with duplicates and short gaps, but they do not provide durable storage or exactly-once delivery.',
      'Optimum uses GossipSub on the CL-facing side of its Gateway and mump2p on its separate Gateway mesh side.',
    ],
    demoType: 'gossipsub',
    demoNote:
      'Step through a simplified topic mesh and watch GRAFT, PRUNE, IHAVE, and IWANT change the example. It does not simulate peer scoring, real message caches, network timing, or Optimum’s production configuration.',
    sources: [
      {
        label: 'libp2p GossipSub v1.0 specification',
        href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
      },
      {
        label: 'libp2p PubSub interface specification',
        href: 'https://github.com/libp2p/specs/blob/master/pubsub/README.md',
      },
      {
        label: 'libp2p GossipSub v1.1 extensions',
        href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md',
      },
      {
        label: 'libp2p GossipSub v1.2 working draft',
        href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.2.md',
      },
      {
        label: 'Ethereum networking layer',
        href: 'https://ethereum.org/developers/docs/networking-layer/',
      },
      {
        label: 'Optimum Gateway README and architecture',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
      },
      {
        label: 'Optimum Gateway integration guide',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
      },
      {
        label: 'Optimum mump2p protocol guide',
        href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
      },
    ],
    chapterSections: [
      {
        title: 'PubSub: publish to a topic, not a list of people',
        explanation:
          'Publish/Subscribe, usually shortened to PubSub, is a way to distribute messages by subject. A publisher sends a message to a topic. A subscriber tells the network it wants messages for that topic. The publisher does not need to know every subscriber’s identity or address. A topic is the label or identifier used to group related messages; it does not, by itself, guarantee that every subscriber will receive every message. GossipSub is one routing protocol that carries PubSub messages over libp2p.',
        example:
          'A home-weather application could publish “rain expected” to a `weather/alerts` topic. Subscribed peers are interested in that topic; peers subscribed only to `sports/scores` do not need that alert. The topic names here are illustrative, not Ethereum or Optimum topic names.',
        visualConcept:
          'Show one publisher sending a message into a topic mesh. Show several subscribers connected to the topic and a separate peer that is not subscribed. Make clear that the publisher does not send a separate address-specific message to every subscriber.',
        technicalDetails: [
          'The libp2p PubSub interface defines topic subscription announcements and published messages; GossipSub adds its routing behavior on top of that common interface.',
          'A topic subscription is not the same as a transport connection. A peer can be connected to another peer without sharing a topic, and peers can share a connection while participating in multiple topics.',
          'In the baseline protocol, peer discovery and establishing libp2p connections are provided by the surrounding application/network, not prescribed by the GossipSub routing specification.',
        ],
        sources: [
          {
            label: 'libp2p PubSub interface specification',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/README.md',
          },
          {
            label: 'libp2p GossipSub v1.0 specification',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
        ],
      },
      {
        title: 'Why GossipSub uses a mesh',
        explanation:
          'A simple way to spread a message is to send it to every known peer that subscribes to the topic. That approach is called flooding. It can spread a message quickly, but each message is copied over many connections, so traffic can grow rapidly in a dense network. GossipSub instead forms a mesh for each topic: a selected overlay of peers that forward full messages to one another. Peers outside that mesh can receive lightweight gossip about recent message IDs. “Overlay” means these are logical forwarding relationships built on top of ordinary network connections; they are not a special physical network.',
        example:
          'Suppose peers A through F subscribe to one topic. If A is connected to B and C in that topic’s mesh, A sends the full message to B and C. They can pass it along their mesh links. A does not need to send that same full payload directly to D, E, and F as well.',
        visualConcept:
          'Draw six topic peers with a few solid mesh links and one subscribed peer outside the mesh. Use solid links for full-message forwarding and a separate dashed link for gossip metadata. Avoid drawing a complete all-to-all graph.',
        technicalDetails: [
          'The v1.0 specification keeps a separate mesh for each topic and uses a heartbeat to maintain mesh size and emit gossip.',
          'The v1.0 specification lists reasonable defaults such as target degree `D = 6`, lower bound `D_low = 4`, upper bound `D_high = 12`, and a one-second heartbeat. These are protocol-spec defaults, not guaranteed settings for every implementation or Optimum.',
          'GossipSub reduces full-payload fanout compared with flooding, but still requires mesh state, control messages, gossip metadata, and peer discovery supplied by the surrounding network.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0: motivation, mesh and parameters',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
          {
            label: 'libp2p PubSub interface: subscriptions and RPC messages',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/README.md',
          },
        ],
      },
      {
        title: 'Topics, subscribers, and joining a mesh',
        explanation:
          'When an application subscribes to a topic, its PubSub layer announces that subscription to known PubSub peers. GossipSub can then use its local view of connected peers that are subscribed to the same topic. When the application joins a topic, the router selects some of those peers for its topic mesh and announces the new mesh relationships. The mesh is local to each peer: two peers can have different views of the wider network while maintaining compatible links with their direct mesh neighbors.',
        example:
          'A new peer subscribes to `weather/alerts`. It learns that peers B, C, and D also subscribe. The router selects B and C as mesh neighbors. D may remain a known topic peer outside this peer’s mesh and receive only occasional message-ID gossip.',
        visualConcept:
          'Show a new subscriber joining one topic, selecting two peers from a larger set of known subscribers, and leaving another known subscriber outside its full-message mesh. Add a note that peer discovery and connection setup happen before the topic mesh can use those peers.',
        technicalDetails: [
          'In the v1.0 specification, `JOIN(topic)` uses peers already known to the router as topic members and sends GRAFT control messages to selected new mesh peers.',
          'Subscription announcements and mesh membership are related but distinct. A peer can be subscribed to a topic without being in every other subscriber’s mesh.',
          'Ethereum topic identifiers can be structured strings, for example the Gateway README describes CL topics in the `/eth2/<fork_digest>/.../ssz_snappy` family. They are not necessarily human-friendly hashtags.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0: topic membership',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
          {
            label: 'libp2p PubSub interface: subscription messages',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/README.md',
          },
          {
            label: 'Optimum Gateway README: subscribed Ethereum topics',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
        ],
      },
      {
        title: 'GRAFT and PRUNE: add or remove a topic-mesh link',
        explanation:
          'GRAFT and PRUNE are control messages: small messages that change how peers handle a topic. When a router adds a peer to its mesh for a topic, it sends GRAFT to announce that relationship. If the receiving peer is still subscribed, it adds the sender to its own mesh for that topic. If it is no longer subscribed, it can answer with PRUNE. PRUNE tells a peer to remove the sender from that topic’s mesh. A peer can also send PRUNE when leaving a topic or when mesh maintenance removes an excess link.',
        example:
          'Peer A has subscribed to `weather/alerts` and is connected to Peer B, but is not yet forwarding full messages with B for that topic. A adds B to its topic mesh and sends GRAFT. Later, A leaves that topic and sends PRUNE. B removes A from the `weather/alerts` mesh; the underlying libp2p connection may stay open if they still communicate on another topic.',
        visualConcept:
          'In the interactive demo, show a dotted candidate link becoming a solid topic-mesh link when GRAFT is processed. Then show the link disappear when PRUNE is processed. Label the transport connection separately so learners do not confuse pruning a topic link with disconnecting the peers.',
        technicalDetails: [
          'GRAFT and PRUNE carry a topic identifier. They are GossipSub mesh-control messages, not application payloads.',
          'In the v1.0 baseline, mesh maintenance uses heartbeat checks to add peers when a mesh is below its lower bound and prune peers when it is above its upper bound.',
          'The v1.1 extension adds PRUNE backoff and optional peer exchange. A pruned peer should not immediately try to regraft during the backoff period; those are v1.1 extensions, not universal details to assume for every implementation.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0: GRAFT, PRUNE and mesh maintenance',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
          {
            label: 'libp2p GossipSub v1.1: PRUNE backoff and peer exchange',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md',
          },
        ],
      },
      {
        title: 'A full message travels through the mesh',
        explanation:
          'Here is the basic message path. First, an application publishes a message to a topic. A peer checks it using the topic’s validation rules and checks whether its message ID has already been seen. If the message is valid and new, the router records it and forwards the full message to its mesh peers for that topic. Each receiving peer performs its own checks and, if the message is new, forwards it to its own mesh neighbors. This lets a message cross several peer-to-peer links without requiring its publisher to know every subscriber.',
        example:
          'A publishes a valid alert on `weather/alerts` to mesh peers B and C. B has not seen it, so B passes it to D. C has already received the same alert through another path, so C does not forward it again. The network has several routes, but each router handles the message using its local state.',
        visualConcept:
          'Step a single full-message token from the publisher through two mesh hops. Mark each peer after it first receives the token. If the token reaches a peer for a second time, label it “already seen” rather than drawing another forwarding wave.',
        technicalDetails: [
          'The v1.0 message-processing rules validate the payload, check the seen-message cache, avoid forwarding a message back to its own publisher, and forward new valid messages to the topic mesh.',
          'The mesh limits which peers receive full-message forwarding directly from a router; the end-to-end route is the result of many peers’ local meshes.',
          'A topic’s message validator and message-ID function are application/implementation choices; the router cannot infer whether arbitrary payload bytes are meaningful to the application.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0: message processing',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
          {
            label: 'libp2p PubSub interface: message and message ID',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/README.md',
          },
        ],
      },
      {
        title: 'IHAVE and IWANT: ask for a recent message you missed',
        explanation:
          'The mesh carries full messages along selected links. GossipSub also sends metadata to some topic peers outside the mesh. IHAVE means “I have recently seen messages with these IDs”; it does not contain the full message. A peer compares those IDs with its own seen cache. For an ID it has not seen, it can send IWANT to request the full message. The other peer can answer from its message cache if the message is still there. This is a short-term repair path, not permanent storage.',
        example:
          'Peer D missed alert 42 while offline. After reconnecting, D receives an IHAVE from E listing alert 42’s message ID. D has not seen it, so D sends IWANT for that ID. If E still has alert 42 in its message cache, E can send the full message to D. If the cached copy has expired, this request alone cannot recover it.',
        visualConcept:
          'Show a dashed IHAVE arrow carrying only a message ID from an off-mesh peer to a missing peer; show an IWANT arrow back; then show the full payload returning on a separate solid arrow. Add a visible “available only while cached” note.',
        technicalDetails: [
          'The v1.0 specification emits IHAVE gossip for recent message IDs and uses IWANT to request IDs that the receiving peer has not seen.',
          'The message cache stores recent messages so a router can look them up when another peer sends IWANT. The cache has a finite history and shifts out old entries.',
          'IHAVE/IWANT can help repair recent loss when a peer can reach a holder and the message remains cached; they do not promise recovery after the cache expires.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0: message cache, IHAVE and IWANT',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
        ],
      },
      {
        title: 'Duplicates, missed messages, and disconnected peers',
        explanation:
          'A message can reach a peer along more than one mesh path. GossipSub identifies messages using a message-ID function and keeps a local cache of IDs it has recently seen. When the same ID arrives again, the router can avoid treating it as new and forwarding it through the mesh again. Message IDs must be calculated consistently by peers in the topic. This duplicate suppression does not mean an application has a universal exactly-once delivery guarantee. If a peer disconnects, links using that connection stop working. Heartbeat maintenance can try to refill an undersized mesh from other known, eligible topic peers, and IHAVE/IWANT may help with a recent missed message, but discovery, reconnection, another route, and a cached copy are all required for recovery.',
        example:
          'D receives alert 42 from B, records its ID, and forwards it once. Later the same ID arrives from C. D recognizes it and avoids a second mesh-forwarding wave. If D was offline until after the message-cache window, it may not be able to request alert 42 from the peers that advertised it earlier.',
        visualConcept:
          'Show two paths carrying the same ID to one peer; mark the first as “new” and the second as “seen—do not forward again.” Beside it, show a disconnected mesh link and a short cache timeline with the message aging out.',
        technicalDetails: [
          'The PubSub specification requires peers participating in one topic to use the same message-ID calculation logic. The default origin-stamped ID uses publisher and sequence information; applications may configure another function.',
          'GossipSub v1.0 separates a timed seen-ID cache from the message cache used to answer IWANT. These caches serve related but different purposes.',
          'The v1.2 working draft adds optional IDONTWANT control messages to reduce sending a message that a peer already received. The document is a working draft; do not assume every GossipSub implementation supports it.',
          'A heartbeat can adjust mesh membership, but it cannot guarantee a suitable replacement peer exists, that a disconnected peer is reachable, or that a missed message remains available.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0: seen cache and message cache',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
          {
            label: 'libp2p PubSub interface: message IDs',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/README.md',
          },
          {
            label: 'libp2p GossipSub v1.2 working draft: IDONTWANT',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.2.md',
          },
          {
            label: 'libp2p GossipSub v1.1: peer scoring and mesh recovery',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md',
          },
        ],
      },
      {
        title: 'Ethereum and Optimum: related, but separate paths',
        explanation:
          'Ethereum’s execution clients and consensus clients use distinct peer-to-peer networks. Execution clients gossip transactions over the execution-layer network; consensus clients gossip Beacon blocks over the consensus-layer network. Optimum’s Gateway README says the Gateway subscribes to Ethereum libp2p GossipSub topics on its CL-facing host and forwards selected traffic into its mump2p mesh. In the other direction, it receives mump2p messages and re-encodes and publishes them into the local CL libp2p network. The Gateway therefore bridges two paths; mump2p is not simply another name for Ethereum GossipSub.',
        example:
          'A Beacon Node peers with its local Optimum Gateway on the CL-facing libp2p side. If the Gateway receives a selected CL gossip message, it can forward that traffic to its mump2p host and other Gateway peers. A message arriving from mump2p can be re-encoded and published into the Gateway’s local CL gossip network. The Ethereum execution-layer transaction network is a separate path and is not shown as part of this Gateway bridge.',
        visualConcept:
          'Draw two clearly named domains: “Ethereum CL GossipSub” beside the Beacon Node and Gateway’s CL-facing host, and “Optimum mump2p mesh” between Gateway mump2p hosts. Draw the Gateway as the bridge between them. Put the execution-layer transaction network in a separate small callout to show it is not the same CL path.',
        technicalDetails: [
          'Ethereum.org describes separate execution-layer and consensus-layer P2P networks and says consensus clients gossip Beacon blocks across their network.',
          'The current Optimum Gateway README describes a CL-facing libp2p host, a separate mump2p host, subscriptions to configured Ethereum gossip topics, and message forwarding in both directions.',
          'The Gateway README describes its own short-lived deduplication cache using a fast XXHash fingerprint (about one minute). That Gateway cache is distinct from GossipSub’s protocol-level seen-ID and message caches.',
          'Optimum’s mump2p guide reuses control-message names with shard-specific meanings: it describes IHAVE as advertising coded-shard availability and IWANT as requesting more shards for an undecoded message. Do not equate that with baseline GossipSub’s IHAVE/IWANT for recent message IDs and full messages.',
          'Optimum’s older mump2p overview describes mump2p as both an alternative to GossipSub and as building on GossipSub. The current Gateway documentation clarifies the two-sided bridge, but the public sources do not settle that lower-level protocol relationship consistently; this lesson does not infer it.',
        ],
        sources: [
          {
            label: 'Ethereum.org: Networking layer',
            href: 'https://ethereum.org/developers/docs/networking-layer/',
          },
          {
            label: 'Optimum Gateway README: architecture and message flow',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Optimum Gateway integration guide',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
        ],
      },
      {
        title: 'Trade-offs and what the protocol does not promise',
        explanation:
          'GossipSub trades the simplicity of sending every full message to every peer for a selected mesh, periodic metadata gossip, message caches, and mesh-maintenance state. A smaller mesh can reduce redundant full-payload traffic, but a sparse or unhealthy mesh can make propagation depend on more hops. Gossip and caches can help peers repair recent gaps, but message delivery to every subscriber is not guaranteed. Neither a topic subscription nor an IHAVE message is proof that a peer will receive or validate the full message.',
        example:
          'If several mesh peers are slow or disconnected, a message may take a longer route or fail to reach a subscriber. An IHAVE may help if another connected peer still has the payload cached. If no reachable peer has it, GossipSub alone cannot recreate it; an application may need another source or its own sync/recovery mechanism.',
        visualConcept:
          'Show a sparse mesh with one link unavailable, one longer alternate route, and a cache that expires. Label the benefits (less full-payload fanout than flooding) and costs (mesh/control state, gossip traffic, possible extra hops, finite repair window).',
        technicalDetails: [
          'The v1.0 specification gives reasonable mesh and heartbeat defaults, but applications may configure different values; those defaults should not be presented as Optimum production settings.',
          'The v1.1 specification adds peer scoring, PRUNE backoff, peer exchange, flood publishing, and other security/mesh-management extensions. Implementations and network profiles may differ in which extensions they use.',
          'The v1.2 IDONTWANT document is a working draft, and the Optimum Gateway README does not state which GossipSub version or exact mesh/scoring parameters its CL-facing implementation uses.',
          'Optimum’s Gateway documentation states the bridge architecture and describes its cache, but does not publish a complete guarantee that every selected CL message reaches every Gateway or every validator.',
        ],
        sources: [
          {
            label: 'libp2p GossipSub v1.0 specification',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md',
          },
          {
            label: 'libp2p GossipSub v1.1 extensions',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md',
          },
          {
            label: 'libp2p GossipSub v1.2 working draft',
            href: 'https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.2.md',
          },
          {
            label: 'Optimum Gateway README',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
        ],
      },
    ],
  },
  rlnc: {
    id: 'rlnc',
    order: '04',
    navTitle: 'RLNC',
    title: 'Random Linear Network Coding (RLNC)',
    category: 'NETWORK CODING',
    summary:
      'Build coded shards, test whether each one adds new information, and follow a receiver as it reconstructs the original symbols.',
    beginnerExplanation:
      'Random Linear Network Coding (RLNC) lets a sender turn a message into source symbols and send equations made from those symbols. A receiver does not need a particular numbered piece; it needs enough equations that each adds new information. A peer can also combine equations it already has and forward a new coded shard without first reconstructing the message.',
    realWorldExample:
      'Suppose a message is represented by x₁ = 1, x₂ = 2 and x₃ = 3 in a deliberately tiny teaching field. A shard with coefficients [1, 0, 1] says x₁ + x₃ = 4. Another shard can describe a different equation over the same three symbols. If a peer receives two independent equations, it can combine them into a third equation and pass that along without solving for the original symbols.',
    howItWorks: [
      'A sender represents a message as k source symbols. For teaching, this chapter uses three small values; real messages and their coding parameters are implementation-specific.',
      'The sender chooses coefficients from a finite field and multiplies and adds the source symbols. The resulting coded shard contains both a coded value and the coefficients that explain how it was made.',
      'A receiving peer checks whether the new coefficient row is linearly independent of the rows it already has. A duplicate or a row that can be made from earlier rows adds no new information.',
      'After collecting k independent rows for k source symbols, a receiver can solve the equations and recover the symbols. Before that point, it can still store, forward, or recode the information it has.',
      'An intermediate peer can multiply and combine its coded shards to make another coded shard. It does not have to decode the original message before forwarding that combination.',
    ],
    whyItMatters:
      'With ordinary numbered chunks, a receiver may have to wait for a particular missing chunk even while other chunks arrive through different peers. With RLNC, a received shard can be useful if its equation adds a new independent direction of information. That can make multiple delivery paths easier to combine, but it does not guarantee delivery, remove congestion, or make every shard useful.',
    terminologyNote:
      'The worked example and interactive simulation use GF(5): the values 0–4 with arithmetic modulo 5. This is a simplified teaching example only, not an Optimum field size, shard count, wire format, or production configuration.',
    keyTakeaways: [
      'A coded shard carries a linear combination of source symbols and the coefficients needed to interpret it.',
      'A receiver needs enough linearly independent shards—not merely the same number of packets as source symbols—to decode.',
      'An intermediate peer can recode shards it has without first decoding the original message.',
      'RLNC can help a receiver use combinations arriving through different paths, but it does not eliminate loss, bandwidth limits, or coding overhead.',
      'Optimum’s paper and mump2p materials describe RLNC-based shard propagation; the classroom GF(5) example is not Optimum’s production configuration.',
    ],
    demoType: 'rlnc',
    demoNote:
      'Generate sample or random GF(5) shards, send them to a relay and a receiver, and watch each peer’s actual coefficient-matrix rank. The fixed sample set supports a reproducible recoding-and-decoding path; all values are teaching data, not Optimum parameters.',
    sources: [
      {
        label: 'OptimumP2P: Fast and Reliable Gossiping in P2P Networks (IFIP CNSM 2025)',
        href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2025/1571170532.pdf',
      },
      {
        label: 'Optimum mump2p protocol guide',
        href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
      },
      {
        label: 'Optimum local development setup',
        href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
      },
      {
        label: 'Optimum RLNC types and API definitions',
        href: 'https://pkg.go.dev/github.com/getoptimum/optimum-common/pkg/rlncpb/types',
      },
      {
        label: 'IEEE ComSoc: Coding the Network',
        href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
      },
    ],
    chapterSections: [
      {
        title: 'Why code a message instead of waiting for a missing piece?',
        explanation:
          'A message is often split into numbered pieces before it travels. With ordinary chunking, a receiver that has pieces 1, 2 and 4 still lacks piece 3, even if it has received plenty of bytes from other peers. RLNC changes what counts as a useful arrival: peers send equations over the source pieces. A new equation can help even when it is not tied to one particular source-piece number. The receiver still needs enough independent information; coding does not make missing network capacity disappear.',
        example:
          'Imagine three source symbols and a receiver that has heard from two different peers. Rather than each peer only retrying the same missing numbered piece, they can provide different coded equations. The receiver checks the equations, keeps the independent ones, and can combine paths.',
        exampleSteps: [
          'Ordinary chunking: the receiver has chunks 1 and 2, but cannot reconstruct a three-chunk message while chunk 3 is missing.',
          'Coded delivery: the receiver gets equations involving several source symbols. It can use any equation that increases the rank of what it already knows.',
          'If a packet is lost, the receiver may still reach full rank from other independent equations. If all useful packets are lost, it still cannot decode.',
        ],
        visualConcept:
          'Show three original blocks on the left, two peers in the middle sending different coded equations, and a receiver on the right. Mark a repeated/dependent equation as “no new dimension,” and a new independent equation as “rank +1.”',
        technicalDetails: [
          'RLNC is network coding: intermediate nodes can contribute to data delivery by combining packets, rather than acting only as transparent relays.',
          'The OptimumP2P paper motivates RLNC as a way to improve message dissemination in P2P networks and evaluates it against GossipSub. This chapter makes no numeric performance claim.',
          'Whether coding is more efficient for a particular network depends on packet sizes, coefficient overhead, topology, loss, and implementation choices.',
        ],
        sources: [
          {
            label: 'OptimumP2P research paper',
            href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2025/1571170532.pdf',
          },
          {
            label: 'IEEE ComSoc RLNC overview',
            href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
          },
        ],
      },
      {
        title: 'Source symbols, coefficients, and finite-field arithmetic',
        explanation:
          'A source symbol is one value in the data that the sender wants to recover. A coefficient tells how strongly that symbol contributes to a coded shard. RLNC does this arithmetic in a finite field: a finite set with addition, subtraction, multiplication and division rules that stay inside the set. This example uses GF(5), meaning the values 0, 1, 2, 3 and 4, with every result reduced modulo 5. For example, 2 × 3 = 6, which becomes 1 in GF(5). Every non-zero value has a multiplicative inverse, so independent equations can be solved.',
        example:
          'The teaching message is x₁ = 1, x₂ = 2, x₃ = 3 in GF(5). With coefficient row [1, 0, 1], the coded value is 1×x₁ + 0×x₂ + 1×x₃ = 1 + 0 + 3 = 4 (mod 5).',
        exampleSteps: [
          'Read [1, 0, 1] as “use x₁ once, x₂ zero times, and x₃ once.”',
          'Multiply each coefficient by its source value: 1×1, 0×2, and 1×3.',
          'Add the results: 1 + 0 + 3 = 4. The shard is the pair “coefficients [1, 0, 1], value 4.”',
        ],
        visualConcept:
          'Show a coefficient row directly above the source symbols; connect each coefficient to its symbol, then combine the products into one shard value. Include a small GF(5) reminder that values wrap modulo 5.',
        technicalDetails: [
          'The coefficient vector is metadata that describes an equation; it is not the original message itself.',
          'The research paper describes coded packets as random linear combinations over a finite field. The small prime field GF(5) here is selected only to keep the arithmetic easy to inspect.',
          'The cited paper is reported to describe a coefficient matrix over GF(2⁸). This paper-specific detail is not independently verified here because the PDF could not be inspected; it is not evidence that every current Optimum deployment uses that field. This demo deliberately uses GF(5).',
        ],
        sources: [
          {
            label: 'OptimumP2P research paper',
            href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2025/1571170532.pdf',
          },
          {
            label: 'IEEE ComSoc RLNC overview',
            href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
          },
        ],
      },
      {
        title: 'Encoding: each shard is a new equation to test',
        explanation:
          'To encode, the sender selects a coefficient vector, multiplies each source symbol by its coefficient, and adds the products in the field. The coefficient vector must travel with, or otherwise be available for, the coded value so a receiver can interpret it. The result is one coded shard. Different coefficient choices produce different equations, though a different-looking equation is not automatically independent of earlier ones.',
        example:
          'Using x₁ = 1, x₂ = 2, x₃ = 3 in GF(5), the sample shards are S₁ = [1,0,1] → 4, S₂ = [0,1,1] → 0, and S₃ = [1,1,0] → 3.',
        exampleSteps: [
          'S₁: 1×1 + 0×2 + 1×3 = 4.',
          'S₂: 0×1 + 1×2 + 1×3 = 5, which is 0 modulo 5.',
          'S₃: 1×1 + 1×2 + 0×3 = 3.',
        ],
        visualConcept:
          'Use three equation cards showing each coefficient vector, the multiplication-and-addition line, and the final shard value. An arrow should connect the original symbols to the three shard cards.',
        technicalDetails: [
          'The sample vectors were chosen to make the decoding and recoding arithmetic reproducible. The separate random-shard control samples coefficients from GF(5) to illustrate the “random” part of this simplified model.',
          'The Optimum mump2p guide describes splitting a message into fragments and producing coded shards. The demo’s three symbols and field are not production settings.',
          'A distinct coefficient vector can still be dependent. Independence is a property of the whole set of coefficient rows, not whether two rows look different.',
        ],
        sources: [
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
          {
            label: 'IEEE ComSoc RLNC overview',
            href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
          },
        ],
      },
      {
        title: 'Innovative shards, rank, and the complete decoding example',
        explanation:
          'A shard is innovative for a receiver when its coefficient row is not a linear combination of rows the receiver already has. The number of independent rows is the matrix rank. A receiver with three unknown source symbols needs rank 3 before it can solve for all three. Counting packets alone is unsafe: a duplicate or a multiple of an existing row may increase the packet count while leaving rank unchanged.',
        example:
          'This complete GF(5) teaching example recovers x₁ = 1, x₂ = 2, x₃ = 3. It is not Optimum’s production parameter set.',
        exampleSteps: [
          'Receive S₁: x₁ + x₃ = 4. Receive S₂: x₂ + x₃ = 0. These rows are independent, so rank is 2 of 3; decoding is not yet possible.',
          'Receive S₃: x₁ + x₂ = 3. The three coefficient rows are independent, so rank becomes 3 and the system can be solved.',
          'From the first equation, x₁ = 4 − x₃. From the second, x₂ = −x₃. Substitute into the third: 4 − 2x₃ = 3 (mod 5), so 2x₃ = 1.',
          'The inverse of 2 in GF(5) is 3, so x₃ = 3×1 = 3. Then x₁ = 4−3 = 1 and x₂ = −3 = 2 (mod 5).',
        ],
        visualConcept:
          'Show an augmented matrix with three coefficient columns and one value column. Highlight a pivot (an independent equation) as rank grows from 0 to 1 to 2 to 3; reveal the decoded symbols only at rank 3.',
        technicalDetails: [
          'Rank is computed by Gaussian elimination over the same field used for encoding. The interactive demo performs this computation instead of treating “received packet count” as rank.',
          'If the receiver has rank below the number of source symbols, it may retain and forward shards, but this example does not claim it can reconstruct the complete source.',
          'The Optimum API exposes decode response fields such as decoded and innovative. The type definitions do not by themselves establish a production threshold or deployed shard count.',
        ],
        sources: [
          {
            label: 'Optimum RLNC types and API definitions',
            href: 'https://pkg.go.dev/github.com/getoptimum/optimum-common/pkg/rlncpb/types',
          },
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
          {
            label: 'IEEE ComSoc RLNC overview',
            href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
          },
        ],
      },
      {
        title: 'Recoding: a peer can combine shards before decoding',
        explanation:
          'Recoding means taking coded shards already in a peer’s possession and making another linear combination of them. The peer multiplies each received shard by a recoding coefficient and adds the results in the same finite field. Because each original shard is already an equation about the source, their combination is also a valid equation. The peer does not need to solve for the original symbols first.',
        example:
          'A relay holds S₁ = [1,0,1] → 4 and S₂ = [0,1,1] → 0. It has rank 2 for three source symbols, so it cannot decode this teaching message. With recoding weights [1,1], it produces Z = S₁ + S₂ = [1,1,2] → 4.',
        exampleSteps: [
          'Add the coefficient rows: [1,0,1] + [0,1,1] = [1,1,2] (mod 5).',
          'Add the shard values: 4 + 0 = 4 (mod 5).',
          'Check directly: 1×x₁ + 1×x₂ + 2×x₃ = 1 + 2 + 6 = 9 = 4 (mod 5). The relay created a valid shard without decoding.',
          'A receiver that already has S₃ = [1,1,0] → 3 can find Z innovative relative to S₃. Whether any recoded shard is innovative depends on what that receiver already holds.',
        ],
        visualConcept:
          'Draw two shard cards entering a relay with rank 2/3. Inside, show the recoding weights and a new coefficient/value pair leaving for a receiver. Make clear the relay has not reconstructed x₁, x₂, or x₃.',
        technicalDetails: [
          'The IEEE overview describes recombining coded data units without decoding; the Optimum paper likewise describes intermediate nodes recoding.',
          'A recoded shard always lies in the span of the relay’s current information. It can still be useful to a receiver whose current span is different.',
          'The demo uses fixed weights [1,1] to make the arithmetic repeatable. This is a teaching choice, not a claim about Optimum’s recoding algorithm.',
        ],
        sources: [
          {
            label: 'OptimumP2P research paper',
            href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2025/1571170532.pdf',
          },
          {
            label: 'IEEE ComSoc RLNC overview',
            href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
          },
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
        ],
      },
      {
        title: 'What RLNC can help with—and what it cannot',
        explanation:
          'Coded shards give a receiver flexibility: several peers can supply different equations, and the receiver can keep whichever ones add independent information. This can help when packets are lost or arrive through different paths. There are costs too. Shards need coefficient information, and encoding, recoding, rank checks, storage and decoding all require work. A receiver still needs enough independent data to decode; a disconnected network, a slow link, or sustained congestion can still delay it.',
        example:
          'Suppose a receiver has S₃ and misses S₂. It may still make progress with a recoded shard Z if Z is independent of S₃. If the sender only repeats S₃ or the link delivers nothing, the receiver gains no new rank.',
        exampleSteps: [
          'A useful shard can come from a different peer and need not correspond to a missing numbered source chunk.',
          'A repeated or dependent shard still consumes delivery and processing resources without increasing rank.',
          'Coefficient metadata and finite-field calculations add overhead, so the real trade-off depends on the system and network.',
        ],
        visualConcept:
          'Use a balance diagram: on one side, parallel paths and tolerance of missing packets; on the other, coefficient metadata, arithmetic, and the need for enough independent arrivals. A disconnected link remains a gap.',
        technicalDetails: [
          'The cited sources explain recoding and loss-resilient coding concepts, but they do not justify a universal latency, bandwidth, or CPU improvement for every topology.',
          'Coding is not a substitute for peer connectivity, available bandwidth, congestion management, or correct data validation.',
          'The Optimum API includes response indicators for decoded, innovative, polluted, and invalid-commitment outcomes. The API schema alone is not a full security or deployment guarantee.',
        ],
        sources: [
          {
            label: 'IEEE ComSoc RLNC overview',
            href: 'https://www.comsoc.org/publications/ctn/coding-network-next-generation-coding-flexible-network-operation',
          },
          {
            label: 'Optimum RLNC types and API definitions',
            href: 'https://pkg.go.dev/github.com/getoptimum/optimum-common/pkg/rlncpb/types',
          },
          {
            label: 'Optimum development setup (sample, not production-ready)',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
        ],
      },
      {
        title: 'How Optimum uses the idea in its P2P network',
        explanation:
          'Optimum’s OptimumP2P research paper presents a gossip approach that uses RLNC to disseminate information in a peer-to-peer network. The mump2p guide and development setup describe coded-shard propagation through a mesh of P2P nodes. In that design, network dissemination and coding work together: peers exchange shards over a P2P topology, and RLNC lets them forward or combine shard information. This is not the same as saying that an ordinary GossipSub message is itself a coded shard.',
        example:
          'In the paper’s motivating blockchain scenario, a block-related message is the information to distribute. A publisher encodes the message into shards; peers pass coded information through the P2P network; a receiver reconstructs after enough independent equations arrive. The published paper evaluates OptimumP2P against GossipSub, but this lesson does not infer a benchmark result from the comparison.',
        exampleSteps: [
          'A node has a message to publish and prepares it for coding.',
          'The sender creates coded shards and makes them available to connected P2P peers.',
          'Peers relay or recode coded information; the receiver tests each arrival for useful independent information.',
          'After enough independent shards arrive, the receiver decodes and can use the reconstructed message.',
        ],
        visualConcept:
          'Show a publisher, three connected mesh peers, coded-shard arrows on the P2P message path, and a receiver that decodes at full rank. Label it “OptimumP2P / mump2p concept” and mark the GF(5) values as a separate teaching overlay, not production parameters.',
        technicalDetails: [
          'The research paper names OptimumP2P as an RLNC-based gossip approach and reports evaluation in simulation and real-world environments. No performance number is asserted here.',
          'The Optimum development setup calls itself a sample local setup and explicitly says it is not production-ready. It demonstrates P2P nodes that form an RLNC-enhanced mesh and forward coded shards.',
          'The public Go API documents coding-related request, symbol and decode-result types. A published API definition is not proof of the exact implementation version or settings used in a running network.',
          'The public mump2p guide describes mump2p both as an alternative to GossipSub and as building on GossipSub. Those statements are inconsistent, so this chapter treats the precise protocol relationship as unverified.',
        ],
        sources: [
          {
            label: 'OptimumP2P research paper',
            href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2025/1571170532.pdf',
          },
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
          {
            label: 'Optimum local development setup',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Optimum RLNC types and API definitions',
            href: 'https://pkg.go.dev/github.com/getoptimum/optimum-common/pkg/rlncpb/types',
          },
        ],
      },
      {
        title: 'What public Optimum sources do not settle',
        explanation:
          'The sources establish the broad idea—RLNC-coded shards moving through a P2P mesh—but they do not let this lesson safely fill in every engineering detail. The linked API page is a versioned set of types, and the development setup is a sample rather than a production deployment. We therefore keep the classroom arithmetic small and label it clearly instead of presenting it as Optimum’s actual wire format or tuning.',
        example:
          'When a demo uses GF(5), three source symbols and recoding weights [1,1], those values make the equations easy to verify. They are chosen for the lesson and should not be copied into an Optimum deployment configuration.',
        exampleSteps: [
          'The paper verifies that OptimumP2P applies RLNC to P2P gossip; it does not make the GF(5) example a production setting.',
          'The cited paper is reported to describe its encoder with coefficients over GF(2⁸), but this paper-specific detail could not be independently verified from the accessible source. It does not prove a current production setting. The linked Go package is versioned and marked as not the module’s latest version; its types do not prove which mode or values are deployed in every network.',
          'The local setup guide explicitly describes a sample and says it is not production-ready.',
        ],
        visualConcept:
          'Place a “documented” column beside a “not verified here” column. Documented: RLNC-coded dissemination and recoding as a concept. Not verified: production field size, symbol count, exact wire encoding, deployed thresholds, and guaranteed performance.',
        technicalDetails: [
          'The cited paper is reported to describe GF(2⁸) for its encoder, but this paper-specific detail could not be independently verified from the accessible source. The protocol guide names tunable coding parameters, but the cited sources do not establish one current production field size, shard count, or recoding threshold for every Optimum deployment.',
          'The experiment results are not reproduced here as universal guarantees; measured outcomes depend on the evaluated setup.',
          'The relationship between mump2p and GossipSub is worded inconsistently in the public mump2p guide and remains unresolved in this chapter.',
        ],
        sources: [
          {
            label: 'OptimumP2P research paper',
            href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2025/1571170532.pdf',
          },
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
          {
            label: 'Optimum local development setup',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Optimum RLNC types and API definitions',
            href: 'https://pkg.go.dev/github.com/getoptimum/optimum-common/pkg/rlncpb/types',
          },
        ],
      },
    ],
  },
  mump2p: {
    id: 'mump2p',
    order: '05',
    navTitle: 'mump2p',
    title: 'mump2p',
    category: 'OPTIMUM PROTOCOL',
    summary:
      'Follow an application message through Optimum’s proxy and P2P-node layers, then watch coded shards move through a topic mesh.',
    beginnerExplanation:
      'mump2p is Optimum’s peer-to-peer messaging protocol. In the development setup, an application can use a proxy or connect directly to a P2P node. The P2P nodes form the mesh. Rather than forwarding only complete copies of a message, the mump2p path can carry RLNC-coded shards: equations about the original message that a peer can combine and forward.',
    realWorldExample:
      'The development guide shows a publisher sending a message to a topic and a separate client subscribing to that topic. In the proxy path, the application publishes through a proxy and receives messages through its subscription stream. The proxy connects to P2P nodes; those nodes exchange coded shards in the mesh. A direct P2P client can instead publish or subscribe through a node’s sidecar interface.',
    howItWorks: [
      'P2P nodes use peer identities and bootstrap information to discover and connect to other nodes. A topic groups messages that participating nodes and clients want to publish or receive.',
      'An application submits a message to a proxy or to a P2P node directly. The proxy is an application-facing access layer; it is not one of the P2P mesh nodes.',
      'The publishing P2P node prepares the message and creates coded shards. The development guide’s sample setup shows P2P nodes forwarding coded shards through an RLNC-enhanced mesh.',
      'A receiving peer checks incoming shards. A new independent shard can add information; duplicate or unhelpful shards may add none. A peer can also recode shards it already has without first decoding the original message.',
      'When a subscribed node has enough independent information to reconstruct the message, delivery can continue to the subscriber application through the selected access path. The guide also documents configurable thresholds; the sample values are not universal settings.',
    ],
    whyItMatters:
      'This design separates the application interface from the peer mesh and allows coded information to move through more than one node. That is useful to understand when integrating, debugging, or comparing message paths. It does not mean every integration must use a proxy, that every received shard helps, or that delivery is guaranteed.',
    terminologyNote:
      'Keep these roles separate: a P2P node is a network participant; the proxy is an optional client-facing service; a topic is a message group; and a coded shard is one algebraic piece of a message. The development guide also describes the Optimum Gateway as bridging libp2p clients and mump2p nodes; that Gateway is not the same component as the sample setup’s REST/WebSocket proxy.',
    keyTakeaways: [
      'mump2p is the messaging protocol; the P2P nodes form the mesh that speaks it.',
      'A proxy offers an application-facing path to P2P nodes, but direct node access is also documented.',
      'P2P peer identity, an application client ID, and a topic name identify different things.',
      'Coded shards can be forwarded or recoded; the subscriber’s node still needs enough independent information to reconstruct the message.',
      'The public development guide is a sample setup. Its configuration examples are not universal production values or delivery guarantees.',
    ],
    demoType: 'mump2p',
    demoNote:
      'Connect four simulated P2P nodes, join a topic, and step through a fixed shard route. GF(5), the topology, and event schedule are teaching choices—not a live network or an exact production implementation.',
    sources: [
      {
        label: 'mump2p development setup and architecture',
        href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
      },
      {
        label: 'Complete mump2p development guide',
        href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
      },
      {
        label: 'Optimum Gateway',
        href: 'https://github.com/getoptimum/optimum-gateway',
      },
      {
        label: 'Optimum common SDK and RLNC types',
        href: 'https://github.com/getoptimum/optimum-common',
      },
      {
        label: 'mump2p CLI',
        href: 'https://github.com/getoptimum/mump2p-cli',
      },
    ],
    chapterSections: [
      {
        title: 'What mump2p is and what problem it addresses',
        explanation:
          'mump2p is Optimum’s peer-to-peer messaging protocol. The development setup describes a pub/sub service made from application clients, proxies, and P2P nodes. The P2P nodes form the mesh and forward coded shards. A shard is not necessarily a complete copy of the message: it carries a linear combination of source fragments, as covered in Module 04. This lets nodes exchange useful equations about a message, rather than requiring every intermediate peer to first rebuild the whole payload.',
        example:
          'One application publishes “block update” to a topic. A P2P node prepares coded shards and sends them into its connected mesh. Another node can forward or recode what it has. A subscriber’s node reconstructs the original payload when its shard set contains enough independent information.',
        exampleSteps: [
          'The publisher chooses a topic and submits the message through an access interface.',
          'The P2P node creates shards representing the message and exchanges them with peers in the mesh.',
          'The receiving node checks the shards and reconstructs the message when it has enough independent information.',
        ],
        visualConcept:
          'Show “application message” becoming several coded-shard cards at a P2P node, passing through two mesh peers, then becoming the same original message at a subscriber. Keep the optional proxy outside the mesh boundary.',
        technicalDetails: [
          'The setup repository calls mump2p an RLNC-enhanced pub/sub protocol and describes its P2P nodes as a coded-shard mesh.',
          'The Optimum Gateway repository describes a separate Gateway component that gossips messages between libp2p clients and mump2p nodes.',
          'The public sources support the broad message path; they do not justify a universal latency or delivery guarantee.',
        ],
        sources: [
          {
            label: 'mump2p development setup',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Optimum Gateway',
            href: 'https://github.com/getoptimum/optimum-gateway',
          },
          {
            label: 'Optimum common SDK',
            href: 'https://github.com/getoptimum/optimum-common',
          },
        ],
      },
      {
        title: 'The architecture: application, proxy, P2P nodes, and mesh',
        explanation:
          'The sample architecture has two layers. Applications and clients use a proxy for REST, WebSocket, or proxy gRPC access. The proxy connects to P2P nodes over their sidecar interfaces. Separately, P2P nodes connect to one another and form the mump2p mesh. The proxy is not a mesh peer and is not required for every integration. The Optimum Gateway is another named component: its repository describes it as bridging libp2p clients and mump2p nodes. Do not use “proxy” and “Gateway” as interchangeable labels.',
        example:
          'With proxy access, a publisher application sends a request to the proxy, which routes it to a P2P node. The node sends coded shards through its mesh peers. On the receiving side, a node reconstructs the message and the proxy can stream it to a subscribed application. A direct client can instead use a P2P node interface and bypass the proxy layer.',
        exampleSteps: [
          'Client-facing path: Publisher/Application → optional Proxy → P2P Node A.',
          'Network path: P2P Node A ↔ other P2P nodes in the RLNC-enhanced mesh.',
          'Subscriber path: receiving P2P Node → optional Proxy → Subscriber/Application.',
          'The proxy-to-node sidecar links and node-to-node mesh links are different connections.',
        ],
        visualConcept:
          'Draw the proxy in a separate “client access” band above the mesh. Use solid arrows from applications to the optional proxy and dashed gRPC sidecar links from proxy to several P2P nodes. Put four P2P nodes inside a mesh boundary, with a second direct application-to-node path that bypasses the proxy.',
        technicalDetails: [
          'The development setup lists REST/WebSocket clients, proxies, gRPC sidecar connections, and P2P nodes as separate roles.',
          'The setup repository describes proxies as client-facing and the P2P nodes as the core mesh. Its topology is a reference setup, not a production requirement.',
          'The Optimum Gateway repository says the Gateway gossips between libp2p clients and mump2p nodes; its role should be taught separately from the sample proxy.',
        ],
        sources: [
          {
            label: 'Complete development guide: architecture and proxy API',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'Development setup repository',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Optimum Gateway',
            href: 'https://github.com/getoptimum/optimum-gateway',
          },
        ],
      },
      {
        title: 'Joining: peer identity, bootstrap, and topics',
        explanation:
          'A P2P node needs a network identity so other peers can refer to it, and an address or bootstrap information so it can find an initial connection. The development guide’s setup workflow generates a bootstrap identity and configures bootstrap peer information for discovery. After nodes connect, they can join a topic so the mesh knows which messages they want to exchange. A topic is a message label, not a peer identity. The application’s `client_id` is also different: the guide uses it to associate a client’s proxy subscription and WebSocket session.',
        example:
          'A node starts with a configured bootstrap peer, discovers and connects to another P2P node, then subscribes to `demo/blocks`. A browser client may separately subscribe through the proxy using its own `client_id`.',
        exampleSteps: [
          'Generate or configure the node identity and bootstrap information as required by the development setup.',
          'Connect to a reachable P2P peer; the node-state endpoint can show peer IDs and advertised addresses.',
          'Join the topic on the relevant node. The trace guide lists JOIN and GRAFT events that help observe topic and mesh setup.',
          'Keep the node Peer ID, proxy client ID, and topic name distinct when debugging.',
        ],
        visualConcept:
          'Show Bootstrap Peer → newly started P2P Node → connected mesh peers. Beneath it, draw a separate topic membership ring and an application client ID attached to the proxy, so the three identifiers are not conflated.',
        technicalDetails: [
          'The development guide describes generating a bootstrap identity and configuring bootstrap peer information for node discovery.',
          'Its node-state response exposes a public key, advertised addresses, peer IDs, and topics.',
          'The trace list names JOIN, GRAFT, ADD_PEER, and REMOVE_PEER events; the guide does not establish that one fixed join sequence is universal across deployments.',
        ],
        sources: [
          {
            label: 'Complete development guide: bootstrap identity and node state',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'mump2p CLI: topic subscriptions',
            href: 'https://github.com/getoptimum/mump2p-cli',
          },
        ],
      },
      {
        title: 'Publishing: from an application to a P2P node',
        explanation:
          'Publishing starts at the application boundary, not in the mesh itself. In the proxy example, a client submits a topic and message to the proxy’s publish API. The proxy connects to P2P nodes and routes the request into the P2P service. With direct access, a P2P client publishes through a node’s gRPC sidecar instead. The mump2p CLI repository documents publishing to a topic through a selected P2P node; the setup guide also provides proxy publishing examples.',
        example:
          'A service publishes the text “new block” on `demo/blocks`. The proxy path first associates the request with the client session, then sends it to a P2P node. The direct path submits it to a P2P node without going through the proxy API.',
        exampleSteps: [
          'Choose the topic and message payload.',
          'Choose the documented integration path: proxy API/streaming or direct P2P-node sidecar.',
          'The P2P node receives the message and begins the mump2p message/shard flow.',
          'A publish acknowledgement confirms the request was accepted by that interface; it does not prove every subscriber has received it.',
        ],
        visualConcept:
          'Two parallel arrows should enter the same P2P Node: Application → Proxy → Node and Application → Node directly. Continue both arrows into the same mesh so the proxy is visibly an access choice, not a second mesh.',
        technicalDetails: [
          'The guide’s proxy API includes a topic, message, and client ID for publish requests.',
          'The direct sample client publishes to a P2P node using its sidecar gRPC interface.',
          'The mump2p CLI README describes a mixed workflow in which a proxy can provide session/node information while publish/subscribe traffic communicates directly with a node; integrations may therefore combine access roles.',
        ],
        sources: [
          {
            label: 'Complete development guide: publish APIs and direct P2P',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'mump2p CLI',
            href: 'https://github.com/getoptimum/mump2p-cli',
          },
        ],
      },
      {
        title: 'Shard creation: connect mump2p to Module 04',
        explanation:
          'The P2P node prepares a message for coding and produces coded shards. Each shard represents a linear combination of the message’s source fragments, as explained in Module 04. Here the important system-level point is that the P2P node creates shards before sending them into the mesh; the proxy is not the coding peer. Configuration names in the development guide describe its sample setup and should not be read as universal production settings.',
        example:
          'For this simulation only, the payload is the three-symbol vector [1, 2, 3] over GF(5). The publisher creates S₁ = [1,0,1] → 4, S₂ = [0,1,1] → 0, and S₃ = [1,1,0] → 3. These values make the network’s decisions visible; they are not Optimum’s deployed field or shard configuration.',
        exampleSteps: [
          'The original payload is represented as source symbols.',
          'The P2P node makes coefficient/value pairs for coded shards.',
          'The coefficients let receiving nodes interpret and compare the equations.',
          'For the RLNC arithmetic and decoding derivation, revisit Module 04 rather than treating this system-level lesson as a second math chapter.',
        ],
        visualConcept:
          'Show a node’s incoming message becoming source-fragment tiles, then three coded-shard cards with coefficient vectors. Add a “GF(5) teaching example only” label and point back to Module 04 for the full algebra.',
        technicalDetails: [
          'The setup guide lists shard-related environment variables and sample values. Those values describe that development setup and are not universal settings.',
          'The guide’s traces include NEW_SHARD events with message IDs and coefficients.',
          'The optimum-common repository is the shared SDK source; its public types do not by themselves establish every runtime setting or behavior.',
        ],
        sources: [
          {
            label: 'Complete development guide: configuration and shard traces',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'Optimum common SDK',
            href: 'https://github.com/getoptimum/optimum-common',
          },
        ],
      },
      {
        title: 'Propagation and recoding through the mesh',
        explanation:
          'P2P nodes exchange coded information over their mesh connections. A node can forward shards it has received or form a new combination from its local shard set. Recoding does not require the peer to recover the original message first. A recoded shard may be useful to another peer if it adds a direction of information that peer does not already have. The exact peer-selection and forwarding decisions are configurable in the sample setup; this lesson does not invent a universal mesh algorithm.',
        example:
          'Node B has S₁ and S₂, which give it rank 2 for a three-symbol payload. It combines them into Z = [1,1,2] → 4 without decoding. Node D already has S₃, so Z can add information there even though it is made only from what B already knows.',
        exampleSteps: [
          'A publishes S₁ to B and S₂ to C.',
          'C forwards S₂ to B, so B has two independent equations but still lacks rank 3.',
          'B combines its equations into a new coded shard and forwards that result to D.',
          'D evaluates the incoming row against its own shard set; “new for B” and “new for D” are different questions.',
        ],
        visualConcept:
          'Animate a shard moving A→B, another A→C→B, then a newly recoded shard B→D. Keep a rank counter on each node so learners can see that B’s rank stays 2 while D’s rank changes based on its own arrivals.',
        technicalDetails: [
          'The development setup describes P2P nodes forwarding messages via coded shards and configurable thresholds/redundancy.',
          'Its trace examples include SEND_RPC and RECV_RPC around peer exchanges, plus shard-specific events.',
          'The simulation uses a fixed four-node topology and a deterministic recoding pair. It is not a model of production peer selection, timing, or forwarding policy.',
        ],
        sources: [
          {
            label: 'Development setup repository',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Complete development guide: trace events and node topology',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'Optimum common SDK',
            href: 'https://github.com/getoptimum/optimum-common',
          },
        ],
      },
      {
        title: 'Reading shard trace labels',
        explanation:
          'The development guide lists four useful shard-event names. NEW_SHARD means a new RLNC shard was created, with a message ID and coefficients. DUPLICATE_SHARD means a duplicate was detected. UNHELPFUL_SHARD is described as a shard that does not help decoding. UNNECESSARY_SHARD is described as a shard that is not needed for decoding. These labels help a developer interpret trace output, but the guide does not spell out every internal decision rule. In the demo, a dependent row is used as a simple example of “unhelpful,” and a shard arriving after full reconstruction is used as “unnecessary.”',
        example:
          'Node B already has S₁. Receiving S₁ again is logged as DUPLICATE_SHARD. Receiving 2×S₁ is a different packet but a dependent equation, so this educational simulation labels it UNHELPFUL_SHARD. Once Node D has decoded, another shard is labeled UNNECESSARY_SHARD in the simulation.',
        exampleSteps: [
          'NEW_SHARD: inspect the message ID and coefficient data to understand what was created.',
          'DUPLICATE_SHARD: the same shard has already been seen by that peer.',
          'UNHELPFUL_SHARD: the guide says it did not help decoding; the exact production classifier is not fully described there.',
          'UNNECESSARY_SHARD: the guide says it was not needed for decoding; do not assume a more specific implementation rule without source evidence.',
        ],
        visualConcept:
          'Show four event-log rows with the official uppercase names. Under each, show a short plain-language meaning and mark the dependent-row and post-decode examples as simulation interpretations.',
        technicalDetails: [
          'The event names are taken from the development guide’s trace-event list, which calls them events “observed in practice.”',
          'DUPLICATE_SHARD, UNHELPFUL_SHARD, and UNNECESSARY_SHARD should not be treated as synonyms: the guide lists them separately.',
          'The public guide gives brief summaries rather than complete state-machine definitions for the shard classifiers.',
        ],
        sources: [
          {
            label: 'Complete development guide: mump2p trace event types',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
        ],
      },
      {
        title: 'Delivery: from reconstructed node to subscriber',
        explanation:
          'A subscriber first needs a subscription on the relevant topic. The development guide documents subscribing through a proxy and receiving messages over a WebSocket or gRPC stream. It also documents subscribing directly through the P2P client. Inside the mesh, the receiving P2P node tracks message and shard state; the guide’s snapshot distinguishes message hashes that have been seen from hashes that are fully decoded. Once the node has reconstructed a message, it can deliver it to the application over the chosen access path, subject to the configured behavior.',
        example:
          'A subscriber connects to the proxy with its client ID and subscribes to `demo/blocks`. The receiving P2P node collects shards from the mesh and reconstructs the payload. The proxy’s stream then delivers the topic message to that client. A direct subscriber can instead read from a P2P node interface.',
        exampleSteps: [
          'Subscribe the client and the relevant P2P node to the same topic.',
          'Watch the node’s snapshot as the message moves from seen to fully decoded.',
          'Check that the subscriber stream is connected and uses the expected client ID.',
          'Treat an acknowledgement or a seen hash as a milestone, not proof that every subscriber received it.',
        ],
        visualConcept:
          'Show the message-state progression “seen → shards collected → fully decoded → delivered to client.” Label the proxy stream as an optional final hop and keep it outside the P2P mesh.',
        technicalDetails: [
          'The guide documents proxy subscriptions, WebSocket delivery, gRPC streaming, and direct P2P subscriptions.',
          'The sample proxy API includes a delivery threshold; its value and interpretation are configuration-dependent.',
          'The guide warns that its WebSocket path may be unreliable for message bursts in the sample setup. Do not teach the stream as a guaranteed-delivery mechanism.',
        ],
        sources: [
          {
            label: 'Complete development guide: subscriptions and delivery',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'mump2p CLI',
            href: 'https://github.com/getoptimum/mump2p-cli',
          },
        ],
      },
      {
        title: 'mump2p and ordinary GossipSub are different message paths',
        explanation:
          'Ordinary GossipSub forwards published messages through a topic mesh. mump2p’s documented Optimum path uses RLNC-coded shards, which peers can recode before the full message is reconstructed. The development guide exposes separate `optimum` and `gossipsub` node modes and separate trace parsing for the two protocols, so they should not be presented as identical forwarding behavior. Public Optimum documentation has described mump2p both as an alternative to GossipSub and as building upon it; the precise relationship is inconsistently worded, so this lesson distinguishes their documented data paths without asserting an unresolved layering claim.',
        example:
          'If a trace shows a GossipSub delivery event, look for a message being forwarded as a pub/sub payload. If it shows a mump2p NEW_SHARD or shard-disposition event, inspect the coded-shard path and the message’s decode state. Do not treat the event names as interchangeable.',
        exampleSteps: [
          'GossipSub path: topic mesh peers forward published messages according to GossipSub behavior.',
          'mump2p path: P2P nodes exchange coded shards and may recode them.',
          'The setup guide can run separate modes and has distinct trace handlers; compare like with like when debugging.',
          'Do not infer that mump2p is simply a renamed GossipSub protocol or that every internal layer relationship is settled by the public wording.',
        ],
        visualConcept:
          'Create two lanes: “ordinary GossipSub: message → topic mesh → message” and “mump2p: message → coded shards → mesh/recoding → reconstructed message.” Give each lane distinct event labels.',
        technicalDetails: [
          'The development guide lists separate node modes and says its trace parser handles GossipSub and mump2p as separate event streams.',
          'The setup repository includes separate compose configurations for GossipSub and Optimum modes.',
          'The exact relationship between mump2p and GossipSub is not stated consistently across Optimum’s public guide; no layering conclusion is made here.',
        ],
        sources: [
          {
            label: 'Complete development guide: node modes and trace events',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'Development setup repository',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Optimum mump2p protocol guide',
            href: 'https://github.com/getoptimum/docs/blob/main/docs/learn/overview/p2p.md',
          },
        ],
      },
      {
        title: 'Proxy access and direct P2P access',
        explanation:
          'A proxy can give applications a managed interface for publishing, subscribing, authentication or rate limits when those options are enabled. It can also connect to multiple P2P nodes. Direct P2P access is useful for low-level integrations, internal services, or debugging the node interface without the proxy REST/WebSocket layer. The development guide explicitly documents both. The mump2p CLI README also describes a mixed design: it may use a proxy to establish a session or obtain node choices, then communicate with a node directly. “Proxy” and “direct” are therefore integration choices, not mutually exclusive network architectures.',
        example:
          'A web application can publish through the proxy API and receive through its stream. A developer testing node behavior can use the provided P2P client against a node sidecar. A CLI may use proxy session management while sending the message to a selected node directly.',
        exampleSteps: [
          'Use proxy access when the application wants the proxy’s API or configured access controls.',
          'Use direct access when the client needs a low-level node interface or wants to avoid the proxy HTTP/WebSocket layer.',
          'Check each client’s actual flow: the CLI can combine proxy session setup with direct node traffic.',
          'Neither route bypasses the P2P mesh after a node has published a message into it.',
        ],
        visualConcept:
          'Show two colored client routes converging on the same P2P mesh. Draw the proxy as a separate optional box with sidecar links to multiple nodes; do not place it inside the mesh boundary.',
        technicalDetails: [
          'The development guide calls proxy access recommended for its sample and also documents an optional direct P2P-node client.',
          'The CLI README describes proxy session management and direct node publish/subscribe communication.',
          'Authentication and rate-limit behavior depends on setup and configuration; the local guide’s defaults are examples, not universal requirements.',
        ],
        sources: [
          {
            label: 'Complete development guide: two ways to connect',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'mump2p CLI',
            href: 'https://github.com/getoptimum/mump2p-cli',
          },
          {
            label: 'Development setup architecture',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
        ],
      },
      {
        title: 'Monitoring and debugging a message path',
        explanation:
          'When a subscriber does not receive a message, check each boundary separately. First confirm that the client subscribed to the intended topic. Then inspect whether P2P nodes are connected and joined, whether the message hash is seen, and whether it becomes fully decoded. Trace logs can show joins, peer RPCs, shard creation or disposition, and final delivery. Metrics are useful for service health and resource trends, but a single metric does not prove that a particular subscriber received a particular message.',
        example:
          'A publisher reports success, but the subscriber is quiet. Check the subscriber’s topic/client ID, the node’s `/api/v1/topics` response, `/api/v1/node-state` for peers and addresses, and `/api/v1/p2p-snapshot` for seen and fully decoded hashes plus shard/peer statistics. Then inspect trace output for the message ID and delivery events.',
        exampleSteps: [
          'Verify the application subscription and client ID.',
          'Inspect node state and topic membership to confirm peers and topic assignment.',
          'Inspect the P2P snapshot for message hashes and shard status.',
          'Use trace output to follow PUBLISH_MESSAGE, NEW_SHARD, peer RPC, and DELIVER_MESSAGE events.',
          'Use proxy and node metrics for health/resource context, not as a substitute for message-level evidence.',
        ],
        visualConcept:
          'Show a debugging ladder from client subscription → topic membership → peer connections → seen hash → shard/decoded state → client delivery, with the corresponding endpoint or trace type beside each rung.',
        technicalDetails: [
          'The guide documents `/api/v1/node-state`, `/api/v1/p2p-snapshot`, `/api/v1/topics`, proxy `/metrics`, and trace output.',
          'The snapshot separates seen message hashes from fully decoded hashes and includes shard/peer statistics.',
          'The CLI debug output can show session details, node choices, message IDs, timing fields, and peer paths; sample output is not a performance guarantee.',
          'The development guide notes that trace availability can differ between local and remote nodes.',
        ],
        sources: [
          {
            label: 'Complete development guide: monitoring, snapshots, traces',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'mump2p CLI debug output',
            href: 'https://github.com/getoptimum/mump2p-cli',
          },
        ],
      },
      {
        title: 'Limits, sample settings, and what is not guaranteed',
        explanation:
          'A coded-shard mesh still needs reachable peers, working topic connections, and enough useful data to reconstruct the message. Packet loss, unavailable peers, congestion, message size, shard redundancy, and forwarding configuration can all affect what happens. RLNC adds coefficient data and computation. The development setup is explicitly a sample/reference environment, and its displayed configuration values are examples. It does not establish a universal production configuration or guarantee that every subscriber receives a message.',
        example:
          'If a node disconnects before it forwards enough independent shards, a downstream subscriber may remain short of the information it needs. Increasing redundancy or changing topology may affect a particular setup, but the documentation does not establish one setting that guarantees delivery or a specific performance gain.',
        exampleSteps: [
          'A peer must be reachable and joined to the relevant topic for the modeled route to work.',
          'A duplicate or unhelpful shard does not replace missing independent information.',
          'More shards can mean more network traffic and processing; configuration is a trade-off, not a universal optimum.',
          'A proxy, P2P node, or subscriber stream can also be the point where a message path is interrupted.',
        ],
        visualConcept:
          'Show the mesh with one disconnected link and a receiver whose rank remains below the decode threshold. Beside it, list “connectivity, independent shards, message size, redundancy, configuration” as factors—not promises.',
        technicalDetails: [
          'The repository README explicitly says the sample setup is not production-ready and should be adapted to environment and security needs.',
          'The guide’s shard, mesh, message-size, threshold, and rate-limit values belong to its examples; they are not taught as required or universal settings.',
          'The setup guide notes limitations in its WebSocket sample for message bursts.',
          'Public sources do not document a universal delivery guarantee or performance result for all network conditions.',
        ],
        sources: [
          {
            label: 'Development setup repository: sample status and purpose',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
          {
            label: 'Complete development guide: configuration and limitations',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide/blob/main/docs/guide.md',
          },
          {
            label: 'Optimum common SDK',
            href: 'https://github.com/getoptimum/optimum-common',
          },
        ],
      },
    ],
  },
  gateway: {
    id: 'gateway',
    order: '06',
    navTitle: 'Gateway',
    title: 'Gateway Architecture',
    category: 'NETWORK BRIDGE',
    summary:
      'Trace how Optimum Gateway connects Ethereum consensus-layer GossipSub with the mump2p mesh, and learn what the bridge does—and does not do.',
    beginnerExplanation:
      'Optimum Gateway is one process with two networking sides. On one side, a libp2p host peers with an Ethereum consensus-layer client and listens to selected GossipSub topics. On the other, an embedded mump2p node connects to the Optimum mesh. Gateway code bridges selected messages between those sides, translating their topic and message representations. The mesh node—not an undocumented RLNC routine in the Gateway bridge—is the Gateway’s mump2p participant.',
    realWorldExample:
      'A beacon node gossips a block to its local Gateway. The Gateway receives the subscribed consensus message and publishes it to its embedded mump2p node. A different Gateway can receive it from the mesh and publish the message into its own local consensus-layer GossipSub network. The path is optional alongside Ethereum peers; the public docs do not guarantee that it is always faster or that every client receives every message.',
    howItWorks: [
      'The Gateway starts a CL-facing libp2p host and an embedded mump2p node. The operator’s consensus-layer client peers with the Gateway; the embedded node connects to other Gateway mesh peers.',
      'For configured CL topics, the Gateway receives gossip messages, maps and decodes the topic payload, and checks its short-lived message cache.',
      'For eligible messages, the Gateway calls the embedded mump2p node to publish into the mesh. Some high-volume non-block topics can pass through an aggregation pipeline.',
      'In the reverse direction, the embedded node delivers a mump2p message to the Gateway. The Gateway can skip configured self-originated messages, map the message to a local CL topic, and publish it when that topic is subscribed. The reviewed Beacon Block implementation path does not establish that the payload must be decoded and re-encoded.',
      'Operators use bootstrap information to discover mesh peers, configure client peer connections, and inspect health, peer information, logs, and metrics.',
    ],
    whyItMatters:
      'The Gateway bridges two separate pub/sub environments without requiring a consensus client code change. It is also an operational dependency in both directions: the bridge process, its peer connections, topic compatibility, and configuration all matter. The architecture is a message path, not a consensus service, validator, public API proxy, or delivery guarantee.',
    terminologyNote:
      'Keep four components distinct: a libp2p CL client (usually a beacon node), the Optimum Gateway process, the Gateway’s embedded mump2p node, and other mump2p mesh peers. The Gateway also exposes a separate telemetry HTTP API; it is not the optional REST/WebSocket proxy described in the development setup for application access.',
    keyTakeaways: [
      'One Gateway process has a CL-facing libp2p host and an embedded mump2p node.',
      'It bridges selected CL GossipSub messages and mump2p messages in both directions.',
      'The Gateway maps messages to local topics and publishes selected messages; the reviewed Beacon Block path does not establish a required decode-and-re-encode step. Do not assume the Gateway bridge performs RLNC encoding or decoding.',
      'Bootstrap, credentials, peer connectivity, and compatible topic mappings affect operation.',
      'Health, self-info, and metrics are useful diagnostics, but neither a healthy endpoint nor a publish event proves end-to-end subscriber delivery.',
    ],
    demoType: 'gateway',
    demoNote:
      'This simulation shows two CL-side clients, one Gateway with its two network interfaces, and a remote mump2p peer. It is an educational flow model, not a live Gateway or a complete model of peer selection, topic validation, aggregation, or RLNC.',
    sources: [
      {
        label: 'Optimum Gateway repository and README',
        href: 'https://github.com/getoptimum/optimum-gateway',
      },
      {
        label: 'Gateway README: architecture, flows, APIs, and setup',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
      },
      {
        label: 'Gateway integration guide',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
      },
      {
        label: 'Gateway architecture ADR-0001',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
      },
      {
        label: 'Gateway sample configuration',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/config/sample.app_conf.yml',
      },
      {
        label: 'Gateway security model',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/SECURITY.md',
      },
      {
        label: 'Optimum development setup',
        href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
      },
    ],
    chapterSections: [
      {
        title: 'What Optimum Gateway does',
        explanation:
          'Optimum Gateway is a software process that bridges selected Ethereum consensus-layer (CL) GossipSub traffic and the Optimum mump2p mesh. A CL client—usually a beacon node—connects to the Gateway as a libp2p peer. The Gateway has its own CL-facing libp2p host and an embedded mump2p node. Its job is to move eligible messages between those networking sides and adapt the topic and payload representation. It is not a validator, beacon node, or replacement for Ethereum consensus software.',
        example:
          'A beacon node hears about a beacon block on an Ethereum GossipSub topic. Its Gateway receives that topic message and passes it to the embedded mump2p node. Another Gateway can receive the mesh message and publish it to its own local consensus-layer gossip peers.',
        exampleSteps: [
          'The beacon node and Gateway peer over libp2p on the CL-facing side.',
          'The Gateway subscribes to configured consensus gossip topics.',
          'A selected message crosses the Gateway bridge into the embedded mump2p node.',
          'A remote mesh peer can carry the message toward another Gateway and its local CL peers.',
        ],
        visualConcept:
          'Show a single outlined Gateway process containing a CL-facing libp2p host, a message-bridge core, and an embedded mump2p host. Outside it, show a beacon node on the left and another Gateway’s mump2p peer on the right.',
        technicalDetails: [
          'The README describes Gateway as a subscriber to Ethereum CL gossip topics, a publisher/forwarder into mump2p, and a receiver that republishes mump2p messages locally.',
          'The ADR describes one process with a libp2p/CL frontend and an embedded mump2p node.',
          'The docs describe propagation goals, not guaranteed arrival times or validator outcomes.',
        ],
        sources: [
          {
            label: 'Gateway README: overview and architecture',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway architecture ADR-0001',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
        ],
      },
      {
        title: 'Why a Gateway is needed: two networking environments',
        explanation:
          'An Ethereum beacon node participates in Ethereum consensus-layer gossip. Optimum’s mump2p mesh is a separate peer network with its own node and message interface. A message on one side does not automatically appear on the other: a component has to subscribe to the relevant side, interpret the topic and payload, and publish the message through the other side’s interface. Gateway supplies that bridge. The integration guide says the CL client needs no source-code changes; the operator configures it to peer with the Gateway.',
        example:
          'Think of two groups using different radio channels and message labels. A Gateway listens on the selected CL channel, understands which topic a message belongs to, and submits the corresponding message to the mump2p node. In reverse it receives a mesh message and publishes it to a local CL topic.',
        exampleSteps: [
          'CL GossipSub topics carry the consensus messages the beacon node already exchanges.',
          'The Gateway maps those topics and payloads to its mump2p publishing interface.',
          'The embedded mump2p node exchanges with mesh peers.',
          'The receiving Gateway adapts the message back to its local CL gossip topics.',
        ],
        visualConcept:
          'Draw two separately labeled network clouds—“Ethereum CL GossipSub” and “Optimum mump2p mesh”—with a Gateway bridge between them. Do not draw the networks as one shared protocol or show the Gateway replacing either network.',
        technicalDetails: [
          'The Gateway integration guide says it listens to CL gossipsub traffic and republishes mesh traffic into the local CL network.',
          'The ADR identifies the topic mapping and message transformation as bridge responsibilities.',
          'The Gateway’s telemetry HTTP API and the optional application proxy in the development setup are separate services; neither is the CL-to-mump2p bridge.',
        ],
        sources: [
          {
            label: 'Gateway integration guide: purpose and topology',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Gateway architecture ADR-0001',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Optimum development setup',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
        ],
      },
      {
        title: 'Inside the architecture: clients, bridge, and mesh nodes',
        explanation:
          'The Gateway is not just a single socket. Its CL-facing libp2p host subscribes to consensus gossip topics and manages topic handles and subscriptions. A core service receives those messages and calls the embedded mump2p node to publish them. In the other direction, the core receives messages from that node and publishes them through local CL topic handles. The embedded mump2p node is a mesh participant; other gateways connect directly to mesh peers. Bootstrap supports peer discovery and cluster/fork information, but it does not carry every application message.',
        example:
          'A provider can configure more than one direct CL peer and its Gateway can have multiple mesh peers. In the diagram, Client A publishes while Client B is a separate CL-side participant; the Gateway’s embedded mump2p node connects to another mesh node. This is a teaching topology, not a required peer count.',
        exampleSteps: [
          'CL client A and CL client B are libp2p participants on the consensus network.',
          'The Gateway’s CL host receives topic messages from its CL-side peer connections.',
          'A bridge service calls the embedded mump2p node; that node communicates with its mesh peers.',
          'Bootstrap supplies discovery and registration support during startup rather than acting as a message relay.',
        ],
        visualConcept:
          'Separate a “CL gossip” area containing two client peers from an “Optimum mesh” area containing the Gateway’s embedded mump2p node and another mesh node. Put the bridge inside the Gateway outline. Draw Bootstrap as a dotted side-service arrow to startup/discovery, not on the message route.',
        technicalDetails: [
          'The ADR names the core gossipsub-gateway service, CL topic/subscription state, and embedded `mum_p2p.Node`.',
          'The integration guide says bootstrap provides peer discovery, registration, fork digest, and telemetry collection; gateways connect directly to other gateways over the mesh.',
          'The SECURITY.md peer configuration documents a list of `direct_cl_peers`; this does not establish a fixed maximum number of CL peers.',
        ],
        sources: [
          {
            label: 'Gateway architecture ADR-0001',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Gateway integration guide: current topology',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Gateway security model: CL peer configuration',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/SECURITY.md',
          },
        ],
      },
      {
        title: 'Publishing: from a CL client into the mump2p mesh',
        explanation:
          'For the outbound direction, Gateway subscribes to configured CL GossipSub topics and receives a CL message. The current README describes a fast XXHash fingerprint and a short-lived cache—about a minute—to suppress repeats. The bridge maps the topic and decodes the payload using the documented CL gossip mapping. Beacon blocks have slot-level validation and telemetry; eligible messages are passed to the embedded node’s `PublishMessage` interface. The mump2p node then handles its mesh-side protocol. These are separate jobs: the public Gateway sources do not say that the bridge itself performs RLNC encoding.',
        example:
          'Client A publishes a block on a CL gossip topic. The Gateway receives it once, records its fingerprint, maps and checks the payload, and asks its local mump2p node to publish the message. If the same CL message is observed again while its fingerprint remains cached, the Gateway can skip the duplicate path.',
        exampleSteps: [
          'The CL-facing libp2p host receives a message on a subscribed topic.',
          'The bridge fingerprints it and checks the short-lived duplicate cache.',
          'The bridge maps/decodes the CL topic payload and performs documented block checks where applicable.',
          'The bridge calls `PublishMessage` on its embedded mump2p node.',
          'Mesh dissemination occurs through the mump2p side; the Gateway’s documentation does not promise that every peer receives the message.',
        ],
        visualConcept:
          'Animate one labeled CL message moving from Client A → Gateway CL host → topic mapping/dedup core → embedded mump2p node. Show a faint duplicate copy stopping at the cache, and keep RLNC work inside the mump2p node/mesh boundary rather than attributing it to the Gateway bridge.',
        technicalDetails: [
          'The README describes a fast XXHash fingerprint and an approximately one-minute TTL cache; treat this as the documented implementation behavior, not a user-tuned guarantee.',
          'The ADR names `handleMessagesFromCL`, Prysm `GossipTopicMappings`, beacon-block slot validation, and `nodeMumP2P.PublishMessage`.',
          'Topic aggregation applies to configured high-volume non-block topics; blocks are handled on their distinct documented path.',
        ],
        sources: [
          {
            label: 'Gateway README: CL-to-mump2p message flow',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway architecture ADR-0001: message bridges',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
        ],
      },
      {
        title: 'Delivery: from the mesh back to CL gossip',
        explanation:
          'The reverse direction begins when the embedded mump2p node delivers a message to the Gateway. The bridge checks whether the message should be skipped as self-originated, maps it to a CL gossip topic, and publishes it on the local libp2p topic if that topic is subscribed. The README and ADR describe decode/re-encode for this reverse flow, but the reviewed Beacon Block implementation path does not establish that conversion as a required step. Do not generalize it to Beacon Block payloads.',
        example:
          'A remote mesh peer’s Gateway publishes a block through mump2p. The local Gateway receives the message, maps it to the corresponding CL gossip topic, and publishes it on that local topic. The beacon node processes it as consensus-layer gossip.',
        exampleSteps: [
          'The local embedded node receives a mump2p message.',
          'The bridge checks the configured self-message rule.',
          'The bridge maps the message type/topic to the corresponding local CL gossip topic.',
          'The Gateway publishes on the local CL topic when it is subscribed.',
          'CL peers receive the message through their gossip network; the Gateway does not replace their consensus processing.',
        ],
        visualConcept:
          'Animate the reverse path: remote mump2p peer → Gateway embedded node → bridge with a “topic map + local publication” card → Gateway CL host → Client B.',
        technicalDetails: [
          'The ADR and README describe a decode/re-encode reverse flow. In the reviewed Beacon Block implementation path, the message and topic are passed to local CL publication; that path does not establish a required SSZ conversion.',
          'The implementation evidence supports describing topic mapping and publication without claiming Beacon Block payloads are necessarily decoded and re-encoded.',
          'Do not infer that the Gateway applies RLNC to the returned payload.',
        ],
        sources: [
          {
            label: 'Gateway README: mump2p-to-CL message flow',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway architecture ADR-0001: reverse bridge',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Gateway Beacon Block reverse-path implementation (audited commit)',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/2b75d7c37b050db9f3012d12083e574f538dfa6d/pkg/service/gossipsub-gateway/messages_proxy.go#L99-L160',
          },
        ],
      },
      {
        title: 'How Gateway gossips—and what it does not mean',
        explanation:
          'A Gateway joins the CL client’s libp2p GossipSub environment as a peer, subscribes to selected topics, and publishes eligible bridged messages on local CL topics. Separately, its embedded mump2p node joins the Optimum mesh. The bridge connects those systems; it does not make them one protocol. In particular, the Gateway is not the optional REST/WebSocket proxy from Module 05, and the message bridge is not a consumer API. The repository documents an opt-in consumer block stream separately from the CL-to-mump2p path.',
        example:
          'If Client A gossips a CL message to the Gateway, the Gateway can submit it to mump2p. If another mesh peer sends a message back, the Gateway may publish it to local CL GossipSub. A separate application that wants the optional decoded block stream would use that separately configured stream interface, not treat it as the internal mesh bridge.',
        exampleSteps: [
          'CL GossipSub operates among CL-side peers and the Gateway’s CL-facing host.',
          'mump2p communication happens through the Gateway’s embedded node and mesh peers.',
          'The Gateway maps messages between those networks.',
          'Telemetry endpoints and the optional consumer stream are separate operational interfaces.',
        ],
        visualConcept:
          'Use two colored network bands connected by a Gateway bridge. Place the REST/WebSocket proxy outside both as a separate sample-development component, and draw telemetry/consumer endpoints as side interfaces rather than message-path arrows.',
        technicalDetails: [
          'The Gateway README calls the service a bridge between Ethereum CL gossip and the RLNC-enhanced mump2p mesh.',
          'The ADR says the current Gateway does not expose a consumer-facing gRPC service as part of the bridge; consumer WebSocket/gRPC streaming is a separately documented, opt-in feature in the current repository.',
          'Do not assume the Gateway’s REST telemetry API is the development setup’s application proxy.',
        ],
        sources: [
          {
            label: 'Gateway README: overview and APIs',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway architecture ADR-0001: HTTP and consumer APIs',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Optimum development setup',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
        ],
      },
      {
        title: 'Multiple clients, mesh peers, and aggregation',
        explanation:
          'The CL-facing side can have direct peer configuration, while the embedded mump2p node connects to gateway mesh peers. The guide shows peer discovery by chain and cluster, and the Gateway security documentation describes a list of direct CL peer IDs. For some high-volume non-block topics, the Gateway can batch multiple messages into a protobuf container and send it on a dedicated mump2p topic; the receiving Gateway unpacks the container and replays its messages toward CL. This is an optional/configured pipeline, not a claim that every message is aggregated.',
        example:
          'A Gateway may peer with its operator’s beacon node and other configured CL peers while also connecting to several mesh peers. If a configured high-volume non-block topic produces many messages, the aggregator can collect them into a batch. A beacon block follows its separate block path rather than being described as part of that non-block aggregation batch.',
        exampleSteps: [
          'Bootstrap returns peer addresses for the matching chain and cluster.',
          'The Gateway connects its mump2p host to available mesh participants.',
          'On the CL side, configured direct peers can include the operator’s intended client peers.',
          'When aggregation is enabled for eligible topics, the aggregator batches and later unpacks those messages.',
        ],
        visualConcept:
          'Show one Gateway connected to two CL-side clients and two mesh peers. Add a smaller side path for several non-block messages entering an aggregation box and leaving as one container; keep the beacon-block route unaggregated in this illustration.',
        technicalDetails: [
          'The ADR describes aggregation for high-volume topics other than beacon blocks, an emitter interface, periodic batching, and receiver-side unpacking.',
          'The sample configuration documents an aggregation interval; its example/default is not a universal tuning recommendation.',
          'The deployment guide says bootstrap returns peers associated with the same chain and cluster.',
        ],
        sources: [
          {
            label: 'Gateway architecture ADR-0001: aggregation pipeline',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Gateway integration guide: startup and peer setup',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Gateway sample configuration',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/config/sample.app_conf.yml',
          },
        ],
      },
      {
        title: 'Configuration: what the main settings control',
        explanation:
          'Gateway reads a YAML configuration and accepts environment-variable overrides. The sample file groups identity and listener settings, cluster and credential settings, telemetry, bootstrap, optional auth, diagnostics, and advanced behavior. A setting tells the process what to bind, which mesh/cluster to join, or which optional feature to enable; a sample value is not a production requirement. The repository currently documents alternative credential modes—legacy API key or organization join key—and says not to configure both at once.',
        example:
          'For a local test, an operator might copy the sample YAML, choose the documented credential mode supplied for the environment, provide persistent identity directories, and turn on telemetry. The port numbers and cluster names in that sample illustrate configuration; they are not universal addresses or a production checklist.',
        exampleSteps: [
          'Set the CL-facing and mump2p listener ports and persistent identity directories for the host.',
          'Choose the assigned cluster and one supported credential mode; environment variables override YAML values.',
          'Decide whether telemetry, remote push, consumer streaming, or diagnostics are needed in that deployment.',
          'Review `direct_cl_peers`, propagation, and aggregation settings against the documented behavior.',
          'Protect secrets and bind/firewall telemetry and diagnostic listeners according to the security guide.',
        ],
        visualConcept:
          'Present a configuration card split into “network identity and ports,” “enrollment/auth,” “telemetry/diagnostics,” and “optional behavior.” Tag each shown number as a sample/default and show an environment-variable override arrow into YAML configuration.',
        technicalDetails: [
          'The sample config documents `identity_libp2p_dir`, `identity_mump2p_dir`, CL and mump2p ports, cluster ID, credential mode, telemetry, bootstrap, diagnostics, aggregation, and propagation.',
          'The config comments state that environment variables override YAML and that API-key and join-key credential modes are alternatives.',
          'The `propagation_enabled` switch gates mump2p-to-CL forwarding of blocks and attestations; the ADR says CL-to-mump2p forwarding and arrival measurement are not gated by that switch.',
          'Sample values and defaults should be checked against the exact release and operator environment; they are not universal production requirements.',
        ],
        sources: [
          {
            label: 'Gateway sample configuration',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/config/sample.app_conf.yml',
          },
          {
            label: 'Gateway architecture ADR-0001: propagation switch',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Gateway README: configuration',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
        ],
      },
      {
        title: 'Deploying and operating a Gateway',
        explanation:
          'The repository documents both Docker and run-from-source workflows. Startup is more than launching a binary: the Gateway starts its CL-facing listener, resolves the chain fork digest through Bootstrap, registers its advertised mesh address, receives peer addresses for the configured chain and cluster, and joins the mesh. Then the operator points the CL client at the Gateway’s peer ID and reachable multiaddress and checks the health and peer information endpoints. Exact deployment choices depend on the release and the operator’s environment.',
        example:
          'An operator follows the repository’s Docker instructions, mounts the configuration and persistent identity directories, starts the Gateway, reads `/api/v1/self_info`, and configures the beacon node to use the returned Gateway multiaddress as a direct/trusted peer. They then inspect `/health` and the mump2p peer count to confirm the expected connections.',
        exampleSteps: [
          'Prepare the configuration, credential, and persistent identity storage.',
          'Run the documented container/Compose setup or build and run from source.',
          'Allow the CL client and mesh peers to reach the configured P2P listeners.',
          'Let Bootstrap provide fork/peer information and confirm the mesh connection.',
          'Configure the CL client with the Gateway peer information and verify health/self-info.',
        ],
        visualConcept:
          'Draw an operations timeline: config + persistent identities → Gateway process starts → Bootstrap discovery/registration → mesh peer connections → CL client configured as a peer → health and peer checks. Place Bootstrap above the flow as a control-plane support service, not in the message route.',
        technicalDetails: [
          'The integration guide lists the Gateway startup sequence and Docker/source execution paths.',
          'The README instructs operators to obtain `peer_id` and a reachable `libp2p.multiaddrs` entry from `/api/v1/self_info` for CL peer configuration.',
          'The guide documents `/health` and `/api/v1/self_info` checks; example commands do not guarantee a production-ready deployment.',
          'Persistent identity paths are shown in the sample configuration and container mounts.',
        ],
        sources: [
          {
            label: 'Gateway integration guide: startup, Docker, and CL client setup',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Gateway README: quick start and verification',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Optimum development setup',
            href: 'https://github.com/getoptimum/optimum-dev-setup-guide',
          },
        ],
      },
      {
        title: 'Monitoring, metrics, and troubleshooting',
        explanation:
          'The Gateway exposes different views for different questions. `/health` reports structured health including CL peers, mesh peers, subscribed topics, and last-block age. `/api/v1/self_info` reports peer IDs, multiaddresses, chain/fork information, peer counts, and version data. When telemetry is enabled, `/metrics` exposes Prometheus metrics; optional remote push and tracing settings provide additional diagnostics. Use the views together: a healthy HTTP endpoint does not by itself prove that a particular block reached a particular CL peer.',
        example:
          'If a block appears on the CL side but not at a remote peer, first verify the CL peer and subscribed topic, then inspect `/health` for CL/mesh connections and `/api/v1/self_info` for advertised addresses and peer counts. Check Gateway logs at an appropriate log level and the message/peer metrics. If traffic reaches the mesh but not the local CL side, verify reverse topic subscription, payload compatibility, and the propagation setting.',
        exampleSteps: [
          'Check `/health` for the expected CL peers, mump2p peers, subscribed topics, and block-age signal.',
          'Check `/api/v1/self_info` for peer IDs, reachable multiaddresses, chain, cluster-related peer counts, and build version.',
          'Check `/metrics` only when telemetry is enabled; compare message/peer metrics over time.',
          'Use configured trace flags selectively: mesh and shard tracing show protocol diagnostics; RPC tracing can be high-frequency.',
          'Follow both bridge directions rather than treating one endpoint or one publish event as end-to-end proof.',
        ],
        visualConcept:
          'Show a troubleshooting checklist split by boundary: CL peer/topic → Gateway bridge → mesh peers → reverse CL topic. Beside it, map `/health`, `/api/v1/self_info`, `/metrics`, log level, and optional trace flags to the questions each can answer.',
        technicalDetails: [
          'The README documents `/health`, `/api/v1/self_info`, and `/metrics`; `/metrics` is conditional on telemetry configuration.',
          'The sample config documents `trace_mesh`, `trace_shard`, `trace_rpc`, and `log_level`.',
          'The SECURITY.md listener inventory says telemetry endpoints are unauthenticated and telemetry binds all IPv4 interfaces by default unless configured otherwise.',
          'Metrics and health are indicators, not message-delivery receipts for every subscriber.',
        ],
        sources: [
          {
            label: 'Gateway README: APIs and metrics',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway sample configuration: diagnostics',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/config/sample.app_conf.yml',
          },
          {
            label: 'Gateway security model: listener inventory',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/SECURITY.md',
          },
        ],
      },
      {
        title: 'Limitations, security, and undocumented behavior',
        explanation:
          'Gateway is a critical path for both bridge directions: a process fault or an incompatible CL topic mapping can affect traffic on both sides. The ADR also notes coupling to Prysm gossip mappings and the shared nature of exported telemetry. The SECURITY.md threat model treats the local CL client, mump2p fleet, and Bootstrap/fork-digest sources as trust anchors. It warns that telemetry endpoints have no per-listener authentication and normally bind all IPv4 interfaces unless the operator restricts them. The repository recommends firewalling listeners and describes authentication controls, but no configuration removes every operational risk.',
        example:
          'A node may show “healthy” while the mesh peer count is zero, or a mesh message may arrive while the CL topic is not subscribed. Check each link and topic. Separately, exposing an unauthenticated telemetry port to an untrusted network is a deployment risk even if message forwarding works.',
        exampleSteps: [
          'Treat the Gateway as an important dependency because it bridges both directions.',
          'Verify the CL client, bootstrap source, cluster, and peer configuration that the Gateway trusts.',
          'Review listener binds and firewall rules, especially for telemetry and optional diagnostic services.',
          'Keep credentials private and use the repository’s documented authentication mode for the deployment.',
          'Do not infer universal delivery, latency, RLNC implementation details, or production-ready settings from a demo or sample configuration.',
        ],
        visualConcept:
          'Show the Gateway as a bridge with two red “failure boundary” markers, one on each side. Add a separate shield note for trust anchors and an unauthenticated telemetry port placed outside the data path. Label all items as documented risks/controls, not a full security audit.',
        technicalDetails: [
          'The ADR lists the single Gateway process as a critical path and notes possible CL-version coupling via Prysm topic mappings.',
          'The security guide describes peer trust, Bootstrap/fork-digest trust, authentication behavior, and listener exposure; it instructs operators to restrict listeners through network controls.',
          'The README lists an independent security audit, but an audit report is not a guarantee of security or absence of vulnerabilities.',
          'Public documentation does not establish a delivery guarantee, universal performance advantage, or every internal mump2p coding operation performed by the Gateway bridge.',
        ],
        sources: [
          {
            label: 'Gateway architecture ADR-0001: trade-offs',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Gateway security model and listener inventory',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/SECURITY.md',
          },
          {
            label: 'Gateway README: security and operational notes',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway sample configuration',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/config/sample.app_conf.yml',
          },
        ],
      },
    ],
  },
  beacon: {
    id: 'beacon',
    order: '07',
    navTitle: 'Beacon Node',
    title: 'Beacon Node Integration',
    category: 'ETHEREUM INTEGRATION',
    summary:
      'Follow the separate Validator Client API path and Beacon Node peer path to see where Optimum Gateway fits.',
    beginnerExplanation:
      'A Beacon Node is the Ethereum consensus-layer client in this setup. A Validator Client asks it for validator data and submits signed validator messages through the Beacon API. Separately, the Beacon Node is a libp2p peer of the Optimum Gateway. The Gateway bridges selected consensus gossip to and from its mump2p mesh. The Validator Client does not connect directly to the Gateway.',
    realWorldExample:
      'An operator runs a Beacon Node and Validator Client, then adds a Gateway alongside them. The Validator Client continues to use the Beacon Node’s API. The Beacon Node and Gateway peer over the consensus networking layer, so selected gossip can cross the Gateway into the Optimum mesh and messages arriving from that mesh can return to local consensus gossip.',
    howItWorks: [
      'The Beacon Node maintains and participates in Ethereum consensus-layer networking; in a full Ethereum node it also works with an Execution Client.',
      'The Validator Client uses the Beacon API to obtain information needed for duties and to submit signed results. It holds validator signing keys; the Beacon Node is not a replacement for the Validator Client.',
      'The operator configures a libp2p connection between the Beacon Node and the Optimum Gateway. Which side initiates that connection depends on the consensus client and its documented setup.',
      'The Gateway listens to selected consensus gossip topics and bridges eligible messages to its embedded mump2p node. It can publish messages received from mump2p back into local consensus gossip.',
      'The Gateway is an additional networking component. It does not take over validator duties, Beacon Chain state, or consensus validation.',
    ],
    whyItMatters:
      'This integration is easy to misread because both the Validator Client and Gateway sit beside the Beacon Node but serve different interfaces. Keeping the API link, the Beacon Node’s libp2p peers, and the Gateway’s separate mump2p mesh distinct makes configuration and debugging much easier.',
    terminologyNote:
      '“Beacon Node” is the Optimum documentation’s common term for an Ethereum consensus-layer client. “Validator Client” is a separate process that uses the Beacon API. The Gateway peers with the Beacon Node; it is not documented as a direct Validator Client peer.',
    keyTakeaways: [
      'Validator Client ↔ Beacon Node: Beacon API requests and signed validator submissions.',
      'Beacon Node ↔ Optimum Gateway: a consensus-layer libp2p peer connection; exact dialing setup varies by client.',
      'Optimum Gateway ↔ mump2p mesh: a separate network interface and message path.',
      'The Gateway bridges selected gossip; the Beacon Node remains responsible for consensus-client processing.',
      'Use health, identity, peer, and traffic information together; a single “connected” status does not prove end-to-end message delivery.',
    ],
    demoType: 'beacon',
    demoNote:
      'This educational simulation separates the Beacon API, the Beacon Node–Gateway libp2p connection, and the Gateway’s mump2p mesh link. It does not run Ethereum consensus, sign real attestations, or reproduce a specific client’s networking configuration.',
    sources: [
      {
        label: 'Optimum docs: what Optimum does',
        href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
      },
      {
        label: 'Optimum docs: connect your Gateway',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
      },
      {
        label: 'Optimum docs: run the Gateway',
        href: 'https://github.com/getoptimum/docs/blob/main/operate/run-the-gateway.md',
      },
      {
        label: 'Gateway README',
        href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
      },
      {
        label: 'Gateway client connection guide',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
      },
      {
        label: 'Ethereum Beacon API repository',
        href: 'https://github.com/ethereum/beacon-APIs',
      },
      {
        label: 'Ethereum Validator Client workflow',
        href: 'https://github.com/ethereum/beacon-APIs/blob/master/validator-flow.md',
      },
      {
        label: 'Ethereum nodes and clients',
        href: 'https://ethereum.org/en/developers/docs/nodes-and-clients/',
      },
    ],
    chapterSections: [
      {
        title: 'Start with the three roles',
        explanation:
          'A Beacon Node, Validator Client, and Optimum Gateway are separate pieces of software, even when one operator runs them on the same machine. The Beacon Node is the consensus-layer client: it keeps up with Beacon Chain information and participates in consensus networking. The Validator Client handles validator duties and signing. The Gateway is an additional peer that bridges selected consensus gossip with the Optimum mump2p mesh. It does not replace either Ethereum client.',
        example:
          'Imagine a validator operator adding Optimum to an existing Ethereum setup. The operator keeps the Beacon Node and Validator Client in place, then runs a Gateway beside them. The Validator Client still uses its Beacon Node; the Beacon Node is the component that peers with the Gateway.',
        exampleSteps: [
          'The Beacon Node participates in Ethereum consensus-layer networking and exposes its Beacon API.',
          'The Validator Client uses that API for validator work and submits signed results back to the Beacon Node.',
          'The Beacon Node also peers with the Gateway over libp2p.',
          'The Gateway joins the mump2p mesh using its separate mesh-side node.',
        ],
        visualConcept:
          'Draw Validator Client ↔ Beacon Node with a line labeled “Beacon API (HTTP)”. Separately draw Beacon Node ↔ Optimum Gateway with “consensus libp2p / selected gossip”, then Gateway ↔ mump2p mesh. Do not draw a Validator Client–Gateway connection.',
        technicalDetails: [
          'Ethereum documentation separates the consensus client from the Validator Client; the Validator Client uses the Beacon API for validator duties.',
          'Optimum’s integration guide places the Gateway beside the consensus client and describes the consensus client as its CL peer.',
          'A complete Ethereum node also has an Execution Client. It is omitted from this chapter’s main diagram because it is not the Gateway’s documented integration peer.',
        ],
        sources: [
          {
            label: 'Optimum docs: what Optimum does',
            href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
          },
          {
            label: 'Ethereum nodes and clients',
            href: 'https://ethereum.org/en/developers/docs/nodes-and-clients/',
          },
          {
            label: 'Ethereum Beacon API repository',
            href: 'https://github.com/ethereum/beacon-APIs',
          },
        ],
      },
      {
        title: 'Validator Client ↔ Beacon Node: the API path',
        explanation:
          'The Validator Client does not need to join the Beacon Node’s P2P mesh to do its work. It calls the Beacon API exposed by the Beacon Node. The API provides data and duties the client needs; the Validator Client uses its signing keys to produce validator messages and submits those signed results through the Beacon Node. In short, the Beacon Node supplies consensus-layer context and networking, while the Validator Client performs the validator-specific signing work.',
        example:
          'Before an attestation, a Validator Client asks its Beacon Node for the relevant duty information. It signs the attestation locally, then submits it to the Beacon Node. This is general Ethereum behavior, not an Optimum-specific API flow.',
        exampleSteps: [
          'The Validator Client requests the information it needs from the Beacon API.',
          'The Beacon Node responds with data available from its current consensus view.',
          'The Validator Client uses its validator key to sign the required result.',
          'The Validator Client submits that signed result to the Beacon Node, which handles it through its normal consensus-client networking.',
        ],
        visualConcept:
          'Show two labeled arrows between Validator Client and Beacon Node: “request duty/data” toward the node and “response” back, then “submit signed result” from client to node. Put the signing-key icon inside the Validator Client, not the Beacon Node.',
        technicalDetails: [
          'The Ethereum Beacon API describes the API boundary between a consensus client and Validator Client; validator keys are used by the Validator Client rather than conceptually held by the Beacon Node.',
          'The official validator-flow document describes retrieving duties/data and submitting signed blocks, attestations, and related validator messages through Beacon API endpoints.',
          'Exact endpoint calls and timing depend on the validator task and client implementation; the lesson’s example is a simplified workflow, not an API recipe.',
        ],
        sources: [
          {
            label: 'Ethereum Beacon API repository',
            href: 'https://github.com/ethereum/beacon-APIs',
          },
          {
            label: 'Ethereum Validator Client workflow',
            href: 'https://github.com/ethereum/beacon-APIs/blob/master/validator-flow.md',
          },
        ],
      },
      {
        title: 'Beacon Node ↔ Gateway: a separate peer connection',
        explanation:
          'For Optimum, the Beacon Node’s consensus-layer networking connects to the Gateway’s libp2p host. The Gateway subscribes to selected consensus gossip topics and has an embedded mump2p node for its mesh connection. These are two different links: the Beacon Node speaks on its Ethereum consensus network, while the embedded node speaks on the Optimum mesh. The Validator Client is not documented as directly dialing the Gateway.',
        example:
          'The Beacon Node has its ordinary Ethereum peers and an additional peer relationship with the operator’s Gateway. When the Gateway receives an eligible message from a subscribed local topic, its bridge can pass that message to the mump2p side.',
        exampleSteps: [
          'The operator learns the Gateway peer identity and a usable address from the Gateway’s documented self-information endpoint.',
          'The operator configures the consensus client and Gateway peer settings according to that client’s current connection guide.',
          'The Beacon Node and Gateway establish a CL-facing libp2p peer connection.',
          'The Gateway’s embedded mump2p node separately connects to mesh peers.',
        ],
        visualConcept:
          'Place an “Ethereum consensus network” band containing the Beacon Node and its other CL peers. Show the Gateway at the edge with one CL-facing libp2p host attached to that band and one embedded mump2p node attached to a second “Optimum mesh” band.',
        technicalDetails: [
          'The Gateway guide documents a CL-facing libp2p host, subscriptions to selected consensus topics, and an embedded mump2p node.',
          'The Gateway’s peer identity is not the Beacon Node’s peer identity. The docs also distinguish CL peers from mump2p mesh peers.',
          'Whether the Beacon Node dials the Gateway or the Gateway dials the Beacon Node is consensus-client dependent; follow the current client-specific guide.',
        ],
        sources: [
          {
            label: 'Optimum docs: connect your Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
          },
          {
            label: 'Gateway client connection guide',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
          {
            label: 'Gateway architecture guide',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
        ],
      },
      {
        title: 'Outbound flow: Beacon Node gossip toward the mesh',
        explanation:
          'When a relevant consensus message is available on the Beacon Node’s gossip network, the Gateway can receive it on a topic it has subscribed to. The Gateway maps the consensus topic and message into its mump2p interface, and the embedded node participates in mesh propagation. The Gateway bridge is not a Validator Client and does not sign validator messages. Nor should its bridge be assumed to perform RLNC encoding: the Gateway sources document a handoff to the mump2p node, not an RLNC implementation inside the bridge.',
        example:
          'A Validator Client submits a signed consensus message to its Beacon Node. The Beacon Node handles it through its consensus networking. If that message is on a topic the Gateway is subscribed to and is eligible for bridging, the Gateway can pass it to the mump2p side. This illustration does not model validation or guarantee that every submitted message is bridged.',
        exampleSteps: [
          'A signed validator result enters the Beacon Node through the Beacon API, or the Beacon Node receives consensus gossip from a peer.',
          'The Beacon Node handles consensus networking and gossips relevant messages to its peers.',
          'The Gateway receives messages only for topics it subscribes to and can bridge.',
          'The Gateway maps the message and calls its embedded mump2p node; mesh propagation is handled on that side.',
        ],
        visualConcept:
          'Use a distinct API arrow for the Validator Client submission, then a different libp2p gossip arrow from Beacon Node to Gateway, and finally a green mesh arrow from the Gateway’s embedded node to other mesh peers.',
        technicalDetails: [
          'Optimum documents the Gateway as subscribing to selected consensus gossip topics and passing eligible messages to mump2p.',
          'Gateway code handles the documented topic/payload mapping; the repository does not establish that the bridge performs RLNC encoding.',
          'Submission to a Beacon Node, local gossip publication, Gateway receipt, and remote subscriber delivery are separate events; none alone proves the next step succeeded.',
        ],
        sources: [
          {
            label: 'Gateway README: architecture and message flow',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway architecture guide',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/guide.md',
          },
          {
            label: 'Ethereum Validator Client workflow',
            href: 'https://github.com/ethereum/beacon-APIs/blob/master/validator-flow.md',
          },
        ],
      },
      {
        title: 'Reverse flow: mesh message back to consensus gossip',
        explanation:
          'A message that reaches the Gateway from mump2p is handed to its consensus-facing bridge. The Gateway maps the message to a local consensus gossip topic and publishes it through its CL-facing libp2p host. The Beacon Node then processes that incoming message as part of its ordinary consensus-client workflow. If the Beacon Node’s view changes, the Validator Client can request relevant information through the Beacon API; it still does not receive messages directly from the Gateway.',
        example:
          'A message travels through the Optimum mesh to a Gateway. That Gateway publishes the mapped consensus message to its local CL peers, including the Beacon Node when connected. The Beacon Node processes it, and the Validator Client later asks the Beacon Node for relevant data using the API.',
        exampleSteps: [
          'The Gateway’s embedded mump2p node delivers a message to the Gateway bridge.',
          'The bridge maps the message to its consensus topic and expected message representation.',
          'The Gateway publishes the message on its local CL gossip topic.',
          'The Beacon Node handles the received message; the Validator Client continues to use the Beacon API for its own data needs.',
        ],
        visualConcept:
          'Animate the reverse path from mump2p peers → Gateway embedded node → Gateway CL host → Beacon Node. After the Beacon Node, draw a separate dashed “API query when needed” arrow to the Validator Client instead of a direct Gateway-to-validator arrow.',
        technicalDetails: [
          'The Gateway repository documents the reverse bridge from mump2p messages to local CL topics. Its general decode/re-encode description is not established for the reviewed Beacon Block implementation path.',
          'Consensus-client processing is not replaced by Gateway forwarding; message acceptance and resulting state are determined by the Beacon Node.',
          'This diagram simplifies topic-specific behavior. It does not claim that every mesh message is a valid Ethereum consensus message or will be accepted by a Beacon Node.',
        ],
        sources: [
          {
            label: 'Gateway README: mump2p-to-CL message flow',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Gateway architecture ADR-0001',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/docs/adr/0001-gateway-architecture.md',
          },
          {
            label: 'Gateway Beacon Block reverse-path implementation (audited commit)',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/2b75d7c37b050db9f3012d12083e574f538dfa6d/pkg/service/gossipsub-gateway/messages_proxy.go#L99-L160',
          },
          {
            label: 'Ethereum Beacon API repository',
            href: 'https://github.com/ethereum/beacon-APIs',
          },
        ],
      },
      {
        title: 'Connection setup: identities, addresses, and client differences',
        explanation:
          'A peer ID identifies a libp2p peer; a multiaddress tells another peer how to reach it. They are easy to mix up because the Beacon Node and Gateway each have their own identity, and the Gateway’s mump2p side has a separate peer list. Current Optimum instructions tell operators to obtain Gateway peer information from the Gateway and then use the specific connection procedure for their Beacon Node client. Connection direction and reconnect behavior differ across clients, so do not copy one client’s flags to another.',
        example:
          'Suppose an operator sees `gateway-peer-id` and `beacon-peer-id`. The Beacon Node’s peer configuration needs the Gateway’s identity/address when the client dials the Gateway. The Gateway’s `direct_cl_peers` setting, when used, instead identifies the Beacon Node. Those values are not interchangeable, and neither is a mump2p peer ID.',
        exampleSteps: [
          'Read the Gateway’s current peer information from its documented self-info endpoint.',
          'Choose a multiaddress reachable from the Beacon Node; a container-only or private address may not be usable from the host.',
          'Use the current Optimum page for the exact Beacon Node client and version to decide which side dials.',
          'If configuring Gateway-side direct CL peers, use the Beacon Node’s peer identity/address as documented, not the Gateway’s own identity.',
          'Persist Gateway identity data across restarts so its peer ID does not unexpectedly change.',
        ],
        visualConcept:
          'Show separate identity badges: Gateway CL peer ID, Beacon Node peer ID, and Gateway mump2p peer ID. Place each next to its own interface and use arrows labeled “dial target” and “direct CL peer” to show why the values are not interchangeable.',
        technicalDetails: [
          'The Gateway self-info endpoint is `/api/v1/self_info`; use an address the other process can actually route to.',
          'When `direct_cl_peers` is non-empty, the documented Gateway behavior includes dialing those peers and filtering CL peers against the list; an empty list has different behavior.',
          'The current troubleshooting guidance discusses TCP 33212 and 33213, but listener values and client flags are release/configuration dependent. Treat them as documented defaults/examples, not universal deployment requirements.',
        ],
        sources: [
          {
            label: 'Optimum docs: connect your Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
          },
          {
            label: 'Gateway client connection guide',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
          {
            label: 'Gateway troubleshooting',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/troubleshoot',
          },
          {
            label: 'Gateway README: self-info API',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
        ],
      },
      {
        title: 'A careful startup and verification sequence',
        explanation:
          'A reliable setup starts by preserving identities, then configuring the actual peer relationship, and finally checking both connection state and message activity. The Gateway’s identity can change if its identity volumes are not persisted. A Beacon Node that peers with the Gateway is necessary for that local link, but it does not by itself prove the Gateway is joined to the mesh or that messages are crossing both directions.',
        example:
          'For a first deployment, an operator starts the Gateway, reads its published peer information, selects an address reachable from the Beacon Node, configures the client-specific connection, and checks health after the peer connection comes up. The operator then separately checks mesh connectivity and topic/traffic indicators.',
        exampleSteps: [
          'Persist the Gateway’s documented identity data and start it with the intended network configuration.',
          'Read `/api/v1/self_info` and choose the Gateway address reachable from the Beacon Node.',
          'Configure the Beacon Node/Gateway peering using the guide for that consensus client.',
          'Check `/health` after startup and inspect peer and topic state; an early degraded response can occur before the CL peer connects.',
          'Confirm mesh peers and traffic separately; investigate the Beacon Node’s own sync and execution-client state if consensus activity is stale.',
        ],
        visualConcept:
          'Show a five-step deployment strip: persist identity → start Gateway → identify reachable address → configure CL peering → verify CL + mesh + traffic. Put a small note under the checks: “peer connected ≠ end-to-end delivery”.',
        technicalDetails: [
          'The Gateway documents `/health` and `/api/v1/self_info`; `/metrics` depends on telemetry being enabled.',
          'The health response can be degraded before the local CL peer has connected; use the documented checks and startup context rather than treating every initial 503 as a permanent failure.',
          'A connected CL peer with stale block-age/health data can point to an unsynced or silent consensus/execution setup; peer count alone does not establish block flow.',
        ],
        sources: [
          {
            label: 'Optimum docs: run the Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/operate/run-the-gateway.md',
          },
          {
            label: 'Optimum docs: when the check fails',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
          },
          {
            label: 'Gateway telemetry and health checks',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/telemetry',
          },
          {
            label: 'Gateway troubleshooting',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/troubleshoot',
          },
        ],
      },
      {
        title: 'Troubleshooting by boundary',
        explanation:
          'When something appears broken, check one boundary at a time. If the Validator Client cannot get duties or submit results, start with the Beacon Node API and its own sync state. If the Beacon Node has no Gateway peer, check the two peer IDs, reachable multiaddress, client-specific dial direction, allowlist, and firewall. If the CL peer exists but no mesh traffic appears, look at Gateway health, mesh peers, subscribed topics, and traffic metrics. Each check narrows the problem; none alone proves that an end-to-end subscriber received a message.',
        example:
          'An operator sees one CL peer but the reported block age is stale. That tells them the network connection exists, not that useful, current consensus data is flowing. They should inspect Beacon Node sync/Execution Client health and Gateway topic/traffic checks instead of changing peer IDs at random.',
        exampleSteps: [
          'For Beacon API errors, verify that the Validator Client is using the intended Beacon Node endpoint and that the Beacon Node is healthy.',
          'For zero CL peers, compare Gateway and Beacon Node peer IDs, check the reachable address and configured dialing direction, and inspect any `direct_cl_peers` filtering.',
          'For an identity mismatch after restart, verify that Gateway identity volumes persisted and update peer configuration only if the identity genuinely changed.',
          'For a connected peer but no recent data, check Beacon Node and Execution Client sync state, Gateway subscribed topics, and Gateway traffic/health details.',
          'Use Gateway JSON logs and enabled metrics to follow the failing boundary; do not treat a health response or publish event as a receipt from a remote validator.',
        ],
        visualConcept:
          'Create three stacked diagnostic lanes: Validator Client ↔ Beacon API; Beacon Node ↔ Gateway CL peer; Gateway ↔ mump2p mesh. Put symptom cards under each lane and a final cross-lane check for topic and message traffic.',
        technicalDetails: [
          'The Optimum troubleshooting pages cover wrong peer IDs/addresses, direct peer configuration, listener reachability, identity persistence, health checks, and startup behavior.',
          'The Gateway exposes health and self-info views; metrics require telemetry configuration and should be interpreted according to their documented labels.',
          'The public documentation does not define one universal error code, port configuration, restart policy, or recovery behavior for every consensus-client release.',
        ],
        sources: [
          {
            label: 'Optimum docs: when the check fails',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
          },
          {
            label: 'Gateway troubleshooting',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/troubleshoot',
          },
          {
            label: 'Gateway client connection guide',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
          {
            label: 'Gateway telemetry',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/telemetry',
          },
        ],
      },
      {
        title: 'Documented boundaries and open questions',
        explanation:
          'The public sources establish the broad integration: a Validator Client uses a Beacon Node API; a consensus client peers with Gateway; Gateway bridges selected consensus gossip and mump2p. They do not establish that every consensus message is forwarded, that the Gateway validates consensus messages on the Beacon Node’s behalf, or that Optimum delivery guarantees validator inclusion or a particular speed. Configuration details are client- and release-dependent. Treat the demo and diagrams as teaching models, not as protocol specifications or deployment instructions.',
        example:
          'If a block appears in a Gateway log, that is evidence about the Gateway’s local observation. It is not proof that a validator received it, that a Beacon Node accepted it, or that it was included in a canonical chain. Those outcomes belong to later consensus processing and require their own evidence.',
        exampleSteps: [
          'Use official client-specific instructions for exact flags and version compatibility.',
          'Keep Validator Client API traffic separate from Beacon Node–Gateway P2P traffic.',
          'Distinguish a message being submitted, gossiped, observed by Gateway, forwarded into mump2p, and processed by another Beacon Node.',
          'When a behavior is not described in the official sources, record it as unknown rather than assuming it from the diagram.',
        ],
        visualConcept:
          'Show the message path as separate labeled checkpoints with small “not proof of next step” gaps between them. Add a distinct “unverified here” note for delivery guarantees, automatic recovery, and undocumented implementation details.',
        technicalDetails: [
          'Optimum docs identify the Gateway and its message bridge, but public sources do not promise validator inclusion, universal delivery, or fixed performance.',
          'The Ethereum Beacon API workflow is general Ethereum behavior; it is not an Optimum extension to the Validator Client API.',
          'Exact peer direction, listener settings, subscriptions, and recovery behavior can vary with Gateway and consensus-client versions.',
        ],
        sources: [
          {
            label: 'Optimum docs: what Optimum does',
            href: 'https://github.com/getoptimum/docs/blob/main/start/what-optimum-does.md',
          },
          {
            label: 'Gateway README',
            href: 'https://github.com/getoptimum/optimum-gateway/blob/main/README.md',
          },
          {
            label: 'Ethereum Beacon API repository',
            href: 'https://github.com/ethereum/beacon-APIs',
          },
          {
            label: 'Gateway client connection guide',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
        ],
      },
    ],
  },
  signal: {
    id: 'signal',
    order: '08',
    navTitle: 'Signal',
    title: 'Signal: Gateway Connectivity & Network Discovery',
    category: 'GATEWAY CONNECTIVITY',
    summary:
      'Learn how Signal Console helps operators set up a Gateway, use Verify to check what Optimum can see, and diagnose the separate local peer connection.',
    beginnerExplanation:
      'Signal is Optimum’s broader Gateway and networking offering: an operator-run Gateway joins the Optimum mesh and, for validator operators, peers with a Beacon Node. Signal Console guides setup and provides reporting; Signal Verify checks Gateway enrollment, recent visibility, and blocks arriving at the mesh. Verify cannot tell whether the Beacon Node is peered; check that locally on the Gateway host.',
    realWorldExample:
      'An operator uses Signal Console to create an enrollment key and follow the setup for a uniquely named Gateway, then connects the Beacon Node to it. The operator runs Signal Verify and separately inspects the Gateway’s local health view. If Verify sees the Gateway but the local CL peer count is zero, the external check has not proved that the Beacon Node link works.',
    howItWorks: [
      'Signal Console guides an operator through naming a Gateway, starting it with an enrollment key, pointing a consensus client at it, and verifying the connection.',
      'On first start, the Gateway creates its own identity, enrolls with Optimum, and stores the credential it receives. Later starts use that credential; the enrollment key is for admitting a Gateway.',
      'The Beacon Node connects to the Gateway over the consensus-layer P2P interface. The Gateway separately connects to Optimum mesh peers.',
      'Signal Verify looks at enrollment, recent reports, and blocks arriving at the mesh across the organization’s Gateways.',
      'The local `/health` endpoint answers a different question: it includes local peer checks such as `cl_peers`. Signal Verify cannot see whether the Beacon Node has peered.',
    ],
    whyItMatters:
      '“Gateway enrolled,” “Gateway seen,” “Beacon Node peered,” and “blocks arriving at the mesh” describe different facts. Signal Console and Verify provide operator setup and remote visibility, but good troubleshooting depends on matching each symptom to the right boundary instead of treating one green status as proof that the whole path works.',
    terminologyNote:
      'In this chapter, “Signal” means Optimum’s broader Gateway and networking offering. “Signal Console” is the operator interface for setup and reporting; “Signal Verify” is its external connectivity check. The Gateway process is the P2P participant on the Beacon Node-to-mesh path; the Console and Verify check are not additional network hops or message relays.',
    keyTakeaways: [
      'Signal includes the Gateway/networking offering; Signal Console guides enrollment and Signal Verify shows checks based on what Optimum sees.',
      'A Gateway’s enrollment key is not its long-term peer identity; the Gateway creates and persists its own identity and credential.',
      'The data path is Beacon Node ↔ Gateway ↔ Optimum mesh. Signal Console and Verify describe the operator interface and checks, not an additional hop.',
      'Signal Verify cannot see the Beacon Node’s local peer connection; inspect local `/health` on the Gateway host.',
      '“Could not check” means the lookup did not answer, not that the Gateway is down.',
    ],
    demoType: 'signal',
    demoNote:
      'This is a one-Gateway teaching simulation of enrollment, peer links, mesh block arrival, Signal Verify, and local health cues. It is not connected to Signal Console or a live Optimum network, and its simplified checks are not a reproduction of production health logic.',
    sources: [
      {
        label: 'Optimum Signal: what Signal does',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/what-signal-does.md',
      },
      {
        label: 'Optimum Signal: connect your Gateway',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
      },
      {
        label: 'Optimum Signal: network ports',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/network.md',
      },
      {
        label: 'Optimum Signal: when the check fails',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
      },
      {
        label: 'Optimum Signal: first report and metric requirements',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/your-first-report.md',
      },
      {
        label: 'Optimum Signal: bulk Gateway onboarding',
        href: 'https://github.com/getoptimum/docs/blob/main/signal/onboard-in-bulk.md',
      },
      {
        label: 'Gateway network requirements',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/network-requirements',
      },
    ],
    chapterSections: [
      {
        title: 'Signal includes the Gateway path and Console workflow',
        explanation:
          'Optimum uses Signal for its broader Gateway and networking offering. The Gateway process is the P2P participant that joins the mesh and peers with the consensus client; Signal Console guides setup and provides Verify and reporting screens. The Console screen itself is not a message relay. Signal’s product description says the mesh can carry a block before public gossip; treat that as the intended benefit, not a promise that every block arrives sooner.',
        example:
          'An operator opens Signal Console, follows the setup steps, and starts a Gateway beside a Beacon Node. The Beacon Node and Gateway communicate over their P2P connection, and the Gateway joins the mesh. Signal Verify then helps the operator inspect whether Optimum has seen the Gateway and whether blocks are reaching the mesh.',
        exampleSteps: [
          'Signal Console provides the setup steps and enrollment material for a Gateway.',
          'The operator runs the Gateway process on a host.',
          'The Beacon Node peers with that Gateway; the Gateway connects to mesh peers.',
          'The operator uses Signal Verify to check what Optimum can observe, and local Gateway health to inspect the peer link.',
        ],
        visualConcept:
          'Draw the Beacon Node ↔ Gateway ↔ Optimum mesh as the solid message path. Above it, draw Signal Console as a separate dashed operator/control and check plane. Do not put the Console between the Beacon Node and mesh.',
        technicalDetails: [
          'The Signal pages call the setup steps Connect, Register keys, and Measure; a stream-only Gateway has a different flow and does not use a Beacon Node.',
          'Signal Console and its Verify check can be switched on or off by Optimum for accounts. When unavailable, a direct URL does not bypass that setting.',
          'The Console screens and Verify check are not a new P2P protocol or a message relay; the Gateway process handles the documented network path.',
        ],
        sources: [
          {
            label: 'Optimum Signal: what Signal does',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/what-signal-does.md',
          },
          {
            label: 'Optimum Signal: connect your Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
          },
        ],
      },
      {
        title: 'How a Gateway enrolls and joins',
        explanation:
          'The operator creates an enrollment key in Signal Console and gives it to the Gateway through the generated setup. On first start, the Gateway creates its own keypair, enrolls with Optimum, and stores the credential it receives in its identity directory. Once enrolled, it uses that credential on later starts; the enrollment key admits new Gateways rather than acting as the Gateway’s continuing peer identity. Each host needs its own Gateway name. The selected network and cluster are tied to the enrollment material and Signal Console setup, so do not substitute a value from another environment.',
        example:
          'For a small deployment, an operator creates a key for the intended network, names one Gateway, and starts the Signal Console-provided command on that host. For another host, the operator chooses a different name. Each Gateway creates and keeps its own identity, then peers with its nearby Beacon Node and the Optimum mesh.',
        exampleSteps: [
          'Create or select an enrollment key for the intended network in Signal Console’s Gateway key area.',
          'Give this host a unique Gateway name; Signal Console includes the name and cluster context in its setup.',
          'Start the Gateway with the key. On its first start it creates a peer identity and enrolls with Optimum.',
          'Keep the Gateway identity directories so a restart reuses the enrolled identity and credential.',
          'Connect the Beacon Node to the Gateway using the client-specific instructions; the Gateway’s mesh connection is separate.',
        ],
        visualConcept:
          'Show the one-time enrollment key entering the Gateway only at first enrollment. Then show the Gateway’s own persistent identity/credential on subsequent starts, with separate outgoing links to the Beacon Node and mesh.',
        technicalDetails: [
          'The official pages name `OPT_JOIN_KEY`, `OPT_GATEWAY_ID`, and `OPT_GATEWAY_CLUSTER_ID`; Signal Console generates the environment-appropriate command. This chapter intentionally does not provide a copied deployment command.',
          'The Gateway generates its own keypair and credential on first enrollment. The documentation identifies `$HOME/optimum-gateway/libp2p` and `$HOME/optimum-gateway/mump2p` as identity directories to preserve.',
          'The docs describe a stream-only mode for consumers without a Beacon Node; that Gateway does not listen on the consensus-client port.',
        ],
        sources: [
          {
            label: 'Optimum Signal: why enrollment keys',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/what-signal-does.md#why-enrollment-keys',
          },
          {
            label: 'Optimum Signal: connect your Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
          },
          {
            label: 'Optimum Signal: bulk Gateway onboarding',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/onboard-in-bulk.md',
          },
        ],
      },
      {
        title: 'Separate the block path from the support path',
        explanation:
          'There are two related but different paths. The block path runs from consensus-layer gossip at the Beacon Node, through the Gateway, and into or out of the Optimum mesh. The operator path includes Signal Console’s setup instructions and Signal Verify checks, plus Gateway access to Optimum’s enrollment, bootstrap, and telemetry services. Those services help a Gateway enroll, join the mesh, and report; they are not described as relaying every block between Beacon Nodes.',
        example:
          'A Gateway can be enrolled and recently seen by Optimum while its Beacon Node is not connected. Signal Verify may show the Gateway’s remote status, but the operator still needs a local check to see `cl_peers`. Conversely, a local peer connection does not by itself prove that blocks have reached the wider mesh.',
        exampleSteps: [
          'Signal Console gives the operator the setup for a Gateway.',
          'The running Gateway reaches the documented Optimum services and joins mesh peers.',
          'The Beacon Node connects separately to the Gateway’s consensus-facing interface.',
          'Signal Verify checks Optimum-side observations; `/health` reports local Gateway checks.',
        ],
        visualConcept:
          'Use a solid cyan lane for Beacon Node ↔ Gateway ↔ Optimum mesh. Put Signal Console and Optimum enrollment/bootstrap/telemetry services in a dashed violet lane above it. Draw no block arrow through Signal Console.',
        technicalDetails: [
          'The connect guide says auth and bootstrap are built in to the production command and documents telemetry/remote-push settings; the network guide points to the full egress requirements.',
          'The Network page identifies the Gateway-facing CL listener, mesh listener, and loopback-only health/metrics/self-info listener.',
          'The pages do not describe Signal Console as a user-visible full mesh topology map or as the data path for block payloads.',
        ],
        sources: [
          {
            label: 'Optimum Signal: connect your Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
          },
          {
            label: 'Optimum Signal: network ports',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/network.md',
          },
          {
            label: 'Gateway network requirements',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/network-requirements',
          },
        ],
      },
      {
        title: 'What Signal Verify checks',
        explanation:
          'Signal Verify looks at three facts from outside the operator’s host, across the organization’s Gateways. “Gateway enrolled” means at least one Gateway has connected to Optimum for the account. “Seen by Optimum” means it reported recently—the docs use a ten-minute window. “Blocks arriving” means blocks from a Gateway reached the mesh in recent slots. In a multi-Gateway organization, a row passes when any Gateway passes it; an organization-level result may count Gateways without identifying which host is responsible.',
        example:
          'A team has three Gateways. Signal Verify may report that three are enrolled and that blocks are arriving from some Gateway in recent slots. That is useful fleet-level evidence, but it does not prove that every host is healthy or that a specific Beacon Node is peered. The team checks each host locally when it needs per-Gateway details.',
        exampleSteps: [
          '“Gateway enrolled” checks whether a Gateway connected to Optimum for the account.',
          '“Seen by Optimum” checks whether a Gateway reported within the recent window.',
          '“Blocks arriving” checks whether blocks reached the mesh in recent slots.',
          'For a fleet result, inspect each host locally if the result does not name which Gateway passed.',
        ],
        visualConcept:
          'Show three Signal Verify rows—Enrolled, Seen recently, Blocks arriving—feeding from Optimum-side observations. Add a bracket marked “organization-wide / any Gateway may satisfy a row” and a separate local `cl_peers` panel.',
        technicalDetails: [
          'The documented Verify check reads Gateway enrolled state, recent report time, and recent block arrival; the pages give an example such as “4 of 5 slots.”',
          'The Gateway “Active” pill reflects recent Gateway visibility. The home also presents online-Gateway and validator-related information where enabled.',
          'Signal Verify cannot see whether the consensus client is peered with the Gateway; the docs direct operators to local `/health` for that.',
        ],
        sources: [
          {
            label: 'Optimum Signal: when the check fails',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
          },
          {
            label: 'Optimum Signal: what Signal does',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/what-signal-does.md',
          },
          {
            label: 'Optimum Signal: bulk Gateway onboarding',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/onboard-in-bulk.md',
          },
        ],
      },
      {
        title: 'Network boundaries and the three ports',
        explanation:
          'The current Signal Network page lists three Gateway ports for a validator Gateway: TCP 33212 is the consensus client’s peer connection, TCP 33213 is for Optimum mesh peers, and TCP 48123 serves health, metrics, and self-info on loopback only. These are documented current settings, not a promise that every deployment must use identical host/network wiring. The Gateway also needs outbound access to Optimum’s authentication/bootstrap services and mesh peers. Use the current network-requirements page for the full firewall list instead of guessing at additional ports.',
        example:
          'A Beacon Node cannot reach the Gateway because the peer port is not reachable; at the same time, a remote operator cannot open the health endpoint. Those symptoms are not contradictory: the peer port is intended for the CL connection, while the health port is deliberately bound to the Gateway host’s loopback address.',
        exampleSteps: [
          'For a validator Gateway, make the documented CL peer port reachable from the Beacon Node.',
          'Allow the mesh listener to be reached by Optimum peers and allow the Gateway’s documented outbound connections.',
          'Run health and self-info checks on the Gateway host; do not expose the loopback-only telemetry port publicly.',
          'Use Signal Verify for the Optimum-side enrollment/report/block checks.',
        ],
        visualConcept:
          'Label the Gateway’s CL port (33212/tcp) toward the Beacon Node, mesh port (33213/tcp) toward peer Gateways, and 48123/tcp as a localhost-only side panel. Show outbound service/mesh access as arrows leaving the Gateway.',
        technicalDetails: [
          'The Signal Network page lists 33212/tcp for validator Gateways, 33213/tcp for the mesh, and 48123/tcp bound to 127.0.0.1 for health, metrics, and self-info.',
          'The Signal failure guide says a not-seen Gateway should be checked for outbound 443; a Gateway seen but not delivering blocks should be checked for inbound 33212 and 33213.',
          'A stream-only Gateway does not publish 33212. The complete outbound and firewall requirements live in the Gateway network-requirements guide.',
        ],
        sources: [
          {
            label: 'Optimum Signal: network ports',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/network.md',
          },
          {
            label: 'Optimum Signal: when the check fails',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
          },
          {
            label: 'Gateway network requirements',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/network-requirements',
          },
        ],
      },
      {
        title: 'Read failures by asking the right question',
        explanation:
          'A failed check is a clue about a boundary, not a complete diagnosis. If no Gateway is enrolled, check the enrollment key and Console-provided start steps. If a Gateway is enrolled but has not been seen recently, check that its container is running and that outbound access is available. If it is seen but blocks are not arriving, check the two P2P paths and the Beacon Node connection. If Signal Verify says “Could not check,” the lookup did not answer; rerun it rather than treating that wording as proof that the Gateway is down.',
        example:
          'Suppose Signal Verify says “Seen by Optimum” but “Blocks arriving” fails. The Gateway is reporting, so start with the block path: verify the Beacon Node peer and the Gateway’s mesh reachability. If local `/health` shows `cl_peers` at zero, correct the client’s Gateway peer configuration. If the Gateway identity changed after a restart, read self-info again and preserve the identity directories.',
        exampleSteps: [
          'Not enrolled: create an enrollment key and run the current Console-provided Gateway setup.',
          'Not seen: check that the container is running and outbound access (including the documented 443 check) is available.',
          'Blocks not arriving: check inbound 33212 and 33213, the local peer state, and mesh state.',
          'CL peer count is zero: compare the Beacon Node’s client configuration with the Gateway’s current peer information; use the client-specific guide.',
          'Peer ID changed: preserve the Gateway identity directories so restarts do not create a new identity.',
          'Permission denied on identity data: on SELinux hosts, follow the documented identity-mount relabel guidance.',
        ],
        visualConcept:
          'Use a decision tree: Enrolled? → Seen recently? → Blocks arriving? Then branch into Console enrollment, outbound reachability, inbound CL/mesh ports, or local `cl_peers`. Put “Could not check → rerun; not a down verdict” in a separate branch.',
        technicalDetails: [
          'A 503 from local `/health` immediately after startup, while `cl_peers` is failing, is expected until the consensus client peers; the mesh checks may wait for the first block.',
          'Client peer flags and retry behavior vary. The docs describe `OPT_DIRECT_CL_PEERS` behavior for specific clients; use current client instructions rather than copying one client’s setup.',
          'If a Gateway peer ID changes, the troubleshooting guide points to missing `$HOME/optimum-gateway/libp2p` and `mump2p` identity mounts. The health endpoint is refused from machines other than the Gateway host by design.',
        ],
        sources: [
          {
            label: 'Optimum Signal: when the check fails',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
          },
          {
            label: 'Optimum Signal: connect your Gateway',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/connect-your-gateway.md',
          },
          {
            label: 'Gateway client connection guide',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/cl-clients',
          },
        ],
      },
      {
        title: 'What Signal does not prove or reveal',
        explanation:
          'Signal Verify checks are valuable but bounded. A recent “Seen by Optimum” result shows that a Gateway reported; it does not prove the Beacon Node is peered. A “Blocks arriving” result is about blocks reaching the mesh in recent slots, not a receipt from every remote Beacon Node or proof of canonical inclusion. Fleet checks may summarize multiple Gateways rather than naming the passing host. The supplied Signal pages describe health and network ports, but do not promise a full, live map of all mesh peers or a general peer-discovery API.',
        example:
          'A team sees “Gateway enrolled: Yes, 3” but one machine still has no CL peer. The fleet-level count does not identify that host. The operator checks `/health` locally on each Gateway, and uses the individual Beacon Node’s peer configuration and current self-info to diagnose its connection.',
        exampleSteps: [
          'Use Signal Console and Verify for account/fleet enrollment, recent reporting, and mesh-arrival checks.',
          'Use local `/health` for the Gateway’s CL and mesh peer checks.',
          'Use `/api/v1/self_info` for the Gateway’s current identity and addresses when troubleshooting a peer target.',
          'Use host-level tools and the official network requirements for firewall/reachability questions.',
          'Treat pending performance cards as measurements with their own data requirements, not as immediate connectivity failures.',
        ],
        visualConcept:
          'Show a three-column “Signal Verify can show / local Gateway can show / not established by these checks” comparison. Put mesh topology maps, per-validator receipt, and guaranteed timing under the last column.',
        technicalDetails: [
          'For multiple Gateways, the bulk onboarding guide says Verify covers them together and does not name each Gateway; operators can check each host locally.',
          'The first-report guide says timing and accuracy cards wait for their own data windows and index thresholds. A pending report is not, by itself, a connectivity failure.',
          'The public pages do not establish guaranteed delivery, validator inclusion, or that Signal enumerates every live mesh peer. Do not infer these from an “Active” badge or a passing row.',
        ],
        sources: [
          {
            label: 'Optimum Signal: bulk Gateway onboarding',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/onboard-in-bulk.md',
          },
          {
            label: 'Optimum Signal: first report',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/your-first-report.md',
          },
          {
            label: 'Optimum Signal: when the check fails',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/when-the-check-fails.md',
          },
          {
            label: 'Optimum Signal: network ports',
            href: 'https://github.com/getoptimum/docs/blob/main/signal/network.md',
          },
        ],
      },
    ],
  },
  'block-stream': {
    id: 'block-stream',
    order: '09',
    navTitle: 'Block Stream',
    title: 'Consumer Block Stream',
    category: 'DOWNSTREAM DATA',
    summary:
      'Follow decoded Beacon Blocks from the Gateway to WebSocket or gRPC consumers, including tokens, buffering, and reconnect behavior.',
    beginnerExplanation:
      'The Consumer Block Stream is an optional, read-only output from an Optimum Gateway. The Gateway already receives and decodes Beacon Blocks as part of its work; the stream lets your own applications subscribe to those blocks over WebSocket or gRPC. A consumer has its own short-lived stream token, distinct from the credential the Gateway uses to join Optimum.',
    realWorldExample:
      'An analytics service wants to process Beacon Blocks without becoming a Beacon Node or mesh peer. Its operator enables the Gateway’s stream, creates a consumer key for that service, exchanges the key for a short-lived JWT, and opens a WebSocket or gRPC stream. The service receives block events while the Gateway continues its normal CL/mump2p work.',
    howItWorks: [
      'The Gateway receives a Beacon Block from a documented source such as its consensus-layer path or the mump2p mesh, then decodes it for its own processing.',
      'When the opt-in stream is enabled, the Gateway can publish a block event to each authenticated WebSocket or gRPC consumer.',
      'Metadata mode sends fields describing the block observation; raw mode also includes the original `ssz_snappy` bytes as Base64.',
      'The stream is long-lived and bounded: a slow consumer can receive a `lagged` event when its per-connection buffer overflows.',
      'Consumers monitor heartbeat frames, refresh their JWTs, and reconnect after a Gateway restart. Reconnecting does not replay events missed between connections.',
    ],
    whyItMatters:
      'The stream offers an application-facing feed without turning every consumer into a P2P node. That convenience comes with responsibilities: secure the consumer credential, respect buffer and connection limits, distinguish a quiet feed from a broken connection, and handle gaps deliberately.',
    terminologyNote:
      'A consumer key (`osc_…`) is exchanged for a short-lived stream JWT. It is not the Gateway API key (`ogw_…`) or fleet join key (`ojk_…`). A heartbeat is an in-band application message; a keepalive ping is transport traffic that helps a long-lived connection stay open.',
    keyTakeaways: [
      'The read-only Consumer Block Stream is opt-in and disabled by default.',
      'WebSocket and gRPC provide the same stream concept with different transport interfaces.',
      'Consumer tokens are separate from Gateway credentials and are short-lived.',
      'A bounded buffer can drop events; `lagged` reports loss on that connection.',
      'Heartbeats, keepalives, and reconnects solve different problems; reconnects do not replay gaps.',
      'Stream-only mode still joins the mesh but skips the CL host and does not publish.',
    ],
    demoType: 'block-stream',
    demoNote:
      'This simulation shows a conceptual block event flowing into a Gateway stream. It does not connect to a real Gateway, create real credentials, decode real SSZ data, or model production timing and networking.',
    sources: [
      {
        label: 'Optimum Gateway User Guide',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/',
      },
      {
        label: 'Consumer Block Stream',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream',
      },
      {
        label: 'Gateway Configuration',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/configuration',
      },
      {
        label: 'Gateway Troubleshooting',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/troubleshoot',
      },
      {
        label: 'Gateway Network Requirements',
        href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/network-requirements',
      },
    ],
    chapterSections: [
      {
        title: 'What the Consumer Block Stream is for',
        explanation:
          'A Gateway already handles Beacon Blocks as they arrive through its normal networking work. The Consumer Block Stream is a separate, optional output that lets an operator’s applications read those decoded blocks. It is read-only: a consumer receives events but does not publish blocks back to the Gateway through this stream. It is off by default, so enabling the usual Gateway does not silently expose a consumer listener.',
        example:
          'A monitoring service wants to update a dashboard when a Beacon Block reaches the Gateway. Instead of joining the Beacon Node’s P2P network, the service opens the Gateway’s stream and reads block events. It can observe the feed, but the stream does not make the service a validator, Beacon Node, or mesh participant.',
        exampleSteps: [
          'An operator enables the stream in the Gateway configuration and restarts the process.',
          'The operator creates a stream key for the specific downstream application.',
          'The application exchanges that key for a short-lived token and opens a WebSocket or gRPC stream.',
          'The Gateway emits block events to the connected consumer; the stream does not accept block publications from it.',
        ],
        visualConcept:
          'Show Beacon Node and mump2p as Gateway input paths, then a one-way “decoded block events” output from Gateway to WebSocket and gRPC consumers. Mark the consumer side read-only and optional.',
        technicalDetails: [
          'The official guide describes the stream as read-only, opt-in, and off by default.',
          'The stream exposes Beacon Blocks the Gateway already decodes; it does not replace the Gateway’s consensus-layer or mesh roles.',
          'The two downstream transports are separate from the Gateway’s CL P2P port, mump2p port, and telemetry listener.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: overview and enablement',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream',
          },
          {
            label: 'Optimum Gateway User Guide: architecture',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/',
          },
        ],
      },
      {
        title: 'From block arrival to a consumer event',
        explanation:
          'The Gateway can observe a block over its consensus-layer path or from mump2p. It decodes the block for its own processing, then the stream turns that observation into a downstream event. The event includes useful context such as slot, proposer, roots, topic, source, and receive time. The documented `source` distinguishes observations from `libp2p` and `mump2p`. The stream is per observation, so one block seen over both paths can appear twice with different sources.',
        example:
          'Imagine a block first reaches a Gateway through its local consensus peer and later is observed through mump2p. A consumer can receive an event for each observation and compare the source and timing. If it only wants unique blocks, it should deduplicate using block identity fields rather than treating the two source events as accidental duplicates.',
        exampleSteps: [
          'A Beacon Block reaches the Gateway from a supported input path.',
          'The Gateway decodes the block and constructs a stream event.',
          'The event records which path observed it, along with block metadata and timing.',
          'The consumer decides whether it needs each path observation or one unique block.',
        ],
        visualConcept:
          'Show two input arrows—CL/libp2p and mump2p—entering the Gateway decoder. From the decoder, show a single consumer event with a `source` label. Draw two possible observations of the same block as separate events, not as one merged event.',
        technicalDetails: [
          'Metadata mode is the default and carries the decoded block event without block bytes.',
          'Raw mode adds the original `ssz_snappy` bytes as a Base64 `raw` field; it does not change the event into a command or a write API.',
          'The guide recommends distinguishing unique-block identity from per-path observations; `block_size_bytes` and `received_at_ms` vary by observation and are not stable block identifiers.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: payload modes and source observations',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#step-3-—-open-a-stream',
          },
          {
            label: 'Consumer Block Stream: deduplication guidance',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#one-event-per-observation-so-deduplicate-deliberately',
          },
        ],
      },
      {
        title: 'WebSocket and gRPC: two ways to read the feed',
        explanation:
          'WebSocket sends each event as a JSON frame over one open connection. gRPC uses the documented `BlockStreamService/Subscribe` method and returns typed block frames. Both carry the same general stream information, including metadata or raw mode, heartbeat events, and lag notifications. Pick the transport your consumer can support; the public guide does not claim one is universally faster or more reliable than the other.',
        example:
          'A browser dashboard can use WebSocket and parse JSON frames. A backend written with a gRPC client can subscribe to the gRPC service and read typed messages. Both applications still need to authenticate, handle heartbeats, and respond to connection loss.',
        exampleSteps: [
          'Choose WebSocket or gRPC based on the downstream application and its client libraries.',
          'Authenticate using the transport’s supported method: an Authorization header for gRPC, or the documented WebSocket subprotocol approach when browser code cannot set headers.',
          'Select metadata (default) or raw payload mode.',
          'Read frames until the client deliberately closes or the connection is interrupted.',
        ],
        visualConcept:
          'Split the Gateway’s consumer output into two parallel lanes: WebSocket → JSON frames and gRPC → typed Subscribe frames. Rejoin the lanes at a consumer-facing label: “block, heartbeat, or lagged event.”',
        technicalDetails: [
          'WebSocket uses the Gateway’s configured stream listener; gRPC uses its separate configured listener.',
          'Browser WebSocket clients cannot set arbitrary request headers. The guide documents the `optimum.stream.v1` and `bearer.<JWT>` subprotocol offer; the Gateway negotiates the marker without echoing the token.',
          'A gRPC deadline chosen by a client can end its own request; a resulting `DeadlineExceeded` is not necessarily a Gateway failure.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: WebSocket and gRPC',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#step-3-—-open-a-stream',
          },
          {
            label: 'Consumer Block Stream: connection errors',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#errors',
          },
        ],
      },
      {
        title: 'Consumer authentication is not Gateway authentication',
        explanation:
          'The Gateway’s API key or join key authenticates the Gateway to Optimum; downstream consumers use a separate stream key. An operator mints a consumer key—shown once and intended for one consumer—and the consumer exchanges it for a short-lived JWT. The Gateway verifies that token locally against the JWKS published by the configured auth service. This keeps consumer access separate from the credential that enrolls the Gateway.',
        example:
          'An analytics service receives its own `osc_…` stream key. It exchanges the key for a JWT and presents that token when opening the stream. It never needs the Gateway’s `ogw_…` API key or `ojk_…` join key. If the consumer key is revoked, it cannot mint new tokens, but an already-issued token can remain usable until it expires.',
        exampleSteps: [
          'Mint one stream consumer key for the selected network and the intended downstream consumer.',
          'Exchange the key with the documented Optimum auth endpoint for a short-lived JWT.',
          'Present the JWT to the Gateway using the selected transport’s documented method.',
          'Refresh before expiry; if re-authentication is enforced and a token stops verifying, the stream closes.',
        ],
        visualConcept:
          'Show two credential lanes: Gateway API/join credential → Gateway ↔ Optimum services; consumer `osc_` key → auth service → short-lived JWT → downstream stream connection. Never route the consumer key through the Gateway enrollment path.',
        technicalDetails: [
          'The consumer token endpoint is `POST /api/v1/stream/token`; the stream key is sent in the request body, not in an Authorization header.',
          'The default token lifetime is 3600 seconds, with a documented maximum of 21600 seconds. The Gateway verifies the signature locally using the configured auth service’s JWKS.',
          '`stream_reauth_mode` defaults to `observe`; `off`, `observe`, and `enforce` have different behavior. The documented re-authentication interval default is 60 seconds.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: consumer keys and JWT exchange',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#step-1-—-mint-a-stream-key-console',
          },
          {
            label: 'Consumer Block Stream: token refresh and re-authentication',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#refreshing-the-token-in-band',
          },
          {
            label: 'Gateway Configuration: credentials and stream fields',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/configuration',
          },
        ],
      },
      {
        title: 'Configuration defaults and safe listener exposure',
        explanation:
          'The stream has its own listeners and settings. In the current guide, streaming is disabled by default; WebSocket and gRPC listeners default to loopback addresses on ports 9600 and 9601. Authentication is enabled by default. Turning authentication off is allowed only on a loopback bind. If an operator chooses a non-loopback listener, the guide requires a trusted TLS-terminating proxy because the Gateway does not terminate TLS itself.',
        example:
          'A service running on the same host can use the loopback listener without exposing it to the network. A consumer on another host needs a deliberate network design: authenticate it, put a trusted TLS proxy in front of the stream, and avoid publishing the raw Gateway listener without protection.',
        exampleSteps: [
          'Enable `stream_enable`; it is false by default.',
          'Keep the default loopback bind unless remote access is intentionally designed.',
          'Leave `stream_require_auth` enabled for authenticated consumer access.',
          'For non-loopback access, place the Gateway behind a trusted TLS-terminating proxy and follow the current network/security guide.',
          'Do not put Gateway or consumer credentials in YAML, images, browser code, or shared consumer keys.',
        ],
        visualConcept:
          'Draw the default loopback consumer beside the Gateway. For remote consumers, draw a trusted TLS proxy between the network and stream listener. Add a crossed-out direct public path to the Gateway listener.',
        technicalDetails: [
          '`stream_enable` defaults false; `stream_only` defaults false and requires `stream_enable`.',
          '`stream_addr` defaults to `127.0.0.1:9600`; `stream_grpc_addr` defaults to `127.0.0.1:9601`; `stream_require_auth` defaults true.',
          'Current defaults also include `stream_max_conns: 256`, `stream_max_conns_per_sub: 8`, `stream_buffer_size: 64`, heartbeat interval 20 seconds, keepalive minimum 20 seconds, and re-authentication mode `observe` with a 60-second interval.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: enablement and exposure',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#enable-it',
          },
          {
            label: 'Gateway Configuration: consumer stream reference',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/configuration#config-reference',
          },
          {
            label: 'Gateway Network Requirements',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/network-requirements',
          },
        ],
      },
      {
        title: 'Connection caps, buffering, and lag',
        explanation:
          'The Gateway limits the number of open consumer connections globally and per consumer key. Each connection also has a bounded ring buffer. If an application reads too slowly, the buffer can fill; the Gateway drops excess events and sends a `lagged` frame with the cumulative dropped count. This protects the Gateway from being stalled by one slow reader, but it means the consumer must notice and handle dropped data.',
        example:
          'Suppose a consumer pauses while blocks continue to arrive. Once its connection buffer overflows, the stream reports that events were dropped. The consumer should record the lag signal and reconcile its view against a trusted chain source; reconnecting does not cause the Gateway to replay the missing stream events.',
        exampleSteps: [
          'The Gateway queues block events separately for each consumer connection.',
          'The consumer falls behind and its configured ring buffer fills.',
          'The Gateway drops events beyond that bounded buffer and emits a cumulative lag count.',
          'The consumer detects the gap and uses its own recovery/reconciliation strategy.',
        ],
        visualConcept:
          'Show two consumers with independent queues: a fast reader drains its ring buffer, while a paused reader fills its buffer and receives a `lagged { dropped }` event. Keep the Gateway’s input path moving in both cases.',
        technicalDetails: [
          'The documented defaults are 256 total connections, 8 per consumer key, and 64 queued events per connection.',
          'At the connection cap, WebSocket reports 503 Service Unavailable and gRPC reports ResourceExhausted.',
          'A `lagged` signal proves that events were dropped on that connection; it is different from a skipped chain slot, which may have no block at all.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: connection limits',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#enable-it',
          },
          {
            label: 'Consumer Block Stream: lag signal',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#lag-signal',
          },
          {
            label: 'Consumer Block Stream: connection errors',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#errors',
          },
        ],
      },
      {
        title: 'Heartbeats, keepalives, and long-running connections',
        explanation:
          'A heartbeat and a keepalive are not the same thing. The Gateway’s heartbeat is an in-band event that says the stream connection is alive and reports the last delivered slot, an expected slot, and time since the last block. Transport keepalives are client pings that help prevent quiet connections from being removed by NAT or connection tracking. The current minimum accepted ping interval is 20 seconds; faster pings can trigger GOAWAY with `too_many_pings`.',
        example:
          'A consumer has no new block for a while but keeps receiving heartbeats. That says the stream connection is alive, not necessarily that the feed is current. The consumer compares the heartbeat with its own chain view. It should not treat an expected-slot gap alone as proof of data loss, because a slot may legitimately have no block.',
        exampleSteps: [
          'Keep the stream open and listen for the default heartbeat, which is sent every 20 seconds.',
          'Configure transport pings deliberately; gRPC clients do not send keepalives unless configured.',
          'Do not ping more often than the documented minimum interval.',
          'If the Gateway or TLS terminator restarts, reconnect and account for the interval without a stream.',
          'Retry gRPC `Internal` as well as `Unavailable` when implementing long-running stream reconnection.',
        ],
        visualConcept:
          'Draw a heartbeat lane from Gateway to consumer with “connection alive” and block slots; draw a separate client-to-Gateway keepalive lane labelled “transport ping”. Show a restart breaking both lanes and a permanent gap between the old and new stream.',
        technicalDetails: [
          '`stream_heartbeat_interval_sec` defaults to 20; setting it to 0 disables heartbeat frames.',
          '`stream_keepalive_min_time_sec` defaults to 20. The guide gives a slower interval such as 30 seconds as an example; faster pings may receive GOAWAY.',
          'A missing heartbeat is a useful connection-failure signal. `expected_slot - last_slot` is only an observation and must be correlated with chain state.',
          'No events are replayed across connections. A stream cut after its first block may end as gRPC `Internal`; a cut before the first block may end as `Unavailable`.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: liveness signal',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#liveness-signal',
          },
          {
            label: 'Consumer Block Stream: long-running connections',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#holding-a-stream-open-for-weeks',
          },
          {
            label: 'Gateway Configuration: stream heartbeat and keepalive defaults',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/configuration#config-reference',
          },
        ],
      },
      {
        title: 'Full Gateway versus stream-only mode',
        explanation:
          'The stream can be enabled on a normal Gateway, which has its CL and mump2p roles and can participate in the ordinary Gateway pipeline. Stream-only mode is for an operator who wants a consumer feed without running a consensus client. It still joins the Optimum mesh, but it skips the CL host and does not publish. The stream-only mode requires streaming to be enabled; its lack of CL peers is expected, not automatically a failure.',
        example:
          'A validator operator can run a full Gateway, connect it to a Beacon Node, join the mesh, and expose an optional consumer stream. An analytics operator without a Beacon Node can instead use stream-only mode to receive blocks from the mesh and expose them downstream. These are different operating modes, not two stream transports.',
        exampleSteps: [
          'Choose full Gateway mode when the Gateway needs its normal CL and mesh roles.',
          'Enable the consumer stream separately if downstream applications need a feed.',
          'Choose stream-only only when no consensus client is being run for this Gateway.',
          'In stream-only mode, check mesh health and block arrival; CL checks are reported as skipped.',
        ],
        visualConcept:
          'Compare two panels. Full Gateway: Beacon Node ↔ Gateway ↔ mesh, with an optional consumer stream. Stream-only: no Beacon Node/CL host, but mesh → Gateway → consumer stream; label “joins mesh, does not publish.”',
        technicalDetails: [
          '`stream_only` defaults false, skips CL host/ingest, never publishes, and requires `stream_enable`.',
          'A stream-only Gateway still joins the mesh. Its health checks for `cl_peers`, `cl_health`, and `subscribed_topics` are skipped; mesh checks remain relevant.',
          'Enabling the stream does not by itself make a normal Gateway stream-only.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: stream-only mode',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#enable-it',
          },
          {
            label: 'Gateway Configuration: `stream_only`',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/configuration#config-reference',
          },
          {
            label: 'Gateway Troubleshooting: stream-only health checks',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/troubleshoot',
          },
        ],
      },
      {
        title: 'Common failures and what to check',
        explanation:
          'When a consumer cannot read the feed, identify whether the failure happened while enabling the listener, exchanging the key, opening the connection, or maintaining an already-open stream. A bad or missing JWT is different from an invalid mode or a full connection cap. A token exchange failure points to the consumer key; a mid-stream failure may point to token re-authentication, a Gateway restart, a slow reader, or client keepalive settings.',
        example:
          'A WebSocket client gets 401: first confirm it exchanged the right stream key for a JWT and sent it using the documented WebSocket mechanism. If it connects but receives `lagged`, the authentication succeeded; the application is falling behind and needs to handle dropped events. If it reconnects after a Gateway restart, it should expect a gap because the stream has no replay.',
        exampleSteps: [
          'Confirm `stream_enable` is true and the client is using the configured WebSocket or gRPC address.',
          'For 401/Unauthenticated, check the consumer token and ensure the Gateway verifies against the same auth service that minted it.',
          'For 400/InvalidArgument, check the requested mode; for 503/ResourceExhausted, check connection caps.',
          'For `lagged`, investigate consumer read throughput and reconcile the missing events.',
          'For a quiet connection, distinguish heartbeat frames from block arrival; compare with chain state.',
          'For a restart or GOAWAY, reconnect with a valid token and account for the unreplayable gap.',
        ],
        visualConcept:
          'Build a troubleshooting tree by stage: configuration/listener → key exchange → stream handshake → steady-state delivery. Place the documented status/error beside the stage where it occurs.',
        technicalDetails: [
          'At connection time, missing/bad token maps to WebSocket 401 or gRPC Unauthenticated; invalid mode maps to 400 or InvalidArgument; a cap maps to 503 or ResourceExhausted.',
          'Unknown, suspended, or revoked consumer keys fail at token exchange. That response is separate from the Gateway’s stream connection status.',
          'If re-authentication is `enforce`, a token that stops verifying closes the stream. In the default `observe` mode, failed verification is recorded and the stream is kept.',
          'The Gateway does not terminate TLS itself; use a trusted TLS-terminating proxy for non-loopback exposure.',
        ],
        sources: [
          {
            label: 'Consumer Block Stream: errors',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#errors',
          },
          {
            label: 'Consumer Block Stream: token refresh and re-authentication',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/block-stream#refreshing-the-token-in-band',
          },
          {
            label: 'Gateway Troubleshooting',
            href: 'https://getoptimum.github.io/optimum-gateway/versions/latest/troubleshoot',
          },
        ],
      },
    ],
  },
}
