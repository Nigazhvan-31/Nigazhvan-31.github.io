import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroArtwork from './assets/nocturne-ai-city.jpg';

gsap.registerPlugin(ScrollTrigger);

const skills = ['Python', 'SQL', 'FastAPI', 'ReactJS', 'PyTorch', 'TensorFlow', 'OpenCV', 'AWS', 'Docker', 'PostgreSQL', 'ETL Pipelines', 'Power BI'];

const projects = [
  { title: 'StoodySync', type: 'AI Academic Productivity Platform', year: '2025', stack: 'ReactJS · FastAPI · Docker · LLMs', copy: 'Built a FastAPI and PostgreSQL foundation for academic data, with REST APIs for scheduling, authentication, validation, and dependable ETL workflows.' },
  { title: 'Emotion-Based Music Recommender', type: 'Computer Vision', year: '2024', stack: 'PyTorch · OpenCV · MediaPipe', copy: 'Built real-time facial emotion detection and connected live predictions to Spotify for deeply personal music recommendations.' },
  { title: 'Sports Facility Management System', type: 'Operations Platform', year: '2024', stack: 'Django · PostgreSQL · REST APIs', copy: 'Designed role-based access, an optimized booking data model, and automated workflows for a smoother facilities experience.' },
  { title: 'Healthcare Analytics Dashboard', type: 'Business Intelligence', year: '2025', stack: 'Power BI · Power Query · DAX', copy: 'Cleaned and modeled healthcare data into interactive reporting, validated accuracy, and surfaced operational insights.' }
];

const experience = [
  { company: 'MetricsLand', location: 'Chennai, India', role: 'Junior AI Engineer', date: 'Aug 2026 - Present', points: ['Develop and debug Python backend integrations with APIs and data-processing workflows.', 'Automate AWS workflows with Python, Lambda, S3, and QuickSight; including dashboard data exports.', 'Customize Odoo workflows through routes, fields, triggers, and backend logic.'] },
  { company: 'ETHARA.AI', location: 'Remote, India', role: 'LLM Intern', date: 'Feb 2026 - Jun 2026', points: ['Processed and validated structured datasets for model training and evaluation.', 'Investigated errors and tested model outputs to improve dataset quality, consistency, and reliability.', 'Worked cross-functionally to deliver accurate data within project timelines.'] }
];

function ShadowBat() {
  return <span className="shadow-bat" aria-hidden="true" />;
}

export default function App() {
  const root = useRef(null);
  const heroVisual = useRef(null);
  const reveal = useRef(null);
  const portrait = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Entrance sequences are deliberately distinct from long-running ambient motion.
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .from('.nav-item', { y: -18, opacity: 0, stagger: 0.08, duration: 0.65 })
        .from('.hero-word', { yPercent: 105, stagger: 0.11, duration: 1.05 }, '-=0.35')
        .from('.hero-copy, .hero-actions', { y: 20, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.48')
        .from('.hero-card', { scale: 0.92, y: 32, opacity: 0, duration: 1.1, ease: 'expo.out' }, '-=0.9');

      gsap.to('.light-beam', { opacity: 0.68, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to('.hero-card', { y: -8, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      const about = gsap.timeline({
        scrollTrigger: { trigger: '.about-section', start: 'top 72%', once: true }
      });
      about
        .from('.about-line', { clipPath: 'inset(0 0 100% 0)', y: 35, stagger: 0.14, duration: 0.95, ease: 'power4.out' })
        .from('.about-copy', { opacity: 0, rotateX: 18, transformOrigin: 'top center', y: 18, stagger: 0.14, duration: 0.75, ease: 'power3.out' }, '-=0.38')
        .from('.skill-pill', { scale: 0.5, opacity: 0, stagger: 0.07, duration: 0.55, ease: 'back.out(1.8)' }, '-=0.35')
        .from('.portrait-wrap', { opacity: 0, y: 48, duration: 1.15, ease: 'power3.out' }, '-=1.1');

      gsap.to('.portrait-halo', { scale: 1.08, opacity: 0.3, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
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
    reveal.current.style.clipPath = `circle(24% at ${x}% ${y}%)`;
  };

  return (
    <main ref={root} className="bg-[#0d1219] text-[#eeece5] selection:bg-[#c8ab6b] selection:text-[#0d1219]">
      <section className="hero-section relative min-h-[100dvh] overflow-hidden bg-[#0d1219] px-5 pb-12 pt-5 sm:px-8 lg:px-12">
        <div className="light-beam pointer-events-none absolute -right-[14%] -top-[40%] h-[115%] w-[75%] opacity-35" aria-hidden="true" />
        <ShadowBat />
        <nav className="relative z-10 flex flex-col items-start justify-between gap-3 border-b border-white/15 pb-4 sm:flex-row sm:items-center">
          <blockquote className="max-w-xl text-[10px] leading-relaxed text-[#737a82] sm:text-xs">
            Why do we fall? So that we can learn to pick ourselves up.
          </blockquote>
          <div className="flex shrink-0 gap-4 font-mono text-[10px] uppercase tracking-[0.2em] sm:gap-7 sm:text-xs"><a className="nav-item hover:text-[#c8ab6b]" href="#about">Profile</a><a className="nav-item hidden hover:text-[#c8ab6b] sm:block" href="#work">Work</a><a className="nav-item hover:text-[#c8ab6b]" href="#contact">Contact</a></div>
        </nav>

        <div id="top" className="relative z-[1] mx-auto grid min-h-[calc(100dvh-84px)] max-w-[1400px] items-center gap-8 py-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-12 lg:py-8">
          <div className="relative">
            <h1 className="font-display text-[clamp(3.05rem,8.4vw,8.5rem)] font-medium uppercase leading-[.86] tracking-[-0.075em]">
              <span className="hero-word block overflow-hidden whitespace-nowrap">From <span className="text-[#c8ab6b]">Data</span></span>
              <span className="hero-word block overflow-hidden whitespace-nowrap">To Impact<span className="text-[#c8ab6b]">.</span></span>
            </h1>
            <p className="hero-copy mt-8 max-w-md text-sm leading-relaxed text-[#b9bdc2] sm:text-base">Junior AI engineer building reliable data workflows, intelligent backends, and useful ML products.</p>
            <div className="hero-actions mt-8 flex flex-wrap gap-3"><a href="#work" className="rounded-full bg-[#c8ab6b] px-5 py-3 font-mono text-[10px] uppercase tracking-[.15em] text-[#10151b] transition hover:bg-[#ddc48a] active:scale-[.98]">View my work ↘</a><a href="#contact" className="rounded-full border border-[#c8ab6b]/55 px-5 py-3 font-mono text-[10px] uppercase tracking-[.15em] text-[#e4d5ae] transition hover:border-[#ddc48a] hover:text-[#ddc48a] active:scale-[.98]">Let’s talk</a></div>
          </div>
          <div ref={heroVisual} onMouseMove={handleMove} className="hero-card relative mx-auto aspect-[3/4] w-[min(72vw,410px)] overflow-hidden rounded-b-md rounded-t-[13rem] border border-[#c8ab6b]/45 bg-[#161b22] shadow-[18px_18px_0_rgba(200,171,107,.13)] lg:mr-0">
              <img className="h-full w-full object-cover grayscale" src={heroArtwork} alt="Nocturnal city skyline with a glowing AI network above the rooftops" fetchPriority="high" />
              <div ref={reveal} className="absolute inset-0" style={{ clipPath: 'circle(24% at 52% 46%)' }}><img className="h-full w-full object-cover" src={heroArtwork} alt="" aria-hidden="true" /></div>
            </div>
        </div>
      </section>

      <section id="about" className="about-section relative overflow-hidden border-t border-white/10 bg-[#171d25] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="light-beam pointer-events-none absolute -left-[35%] top-[-35%] h-[90%] w-[80%] rotate-[-20deg] opacity-20" aria-hidden="true" />
        <ShadowBat />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div className="pt-8">
            <h2 className="font-display text-[clamp(3.15rem,6.6vw,7.25rem)] uppercase leading-[.9] tracking-[-.07em]">
              <span className="about-line block overflow-hidden">The person</span><span className="about-line block overflow-hidden pl-[6%] text-[#c8ab6b]">behind the code.</span>
            </h2>
            <div className="mt-12 max-w-lg space-y-5 text-[15px] leading-relaxed text-[#b9bdc2] sm:text-base">
              <p className="about-copy">I’m Nigazhvan, a Junior AI Engineer with a practical foundation in Python, SQL, data processing, ETL pipelines, and backend development.</p>
              <p className="about-copy">I build automated AWS workflows, transform and validate datasets, and develop reliable backend solutions with FastAPI and PostgreSQL. I enjoy solving data problems with thoughtful engineering, quality assurance, and collaborative delivery.</p>
            </div>
            <div className="mt-10 flex max-w-xl flex-wrap gap-2.5">{skills.map((skill) => <span className="skill-pill rounded-full border border-[#c8ab6b]/25 bg-[#242b34] px-4 py-2 font-mono text-[10px] uppercase tracking-[.09em] text-[#ddcfae]" key={skill}>{skill}</span>)}</div>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[600px]">
            <div ref={portrait} className="portrait-wrap relative aspect-square w-[min(84vw,490px)] rounded-full border border-[#c8ab6b]/55 p-3">
              <div className="portrait-halo absolute inset-0 rounded-full bg-[#c8ab6b]/20 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-full border-[7px] border-[#0d1219] bg-[#0d1219]"><img className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85" alt="Collaborative technology team" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-reveal relative overflow-hidden bg-[#0f151c] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <ShadowBat />
        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="reveal-item font-display border-b border-[#c8ab6b]/25 pb-9 text-[clamp(3.2rem,6.7vw,7rem)] uppercase leading-[.9] tracking-[-.07em]">Intelligence <span className="text-[#c8ab6b]">in action.</span></h2>
          <div className="grid lg:grid-cols-2">{projects.map((project) => <article key={project.title} className="reveal-item group border-b border-[#c8ab6b]/20 py-9 lg:pr-12 [&:nth-child(odd)]:lg:border-r [&:nth-child(even)]:lg:pl-12"><div className="flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#c8ab6b]"><span>{project.type}</span><span>{project.year}</span></div><h3 className="mt-9 text-3xl font-semibold tracking-[-.045em] transition group-hover:text-[#c8ab6b] sm:text-4xl">{project.title}</h3><p className="mt-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#a5a9ae]">{project.stack}</p><p className="mt-6 max-w-lg text-sm leading-relaxed text-[#b9bdc2] sm:text-base">{project.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section-reveal relative overflow-hidden bg-[#151b23] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <ShadowBat />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div className="reveal-item">
            <h2 className="font-display text-[clamp(3.5rem,7vw,7rem)] uppercase leading-[.9] tracking-[-.07em]">Experience<span className="text-[#c8ab6b]">.</span></h2>
            <p className="mt-5 font-mono text-xs uppercase tracking-[.22em] text-[#c8ab6b] sm:text-sm">Built in practice.</p>
          </div>
          <div>{experience.map((job) => <article key={job.company} className="reveal-item border-t border-[#c8ab6b]/25 py-8 first:pt-0"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><h3 className="text-2xl font-semibold tracking-[-.04em]">{job.company}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#c8ab6b]">{job.role} · {job.location}</p></div><p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#a5a9ae]">{job.date}</p></div><ul className="mt-6 space-y-2 text-sm leading-relaxed text-[#b9bdc2]">{job.points.map((point) => <li className="flex gap-3" key={point}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8ab6b]" />{point}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section className="section-reveal relative overflow-hidden border-t border-[#c8ab6b]/20 bg-[#1b222b] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <ShadowBat />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="reveal-item font-display text-[clamp(3.5rem,7vw,7rem)] uppercase leading-[.9] tracking-[-.07em]">Always <span className="text-[#c8ab6b]">learning.</span></h2>
          <div className="reveal-item divide-y divide-[#c8ab6b]/25 border-y border-[#c8ab6b]/25">
            <div className="py-6"><p className="text-xl font-semibold">M.Sc. Artificial Intelligence and Machine Learning</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#a5a9ae]">Christ Deemed to be University · Bengaluru, Karnataka · Jun 2024 - May 2026</p></div>
            <div className="py-6"><p className="text-xl font-semibold">B.Sc. Statistics</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#a5a9ae]">PSG College of Arts and Science · Coimbatore, Tamil Nadu · Jun 2020 - May 2023</p></div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-reveal relative overflow-hidden bg-[#0c1118] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <ShadowBat />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-24">
          <div className="reveal-item">
            <h2 className="font-display text-[clamp(4rem,8vw,8rem)] uppercase leading-[.9] tracking-[-.07em]">Let’s <span className="text-[#c8ab6b]">connect.</span></h2>
            <p className="mt-9 max-w-md text-sm leading-relaxed text-[#b9bdc2] sm:text-base">Have an AI, ML, or data challenge worth solving? I’d love to hear about it.</p>
            <a href="mailto:nigalgovi@gmail.com" className="mt-8 inline-flex rounded-full bg-[#c8ab6b] px-6 py-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#10151b] transition hover:bg-[#ddc48a] active:scale-[.98]">Email me ↗</a>
          </div>
          <div className="reveal-item divide-y divide-[#c8ab6b]/25 border-y border-[#c8ab6b]/25">
            <a className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between" href="mailto:nigalgovi@gmail.com"><span className="font-mono text-[10px] uppercase tracking-[.17em] text-[#c8ab6b]">Email</span><span className="text-base transition group-hover:text-[#c8ab6b] sm:text-lg">nigalgovi@gmail.com ↗</span></a>
            <a className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between" href="tel:+918838265269"><span className="font-mono text-[10px] uppercase tracking-[.17em] text-[#c8ab6b]">Phone</span><span className="text-base transition group-hover:text-[#c8ab6b] sm:text-lg">+91 88382 65269 ↗</span></a>
            <a className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between" href="https://linkedin.com/in/nigazhvan-g2525" target="_blank" rel="noreferrer"><span className="font-mono text-[10px] uppercase tracking-[.17em] text-[#c8ab6b]">LinkedIn</span><span className="text-base transition group-hover:text-[#c8ab6b] sm:text-lg">nigazhvan-g2525 ↗</span></a>
            <a className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between" href="https://github.com/Nigazhvan-31" target="_blank" rel="noreferrer"><span className="font-mono text-[10px] uppercase tracking-[.17em] text-[#c8ab6b]">GitHub</span><span className="text-base transition group-hover:text-[#c8ab6b] sm:text-lg">Nigazhvan-31 ↗</span></a>
          </div>
        </div>
        <blockquote className="reveal-item relative mx-auto mt-20 max-w-[1400px] border-t border-white/10 pt-5 text-right text-xs leading-relaxed text-[#737a82]">
          “It’s not who I am underneath, but what I do that defines me.”
        </blockquote>
      </section>
    </main>
  );
}
