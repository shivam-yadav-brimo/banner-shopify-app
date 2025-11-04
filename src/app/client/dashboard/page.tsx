import React from 'react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">

      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">🎉 Motivation Banner — Dashboard</h1>
        <button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
          Settings
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mb-10">
        {[
          { title: "Total Views", value: "12,430" },
          { title: "Clicks", value: "1,243" },
          { title: "Conversions", value: "89" },
          { title: "CTR", value: "10.2%" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5 text-center border border-gray-100">
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <h2 className="text-gray-700 font-medium mb-2">Banner Performance</h2>
        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded-md">
          Chart Placeholder
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Motivation Banner — Made for Shopify
      </footer>
    </div>
  )
}
