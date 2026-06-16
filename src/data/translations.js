// Traducciones ES/EN — Portfolio Profesional Luis Angel Maza
const translations = {
  es: {
    nav: {
      about: 'Sobre Mí',
      services: 'Servicios',
      projects: 'Proyectos',
      skills: 'Skills',
      contact: 'Contacto'
    },
    hero: {
      badge: 'Disponible para proyectos',
      greeting: 'Hola, soy',
      name: 'Luis Angel',
      lastname: 'Maza Fontalvo',
      roles: ['Full Stack Developer', 'AI Developer', 'Automation Engineer'],
      description: 'Soy desarrollador Full Stack especializado en la creación de aplicaciones web robustas y la integración de soluciones inteligentes de IA y flujos de automatización que optimizan procesos.',
      cta: 'Ver Proyectos',
      contact: 'Contactar',
      floatingCards: ['🤖 IA & ML', '⚡ Automatización', '🔗 APIs']
    },
    about: {
      label: 'Sobre Mí',
      title: 'Construyendo el futuro con código e inteligencia artificial',
      description1: 'Soy estudiante de <highlight>Ingeniería de Software</highlight> en la Universidad de Cartagena con una pasión profunda por la <highlight>inteligencia artificial</highlight> y la <highlight>automatización de procesos</highlight>. Mi enfoque va más allá del desarrollo tradicional — busco crear soluciones que piensen, aprendan y se adapten.',
      description2: 'He trabajado en proyectos que van desde <highlight>sistemas de trading cuantitativo con IA</highlight> hasta <highlight>bots inteligentes de atención al cliente</highlight>, siempre con el objetivo de eliminar la fricción entre la tecnología y el usuario final.',
      stats: {
        projects: 'Proyectos',
        automations: 'Automatizaciones',
        apis: 'APIs Integradas',
        coffee: 'Tazas de Café'
      }
    },
    services: {
      label: 'Servicios',
      title: 'Lo que puedo hacer por tu negocio',
      subtitle: 'Me especializo en tres áreas clave que impulsan resultados reales.',
      items: [
        {
          icon: '🧠',
          title: 'Integración de IA',
          description: 'Implemento modelos de lenguaje (GPT, Claude, Gemini), visión por computadora y NLP en aplicaciones existentes. Desde chatbots inteligentes hasta análisis predictivo.'
        },
        {
          icon: '⚙️',
          title: 'Automatización de Procesos',
          description: 'Diseño flujos automatizados que eliminan tareas repetitivas. Web scraping inteligente, pipelines de datos, integración de APIs y bots de mensajería.'
        },
        {
          icon: '🚀',
          title: 'Desarrollo Full Stack',
          description: 'Construyo aplicaciones web completas con React, Node.js, Python y bases de datos. Desde el diseño UI/UX hasta el despliegue en producción.'
        }
      ]
    },
    projects: {
      label: 'Proyectos',
      title: 'Proyectos destacados',
      subtitle: 'Cada proyecto nace de un problema real y se resuelve con tecnología.',
      viewProject: 'Ver Proyecto',
      viewCode: 'Ver Código',
      items: [
        {
          category: 'IA + Trading Cuantitativo',
          title: 'Prompt Toquant',
          description: 'Sistema de prompts inteligentes para análisis cuantitativo de mercados financieros. Utiliza modelos de lenguaje para generar estrategias de trading basadas en datos históricos, indicadores técnicos y sentimiento del mercado en tiempo real.',
          process: 'Desarrollé un pipeline que conecta APIs de datos financieros (Yahoo Finance, Alpha Vantage) con GPT-4 para generar análisis técnicos automatizados. El sistema procesa datos OHLCV, calcula indicadores como RSI, MACD y Bollinger Bands, y genera reportes accionables.',
          tech: ['Python', 'OpenAI API', 'Pandas', 'FastAPI', 'React'],
          icon: '📈',
          liveUrl: 'https://github.com/luisangelmaza',
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'IA + Educación',
          title: 'ICFES AI Prep',
          description: 'Plataforma de preparación para el examen ICFES Saber 11 potenciada con inteligencia artificial. Genera preguntas adaptativas según el nivel del estudiante, identifica áreas débiles y crea planes de estudio personalizados.',
          process: 'Construí el backend con Python/Django y un frontend en React. Integré la API de OpenAI para generar preguntas tipo ICFES contextualizadas por materia. El sistema de scoring adaptativo ajusta la dificultad usando un algoritmo ELO modificado.',
          tech: ['React', 'Django', 'OpenAI API', 'PostgreSQL', 'TailwindCSS'],
          icon: '🎓',
          liveUrl: 'https://github.com/luisangelmaza',
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'Automatización + CRM',
          title: 'AutoFlow CRM',
          description: 'Sistema de automatización de flujos de trabajo para gestión de clientes. Automatiza seguimiento de leads, envío de emails personalizados, generación de reportes y sincronización con múltiples plataformas.',
          process: 'Diseñé una arquitectura basada en eventos con Node.js y Bull queues para procesar flujos asíncronos. Integré APIs de Gmail, Google Sheets y Slack para crear un ecosistema automatizado. Los flujos se configuran visualmente con un editor drag-and-drop.',
          tech: ['Node.js', 'Express', 'MongoDB', 'Redis', 'React'],
          icon: '🔄',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'IA + Content Marketing',
          title: 'AI Content Pipeline',
          description: 'Pipeline automatizado de generación y publicación de contenido. Genera artículos, posts para redes sociales e imágenes usando IA, luego programa y publica automáticamente en múltiples plataformas.',
          process: 'Combiné la API de OpenAI para generación de texto, DALL-E para imágenes, y APIs de redes sociales (Twitter, LinkedIn, Instagram) para publicación automatizada. Un scheduler con Celery gestiona la cola de publicaciones según horarios óptimos.',
          tech: ['Python', 'Celery', 'OpenAI API', 'DALL-E', 'FastAPI'],
          icon: '📝',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'IA + Automatización',
          title: 'WhatsApp Bot AI',
          description: 'Bot de WhatsApp con inteligencia artificial para atención al cliente automatizada. Comprende lenguaje natural, responde preguntas frecuentes, gestiona pedidos y escala conversaciones complejas a agentes humanos.',
          process: 'Implementé el bot usando la API de WhatsApp Business con Baileys, conectado a un backend en Node.js. El NLP se maneja con OpenAI para entender intención y contexto. Incluye un dashboard administrativo en React para monitorear conversaciones.',
          tech: ['Node.js', 'OpenAI API', 'WhatsApp API', 'MongoDB', 'React'],
          icon: '💬',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'Automatización + Data',
          title: 'Data Scraper Pro',
          description: 'Sistema de web scraping inteligente con análisis de datos automático. Extrae, limpia y analiza datos de múltiples fuentes web, generando reportes visuales y alertas automáticas cuando se detectan patrones relevantes.',
          process: 'Desarrollé scrapers con Puppeteer y Cheerio para extracción de datos, con rotación de proxies y manejo de captchas. Los datos se procesan con Pandas y se visualizan en dashboards con Recharts. Un sistema de alertas con Telegram notifica anomalías.',
          tech: ['Python', 'Puppeteer', 'Pandas', 'PostgreSQL', 'React'],
          icon: '🕷️',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        }
      ]
    },
    skills: {
      label: 'Stack Técnico',
      title: 'Tecnologías y herramientas',
      subtitle: 'Las herramientas que uso para construir soluciones robustas.',
      categories: {
        ai: { name: 'IA & Machine Learning', items: ['OpenAI API', 'LangChain', 'Hugging Face', 'TensorFlow', 'NLP', 'Prompt Engineering'] },
        frontend: { name: 'Frontend', items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind'] },
        backend: { name: 'Backend', items: ['Node.js', 'Python', 'Django', 'FastAPI', 'Express', 'REST APIs', 'GraphQL'] },
        data: { name: 'Data & Automation', items: ['Pandas', 'Puppeteer', 'Selenium', 'Celery', 'Redis', 'Web Scraping', 'ETL'] },
        database: { name: 'Bases de Datos', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Redis', 'SQL Server'] },
        tools: { name: 'DevOps & Tools', items: ['Git', 'Docker', 'GitHub Actions', 'Linux', 'AWS', 'Vercel', 'Postman'] }
      }
    },
    contact: {
      label: 'Contacto',
      title: 'Hablemos de tu proyecto',
      subtitle: '¿Tienes una idea que necesita IA o automatización? Estoy listo para ayudarte a hacerla realidad.',
      ctaTitle: '¿Listo para automatizar?',
      ctaText: 'Cuéntame sobre tu proyecto y encontraremos la mejor solución tecnológica juntos.',
      ctaButton: 'Enviar mensaje',
      links: {
        email: { label: 'Email', value: 'luisangelmaza32@gmail.com' },
        whatsapp: { label: 'WhatsApp', value: '+57 301 135 5799' },
        github: { label: 'GitHub', value: 'github.com/luisangelmaza' },
        linkedin: { label: 'LinkedIn', value: 'Luis Angel Maza' }
      }
    },
    footer: {
      designed: 'Diseñado y desarrollado por',
      rights: 'Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      badge: 'Available for projects',
      greeting: "Hi, I'm",
      name: 'Luis Angel',
      lastname: 'Maza Fontalvo',
      roles: ['Full Stack Developer', 'AI Developer', 'Automation Engineer'],
      description: 'I am a Full Stack Developer specialized in building robust web applications and integrating intelligent AI solutions and workflow automations to optimize operations.',
      cta: 'View Projects',
      contact: 'Get in Touch',
      floatingCards: ['🤖 AI & ML', '⚡ Automation', '🔗 APIs']
    },
    about: {
      label: 'About Me',
      title: 'Building the future with code and artificial intelligence',
      description1: "I'm a <highlight>Software Engineering</highlight> student at Universidad de Cartagena with a deep passion for <highlight>artificial intelligence</highlight> and <highlight>process automation</highlight>. My approach goes beyond traditional development — I aim to create solutions that think, learn, and adapt.",
      description2: "I've worked on projects ranging from <highlight>AI-powered quantitative trading systems</highlight> to <highlight>intelligent customer service bots</highlight>, always with the goal of eliminating friction between technology and the end user.",
      stats: {
        projects: 'Projects',
        automations: 'Automations',
        apis: 'APIs Integrated',
        coffee: 'Cups of Coffee'
      }
    },
    services: {
      label: 'Services',
      title: 'What I can do for your business',
      subtitle: 'I specialize in three key areas that drive real results.',
      items: [
        {
          icon: '🧠',
          title: 'AI Integration',
          description: 'I implement language models (GPT, Claude, Gemini), computer vision, and NLP into existing applications. From smart chatbots to predictive analytics.'
        },
        {
          icon: '⚙️',
          title: 'Process Automation',
          description: 'I design automated workflows that eliminate repetitive tasks. Smart web scraping, data pipelines, API integration, and messaging bots.'
        },
        {
          icon: '🚀',
          title: 'Full Stack Development',
          description: 'I build complete web applications with React, Node.js, Python, and databases. From UI/UX design to production deployment.'
        }
      ]
    },
    projects: {
      label: 'Projects',
      title: 'Featured projects',
      subtitle: 'Each project is born from a real problem and solved with technology.',
      viewProject: 'View Project',
      viewCode: 'View Code',
      items: [
        {
          category: 'AI + Quantitative Trading',
          title: 'Prompt Toquant',
          description: 'Intelligent prompt system for quantitative financial market analysis. Uses language models to generate trading strategies based on historical data, technical indicators, and real-time market sentiment.',
          process: 'I developed a pipeline connecting financial data APIs (Yahoo Finance, Alpha Vantage) with GPT-4 to generate automated technical analysis. The system processes OHLCV data, calculates indicators like RSI, MACD, and Bollinger Bands, and generates actionable reports.',
          tech: ['Python', 'OpenAI API', 'Pandas', 'FastAPI', 'React'],
          icon: '📈',
          liveUrl: 'https://github.com/luisangelmaza',
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'AI + Education',
          title: 'ICFES AI Prep',
          description: 'AI-powered preparation platform for the ICFES Saber 11 exam. Generates adaptive questions based on student level, identifies weak areas, and creates personalized study plans.',
          process: 'Built the backend with Python/Django and a React frontend. Integrated the OpenAI API to generate contextualized ICFES-style questions by subject. The adaptive scoring system adjusts difficulty using a modified ELO algorithm.',
          tech: ['React', 'Django', 'OpenAI API', 'PostgreSQL', 'TailwindCSS'],
          icon: '🎓',
          liveUrl: 'https://github.com/luisangelmaza',
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'Automation + CRM',
          title: 'AutoFlow CRM',
          description: 'Workflow automation system for customer management. Automates lead tracking, personalized email sending, report generation, and synchronization with multiple platforms.',
          process: 'Designed an event-driven architecture with Node.js and Bull queues for asynchronous workflow processing. Integrated Gmail, Google Sheets, and Slack APIs to create an automated ecosystem. Flows are visually configured with a drag-and-drop editor.',
          tech: ['Node.js', 'Express', 'MongoDB', 'Redis', 'React'],
          icon: '🔄',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'AI + Content Marketing',
          title: 'AI Content Pipeline',
          description: 'Automated content generation and publishing pipeline. Generates articles, social media posts, and images using AI, then schedules and publishes automatically across multiple platforms.',
          process: 'Combined OpenAI API for text generation, DALL-E for images, and social media APIs (Twitter, LinkedIn, Instagram) for automated publishing. A Celery scheduler manages the publication queue based on optimal timing.',
          tech: ['Python', 'Celery', 'OpenAI API', 'DALL-E', 'FastAPI'],
          icon: '📝',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'AI + Automation',
          title: 'WhatsApp Bot AI',
          description: 'AI-powered WhatsApp bot for automated customer service. Understands natural language, answers FAQs, manages orders, and escalates complex conversations to human agents.',
          process: 'Implemented the bot using WhatsApp Business API with Baileys, connected to a Node.js backend. NLP is handled by OpenAI for intent and context understanding. Includes an admin dashboard in React for monitoring conversations.',
          tech: ['Node.js', 'OpenAI API', 'WhatsApp API', 'MongoDB', 'React'],
          icon: '💬',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        },
        {
          category: 'Automation + Data',
          title: 'Data Scraper Pro',
          description: 'Intelligent web scraping system with automatic data analysis. Extracts, cleans, and analyzes data from multiple web sources, generating visual reports and automatic alerts when relevant patterns are detected.',
          process: 'Developed scrapers with Puppeteer and Cheerio for data extraction, with proxy rotation and captcha handling. Data is processed with Pandas and visualized in dashboards with Recharts. A Telegram alert system notifies anomalies.',
          tech: ['Python', 'Puppeteer', 'Pandas', 'PostgreSQL', 'React'],
          icon: '🕷️',
          liveUrl: null,
          codeUrl: 'https://github.com/luisangelmaza'
        }
      ]
    },
    skills: {
      label: 'Tech Stack',
      title: 'Technologies and tools',
      subtitle: 'The tools I use to build robust solutions.',
      categories: {
        ai: { name: 'AI & Machine Learning', items: ['OpenAI API', 'LangChain', 'Hugging Face', 'TensorFlow', 'NLP', 'Prompt Engineering'] },
        frontend: { name: 'Frontend', items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind'] },
        backend: { name: 'Backend', items: ['Node.js', 'Python', 'Django', 'FastAPI', 'Express', 'REST APIs', 'GraphQL'] },
        data: { name: 'Data & Automation', items: ['Pandas', 'Puppeteer', 'Selenium', 'Celery', 'Redis', 'Web Scraping', 'ETL'] },
        database: { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Redis', 'SQL Server'] },
        tools: { name: 'DevOps & Tools', items: ['Git', 'Docker', 'GitHub Actions', 'Linux', 'AWS', 'Vercel', 'Postman'] }
      }
    },
    contact: {
      label: 'Contact',
      title: "Let's talk about your project",
      subtitle: "Have an idea that needs AI or automation? I'm ready to help you make it a reality.",
      ctaTitle: 'Ready to automate?',
      ctaText: "Tell me about your project and we'll find the best tech solution together.",
      ctaButton: 'Send message',
      links: {
        email: { label: 'Email', value: 'luisangelmaza32@gmail.com' },
        whatsapp: { label: 'WhatsApp', value: '+57 301 135 5799' },
        github: { label: 'GitHub', value: 'github.com/luisangelmaza' },
        linkedin: { label: 'LinkedIn', value: 'Luis Angel Maza' }
      }
    },
    footer: {
      designed: 'Designed and developed by',
      rights: 'All rights reserved.'
    }
  }
};

export default translations;
