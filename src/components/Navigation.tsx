"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Venue & Vendors", href: "/venue", emoji: "💒" },
  { name: "Guests", href: "/guests", emoji: "👥" },
  { name: "Ceremony", href: "/ceremony", emoji: "✡️" },
  { name: "Personal", href: "/personal", emoji: "👗" },
  { name: "To-Do List", href: "/todos", emoji: "📝" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-lg font-medium text-rose-600 hover:text-rose-700 transition-colors">
            💒 Wedding Planner
          </Link>
          <div className="flex space-x-1">
            {categories.map((category) => {
              const isActive = pathname === category.href;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-rose-50 text-rose-900 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-1">{category.emoji}</span>
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
