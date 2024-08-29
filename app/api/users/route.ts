import { authConfig } from "@/app/lib/authconfig";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const users = await getAllUsers();
    const filteredUsers = users.filter(
      (user) => user.username !== session.user.email
    );
    return NextResponse.json(filteredUsers);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      username: true,
      profilePicture: true,
      id: true,
      solWallet: {
        select: {
          publicKey: true,
        },
      },
    },
  });
  return users;
}
