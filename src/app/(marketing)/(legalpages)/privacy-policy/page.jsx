// export const metadata = {
//   title: "Privacy Policy | GyanMaster",
//   description:
//     "Read GyanMaster's Privacy Policy to understand how we collect, use, and protect your personal information.",
// };

// export default function PrivacyPolicyPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 py-16">
//       <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg md:p-12">
//         <h1 className="mb-2 text-4xl font-bold text-gray-900">
//           Privacy Policy
//         </h1>

//         <p className="mb-10 text-gray-500">
//           <strong>Effective Date:</strong> July 12, 2026
//         </p>

//         <p className="mb-8 text-gray-700 leading-8">
//           Welcome to <strong>GyanMaster</strong>. Your privacy is important to
//           us. This Privacy Policy explains how we collect, use, store, and
//           protect your personal information when you use our website and mobile
//           application.
//         </p>

//         <Section title="1. Information We Collect">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Full Name</li>
//             <li>Email Address</li>
//             <li>Phone Number (if provided)</li>
//             <li>Profile Picture (if provided)</li>
//             <li>Authentication Information</li>
//             <li>Purchased Courses</li>
//             <li>Course Progress</li>
//             <li>Video Watch History</li>
//             <li>Device Information</li>
//             <li>IP Address</li>
//           </ul>
//         </Section>

//         <Section title="2. How We Use Your Information">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Create and manage your account.</li>
//             <li>Authenticate users securely.</li>
//             <li>Provide access to purchased courses.</li>
//             <li>Track learning progress.</li>
//             <li>Improve our platform.</li>
//             <li>Provide customer support.</li>
//             <li>Send important service notifications.</li>
//             <li>Prevent fraud and unauthorized access.</li>
//           </ul>
//         </Section>

//         <Section title="3. Course Progress">
//           <p>
//             We store your learning progress, completed lessons, watch history,
//             resume playback position, and certificates so you can continue your
//             learning seamlessly across devices.
//           </p>
//         </Section>

//         <Section title="4. Video Content">
//           <p>
//             Our platform provides video-based courses. We may collect playback
//             progress, viewing duration, and streaming analytics to improve the
//             learning experience.
//           </p>
//         </Section>

//         <Section title="5. Payment Information">
//           <p>
//             Payments are securely processed by trusted third-party payment
//             providers. We do not store your debit card, credit card, or banking
//             information on our servers.
//           </p>
//         </Section>

//         <Section title="6. Third-Party Services">
//           <p>
//             We may use trusted third-party services including:
//           </p>

//           <ul className="mt-4 list-disc pl-6 space-y-2">
//             <li>Clerk Authentication</li>
//             <li>Bunny Stream</li>
//             <li>Google Sign-In</li>
//             <li>Google Play Services</li>
//             <li>Cloud Hosting Providers</li>
//             <li>Analytics Providers</li>
//             <li>Payment Providers</li>
//           </ul>
//         </Section>

//         <Section title="7. Cookies">
//           <p>
//             Our website may use cookies and similar technologies to improve user
//             experience, remember preferences, and analyze website traffic.
//           </p>
//         </Section>

//         <Section title="8. Data Security">
//           <p>
//             We use industry-standard security measures including HTTPS
//             encryption, secure authentication, restricted access controls, and
//             secure cloud infrastructure to protect your information.
//           </p>
//         </Section>

//         <Section title="9. Data Retention">
//           <p>
//             We retain your information only as long as necessary to provide our
//             services, comply with legal obligations, resolve disputes, and
//             enforce our agreements.
//           </p>
//         </Section>

//         <Section title="10. Children's Privacy">
//           <p>
//             GyanMaster is not intended for children under 13 years of age. We do
//             not knowingly collect personal information from children.
//           </p>
//         </Section>

//         <Section title="11. Your Rights">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Access your personal information.</li>
//             <li>Update your information.</li>
//             <li>Delete your account.</li>
//             <li>Request correction of inaccurate information.</li>
//             <li>Withdraw consent where applicable.</li>
//           </ul>
//         </Section>

//         <Section title="12. Sharing of Information">
//           <p>
//             We do not sell your personal information. Information may be shared
//             only with trusted service providers, payment processors, legal
//             authorities when required, or during a business transfer.
//           </p>
//         </Section>

//         <Section title="13. Changes to This Policy">
//           <p>
//             We may update this Privacy Policy from time to time. Any changes
//             will be posted on this page with the updated effective date.
//           </p>
//         </Section>

//         <Section title="14. Contact Us">
//           <div className="rounded-lg border bg-gray-100 p-6">
//             <p>
//               <strong>GyanMaster</strong>
//             </p>

//             <p>Email: support@gyanmaster.com</p>

//             <p>Website: https://www.gyanmaster.com</p>
//           </div>
//         </Section>

//         <div className="mt-12 rounded-lg bg-blue-50 p-6 text-blue-900">
//           By using GyanMaster, you acknowledge that you have read, understood,
//           and agreed to this Privacy Policy.
//         </div>
//       </div>
//     </main>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <section className="mb-10">
//       <h2 className="mb-4 text-2xl font-semibold text-gray-900">{title}</h2>

//       <div className="space-y-4 leading-8 text-gray-700">{children}</div>
//     </section>
//   );
// }





import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import Link from 'next/link'

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
const GOLD = '#D9A441'
const TEAL = '#1F6F63'

export const metadata = {
  title: "Privacy Policy | Gyan Master",
  description: "Read Gyan Master's Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-[family-name:var(--font-body)] min-h-screen bg-[#F8F9FA] text-[#20233F]`}>
      
      {/* Header */}
      <header className="bg-white border-b border-black/5 px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-wide" style={{ color: INK }}>
              Gyan Master
            </span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#12142B] transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="rounded-3xl bg-white p-8 md:p-14 shadow-sm ring-1 ring-black/5">
          
          <div className="mb-12 border-b border-gray-100 pb-10">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#12142B]">
              Privacy Policy
            </h1>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-sm font-semibold tracking-wider text-gray-400">
              EFFECTIVE DATE: JULY 12, 2026
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Welcome to <strong>Gyan Master</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and mobile application.
            </p>
          </div>

          <div className="space-y-12">
            <Section title="1. Information We Collect">
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Full Name", "Email Address", "Phone Number (if provided)", 
                  "Profile Picture (if provided)", "Authentication Information", 
                  "Purchased Courses", "Course Progress", "Video Watch History", 
                  "Device Information", "IP Address"
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEAL }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <ul className="space-y-3">
                {[
                  "Create and manage your account.",
                  "Authenticate users securely.",
                  "Provide access to purchased courses.",
                  "Track learning progress.",
                  "Improve our platform.",
                  "Provide customer support.",
                  "Send important service notifications.",
                  "Prevent fraud and unauthorized access."
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }}></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="3. Course Progress">
              <p>
                We store your learning progress, completed lessons, watch history, resume playback position, and certificates so you can continue your learning seamlessly across devices.
              </p>
            </Section>

            <Section title="4. Video Content">
              <p>
                Our platform provides video-based courses. We may collect playback progress, viewing duration, and streaming analytics to improve the learning experience.
              </p>
            </Section>

            <Section title="5. Payment Information">
              <p>
                Payments are securely processed by trusted third-party payment providers. We do not store your debit card, credit card, or banking information on our servers.
              </p>
            </Section>

            <Section title="6. Third-Party Services">
              <p>We may use trusted third-party services including:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Clerk Authentication", "Bunny Stream", "Google Sign-In", "Google Play Services", "Cloud Hosting Providers", "Analytics Providers", "Payment Providers"].map(tag => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-gray-600 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="7. Cookies">
              <p>
                Our website may use cookies and similar technologies to improve user experience, remember preferences, and analyze website traffic.
              </p>
            </Section>

            <Section title="8. Data Security">
              <p>
                We use industry-standard security measures including HTTPS encryption, secure authentication, restricted access controls, and secure cloud infrastructure to protect your information.
              </p>
            </Section>

            <Section title="9. Data Retention">
              <p>
                We retain your information only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </Section>

            <Section title="10. Children's Privacy">
              <p>
                Gyan Master is not intended for children under 13 years of age. We do not knowingly collect personal information from children.
              </p>
            </Section>

            <Section title="11. Your Rights">
              <ul className="space-y-3">
                {["Access your personal information.", "Update your information.", "Delete your account.", "Request correction of inaccurate information.", "Withdraw consent where applicable."].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-600">
                    <IconArrowRight /> {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="12. Sharing of Information">
              <p>
                We do not sell your personal information. Information may be shared only with trusted service providers, payment processors, legal authorities when required, or during a business transfer.
              </p>
            </Section>

            <Section title="13. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.
              </p>
            </Section>

            <Section title="14. Contact Us">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[#12142B] mb-4">
                  Gyan Master
                </p>
                <div className="space-y-2 font-[family-name:var(--font-mono)] text-sm text-gray-600">
                  <p>Email: <a href="mailto:support@gyanmaster.com" className="text-[#12142B] hover:underline">support@gyanmaster.com</a></p>
                  <p>Website: <a href="https://www.gyanmaster.com" className="text-[#12142B] hover:underline">https://www.gyanmaster.com</a></p>
                </div>
              </div>
            </Section>
          </div>

          <div className="mt-12 rounded-2xl p-6 text-center shadow-inner" style={{ backgroundColor: `${INK}0A` }}>
            <p className="text-sm font-medium text-[#12142B]">
              By using Gyan Master, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[#12142B]">
        {title}
      </h2>
      <div className="space-y-4 text-lg leading-relaxed text-gray-600">
        {children}
      </div>
    </section>
  );
}

function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D9A441" strokeWidth="3">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}