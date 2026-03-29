import React from "react";
import AvailabilityForm from "./_components/availability-form";
import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AvailabilityPage() {
  const availability = await getUserAvailability();

  return (
    <Card className="bg-white/90 shadow-sm border-slate-200">
      <CardHeader>
        <CardTitle>Weekly Availability</CardTitle>
        <p className="text-sm text-slate-600">
          Choose your available days and time windows.
        </p>
      </CardHeader>
      <CardContent>
        <AvailabilityForm initialData={availability || defaultAvailability} />
      </CardContent>
    </Card>
  );
}
