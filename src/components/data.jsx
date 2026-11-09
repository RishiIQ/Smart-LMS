export const initialCourses = [
  {
    id: 1,
    title: "Advanced TypeScript & Design Systems",
    category: "Engineering",
    instructor: "Dr. Elena Vance",
    level: "Advanced",
    rating: 4.9,
    enrolledCount: 1420,
    price: "$149",
    image: "https://i.ytimg.com/vi/UDbmdYz1ZJk/sddefault.jpg",
    description: "Master enterprise-grade type architectures, generic constraints, conditional types, and robust atomic design systems.",
    lessons: [
      { id: 101, title: "Conditional Types & Type Inference", duration: "18 mins", content: "Deep dive into infer keyword, conditional branching in type space, and mapped types." },
      { id: 102, title: "Building Scalable Design Tokens", duration: "24 mins", content: "Structuring CSS variables, design tokens, and token-to-type synchronization." },
      { id: 103, title: "Compound Component Patterns", duration: "32 mins", content: "Implementing flexible compound components with React Context and TypeScript generics." }
    ],
    quiz: {
      title: "TypeScript & Architecture Mastery Quiz",
      questions: [
        {
          id: 1,
          question: "Which keyword is used for conditional type checking in TypeScript?",
          options: ["match", "extends", "typeof", "infer"],
          correct: 1
        },
        {
          id: 2,
          question: "What is the primary benefit of compound components?",
          options: ["Faster compilation", "Implicit state sharing and flexible composition", "Smaller bundle size", "Automatic CSS purging"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 2,
    title: "UI/UX Micro-Interactions & Motion Design",
    category: "Design",
    instructor: "Marcus Chen",
    level: "Intermediate",
    rating: 4.8,
    enrolledCount: 980,
    price: "$129",
    image: "https://www.mindpathtech.com/wp-content/uploads/2025/02/Node.js-Full-Stack-Development-Guide-1.webp",
    description: "Craft buttery-smooth micro-interactions, physics-based spring animations, and tactile feedback systems.",
    lessons: [
      { id: 201, title: "Physics of Spring Animations", duration: "20 mins", content: "Understanding stiffness, damping, and mass for natural user interfaces." },
      { id: 202, title: "Tactile Feedback & Hover States", duration: "15 mins", content: "Designing depth, elevation shifts, and responsive touch feedback." }
    ],
    quiz: {
      title: "Motion Design Principles Quiz",
      questions: [
        {
          id: 1,
          question: "Which parameter controls resistance in spring physics?",
          options: ["Stiffness", "Damping", "Velocity", "Mass"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 3,
    title: "Full-Stack Node & Distributed Systems",
    category: "Engineering",
    instructor: "Sarah Jenkins",
    level: "Advanced",
    rating: 4.9,
    enrolledCount: 2150,
    price: "$199",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3zIvTzbzMCH2Gv5WDi1AqCMiO-jXfTnxwNrzXJoYyHzdWy-Z1O-NZVp70&s=10",
    description: "Architect high-throughput event-driven microservices with Node.js, Redis, and event queues.",
    lessons: [
      { id: 301, title: "Event-Driven Architecture Fundamentals", duration: "28 mins", content: "Publish-subscribe models, message brokers, and event sourcing." },
      { id: 302, title: "Caching Strategies with Redis", duration: "22 mins", content: "Write-through vs cache-aside patterns and pub/sub messaging." }
    ],
    quiz: {
      title: "Distributed Systems Quiz",
      questions: [
        {
          id: 1,
          question: "What is the primary role of a message broker?",
          options: ["DOM rendering", "Decoupling message producers and consumers", "CSS minification", "Database indexing"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 4,
    title: "Product Strategy & Growth Metrics",
    category: "Business",
    instructor: "David Sterling",
    level: "Beginner",
    rating: 4.7,
    enrolledCount: 850,
    price: "$99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg0JujDZQ0a3vpvg0srdz_Xb9HyPChUw2zJ_o-bCKwkAoDpqAh7P8GW-Q&s=10",
    description: "Master North Star metrics, cohort retention curves, and product-led growth (PLG) loops.",
    lessons: [
      { id: 401, title: "Defining North Star Metrics", duration: "19 mins", content: "Aligning team execution with core customer value realization." },
      { id: 402, title: "Analyzing Cohort Retention", duration: "25 mins", content: "Building retention curves and identifying drop-off bottlenecks." }
    ],
    quiz: {
      title: "Product Strategy Quiz",
      questions: [
        {
          id: 1,
          question: "What does PLG stand for?",
          options: ["Public Legal Group", "Product-Led Growth", "Project Lifecycle Governance", "Performance Linked Gain"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 5,
    title: "React Server Components & Next.js Architecture",
    category: "Engineering",
    instructor: "Alex Rivera",
    level: "Advanced",
    rating: 4.9,
    enrolledCount: 1890,
    price: "$179",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-DBwhpJZYKtIPISXq218KdzYjdgHs9J-DHP_6gH2tuusTYenFe5iZbg&s=10",
    description: "Build ultra-fast web applications leveraging React Server Components, streaming SSR, and App Router paradigms.",
    lessons: [
      { id: 501, title: "Understanding Server vs Client Boundaries", duration: "22 mins", content: "When to use 'use client' and how serialization works across the network boundary." },
      { id: 502, title: "Streaming and Suspense Patterns", duration: "30 mins", content: "Incremental static regeneration and instant loading states with Suspense." }
    ],
    quiz: {
      title: "Next.js Architecture Quiz",
      questions: [
        {
          id: 1,
          question: "By default, what type of components are React components in the Next.js App Router?",
          options: ["Client Components", "Server Components", "Hybrid Components", "Legacy Components"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 6,
    title: "Design Systems & Figma Advanced Tokens",
    category: "Design",
    instructor: "Sophia Thorne",
    level: "Intermediate",
    rating: 4.8,
    enrolledCount: 1340,
    price: "$139",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    description: "Scale product design with variables, modes, auto layout nesting, and automated token pipelines.",
    lessons: [
      { id: 601, title: "Figma Variables & Theme Modes", duration: "25 mins", content: "Setting up semantic color tokens for dark and light themes." },
      { id: 602, title: "Auto Layout 5.0 Best Practices", duration: "20 mins", content: "Wrapping, absolute positioning, and responsive container configurations." }
    ],
    quiz: {
      title: "Design Systems Quiz",
      questions: [
        {
          id: 1,
          question: "What is the primary benefit of Figma variables?",
          options: ["Faster image rendering", "Dynamic multi-theme token management", "Automatic code generation", "Cloud backup compression"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 7,
    title: "Cloud Native DevOps & Kubernetes Mastery",
    category: "Engineering",
    instructor: "Liam O'Connor",
    level: "Advanced",
    rating: 4.9,
    enrolledCount: 1650,
    price: "$210",
    image: "https://img-c.udemycdn.com/course/480x270/5030480_b416_3.jpg",
    description: "Deploy, scale, and manage containerized microservices clusters with Kubernetes, Helm, and CI/CD pipelines.",
    lessons: [
      { id: 701, title: "Pod Lifecycles & Deployments", duration: "35 mins", content: "Managing replica sets, rolling updates, and health probes." },
      { id: 702, title: "Helm Charts & Configuration Management", duration: "28 mins", content: "Templating Kubernetes manifests for multi-environment deployments." }
    ],
    quiz: {
      title: "Kubernetes & DevOps Quiz",
      questions: [
        {
          id: 1,
          question: "What is the smallest deployable computing unit in Kubernetes?",
          options: ["Container", "Pod", "Cluster", "Node"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 8,
    title: "AI Product Management & LLM Integration",
    category: "Business",
    instructor: "Rachel Kincaid",
    level: "Intermediate",
    rating: 4.7,
    enrolledCount: 1120,
    price: "$159",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20231227121615/AI-Product-Management.jpg",
    description: "Navigate AI product lifecycles, prompt evaluation frameworks, RAG architectures, and monetization strategies.",
    lessons: [
      { id: 801, title: "Evaluating LLM Output Quality", duration: "22 mins", content: "Benchmarking hallucinations, latency, and token cost optimization." },
      { id: 802, title: "Retrieval-Augmented Generation (RAG) Overview", duration: "26 mins", content: "Connecting enterprise knowledge bases to foundational models." }
    ],
    quiz: {
      title: "AI Product Strategy Quiz",
      questions: [
        {
          id: 1,
          question: "What does RAG stand for in AI systems?",
          options: ["Real-time Automated Generation", "Retrieval-Augmented Generation", "Randomized Algorithm Guidance", "Rapid Application Grid"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 9,
    title: "Cybersecurity & Web Application Defense",
    category: "Engineering",
    instructor: "Vikram Malhotra",
    level: "Advanced",
    rating: 4.8,
    enrolledCount: 940,
    price: "$189",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "Harden modern web applications against OWASP Top 10 vulnerabilities, CSRF, XSS, and secure auth flows.",
    lessons: [
      { id: 901, title: "Mitigating Injection & XSS Attacks", duration: "24 mins", content: "Sanitizing inputs, Content Security Policies (CSP), and secure encoding." },
      { id: 902, title: "JWT vs Session Cookies in Production", duration: "20 mins", content: "Evaluating token storage tradeoffs and secure cookie attributes." }
    ],
    quiz: {
      title: "Web Security Quiz",
      questions: [
        {
          id: 1,
          question: "Which HTTP header helps mitigate Cross-Site Scripting (XSS)?",
          options: ["X-Frame-Options", "Content-Security-Policy", "Strict-Transport-Security", "Access-Control-Allow-Origin"],
          correct: 1
        }
      ]
    }
  },
  {
    id: 10,
    title: "Executive Business Negotiation & Leadership",
    category: "Business",
    instructor: "Claire Montgomery",
    level: "Beginner",
    rating: 4.9,
    enrolledCount: 760,
    price: "$119",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    description: "Master high-stakes negotiation tactics, stakeholder alignment, and effective engineering team leadership.",
    lessons: [
      { id: 1001, title: "Principled Negotiation Tactics", duration: "20 mins", content: "Separating people from the problem and focusing on mutual interests." },
      { id: 1002, title: "Managing Cross-Functional Stakeholders", duration: "22 mins", content: "Aligning technical roadmaps with executive business objectives." }
    ],
    quiz: {
      title: "Negotiation & Leadership Quiz",
      questions: [
        {
          id: 1,
          question: "What is the core principle of interest-based negotiation?",
          options: ["Winning every concession", "Focusing on underlying needs rather than fixed positions", "Minimizing communication", "Avoiding compromise at all costs"],
          correct: 1
        }
      ]
    }
  }
];

export const initialStudent = {
  name: "Kumar",
  email: "kumarlms.io",
  role: "Senior Frontend Engineer",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKb7QmERuuVDOOR-15Zfx2roNk8Q3VPxyN6pNC6EOY0mTkOxeg1zHivD5s&s=10",
  bio: "Specializing in resilient React architectures, TypeScript ecosystems, and high-performance UI design systems.",
  enrolledCourses: [1, 2],
  completedLessons: { 1: [101], 2: [201] },
  quizScores: { 1: { score: 100, passed: true } }
};
