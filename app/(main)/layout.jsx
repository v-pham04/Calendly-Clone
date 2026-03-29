"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart,
    description: "Track activity and update your personal booking link.",
  },
  {
    href: "/events",
    label: "Events",
    icon: Calendar,
    description: "Create, share, and manage your event types.",
  },
  {
    href: "/meetings",
    label: "Meetings",
    icon: Users,
    description: "Review upcoming calls and manage past sessions.",
  },
  {
    href: "/availability",
    label: "Availability",
    icon: Clock,
    description: "Control when people can book time with you.",
  },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const currentNav =
    navItems.find((item) => pathname.startsWith(item.href)) || navItems[0];

  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-white md:flex-row">
        {/* Sidebar for medium screens and up */}
        <aside className="hidden md:block w-72 border-r border-blue-100 bg-white/90 backdrop-blur">
          <div className="px-5 py-6 border-b border-blue-100">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-500 font-semibold">
              Workspace
            </p>
            <p className="text-lg font-semibold text-slate-900 mt-1">
              Scheduling Center
            </p>
          </div>
          <nav className="mt-4 px-3">
            <ul>
              {navItems.map((item) => (
                <li key={item.href} className="mb-1">
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors ${
                      pathname.startsWith(item.href)
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl md:text-5xl gradient-title pt-1 text-left w-full mb-0">
              {currentNav.label}
            </h2>
            <p className="text-slate-600 mt-1 text-sm md:text-base">
              {currentNav.description}
            </p>
          </header>
          {children}
        </main>

        {/* Bottom tabs for small screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-blue-100 shadow-sm">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-4 ${
                    pathname.startsWith(item.href)
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
