import { headers } from "next/headers";
import Image from "next/image";
import { BookOpen, Edit, Trash2, FolderOpen } from "lucide-react";
import AddCategoryButton from "./_components/AddCategoryButton";

async function getCategories() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol =
    headerStore.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");

  if (!host) {
    throw new Error("Unable to resolve request host.");
  }

  const response = await fetch(`${protocol}://${host}/api/admin/category`, {
    cache: "no-store",
    headers: {
      cookie: headerStore.get("cookie") ?? "",
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || "Failed to load categories");
  }

  const payload = await response.json();
  return payload.data ?? [];
}

export default async function CategoryAdminPage() {
  const categories = await getCategories();

  const totalCategories = categories.length;
  const totalCourses = categories.reduce((acc, curr) => acc + curr._count.courses, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your course catalogs and topics.</p>
        </div>
        
        {/* Interactive Client Component for the Add Modal */}
        <AddCategoryButton />
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FolderOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Categories</p>
            <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
          </div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            
            {/* Banner Image */}
            <div className="relative h-40 w-full bg-gray-100">
              <Image 
                src={category.bannerUrl} 
                alt={category.name} 
                fill 
                unoptimized
                className="object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1.5">
                <BookOpen size={14} />
                {category._count.courses} Courses
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 truncate">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-4 truncate">/{category.slug}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 flex-1">
                {category.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 mt-auto">
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No categories found</h3>
          <p className="text-gray-500 mt-1">Get started by creating your first course category.</p>
        </div>
      )}
    </div>
  );
}
