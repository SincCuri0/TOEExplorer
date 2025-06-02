// Data model for a theory and its criteria
export interface TheoryCriterion {
  key: string;
  label: string;
  description?: string;
}

export interface Theory {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  criteria: Record<string, string>; // key = criterion key, value = summary/score/markdown
  color?: string;
}

// Example: initial criteria (can be expanded from TOE Comparison.md)
export const CRITERIA: TheoryCriterion[] = [
  { key: "completeness", label: "Completeness (no brute contingencies)", description: "Does the theory avoid unexplained brute facts? Does it provide a reason for why reality exists as it does, or does it leave some things as just 'given'?" },
  { key: "explainsPhysics", label: "Explains Physics", description: "How well does the theory account for the existence and nature of physical laws and phenomena?" },
  { key: "explainsMathematics", label: "Explains Mathematics", description: "Does the theory explain why mathematics exists, is necessary, or applies to reality?" },
  { key: "rationalVsPoetic", label: "Rational vs. Poetic", description: "Is the theory primarily rational, logical, and systematic, or does it rely on poetic, mystical, or metaphorical elements?" },
  { key: "empiricalApplicability", label: "Empirical Applicability", description: "Can the theory be tested, observed, or confirmed by empirical means?" },
  { key: "internalConsistency", label: "Internal Consistency", description: "Is the theory free of internal contradictions and logically coherent?" },
  { key: "unificationPower", label: "Unification Power", description: "How well does the theory unify different domains (e.g., mind and matter, physics and mathematics) under a single framework?" },
  { key: "explanatoryDepth", label: "Explanatory Depth", description: "Does the theory provide deep, satisfying answers to fundamental 'why' questions, or does it stop at surface-level explanations?" },
  { key: "simplicityParsimony", label: "Simplicity & Parsimony", description: "How simple and economical is the theory in its assumptions and entities?" },
  { key: "metaphysicalNecessity", label: "Metaphysical Necessity", description: "Does the theory posit something that must exist (a necessary being or principle), or is everything contingent?" },
];

// Example: initial theory (Materialism)
export const THEORIES: Theory[] = [
  {
    id: "materialism",
    name: "Materialism / Physicalism",
    subtitle: "matter is fundamental",
    description: "Assumes physical entities/laws without further reason; leaves the existence of matter and its specific laws as brute givens (fails to answer 'Why is there something rather than nothing?').",
    criteria: {
      completeness: "Low. Assumes physical entities/laws without further reason; leaves the existence of matter and its specific laws as brute givens (fails to answer 'Why is there something rather than nothing?').",
      explainsPhysics: "Medium. Takes physics as given (the world just is physical), so it describes physical phenomena but doesn’t derive why the laws are what they are.",
      explainsMathematics: "Low. Tends to treat math as a human descriptive tool, not explaining why abstract mathematical truths exist or correspond to reality.",
      rationalVsPoetic: "Highly Rational. Emphasizes logical-empirical rigor and scientific reasoning; avoids mysticism or unverifiable assertions.",
      empiricalApplicability: "High. Forms the basis of testable science – all claims are in principle empirically checkable under physicalist assumptions.",
      internalConsistency: "High. Conceptually simple ontology (only matter); no inherent contradictions, though it struggles with explaining mind and abstract entities (a completeness issue rather than formal inconsistency).",
      unificationPower: "Low. Separates mental phenomena as mere by-products; does not unify mind with matter (the 'hard problem' of consciousness remains).",
      explanatoryDepth: "Low. Provides shallow answers for ultimate questions (e.g. treats life and mind as accidental products), offering no deeper reason why reality exists as it does.",
      simplicityParsimony: "High. Very parsimonious ontology (only one kind of substance); prefers no entities beyond the physical.",
      metaphysicalNecessity: "Low. Does not posit any necessary being or principle – everything could, in principle, have been otherwise or not existed at all (many physicalists accept brute contingency)."
    },
    color: "#3b82f6"
  },
  {
    id: "cartesian-dualism",
    name: "Cartesian Dualism",
    subtitle: "mind and matter as separate substances",
    description: "Leaves two fundamental substances unexplained (why there are both mind and matter); often relies on a deus ex machina (e.g. God) to bridge explanatory gaps (e.g. to synchronize mind and body).",
    criteria: {
      completeness: "Low. Leaves two fundamental substances unexplained (why there are both mind and matter); often relies on a deus ex machina (e.g. God) to bridge explanatory gaps (e.g. to synchronize mind and body).",
      explainsPhysics: "Low. Takes matter and its laws as a given (like materialism does) – physics is not derived from first principles, just assumed as the realm of body.",
      explainsMathematics: "Low. No special account of math beyond perhaps existing in the mind or in God’s intellect; doesn’t elucidate why mathematics so effectively describes the material world.",
      rationalVsPoetic: "High. Descartes used logical arguments and clear distinctions, but the interaction issue introduced a somewhat ad hoc element (the 'pineal gland' or divine coordination) that weakens its strict rationality.",
      empiricalApplicability: "Low. Lacks testable claims – an immaterial mind can’t be directly observed. (Interactions were posited but not empirically confirmed; modern science finds no clear evidence of non-physical causes in the brain.)",
      internalConsistency: "Medium. Conceptually inconsistent without add-ons: how can mind (non-spatial) move matter (spatial)? The classic interaction problem shows internal tension – some dualists invoked God’s intervention to make mind-body interaction work.",
      unificationPower: "Low. Splits reality into two domains without a higher unity; mind and matter remain fundamentally divided. (It solves none of the fragmentation – it creates it.)",
      explanatoryDepth: "Medium. Identifies that neither matter nor mind alone suffices (giving some depth to the mind-body problem), but doesn’t answer why the whole setup exists. Ultimate cause is often deferred to God (outside the theory’s two-substance framework).",
      simplicityParsimony: "Low. Less simple than monism – posits two ontological primitives. It adds complexity (two kinds of stuff) with no deeper explanatory payoff.",
      metaphysicalNecessity: "Low. Does not argue that mind or matter must exist; they just do. (If God is included, God is necessary, but that’s outside pure Cartesian dualism itself.)"
    },
    color: "#a855f7"
  },
  {
    id: "platonism",
    name: "Platonism (Theory of Forms / Mathematical Realism)",
    subtitle: "mathematical objects and universals are fundamental",
    description: "Eternal Forms exist without cause (they just are). The physical world is often seen as contingent or a copy shaped by Forms; while Forms themselves are necessary, the theory doesn’t fully explain why the material instantiation occurs.",
    criteria: {
      completeness: "Medium. Eternal Forms exist without cause (they just are). The physical world is often seen as contingent or a copy shaped by Forms (requiring, e.g. Plato’s Demiurge to explain its instantiation). So while Forms themselves are necessary in this view, the theory doesn’t fully explain why the material instantiation occurs.",
      explainsPhysics: "Low. Physics isn’t derived; the physical world 'participates' in Forms, but Plato’s theory doesn’t give physical laws – it explains patterns (e.g. why circles exist: imitation of the Form of Circle) but not quantitative laws of nature.",
      explainsMathematics: "High. Abstract mathematical objects and universals are the fundamental reality. Platonism inherently accounts for math’s existence (numbers, geometries exist as Forms) – mathematics is ontologically real in this view, not just invention.",
      rationalVsPoetic: "Medium. Rational in that it postulates a knowable intelligible realm of Forms accessible via reason, but 'mystical' in treating these Forms as transcendent entities grasped by a kind of intellectual insight (beyond empirical proof).",
      empiricalApplicability: "Low. Not empirically testable – one cannot physically detect the realm of Forms. Its appeals are more to intuition and logical necessity than experiment.",
      internalConsistency: "Medium. Internally coherent as a two-tier ontology (Forms vs. sensibles), but faces the 'Third Man' problem (regress in explaining the link between Forms and particulars). It’s a structured system, but the relationship between the eternal and temporal introduces philosophical puzzles rather than contradictions per se.",
      unificationPower: "Medium. Unifies particulars under universal Forms (all red things unite under 'Redness,' etc.), giving a common explanatory ground for categories. However, it splits reality into a dual realm (intelligible vs sensible) without a single underlying substance.",
      explanatoryDepth: "Medium. Deeper than materialism in that it says everyday things are shadows of deeper reality (providing an answer to why things have the properties they do — because of eternal Forms). But it leaves the question 'Why do the Forms themselves exist?' unanswered (they’re typically just assumed to exist necessarily).",
      simplicityParsimony: "Low. Posits two layers of reality and innumerable Forms — a heavy ontological commitment. (Later Neoplatonists tried to simplify by deriving all Forms from a single One, but classical Platonism itself has a multiplicity of fundamental entities.)",
      metaphysicalNecessity: "Medium. Platonic Forms are usually considered necessary (they must exist and could not be otherwise, providing an eternal blueprint for any possible world). However, the physical world is not seen as necessary in Plato’s account (it’s a 'secondary' reality)."
    },
    color: "#f59e42"
  },
  {
    id: "aristotelian-thomistic",
    name: "Aristotelian-Thomistic Metaphysics",
    subtitle: "hylomorphism, first cause, and teleology",
    description:
      "A comprehensive metaphysical system that explains reality through the concepts of form and matter, four causes, and a necessary first cause. It seeks to avoid brute contingencies via the Principle of Sufficient Reason and a hierarchy of causes culminating in a necessary prime mover.",
    criteria: {
      completeness: "High",
      explainsPhysics: "Medium",
      explainsMathematics: "Medium",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "High"
    },
    color: "#8b5cf6"
  },
  {
    id: "berkeleyan-idealism",
    name: "Berkeleyan Idealism",
    subtitle: "subjective idealism – reality as ideas in minds",
    description:
      "Eliminates matter as an independent brute fact (all 'material' things are ideas), but everything rests on God's will. Reality is upheld by a necessary infinite Mind (God), but God and finite spirits are taken as given.",
    criteria: {
      completeness: "Medium",
      explainsPhysics: "Medium",
      explainsMathematics: "Low",
      rationalVsPoetic: "Medium",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "Medium",
      explanatoryDepth: "High",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "Medium"
    },
    color: "#2dd4bf"
  },
  {
    id: "spinoza-monism",
    name: "Spinoza’s Monism",
    subtitle: "one infinite substance: 'God or Nature'",
    description:
      "Absolutely no contingencies: only one Substance exists necessarily, everything else is a mode. Nothing is unexplained outside the one Substance – it is its own reason for being.",
    criteria: {
      completeness: "High",
      explainsPhysics: "Medium",
      explainsMathematics: "Medium",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "High",
      metaphysicalNecessity: "High"
    },
    color: "#10b981"
  },
  {
    id: "panpsychism",
    name: "Panpsychism",
    subtitle: "ubiquitous consciousness in all matter",
    description:
      "Doesn’t remove usual physical contingencies, but consciousness is built in from the start. Avoids treating mind as an emergent miracle, but still faces 'why something rather than nothing?'.",
    criteria: {
      completeness: "Low/Medium",
      explainsPhysics: "Medium",
      explainsMathematics: "Low",
      rationalVsPoetic: "Medium",
      empiricalApplicability: "Low",
      internalConsistency: "Medium",
      unificationPower: "High",
      explanatoryDepth: "Medium",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "Low"
    },
    color: "#f472b6"
  },
  {
    id: "process-philosophy",
    name: "Process Philosophy",
    subtitle: "Whitehead’s process metaphysics: reality as events and relations",
    description:
      "Rejects permanent substances; everything is a dynamic process. Ultimate principles (creativity, God) are somewhat given rather than derived, so some contingency may remain.",
    criteria: {
      completeness: "Medium",
      explainsPhysics: "Medium",
      explainsMathematics: "Low",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "Low/Medium",
      metaphysicalNecessity: "Medium"
    },
    color: "#fbbf24"
  },
  {
    id: "digital-physics",
    name: "Digital Physics / Simulation Theory",
    subtitle: "reality as information or computation",
    description:
      "Often introduces an extra contingent layer (e.g. 'our universe is a program running elsewhere'). Physical laws arise from an underlying informational or computational process.",
    criteria: {
      completeness: "Low",
      explainsPhysics: "High",
      explainsMathematics: "Medium",
      rationalVsPoetic: "High",
      empiricalApplicability: "Medium",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "Medium",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "Low"
    },
    color: "#6366f1"
  },
  {
    id: "mathematical-universe",
    name: "Mathematical Universe Hypothesis (Tegmark)",
    subtitle: "reality = mathematics",
    description:
      "Abolishes contingency by asserting that every self-consistent mathematical structure exists as a universe. Our world’s existence is no longer a puzzle – it’s one of the ensemble of all mathematical realities.",
    criteria: {
      completeness: "High",
      explainsPhysics: "High",
      explainsMathematics: "High",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "Low",
      metaphysicalNecessity: "High"
    },
    color: "#84cc16"
  },
  {
    id: "ctmu",
    name: "CTMU (Cognitive-Theoretic Model of the Universe)",
    subtitle: "Langan’s self-configuring reality theory",
    description:
      "Explicitly aims to be an ultimate self-contained explanation – reality is a self-consistent logical structure that includes its own explanation. Reality is self-defined and self-caused.",
    criteria: {
      completeness: "High",
      explainsPhysics: "High",
      explainsMathematics: "High",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "High"
    },
    color: "#e11d48"
  },
  {
    id: "analytic-idealism",
    name: "Analytic Idealism (Kastrup)",
    subtitle: "reality = universal consciousness",
    description:
      "Posits a single fundamental substance: consciousness (an impersonal, universal mind). All things are manifestations of this mind. Avoids unexplained dualities or base matter.",
    criteria: {
      completeness: "High",
      explainsPhysics: "Medium",
      explainsMathematics: "Low",
      rationalVsPoetic: "Medium",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "High",
      metaphysicalNecessity: "Medium"
    },
    color: "#f43f5e"
  },
  {
    id: "my-big-toe",
    name: "Thomas Campbell’s 'My Big TOE'",
    subtitle: "Reality as a simulation by a Larger Consciousness System",
    description:
      "Proposes an encompassing reality (LCS) that necessarily exists as the fundamental being, within which our universe is a designed simulation. All things happen for a reason: to evolve consciousness.",
    criteria: {
      completeness: "High",
      explainsPhysics: "High",
      explainsMathematics: "Medium",
      rationalVsPoetic: "Medium",
      empiricalApplicability: "Medium",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "High"
    },
    color: "#0ea5e9"
  },
  {
    id: "eidomorphism",
    name: "Eidomorphism (Ontological Mathematics)",
    subtitle: "reality = 'minded' mathematical energy",
    description: "A metaphysical theory that posits reality is made of fundamental eidomorphic monads – dimensionless points defined by Euler's formula – which exist necessarily and contain the reason for all phenomena. It grounds existence in a necessary mathematical structure that avoids arbitrary axioms or unexplained contingencies.",
    criteria: {
      completeness: "High",
      explainsPhysics: "High",
      explainsMathematics: "High",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "High",
      metaphysicalNecessity: "High"
    },
    color: "#3b82f6"
  },
  {
    id: "art",
    name: "Archeonic Resonance Theory (ART)",
    subtitle: "reality = self-configuring mathematical structure based on Euler's formula",
    description: "A theory that posits a single, necessary, self-existent foundation (0=0) from which all reality deductively follows. It aims to be a 'self-contained origin of everything' that satisfies the Principle of Sufficient Reason without arbitrary assumptions or unexplained gaps.",
    criteria: {
      completeness: "High",
      explainsPhysics: "High",
      explainsMathematics: "High",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "High",
      metaphysicalNecessity: "High"
    },
    color: "#8b5cf6"
  },
  {
    id: "dmt",
    name: "Data-Logical Metaphysical Theory (DMT)",
    subtitle: "Naturalistic 'Theory of Everything' via logic and data",
    description: "A comprehensive metaphysical framework that provides a naturalistic ground for the existence of contingent objects. It posits an ultimate logical substance/structure characterized by data and logic that necessarily exists and explains itself, aiming to answer 'Why this particular world rather than another?'.",
    criteria: {
      completeness: "High",
      explainsPhysics: "High",
      explainsMathematics: "Medium",
      rationalVsPoetic: "High",
      empiricalApplicability: "Low",
      internalConsistency: "High",
      unificationPower: "High",
      explanatoryDepth: "High",
      simplicityParsimony: "High",
      metaphysicalNecessity: "High"
    },
    color: "#10b981"
  },
  {
    id: "atheism-mioism-plus",
    name: "A+theism (Mioism Plus)",
    subtitle: "reality = probabilistic meta-possibilities / sentient artifacts",
    description:
      "Claims to replace brute facts with a generative substrate (meta-possibilities/sentient artifacts), but admits foundational contingency and open issues. Posits a base entity that may be logically necessary, but lacks rigorous justification for its proto-conscious starting point.",
    criteria: {
      completeness: "Low",
      explainsPhysics: "Low",
      explainsMathematics: "Low",
      rationalVsPoetic: "Medium",
      empiricalApplicability: "Low",
      internalConsistency: "Medium",
      unificationPower: "High",
      explanatoryDepth: "Medium",
      simplicityParsimony: "Medium",
      metaphysicalNecessity: "Medium"
    },
    color: "#8b5cf6"
  }
];
