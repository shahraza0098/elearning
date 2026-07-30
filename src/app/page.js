// import Image from "next/image";

// export default function Home() {
//   return (
    
//   );
// }



import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
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
    description: 'Learn social media management, content strategy, and growth across platforms.',
    accent: '#D6486A',
  },
  {
    title: 'After Effects',
    category: 'Video Editing',
    description: 'Master Adobe After Effects from scratch and create motion graphics.',
    accent: '#5B3FA6',
  },
  {
    title: 'AI Masterclass 2026',
    category: 'AI',
    description: 'Learn the fundamentals of Artificial Intelligence and modern AI tools.',
    accent: '#231A47',
  },
  {
    title: 'Amazon & Flipkart Business',
    category: 'E-commerce',
    description: 'Master Amazon & Flipkart selling with product research and scaling.',
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

const MENTORS = [
  {
    name: 'Ananya Rao',
    role: 'Physics faculty, IIT Bombay',
    detail: '9 years coaching JEE toppers',
  },
  {
    name: 'Rohit Malhotra',
    role: 'Ex-SDE3, e-commerce platform',
    detail: 'Teaches DSA & system design',
  },
  {
    name: 'Kavya Iyer',
    role: 'Certified UX lead',
    detail: 'Mentors the product design cohort',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The staircase actually matches how I learn — I stopped skipping straight to mock tests.',
    name: 'Priyanshu, JEE aspirant',
  },
  {
    quote: 'Doubt sessions at 11pm before an exam saved me more than once.',
    name: 'Meher, NEET aspirant',
  },
  {
    quote: 'First platform where the mentor actually reviewed my code, not just ran it.',
    name: 'Devansh, DSA track',
  },
]

export default function HomePage() {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-[family-name:var(--font-body)] text-[#20233F]`}
    >
      <style jsx global>{`
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .rise-in {
          animation: rise 0.7s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .rise-in {
            animation: none;
          }
        }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur"
        style={{ backgroundColor: `${INK}E6` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span
              className="font-[family-name:var(--font-display)] text-lg font-semibold text-white"
            >
              Gyan Master
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {['Courses', 'How it works', 'Mentors', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a href="#" className="text-sm text-white/70 hover:text-white">
              Sign in
            </a>
            <a
              href="#"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#12142B] transition hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              Start free trial
            </a>
          </div>

          <details className="group md:hidden">
            <summary className="flex cursor-pointer list-none text-white [&::-webkit-details-marker]:hidden">
              <span className="block group-open:hidden">
                <IconMenu />
              </span>
              <span className="hidden group-open:block">
                <IconClose />
              </span>
            </summary>

            <div className="border-t border-white/10 px-6 py-4 absolute left-0 right-0 w-full" style={{ backgroundColor: INK }}>
              <nav className="flex flex-col gap-4">
                {['Courses', 'How it works', 'Mentors', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-white/80"
                  >
                    {item}
                  </a>
                ))}
                <a href="#" className="text-sm text-white/80">
                  Sign in
                </a>
                <a
                  href="#"
                  className="mt-2 inline-block w-fit rounded-full px-4 py-2 text-sm font-medium text-[#12142B]"
                  style={{ backgroundColor: GOLD }}
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
          background: `radial-gradient(circle at 15% 20%, ${INK_2} 0%, ${INK} 55%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />

        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="rise-in">
            <span
              className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              Guided mastery paths
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
              Every subject has a summit.
              <br />
              We build the staircase.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              Structured courses, live mentors, and doubt-clearing sessions
              that take you from first principles to full command — one
              clear step at a time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="rounded-full px-6 py-3 text-sm font-medium text-[#12142B] transition hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                Start free trial
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50"
              >
                See how it works
                <IconArrowRight />
              </a>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                ['40k+', 'learners'],
                ['180+', 'mentors'],
                ['4', 'courses'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-[family-name:var(--font-display)] text-2xl text-white">
                    {value}
                  </dt>
                  <dd className="text-xs text-white/50">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* SIGNATURE: mastery staircase */}
          <div className="relative hidden items-end justify-center md:flex" aria-hidden="true">
            <div className="flex items-end gap-3">
              {STAGES.map((stage, i) => (
                <div key={stage.n} className="flex flex-col items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-white/40">
                    {stage.n}
                  </span>
                  <div
                    className="w-16 rounded-t-md"
                    style={{
                      height: `${70 + i * 46}px`,
                      background:
                        i === STAGES.length - 1
                          ? `linear-gradient(180deg, ${GOLD}, ${GOLD}CC)`
                          : `${TEAL}${33 + i * 25}`,
                    }}
                  />
                  <span className="max-w-[64px] text-center text-[11px] leading-tight text-white/60">
                    {stage.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <span
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em]"
            style={{ color: TEAL }}
          >
            Courses
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#12142B]">
            Four courses. Every one shipped, not stubbed.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course) => (
            <div
              key={course.title}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="relative flex h-40 items-end p-4"
                style={{
                  background: `linear-gradient(160deg, ${course.accent}, ${course.accent}CC)`,
                }}
              >
                <span className="absolute right-3 top-3 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  Published
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight text-white">
                  {course.title}
                </span>
              </div>

              <div className="p-5">
                <span className="inline-block rounded-full bg-[#EEF0F6] px-3 py-1 text-xs font-medium text-[#5B6178]">
                  {course.category}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-medium text-[#12142B]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B6178]">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-6 py-24"
        style={{ backgroundColor: '#EEF0F6' }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <span
              className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              The path
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#12142B]">
              Four stages, in this order, every time
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5B6178]">
              No track skips a step. Mastery is measured, not assumed.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {STAGES.map((stage) => (
              <div key={stage.n} className="border-t-2 pt-5" style={{ borderColor: GOLD }}>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#9195AE]">
                  {stage.n}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-medium text-[#12142B]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B6178]">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <section id="mentors" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <span
            className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em]"
            style={{ color: TEAL }}
          >
            Mentors
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#12142B]">
            Learn from people who still do the work
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {MENTORS.map((m) => (
            <div key={m.name} className="rounded-2xl border border-black/5 p-6">
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-sm text-white"
                style={{ backgroundColor: INK }}
              >
                {m.name.split(' ').map((p) => p[0]).join('')}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-base font-medium text-[#12142B]">
                {m.name}
              </h3>
              <p className="mt-1 text-sm text-[#5B6178]">{m.role}</p>
              <p className="mt-1 text-xs text-[#9195AE]">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-24" style={{ backgroundColor: '#EEF0F6' }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="font-[family-name:var(--font-display)] text-base leading-relaxed text-[#12142B]">
                  “{t.quote}”
                </p>
                <cite className="mt-4 block text-xs not-italic text-[#9195AE]">
                  {t.name}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20" style={{ backgroundColor: INK }}>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            Your summit is closer than the syllabus makes it look.
          </h2>
          <a
            href="#"
            className="rounded-full px-7 py-3 text-sm font-medium text-[#12142B] transition hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Start your free trial
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-14" style={{ backgroundColor: INK_2 }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              Gyan Master
            </span>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              Structured learning paths for exams, tech, and the skills in
              between.
            </p>
          </div>
          {[
            { title: 'Platform', links: ['Courses', 'Mentors', 'Pricing'] },
            { title: 'Company', links: ['About', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Terms', 'Privacy', 'Refunds'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/60 hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Gyan Master. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

/* --- icons (inline, no external deps) --- */

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


