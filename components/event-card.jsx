"use client";

import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { ExternalLink, Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventCard({
  event,
  username,
  isPublic = false,
  canManage = false,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const eventSummary =
    event.description?.split(".")?.[0]?.trim() || "No description provided yet";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window?.location.origin}/${username}/${event.id}`,
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);

  const handleDelete = async () => {
    const confirmed = window?.confirm(
      `Delete \"${event.title}\"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    const verifyText = window?.prompt(
      "Type DELETE to confirm permanent deletion.",
    );

    if (verifyText?.trim().toUpperCase() !== "DELETE") {
      window?.alert("Deletion cancelled. Confirmation text did not match.");
      return;
    }

    await fnDeleteEvent(event.id);
    router.refresh();
  };

  const handleCopyClick = async () => {
    await handleCopy();
  };

  const handleOpen = () => {
    window?.open(
      `${window?.location.origin}/${username}/${event.id}`,
      "_blank",
    );
  };

  return (
    <Card className="flex flex-col justify-between border-slate-200 bg-white/95 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl md:text-2xl leading-tight">
            {event.title}
          </CardTitle>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-slate-50 text-slate-700 border-slate-200 whitespace-nowrap">
            {event.duration} mins
          </span>
        </div>
        <CardDescription className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <span className="rounded-full px-2.5 py-1 border border-blue-100 bg-blue-50 text-blue-700 font-medium">
            {event.isPrivate ? "Private" : "Public"}
          </span>
          <span className="rounded-full px-2.5 py-1 border border-violet-100 bg-violet-50 text-violet-700 font-medium">
            {event._count.bookings} bookings
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">{eventSummary}.</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={handleOpen}
          className="flex items-center"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open
        </Button>
        {!isPublic && (
          <Button
            variant="outline"
            onClick={handleCopyClick}
            className="flex items-center"
          >
            <Link className="mr-2 h-4 w-4" />
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
        )}
        {(canManage || !isPublic) && (
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
