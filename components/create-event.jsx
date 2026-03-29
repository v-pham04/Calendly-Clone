"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import EventForm from "./event-form";

const CREATE_EVENT_FORM_ID = "create-event-form";

export default function CreateEventDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // State can be exposed to our app in case we want to manually open the drawer 👇
  // useEffect(() => {
  //   window.openCreateEventDrawer = () => setIsOpen(true);

  //   return () => {
  //     delete window.openCreateEventDrawer;
  //   };
  // }, []);

  const handleClose = () => {
    setIsVisible(false);

    window.setTimeout(() => {
      setIsOpen(false);
      if (searchParams.get("create") === "true") {
        router.replace(window?.location.pathname);
      }
    }, 180);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl transition-all duration-200 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-[0.98]"
        }`}
      >
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Create New Event
          </h2>
        </div>

        <EventForm
          formId={CREATE_EVENT_FORM_ID}
          hideSubmitButton
          onLoadingChange={setIsSubmitting}
          onSubmitForm={() => {
            handleClose();
          }}
        />

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 pb-5 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-10 min-w-24"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={CREATE_EVENT_FORM_ID}
            disabled={isSubmitting}
            className="h-10 min-w-28"
          >
            {isSubmitting ? "Submitting..." : "Create Event"}
          </Button>
        </div>
      </div>
    </div>
  );
}
