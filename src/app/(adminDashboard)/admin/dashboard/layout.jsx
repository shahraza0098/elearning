
"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  PieChart,
  CreditCard,
  TrendingUp,
  Settings,
} from "lucide-react";

export default function AdminDashboardLayout({ children }) {
   const pathname = usePathname();

  const { user, isSignedIn, isLoaded } = useUser();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const ROLE = "OWNER";

  /* ---------- Lock scroll on mobile ---------- */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMobileOpen]);


  const menu = [
    { name: "Home", href: "/admin/dashboard", icon: Home },
    { name: "Category", href: "/admin/dashboard/category", icon: PieChart },
    { name: "Courses", href: "/admin/dashboard/courses", icon: CreditCard },
    { name: "Students", href: "/admin/dashboard/students", icon: TrendingUp },
    { name: "Analytics", href: "/admin/dashboard/analytics", icon: TrendingUp },
    { name: "Notifications", href: "/admin/dashboard/notifications", icon: TrendingUp },
    { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },

  ];

  /* ---------- Auto-open submenu ---------- */
  useEffect(() => {
    const parent = menu.find((m) =>
      m.children?.some((c) => c.href === pathname)
    );
    if (parent) setOpenSubMenu(parent.name);
  }, [pathname]);

  const mainOffset = isCollapsed ? "lg:ml-20" : "lg:ml-64";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <span className="font-semibold">Dashboard</span>
        <span className="w-6" />
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-[#01295f] 
          flex flex-col transition-all duration-300 
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* ---------- Header ---------- */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 ">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center">
              <Home size={18} />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg text-white">
                Gyani Admin
              </span>
            )}
          </div>

          <button
            className="hidden lg:block p-2 rounded hover:bg-white/10 text-white"
            onClick={() => setIsCollapsed((v) => !v)}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <button
            className="lg:hidden p-2 rounded hover:bg-white/10 text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* ---------- NAV ---------- */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 no-scrollbar">
          {menu.map((item) => {
            const Icon = item.icon;

            if (!item.children) {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                    ${active
                      ? "bg-white/15 text-white font-medium"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"}
                    ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon size={18} />
                  {!isCollapsed && item.name}
                </Link>
              );
            }

            const isOpen = openSubMenu === item.name;
            const isActive = item.children.some((c) => c.href === pathname);

            return (
              <div key={item.name}>
                <button
                  onClick={() => setOpenSubMenu(isOpen ? null : item.name)}
                  className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition
                    ${isActive
                      ? "bg-white/15 text-white"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"}
                    ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon size={18} />
                  {!isCollapsed && (
                    <>
                      <span>{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {!isCollapsed && isOpen && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition
                          ${pathname === child.href
                            ? "bg-white/20 text-white"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                      >
                        <Dot size={14} />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ================= FOOTER ================= */}
        <div className="mt-auto border-t border-white/10 px-3 py-3 bg-[#01295f]">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {isLoaded && isSignedIn ? user?.fullName : "Guest User"}
                </p>
                <p className="text-xs text-slate-300 truncate max-w-[180px]">
                  {isLoaded && isSignedIn
                    ? user?.emailAddresses[0]?.emailAddress
                    : ""}
                </p>
              </div>
            )}

            {isSignedIn && (
              <SignOutButton>
                <button
                  className="h-9 w-9 rounded-md border border-white/20
                             hover:bg-white/10 text-white
                             flex items-center justify-center transition"
                  title="Logout"
                >
                  ⎋
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      </aside>

      {/* ---------- MOBILE OVERLAY ---------- */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className={`flex-1 transition-all duration-300 ${mainOffset}`}>
        <div className="lg:hidden h-14" />
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

