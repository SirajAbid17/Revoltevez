import React from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import UserRow from "./UserRow";

export default function UsersSection({
  users,
  loading,
  searchQuery,
  setSearchQuery,
  initials,
  onChangeRole,
  onDeleteUser,
}) {
  
  const filtered = users
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
              USERS
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-[0.98] text-[#111]">
            All Users
          </h1>
          <p className="text-[13px] text-gray-500 mt-2">
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
            className="w-full sm:w-[240px] pl-9 pr-3 py-2.5 rounded-lg bg-white border border-gray-200 text-[12.5px] outline-none focus:border-black transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FiUsers size={28} className="text-gray-300 mx-auto mb-3" />
            <p className="text-[13px] text-gray-500">No users found</p>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <UserRow
                    key={u._id}
                    user={u}
                    initials={initials}
                    onChangeRole={onChangeRole}
                    onDeleteUser={onDeleteUser}
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