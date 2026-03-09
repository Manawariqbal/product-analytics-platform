"use client";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 p-6">

      <h2 className="text-xl font-bold mb-8 text-white">
        Analytics
      </h2>

      <nav className="space-y-4 text-gray-400">

        <div className="hover:text-white cursor-pointer">
          Dashboard
        </div>

        <div className="hover:text-white cursor-pointer">
          Events
        </div>

        <div className="hover:text-white cursor-pointer">
          Users
        </div>

        <div className="hover:text-white cursor-pointer">
          Funnels
        </div>

        <div className="hover:text-white cursor-pointer">
          Settings
        </div>

      </nav>

    </div>
  );
}