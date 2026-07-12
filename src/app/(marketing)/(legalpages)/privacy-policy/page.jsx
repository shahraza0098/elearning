export const metadata = {
  title: "Privacy Policy | GyanMaster",
  description:
    "Read GyanMaster's Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg md:p-12">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Privacy Policy
        </h1>

        <p className="mb-10 text-gray-500">
          <strong>Effective Date:</strong> July 12, 2026
        </p>

        <p className="mb-8 text-gray-700 leading-8">
          Welcome to <strong>GyanMaster</strong>. Your privacy is important to
          us. This Privacy Policy explains how we collect, use, store, and
          protect your personal information when you use our website and mobile
          application.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc pl-6 space-y-2">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number (if provided)</li>
            <li>Profile Picture (if provided)</li>
            <li>Authentication Information</li>
            <li>Purchased Courses</li>
            <li>Course Progress</li>
            <li>Video Watch History</li>
            <li>Device Information</li>
            <li>IP Address</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage your account.</li>
            <li>Authenticate users securely.</li>
            <li>Provide access to purchased courses.</li>
            <li>Track learning progress.</li>
            <li>Improve our platform.</li>
            <li>Provide customer support.</li>
            <li>Send important service notifications.</li>
            <li>Prevent fraud and unauthorized access.</li>
          </ul>
        </Section>

        <Section title="3. Course Progress">
          <p>
            We store your learning progress, completed lessons, watch history,
            resume playback position, and certificates so you can continue your
            learning seamlessly across devices.
          </p>
        </Section>

        <Section title="4. Video Content">
          <p>
            Our platform provides video-based courses. We may collect playback
            progress, viewing duration, and streaming analytics to improve the
            learning experience.
          </p>
        </Section>

        <Section title="5. Payment Information">
          <p>
            Payments are securely processed by trusted third-party payment
            providers. We do not store your debit card, credit card, or banking
            information on our servers.
          </p>
        </Section>

        <Section title="6. Third-Party Services">
          <p>
            We may use trusted third-party services including:
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2">
            <li>Clerk Authentication</li>
            <li>Bunny Stream</li>
            <li>Google Sign-In</li>
            <li>Google Play Services</li>
            <li>Cloud Hosting Providers</li>
            <li>Analytics Providers</li>
            <li>Payment Providers</li>
          </ul>
        </Section>

        <Section title="7. Cookies">
          <p>
            Our website may use cookies and similar technologies to improve user
            experience, remember preferences, and analyze website traffic.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We use industry-standard security measures including HTTPS
            encryption, secure authentication, restricted access controls, and
            secure cloud infrastructure to protect your information.
          </p>
        </Section>

        <Section title="9. Data Retention">
          <p>
            We retain your information only as long as necessary to provide our
            services, comply with legal obligations, resolve disputes, and
            enforce our agreements.
          </p>
        </Section>

        <Section title="10. Children's Privacy">
          <p>
            GyanMaster is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children.
          </p>
        </Section>

        <Section title="11. Your Rights">
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information.</li>
            <li>Update your information.</li>
            <li>Delete your account.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Withdraw consent where applicable.</li>
          </ul>
        </Section>

        <Section title="12. Sharing of Information">
          <p>
            We do not sell your personal information. Information may be shared
            only with trusted service providers, payment processors, legal
            authorities when required, or during a business transfer.
          </p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with the updated effective date.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <div className="rounded-lg border bg-gray-100 p-6">
            <p>
              <strong>GyanMaster</strong>
            </p>

            <p>Email: support@gyanmaster.com</p>

            <p>Website: https://www.gyanmaster.com</p>
          </div>
        </Section>

        <div className="mt-12 rounded-lg bg-blue-50 p-6 text-blue-900">
          By using GyanMaster, you acknowledge that you have read, understood,
          and agreed to this Privacy Policy.
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">{title}</h2>

      <div className="space-y-4 leading-8 text-gray-700">{children}</div>
    </section>
  );
}