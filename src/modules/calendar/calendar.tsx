import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import React from "react";
import { Calendar as ReactCalendar, dayjsLocalizer, Event, SlotInfo } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

import { Popover } from "~/shared/ui/kit";

import { EditEventForm, EditEventFormValues } from "./edit-event-form";

const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(ReactCalendar);

type MyEvent = Event & {
  id: string;
  notes?: string;
};

export const Calendar: React.FC = () => {
  const [events, setEvents] = React.useState<MyEvent[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [selectedSlotInfo, setSelectedSlotInfo] = React.useState<SlotInfo>();

  const handleEventResize: withDragAndDropProps["onEventResize"] = ({ event, start, end }) => {
    const myEvent = event as MyEvent;
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === myEvent.id) ?? {};
      const filtered = prev.filter((ev) => ev.id !== myEvent.id);
      return [
        ...filtered,
        {
          id: String(crypto.randomUUID()),
          ...existing,
          start: new Date(start),
          end: new Date(end),
        },
      ];
    });
  };

  const handleEventDrop: withDragAndDropProps["onEventDrop"] = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot = false,
  }) => {
    const myEvent = event as MyEvent;

    const { allDay } = myEvent;
    if (!allDay && droppedOnAllDaySlot) {
      myEvent.allDay = true;
    }
    if (allDay && !droppedOnAllDaySlot) {
      myEvent.allDay = false;
    }

    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === myEvent.id) ?? {};
      const filtered = prev.filter((ev) => ev.id !== myEvent.id);
      return [
        ...filtered,
        {
          id: String(crypto.randomUUID()),
          ...existing,
          start: new Date(start),
          end: new Date(end),
          allDay: event.allDay,
        },
      ];
    });
  };

  const handleSelectEvent = React.useCallback((event: Event) => window.alert(event.title), []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (isPopoverOpen) {
      return;
    }

    setSelectedSlotInfo(slotInfo);
    setIsPopoverOpen(true);
  };

  const handleCreateEvent = React.useCallback((data: EditEventFormValues) => {
    const start = dayjs(data.date + " " + data.time);
    const end = start.add(30, "minutes");

    setEvents((prev) => [
      ...prev,
      {
        id: String(crypto.randomUUID()),
        start: start.toDate(),
        end: end.toDate(),
        title: data.name,
        notes: data.notes,
      },
    ]);

    setIsPopoverOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-[32px] px-[75px] py-[32px]">
      <span className="font-sans text-[28px] font-light text-[#43425D]">Calendar</span>
      <div className="bg-white p-[20px] [box-shadow:0px_2px_6px_#0000000A]">
        <DnDCalendar
          localizer={localizer}
          events={events}
          style={{ height: "500px" }}
          selectable
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />

        <Popover
          isOpen={isPopoverOpen}
          position={{ x: selectedSlotInfo?.box?.x ?? 0, y: selectedSlotInfo?.box?.y ?? 0 }}
        >
          <EditEventForm
            initialValues={{
              date: dayjs(selectedSlotInfo?.start).format("YYYY-MM-DD"),
              time: dayjs(selectedSlotInfo?.start).format("HH:mm"),
            }}
            onCancel={() => setIsPopoverOpen(false)}
            onSubmit={handleCreateEvent}
          />
        </Popover>
      </div>
    </div>
  );
};
