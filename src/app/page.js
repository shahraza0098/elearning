// import Image from "next/image";

// export default function Home() {
//   return (
    
//   );
// }




import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
})

const INK = '#12142B'
const INK_2 = '#1D2044'
const GOLD = '#D9A441'
const TEAL = '#1F6F63'

const COURSES = [
  {
    title: 'Social Media Management',
    category: 'Social Media',
    description: 'Learn social media management, content strategy, and organic growth across platforms.',
    accent: '#D6486A',
  },
  {
    title: 'After Effects',
    category: 'Video Editing',
    description: 'Master Adobe After Effects from scratch and create stunning motion graphics.',
    accent: '#5B3FA6',
  },
  {
    title: 'AI Masterclass 2026',
    category: 'AI',
    description: 'Learn the fundamentals of Artificial Intelligence and harness modern AI tools.',
    accent: '#231A47',
  },
  {
    title: 'Amazon & Flipkart Business',
    category: 'E-commerce',
    description: 'Master Amazon & Flipkart selling with advanced product research and scaling.',
    accent: '#123B78',
  },
]

const STAGES = [
  {
    n: '01',
    title: 'Foundation',
    detail: 'Concept videos and notes anchor the basics before you touch a single problem.',
  },
  {
    n: '02',
    title: 'Practice',
    detail: 'Timed problem sets and code labs turn theory into muscle memory.',
  },
  {
    n: '03',
    title: 'Application',
    detail: 'Live mentor sessions and projects put it to work on real scenarios.',
  },
  {
    n: '04',
    title: 'Mastery',
    detail: 'Mock tests, peer review, and a completion credential that proves it stuck.',
  },
]

// Updated to match the 4 courses
const MENTORS = [
  {
    name: 'Priya Desai',
    role: 'Social Media Strategist',
    detail: 'Grew top D2C brands to 1M+ followers',
  },
  {
    name: 'Karan Malhotra',
    role: 'Senior Motion Designer',
    detail: '10+ years in commercial VFX & editing',
  },
  {
    name: 'Dr. Anita Roy',
    role: 'AI Researcher & Educator',
    detail: 'Makes complex AI concepts accessible',
  },
  {
    name: 'Rahul Jain',
    role: '7-Figure Seller',
    detail: 'Scaled multiple e-commerce brands globally',
  },
]

// Updated to reflect the relevant tracks
const TESTIMONIALS = [
  {
    quote: 'The Social Media module completely changed how I look at content pacing and strategy. My engagement is up 3x.',
    name: 'Sneha, Freelance Marketer',
  },
  {
    quote: 'I finally understand motion graphics. The After Effects labs are incredibly hands-on and practical.',
    name: 'Aman, Video Editor',
  },
  {
    quote: 'The AI tools taught here cut my workflow time in half. Practical, straightforward, and no fluff.',
    name: 'Rohan, Product Manager',
  },
]

export default function HomePage() {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-[family-name:var(--font-body)] text-[#20233F] bg-white`}
    >
      <style>{`
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .rise-in {
          animation: rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .rise-in {
            animation: none;
          }
        }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md"
        style={{ backgroundColor: `${INK}E6` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-wide text-white">
              Gyan Master
            </span>
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {['Courses', 'How it works', 'Mentors', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium text-white/70 transition hover:text-white">
              Sign in
            </a>
            <a
              href="#"
              className="rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: GOLD, color: INK }}
            >
              Start free trial
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <details className="group md:hidden">
            <summary className="flex cursor-pointer list-none text-white [&::-webkit-details-marker]:hidden">
              <span className="block group-open:hidden">
                <IconMenu />
              </span>
              <span className="hidden group-open:block">
                <IconClose />
              </span>
            </summary>

            <div className="absolute left-0 right-0 top-full border-b border-white/10 px-6 py-6 shadow-xl" style={{ backgroundColor: INK }}>
              <nav className="flex flex-col gap-6">
                {['Courses', 'How it works', 'Mentors', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-base font-medium text-white/80 transition hover:text-white"
                  >
                    {item}
                  </a>
                ))}
                <div className="h-px w-full bg-white/10 my-2" />
                <a href="#" className="text-base font-medium text-white/80 hover:text-white">
                  Sign in
                </a>
                <a
                  href="#"
                  className="inline-block w-full text-center rounded-full px-4 py-3 text-base font-semibold"
                  style={{ backgroundColor: GOLD, color: INK }}
                >
                  Start free trial
                </a>
              </nav>
            </div>
          </details>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 20% 0%, ${INK_2} 0%, ${INK} 70%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
          <div className="rise-in">
            <span
              className="inline-block rounded-full bg-white/5 px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              Guided mastery paths
            </span>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.15] text-white sm:text-6xl">
              Every subject has a summit.
              <br />
              <span className="text-white/90">We build the staircase.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Structured courses, live mentors, and doubt-clearing sessions
              that take you from first principles to full command — one
              clear step at a time.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:opacity-95"
                style={{ backgroundColor: GOLD, color: INK }}
              >
                Start free trial
              </a>
              <a
                href="#how-it-works"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/5"
              >
                See how it works
                <span className="transition-transform group-hover:translate-x-1">
                  <IconArrowRight />
                </span>
              </a>
            </div>

            <dl className="mt-16 grid max-w-md grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                ['40k+', 'learners'],
                ['180+', 'mentors'],
                ['4', 'courses'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                    {value}
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-white/50">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* SIGNATURE: mastery staircase */}
          <div className="relative hidden items-end justify-center md:flex" aria-hidden="true">
            <div className="flex items-end gap-4">
              {STAGES.map((stage, i) => (
                <div key={stage.n} className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors">
                    {stage.n}
                  </span>
                  <div
                    className="w-16 rounded-t-xl shadow-[0_0_30px_rgba(0,0,0,0.2)] transition-all"
                    style={{
                      height: `${90 + i * 50}px`,
                      background:
                        i === STAGES.length - 1
                          ? `linear-gradient(180deg, ${GOLD}, #b38531)`
                          : `linear-gradient(180deg, ${TEAL}${66 + i * 20}, ${TEAL}${33 + i * 15})`,
                    }}
                  />
                  <span className="max-w-[72px] text-center font-[family-name:var(--font-display)] text-xs font-medium leading-tight text-white/60">
                    {stage.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl text-center md:text-left">
          <span
            className="font-[family-name:var(--font-mono)] text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: TEAL }}
          >
            Curriculum
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-[#12142B]">
            Four courses. Every one shipped, not stubbed.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course) => (
            <div
              key={course.title}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className="relative flex h-48 items-end p-6 transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(145deg, ${course.accent}, ${course.accent}E6)`,
                }}
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative z-10 font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-white drop-shadow-md">
                  {course.title}
                </span>
              </div>

              <div className="flex flex-1 flex-col bg-white p-6 relative z-20">
                <span className="w-fit rounded-full bg-gray-100 px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                  {course.category}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {course.description}
                </p>
                <div className="mt-6 mt-auto">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#12142B] hover:opacity-70 transition-opacity">
                    View Syllabus <IconArrowRight />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: '#F8F9FA' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span
              className="font-[family-name:var(--font-mono)] text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              The path
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-[#12142B]">
              Four stages, in this order, every time
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              No track skips a step. Mastery is measured, not assumed.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {STAGES.map((stage) => (
              <div key={stage.n} className="group relative border-t-4 pt-6 transition-colors" style={{ borderColor: GOLD }}>
                <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-gray-400 group-hover:text-[#12142B] transition-colors">
                  {stage.n}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[#12142B]">
                  {stage.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <section id="mentors" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <span
            className="font-[family-name:var(--font-mono)] text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: TEAL }}
          >
            Mentors
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-[#12142B]">
            Learn from people who still do the work
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORS.map((m) => (
            <div key={m.name} className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-xl font-bold text-white shadow-sm"
                style={{ backgroundColor: INK }}
              >
                {m.name.split(' ').map((p) => p[0]).join('')}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#12142B]">
                {m.name}
              </h3>
              <p className="mt-2 font-medium text-gray-800">{m.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5"
              >
                <div>
                  <svg className="mb-4 h-8 w-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="font-[family-name:var(--font-display)] text-lg font-medium leading-relaxed text-[#12142B]">
                    "{t.quote}"
                  </p>
                </div>
                <cite className="mt-8 flex items-center gap-3 not-italic">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-gray-500">
                    {t.name}
                  </span>
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 md:py-32" style={{ backgroundColor: INK }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-5xl">
            Your summit is closer than the syllabus makes it look.
          </h2>
          <p className="text-lg text-white/70 max-w-xl">
            Join thousands of learners mastering real-world skills with guided instruction.
          </p>
          <a
            href="#"
            className="mt-4 rounded-full px-8 py-4 text-base font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: GOLD, color: INK }}
          >
            Start your free trial today
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16" style={{ backgroundColor: INK_2 }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-white tracking-wide">
              Gyan Master
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Structured learning paths for technical fields, business, and the creative skills in between.
            </p>
          </div>
          {[
            { title: 'Platform', links: ['Courses', 'Mentors', 'Pricing'] },
            { title: 'Company', links: ['About', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Terms', 'Privacy', 'Refunds'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm font-medium text-white/60 transition hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-white/40">
          <p>© {new Date().getFullYear()} Gyan Master. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* --- icons (inline, no external deps) --- */

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}