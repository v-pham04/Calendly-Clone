import { Suspense } from "react";
import { getUserMeetings } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingList from "./_components/meeting-list";

export const metadata = {
  title: "Your Meetings | Schedulrr",
  description: "View and manage your upcoming and past meetings.",
};

export default async function MeetingsPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white/85 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-lg font-semibold text-slate-900">
            Meetings Timeline
          </h3>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            Upcoming + Past
          </span>
        </div>
        <p className="text-sm text-slate-600 mt-1">
          Use Upcoming to join or cancel scheduled calls. Use Past to review
          completed sessions.
        </p>
      </div>

      <Tabs
        defaultValue="upcoming"
        className="rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<div>Loading upcoming meetings...</div>}>
            <UpcomingMeetings />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback={<div>Loading past meetings...</div>}>
            <PastMeetings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type="past" />;
}
