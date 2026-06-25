import CoursesAdminClient from "./_components/CoursesAdminClient";

export const metadata = {
  title: "Manage Courses | Admin",
  description: "Create, update, and manage the course catalog.",
};

// Helper function to fetch data from your separate API
async function getAdminData() {
  // 1. Define your base URL (Required for SSR fetches in Next.js)
  // Ensure you have NEXT_PUBLIC_APP_URL or similar set in your .env
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // 2. Fetch both endpoints in parallel
  // Adjust the API routes below to match exactly what you named them
  const [categoriesRes, coursesRes] = await Promise.all([
    fetch(`${baseUrl}/api/categories`, { 
      cache: "no-store" // Ensures admin sees fresh data every time 
    }),
    fetch(`${baseUrl}/api/admin/courses`, { 
      cache: "no-store" 
    })
  ]);

  // 3. Handle potential HTTP errors
  if (!categoriesRes.ok || !coursesRes.ok) {
    throw new Error("Failed to fetch initial admin data.");
  }

  // 4. Parse the JSON responses
  // Depending on how you structured your API response, you might need to extract the data 
  // e.g., if you return { data: [...] }, change this to await categoriesRes.json().then(res => res.data)
  const categories = await categoriesRes.json();
  const courses = await coursesRes.json();

  return { categories, courses };
}

export default async function AdminCoursesPage() {
  const { categories, courses } = await getAdminData();

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <CoursesAdminClient
        initialCategories={categories}
        initialCourses={courses}
      />
    </main>
  );
}