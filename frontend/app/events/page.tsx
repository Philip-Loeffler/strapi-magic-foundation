import {
  EventsCarousel,
  type EventItem,
} from "@/components/events/EventsCarousel";
import { PageContainer } from "@/components/layout/PageContainer";

async function getEvents(): Promise<EventItem[]> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const res = await fetch(
      `${strapiUrl}/api/events?populate=image&sort=date:asc`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const raw = json?.data ?? json;
    const list = Array.isArray(raw) ? raw : [raw];
    return list.map((entry: any) => {
      const attrs = entry?.attributes ?? entry;
      return {
        id: entry?.id ?? attrs?.id ?? 0,
        title: attrs?.title ?? "",
        date: attrs?.date ?? "",
        image: attrs?.image ?? null,
        videoUrl: attrs?.videoUrl ?? null,
        shortDescription: attrs?.shortDescription ?? "",
        fullDescription: attrs?.fullDescription ?? null,
      };
    });
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Upcoming Events</h1>
      <EventsCarousel events={events} />
    </PageContainer>
  );
}
