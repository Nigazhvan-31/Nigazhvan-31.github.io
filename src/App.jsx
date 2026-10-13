import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillsPortrait from './assets/nigazhvan-skills-crop.png';
import graduationPortrait from './assets/nigazhvan-portrait.jpg';
import SkillCards from './SkillCards';

gsap.registerPlugin(ScrollTrigger);

const skillDomains = [
  {
    title: 'AI and machine learning',
    tools: [
      ['Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'],
      ['PyTorch', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg'],
      ['TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'],
      ['OpenCV', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-plain.svg'],
      ['Pandas', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg'],
      ['NumPy', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg']
    ],
    copy: 'Building and deploying production-ready ML systems across deep learning, computer vision, and NLP with a focus on accuracy and scalability.'
  },
  {
    title: 'LLMs and agentic systems',
    tools: [['Claude'], ['RAG'], ['LangChain'], ['Vector DBs'], ['Agentic Automation'], ['MCP'], ['Prompt Engineering']],
    copy: 'Designing agentic systems and retrieval pipelines powered by Claude and modern LLMs, from prompt engineering to tool calling and vector search.'
  },
  {
    title: 'Backend engineering',
    tools: [
      ['FastAPI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'],
      ['Flask', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg'],
      ['Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'],
      ['Supabase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg']
    ],
    copy: 'Creating robust server-side logic and APIs that power scalable applications and connect AI models to useful products.'
  },
  {
    title: 'Cloud and MLOps',
    tools: [
      ['Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'],
      ['Google Cloud', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'],
      ['Airflow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg'],
      ['MLflow'], ['MLOps']
    ],
    copy: 'Deploying and operating ML systems reliably with containerisation, orchestration, and experiment tracking on modern cloud platforms.'
  },
  {
    title: 'Frontend engineering',
    tools: [
      ['React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'],
      ['TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'],
      ['JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'],
      ['Tailwind CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'],
      ['HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg']
    ],
    copy: 'Building engaging, user-friendly interfaces with modern frameworks, from the data model through to the final pixels.'
  },
  {
    title: 'Data and analytics',
    tools: [
      ['PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'],
      ['MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'],
      ['SQL'], ['Power BI'], ['ETL Pipelines'], ['Data Analytics']
    ],
    copy: 'Designing databases and data pipelines for secure, efficient storage, retrieval, transformation, and analytics.'
  },
  {
    title: 'Developer workflow',
    tools: [
      ['Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'],
      ['GitHub', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'],
      ['Jupyter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg'],
      ['VS Code', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg']
    ],
    copy: 'Managing code and experiments, collaborating effectively, and maintaining reliable delivery workflows.'
  },
  {
    title: 'Applied learning',
    tools: [['Claude Code in Action'], ['AWS Cloud Foundations'], ['Tata GenAI Data Analytics'], ['NLP with Python']],
    copy: 'Continuous, hands-on learning across the AI, data, and cloud stack.'
  },
  {
    title: 'Engineering strengths',
    tools: [['Statistical Modeling'], ['System Design'], ['Problem Solving'], ['Leadership'], ['Communication']],
    copy: 'Combining analytical depth with clear communication and practical ownership from problem framing to delivery.'
  }
];

const projects = [
  { title: 'StoodySync', type: 'AI Academic Productivity Platform', year: '2025', stack: 'ReactJS / FastAPI / Docker / LLMs', copy: 'Built a FastAPI and PostgreSQL foundation for academic data, with REST APIs for scheduling, authentication, validation, and dependable ETL workflows.', signal: 'LEARN' },
  { title: 'Emotion-Based Music Recommender', type: 'Computer Vision', year: '2024', stack: 'PyTorch / OpenCV / MediaPipe', copy: 'Built real-time facial emotion detection and connected live predictions to Spotify for deeply personal music recommendations.', signal: 'FEEL' },
  { title: 'Sports Facility Management System', type: 'Operations Platform', year: '2024', stack: 'Django / PostgreSQL / REST APIs', copy: 'Designed role-based access, an optimized booking data model, and automated workflows for a smoother facilities experience.', signal: 'MOVE' },
  { title: 'Healthcare Analytics Dashboard', type: 'Business Intelligence', year: '2025', stack: 'Power BI / Power Query / DAX', copy: 'Cleaned and modeled healthcare data into interactive reporting, validated accuracy, and surfaced operational insights.', signal: 'CARE' }
];

const experience = [
  { company: 'MetricsLand', location: 'Chennai, India', role: 'Junior AI Engineer', date: 'Aug 2026 - Present', points: ['Develop and debug Python backend integrations with APIs and data-processing workflows.', 'Automate AWS workflows with Python, Lambda, S3, and QuickSight; including dashboard data exports.', 'Customize Odoo workflows through routes, fields, triggers, and backend logic.'] },
  { company: 'ETHARA.AI', location: 'Remote, India', role: 'LLM Intern', date: 'Feb 2026 - Jun 2026', points: ['Processed and validated structured datasets for model training and evaluation.', 'Investigated errors and tested model outputs to improve dataset quality, consistency, and reliability.', 'Worked cross-functionally to deliver accurate data within project timelines.'] }
];

const views = ['profile', 'skills', 'work', 'contact'];

function viewFromHash() {
  const hash = window.location.hash.replace('#', '');
  return views.includes(hash) ? hash : 'profile';
}

export default function App() {
  const root = useRef(null);
  const [activeView, setActiveView] = useState(viewFromHash);

  const showView = (view) => {
    setActiveView(view);
    window.history.pushState(null, '', `#${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const syncView = () => setActiveView(viewFromHash());
    window.addEventListener('hashchange', syncView);
    window.addEventListener('popstate', syncView);
    return () => {
      window.removeEventListener('hashchange', syncView);
      window.removeEventListener('popstate', syncView);
    };
  }, []);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        if (activeView === 'profile') {
          gsap.from('.hero-title-line, .hero-summary, .hero-cta', { y: 26, opacity: 0, stagger: 0.09, duration: 0.7, ease: 'power3.out' });
        }

        gsap.utils.toArray('.reveal-section').forEach((section) => {
          gsap.from(section.querySelectorAll('.reveal-item'), {
            y: 28,
            opacity: 0,
            stagger: 0.08,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 78%', once: true }
          });
        });

        if (root.current?.querySelector('.timeline-progress')) {
          gsap.fromTo('.timeline-progress', { scaleY: 0 }, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.timeline', start: 'top 72%', end: 'bottom 62%', scrub: 0.6 }
          });
        }
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [activeView]);

  return (
    <>
      <a className="skip-link" href={activeView === 'profile' ? '#hero-content' : `#${activeView}-content`}>Skip to content</a>
      <main id="main-content" ref={root} tabIndex="-1" className="site-shell">
        <header className="panel navigation-panel">
          <nav className="site-nav" aria-label="Primary navigation">
            <a className="wordmark" href="#profile" aria-label="Nigazhvan home" onClick={(event) => { event.preventDefault(); showView('profile'); }}>Nigazhvan</a>
            <div className="nav-links">
              {views.map((view) => <a key={view} href={`#${view}`} aria-current={activeView === view ? 'page' : undefined} onClick={(event) => { event.preventDefault(); showView(view); }}>{view}</a>)}
            </div>
          </nav>
        </header>

        {activeView === 'profile' && <>
        <section id="top" className="panel hero-panel">
          <div id="hero-content" className="hero-grid" tabIndex="-1">
            <div className="hero-copy-block">
              <h1 className="hero-title"><span className="hero-title-line">From data</span><span className="hero-title-line hero-title-accent">to impact.</span></h1>
              <p className="hero-summary">Building reliable data workflows, intelligent backends, and useful ML products.</p>
              <a className="primary-button hero-cta" href="#work" onClick={(event) => { event.preventDefault(); showView('work'); }}>View my work</a>
            </div>
          </div>
        </section>

        <section id="about" className="panel profile-panel reveal-section">
          <header className="profile-heading reveal-item"><h2>The person behind the code.</h2></header>
          <div className="profile-grid">
            <div className="profile-story reveal-item">
              <div className="profile-portrait-frame">
                <img src={graduationPortrait} alt="Nigazhvan smiling in his graduation gown" width="1017" height="1546" loading="lazy" decoding="async" />
              </div>
              <div className="profile-copy">
                <p>I’m <strong className="name-highlight">Nigazhvan</strong>, an AI engineer focused on designing dependable data systems, intelligent backends, and applied machine-learning products. My work spans Python, SQL, data processing, ETL pipelines, and API development.</p>
                <p>I automate AWS workflows, transform and validate production data, and deliver backend services with FastAPI and PostgreSQL. I approach problems end to end, from data quality and model evaluation to reliable implementation, testing, and cross-functional delivery.</p>
              </div>
            </div>
          </div>
        </section>
        </>}

        {activeView === 'skills' &&
        <section id="skills-content" className="panel skills-panel reveal-section">
          <header className="skills-heading reveal-item">
            <h2>Engineering across the AI stack.</h2>
          </header>
          <SkillCards domains={skillDomains} portrait={skillsPortrait} />
        </section>}

        {activeView === 'work' && <>
        <section id="work-content" className="panel work-panel reveal-section">
          <header className="section-heading reveal-item"><h2>Intelligence in action.</h2><p>Selected systems built across AI, data, backend engineering, and analytics.</p></header>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal-item" key={project.title}>
                <div className="project-signal" aria-hidden="true"><span>{project.signal}</span></div>
                <div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div>
                <h3>{project.title}</h3>
                <p className="project-stack">{project.stack}</p>
                <p className="project-copy">{project.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="panel experience-panel reveal-section">
          <div className="experience-heading reveal-item"><h2>Experience.</h2><p>Built in practice.</p></div>
          <div className="timeline">
            <div className="timeline-line" aria-hidden="true"><span className="timeline-progress" /></div>
            {experience.map((job, index) => (
              <article className={`timeline-entry reveal-item timeline-entry-${index + 1}`} key={job.company}>
                <div className="timeline-node" aria-hidden="true" />
                <p className="timeline-date">{job.date}</p><h3>{job.company}</h3><p className="timeline-role">{job.role} / {job.location}</p>
                <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
        </>}

        {activeView === 'contact' &&
        <section id="contact-content" className="panel contact-panel reveal-section">
          <div className="contact-core reveal-item"><h2>Let’s connect.</h2><p>Have an AI, ML, or data challenge worth solving? I’d love to hear about it.</p></div>
          <div className="contact-rail reveal-item">
            <a href="mailto:nigalgovi@gmail.com"><span>Email</span><strong>nigalgovi@gmail.com</strong></a>
            <a href="tel:+918838265269"><span>Phone</span><strong>+91 88382 65269</strong></a>
            <a href="https://linkedin.com/in/nigazhvan-g2525" target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>nigazhvan-g2525</strong></a>
            <a href="https://github.com/Nigazhvan-31" target="_blank" rel="noreferrer"><span>GitHub</span><strong>Nigazhvan-31</strong></a>
          </div>
        </section>}
      </main>
    </>
  );
}
