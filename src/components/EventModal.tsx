import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (title: string) => void;
  selectedDate: Date | null;
}

export default function EventModal({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate,
}: EventModalProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddEvent(title.trim());
      setTitle("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
