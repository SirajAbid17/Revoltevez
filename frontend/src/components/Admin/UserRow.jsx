import React from "react";
import { FiShield, FiTrash2 } from "react-icons/fi";

export default function UserRow({ user, initials, onChangeRole, onDeleteUser }) {
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                {initials(user.name)}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white bg-green-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-[#111] truncate">
              {user.name || "N/A"}
            </p>
            <p className="text-[10.5px] text-gray-500 truncate">
              {user.email || "N/A"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 hidden sm:table-cell">
        {user.role === "admin" ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[9.5px] font-bold uppercase tracking-wider">
            <FiShield size={8} />
            Admin
          </span>
        ) : (
          <span className="inline-flex px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[9.5px] font-semibold uppercase tracking-wider">
            User
          </span>
        )}
      </td>

      <td className="px-4 py-3 hidden md:table-cell">
        <span
          className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium ${
            user.provider === "google" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              user.provider === "google" ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
          {user.provider === "google" ? "Google" : "Email"}
        </span>
      </td>

      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-[11.5px] text-gray-500">{joinedDate}</span>
      </td>

      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          {onChangeRole && (
            <button
              onClick={() =>
                onChangeRole(user._id, user.role === "admin" ? "user" : "admin")
              }
              className="text-[10.5px] font-semibold px-2 py-1 rounded-md hover:bg-gray-100 text-gray-600 transition-all"
              title={user.role === "admin" ? "Demote to user" : "Promote to admin"}
            >
              {user.role === "admin" ? "Demote" : "Promote"}
            </button>
          )}
          {onDeleteUser && (
            <button
              onClick={() => onDeleteUser(user._id)}
              className="w-7 h-7 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center transition-all"
            >
              <FiTrash2 size={12} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}