"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX } from "react";

interface InsuranceAppealsContentRendererProps {
  content: any;
  tab: "overview" | "faq" | "appeal-process" | "patient-assistance";
}

export function InsuranceAppealsContentRenderer({
  content,
  tab,
}: InsuranceAppealsContentRendererProps) {
  if (!content) return null;

  switch (tab) {
    case "overview":
      return <OverviewTab content={content} />;
    case "faq":
      return <FAQTab content={content} />;
    case "appeal-process":
      return <AppealProcessTab content={content} />;
    case "patient-assistance":
      return <PatientAssistanceTab content={content} />;
    default:
      return null;
  }
}

function introParagraphs(content: any): string[] {
  return [
    content.introParagraph1,
    content.introParagraph2,
    content.introParagraph3,
  ].filter(Boolean);
}

function externalAppealParagraphs(content: any): string[] {
  return [
    content.externalAppealProcessParagraph1,
    content.externalAppealProcessParagraph2,
    content.externalAppealProcessParagraph3,
  ].filter(Boolean);
}

function OverviewTab({ content }: { content: any }) {
  const intro = introParagraphs(content);
  const externalAppeal = externalAppealParagraphs(content);

  return (
    <div className="space-y-12">
      {/* Top section: description left, video right (RSS-style grid) */}
      {(intro.length > 0 || content.videoEmbedUrl) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: description (3 paragraphs) */}
          {intro.length > 0 && (
            <div className="space-y-4">
              <div className="prose max-w-none space-y-4">
                {intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Right: video */}
          {content.videoEmbedUrl && (
            <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-muted">
              <iframe
                src={content.videoEmbedUrl}
                title="Insurance Appeals Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}

      {/* External Appeal Process Information: title + 3 paragraphs + accordion */}
      {(externalAppeal.length > 0 ||
        (content.accordionSections &&
          content.accordionSections.length > 0)) && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">
            External Appeal Process Information
          </h2>
          {externalAppeal.length > 0 && (
            <div className="prose max-w-none space-y-4">
              {externalAppeal.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {content.accordionSections &&
            content.accordionSections.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {content.accordionSections.map(
                  (section: any, index: number) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="text-left font-bold">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="pl-6 space-y-2">
                        {section.content && (
                          <RichTextRenderer content={section.content} />
                        )}
                        {section.bulletPoints &&
                          section.bulletPoints.length > 0 && (
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                              {section.bulletPoints.map(
                                (bp: { text: string }, i: number) => (
                                  <li key={i}>{bp.text}</li>
                                ),
                              )}
                            </ul>
                          )}
                      </AccordionContent>
                    </AccordionItem>
                  ),
                )}
              </Accordion>
            )}
        </div>
      )}
    </div>
  );
}

function FAQTab({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.title && <h2 className="text-2xl font-bold">{content.title}</h2>}
      {content.faqItems && content.faqItems.length > 0 && (
        <div className="space-y-6">
          {content.faqItems.map((item: any, index: number) => (
            <div key={index} className="space-y-2">
              <p className="font-semibold text-primary">Q: {item.question}</p>
              <div className="pl-4 prose prose-sm max-w-none">
                <RichTextRenderer
                  content={item.answer}
                  linkReplacements={
                    item.links?.length > 0
                      ? item.links
                          .filter((l: any) => l.linkUrl && l.linkText)
                          .map((l: any) => ({
                            url: l.linkUrl,
                            text: l.linkText,
                          }))
                      : undefined
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AppealProcessTab({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.intro && (
        <div className="prose max-w-none">
          <RichTextRenderer content={content.intro} />
        </div>
      )}
      {content.listItems && content.listItems.length > 0 && (
        <ul className="list-disc pl-6 space-y-3">
          {content.listItems.map((item: any, index: number) => (
            <li key={index}>
              <strong>{item.title}:</strong>{" "}
              {item.description && (
                <span className="inline">
                  <RichTextRenderer content={item.description} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {content.buttonText && content.buttonUrl && (
        <div className="pt-4">
          <Button asChild className="bg-primary">
            <Link
              href={content.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.buttonText}
            </Link>
          </Button>
        </div>
      )}
      {content.footnote && (
        <p className="text-sm italic text-muted-foreground mt-4">
          {content.footnote}
        </p>
      )}

      {/* Sample Appeal Letters section */}
      {(content.sampleAppealTitle ||
        content.sampleAppealDescription ||
        (content.sampleAppealLinks &&
          content.sampleAppealLinks.length > 0)) && (
        <div className="space-y-4 pt-6 border-t">
          {content.sampleAppealTitle && (
            <h2 className="text-xl font-bold">{content.sampleAppealTitle}</h2>
          )}
          {content.sampleAppealDescription && (
            <div className="prose max-w-none">
              <RichTextRenderer content={content.sampleAppealDescription} />
            </div>
          )}
          {content.sampleAppealLinks &&
            content.sampleAppealLinks.length > 0 && (
              <ul className="list-disc pl-6 space-y-2">
                {content.sampleAppealLinks.map((item: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </div>
      )}

      {/* Follow Up section */}
      {(content.followUpTitle ||
        content.followUpDescription ||
        (content.followUpItems && content.followUpItems.length > 0) ||
        content.followUpQuote) && (
        <div className="space-y-6 pt-6 border-t">
          {content.followUpTitle && (
            <h2 className="text-xl font-bold">{content.followUpTitle}</h2>
          )}
          {content.followUpDescription && (
            <div className="prose max-w-none">
              <RichTextRenderer content={content.followUpDescription} />
            </div>
          )}
          {content.followUpItems && content.followUpItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.followUpItems.map((item: any, index: number) => (
                <div key={index} className="space-y-3">
                  {item.title && (
                    <h3 className="font-semibold">{item.title}</h3>
                  )}
                  {item.buttonUrl && (
                    <Button asChild className="bg-primary">
                      <Link
                        href={item.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.buttonText || "Open Form"}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="space-y-6 pt-1 border-t"> </div>

          {content.followUpQuote && (
            <div className="border-l-4 border-primary pl-4 italic my-8">
              <RichTextRenderer content={content.followUpQuote.quote} />
              {content.followUpQuote.author && (
                <p className="mt-2 not-italic">
                  <strong>{content.followUpQuote.author}</strong>
                  {content.followUpQuote.location &&
                    `, ${content.followUpQuote.location}`}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Section title styling matching Get Support accordion triggers (blue banner). */
const patientAssistanceSectionTitleClassName =
  "bg-primary text-primary-foreground px-4 py-3 font-semibold text-lg rounded-t-lg w-full";

function PatientAssistanceTab({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {/* Pharmaceutical Patient Assistance Programs */}
      {(content.pharmaceuticalTitle ||
        content.pharmaceuticalDescription ||
        (content.pharmaceuticalAccordion &&
          content.pharmaceuticalAccordion.length > 0)) && (
        <div className="rounded-lg border border-border overflow-hidden">
          {content.pharmaceuticalTitle && (
            <div className={patientAssistanceSectionTitleClassName}>
              {content.pharmaceuticalTitle}
            </div>
          )}
          <div
            className={`p-4 bg-card space-y-6 ${!content.pharmaceuticalTitle ? "rounded-t-lg" : ""}`}
          >
            {content.pharmaceuticalDescription && (
              <div className="prose max-w-none">
                <RichTextRenderer
                  content={content.pharmaceuticalDescription}
                  linkReplacements={
                    content.pharmaceuticalEmailUrl &&
                    content.pharmaceuticalEmailLinkText
                      ? [
                          {
                            url: content.pharmaceuticalEmailUrl,
                            text: content.pharmaceuticalEmailLinkText,
                          },
                        ]
                      : undefined
                  }
                />
              </div>
            )}
            {content.pharmaceuticalAccordion &&
              content.pharmaceuticalAccordion.length > 0 && (
                <Accordion type="single" collapsible className="w-full">
                  {content.pharmaceuticalAccordion.map(
                    (item: any, index: number) => (
                      <AccordionItem key={index} value={`pharma-${index}`}>
                        <AccordionTrigger className="text-left font-bold">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pl-6 space-y-2">
                          {item.name && (
                            <p className="font-medium">{item.name}</p>
                          )}
                          {item.companyName && <p>{item.companyName}</p>}
                          {item.websiteUrl && (
                            <p>
                              <Link
                                href={item.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                              >
                                {item.title}
                              </Link>
                            </p>
                          )}
                          {item.website2Url && (
                            <p>
                              <Link
                                href={item.website2Url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                              >
                                {item.title}
                              </Link>
                            </p>
                          )}
                          {item.phoneNumber && (
                            <p>
                              <a
                                href={`tel:${item.phoneNumber.replace(/\D/g, "")}`}
                                className="text-primary underline"
                              >
                                {item.phoneNumber}
                              </a>
                            </p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              )}
          </div>
        </div>
      )}

      {/* Patient Assistance Foundations */}
      {(content.foundationsTitle ||
        content.foundationsDescription ||
        (content.foundationsLinks && content.foundationsLinks.length > 0)) && (
        <div className="rounded-lg border border-border overflow-hidden">
          {content.foundationsTitle && (
            <div className={patientAssistanceSectionTitleClassName}>
              {content.foundationsTitle}
            </div>
          )}
          <div
            className={`p-4 bg-card space-y-6 ${!content.foundationsTitle ? "rounded-t-lg" : ""}`}
          >
            {content.foundationsDescription && (
              <div className="prose max-w-none">
                <RichTextRenderer
                  content={content.foundationsDescription}
                  linkReplacements={
                    content.foundationsEmailUrl &&
                    content.foundationsEmailLinkText
                      ? [
                          {
                            url: content.foundationsEmailUrl,
                            text: content.foundationsEmailLinkText,
                          },
                        ]
                      : undefined
                  }
                />
              </div>
            )}
            {content.foundationsLinks &&
              content.foundationsLinks.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {content.foundationsLinks.map((item: any, index: number) => (
                    <li key={index}>
                      {item.title}
                      {item.websiteUrl && (
                        <>
                          {" — "}
                          <Link
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            {item.websiteDisplayText || item.websiteUrl}
                          </Link>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

function RichTextRenderer({
  content,
  linkReplacements,
}: {
  content: any;
  linkReplacements?: Array<{ url: string; text: string }>;
}) {
  if (!content) return null;
  if (typeof content === "string") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((node: any, index: number) => {
          switch (node.type) {
            case "paragraph":
              return (
                <p key={index} className="mb-2">
                  {renderChildren(node.children, linkReplacements)}
                </p>
              );
            case "heading": {
              const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
              return (
                <Tag key={index} className="font-bold mb-2">
                  {renderChildren(node.children, linkReplacements)}
                </Tag>
              );
            }
            case "list":
              const ListTag = node.format === "unordered" ? "ul" : "ol";
              return (
                <ListTag key={index} className="list-disc pl-6 mb-2">
                  {node.children?.map((item: any, j: number) => (
                    <li key={j}>
                      {renderChildren(item.children, linkReplacements)}
                    </li>
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
                  {renderChildren(node.children, linkReplacements)}
                </a>
              );
            default:
              return (
                <div key={index}>
                  {renderChildren(node.children, linkReplacements)}
                </div>
              );
          }
        })}
      </div>
    );
  }
  return null;
}

function renderChildren(
  children: any[],
  linkReplacements?: Array<{ url: string; text: string }>,
): React.ReactNode {
  if (!children) return null;
  return children.map((child: any, index: number) => {
    if (child.type === "text") {
      const textContent = child.text;
      if (
        linkReplacements &&
        linkReplacements.length > 0 &&
        linkReplacements.some((r) => textContent.includes(r.text))
      ) {
        return (
          <span key={index}>
            {applyLinkReplacements(
              textContent,
              linkReplacements,
              child.bold,
              child.italic,
            )}
          </span>
        );
      }
      let text: React.ReactNode = textContent;
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
          {renderChildren(child.children, linkReplacements)}
        </a>
      );
    }
    return renderChildren(child.children, linkReplacements);
  });
}

function applyLinkReplacements(
  text: string,
  replacements: Array<{ url: string; text: string }>,
  bold?: boolean,
  italic?: boolean,
): React.ReactNode {
  if (replacements.length === 0) {
    const content = bold ? (
      <strong>{text}</strong>
    ) : italic ? (
      <em>{text}</em>
    ) : (
      text
    );
    return content;
  }
  const [first, ...rest] = replacements;
  if (!text.includes(first.text)) {
    return applyLinkReplacements(text, rest, bold, italic);
  }
  const parts = text.split(first.text);
  const result: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      result.push(
        <a
          key={`link-${i}`}
          href={first.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {first.text}
        </a>,
      );
    }
    result.push(applyLinkReplacements(parts[i], rest, bold, italic));
  }
  return <>{result}</>;
}
