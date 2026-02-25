"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

export type EventItem = {
  id: number;
  title: string;
  date: string;
  image?: { url?: string; data?: { attributes?: { url?: string } } } | null;
  videoUrl?: string | null;
  shortDescription: string;
  fullDescription?: unknown;
};

function getImageUrl(image: EventItem["image"]): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (image.url)
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  if (image.data?.attributes?.url)
    return `${baseUrl}${image.data.attributes.url}`;
  return "";
}

/** Convert YouTube watch URL to embed URL for iframe, or return as-is if already embed. */
function getVideoEmbedUrl(url: string): string {
  const u = url.trim();
  const watchMatch = u.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  if (u.includes("/embed/")) return u;
  return u;
}

export function EventsCarousel({ events }: { events: EventItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalEvent, setModalEvent] = useState<EventItem | null>(null);

  const count = events.length;
  const prev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? count - 1 : i - 1));
  }, [count]);
  const next = useCallback(() => {
    setCurrentIndex((i) => (i >= count - 1 ? 0 : i + 1));
  }, [count]);

  if (!count) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No upcoming events at this time.
      </div>
    );
  }

  const event = events[currentIndex];
  const imageUrl = event.image ? getImageUrl(event.image) : null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-stretch gap-6 rounded-xl border bg-card p-6 shadow-sm">
        {/* Left arrow */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-2 shadow hover:bg-muted"
          aria-label="Previous event"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6 flex-1 min-w-0 pl-10 pr-10">
          {imageUrl && (
            <div className="flex-shrink-0 flex justify-center">
              <img
                src={imageUrl}
                alt={event.title}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-2">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.date}</p>
            <p className="text-sm line-clamp-4">{event.shortDescription}</p>
            <Button
              variant="default"
              size="sm"
              onClick={() => setModalEvent(event)}
              className="mt-2"
            >
              Read More
            </Button>
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-2 shadow hover:bg-muted"
          aria-label="Next event"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Pagination dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {events.map((_, i) => (
            <button
              key={events[i].id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to event ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Read More modal */}
      {modalEvent && (
        <EventModal event={modalEvent} onClose={() => setModalEvent(null)} />
      )}
    </div>
  );
}

function EventModal({
  event: modalEvent,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const imageUrl = modalEvent.image ? getImageUrl(modalEvent.image) : null;
  const hasVideo = Boolean(modalEvent.videoUrl?.trim());
  const hasImage = Boolean(imageUrl);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 px-6 py-5 border-b bg-white shrink-0">
          <div className="flex-1 min-w-0">
            <h2
              id="event-modal-title"
              className="text-xl sm:text-2xl font-semibold text-slate-900 truncate"
            >
              {modalEvent.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{modalEvent.date}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-slate-200 hover:bg-slate-100 shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT — video + content */}
            <div className="flex flex-col px-6 py-6">
              {hasVideo && (
                <div className="mb-6">
                  <div className="relative w-full aspect-video overflow-hidden rounded-xl border bg-slate-100">
                    <iframe
                      src={getVideoEmbedUrl(modalEvent.videoUrl!)}
                      title={`${modalEvent.title} video`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Main content */}
              {modalEvent.fullDescription ? (
                <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
                  <EventRichText content={modalEvent.fullDescription} />
                </div>
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {modalEvent.shortDescription}
                </p>
              )}
            </div>

            {/* RIGHT — image only, full width + height */}
            <div className="relative hidden lg:block h-full  ">
              {hasImage && (
                <img src={imageUrl!} alt={modalEvent.title} className=" " />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventRichText({ content }: { content: unknown }) {
  if (!content) return null;
  if (typeof content === "string") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  if (Array.isArray(content)) {
    return (
      <div>
        {(content as any[]).map((node: any, index: number) => {
          switch (node.type) {
            case "paragraph":
              return (
                <p key={index} className="mb-2">
                  {renderRichChildren(node.children)}
                </p>
              );
            case "heading": {
              const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
              return (
                <Tag key={index} className="font-bold mb-2">
                  {renderRichChildren(node.children)}
                </Tag>
              );
            }
            case "list":
              const ListTag = node.format === "unordered" ? "ul" : "ol";
              return (
                <ListTag key={index} className="list-disc pl-6 mb-2">
                  {node.children?.map((item: any, j: number) => (
                    <li key={j}>{renderRichChildren(item.children)}</li>
                  ))}
                </ListTag>
              );
            case "link":
              return (
                <a
                  key={index}
                  href={node.url}
                  target={node.target || "_self"}
                  className="text-primary underline"
                >
                  {renderRichChildren(node.children)}
                </a>
              );
            default:
              return (
                <div key={index}>{renderRichChildren(node?.children)}</div>
              );
          }
        })}
      </div>
    );
  }
  return null;
}

function renderRichChildren(children: any[]): React.ReactNode {
  if (!children) return null;
  return children.map((child: any, index: number) => {
    if (child.type === "text") {
      let text: React.ReactNode = child.text;
      if (child.bold) text = <strong key={index}>{text}</strong>;
      if (child.italic) text = <em key={index}>{text}</em>;
      return <span key={index}>{text}</span>;
    }
    if (child.type === "link") {
      return (
        <a
          key={index}
          href={child.url}
          target={child.target || "_self"}
          className="text-primary underline"
        >
          {renderRichChildren(child.children)}
        </a>
      );
    }
    return renderRichChildren(child.children);
  });
}
