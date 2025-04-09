"use client";

import { useEffect, useState } from "react";

type FriendType = {
  id: string | number;
  name: string;
  city: string;
};

const initialFriends: FriendType[] = [
  { id: 1, name: "Alex", city: "pune" },
  { id: 2, name: "John", city: "delhi" },
];

export default function Home() {
  const [friends, setFriends] = useState<FriendType[]>(initialFriends);

  // function handleAddFriend(friend: FriendType) {
  //   setFriends((prev) => [...prev, friend]);
  // }

  // function handleDeleteFriend(id: number) {
  //   setFriends((prev) => prev.filter((f) => f.id !== id));
  // }

  // function handleUpdateFriend(updatedFriend: FriendType) {
  //   setFriends((prev) =>
  //     prev.map((f) => (f.id === updatedFriend.id ? updatedFriend : f))
  //   );
  // }

  useEffect(() => {
    fetch("/api/friends")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  async function handleAddFriend(friend: { name: string; city: string }) {
    const res = await fetch("/api/friends", {
      method: "POST",
      body: JSON.stringify(friend),
    });
    const newFriend = await res.json();
    setFriends((prev) => [...prev, newFriend]);
  }

  async function handleDeleteFriend(id: string) {
    await fetch(`/api/friends/${id}`, { method: "DELETE" });
    setFriends((prev) => prev.filter((f) => f.id !== id));
  }
  async function handleUpdateFriend(updated: FriendType) {
    const res = await fetch(`/api/friends/${updated.id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    setFriends((prev) => prev.map((f) => (f.id === data.id ? data : f)));
  }

  return (
    <div className="w-full h-screen grid items-center justify-center">
      <FriendList
        friends={friends}
        onDelete={handleDeleteFriend}
        onUpdate={handleUpdateFriend}
      />
      <FriendForm onAdd={handleAddFriend} />
    </div>
  );
}

function FriendList({
  friends,
  onDelete,
  onUpdate,
}: {
  friends: FriendType[];
  onDelete: (id: string) => void;
  onUpdate: (friend: FriendType) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCity, setEditCity] = useState("");

  function handleEdit(friend: FriendType) {
    setEditingId(friend.id);
    setEditName(friend.name);
    setEditCity(friend.city);
  }

  function handleSave(id: string) {
    if (!editName || !editCity) return;
    onUpdate({ id, name: editName, city: editCity });
    setEditingId(null);
  }

  return (
    <div className="mb-8">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center gap-4 p-2 border-b w-[400px] m-auto hover:bg-stone-300"
        >
          {editingId === friend.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border p-1"
              />
              <input
                type="text"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                className="border p-1"
              />
              <button
                onClick={() => handleSave(friend.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2>{friend.name}</h2>
              <p>{friend.city}</p>
              <button
                onClick={() => onDelete(friend.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(friend)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function FriendForm({ onAdd }: { onAdd: (friend: FriendType) => void }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !city) {
      alert("Both fields are required");
      return;
    }
    onAdd({ id: Date.now(), name, city });
    setName("");
    setCity("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border m-auto w-[400px] grid gap-y-4"
    >
      <input
        type="text"
        placeholder="Friend's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Friend
      </button>
    </form>
  );
}

// Byt28rOTz9XcqFl7;
// crud pj
