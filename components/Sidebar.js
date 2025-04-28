import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
     
      <nav className="flex flex-col space-y-4">
        <Link href="./">
          <button className="text-left hover:bg-gray-700 p-2 rounded w-full">Dashboard</button>
        </Link>
        <Link href="/news">
        <button className="text-left hover:bg-gray-700 p-2 rounded w-full">
          News Analytics
        </button>
      </Link>
        <Link href="/payout">
          <button className="text-left hover:bg-gray-700 p-2 rounded w-full">Payout Details</button>
        </Link>

        <div className="flex flex-col h-full">

  {/* Logout Button */}
  <button className="p-2 m-2 bg-red-500 text-white rounded">
    Logout
  </button>
</div>

      </nav>
    </aside>
  );
}
