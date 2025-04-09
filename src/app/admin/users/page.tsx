"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const UserManagementPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    user_id: "",
    name: "",
    email: "",
    password: "",
    role: "student",
    school_year: 1,
  });
  const [editUser, setEditUser] = useState<any | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers((prev) => [...prev, data]);
    setNewUser({
      user_id: "",
      name: "",
      email: "",
      password: "",
      role: "student",
      school_year: 1,
    });
  };

  const handleEditUser = async () => {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editUser.id,
        user_id: editUser.user_id,
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
        school_year: editUser.school_year,
      }),
    });
    const data = await res.json();
    setUsers((prev) => prev.map((u) => (u.id === data.id ? data : u)));
    setEditUser(null);
  };

  const handleDeleteUser = async (id: string) => {
    await fetch(`/api/user?id=${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0f181e] text-white py-12 px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[#24ffa5] text-black hover:bg-white"
          >
            ← Буцах
          </Button>
          <h1 className="text-4xl font-bold text-[#24ffa5] text-center w-full">
            👤 Хэрэглэгчийн удирдлага
          </h1>
          <div className="w-24" />
        </div>

        {/* User Table */}
        <div className="bg-[#13272e] divide-[#24ffa520] p-6 shadow-xl rounded-xl mb-12 w-full">
          <table className="w-full border-collapse text-sm">
            <thead className="text-[#24ffa5] border-b border-[#24ffa520]">
              <tr>
                <th className="px-4 py-3 text-left">Код</th>
                <th className="px-4 py-3 text-left">Нэр</th>
                <th className="px-4 py-3 text-left">Имэйл</th>
                <th className="px-4 py-3 text-left">Үүрэг</th>
                <th className="px-4 py-3 text-left">Төгсөх жил</th>
                <th className="px-4 py-3 text-center">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#24ffa520] transition">
                  <td className="px-4 py-3">{user.user_id}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3">{user.school_year}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => setEditUser(user)}
                      className="bg-[#24ffa5] hover:bg-[#1de194] text-black"
                    >
                      Засах
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Устгах
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Form */}
        <div className="bg-[#13272e] p-6 shadow-lg rounded-xl mb-12 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-[#24ffa5] text-center">
            ➕ Шинэ хэрэглэгч нэмэх
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              className="bg-[#0f181e] border-[#24ffa520] text-white"
              value={newUser.user_id}
              onChange={(e) =>
                setNewUser({ ...newUser, user_id: e.target.value })
              }
              placeholder="Хэрэглэгчийн ID"
            />
            <Input
              className="bg-[#0f181e] border-[#24ffa520] text-white"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Нэр"
            />
            <Input
              className="bg-[#0f181e] border-[#24ffa520] text-white"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Имэйл"
            />
            <Input
              className="bg-[#0f181e] border-[#24ffa520] text-white"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              type="password"
              placeholder="Нууц үг"
            />
            <Input
              className="bg-[#0f181e] border-[#24ffa520] text-white"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              placeholder="Үүрэг (admin/teacher/student)"
            />
            <Input
              className="bg-[#0f181e] border-[#24ffa520] text-white"
              value={newUser.school_year}
              type="number"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  school_year: parseInt(e.target.value),
                })
              }
              placeholder="Төгсөх жил"
            />
            <div className="md:col-span-2">
              <Button
                onClick={handleAddUser}
                className="w-full bg-[#24ffa5] hover:bg-[#1de194] text-black"
              >
                Нэмэх
              </Button>
            </div>
          </div>
        </div>

        {/* Edit User Form */}
        {editUser && (
          <div className="bg-[#13272e] fixed inset-0 z-50 m-auto max-w-screen-md backdrop-blur-md p-6 shadow-lg rounded-xl overflow-y-auto text-white">
            <h2 className="text-2xl font-semibold mb-4 text-[#24ffa5] text-center">
              ✏️ Хэрэглэгч засах
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                className="bg-[#0f181e] text-white"
                value={editUser.user_id}
                disabled
              />
              <Input
                className="bg-[#0f181e] border-[#24ffa520] text-white"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                placeholder="Нэр"
              />
              <Input
                className="bg-[#0f181e] border-[#24ffa520] text-white"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                placeholder="Имэйл"
              />
              <Input
                className="bg-[#0f181e] border-[#24ffa520] text-white"
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                placeholder="Үүрэг"
              />
              <Input
                className="bg-[#0f181e] border-[#24ffa520] text-white"
                type="number"
                value={editUser.school_year}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    school_year: parseInt(e.target.value),
                  })
                }
                placeholder="Төгсөх жил"
              />
              <div className="md:col-span-2 flex gap-2">
                <Button
                  onClick={handleEditUser}
                  className="w-full bg-[#24ffa5] hover:bg-[#1de194] text-black"
                >
                  Хадгалах
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditUser(null)}
                  className="w-full border-[#24ffa5] text-[#24ffa5] hover:bg-[#0f181e]"
                >
                  Цуцлах
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
