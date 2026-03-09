"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Sidebar from "./Sidebar";
import CreateProject from "./CreateProject";
const API_KEY = "pk_live_a34ea5d9-0388-441d-89ad-735b6af4810a";

export default function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [dailyEvents, setDailyEvents] = useState([]);
  const [topEvents, setTopEvents] = useState([]);

  useEffect(() => {

    axios
      .get(`http://127.0.0.1:5000/analytics/summary?api_key=${API_KEY}`)
      .then(res => setSummary(res.data));

    axios
      .get(`http://127.0.0.1:5000/analytics/daily-events?api_key=${API_KEY}`)
      .then(res => setDailyEvents(res.data.daily_events));

    axios
      .get(`http://127.0.0.1:5000/analytics/top-events?api_key=${API_KEY}`)
      .then(res => setTopEvents(res.data.top_events));

  }, []);

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <p className="text-xl text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-900">
          <div className="px-10 py-6">
            <h1 className="text-3xl font-bold">
              Product Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor product usage and user behaviour
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-10 py-10">
          <div className="mb-10">
  <CreateProject />
</div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-sm text-gray-400">Total Events</p>
              <h2 className="text-3xl font-bold mt-2">
                {summary.total_events}
              </h2>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-sm text-gray-400">Active Users</p>
              <h2 className="text-3xl font-bold mt-2">
                {summary.total_users}
              </h2>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <p className="text-sm text-gray-400">Top Event</p>
              <h2 className="text-3xl font-bold mt-2">
                {summary.top_event}
              </h2>
            </div>

          </div>


          {/* Daily Events Chart */}

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-10">

            <h3 className="text-lg font-semibold mb-4">
              Daily Events
            </h3>

            <div style={{ width: "100%", height: 300 }}>

              <ResponsiveContainer>

                <LineChart data={dailyEvents}>

                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151"
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* Top Events Table */}

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

            <h3 className="text-lg font-semibold mb-4">
              Top Events
            </h3>

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="pb-3">Event</th>
                  <th className="pb-3">Count</th>
                </tr>
              </thead>

              <tbody>

                {topEvents.map((event, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-800"
                  >

                    <td className="py-3">
                      {event.event_name}
                    </td>

                    <td className="py-3">
                      {event.count}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}