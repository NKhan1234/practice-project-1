// app/api/friends/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const deleted = await prisma.friend.delete({
    where: { id: params.id },
  });
  return NextResponse.json(deleted);
}

// app/api/friends/[id]/route.ts
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await prisma.friend.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updated);
}
