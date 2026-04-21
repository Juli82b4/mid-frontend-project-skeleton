// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data

export default function EventDetail() {

  const event = {
    title: "Tech conference",
    date: "2026-06-15",
    time: "10:00 AM",
    venue: "Convention Center",
    city: "Copenhagen",
    description: "Join us for a full-day tech conference.",
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Date</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>City:</strong> {event.city}</p>

      <div>
        <strong>Description:</strong>
        <p>{event.description}</p>
      </div>
      
    </div>
  );
}