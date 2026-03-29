import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventDetails({ event }) {
  const { user } = event;
  const displayName =
    user?.name && user.name.trim().toLowerCase() !== "null null"
      ? user.name
      : user?.email?.split("@")[0]?.replace(/[._-]+/g, " ") || "Host";
  const fallbackInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="p-10 lg:w-1/3 bg-white">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={user.imageUrl} alt={displayName} />
          <AvatarFallback>{fallbackInitial}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Clock className="mr-2" />
        <span>{event.duration} minutes</span>
      </div>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2" />
        <span>Google Meet</span>
      </div>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
}
