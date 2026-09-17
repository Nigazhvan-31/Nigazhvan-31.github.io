import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ['Python', 'SQL', 'FastAPI', 'ReactJS', 'PyTorch', 'TensorFlow', 'OpenCV', 'AWS', 'Docker', 'PostgreSQL', 'ETL Pipelines', 'Power BI'];

const projects = [
  { title: 'StoodySync', type: 'AI Academic Productivity Platform', year: '2025', stack: 'ReactJS · FastAPI · Docker · LLMs', copy: 'Built a FastAPI and PostgreSQL foundation for academic data, with REST APIs for scheduling, authentication, validation, and dependable ETL workflows.' },
  { title: 'Emotion-Based Music Recommender', type: 'Computer Vision', year: '2024', stack: 'PyTorch · OpenCV · MediaPipe', copy: 'Built real-time facial emotion detection and connected live predictions to Spotify for deeply personal music recommendations.' },
  { title: 'Sports Facility Management System', type: 'Operations Platform', year: '2024', stack: 'Django · PostgreSQL · REST APIs', copy: 'Designed role-based access, an optimized booking data model, and automated workflows for a smoother facilities experience.' },
  { title: 'Healthcare Analytics Dashboard', type: 'Business Intelligence', year: '2025', stack: 'Power BI · Power Query · DAX', copy: 'Cleaned and modeled healthcare data into interactive reporting, validated accuracy, and surfaced operational insights.' }
];

const experience = [
  { company: 'MetricsLand', location: 'Chennai, India', role: 'Junior AI Engineer', date: 'Aug 2026 — Present', points: ['Develop and debug Python backend integrations with APIs and data-processing workflows.', 'Automate AWS workflows with Python, Lambda, S3, and QuickSight; including dashboard data exports.', 'Customize Odoo workflows through routes, fields, triggers, and backend logic.'] },
  { company: 'ETHARA.AI', location: 'Remote, India', role: 'LLM Intern', date: 'Feb 2026 — Jun 2026', points: ['Processed and validated structured datasets for model training and evaluation.', 'Investigated errors and tested model outputs to improve dataset quality, consistency, and reliability.', 'Worked cross-functionally to deliver accurate data within project timelines.'] }
];

function Web({ className = '' }) {
  return (
    <svg className={`web ${className}`} viewBox="0 0 220 220" fill="none" aria-hidden="true">
      <path d="M110 0v220M0 110h220M32 32l156 156M188 32 32 188M110 26c46 0 84 38 84 84s-38 84-84 84-84-38-84-84 38-84 84-84Zm0 22c34 0 62 28 62 62s-28 62-62 62-62-28-62-62 28-62 62-62Zm0 22c22 0 40 18 40 40s-18 40-40 40-40-18-40-40 18-40 40-40Z" />
    </svg>
  );
}

function Spider() {
  return <span className="spider" aria-hidden="true"><i /><b /></span>;
}

export default function App() {
  const root = useRef(null);
  const heroVisual = useRef(null);
  const reveal = useRef(null);
  const portrait = useRef(null);
  const [pointer, setPointer] = useState({ x: 52, y: 46 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance sequences are deliberately distinct from long-running ambient motion.
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .from('.nav-item', { y: -18, opacity: 0, stagger: 0.08, duration: 0.65 })
        .from('.hero-kicker, .hero-word', { yPercent: 105, stagger: 0.11, duration: 1.05 }, '-=0.35')
        .from('.hero-copy, .hero-actions, .hero-meta', { y: 20, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.48')
        .from('.hero-card', { scale: 0.88, rotate: -4, opacity: 0, duration: 1.1, ease: 'expo.out' }, '-=1.0');

      gsap.to('.orbital-dot', { rotate: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
      gsap.to('.micro-web', { rotate: 7, y: 8, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to('.hero-card', { y: -10, duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      const about = gsap.timeline({
        scrollTrigger: { trigger: '.about-section', start: 'top 72%', once: true }
      });
      about
        .from('.about-eyebrow', { x: -24, opacity: 0, duration: 0.55 })
        .from('.about-line', { clipPath: 'inset(0 0 100% 0)', y: 35, stagger: 0.14, duration: 0.95, ease: 'power4.out' }, '-=0.1')
        .from('.about-copy', { opacity: 0, rotateX: 18, transformOrigin: 'top center', y: 18, stagger: 0.14, duration: 0.75, ease: 'power3.out' }, '-=0.38')
        .from('.skill-pill', { scale: 0.5, opacity: 0, stagger: 0.07, duration: 0.55, ease: 'back.out(1.8)' }, '-=0.35')
        .from('.portrait-wrap', { opacity: 0, y: 58, rotate: -4, duration: 1.25, ease: 'elastic.out(1, 0.55)' }, '-=1.1');

      gsap.to('.portrait-wrap', { rotate: 2.4, duration: 4.6, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% -32%' });
      gsap.to('.portrait-halo', { scale: 1.12, opacity: 0.28, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.utils.toArray('.skill-pill').forEach((pill, i) => {
        gsap.to(pill, { y: i % 2 ? -5 : 5, duration: 2.5 + i * 0.14, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.1 });
      });

      gsap.utils.toArray('.section-reveal').forEach((section) => {
        gsap.from(section.querySelectorAll('.reveal-item'), {
          y: 38, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleMove = (event) => {
    const box = heroVisual.current.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    setPointer({ x, y });
  };

  return (
    <main ref={root} className="bg-[#f2f0ec] text-[#151515] selection:bg-[#d5292d] selection:text-white">
      <section className="hero-section relative min-h-screen overflow-hidden px-5 pb-8 pt-5 sm:px-8 lg:px-12">
        <Web className="hero-web absolute -left-16 top-24 h-72 w-72 opacity-25" />
        <Web className="micro-web absolute -right-10 top-20 h-56 w-56 opacity-20" />
        <div className="orbital-dot absolute right-[11%] top-[27%] h-28 w-28 rounded-full border border-[#d5292d]/40" />
        <nav className="relative z-10 flex items-center justify-between border-b border-black/15 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-xs">
          <a className="nav-item font-bold tracking-[0.12em]" href="#top">N<span className="text-[#d5292d]">G</span> / 26</a>
          <div className="flex gap-4 sm:gap-7"><a className="nav-item hover:text-[#d5292d]" href="#about">Profile</a><a className="nav-item hidden hover:text-[#d5292d] sm:block" href="#work">Work</a><a className="nav-item hover:text-[#d5292d]" href="mailto:nigalgovi@gmail.com">Contact</a></div>
        </nav>

        <div id="top" className="relative z-[1] mx-auto flex min-h-[calc(100vh-84px)] max-w-[1500px] flex-col justify-center pt-16 lg:pt-8">
          <p className="hero-kicker overflow-hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[#d5292d] sm:text-xs">Junior AI Engineer · Bengaluru, India</p>
          <div className="relative mt-6 max-w-6xl overflow-visible">
            <h1 className="font-display text-[clamp(4.25rem,12.5vw,12.5rem)] font-medium uppercase leading-[.74] tracking-[-0.075em]">
              <span className="hero-word block overflow-hidden">Make</span>
              <span className="hero-word block overflow-hidden pl-[8%] text-[#d5292d]">Signals</span>
              <span className="hero-word block pl-[23%]">Matter<span className="text-[#d5292d]">.</span></span>
            </h1>
            <div ref={heroVisual} onMouseMove={handleMove} className="hero-card absolute -right-4 top-[3%] hidden aspect-[3/4] w-[23%] min-w-[210px] overflow-hidden rounded-full bg-black shadow-[18px_20px_0_#d5292d] lg:block">
              <img className="h-full w-full object-cover grayscale" src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=85" alt="Abstract neural structures" />
              <div ref={reveal} className="absolute inset-0" style={{ clipPath: `circle(25% at ${pointer.x}% ${pointer.y}%)` }}><img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=85" alt="" /></div>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-white">Explore / 01</span>
            </div>
          </div>
          <div className="mt-12 grid max-w-xl gap-7 sm:ml-[8%] sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="hero-copy max-w-sm text-sm leading-relaxed text-black/65 sm:text-base">Junior AI engineer building reliable data workflows, intelligent backend systems, and useful ML-powered products.</p>
            <div className="hero-actions flex gap-3"><a href="#work" className="rounded-full bg-[#151515] px-5 py-3 font-mono text-[10px] uppercase tracking-[.15em] text-white transition hover:bg-[#d5292d]">View my work ↘</a><a href="mailto:nigalgovi@gmail.com" className="rounded-full border border-black/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[.15em] transition hover:border-[#d5292d] hover:text-[#d5292d]">Let’s talk</a></div>
          </div>
          <div className="hero-meta mt-14 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.16em] text-black/45"><span className="h-2 w-2 rounded-full bg-[#d5292d]" /> Available for select collaborations <span className="ml-auto hidden sm:block">Scroll to unspool</span></div>
        </div>
      </section>

      <section id="about" className="about-section relative overflow-hidden border-t border-black/15 bg-[#e9e6e0] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <Web className="absolute -left-16 -top-14 h-72 w-72 opacity-15" />
        <Web className="absolute -right-20 top-0 h-64 w-64 opacity-15" />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div className="pt-8">
            <div className="about-eyebrow mb-9 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.22em] text-[#d5292d]"><Spider /> 01 / The human system</div>
            <h2 className="font-display text-[clamp(4.1rem,8.5vw,8.7rem)] uppercase leading-[.77] tracking-[-.07em]">
              <span className="about-line block overflow-hidden">Built for</span><span className="about-line block overflow-hidden pl-[10%] italic">the unknown<span className="text-[#d5292d]">.</span></span>
            </h2>
            <div className="mt-12 max-w-lg space-y-5 text-[15px] leading-relaxed text-black/65 sm:text-base">
              <p className="about-copy">I’m Nigazhvan, a Junior AI Engineer with a practical foundation in Python, SQL, data processing, ETL pipelines, and backend development.</p>
              <p className="about-copy">I build automated AWS workflows, transform and validate datasets, and develop reliable backend solutions with FastAPI and PostgreSQL. I enjoy solving data problems with thoughtful engineering, quality assurance, and collaborative delivery.</p>
            </div>
            <div className="mt-10 flex max-w-xl flex-wrap gap-2.5">{skills.map((skill) => <span className="skill-pill rounded-full border border-black/15 bg-[#f2f0ec]/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[.09em]" key={skill}>{skill}</span>)}</div>
          </div>
          <div className="relative flex min-h-[500px] items-end justify-center lg:min-h-[650px]">
            <div className="absolute left-1/2 top-0 h-[28%] w-px bg-black/35" />
            <div ref={portrait} className="portrait-wrap relative mt-[13%] aspect-square w-[min(84vw,490px)] rounded-full border border-[#d5292d]/40 p-3">
              <div className="portrait-halo absolute inset-0 rounded-full bg-[#d5292d]/20 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-full border-[7px] border-[#151515] bg-[#151515]"><img className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85" alt="Collaborative technology team" /></div>
              <div className="absolute -bottom-6 right-[9%] flex h-20 w-20 items-center justify-center rounded-full bg-[#d5292d] font-mono text-[9px] uppercase leading-tight tracking-[.12em] text-white">Reliable<br />always</div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-reveal relative overflow-hidden bg-[#151515] px-5 py-24 text-[#f2f0ec] sm:px-8 lg:px-12 lg:py-36">
        <Web className="absolute -right-20 -top-20 h-80 w-80 opacity-20 [stroke:#f2f0ec]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="reveal-item flex items-end justify-between border-b border-white/20 pb-8"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#e84c4f]">02 / Selected work</p><h2 className="font-display mt-4 text-[clamp(3.8rem,8vw,8rem)] uppercase leading-[.78] tracking-[-.07em]">Things I’ve<br /><span className="italic">built.</span></h2></div><span className="hidden font-mono text-[10px] uppercase tracking-[.2em] text-white/45 sm:block">Data to decision</span></div>
          <div className="grid lg:grid-cols-2">{projects.map((project, index) => <article key={project.title} className="reveal-item group border-b border-white/15 py-9 lg:pr-12 [&:nth-child(odd)]:lg:border-r [&:nth-child(odd)]:lg:pr-12 [&:nth-child(even)]:lg:pl-12"><div className="flex justify-between font-mono text-[10px] uppercase tracking-[.16em] text-[#e84c4f]"><span>0{index + 1} / {project.type}</span><span>{project.year}</span></div><h3 className="mt-9 text-3xl font-semibold tracking-[-.045em] transition group-hover:text-[#e84c4f] sm:text-4xl">{project.title}</h3><p className="mt-3 font-mono text-[10px] uppercase tracking-[.12em] text-white/50">{project.stack}</p><p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">{project.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section-reveal relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <Web className="absolute -left-20 bottom-0 h-72 w-72 opacity-15" />
        <div className="relative mx-auto grid max-w-[1400px] gap-20 lg:grid-cols-[.8fr_1.2fr]">
          <div className="reveal-item"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#d5292d]">03 / Experience</p><h2 className="font-display mt-5 text-[clamp(3.8rem,7vw,7.5rem)] uppercase leading-[.78] tracking-[-.07em]">In the<br /><span className="italic">field.</span></h2></div>
          <div>{experience.map((job) => <article key={job.company} className="reveal-item border-t border-black/20 py-8 first:pt-0"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><h3 className="text-2xl font-semibold tracking-[-.04em]">{job.company}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#d5292d]">{job.role} · {job.location}</p></div><p className="font-mono text-[10px] uppercase tracking-[.12em] text-black/50">{job.date}</p></div><ul className="mt-6 space-y-2 text-sm leading-relaxed text-black/65">{job.points.map((point) => <li className="flex gap-3" key={point}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d5292d]" />{point}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section className="section-reveal border-t border-black/15 bg-[#d5292d] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.8fr_1.2fr]"><div className="reveal-item"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-white/70">04 / Education + contact</p><h2 className="font-display mt-5 text-[clamp(3.6rem,7vw,7rem)] uppercase leading-[.78] tracking-[-.07em]">Always<br /><span className="italic">learning.</span></h2></div><div className="reveal-item divide-y divide-white/30 border-y border-white/30"><div className="py-6"><p className="text-xl font-semibold">M.Sc. Artificial Intelligence and Machine Learning</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.15em] text-white/70">Christ Deemed to be University · Bengaluru, Karnataka · Jun 2024 — May 2026</p></div><div className="py-6"><p className="text-xl font-semibold">B.Sc. Statistics</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.15em] text-white/70">PSG College of Arts and Science · Coimbatore, Tamil Nadu · Jun 2020 — May 2023</p></div><div className="grid gap-3 py-6 font-mono text-[10px] uppercase tracking-[.14em] sm:grid-cols-2"><a className="transition hover:text-black" href="mailto:nigalgovi@gmail.com">nigalgovi@gmail.com</a><a className="transition hover:text-black" href="tel:+918838265269">+91 88382 65269</a><a className="transition hover:text-black" href="https://linkedin.com/in/nigazhvan-g2525" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="transition hover:text-black" href="https://github.com/Nigazhvan-31" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></div>
      </section>
    </main>
  );
}
