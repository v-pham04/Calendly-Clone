import { Suspense } from "react";
import Link from "next/link";
import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <Events />
    </Suspense>
  );
}

async function Events() {
  const { events, username } = await getUserEvents();
  const publicEventsCount = events.filter((event) => !event.isPrivate).length;
  const privateEventsCount = events.length - publicEventsCount;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Ready to schedule more meetings?
            </h3>
            <p className="text-slate-600">
              Create a new event type and share your booking link.
            </p>
            <div className="flex gap-2 mt-3 text-xs font-medium text-slate-700">
              <span className="rounded-full bg-white/80 px-3 py-1 border border-blue-100">
                Total: {events.length}
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1 border border-blue-100">
                Public: {publicEventsCount}
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1 border border-blue-100">
                Private: {privateEventsCount}
              </span>
            </div>
          </div>
          <Link href="/events?create=true">
            <Button size="lg" className="w-full md:w-auto">
              + Create New Event
            </Button>
          </Link>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 text-center">
          <p className="font-medium text-slate-800">
            You haven&apos;t created any events yet.
          </p>
          <p className="text-sm text-slate-600 mt-1">
            Start with one event to let people book time with you.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} username={username} />
          ))}
        </div>
      )}
    </div>
  );
}
