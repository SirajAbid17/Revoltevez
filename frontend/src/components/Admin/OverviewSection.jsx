import React from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import UserRow from "./UserRow";

export default function OverviewSection({
  user,
  stats,
  users,
  loading,
  searchQuery,
  setSearchQuery,
  initials,
  onChangeRole,
}) {
 
  const filteredUsers = users
    .filter(
      (u) =>
        (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;

     
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  return (
    <div className="space-y-5">
     
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-px bg-black" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500">
              OVERVIEW
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] lg:text-[38px] font-semibold tracking-[-0.04em] leading-[0.98] text-[#111]">
            Welcome back,{" "}
            <span className="text-gray-400">
              {user.name?.split(" ")[0] || "Admin"}.
            </span>
          </h1>
        </div>
      </div>

      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-[15px]`}
              >
                {stat.icon}
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-gray-400 mb-0.5">
              {stat.label}
            </p>
            <p className="text-[20px] font-bold tracking-tight text-[#111]">
              {loading ? "..." : stat.value}
            </p>
          </div>
        ))}
      </div>

      
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold text-[#111]">
              Recent Users
            </h2>
            <p className="text-[11.5px] text-gray-500 mt-0.5">
              {users.length} total users
            </p>
          </div>

          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={13}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full sm:w-[220px] pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-[12px] outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FiUsers size={22} className="text-gray-400" />
            </div>
            <h2 className="text-[15px] font-semibold text-[#111]">
              No users yet
            </h2>
            <p className="text-[12.5px] text-gray-500 mt-1">
              Users will appear here after sign-up
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/60 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500">
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 hidden sm:table-cell">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 hidden md:table-cell">
                    Provider
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.slice(0, 10).map((u) => (
                  <UserRow
                    key={u._id}
                    user={u}
                    initials={initials}
                    onChangeRole={onChangeRole}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}