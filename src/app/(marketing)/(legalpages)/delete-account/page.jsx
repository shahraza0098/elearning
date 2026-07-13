export const metadata = {
  title: "Delete Account | Gyan Master",
  description: "Request deletion of your Gyan Master account and associated data.",
};

export default function DeleteAccountPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          Delete Your Gyan Master Account
        </h1>

        <p className="mb-6 text-gray-700 leading-7">
          At <strong>Gyan Master</strong>, we respect your privacy and give you
          control over your personal data. If you no longer wish to use Gyan
          Master, you may request the deletion of your account and associated
          data.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            How to Request Account Deletion
          </h2>

          <ol className="list-decimal space-y-2 pl-6 text-gray-700">
            <li>Send an email to <strong>support@gyanmaster.com</strong>.</li>
            <li>
              Use the subject line:
              <strong> Account Deletion Request</strong>.
            </li>
            <li>
              Mention the email address associated with your Gyan Master
              account.
            </li>
            <li>
              Our support team will verify your request and process it as soon
              as possible.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            What Data Will Be Deleted
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Your account profile.</li>
            <li>Your name and email address.</li>
            <li>Your learning progress.</li>
            <li>Your course history associated with your account.</li>
            <li>Other personal information linked to your account.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Data That May Be Retained
          </h2>

          <p className="text-gray-700 leading-7">
            Certain information may be retained if required by applicable laws,
            to resolve disputes, enforce our legal agreements, prevent fraud, or
            comply with legal obligations. Any retained information will only be
            kept for the minimum period required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Processing Time
          </h2>

          <p className="text-gray-700 leading-7">
            We aim to process verified account deletion requests within
            <strong> 7 business days</strong>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">
            Contact Us
          </h2>

          <p className="text-gray-700 leading-7">
            If you have any questions regarding account deletion or your
            personal data, please contact us:
          </p>

          <div className="mt-4 rounded-lg bg-gray-100 p-5">
            <p>
              <strong>Email:</strong> support@gyanmaster.com
            </p>
            <p>
              <strong>Website:</strong> https://gyanmaster.com
            </p>
          </div>
        </section>

        <div className="mt-10 border-t pt-6 text-sm text-gray-500">
          Last updated: March 2026
        </div>
      </div>
    </main>
  );
}