// export const metadata = {
//   title: "Delete Account | Gyan Master",
//   description: "Request deletion of your Gyan Master account and associated data.",
// };

// export default function DeleteAccountPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 py-16 px-6">
//       <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
//         <h1 className="mb-6 text-4xl font-bold text-gray-900">
//           Delete Your Gyan Master Account
//         </h1>

//         <p className="mb-6 text-gray-700 leading-7">
//           At <strong>Gyan Master</strong>, we respect your privacy and give you
//           control over your personal data. If you no longer wish to use Gyan
//           Master, you may request the deletion of your account and associated
//           data.
//         </p>

//         <section className="mb-8">
//           <h2 className="mb-3 text-2xl font-semibold text-gray-900">
//             How to Request Account Deletion
//           </h2>

//           <ol className="list-decimal space-y-2 pl-6 text-gray-700">
//             <li>Send an email to <strong>support@gyanmaster.com</strong>.</li>
//             <li>
//               Use the subject line:
//               <strong> Account Deletion Request</strong>.
//             </li>
//             <li>
//               Mention the email address associated with your Gyan Master
//               account.
//             </li>
//             <li>
//               Our support team will verify your request and process it as soon
//               as possible.
//             </li>
//           </ol>
//         </section>

//         <section className="mb-8">
//           <h2 className="mb-3 text-2xl font-semibold text-gray-900">
//             What Data Will Be Deleted
//           </h2>

//           <ul className="list-disc space-y-2 pl-6 text-gray-700">
//             <li>Your account profile.</li>
//             <li>Your name and email address.</li>
//             <li>Your learning progress.</li>
//             <li>Your course history associated with your account.</li>
//             <li>Other personal information linked to your account.</li>
//           </ul>
//         </section>

//         <section className="mb-8">
//           <h2 className="mb-3 text-2xl font-semibold text-gray-900">
//             Data That May Be Retained
//           </h2>

//           <p className="text-gray-700 leading-7">
//             Certain information may be retained if required by applicable laws,
//             to resolve disputes, enforce our legal agreements, prevent fraud, or
//             comply with legal obligations. Any retained information will only be
//             kept for the minimum period required by law.
//           </p>
//         </section>

//         <section className="mb-8">
//           <h2 className="mb-3 text-2xl font-semibold text-gray-900">
//             Processing Time
//           </h2>

//           <p className="text-gray-700 leading-7">
//             We aim to process verified account deletion requests within
//             <strong> 7 business days</strong>.
//           </p>
//         </section>

//         <section>
//           <h2 className="mb-3 text-2xl font-semibold text-gray-900">
//             Contact Us
//           </h2>

//           <p className="text-gray-700 leading-7">
//             If you have any questions regarding account deletion or your
//             personal data, please contact us:
//           </p>

//           <div className="mt-4 rounded-lg bg-gray-100 p-5">
//             <p>
//               <strong>Email:</strong> support@gyanmaster.com
//             </p>
//             <p>
//               <strong>Website:</strong> https://gyanmaster.com
//             </p>
//           </div>
//         </section>

//         <div className="mt-10 border-t pt-6 text-sm text-gray-500">
//           Last updated: March 2026
//         </div>
//       </div>
//     </main>
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
  title: "Delete Account | Gyan Master",
  description: "Request deletion of your Gyan Master account and associated data.",
};

export default function DeleteAccountPage() {
  return (
    <div className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-[family-name:var(--font-body)] min-h-screen bg-[#F8F9FA] text-[#20233F]`}>
      
      {/* Simple Header */}
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
            <span className="font-[family-name:var(--font-mono)] text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
              Account Management
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-[#12142B]">
              Delete Your Account
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              At <strong>Gyan Master</strong>, we respect your privacy and give you control over your personal data. If you no longer wish to use our platform, follow the steps below to request account deletion.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-bold text-[#12142B]">
              How to Request Account Deletion
            </h2>
            <div className="space-y-4">
              {[
                "Send an email to support@gyanmaster.com.",
                "Use the subject line: Account Deletion Request.",
                "Mention the email address associated with your Gyan Master account.",
                "Our support team will verify your request and process it as soon as possible."
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 font-[family-name:var(--font-mono)] text-sm font-bold text-gray-600">
                    {i + 1}
                  </div>
                  <p className="mt-1 text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <section className="rounded-2xl bg-rose-50/50 p-6 ring-1 ring-rose-100">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl font-bold text-rose-950">
                What Data Will Be Deleted
              </h2>
              <ul className="space-y-2 text-rose-900/80">
                <li className="flex items-center gap-2"><IconCheck color="#e11d48"/> Your account profile</li>
                <li className="flex items-center gap-2"><IconCheck color="#e11d48"/> Your name and email</li>
                <li className="flex items-center gap-2"><IconCheck color="#e11d48"/> Learning progress</li>
                <li className="flex items-center gap-2"><IconCheck color="#e11d48"/> Course history</li>
                <li className="flex items-center gap-2"><IconCheck color="#e11d48"/> Associated personal info</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-emerald-50/50 p-6 ring-1 ring-emerald-100">
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-xl font-bold text-emerald-950">
                Data That May Be Retained
              </h2>
              <p className="text-emerald-900/80 leading-relaxed text-sm">
                Certain information may be retained if required by applicable laws, to resolve disputes, enforce our legal agreements, prevent fraud, or comply with legal obligations. Any retained info is kept only for the minimum required period.
              </p>
            </section>
          </div>

          <section className="mb-12">
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold text-[#12142B]">
              Processing Time
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to process verified account deletion requests within <strong style={{ color: GOLD }}>7 business days</strong>.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#12142B]">
              Still have questions?
            </h2>
            <p className="mt-2 text-gray-600">
              Contact our support team for any queries regarding your personal data.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 font-[family-name:var(--font-mono)] text-sm">
              <a href="mailto:support@gyanmaster.com" className="text-[#12142B] hover:opacity-70 transition-opacity">support@gyanmaster.com</a>
              <a href="https://gyanmaster.com" className="text-gray-500 hover:text-[#12142B] transition-colors">https://gyanmaster.com</a>
            </div>
          </section>

          <div className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs text-gray-400">
            Last updated: March 2026
          </div>
        </div>
      </main>
    </div>
  );
}

function IconCheck({ color = "currentColor" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}