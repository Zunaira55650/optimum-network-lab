import type { LearningModuleId } from './learningModules'

export type QuizQuestion = {
  prompt: string
  options: readonly [string, string, string, string]
  correctOption: number
  explanation: string
  hint: string
}

export const learningQuizzes: Record<LearningModuleId, readonly QuizQuestion[]> = {
  introduction: [
    {
      prompt:
        'Which layout matches an operator who runs validators and adds Optimum?',
      options: [
        'The Validator Client joins the mesh directly, and the Gateway replaces the Beacon Node',
        'Console peers with the Validator Client and relays blocks through the Beacon Node',
        'The Validator Client uses the Beacon Node; the Beacon Node peers with the Gateway; the Gateway joins the mump2p mesh',
        'The Gateway holds validator keys and runs consensus instead of the Beacon Node',
      ],
      correctOption: 2,
      explanation:
        'Optimum adds a Gateway alongside the operator’s existing Beacon Node. The Validator Client continues to use the Beacon Node; the Gateway peers with the Beacon Node and the mump2p mesh.',
      hint: 'The Gateway is an additional peer in the Beacon Node’s networking setup, not a replacement Ethereum client.',
    },
    {
      prompt:
        'A Beacon Node peers with its local Optimum Gateway. Which description of their communication matches the Gateway documentation?',
      options: [
        'They exchange selected consensus-layer gossip; the Gateway can bridge selected messages to and from the mesh',
        'The Gateway can only send messages from the Beacon Node toward the mesh',
        'The Gateway replaces the Beacon Node’s gossip network and handles validator duties',
        'The Validator Client must connect directly to each remote Gateway',
      ],
      correctOption: 0,
      explanation:
        'The local CL client peers with the Gateway. The Gateway bridges selected gossip in both directions, while the Validator Client continues to use the Beacon Node.',
      hint: 'Look for the Gateway’s two networking sides and its local CL peer.',
    },
    {
      prompt:
        'A Gateway connected to a Beacon Node receives a new message from mump2p. What documented step brings it into that operator’s Ethereum gossip network?',
      options: [
        'Bootstrap sends the message directly to the Validator Client',
        'The Gateway forwards the coded shards to the Beacon Node as if they were complete blocks',
        'Console signs the message and injects it into Ethereum consensus',
        'The Gateway maps the message to a local consensus-layer topic and publishes it there',
      ],
      correctOption: 3,
      explanation:
        'The Gateway maps the message to a local CL gossip topic and publishes it there. The reviewed Beacon Block implementation path does not establish that the payload must be decoded and re-encoded.',
      hint: 'Focus on the documented topic mapping and local publication; do not assume an unverified payload-conversion step.',
    },
    {
      prompt:
        'In the lesson’s toy example, the receiver gets A + B = 5 and A + 2B = 1 (mod 7). What does it recover?',
      options: [
        'B = 2 and A = 3',
        'B = 3 and A = 2',
        'Only the sum A + B; a second independent equation is still needed',
        'Nothing, because modulo arithmetic cannot be reversed',
      ],
      correctOption: 1,
      explanation:
        'Subtracting the first equation from the second gives B = −4 = 3 (mod 7); substituting into the first gives A = 2. This is a simplified teaching example, not Optimum’s production parameters.',
      hint: 'Subtract the first equation from the second, then substitute the result back.',
    },
    {
      prompt:
        'A participant wants Optimum blocks for its own data consumers but runs no validators. Which setup is documented?',
      options: [
        'A Validator Client that connects directly to the mump2p mesh',
        'A stream-only Gateway that receives blocks from the mesh and serves its own consumers',
        'A Beacon Node configured with validator indices it does not own',
        'Accelerate, which replaces the Gateway and provides the block feed',
      ],
      correctOption: 1,
      explanation:
        'Optimum documents a stream-only Gateway for participants without validators. It can serve the operator’s consumers without peering with a Beacon Node.',
      hint: 'Choose the Gateway mode intended for operators without a Beacon Node.',
    },
    {
      prompt:
        'Which item belongs to Gateway setup and operation, rather than the path that carries consensus messages?',
      options: [
        'The Gateway publishing a reconstructed message to local CL gossip',
        'A Beacon Node receiving consensus-layer gossip from its peers',
        'Gateway-to-Gateway mump2p message exchange',
        'Bootstrap peer discovery and Console operator setup',
      ],
      correctOption: 3,
      explanation:
        'Bootstrap and Console support gateway discovery, enrollment and operation. They are not message hops that carry the block payload between Beacon Nodes.',
      hint: 'Separate operational setup services from the Beacon Node–Gateway–mesh path.',
    },
    {
      prompt:
        'An operator measures that a block was seen on the mesh before Ethereum gossip. What conclusion is supported by Optimum’s metrics guidance?',
      options: [
        'That one timestamp difference alone does not prove a general performance gain; the paths can feed one another and proposer timing matters',
        'The Gateway guarantees every future block will arrive earlier',
        'The mesh must have produced the block before the proposer did',
        'The observation proves that ordinary Ethereum gossip is no longer needed',
      ],
      correctOption: 0,
      explanation:
        'Optimum’s metrics guidance cautions against treating a single local arrival-time delta as a stable KPI. The paths may feed one another, and proposer timing affects when a block first exists.',
      hint: 'Consider whether the timestamp comparison isolates the Gateway’s effect.',
    },
    {
      prompt:
        'The public mump2p guide describes its relationship to GossipSub in two conflicting ways. What should a careful explanation say?',
      options: [
        'mump2p definitely replaces every part of GossipSub',
        'mump2p is just another name for a beacon node',
        'The public guide is inconsistent, so the exact relationship is not settled by that source',
        'The Gateway README proves GossipSub is never used',
      ],
      correctOption: 2,
      explanation:
        'The guide calls mump2p both an alternative to GossipSub and a protocol that builds on it. Without a clearer official source, do not choose one interpretation as fact.',
      hint: 'When an official source contradicts itself, avoid resolving the contradiction by guessing.',
    },
  ],
  p2p: [
    {
      prompt:
        'A network uses a Bootstrap service to help new nodes find addresses, but peers exchange application messages with one another. Is it still peer-to-peer?',
      options: [
        'No. A P2P network cannot contact any server for any purpose',
        'Yes. A support service can help with discovery without carrying every application message',
        'No. Every peer must connect directly to every other peer',
        'Yes, but only if the Bootstrap service stores all messages permanently',
      ],
      correctOption: 1,
      explanation:
        'P2P describes how participants communicate, not whether supporting services exist. A Bootstrap service may help a node find peers while application messages travel over peer connections.',
      hint: 'Focus on the application-message path, not whether a support service exists.',
    },
    {
      prompt:
        'A peer’s Peer ID stays the same after its network address changes. Which statement best explains this?',
      options: [
        'The Peer ID is the peer’s IP address, so it cannot change',
        'The multiaddress is a permanent identity and the Peer ID is a temporary port',
        'Peer IDs and multiaddresses both identify a person, not a network peer',
        'The Peer ID identifies the peer’s cryptographic identity; its multiaddress describes a route that may change',
      ],
      correctOption: 3,
      explanation:
        'A Peer ID is associated with a peer’s public-key identity, while a multiaddress describes protocols and network locations used to reach it. If the key remains the same, the address can change without changing the Peer ID.',
      hint: 'One is the peer’s network identity; the other is a possible route.',
    },
    {
      prompt:
        'A new libp2p node learns a peer’s multiaddress from a Bootstrap peer. What must it still do before exchanging application messages with that peer?',
      options: [
        'Dial the address, establish a compatible secure connection, and use a protocol both peers support',
        'Treat discovery as proof that the connection is already open',
        'Replace the remote peer’s Peer ID with the Bootstrap peer’s ID',
        'Send the application message to the Bootstrap peer instead',
      ],
      correctOption: 0,
      explanation:
        'Discovery provides information about possible peers. A node still has to dial a usable address, complete connection setup and communicate using a supported protocol.',
      hint: 'Finding an address is not the same step as opening a connection.',
    },
    {
      prompt:
        'Peer A can reach Peer C only through Peer B. B disconnects. What can A safely conclude?',
      options: [
        'A and C are still connected because P2P automatically creates a new route',
        'Every message already sent by A must have reached C',
        'The A–B–C route is unavailable; another route or a later retry may help, but neither is guaranteed',
        'Peer C has permanently left the network',
      ],
      correctOption: 2,
      explanation:
        'Losing B removes the only stated path between A and C. An alternate route is useful only if it exists and the message protocol can use it; reconnection and retry behavior depend on the application.',
      hint: 'Separate the failed connection from possible alternate routes and recovery behavior.',
    },
    {
      prompt:
        'Which statement best describes the two Ethereum P2P networks and their common jobs?',
      options: [
        'One shared P2P network carries all execution and consensus traffic through validator clients only',
        'Consensus clients gossip transactions, while execution clients gossip Beacon attestations',
        'Ethereum clients do not exchange data with other peers',
        'Execution-layer peers share transactions; consensus-layer peers share Beacon Chain messages such as blocks',
      ],
      correctOption: 3,
      explanation:
        'Ethereum documents separate execution- and consensus-layer P2P networks. Transactions are an execution-layer use case, while Beacon Chain messages are handled by consensus-layer peers.',
      hint: 'Match transactions and Beacon blocks to their respective client layers.',
    },
    {
      prompt:
        'A Beacon Node connects to an Optimum Gateway, and that Gateway connects to other Gateways. Which description matches the documented architecture?',
      options: [
        'The Validator Client directly replaces the Gateway as a mump2p peer',
        'The Gateway bridges selected local CL gossip messages to and from its mump2p mesh connection',
        'The Beacon Node and mump2p are two names for the same component',
        'The Console relays every block message between all Gateway nodes',
      ],
      correctOption: 1,
      explanation:
        'The Gateway has a CL-facing libp2p side and an embedded mump2p side. It bridges selected messages between local consensus-layer gossip and the Gateway mesh; the Validator Client continues to use its Beacon Node.',
      hint: 'Keep the Beacon Node, Gateway, mesh and operator-facing services as separate components.',
    },
    {
      prompt:
        'A diagram shows Peer A connected to Peer B and Peer B connected to Peer C. What does that alone tell you about a message from A?',
      options: [
        'It is guaranteed to reach every peer in the network',
        'It must be encrypted with one shared key known by A, B and C',
        'It can reach C only if the application protocol forwards it through B; the connections alone do not guarantee delivery',
        'It cannot reach C because P2P messages can travel only one hop',
      ],
      correctOption: 2,
      explanation:
        'Topology shows available connections, not message semantics or delivery guarantees. The protocol must allow B to forward the message, and the path must remain usable.',
      hint: 'A line in a topology diagram does not define forwarding rules.',
    },
    {
      prompt:
        'A peer’s address is behind a firewall and cannot be dialed, even though its Peer ID is known. Which conclusion is most accurate?',
      options: [
        'Identity and reachability are different; discovery, NAT traversal or a relay may be needed, depending on support',
        'Knowing a Peer ID guarantees that a network connection can always be opened',
        'The peer must be malicious because its address is unreachable',
        'Changing the Peer ID will automatically make the existing address reachable',
      ],
      correctOption: 0,
      explanation:
        'A Peer ID identifies a cryptographic network identity; it does not ensure the peer is reachable. Firewalls and NAT can block connections, and available traversal or relay options depend on the implementation and configuration.',
      hint: 'Distinguish a verifiable identity from a reachable network route.',
    },
  ],
  gossipsub: [
    {
      prompt:
        'A weather app publishes “rain expected” to `weather/alerts`. What does the topic do?',
      options: [
        'Creates a direct network connection to every subscriber',
        'Guarantees delivery to every peer in the network',
        'Encrypts the message with a topic-specific key automatically',
        'Groups messages so peers subscribed to that subject can receive them',
      ],
      correctOption: 3,
      explanation:
        'PubSub lets a publisher publish to a subject rather than address every receiver. A topic groups related messages; it does not guarantee delivery or create transport connections.',
      hint: 'Think of the topic as a subject or channel, not a route.',
    },
    {
      prompt:
        'Six peers subscribe to one topic, but a node has only two full-message mesh neighbors. What does GossipSub’s mesh help it avoid?',
      options: [
        'Using topics to group messages',
        'Sending every full message directly to every known topic peer',
        'Using peer connections to exchange messages',
        'Forwarding a message to any mesh peer',
      ],
      correctOption: 1,
      explanation:
        'GossipSub forwards full messages through a selected per-topic mesh instead of flooding every known topic peer with every full payload.',
      hint: 'The mesh limits eager full-message forwarding.',
    },
    {
      prompt:
        'Peer A adds Peer B to its mesh for one topic, then later stops forwarding that topic with B. Which statement about GRAFT and PRUNE is correct?',
      options: [
        'GRAFT opens a TCP connection; PRUNE permanently blocks B from every topic',
        'GRAFT sends the full application message; PRUNE deletes the message from every peer',
        'GRAFT announces a topic-mesh link; PRUNE removes that topic link and need not close their underlying connection',
        'GRAFT and PRUNE are names for subscribing and publishing',
      ],
      correctOption: 2,
      explanation:
        'GRAFT and PRUNE manage a peer’s relationship in a topic mesh. The libp2p connection can remain open for other topics or services.',
      hint: 'These control messages manage a topic-specific overlay, not the transport connection.',
    },
    {
      prompt:
        'Peer G receives an IHAVE listing alert 42, which G has not seen. What is the correct next step and possible outcome?',
      options: [
        'G can send IWANT for the ID; the peer can return the full message if it is still cached',
        'G can decode the full alert from the ID without contacting anyone',
        'G must send GRAFT before it can request any message',
        'IHAVE already contains the full payload, so no request is needed',
      ],
      correctOption: 0,
      explanation:
        'IHAVE advertises recent message IDs, not payloads. IWANT requests an unseen message, but the responding peer can only serve it if it remains in its message cache.',
      hint: 'IHAVE is the notice; IWANT is the request for content.',
    },
    {
      prompt:
        'The same valid message ID arrives at Peer D over two different mesh paths. What should D generally do with the second copy?',
      options: [
        'Forward it to every peer because it arrived by a different path',
        'Treat it as a new topic subscription',
        'Recognize it in the seen-message cache and avoid forwarding it as a new message again',
        'Assume the application has exactly-once delivery',
      ],
      correctOption: 2,
      explanation:
        'GossipSub message IDs and a local seen cache help suppress repeated forwarding. That does not establish an application-wide exactly-once delivery guarantee.',
      hint: 'A second route does not make an already-seen message new.',
    },
    {
      prompt:
        'A subscriber was offline until after the peers’ recent-message caches expired. What can it safely expect from GossipSub alone?',
      options: [
        'No guaranteed recovery; heartbeat may adjust the mesh, but the old payload may no longer be available to request',
        'Every peer must replay all historical messages when it reconnects',
        'IHAVE permanently stores the full payload until the subscriber returns',
        'A heartbeat reconstructs messages that no peer still has',
      ],
      correctOption: 0,
      explanation:
        'IHAVE/IWANT can repair recent loss when a reachable peer still has the payload cached. The baseline protocol does not provide durable history or guarantee a replacement peer or successful delivery.',
      hint: 'A cache is temporary, and mesh maintenance is not an archive.',
    },
    {
      prompt:
        'Which description correctly separates Ethereum GossipSub from Optimum’s mump2p path?',
      options: [
        'mump2p is the name for all Ethereum execution- and consensus-layer GossipSub topics',
        'The Gateway subscribes to Ethereum CL GossipSub topics on one side and bridges selected traffic to its separate mump2p mesh side',
        'The Validator Client directly publishes every mump2p shard to Ethereum execution peers',
        'The Gateway’s Bootstrap service carries every full CL message between all nodes',
      ],
      correctOption: 1,
      explanation:
        'Optimum’s Gateway README describes a CL-facing libp2p/GossipSub host and a separate mump2p host, with the Gateway bridging messages between them. The execution-layer network is separate from this CL path.',
      hint: 'Keep the Beacon Node, CL-facing Gateway host, and mump2p mesh as separate parts.',
    },
    {
      prompt:
        'The libp2p v1.0 specification lists a target mesh degree of 6. What should you conclude about Optimum’s production Gateway?',
      options: [
        'Every Optimum Gateway always has exactly six mesh peers',
        'Every topic in every implementation must have exactly six subscribers',
        'The default proves that every message reaches six peers and then the whole network',
        'Nothing about its exact degree without Optimum-specific configuration or implementation evidence',
      ],
      correctOption: 3,
      explanation:
        'The v1.0 values are reasonable defaults in the general specification, not universal constants or proof of Optimum’s production configuration. The Gateway README does not specify its exact GossipSub mesh degree.',
      hint: 'Separate a protocol’s example/default parameter from a product’s documented configuration.',
    },
  ],
  rlnc: [
    {
      prompt:
        'In the teaching demo, x₁ = 1, x₂ = 2 and x₃ = 3 in GF(5). A sender chooses coefficients [0, 1, 1]. What coded value should the shard carry?',
      options: [
        '5, because finite-field arithmetic keeps the ordinary sum',
        '0, because 0×1 + 1×2 + 1×3 = 5 ≡ 0 (mod 5)',
        '3, because the coefficient 0 removes the last source symbol',
        'The whole original message, because every shard is a full copy',
      ],
      correctOption: 1,
      explanation:
        'A coded shard is an equation over the source symbols. In GF(5), 2 + 3 = 5 wraps to 0. The coefficient 0 removes x₁ from this equation; it does not remove x₃ or turn the shard into the whole message. The values and field here are only a teaching example.',
      hint: 'Multiply each coefficient by its matching symbol, add, then reduce modulo 5.',
    },
    {
      prompt:
        'A relay has S₁ = [1, 0, 1] → 4 and S₂ = [0, 1, 1] → 0. It receives a new shard [2, 0, 2] → 3. What happens to its rank?',
      options: [
        'It becomes 3 because the relay now has three packets',
        'It becomes 1 because the new shard replaces S₁',
        'It stays 2: the new row is 2×S₁, so it is dependent',
        'It decodes automatically because the value is different',
      ],
      correctOption: 2,
      explanation:
        '[2, 0, 2] is exactly twice [1, 0, 1] in GF(5), and 2×4 = 8 ≡ 3. It is a different-looking packet with a value that fits, but it contains no new independent equation. Rank counts independent rows, not packets.',
      hint: 'Compare the new coefficient row with the relay’s existing rows.',
    },
    {
      prompt:
        'A receiver holds only S₁: x₁ + x₃ = 4. A packet containing S₂: x₂ + x₃ = 0 is lost. Can the receiver reconstruct all three symbols?',
      options: [
        'No. It has only one independent equation for three unknown symbols',
        'Yes. One coded shard always contains the complete message',
        'Yes. A lost shard is counted as if it had arrived',
        'No, because RLNC requires the original publisher to stay connected',
      ],
      correctOption: 0,
      explanation:
        'One equation cannot determine three unknown values. RLNC can let a receiver use other independent combinations if they arrive, but it cannot count a lost packet as information or recover the message from too little rank. A direct connection to the original publisher is not required if other peers can provide useful shards.',
      hint: 'The receiver needs rank 3 for these three source symbols.',
    },
    {
      prompt:
        'A receiver has S₁ = x₁ + x₃ = 4 and S₂ = x₂ + x₃ = 0. A third shard arrives: S₃ = x₁ + x₂ = 3. What is the recovered source?',
      options: [
        'x₁ = 4, x₂ = 0, x₃ = 3',
        'The source cannot be recovered because S₃ is not a copy of a source symbol',
        'The source is recovered as soon as the receiver has three packets, whatever their equations',
        'x₁ = 1, x₂ = 2, x₃ = 3',
      ],
      correctOption: 3,
      explanation:
        'These three rows are independent, so the system can be solved. From S₁, x₁ = 4−x₃; from S₂, x₂ = −x₃. Substituting into S₃ gives 4−2x₃ = 3 (mod 5), so x₃ = 3, then x₁ = 1 and x₂ = 2. A shard need not be a source-symbol copy to help decode.',
      hint: 'Use the first two equations to express x₁ and x₂ in terms of x₃, then substitute into S₃.',
    },
    {
      prompt:
        'A relay has S₁ = [1, 0, 1] → 4 and S₂ = [0, 1, 1] → 0 for three source symbols. It combines them with weights [1, 1]. Which statement is correct?',
      options: [
        'It must decode all three symbols before it can combine shards',
        'It produces [1, 1, 2] → 4 and its rank becomes 3',
        'It can produce [1, 1, 2] → 4 without decoding; its rank remains 2',
        'It cannot recode because the shard values are not both non-zero',
      ],
      correctOption: 2,
      explanation:
        'Add the coefficient rows and values modulo 5: [1,0,1]+[0,1,1]=[1,1,2] and 4+0=4. The relay has only two independent rows for three unknowns, so it cannot decode yet. Recoding operates directly on the equations and does not create information outside the relay’s current span.',
      hint: 'Add the two coefficient vectors and the two coded values separately, all modulo 5.',
    },
    {
      prompt:
        'A receiver has S₁ but misses S₂. It later gets S₃ = [1, 1, 0] → 3 from a different peer. What should the receiver check?',
      options: [
        'Whether S₃ has the same shard number as the lost S₂',
        'Whether the second peer is the original publisher',
        'Whether the network retransmits every source symbol before accepting S₃',
        'Whether S₃ is independent of S₁; if so, its rank increases even though S₂ was lost',
      ],
      correctOption: 3,
      explanation:
        'The receiver can make progress from a different equation if it adds a new independent row. It does not need the same numbered shard or a direct path from the publisher. If S₃ were dependent on S₁, however, the loss would still leave the receiver short of information.',
      hint: 'Compare coefficient rows, not peer identity or shard numbering.',
    },
    {
      prompt:
        'Which claim about Optimum is supported by the cited research and public implementation materials?',
      options: [
        'Optimum always uses exactly three source symbols over GF(5)',
        'OptimumP2P is presented as an RLNC-based P2P gossip approach; the classroom GF(5) values are not documented production settings',
        'Ordinary GossipSub forwarding and coded-shard propagation are the same mechanism',
        'The public materials guarantee a fixed latency improvement for every network',
      ],
      correctOption: 1,
      explanation:
        'The paper presents OptimumP2P as an RLNC-based gossip approach and compares it with GossipSub. The sample GF(5) arithmetic in this lesson is deliberately illustrative. Public API types and the sample development setup do not establish that field, those shard counts, or a universal performance guarantee.',
      hint: 'Separate what the paper describes from what the small classroom example chooses.',
    },
    {
      prompt:
        'A team adds RLNC to a network, but the only available link is congested and every peer receives duplicate or dependent shards. Which expectation is realistic?',
      options: [
        'The network may still be slow: coding adds computation and metadata, and dependent shards do not increase rank',
        'RLNC removes the link bottleneck because coded shards are always smaller',
        'Every duplicate increases rank because it came through a different peer',
        'The receiver can decode even if no independent shard arrives',
      ],
      correctOption: 0,
      explanation:
        'RLNC can make it easier to combine useful information from multiple paths, but it does not create link capacity or guarantee that arriving equations are independent. Coefficient metadata and encoding/decoding work also have costs. Duplicates and dependent shards may consume resources without helping decode.',
      hint: 'Consider both the information rank and the work/bytes needed to move coded data.',
    },
  ],
  mump2p: [
    {
      prompt:
        'An application submits messages through a REST service, while several P2P nodes exchange coded shards with one another. Which component is the P2P mesh participant?',
      options: [
        'The P2P nodes; the proxy is an optional application-facing access layer',
        'The REST proxy, because it accepts the application request',
        'The topic name, because it connects all publishers',
        'The subscriber client ID',
      ],
      correctOption: 0,
      explanation:
        'In the documented sample architecture, the P2P nodes connect to one another and form the mesh. The proxy provides an application-facing interface and connects to P2P nodes; it is not itself a mesh node.',
      hint: 'Separate the client access service from the nodes that connect peer-to-peer.',
    },
    {
      prompt:
        'A client can publish over a proxy API or communicate with a P2P node through its sidecar interface. What is true about the direct path?',
      options: [
        'It bypasses the P2P mesh entirely',
        'It turns the application into a bootstrap peer',
        'It is documented as an option; after the node publishes, the message still uses the P2P mesh',
        'It is required for every subscriber',
      ],
      correctOption: 2,
      explanation:
        'The setup guide documents both proxy access and direct P2P-node access. Direct access skips the proxy API layer, not the peer network used to propagate the message.',
      hint: 'Which layer is optional: the proxy or the mesh?',
    },
    {
      prompt:
        'Node B has connected to peers but has not joined `demo/blocks`. A publisher sends to that topic. What should the learner check first if B does not participate in the topic traffic?',
      options: [
        'Whether B has a proxy client ID matching the publisher’s peer ID',
        'Whether the topic name has been encoded as an RLNC shard',
        'Whether the publisher has disconnected after sending',
        'Whether B joined the same topic; peer connectivity alone does not establish topic membership',
      ],
      correctOption: 3,
      explanation:
        'A connection means the nodes can communicate; topic membership indicates which topic traffic they participate in. Peer IDs, client IDs, and topic names serve different purposes.',
      hint: 'Being connected to a peer is not the same as joining its topic.',
    },
    {
      prompt:
        'A publish API returns an acknowledgement, but the subscriber has not received the message. What does the acknowledgement establish by itself?',
      options: [
        'Every subscriber has received and decoded the message',
        'The request was accepted at that interface; it does not prove end-to-end subscriber delivery',
        'All peers on the topic are online',
        'The receiver has enough independent shards',
      ],
      correctOption: 1,
      explanation:
        'An API acknowledgement is evidence about the request at that boundary, not a guarantee that every downstream node decoded it or that a subscriber stream delivered it.',
      hint: 'Distinguish acceptance by the publish interface from end-to-end delivery.',
    },
    {
      prompt:
        'A link fails while a message is propagating. Why can coded-shard propagation still fail to deliver the message?',
      options: [
        'Because coded shards can never travel on more than one path',
        'The remaining reachable paths may not supply enough independent information; coding does not remove connectivity limits',
        'Because RLNC guarantees instant delivery only while every peer is online',
        'Because a subscriber can decode only after receiving duplicate shards',
      ],
      correctOption: 1,
      explanation:
        'Coding can make different combinations useful, but a receiver still needs enough independent information over reachable paths. It does not create connectivity or guarantee delivery.',
      hint: 'What does the receiver still need, even if shards are coded?',
    },
    {
      prompt:
        'Node B’s trace shows DUPLICATE_SHARD for a repeated shard. Later it reports UNHELPFUL_SHARD for a different shard. Which interpretation is safest?',
      options: [
        'Both events mean the same packet was received twice',
        'The unhelpful shard proves B already decoded the message',
        'The duplicate event means the shard increased B’s rank',
        'The repeated shard was detected as duplicate; the other shard did not help decoding, though the guide does not fully specify the classifier',
      ],
      correctOption: 3,
      explanation:
        'The guide lists these as different event labels: a duplicate was detected, while an unhelpful shard does not help decoding. It does not provide complete internal decision rules, so do not claim more than that.',
      hint: 'Keep the documented brief meanings, and do not infer hidden implementation details.',
    },
    {
      prompt:
        'Relay B has two independent shards but rank 2 for a three-symbol message. It creates a new combination and sends it to D. What must be true before D can decode?',
      options: [
        'D needs enough independent equations to reach rank 3; B can recode without first decoding',
        'B must decode the whole message before recoding',
        'D must receive three packets, even if they are all dependent',
        'The recoded shard must have the same coefficients as one of B’s inputs',
      ],
      correctOption: 0,
      explanation:
        'Recoding forms a new linear combination from information the relay already holds; it does not require full decoding. The receiver’s own shard set must still contain enough independent information to reconstruct all three source symbols.',
      hint: 'The relay’s rank and the receiver’s rank are separate.',
    },
    {
      prompt:
        'A developer sees PUBLISH_MESSAGE, NEW_SHARD, peer RPC events, and DELIVER_MESSAGE in a trace. Which debugging approach is most reliable?',
      options: [
        'Treat the first publish acknowledgement as proof of delivery and ignore later events',
        'Assume every NEW_SHARD event means the subscriber decoded the message',
        'Follow topic membership, connected peers, message/shard state, full decode, and the subscriber stream; distinguish mump2p shard traces from ordinary GossipSub forwarding',
        'Use a proxy metric alone to identify exactly which subscriber got the message',
      ],
      correctOption: 2,
      explanation:
        'Message delivery crosses multiple boundaries. Check the subscription and topic, peer state, seen versus fully decoded message state, and final client delivery. Optimum’s guide treats mump2p shard traces and GossipSub traces separately; the public docs do not consistently settle the exact layering relationship.',
      hint: 'Follow the message through each boundary; one event or service metric cannot prove the whole path.',
    },
  ],
  gateway: [
    {
      prompt:
        'An operator’s beacon node uses Ethereum GossipSub, while the Optimum network has its own mump2p mesh. Which design matches the documented Gateway architecture?',
      options: [
        'One libp2p host joins both networks as if they were the same protocol',
        'The Gateway replaces the beacon node and runs consensus for it',
        'A Gateway process has a CL-facing libp2p host and an embedded mump2p node, with bridge logic between them',
        'A REST/WebSocket proxy is the mump2p node and the CL peer',
      ],
      correctOption: 2,
      explanation:
        'The Gateway is documented as a single process with two P2P frontends: a CL-facing libp2p host and an embedded mump2p node. It bridges selected messages; it is not the beacon node or Module 05’s optional application proxy.',
      hint: 'Look for the two distinct networking sides inside the Gateway process.',
    },
    {
      prompt:
        'A beacon node gossips a message on a topic the Gateway is subscribed to. What is the documented next bridge step?',
      options: [
        'The Gateway receives and maps the CL message, then passes it to its embedded mump2p node for publication',
        'The Gateway sends RLNC coefficient rows directly to the beacon node',
        'Bootstrap forwards the full message to every Gateway',
        'Console re-signs the message and injects it into consensus',
      ],
      correctOption: 0,
      explanation:
        'The CL-facing Gateway host receives subscribed gossip. Gateway code handles topic/payload mapping and calls the embedded node’s publish interface. The mump2p node then participates in mesh communication; do not attribute undocumented RLNC encoding work to the bridge.',
      hint: 'Separate the Gateway bridge call from the mesh protocol run by its embedded node.',
    },
    {
      prompt:
        'A message arrives from the mump2p side and should be shared with a local beacon node. Which sequence matches the documented reverse path?',
      options: [
        'Pass the coded shards unchanged to the beacon node as Ethereum gossip',
        'Send it to the optional REST proxy, which becomes the CL peer',
        'Ask Bootstrap to decode and publish it',
        'Map the message to a CL topic and publish it on the local libp2p topic',
      ],
      correctOption: 3,
      explanation:
        'The Gateway maps the mump2p message to a local CL topic and publishes it when that topic is subscribed. The reviewed Beacon Block implementation path does not establish a required decode-and-re-encode step.',
      hint: 'The supported behavior is topic mapping and publication on the local CL topic.',
    },
    {
      prompt:
        'Client B has an active libp2p connection to the Gateway, but it has not subscribed to `demo/blocks`. The Gateway publishes a returned message on that local CL topic. What should the simulation show?',
      options: [
        'Client B receives the message because any peer connection includes every topic',
        'The local CL topic publication alone does not mean Client B is subscribed to receive that topic',
        'The Gateway must send the message through the mump2p mesh a second time',
        'The Gateway changes the message into a validator duty',
      ],
      correctOption: 1,
      explanation:
        'A peer connection and a topic subscription are different state. The Gateway can publish to its local topic, but this scenario does not establish that Client B joined the topic.',
      hint: 'Check the destination’s topic subscription separately from its peer connection.',
    },
    {
      prompt:
        'A high-volume non-block topic is configured for aggregation. Which behavior is supported by the architecture ADR?',
      options: [
        'Every beacon block must be delayed until an aggregation batch fills',
        'The Gateway may batch messages into a protobuf container for mump2p and unpack them on the receiving side',
        'Aggregation means the Gateway performs RLNC encoding itself',
        'All topics are always aggregated using one fixed interval',
      ],
      correctOption: 1,
      explanation:
        'The ADR documents an optional aggregation pipeline for high-volume topics other than beacon blocks. It batches messages into a container and unpacks them on receipt; sample intervals are not universal requirements.',
      hint: 'The ADR distinguishes eligible high-volume non-block traffic from beacon blocks.',
    },
    {
      prompt:
        'A Gateway starts with no mesh peers. According to the integration guide, what does Bootstrap do during startup?',
      options: [
        'It relays every CL message between all beacons and the Gateway',
        'It replaces the Gateway’s embedded mump2p node',
        'It guarantees that every discovered peer will remain available',
        'It provides fork/peer discovery and registration information so the Gateway can join the matching mesh',
      ],
      correctOption: 3,
      explanation:
        'The guide describes Bootstrap supplying fork-digest, registration, and peer-discovery support. Gateways then connect directly to mesh peers; Bootstrap is support infrastructure, not the data path for every message.',
      hint: 'Separate startup discovery from message forwarding after peers connect.',
    },
    {
      prompt:
        'A report says the Gateway is reachable over HTTP, but clients are not seeing the expected block. What is the strongest first diagnostic approach?',
      options: [
        'Check `/health` for CL/mesh peers and subscribed topics, then inspect `/api/v1/self_info` and enabled metrics for peer/address and traffic context',
        'Treat HTTP reachability as proof of end-to-end delivery',
        'Change the message payload until the block appears',
        'Use `/metrics` as a per-client delivery receipt even when telemetry is disabled',
      ],
      correctOption: 0,
      explanation:
        'The documented health and self-info endpoints expose peer, topic, and address context, while metrics are available when telemetry is enabled. These help isolate a failing boundary but do not alone prove delivery to an individual client.',
      hint: 'Use each endpoint for its documented view, then follow both bridge directions.',
    },
    {
      prompt:
        'An operator disables `propagation_enabled` and still sees CL messages being passed toward mump2p. Which interpretation matches the ADR?',
      options: [
        'The switch disables all peer connections and all message directions',
        'The switch turns off only the telemetry HTTP server',
        'The switch gates mump2p-to-CL forwarding of blocks and attestations; CL-to-mump2p forwarding and arrival measurement are not gated by it',
        'The setting changes how the Gateway performs RLNC coding',
      ],
      correctOption: 2,
      explanation:
        'The ADR defines this as a fleet-wide switch for mump2p-to-CL forwarding of blocks and attestations. It explicitly says CL-to-mump2p forwarding and arrival measurement are not gated by this switch.',
      hint: 'Pay attention to which direction the setting controls.',
    },
  ],
  beacon: [
    {
      prompt:
        'An operator is adding Optimum to a validator setup. Which component should the Validator Client use for duties and signed submissions?',
      options: [
        'The Optimum Gateway’s mump2p interface',
        'A remote Gateway peer ID',
        'The mump2p mesh directly',
        'The Beacon Node’s Beacon API',
      ],
      correctOption: 3,
      explanation:
        'The Validator Client uses the Beacon API exposed by its Beacon Node. The VC handles validator signing; the Gateway is a separate peer that bridges selected consensus gossip with mump2p.',
      hint: 'Keep the validator API path separate from the Gateway’s P2P path.',
    },
    {
      prompt:
        'A setup diagram shows the Validator Client connecting directly to the Optimum Gateway, which then talks to the Beacon Node. What should be corrected?',
      options: [
        'The Gateway should replace the Beacon Node',
        'The Validator Client should use the Beacon Node API; the Beacon Node is the documented CL peer of the Gateway',
        'The Validator Client should join every mump2p peer',
        'The Beacon Node should connect to the Validator Client through mump2p',
      ],
      correctOption: 1,
      explanation:
        'The two connections have different jobs: Validator Client ↔ Beacon Node uses the Beacon API, while Beacon Node ↔ Gateway is the consensus-layer peer connection. Public Optimum docs do not describe the VC as a direct Gateway peer.',
      hint: 'Which component exposes the API used by a Validator Client?',
    },
    {
      prompt:
        'A Beacon Node operator configures its client to dial the Gateway. Which peer identity should be used as the dial target?',
      options: [
        'The Gateway’s CL-facing peer ID and a reachable address, following that client’s guide',
        'The Beacon Node’s own peer ID',
        'A mump2p mesh peer ID copied from another Gateway',
        'The Validator Client’s validator public key',
      ],
      correctOption: 0,
      explanation:
        'The Beacon Node dials the Gateway, so the Gateway’s CL-facing identity/address is the target. The Beacon Node’s identity is used in Gateway-side direct peer configuration when that is part of the selected setup.',
      hint: 'The dial target is the identity of the peer being dialed.',
    },
    {
      prompt:
        'The Gateway cannot establish a CL peer after a restart. Its old peer ID no longer matches `/api/v1/self_info`. What is a useful first check?',
      options: [
        'Whether the Validator Client joined the mump2p mesh',
        'Whether the Beacon Node changed its validator signing key',
        'Whether Gateway identity data was persisted across restarts',
        'Whether the Gateway’s mesh peers signed the Beacon Node’s messages',
      ],
      correctOption: 2,
      explanation:
        'The Gateway’s libp2p and mump2p identity volumes should be persisted. If identity changes, peer configuration that relied on the prior ID may no longer match.',
      hint: 'A peer ID can change if the identity behind it is not preserved.',
    },
    {
      prompt:
        'The Gateway shows one connected CL peer, but its health check reports stale block age. What is the best interpretation?',
      options: [
        'A peer count proves current consensus data is flowing',
        'The Validator Client should send its private key to the Gateway',
        'The peer link exists, but it does not prove useful current data; check Beacon Node and Execution Client sync plus Gateway topic/traffic checks',
        'All mump2p peers must be disconnected',
      ],
      correctOption: 2,
      explanation:
        'A connection count establishes a link, not successful block flow. The documented checks include block age and topic/traffic state; a silent or unsynced consensus/execution setup can still leave data stale.',
      hint: 'Separate “connected” from “recent data is moving.”',
    },
    {
      prompt:
        'A Beacon Node client guide and a colleague’s setup show different sides initiating the peer connection. Is one necessarily wrong?',
      options: [
        'No; the documented connection direction can vary by consensus client and should follow that client’s current guide',
        'Yes; every consensus client must always dial the Gateway',
        'Yes; only the Validator Client can dial the Gateway',
        'No; connection direction is controlled by the mump2p topic name',
      ],
      correctOption: 0,
      explanation:
        'Optimum’s client connection instructions are client-specific. Follow the correct version’s guidance rather than transferring one client’s dial direction or flags to another.',
      hint: 'The Gateway connects at the consensus networking layer, where client implementations differ.',
    },
    {
      prompt:
        'Right after startup, `/health` returns a degraded response because the Beacon Node has not connected yet. What should the operator do?',
      options: [
        'Assume every degraded response means the Gateway is corrupted',
        'Check the client-specific peer settings, reachable address, peer IDs, and startup sequence, then recheck once the CL peer connects',
        'Send the Validator Client directly to a mesh peer',
        'Disable the Beacon API',
      ],
      correctOption: 1,
      explanation:
        'The docs note that health may be degraded before the CL peer connects. Verify the expected peer path and investigate persistent failure using the documented checks.',
      hint: 'Consider whether this is an initial state or a persistent problem.',
    },
    {
      prompt:
        'A Gateway log says it observed a consensus message and passed it toward mump2p. What does that prove?',
      options: [
        'That every remote Beacon Node accepted the message',
        'That a Validator Client received the message directly from Gateway',
        'That the message was included in a canonical block',
        'Only that the local Gateway reached that step; later mesh delivery and Beacon Node processing need separate evidence',
      ],
      correctOption: 3,
      explanation:
        'A message path has multiple boundaries. A local observe/forward event does not prove remote delivery, consensus acceptance, or validator inclusion.',
      hint: 'A log at one boundary is not a receipt from every later boundary.',
    },
  ],
  signal: [
    {
      prompt:
        'A teammate says, “Signal is the peer that forwards blocks between my Beacon Node and Optimum.” Which correction best matches the documentation?',
      options: [
        'Signal replaces the Beacon Node and runs consensus',
        'Signal is the broader Gateway/networking offering; Signal Console and Verify provide setup and external checks, while the Gateway process is the P2P component on the Beacon Node-to-mesh path',
        'Signal is the mump2p node inside every Validator Client',
        'Signal is a special libp2p topic that carries every block',
      ],
      correctOption: 1,
      explanation:
        'Signal refers to the broader Gateway/networking offering. Signal Console and Verify provide operator setup and external checks; the Gateway process is the P2P participant that carries supported messages.',
      hint: 'Distinguish Signal overall from its Console interface and the Gateway process.',
    },
    {
      prompt:
        'A new Gateway is starting for the first time. What does the enrollment key do, according to Signal’s setup guide?',
      options: [
        'It becomes the Gateway’s permanent peer ID',
        'It connects the Beacon Node directly to Signal',
        'It replaces the Gateway’s persistent identity directories',
        'It admits the Gateway; the Gateway creates its own identity and stores the credential it receives',
      ],
      correctOption: 3,
      explanation:
        'On first start, the Gateway creates its own keypair, enrolls with Optimum, and stores the resulting credential. Later it uses that credential, while the enrollment key is for admitting gateways.',
      hint: 'The enrollment secret and the Gateway’s own persistent identity serve different purposes.',
    },
    {
      prompt:
        'Signal says “Seen by Optimum” is failing, but the Gateway container appears to be running. What documented check is a useful next step?',
      options: [
        'Check the container and the Gateway’s outbound access, including the documented outbound 443 check',
        'Open TCP 48123 to the public internet',
        'Change the Validator Client’s validator signing key',
        'Assume the Beacon Node has already received a block',
      ],
      correctOption: 0,
      explanation:
        'The troubleshooting guide says to check that the container is running and outbound 443 is open when an enrolled Gateway has not reported recently. Port 48123 is intended for local health/metrics/API access, not public exposure.',
      hint: '“Seen” is about the Gateway reporting to Optimum, not the CL peer link.',
    },
    {
      prompt:
        'The Gateway is recently seen by Optimum, but Signal reports that blocks are not arriving at the mesh. Which network paths should the operator check?',
      options: [
        'Only the Validator Client’s Beacon API port',
        'Public access to TCP 48123',
        'Inbound TCP 33212 for the consensus client and TCP 33213 for mesh peers',
        'The browser connection to the Signal dashboard',
      ],
      correctOption: 2,
      explanation:
        'The Signal troubleshooting page points to inbound 33212 and 33213 for a Gateway seen by Optimum whose blocks are not reaching the mesh. The loopback health port should not be exposed publicly.',
      hint: 'Check the Gateway’s CL-facing and mesh-facing P2P paths.',
    },
    {
      prompt:
        'Signal shows that a Gateway was seen recently, but local `/health` reports `cl_peers` as zero. What does this tell the operator?',
      options: [
        'Signal has already confirmed that the Beacon Node is peered',
        'The Validator Client should connect to the mesh directly',
        'The Gateway is necessarily unenrolled',
        'The external Signal check cannot see the local CL peer; check Beacon Node peering and its client-specific configuration',
      ],
      correctOption: 3,
      explanation:
        'Signal Verify cannot see whether the consensus client peered with the Gateway. The local `/health` view exposes `cl_peers`; a just-started Gateway can return 503 until that peer connects.',
      hint: 'Which check runs on the Gateway host and reports `cl_peers`?',
    },
    {
      prompt:
        'Signal Verify returns “Could not check.” What is the safest interpretation?',
      options: [
        'The Gateway is definitely offline',
        'The Gateway credential was revoked',
        'The lookup did not answer; rerun the check, because this result alone does not mean the Gateway is down',
        'The Beacon Node rejected a block',
      ],
      correctOption: 2,
      explanation:
        'The docs explicitly distinguish an unanswered lookup from a failed Gateway check. Run Verify again; use other signals if the issue persists.',
      hint: 'This wording describes the check’s availability, not a Gateway state.',
    },
    {
      prompt:
        'After replacing a container, the Beacon Node can no longer reach the Gateway’s old peer ID. What should the operator investigate first?',
      options: [
        'Whether Signal’s dashboard changed the Beacon Node’s peer ID',
        'Whether the Gateway identity directories were mounted and preserved',
        'Whether the Beacon Node’s validator indices were registered',
        'Whether port 48123 was opened to the public',
      ],
      correctOption: 1,
      explanation:
        'The troubleshooting guide says a new Gateway identity can be generated when the libp2p and mump2p identity directories were not mounted. Preserve those directories across container replacement.',
      hint: 'A Gateway peer ID depends on its persisted identity data.',
    },
    {
      prompt:
        'An operator tries to open the Gateway health endpoint from another machine and gets a connection refusal. What should they do?',
      options: [
        'Run the documented health check on the Gateway host; 48123 is loopback-only by design',
        'Expose TCP 48123 to every interface',
        'Use the Validator Client as an HTTP proxy',
        'Disable the local health check and rely on a mesh peer',
      ],
      correctOption: 0,
      explanation:
        'The Signal Network page says 48123 is bound to 127.0.0.1 for health, metrics, and self-info. A remote refusal reflects that bind, not necessarily a failed Gateway.',
      hint: 'The health endpoint is deliberately local; Signal Verify is the external check.',
    },
  ],
  'block-stream': [
    {
      prompt:
        'An application team wants to read Beacon Blocks from its operator’s Gateway. What is the correct description of the Consumer Block Stream?',
      options: [
        'A validator API that signs blocks for the application',
        'A replacement for the Gateway’s mump2p mesh interface',
        'A read-only, opt-in Gateway output that is disabled by default',
        'A public endpoint that is automatically enabled for every Gateway',
      ],
      correctOption: 2,
      explanation:
        'The stream is an optional read-only feed for downstream consumers. It must be enabled; it does not replace the Gateway’s CL or mesh roles.',
      hint: 'The consumer receives blocks but does not publish them through this stream.',
    },
    {
      prompt:
        'A consumer needs the encoded block bytes so it can process them itself. Which documented mode should it request?',
      options: [
        'Raw mode, which adds the original `ssz_snappy` bytes as Base64',
        'Metadata mode, because it always contains raw block bytes',
        'Stream-only mode, which changes metadata into bytes',
        'Heartbeat mode, which includes the block payload',
      ],
      correctOption: 0,
      explanation:
        'Metadata is the default and contains event fields without block bytes. Raw mode adds the original `ssz_snappy` bytes in a Base64 `raw` field.',
      hint: 'One mode adds the encoded block body; the default mode is metadata-only.',
    },
    {
      prompt:
        'A team shares its Gateway API key with a downstream service so that service can open the block stream. What should they do instead?',
      options: [
        'Use the Gateway’s join key as the WebSocket subprotocol',
        'Disable all stream authentication',
        'Put the Gateway credential into the block-stream configuration YAML',
        'Create a consumer stream key for that service and exchange it for a short-lived JWT',
      ],
      correctOption: 3,
      explanation:
        'Consumer keys are separate from Gateway API/join credentials. A consumer exchanges its own stream key for a short-lived JWT and presents that token to the stream.',
      hint: 'The Gateway credential authenticates the Gateway; the consumer has a separate credential type.',
    },
    {
      prompt:
        'A browser WebSocket client cannot set an `Authorization` request header. Which documented approach should it use?',
      options: [
        'Put the JWT in the URL query string',
        'Offer the `optimum.stream.v1` and `bearer.<JWT>` WebSocket subprotocol values',
        'Send the Gateway API key in the first block frame',
        'Turn off authentication on a public listener',
      ],
      correctOption: 1,
      explanation:
        'The guide documents the WebSocket subprotocol mechanism for browser clients. The server negotiates the marker without echoing the token; the Gateway key is not a consumer token.',
      hint: 'The browser uses WebSocket protocol negotiation rather than a custom request header.',
    },
    {
      prompt:
        'A consumer paused while the Gateway continued producing events. It resumes and receives a `lagged` frame with a dropped count. What does that signal mean?',
      options: [
        'That consumer’s bounded connection buffer overflowed and events were dropped',
        'The Gateway stopped decoding all blocks',
        'The chain skipped exactly that many slots',
        'The consumer token was revoked',
      ],
      correctOption: 0,
      explanation:
        'A `lagged` frame reports events dropped on that connection after its buffer filled. It is not the same as skipped chain slots, and reconnecting does not replay the missing events.',
      hint: 'The lag signal describes this connection’s queue, not the chain’s slot schedule.',
    },
    {
      prompt:
        'A gRPC consumer sends transport pings every 10 seconds and receives GOAWAY `too_many_pings`. The configured minimum is the default. What is the appropriate change?',
      options: [
        'Ping more frequently so the Gateway sees the connection',
        'Disable heartbeats; they control client ping frequency',
        'Use a slower keepalive interval, no faster than the documented 20-second minimum',
        'Increase the per-consumer connection cap',
      ],
      correctOption: 2,
      explanation:
        'The default minimum accepted client ping interval is 20 seconds; faster pings can trigger GOAWAY. Heartbeats are separate in-band messages sent by the Gateway.',
      hint: 'Do not confuse server heartbeat messages with client transport pings.',
    },
    {
      prompt:
        'A gRPC consumer gets `ResourceExhausted` while opening another stream. What should the operator investigate?',
      options: [
        'Whether a block was proposed in every slot',
        'Whether the stream connection cap has been reached',
        'Whether the Gateway’s CL peer uses the consumer token',
        'Whether the raw mode has been enabled',
      ],
      correctOption: 1,
      explanation:
        'The documented gRPC error for a full connection cap is `ResourceExhausted` (WebSocket uses 503). Defaults are 256 connections globally and 8 per consumer key.',
      hint: 'This is a capacity response at connection time, not an authentication failure.',
    },
    {
      prompt:
        'An operator has no Beacon Node but wants to receive mesh blocks and expose them to consumers. Which mode matches the documentation?',
      options: [
        'Normal Gateway with stream disabled; it still serves consumers',
        'A Validator Client connected directly to mump2p',
        'A Gateway with the CL port exposed but the mesh disabled',
        '`stream_only` with `stream_enable`, which joins the mesh but skips the CL host and does not publish',
      ],
      correctOption: 3,
      explanation:
        'Stream-only mode is for a Gateway without a consensus client. It requires the stream to be enabled, still joins the mesh, and skips CL checks because no CL host is running.',
      hint: 'The setting’s name does not mean “WebSocket only”; it changes the Gateway’s CL/mesh role.',
    },
  ],
}
