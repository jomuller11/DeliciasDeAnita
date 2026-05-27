import Link from "next/link";

export function PageHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {action && (
        <Link
          href={action.href}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
