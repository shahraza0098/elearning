"use client";

import { useEffect, useState } from "react";

import { useUser, SignOutButton } from "@clerk/nextjs";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Dot,
  Home,
  LogOut,
  Menu,
  PieChart,
  Settings,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Home", href: "/admin/dashboard", icon: Home },
  { name: "Category", href: "/admin/dashboard/category", icon: PieChart },
  { name: "Courses", href: "/admin/dashboard/courses", icon: CreditCard },
  { name: "Students", href: "/admin/dashboard/students", icon: TrendingUp },
  { name: "Analytics", href: "/admin/dashboard/analytics", icon: TrendingUp },
  {
    name: "Notifications",
    href: "/admin/dashboard/notifications",
    icon: TrendingUp,
  },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, isSignedIn, isLoaded } = useUser();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const mainOffset = isCollapsed ? "lg:ml-20" : "lg:ml-64";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <span className="font-semibold">Dashboard</span>
        <span className="w-6" />
      </div>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-[#01295f] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <Home size={18} />
            </div>
            {!isCollapsed ? (
              <span className="text-lg font-semibold text-white">
                Gyani Admin
              </span>
            ) : null}
          </div>

          <button
            className="hidden rounded p-2 text-white hover:bg-white/10 lg:block"
            onClick={() => setIsCollapsed((value) => !value)}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <button
            className="rounded p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4 no-scrollbar">
          {menu.map((item) => {
            const Icon = item.icon;

            if (!item.children) {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 transition ${
                    active
                      ? "bg-white/15 font-medium text-white"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon size={18} />
                  {!isCollapsed ? item.name : null}
                </Link>
              );
            }

            const isOpen = openSubMenu === item.name;
            const isActive = item.children.some((child) => child.href === pathname);

            return (
              <div key={item.name}>
                <button
                  onClick={() => setOpenSubMenu(isOpen ? null : item.name)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon size={18} />
                  {!isCollapsed ? (
                    <>
                      <span>{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  ) : null}
                </button>

                {!isCollapsed && isOpen ? (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-2 rounded-md px-3 py-1 text-sm transition ${
                          pathname === child.href
                            ? "bg-white/20 text-white"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Dot size={14} />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 bg-[#01295f] px-3 py-3">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!isCollapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {isLoaded && isSignedIn ? user?.fullName : "Guest User"}
                </p>
                <p className="max-w-[180px] truncate text-xs text-slate-300">
                  {isLoaded && isSignedIn
                    ? user?.emailAddresses[0]?.emailAddress
                    : ""}
                </p>
              </div>
            ) : null}

            {isSignedIn ? (
              <SignOutButton>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white transition hover:bg-white/10"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </SignOutButton>
            ) : null}
          </div>
        </div>
      </aside>

      {isMobileOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      ) : null}

      <main className={`flex-1 transition-all duration-300 ${mainOffset}`}>
        <div className="h-14 lg:hidden" />
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
