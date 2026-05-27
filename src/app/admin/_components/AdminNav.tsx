"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/events", label: "Eventos" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 p-3 space-y-0.5">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-green-700 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
