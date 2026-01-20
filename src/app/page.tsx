"use client";

import Link from "next/link";

const categories = [
  {
    name: "Venue & Vendors",
    href: "/venue",
    description: "Venue, photography, music, florist",
    emoji: "💒",
    color: "bg-rose-50 border-rose-100 hover:border-rose-200",
  },
  {
    name: "Guests",
    href: "/guests",
    description: "Guest list, RSVPs, seating, accommodations",
    emoji: "👥",
    color: "bg-purple-50 border-purple-100 hover:border-purple-200",
  },
  {
    name: "Ceremony",
    href: "/ceremony",
    description: "Jewish traditions, officiant, ketubah, chuppah",
    emoji: "✡️",
    color: "bg-amber-50 border-amber-100 hover:border-amber-200",
  },
  {
    name: "To-Do List",
    href: "/todos",
    description: "Tasks and action items",
    emoji: "📝",
    color: "bg-emerald-50 border-emerald-100 hover:border-emerald-200",
  },
  {
    name: "Personal",
    href: "/personal",
    description: "Wedding dress, attire, and more",
    emoji: "👗",
    color: "bg-pink-50 border-pink-100 hover:border-pink-200",
  },
];

function getDaysUntilWedding() {
  const weddingDate = new Date("2026-11-08");
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function HomePage() {
  const daysUntil = getDaysUntilWedding();

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-rose-400 text-sm font-medium mb-1">💍 Inna & Joe's Wedding Day</p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          November 8, 2026
        </h1>
        <p className="text-gray-500">
          {daysUntil} days to go — can't wait! 💕
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className={`block p-6 rounded-xl border transition-all hover:shadow-sm ${category.color}`}
          >
            <div className="text-2xl mb-2">{category.emoji}</div>
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
