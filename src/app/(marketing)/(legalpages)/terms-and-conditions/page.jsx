export const metadata = {
  title: "Terms & Conditions | GyanMaster",
  description:
    "Read the Terms and Conditions governing the use of GyanMaster's website and mobile application.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg md:p-12">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Terms & Conditions
        </h1>

        <p className="mb-10 text-gray-500">
          <strong>Effective Date:</strong> July 12, 2026
        </p>

        <p className="mb-8 leading-8 text-gray-700">
          Welcome to <strong>GyanMaster</strong>. These Terms and Conditions
          govern your access to and use of the GyanMaster website, mobile
          application, and related services. By using our platform, you agree
          to comply with these Terms.
        </p>

        <Section title="1. Acceptance of Terms">
          <p>
            By creating an account or using GyanMaster, you agree to these
            Terms and Conditions. If you do not agree with these Terms, please
            do not use our services.
          </p>
        </Section>

        <Section title="2. User Accounts">
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate and complete information.</li>
            <li>You are responsible for maintaining your account security.</li>
            <li>You are responsible for all activities under your account.</li>
            <li>
              You must notify us immediately if you suspect unauthorized access.
            </li>
          </ul>
        </Section>

        <Section title="3. Course Access">
          <p>
            Access to courses is provided according to your purchase or active
            subscription. Sharing your account with others is strictly
            prohibited.
          </p>
        </Section>

        <Section title="4. Payments">
          <ul className="list-disc pl-6 space-y-2">
            <li>Course prices are displayed before purchase.</li>
            <li>Applicable taxes may be charged where required.</li>
            <li>Payments are securely processed by authorized payment providers.</li>
            <li>Failure of payment may result in suspension of access.</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All course videos, study materials, graphics, logos, trademarks,
            software, and content available on GyanMaster are owned by
            GyanMaster or its licensors and are protected by applicable
            intellectual property laws.
          </p>
        </Section>

        <Section title="6. Prohibited Activities">
          <ul className="list-disc pl-6 space-y-2">
            <li>Sharing or distributing course content without permission.</li>
            <li>Recording or downloading videos without authorization.</li>
            <li>Attempting to hack or interfere with the platform.</li>
            <li>Using automated bots or scripts without permission.</li>
            <li>Violating any applicable law while using our services.</li>
          </ul>
        </Section>

        <Section title="7. Account Suspension">
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms, engage in fraudulent activities, abuse our services,
            or infringe upon the rights of others.
          </p>
        </Section>

        <Section title="8. Availability of Services">
          <p>
            We strive to keep GyanMaster available at all times but do not
            guarantee uninterrupted or error-free service. Maintenance,
            technical issues, or circumstances beyond our control may result in
            temporary service interruptions.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, GyanMaster shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising from the use or inability to use our platform.
          </p>
        </Section>

        <Section title="10. Privacy">
          <p>
            Your use of GyanMaster is also governed by our Privacy Policy,
            which explains how we collect, use, and protect your information.
          </p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>
            We may update these Terms from time to time. Continued use of the
            platform after changes become effective constitutes your acceptance
            of the updated Terms.
          </p>
        </Section>

        <Section title="12. Governing Law">
          <p>
            These Terms shall be governed by and interpreted in accordance with
            the laws of India. Any disputes arising under these Terms shall be
            subject to the jurisdiction of the competent courts in India.
          </p>
        </Section>

        <Section title="13. Contact Us">
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
          and agreed to these Terms and Conditions.
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        {title}
      </h2>

      <div className="space-y-4 leading-8 text-gray-700">
        {children}
      </div>
    </section>
  );
}