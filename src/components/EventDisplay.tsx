
interface Event {
  id: string
  title: string
}

interface EventDisplayProps {
  events: Event[]
}

export default function EventDisplay({ events }: EventDisplayProps) {
  return (
    <div className="mt-1 space-y-1">
      {events.map((event) => (
        <div key={event.id} className="text-xs bg-secondary text-secondary-foreground p-1 rounded">
          {event.title}
        </div>
      ))}
    </div>
  )
}