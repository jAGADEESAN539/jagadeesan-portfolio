import { useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  Code2, Database, ExternalLink, Github, Linkedin, Mail, MapPin, Menu,
  MessageCircle, Send, ShieldCheck, Sparkles, Terminal, Workflow, X
} from 'lucide-react';

const skills = [
  { title: 'Frontend', icon: Code2, items: ['React.js', 'JavaScript ES6+', 'HTML5 & CSS3', 'Responsive UI'] },
  { title: 'Backend & APIs', icon: Terminal, items: ['Node.js', 'Express.js', 'REST APIs', 'JSON & authentication', 'Postman'] },
  { title: 'Data', icon: Database, items: ['PostgreSQL', 'SQL query optimization', 'Data validation', 'Reporting'] },
  { title: 'Engineering', icon: ShieldCheck, items: ['Debugging & RCA', 'Unit / API testing', 'UAT & production support', 'Agile / Scrum'] },
];

const projects = [
  {
    number: '01', type: 'BFSI · WORKFLOW PLATFORM', title: 'Loan Origination System',
    description: 'A production workflow platform for loan processing, with business validations, REST API integrations, automation, and database-driven features.',
    stack: ['JavaScript', 'Node.js', 'PostgreSQL', 'A8 Studio'],
    icon: Workflow, accent: 'mint',
    outcome: 'Workflow automation · API integration · Data validation'
  },
  {
    number: '02', type: 'HOME LOANS · LAP', title: 'HL & LAP Workflow Automation',
    description: 'Connected services and automated business checks across Home Loan and Loan Against Property processes to make loan workflows more consistent.',
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Postman'],
    icon: ShieldCheck, accent: 'blue',
    outcome: 'Automated approval steps · API reliability'
  },
  {
    number: '03', type: 'GENERATIVE AI', title: 'AI Agents & Chatbots',
    description: 'Configured prompts and refined instructions for LLM-powered conversational agents using ChatGPT and Claude to improve response quality for business use cases.',
    stack: ['Prompt Engineering', 'ChatGPT', 'Claude'],
    icon: Sparkles, accent: 'violet',
    outcome: 'Prompt design · Response quality improvement'
  },
];

const experiences = [
  {
    period: 'NOV 2025 — PRESENT', company: 'vKnowlabs', role: 'Software Engineer', current: true,
    intro: 'Building and supporting production JavaScript applications and workflow automation for Home Loan and Loan Against Property journeys.',
    bullets: [
      'Support workflows processing 500+ loan applications per month.',
      'Integrated 8+ third-party services through REST APIs, including validation and error handling.',
      'Optimized PostgreSQL data retrieval, reducing response time by 30%.',
      'Automated business validations to cut manual processing effort by 40%.',
      'Resolved 60+ production issues using API responses, logs, Grafana, and database records.'
    ]
  },
  {
    period: 'APR 2023 — OCT 2025', company: 'Autonom8', role: 'Software Engineer', current: false,
    intro: 'Developed finance workflow applications with JavaScript and A8 Studio for Two-Wheeler Loan and Refinance processes.',
    bullets: [
      'Built workflow validations and business rules across loan processing stages.',
      'Integrated and troubleshot REST APIs across 6+ processing stages.',
      'Optimized PostgreSQL queries, reducing query execution time by 30%.',
      'Implemented workflow-driven features that reduced turnaround time by 25%.',
      'Investigated and resolved 80+ production and UAT defects with cross-functional teams.'
    ]
  }
];

function SectionLabel({ children }) {
  return <div className="section-label"><span className="label-dot" />{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submitContact(event) {
    event.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to send your message.');
      setStatus({ type: 'success', text: data.message || 'Message sent successfully.' });
      setForm({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Something went wrong. Please email me directly.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Jagadeesan home"><span className="wordmark-mark">J<span>.</span></span><span className="wordmark-name">JAGADEESAN P</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          {['About', 'Expertise', 'Experience', 'Projects', 'Contact'].map((item) =>
            <button key={item} onClick={() => goTo(item.toLowerCase())}>{item}</button>
          )}
          <a className="nav-resume" href="/Jagadeesan-Resume.docx" download>Resume <ArrowUpRight size={14} /></a>
        </nav>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="pulse" /> SOFTWARE ENGINEER <span className="availability-divider">/</span> CHENNAI, INDIA</div>
            <h1>I build digital<br />systems that <span className="serif-accent">work.</span></h1>
            <p className="hero-description">I'm Jagadeesan — a Software Engineer with 3+ years of experience building JavaScript applications, REST APIs, and workflow automation for the BFSI domain.</p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => goTo('projects')}>Explore my work <ArrowDownRight size={17} /></button>
              <button className="button-quiet" onClick={() => goTo('contact')}>Let's talk <ArrowUpRight size={16} /></button>
            </div>
            <div className="hero-meta">
              <div><strong>3+</strong><span>Years in software</span></div>
              <div><strong>8+</strong><span>Service integrations</span></div>
              <div><strong>Production</strong><span>Systems & support</span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative code illustration">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-glow" />
            <div className="code-window">
              <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>developer.js</span><span className="window-lock">● LIVE</span></div>
              <div className="code-body">
                <div><span className="line-no">01</span><span className="syntax-purple">const</span> <span className="syntax-blue">developer</span> = {'{'}</div>
                <div><span className="line-no">02</span>&nbsp;&nbsp;name: <span className="syntax-green">'Jagadeesan'</span>,</div>
                <div><span className="line-no">03</span>&nbsp;&nbsp;role: <span className="syntax-green">'Software Engineer'</span>,</div>
                <div><span className="line-no">04</span>&nbsp;&nbsp;focus: [</div>
                <div><span className="line-no">05</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-green">'JavaScript'</span>,</div>
                <div><span className="line-no">06</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-green">'APIs'</span>, <span className="syntax-green">'Automation'</span></div>
                <div><span className="line-no">07</span>&nbsp;&nbsp;],</div>
                <div><span className="line-no">08</span>&nbsp;&nbsp;alwaysLearning: <span className="syntax-orange">true</span></div>
                <div><span className="line-no">09</span>{'}'};</div>
                <div className="code-cursor-row"><span className="line-no">10</span><span className="cursor" /></div>
              </div>
              <div className="window-bottom"><span><span className="status-led" /> Ready to build</span><span>UTF-8&nbsp; · &nbsp;JavaScript</span></div>
            </div>
            <div className="floating-chip chip-top"><span className="chip-icon"><Code2 size={15} /></span><span><b>Clean code</b><small>Built to scale</small></span></div>
            <div className="floating-chip chip-bottom"><span className="chip-icon chip-icon-purple"><Database size={15} /></span><span><b>Data-driven</b><small>Reliable systems</small></span></div>
            <span className="art-coordinate coordinate-one">13°04' N</span><span className="art-coordinate coordinate-two">80°16' E</span>
          </div>
          <div className="hero-bottom-note"><span>SCROLL TO EXPLORE</span><div className="scroll-line" /><span>01 / 05</span></div>
        </section>

        <section className="about section-wrap section-block" id="about">
          <div className="section-heading"><SectionLabel>01 / ABOUT ME</SectionLabel><h2>Practical engineering.<br /><span className="muted-heading">Real-world impact.</span></h2></div>
          <div className="about-content">
            <p className="about-lead">I enjoy turning complex business processes into dependable software — from API integrations and database queries to automated workflows that make everyday work simpler.</p>
            <p className="about-detail">My experience is rooted in financial technology, where accuracy, clear validation, and production stability matter. I work across development, debugging, testing, and release support, partnering with QA and business teams to deliver useful improvements.</p>
            <div className="about-tags"><span><Check size={13} /> Problem solving</span><span><Check size={13} /> API-first thinking</span><span><Check size={13} /> Continuous learning</span></div>
          </div>
        </section>

        <section className="expertise section-wrap section-block" id="expertise">
          <div className="section-heading heading-row"><div><SectionLabel>02 / EXPERTISE</SectionLabel><h2>My technical <span className="serif-accent">toolkit.</span></h2></div><p>The tools I use to build, integrate, test, and support applications.</p></div>
          <div className="skills-grid">
            {skills.map(({ title, icon: Icon, items }, index) => <article className="skill-card" key={title}>
              <div className="skill-card-top"><span className="skill-icon"><Icon size={19} /></span><span className="skill-index">0{index + 1}</span></div>
              <h3>{title}</h3><div className="skill-items">{items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>)}
          </div>
          <div className="domain-strip"><span className="domain-label">DOMAIN EXPERIENCE</span><div><span>BFSI & Fintech</span><span>Loan Origination Systems</span><span>Home Loans & LAP</span><span>Two-Wheeler Loans</span><span>Refinance</span><span>LLM-powered chatbots</span></div></div>
        </section>

        <section className="experience section-wrap section-block" id="experience">
          <div className="section-heading"><SectionLabel>03 / EXPERIENCE</SectionLabel><h2>Where I've <span className="serif-accent">made a difference.</span></h2></div>
          <div className="timeline">
            {experiences.map((job, i) => <article className="timeline-item" key={job.company}>
              <div className="timeline-rail"><span className={job.current ? 'timeline-dot active-dot' : 'timeline-dot'} />{i === 0 && <span className="timeline-line" />}</div>
              <div className="timeline-main">
                <div className="job-topline"><span className="job-period">{job.period}</span>{job.current && <span className="current-badge">CURRENT ROLE</span>}</div>
                <h3>{job.role} <span>@ {job.company}</span></h3><p className="job-intro">{job.intro}</p>
                <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
            </article>)}
          </div>
        </section>

        <section className="projects section-wrap section-block" id="projects">
          <div className="section-heading heading-row"><div><SectionLabel>04 / SELECTED WORK</SectionLabel><h2>Problems solved.<br /><span className="muted-heading">Systems improved.</span></h2></div><p>Representative work based on my professional experience. Details are kept high-level to respect business confidentiality.</p></div>
          <div className="project-list">
            {projects.map(({ number, type, title, description, stack, icon: Icon, accent, outcome }) => <article className="project-card" key={number}>
              <div className={`project-visual ${accent}`}><div className="project-visual-grid" /><div className="project-visual-icon"><Icon size={32} strokeWidth={1.3} /></div><span className="project-visual-number">{number}</span><span className="project-visual-caption">SELECTED CASE STUDY</span></div>
              <div className="project-content"><div className="project-type">{type}</div><h3>{title}</h3><p>{description}</p><div className="project-stack">{stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-outcome"><span className="outcome-mark"><Check size={13} /></span>{outcome}</div></div>
              <div className="project-number">{number}</div>
            </article>)}
          </div>
        </section>

        <section className="contact section-wrap section-block" id="contact">
          <div className="contact-panel"><div className="contact-left"><SectionLabel>05 / GET IN TOUCH</SectionLabel><h2>Have a good<br />problem to <span className="serif-accent">solve?</span></h2><p>I'm open to conversations about software engineering opportunities, collaboration, and interesting products.</p><a className="contact-email" href="mailto:jagadeeshjagan539@gmail.com"><Mail size={17} /> jagadeeshjagan539@gmail.com <ArrowUpRight size={15} /></a><div className="contact-socials"><a href="https://www.linkedin.com/in/jagadeesan-p-b88057251" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ExternalLink size={12} /></a><span><MapPin size={15} /> Chennai, India</span></div></div>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-heading"><MessageCircle size={18} /><span>Send a message</span></div>
              <label htmlFor="name">YOUR NAME</label><input id="name" name="name" autoComplete="name" minLength="2" maxLength="80" value={form.name} onChange={updateForm} placeholder="How should I call you?" required />
              <label htmlFor="email">EMAIL ADDRESS</label><input id="email" name="email" type="email" autoComplete="email" maxLength="254" value={form.email} onChange={updateForm} placeholder="you@company.com" required />
              <label htmlFor="message">MESSAGE</label><textarea id="message" name="message" minLength="10" maxLength="3000" rows="4" value={form.message} onChange={updateForm} placeholder="Tell me a little about what you have in mind..." required />
              <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={updateForm} /></div>
              {status && <p className={`form-status ${status.type}`} role="status">{status.text}</p>}
              <button className="button-primary send-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <Send size={15} /></button>
              <p className="form-footnote">Prefer email? <a href="mailto:jagadeeshjagan539@gmail.com">Write to me directly</a>.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark footer-mark" href="#home"><span className="wordmark-mark">J<span>.</span></span></a><p>Designed with intention. Built with JavaScript.</p><span>© {new Date().getFullYear()} JAGADEESAN P</span><button className="back-top" onClick={() => goTo('home')} aria-label="Back to top"><ArrowUpRight size={17} /></button></footer>
    </>
  );
}

export default App;