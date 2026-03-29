"use server";

import { db } from "@/lib/prisma";
import { requireDbUser } from "@/lib/require-db-user";

export async function getLatestUpdates() {
  const user = await requireDbUser();

  const now = new Date();

  const upcomingMeetings = await db.booking.findMany({
    where: {
      userId: user.id,
      startTime: { gte: now },
    },
    include: {
      event: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
    take: 3,
  });

  return upcomingMeetings;
}
