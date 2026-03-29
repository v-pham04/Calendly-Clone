import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

export async function requireDbUser() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  const syncedUser = await checkUser();

  if (!syncedUser) {
    throw new Error("User not found");
  }

  return syncedUser;
}
