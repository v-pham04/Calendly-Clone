import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import CancelMeetingButton from "./cancel-meeting";

export default function MeetingList({ meetings, type }) {
  if (meetings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 text-center">
        <p className="font-medium text-slate-800">No {type} meetings found.</p>
        <p className="text-sm text-slate-600 mt-1">
          {type === "upcoming"
            ? "New bookings will appear here as soon as someone schedules with you."
            : "Completed meetings are shown here for quick reference."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => {
        const additionalInfo = meeting.additionalInfo?.trim();

        return (
          <Card
            key={meeting.id}
            className="flex flex-col justify-between border-slate-200 bg-white/95 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-xl leading-tight">
                  {meeting.event.title}
                </CardTitle>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${
                    type === "upcoming"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {type === "upcoming" ? "Upcoming" : "Past"}
                </span>
              </div>
              <CardDescription className="text-sm">
                with {meeting.name}
              </CardDescription>
              {additionalInfo && (
                <CardDescription className="italic text-slate-600">
                  &quot;{additionalInfo}&quot;
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-slate-700">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(meeting.startTime), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center text-sm text-slate-700">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                  {format(new Date(meeting.endTime), "h:mm a")}
                </span>
              </div>
              {meeting.meetLink && (
                <div className="flex items-center text-sm">
                  <Video className="mr-2 h-4 w-4" />
                  <a
                    href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </CardContent>
            {type === "upcoming" && (
              <CardFooter className="flex justify-between">
                <CancelMeetingButton meetingId={meeting.id} />
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
