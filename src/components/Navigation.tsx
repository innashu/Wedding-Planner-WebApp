"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Venue", href: "/venue", emoji: "🏛️" },
  { name: "Guests", href: "/guests", emoji: "👥" },
  { name: "Ceremony", href: "/ceremony", emoji: "✡️" },
  { name: "Personal", href: "/personal", emoji: "👗" },
  { name: "To-Do", href: "/todos", emoji: "📝" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-base sm:text-lg font-medium text-rose-600 hover:text-rose-700 transition-colors whitespace-nowrap">
            <span className="sm:hidden">💕</span>
            <span className="hidden sm:inline">💕 Wedding Planner</span>
          </Link>
          <div className="flex">
            {categories.map((category) => {
              const isActive = pathname === category.href;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md transition-colors flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1 ${
                    isActive
                      ? "bg-rose-50 text-rose-900 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
