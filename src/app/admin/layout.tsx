import Link from "next/link";
import AdminNav from "./_components/AdminNav";
import { logout } from "./actions/auth";

export const metadata = { robots: "noindex, nofollow" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-slate-900 text-white fixed inset-y-0 left-0 flex flex-col z-10">
        <div className="p-4 border-b border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
            Admin
          </p>
          <p className="font-semibold text-white mt-0.5 text-sm">
            Delicias de Anita
          </p>
        </div>

        <AdminNav />

        <div className="p-4 border-t border-slate-700 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-slate-400 hover:text-white transition-colors"
          >
            Ver sitio →
          </Link>
          <form action={logout}>
            <button className="text-xs text-slate-400 hover:text-white transition-colors">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="ml-56 flex-1 min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
}
