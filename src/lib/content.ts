export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  tags: string[];
  summary: string;
  context: string;
  role: string;
  discovery: string;
  decisionFramework: string;
  whatIBuilt: string;
  outcomes: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fourvenues",
    company: "Fourvenues",
    title: "Lanzando un nuevo producto SaaS vertical desde cero",
    tags: ["B2B SaaS", "0→1", "Discovery to delivery", "Roadmap", "Cross-functional"],
    summary:
      "Liderando el 0→1 de un producto SaaS vertical, desde la primera conversación de discovery hasta la entrega en producción.",
    context:
      "Fourvenues detectó una oportunidad dentro de su vertical que ningún producto existente cubría bien. No había un producto todavía, solo una hipótesis de negocio y un mercado que se movía rápido. El reto no era construir rápido, era construir lo correcto sin un histórico de datos internos en el que apoyarse.",
    role:
      "Product Manager al frente del 0→1: desde la definición del problema hasta la priorización del roadmap y la coordinación día a día con diseño, ingeniería y el equipo comercial.",
    discovery:
      "Entrevistas con clientes actuales y prospects, sombra en llamadas comerciales para entender objeciones reales, y análisis de cómo los usuarios resolvían el problema hoy con herramientas improvisadas (spreadsheets, procesos manuales). El objetivo era encontrar el trabajo que la gente ya intentaba hacer, no inventar uno nuevo.",
    decisionFramework:
      "Prioricé por dos ejes: frecuencia del dolor y coste de no resolverlo. Descarté features que sonaban bien en una llamada pero que ningún cliente pedía dos veces. Cada línea del roadmap tenía que responder a una pregunta: ¿qué decisión de negocio permite tomar esto que hoy no se puede tomar?",
    whatIBuilt:
      "El roadmap inicial del producto, los flujos core de la primera versión, y el sistema de discovery continuo con el equipo comercial para que el feedback de cliente llegara a producto sin fricción.",
    outcomes:
      "Sin métricas exactas que compartir todavía — el producto sigue en fase temprana. El aprendizaje principal: en 0→1 el roadmap más valioso es el que se atreve a no incluir cosas. Decir que no pronto ahorra meses después.",
  },
  {
    slug: "nailted",
    company: "Nailted",
    title: "Rediseño de onboarding y mejora del engagement semanal",
    tags: ["B2B2C", "Activation", "Retention", "Discovery"],
    summary:
      "Rediseño del flujo de onboarding y del ciclo de engagement semanal para que los equipos adoptaran el producto más allá de la primera semana.",
    context:
      "El producto se vendía bien pero la adopción real dentro de cada equipo (el uso semanal, no solo el login inicial) era desigual. Algunos equipos lo convertían en hábito, otros lo abandonaban tras la novedad inicial.",
    role:
      "Responsable de onboarding y engagement: research, diseño del flujo, y coordinación con diseño e ingeniería para el rediseño.",
    discovery:
      "Análisis de comportamiento en producto para ver dónde se caía la gente, combinado con entrevistas a HR managers (los compradores) y a empleados (los usuarios reales) — porque en B2B2C el que compra y el que usa no siempre quieren lo mismo.",
    decisionFramework:
      "Prioricé cambios que redujeran la distancia entre 'me registro' y 'entiendo por qué esto importa cada semana', por encima de añadir funcionalidad nueva. Descarté rediseños visuales que no atacaban la causa real de abandono.",
    whatIBuilt:
      "Un onboarding por pasos ajustado al rol (HR manager vs. empleado) y un rediseño del ciclo semanal para que la interacción se sintiera como parte del ritmo del equipo, no como una tarea más.",
    outcomes:
      "Mejora observable en la adopción semanal, sin cifra exacta que pueda compartir. Aprendizaje clave: en B2B2C hay que diseñar para dos audiencias con motivaciones distintas a la vez, no asumir que resolver para una resuelve para la otra.",
  },
  {
    slug: "cuatroochenta",
    company: "Soluciones Cuatroochenta",
    title: "Gestión de múltiples líneas de producto en un entorno de consultoría",
    tags: ["B2B", "Full lifecycle", "Squad lead", "Tailor-made solutions"],
    summary:
      "Liderazgo de squad gestionando varias líneas de producto a medida para distintos clientes, cada uno con su propio contexto y restricciones.",
    context:
      "Entorno de consultoría: cada cliente traía su propio problema, su propio stakeholder y su propia definición de éxito. No había un único producto que optimizar, sino varios en paralelo, cada uno compitiendo por el mismo equipo.",
    role: "Squad lead: full lifecycle de producto para varias cuentas a la vez.",
    discovery:
      "Discovery adaptado a cada cliente — en consultoría no hay un proceso único que valga para todos. Se trataba de entender rápido qué información era señal y qué era ruido en cada contexto nuevo.",
    decisionFramework:
      "Prioricé entre líneas de producto usando el mismo criterio siempre: impacto real en el negocio del cliente frente a coste de oportunidad del equipo compartido. Descarté peticiones que resolvían un síntoma puntual de un cliente sin encajar con el resto de la cartera.",
    whatIBuilt:
      "Sistemas y procesos de priorización que permitían al mismo squad servir a varios clientes sin perder foco, y roadmaps a medida ajustados a cada contrato.",
    outcomes:
      "Sin métricas exactas por cliente. Aprendizaje principal: gestionar producto en consultoría es tanto gestionar expectativas como gestionar backlog — el trade-off no es solo qué construir, es a quién decir que no esta semana.",
  },
  {
    slug: "playjoy",
    company: "PlayJoy",
    title: "App de juegos tradicionales multijugador con comunidad",
    tags: ["B2C", "Community", "Multi-platform", "Network effects"],
    summary:
      "Producto B2C de juegos tradicionales pensado para jugarse en grupo, con la comunidad como motor de crecimiento.",
    context:
      "Los juegos tradicionales (cartas, mesa, patio) tienen una ventaja que muchos juegos digitales no: ya existe una comunidad que los juega offline. El reto era llevar esa dinámica social a un producto digital sin perder lo que la hacía divertida.",
    role: "Product Manager del producto B2C, con foco en las dinámicas multijugador y de comunidad.",
    discovery:
      "Observación directa de cómo la gente juega estos juegos offline — quién invita, quién organiza, qué hace que un grupo vuelva a jugar la semana siguiente.",
    decisionFramework:
      "Prioricé features que reforzaran el efecto de red (invitar, volver a jugar con el mismo grupo) por encima de añadir más juegos al catálogo. Descarté funcionalidad que optimizaba para el jugador individual en vez de para el grupo.",
    whatIBuilt:
      "Flujos multiplataforma para crear y unirse a partidas en grupo, pensados para que organizar una partida fuera tan fácil como proponerla en un chat.",
    outcomes:
      "Sin cifras exactas para compartir. Aprendizaje: en producto con efecto de red, el usuario que importa de verdad no es el que juega, es el que organiza — diseñar para el organizador multiplica el alcance.",
  },
];

export const community = {
  name: "Valencia Product Beers",
  founded: null as string | null,
  stats: {
    members: null as number | null,
    events: null as number | null,
    avgAttendance: null as number | null,
  },
  links: {
    meetup: null as string | null,
    linkedin: null as string | null,
    instagram: null as string | null,
  },
  story:
    "Carlos fundó Valencia Product Beers para validar una hipótesis simple: que existía una comunidad de producto en Valencia que quería juntarse y compartir de verdad — harta de eventos donde siempre hay alguien vendiendo algo. El objetivo era traspasar las conexiones de LinkedIn y volverlas reales. La cerveza es solo el icebreaker.",
  framing:
    "Built Valencia's most active product community from zero — because I believed the community already existed, it just needed a real place to meet.",
  testimonials: [] as { quote: string; author: string; role: string }[],
  gallery: [] as { src: string; alt: string }[],
};

export const sideProjects = {
  remsoul: {
    name: "Remsoul",
    status: "Founder experience — detalles próximamente",
    description:
      "Carlos fue founder de Remsoul. Es también la historia detrás de su mayor aprendizaje: la lección de saber cuándo matar una idea. Los detalles completos de qué era, qué pasó y por qué, están todavía por escribir.",
  },
  articles: [] as { title: string; publication: string; url: string | null }[],
  experiments: [
    {
      name: "Prototipado rápido con IA",
      description:
        "Uso de herramientas como Replit y Lovable para proyectos personales y validación rápida de ideas — de la idea al prototipo funcional en horas, no semanas.",
    },
  ],
};

export const about = {
  bio: [
    "Senior Product Manager with 5 years of experience building digital products across B2C, B2B and B2B2C. I've shipped products in gaming, edtech, consultancy, and SaaS — always with a focus on understanding users before building solutions.",
    "I believe discovery is not a phase, it's a habit. And that the best roadmap is the one that kills the most bad ideas early.",
    "Outside work, I run Valencia Product Beers — a community I built because I was tired of fake networking events. We meet, we talk product, we drink beer. Simple.",
  ],
  skills: [
    "Product Strategy & Execution",
    "Discovery & Validation",
    "Agile / OKRs",
    "UX Research & Customer Empathy",
    "Cross-functional Team Leadership",
    "Data Analysis & Experimentation",
    "Stakeholder Communication",
  ],
  tools: [
    "Amplitude",
    "Figma",
    "Mixpanel",
    "SQL",
    "Notion",
    "Coda",
    "Jira",
    "Replit",
    "Lovable",
  ],
  experience: [
    { company: "Fourvenues", role: "Senior Product Manager", period: "Actual", location: "Valencia" },
    { company: "Nailted", role: "Product Manager", period: "", location: "Madrid" },
    { company: "Soluciones Cuatroochenta", role: "Squad Lead", period: "", location: "Castellón" },
    { company: "Kokoro Kids", role: "Product Manager", period: "", location: "Valencia" },
    { company: "PlayJoy", role: "Product Manager", period: "", location: "Valencia" },
  ],
  education: "Industrial Design & Product Development, UJI",
  languages: ["Español (nativo)", "Català (natiu)", "English (fluent)"],
  contact: {
    email: "cmiguelcorada@gmail.com",
    linkedin: null as string | null,
    cvUrl: null as string | null,
  },
};

export const credibility = [
  "Fourvenues",
  "Nailted",
  "Cuatroochenta",
  "Valencia Product Beers",
  "Remsoul",
];
