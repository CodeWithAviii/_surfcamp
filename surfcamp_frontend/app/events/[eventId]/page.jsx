import SignupForm from "@/app/_components/Events/SignupForm";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import {
  fetchAllEvents,
  fetchDataFromStrapi,
  fetchIndividualEvent,
} from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";
export default async function Page({ params }) {
  const { eventId } = params;
  const event = await fetchIndividualEvent(eventId);
  const otherEvents = await fetchAllEvents(eventId);

  const pricing = {
    singlePrice: event.singlePrice,
    sharedPrice: event.sharedPrice,
  };

  const descriptionMarkdown = (
   <ReactMarkdown components={{
  p: ({children, ...props}) => <p className="copy" {...props}>{children}</p>,
}}>
  {event.description}
</ReactMarkdown>

  );

  console.log(event);
  // console.log(eventId)
  return (
    <main className="events-page">
      <SignupForm
        headline={event.name}
        infoText={descriptionMarkdown}
        buttonLabel="Sign Up"
        pricing={pricing}
        eventId={eventId}
      />
      <FeaturedItems items={otherEvents} itemType="event" headline="Other Upcoming Events" />
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const events = await fetchDataFromStrapi("events");
    const slugs = events.map((event) => ({
      eventId: String(event.id),
    }));

    return slugs;
  } catch (error) {
    console.log("Error fetching events:", error);
  }
}
