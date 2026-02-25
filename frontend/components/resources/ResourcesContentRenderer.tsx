"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { JSX } from "react";

function getImageUrl(image: any): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (image.url)
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  if (image.data?.attributes?.url)
    return `${baseUrl}${image.data.attributes.url}`;
  return "";
}

export function ResourcesContentRenderer({
  content,
  tab,
  socialMediaContent,
}: {
  content: any;
  tab: "overview" | "informational-videos" | "social-media" | "get-support" | "spread-the-word";
  socialMediaContent?: any;
}) {
  if (tab === "overview") {
    const hasOverview = content?.content;
    const hasSocial = socialMediaContent && (
      (socialMediaContent.parentsGroups?.length > 0) ||
      (socialMediaContent.adultsGroups?.length > 0)
    );
    if (!hasOverview && !hasSocial) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          Content coming soon...
        </div>
      );
    }
    return (
      <div className="space-y-10">
        {hasOverview && (
          <div className="prose prose-sm max-w-none">
            <ResourcesRichText content={content.content} />
          </div>
        )}
        {hasSocial && (
          <SocialMediaSection content={socialMediaContent} />
        )}
      </div>
    );
  }

  if (tab === "get-support" || tab === "spread-the-word") {
    if (!content?.content) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          Content coming soon...
        </div>
      );
    }
    return (
      <div className="prose prose-sm max-w-none">
        <ResourcesRichText content={content.content} />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Content coming soon...
      </div>
    );
  }

  if (tab === "informational-videos") {
    const intro = content.intro;
    const youtubeUrl = content.youtubeChannelUrl;
    const videos = content.videos ?? [];
    return (
      <div className="space-y-6">
        {intro && (
          <div className="prose prose-sm max-w-none mb-6">
            <ResourcesRichText content={intro} />
            {youtubeUrl && (
              <p className="mt-2">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  The MAGIC Foundation - YouTube
                </a>
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length === 0 ? (
            <p className="text-muted-foreground col-span-full">
              No videos added yet.
            </p>
          ) : (
            videos.map((video: any, index: number) => {
              const thumbUrl = video.thumbnail
                ? getImageUrl(video.thumbnail)
                : null;
              const href = video.videoUrl || "#";
              return (
                <Link
                  key={index}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group block"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    {thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted-foreground/10" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-lg">
                        <Play className="h-7 w-7 ml-1" fill="currentColor" />
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-2 font-medium text-sm line-clamp-2 group-hover:text-primary">
                    {video.title}
                  </h3>
                </Link>
              );
            })
          )}
        </div>
      </div>
    );
  }

  if (tab === "social-media") {
    return <SocialMediaSection content={content} />;
  }

  return null;
}

function SocialMediaSection({ content }: { content: any }) {
  if (!content) return null;
  const parentsTitle = content.parentsSectionTitle;
  const parentsGroups = content.parentsGroups ?? [];
  const adultsTitle = content.adultsSectionTitle;
  const adultsGroups = content.adultsGroups ?? [];
  if (parentsGroups.length === 0 && adultsGroups.length === 0) {
    return <p className="text-muted-foreground">No links added yet.</p>;
  }
  return (
    <div className="space-y-8">
      {parentsGroups.length > 0 && (
        <section>
          {parentsTitle && (
            <p className="text-sm font-medium mb-3">{parentsTitle}</p>
          )}
          <ul className="list-disc pl-6 space-y-1">
            {parentsGroups.map((item: any, i: number) => (
              <li key={i}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {adultsGroups.length > 0 && (
        <section>
          {adultsTitle && (
            <p className="text-sm font-medium mb-3">{adultsTitle}</p>
          )}
          <ul className="list-disc pl-6 space-y-1">
            {adultsGroups.map((item: any, i: number) => (
              <li key={i}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ResourcesRichText({ content }: { content: unknown }) {
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
