import { EventsCarousel, type EventItem } from "@/components/events/EventsCarousel";

async function getEvents(): Promise<EventItem[]> {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
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
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold">Events</h1>
        </div>
        <EventsCarousel events={events} />
      </div>
    </div>
  );
}
