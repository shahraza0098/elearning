// export const metadata = {
//   title: "Terms & Conditions | GyanMaster",
//   description:
//     "Read the Terms and Conditions governing the use of GyanMaster's website and mobile application.",
// };

// export default function TermsAndConditionsPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 py-16">
//       <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg md:p-12">
//         <h1 className="mb-2 text-4xl font-bold text-gray-900">
//           Terms & Conditions
//         </h1>

//         <p className="mb-10 text-gray-500">
//           <strong>Effective Date:</strong> July 12, 2026
//         </p>

//         <p className="mb-8 leading-8 text-gray-700">
//           Welcome to <strong>GyanMaster</strong>. These Terms and Conditions
//           govern your access to and use of the GyanMaster website, mobile
//           application, and related services. By using our platform, you agree
//           to comply with these Terms.
//         </p>

//         <Section title="1. Acceptance of Terms">
//           <p>
//             By creating an account or using GyanMaster, you agree to these
//             Terms and Conditions. If you do not agree with these Terms, please
//             do not use our services.
//           </p>
//         </Section>

//         <Section title="2. User Accounts">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>You must provide accurate and complete information.</li>
//             <li>You are responsible for maintaining your account security.</li>
//             <li>You are responsible for all activities under your account.</li>
//             <li>
//               You must notify us immediately if you suspect unauthorized access.
//             </li>
//           </ul>
//         </Section>

//         <Section title="3. Course Access">
//           <p>
//             Access to courses is provided according to your purchase or active
//             subscription. Sharing your account with others is strictly
//             prohibited.
//           </p>
//         </Section>

//         <Section title="4. Payments">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Course prices are displayed before purchase.</li>
//             <li>Applicable taxes may be charged where required.</li>
//             <li>Payments are securely processed by authorized payment providers.</li>
//             <li>Failure of payment may result in suspension of access.</li>
//           </ul>
//         </Section>

//         <Section title="5. Intellectual Property">
//           <p>
//             All course videos, study materials, graphics, logos, trademarks,
//             software, and content available on GyanMaster are owned by
//             GyanMaster or its licensors and are protected by applicable
//             intellectual property laws.
//           </p>
//         </Section>

//         <Section title="6. Prohibited Activities">
//           <ul className="list-disc pl-6 space-y-2">
//             <li>Sharing or distributing course content without permission.</li>
//             <li>Recording or downloading videos without authorization.</li>
//             <li>Attempting to hack or interfere with the platform.</li>
//             <li>Using automated bots or scripts without permission.</li>
//             <li>Violating any applicable law while using our services.</li>
//           </ul>
//         </Section>

//         <Section title="7. Account Suspension">
//           <p>
//             We reserve the right to suspend or terminate accounts that violate
//             these Terms, engage in fraudulent activities, abuse our services,
//             or infringe upon the rights of others.
//           </p>
//         </Section>

//         <Section title="8. Availability of Services">
//           <p>
//             We strive to keep GyanMaster available at all times but do not
//             guarantee uninterrupted or error-free service. Maintenance,
//             technical issues, or circumstances beyond our control may result in
//             temporary service interruptions.
//           </p>
//         </Section>

//         <Section title="9. Limitation of Liability">
//           <p>
//             To the maximum extent permitted by law, GyanMaster shall not be
//             liable for any indirect, incidental, special, or consequential
//             damages arising from the use or inability to use our platform.
//           </p>
//         </Section>

//         <Section title="10. Privacy">
//           <p>
//             Your use of GyanMaster is also governed by our Privacy Policy,
//             which explains how we collect, use, and protect your information.
//           </p>
//         </Section>

//         <Section title="11. Changes to Terms">
//           <p>
//             We may update these Terms from time to time. Continued use of the
//             platform after changes become effective constitutes your acceptance
//             of the updated Terms.
//           </p>
//         </Section>

//         <Section title="12. Governing Law">
//           <p>
//             These Terms shall be governed by and interpreted in accordance with
//             the laws of India. Any disputes arising under these Terms shall be
//             subject to the jurisdiction of the competent courts in India.
//           </p>
//         </Section>

//         <Section title="13. Contact Us">
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
//           and agreed to these Terms and Conditions.
//         </div>
//       </div>
//     </main>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <section className="mb-10">
//       <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//         {title}
//       </h2>

//       <div className="space-y-4 leading-8 text-gray-700">
//         {children}
//       </div>
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
  title: "Terms & Conditions | Gyan Master",
  description: "Read the Terms and Conditions governing the use of Gyan Master's website and mobile application.",
};

export default function TermsAndConditionsPage() {
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
              Terms & Conditions
            </h1>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-sm font-semibold tracking-wider text-gray-400">
              EFFECTIVE DATE: JULY 12, 2026
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Welcome to <strong>Gyan Master</strong>. These Terms and Conditions govern your access to and use of the Gyan Master website, mobile application, and related services. By using our platform, you agree to comply with these Terms.
            </p>
          </div>

          <div className="space-y-12">
            <Section title="1. Acceptance of Terms">
              <p>
                By creating an account or using Gyan Master, you agree to these Terms and Conditions. If you do not agree with these Terms, please do not use our services.
              </p>
            </Section>

            <Section title="2. User Accounts">
              <ul className="space-y-3">
                {[
                  "You must provide accurate and complete information.",
                  "You are responsible for maintaining your account security.",
                  "You are responsible for all activities under your account.",
                  "You must notify us immediately if you suspect unauthorized access."
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: TEAL }}></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="3. Course Access">
              <p>
                Access to courses is provided according to your purchase or active subscription. Sharing your account credentials with others is strictly prohibited and may result in immediate account termination.
              </p>
            </Section>

            <Section title="4. Payments">
              <ul className="space-y-3">
                {[
                  "Course prices are clearly displayed before purchase.",
                  "Applicable taxes may be charged where required by law.",
                  "Payments are securely processed by authorized third-party payment providers.",
                  "Failure of payment may result in the suspension of course access."
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }}></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="5. Intellectual Property">
              <p>
                All course videos, study materials, graphics, logos, trademarks, software, and content available on Gyan Master are owned by Gyan Master or its licensors and are fully protected by applicable intellectual property laws.
              </p>
            </Section>

            <Section title="6. Prohibited Activities">
              <p>While using our platform, you agree NOT to engage in any of the following:</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Sharing or distributing course content without explicit permission.",
                  "Recording, capturing, or downloading videos without authorization.",
                  "Attempting to hack, disrupt, or interfere with the platform's security.",
                  "Using automated bots, scrapers, or scripts without permission.",
                  "Violating any applicable local, state, or international law while using our services."
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <IconAlert />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="7. Account Suspension">
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activities, abuse our services, or infringe upon the rights of Gyan Master or other users.
              </p>
            </Section>

            <Section title="8. Availability of Services">
              <p>
                We strive to keep Gyan Master available at all times but do not guarantee uninterrupted or error-free service. Routine maintenance, technical issues, or circumstances beyond our control may occasionally result in temporary service interruptions.
              </p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Gyan Master shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our platform or courses.
              </p>
            </Section>

            <Section title="10. Privacy">
              <p>
                Your use of Gyan Master is also governed by our <Link href="/privacy-policy" className="font-semibold underline decoration-gray-300 hover:text-[#12142B] hover:decoration-[#12142B] transition-colors">Privacy Policy</Link>, which explains how we collect, use, and protect your information.
              </p>
            </Section>

            <Section title="11. Changes to Terms">
              <p>
                We may update these Terms from time to time. Continued use of the platform after changes become effective constitutes your acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="12. Governing Law">
              <p>
                These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
              </p>
            </Section>

            <Section title="13. Contact Us">
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
              By using Gyan Master, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
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

function IconAlert() {
  return (
    <svg className="mt-1 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6486A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
}