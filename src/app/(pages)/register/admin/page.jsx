"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

// 1. Define the validation schema based on your Prisma Model
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN"]).default("STUDENT"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function AdminRegisterUserPage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // 2. Initialize the form
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      clerkUserId: "",
      name: "",
      phone: "",
      email: "",
      role: "ADMIN",
      image: "",
    },
  });

  // 3. Handle Form Submission
  const onSubmit = async (data) => {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register user.");
      }

      setStatus("success");
      setMessage("User successfully registered!");
      form.reset(); // Clear the form on success
      
      // Optional: Redirect after success
      // router.push("/admin/users"); 
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Register New User</h1>
              <p className="text-sm text-gray-500">Manually add a user to the system via the admin portal.</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          {/* Status Messages */}
          {status === "success" && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-sm text-green-800 font-medium">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <p className="text-sm text-red-800 font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  placeholder="John Doe"
                  disabled={status === "loading"}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  {...form.register("phone")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  placeholder="123-456-7890"
                  disabled={status === "loading"}
                />
                {form.formState.errors.phone && (
                  <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...form.register("email")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  placeholder="john@example.com"
                  disabled={status === "loading"}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>

            

              {/* Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">System Role</label>
                <select
                  {...form.register("role")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 bg-white"
                  disabled={status === "loading"}
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {form.formState.errors.role && (
                  <p className="text-xs text-red-500">{form.formState.errors.role.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Profile Image URL (Optional)</label>
                <input
                  {...form.register("image")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  placeholder="https://example.com/avatar.png"
                  disabled={status === "loading"}
                />
                {form.formState.errors.image && (
                  <p className="text-xs text-red-500">{form.formState.errors.image.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => form.reset()}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
                disabled={status === "loading"}
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register User"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}