import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/btn";
import { cn } from "../lib/utils";
import EventModal from "./EventModal";
import EventDisplay from "./EventDisplay";

interface Event {
  id: string;
  date: Date;
  title: string;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (title: string) => {
    if (selectedDate) {
      const newEvent: Event = {
        id: Date.now().toString(),
        date: selectedDate,
        title,
      };
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events
      .filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      )
      .slice(0, 3);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              disabled={
                currentDate.getFullYear() === 1970 &&
                currentDate.getMonth() === 0
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              disabled={
                currentDate.getFullYear() === 2200 &&
                currentDate.getMonth() === 0
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              index + 1
            );
            const isSelected =
              selectedDate?.getDate() === date.getDate() &&
              selectedDate?.getMonth() === date.getMonth() &&
              selectedDate?.getFullYear() === date.getFullYear();
            const dateEvents = getEventsForDate(date);

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "h-24 text-left p-1 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors",
                  isSelected && "border-2 border-primary"
                )}
              >
                <div className="font-semibold">{date.getDate()}</div>
                <EventDisplay events={dateEvents} />
              </button>
            );
          })}
        </div>
        <Button onClick={() => setIsModalOpen(true)} disabled={!selectedDate}>
          Add Event
        </Button>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}
