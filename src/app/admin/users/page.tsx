"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          Буцах
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        Хэрэглэгчийн удирдлага
      </h1>

      {/* Хэрэглэгчдийн жагсаалт */}
      <Card className="mb-8 shadow-md">
        <CardContent className="p-6 overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border px-4 py-2">Код</th>
                <th className="border px-4 py-2">Нэр</th>
                <th className="border px-4 py-2">Имэйл</th>
                <th className="border px-4 py-2">Үүрэг</th>
                <th className="border px-4 py-2">Төгсөх жил</th>
                <th className="border px-4 py-2">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.user_id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 capitalize">{user.role}</td>
                  <td className="border px-4 py-2">{user.school_year}</td>
                  <td className="border px-4 py-2 text-center">
                    <Button variant="outline" onClick={() => setEditUser(user)}>
                      Засах
                    </Button>
                    <Button
                      className="ml-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Устгах
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Шинэ хэрэглэгч нэмэх */}
      <Card className="mb-8 shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Шинэ хэрэглэгч нэмэх</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={newUser.user_id}
              onChange={(e) =>
                setNewUser({ ...newUser, user_id: e.target.value })
              }
              placeholder="Хэрэглэгчийн ID"
            />
            <Input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Нэр"
            />
            <Input
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Имэйл"
            />
            <Input
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Нууц үг"
              type="password"
            />
            <Input
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              placeholder="Үүрэг (admin/teacher/student)"
            />
            <Input
              value={newUser.school_year}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  school_year: parseInt(e.target.value),
                })
              }
              placeholder="Төгсөх жил"
              type="number"
            />
          </div>
          <Button onClick={handleAddUser}>Нэмэх</Button>
        </CardContent>
      </Card>

      {/* Засах */}
      {editUser && (
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Засах</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input value={editUser.user_id} disabled placeholder="ID" />
              <Input
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                placeholder="Нэр"
              />
              <Input
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                placeholder="Имэйл"
              />
              <Input
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                placeholder="Үүрэг"
              />
              <Input
                value={editUser.school_year}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    school_year: parseInt(e.target.value),
                  })
                }
                placeholder="Төгсөх жил"
                type="number"
              />
            </div>
            <Button onClick={handleEditUser}>Хадгалах</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagementPage;
