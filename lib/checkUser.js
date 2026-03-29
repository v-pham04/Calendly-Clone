import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

function buildDisplayName(user) {
  const firstName = user?.firstName?.trim() || "";
  const lastName = user?.lastName?.trim() || "";
  const fullName = `${firstName} ${lastName}`.trim();

  if (fullName) return fullName;

  const email = user?.emailAddresses?.[0]?.emailAddress;
  const emailAlias = email?.split("@")[0]?.replace(/[._-]+/g, " ")?.trim();

  return user?.username || emailAlias || "User";
}

function buildUsernameSeed(displayName, userId) {
  const sanitized = displayName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `${sanitized || "user"}${userId.slice(-4)}`;
}

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const displayName = buildDisplayName(user);
    const usernameSeed = buildUsernameSeed(displayName, user.id);

    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      const hasInvalidName =
        !loggedInUser.name || loggedInUser.name.trim().toLowerCase() === "null null";

      if (hasInvalidName) {
        const updatedUser = await db.user.update({
          where: { clerkUserId: user.id },
          data: { name: displayName },
        });

        return updatedUser;
      }

      return loggedInUser;
    }

    await clerkClient().users.updateUser(user.id, {
      username: usernameSeed,
    });

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: displayName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        username: usernameSeed,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);

    // Handle race conditions where another request creates the row first.
    const existingUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    throw error;
  }
};
