// app/api/friends/route.ts (for App Router)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, city } = body;
  const newFriend = await prisma.friend.create({
    data: { name, city },
  });
  return NextResponse.json(newFriend);
}

export async function GET() {
  const friends = await prisma.friend.findMany();
  return NextResponse.json(friends);
}
