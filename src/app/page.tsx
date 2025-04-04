"use client";

import Image from "next/image";
import { useState } from "react";

type FriendType = {
  id: number;
  name: string;
  city: string;
};

const initialFriends: FriendType[] = [
  {
    id: 1,
    city: "pune",
    name: "Alex",
  },
  {
    id: 2,
    city: "delhi",
    name: "John",
  },
];

export default function Home() {
  const [friends, setFriends] = useState<FriendType[]>(initialFriends);

  function handleAddFriend(friend: FriendType) {
    setFriends((prevFriends) => [...prevFriends, friend]);
  }

  function handleDeleteFriend(id: number) {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== id)
    );
  }

  function handleUpdateFriend(updatedFriend: FriendType) {
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === updatedFriend.id ? updatedFriend : friend
      )
    );
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
  onDelete: (id: number) => void;
  onUpdate: (friend: FriendType) => void;
}) {
  return (
    <div className="mb-8">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center gap-4 p-2 border-b w-[400px] m-auto hover:bg-stone-300"
        >
          <h2>{friend.name}</h2>
          <p>{friend.city}</p>
          <button
            onClick={() => onDelete(friend.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() =>
              onUpdate({ ...friend, name: friend.name + " (Updated)" })
            }
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

function FriendForm({ onAdd }: { onAdd: (friend: FriendType) => void }) {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !city) return;
    onAdd({
      id: Date.now(),
      name,
      city,
    });
    setName("");
    setCity("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border m-auto w-[500px] grid gap-y-4 "
    >
      <input
        type="text"
        placeholder="Friend's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Friend
      </button>
    </form>
  );
}
