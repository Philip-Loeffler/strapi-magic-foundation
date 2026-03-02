"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/components/motion-primitives/morphing-dialog";
import { JSX } from "react";
import { Button } from "@/components/ui/button";

interface AboutContentRendererProps {
  content: any;
}

export function AboutContentRenderer({ content }: AboutContentRendererProps) {
  if (!content) return null;

  // Handle Overview Tab
  if (
    content.introParagraphs ||
    content.goalsForChildren ||
    content.goalsForAdults
  ) {
    return <OverviewTabRenderer content={content} />;
  }

  // Handle History Tab
  if (content.founders || content.historySections) {
    return <HistoryTabRenderer content={content} />;
  }

  // Handle Team Structure Tab
  if (
    content.boardMembers ||
    content.staffMembers ||
    content.divisionConsultants
  ) {
    return <TeamStructureTabRenderer content={content} />;
  }

  // Handle Contact Tab
  if (content.mapEmbedUrl || content.address || content.phoneNumbers) {
    return <ContactTabRenderer content={content} />;
  }

  return null;
}

function OverviewTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {/* Intro Paragraphs */}
      {content.introParagraphs && content.introParagraphs.length > 0 && (
        <div className="space-y-4">
          {content.introParagraphs.map((paragraph: any, index: number) => (
            <div key={index} className="prose max-w-none">
              <RichTextRenderer content={paragraph.content} />
            </div>
          ))}
        </div>
      )}

      {/* Goals for Children */}
      {content.goalsForChildren && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">
            {content.goalsForChildren.title || "For affected children"}
          </h2>
          {content.goalsForChildren.goals &&
            content.goalsForChildren.goals.length > 0 && (
              <ul className="list-disc pl-6 space-y-2">
                {content.goalsForChildren.goals.map(
                  (goal: any, index: number) => (
                    <li key={index}>
                      <RichTextRenderer content={goal.text} />
                    </li>
                  ),
                )}
              </ul>
            )}
        </div>
      )}

      {/* Goals for Adults */}
      {content.goalsForAdults && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            {content.goalsForAdults.title || "For affected adults"}
          </h2>
          {content.goalsForAdults.goals &&
            content.goalsForAdults.goals.length > 0 && (
              <ul className="list-disc pl-6 space-y-2">
                {content.goalsForAdults.goals.map(
                  (goal: any, index: number) => (
                    <li key={index}>
                      <RichTextRenderer content={goal.text} />
                    </li>
                  ),
                )}
              </ul>
            )}
        </div>
      )}

      {/* Disclaimer */}
      {content.disclaimer && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">
            {content.disclaimer.disclaimerTitle}
          </h2>

          <RichTextRenderer content={content.disclaimer.content} />
        </div>
      )}

      {/* Height Measurement Instructions */}
      {content.heightMeasurementInstructions && (
        <div className="space-y-4">
          {content.heightMeasurementInstructions.title && (
            <h2 className="text-2xl font-bold">
              {content.heightMeasurementInstructions.title}
            </h2>
          )}
          {content.heightMeasurementInstructions.instructions &&
            content.heightMeasurementInstructions.instructions.length > 0 && (
              <ol className="list-decimal pl-6 space-y-2">
                {content.heightMeasurementInstructions.instructions.map(
                  (instruction: any, index: number) => (
                    <li key={index}>
                      <RichTextRenderer content={instruction.text} />
                    </li>
                  ),
                )}
              </ol>
            )}
          {content.heightMeasurementInstructions.footerText && (
            <p className="text-muted-foreground">
              {content.heightMeasurementInstructions.footerText}
            </p>
          )}
        </div>
      )}

      {/* Testimonial */}
      {content.testimonial && (
        <div className="border-l-4 border-primary pl-4 italic my-8">
          <RichTextRenderer content={content.testimonial.quote} />
          {content.testimonial.author && (
            <p className="mt-2 not-italic">
              <strong>{content.testimonial.author}</strong>
              {content.testimonial.location &&
                `, ${content.testimonial.location}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const PLACEHOLDER_FOUNDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M4 4h16v16H4V4zm2 2v12h12V6H6z'/%3E%3C/svg%3E";

/** Card image: founder.image (like personal story image) or first image from profileBlocks. */
function getFounderCardImageUrl(founder: any): string {
  if (founder?.image) return getImageUrl(founder.image);
  if (!founder?.profileBlocks?.length) return "";
  const imageBlock = founder.profileBlocks.find(
    (b: any) => b.blockType === "image" && b.image,
  );
  return imageBlock ? getImageUrl(imageBlock.image) : "";
}

/** First image in founder profile (for modal hero): founder.image or first image block. */
function getFounderFirstImageUrl(founder: any): string {
  const fromCard = founder?.image ? getImageUrl(founder.image) : "";
  if (fromCard) return fromCard;
  if (!founder?.profileBlocks?.length) return "";
  const imageBlock = founder.profileBlocks.find(
    (b: any) => b.blockType === "image" && b.image,
  );
  return imageBlock ? getImageUrl(imageBlock.image) : "";
}

/** Renders an image inside the founder profile modal; click opens motion primitive modal (same UX as personal stories). */
function FounderProfileImageBlock({ image, alt }: { image: any; alt: string }) {
  const imageUrl = getImageUrl(image);
  if (!imageUrl) return null;
  return (
    <MorphingDialog
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      <MorphingDialogTrigger className="cursor-pointer block w-full">
        <div className="flex justify-center">
          <MorphingDialogImage
            src={imageUrl}
            alt={alt}
            className="h-80 w-80 object-cover rounded-xl border-2 border-blue-900"
          />
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{ borderRadius: "12px" }}
          className="relative h-auto max-h-[90vh] w-full max-w-[500px] border-2 border-blue-900 bg-white overflow-hidden"
        >
          <div className="flex justify-center p-6">
            <MorphingDialogImage
              src={imageUrl}
              alt={alt}
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
          </div>
          <MorphingDialogClose className="text-zinc-500" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

function HistoryTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-12">
      {/* Meet the Founders - same UX as Personal Stories: card grid + motion modal */}
      {content.founders && content.founders.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-left">Meet the Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {content.founders.map((founder: any, index: number) => {
              const cardImageUrl =
                getFounderCardImageUrl(founder) || PLACEHOLDER_FOUNDER_IMAGE;
              const modalHeroImageUrl = getFounderFirstImageUrl(founder);
              return (
                <MorphingDialog
                  key={index}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                >
                  <MorphingDialogTrigger className="cursor-pointer text-left w-[264px]">
                    <div className="w-[264px] h-[200px] overflow-hidden bg-gray-200 rounded">
                      <MorphingDialogImage
                        src={cardImageUrl}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start text-left mt-2 space-y-0.5 w-[264px]">
                      <MorphingDialogTitle className="text-base font-semibold text-black">
                        {founder.name}
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className="text-sm text-gray-600">
                        Founder
                      </MorphingDialogSubtitle>
                    </div>
                  </MorphingDialogTrigger>
                  <MorphingDialogContainer>
                    <MorphingDialogContent
                      style={{ borderRadius: "12px" }}
                      className="relative h-auto max-h-[90vh] w-full max-w-[500px] border-2 border-blue-900 bg-white overflow-hidden"
                    >
                      <div className="overflow-y-auto max-h-[90vh]">
                        <div className="relative p-6 space-y-6">
                          {modalHeroImageUrl ? (
                            <div className="flex justify-center">
                              <MorphingDialogImage
                                src={modalHeroImageUrl}
                                alt={founder.name}
                                className="h-80 w-80 object-cover rounded-xl border-2 border-blue-900"
                              />
                            </div>
                          ) : null}
                          <div className="space-y-2">
                            <MorphingDialogTitle className="text-xl font-semibold text-black text-center">
                              {founder.name}
                            </MorphingDialogTitle>
                            <MorphingDialogSubtitle className="font-light text-gray-500 text-center">
                              Founder
                            </MorphingDialogSubtitle>
                          </div>
                          {founder.profileBlocks &&
                          founder.profileBlocks.length > 0 ? (
                            <div className="space-y-6">
                              {founder.profileBlocks.map(
                                (block: any, blockIndex: number) =>
                                  block.blockType === "content" ? (
                                    <div
                                      key={blockIndex}
                                      className="prose prose-sm max-w-none text-gray-700"
                                    >
                                      <RichTextRenderer
                                        content={block.content}
                                      />
                                    </div>
                                  ) : block.blockType === "image" &&
                                    block.image ? (
                                    <FounderProfileImageBlock
                                      key={blockIndex}
                                      image={block.image}
                                      alt={`${founder.name} - photo ${blockIndex + 1}`}
                                    />
                                  ) : null,
                              )}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-center text-sm">
                              No profile content yet.
                            </p>
                          )}
                        </div>
                      </div>
                      <MorphingDialogClose className="text-zinc-500" />
                    </MorphingDialogContent>
                  </MorphingDialogContainer>
                </MorphingDialog>
              );
            })}
          </div>
        </div>
      )}

      {/* History Sections */}
      {content.historySections && content.historySections.length > 0 && (
        <div className="space-y-8">
          {content.historySections.map((section: any, index: number) => (
            <div key={index} className="space-y-4">
              {section.title && (
                <h2 className="text-lg font-bold">{section.title}</h2>
              )}
              {section.content && (
                <div className="prose max-w-none">
                  <RichTextRenderer content={section.content} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TeamStructureTabRenderer({ content }: { content: any }) {
  const PLACEHOLDER_AVATAR =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

  return (
    <div className="space-y-12">
      {/* Board Members */}
      {content.boardMembers && content.boardMembers.length > 0 && (
        <div className="space-y-6">
          <div className="h-[50px] bg-[#B0C3FF] p-[12px_24px] gap-[10px] rounded-[12px] font-bold">
            <h2 className="text-xl font-semibold text-slate-800">
              MAGIC'S BOARD
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {content.boardMembers.map((member: any, index: number) => {
              const imageUrl = member.image
                ? getImageUrl(member.image)
                : PLACEHOLDER_AVATAR;
              return (
                <div key={index} className="text-left w-full min-w-0">
                  <div className="w-full aspect-[264/200] mb-4 overflow-hidden bg-gray-200 rounded">
                    <img
                      src={imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Division Consultants */}
      {content.divisionConsultants && (
        <div className="space-y-6">
          <div className="h-[50px] bg-[#B0C3FF] p-[12px_24px] gap-[10px] rounded-[12px] font-bold">
            <h2 className="text-xl font-semibold text-slate-800">
              DIVISION CONSULTANTS
            </h2>
          </div>
          {content.divisionConsultants.description && (
            <div className="prose max-w-none">
              <RichTextRenderer
                content={content.divisionConsultants.description}
              />
            </div>
          )}
          {content.divisionConsultants.consultants &&
            content.divisionConsultants.consultants.length > 0 && (
              <ul className="list-disc pl-6 space-y-2">
                {content.divisionConsultants.consultants.map(
                  (consultant: any, index: number) => (
                    <li key={index}>
                      <strong>{consultant.disorder}</strong> -{" "}
                      {consultant.consultantName}
                    </li>
                  ),
                )}
              </ul>
            )}
        </div>
      )}

      {/* Staff Members */}
      {content.staffMembers && content.staffMembers.length > 0 && (
        <div className="space-y-6">
          <div className="h-[50px] bg-[#B0C3FF] p-[12px_24px] gap-[10px] rounded-[12px] font-bold">
            <h2 className="text-xl font-semibold text-slate-800">STAFF</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {content.staffMembers.map((member: any, index: number) => {
              const imageUrl = member.image
                ? getImageUrl(member.image)
                : PLACEHOLDER_AVATAR;
              return (
                <div key={index} className="text-left w-full min-w-0">
                  <div className="w-full aspect-[264/200] mb-4 overflow-hidden bg-gray-200 rounded">
                    <img
                      src={imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Medical Advisory Board */}
      {content.medicalAdvisoryBoard &&
        content.medicalAdvisoryBoard.length > 0 && (
          <div className="space-y-6">
            <div className="h-[50px] bg-[#B0C3FF] p-[12px_24px] gap-[10px] rounded-[12px] font-bold">
              <h2 className="text-xl font-semibold text-slate-800">
                MEDICAL ADVISORY BOARD
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
              {content.medicalAdvisoryBoard.map(
                (advisor: any, index: number) => {
                  const imageUrl = advisor.image
                    ? getImageUrl(advisor.image)
                    : PLACEHOLDER_AVATAR;
                  return (
                    <div key={index} className="text-left w-full min-w-0">
                      <div className="w-full aspect-[264/200] mb-4 overflow-hidden bg-gray-200 rounded">
                        <img
                          src={imageUrl}
                          alt={advisor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold">{advisor.name}</h3>
                      {advisor.qualifications && (
                        <div className="text-sm text-muted-foreground mt-2 text-left">
                          <RichTextRenderer content={advisor.qualifications} />
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}
    </div>
  );
}

function ContactTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {/* Map and Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2">
          {content.mapEmbedUrl ? (
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                src={content.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map placeholder</p>
            </div>
          )}
        </div>

        {/* Contact Information - in a card */}
        <Card className=" shadow-sm bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xl">Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.address && (
              <div>
                <p className="text-sm">{content.address}</p>
              </div>
            )}
            {content.phoneNumbers && content.phoneNumbers.length > 0 && (
              <div className="space-y-2">
                {content.phoneNumbers.map((phone: any, index: number) => (
                  <div key={index}>
                    <a
                      href={`tel:${phone.value?.replace?.(/\D/g, "") || phone.value}`}
                      className="text-sm text-blue-900 underline font-medium"
                    >
                      {phone.value}
                    </a>
                  </div>
                ))}
              </div>
            )}
            {content.fax && (
              <div>
                <p className="text-sm text-muted-foreground">Fax:</p>
                <a
                  href={`tel:${content.fax?.replace?.(/\D/g, "") || content.fax}`}
                  className="text-sm text-blue-900 hover:underline font-medium"
                >
                  {content.fax}
                </a>
              </div>
            )}
            {content.email && (
              <div>
                {/* <p className="text-sm text-muted-foreground">Email:</p> */}
                <a
                  href={`mailto:${content.email}`}
                  className="text-sm text-blue-900 underline font-medium break-all"
                >
                  {content.email}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold">Send us a Message</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name Here"
                className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="000-000-0000"
                className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Your Email Address Here"
                className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-bold mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {content.contactFormSubjects &&
                content.contactFormSubjects.length > 0 ? (
                  content.contactFormSubjects.map(
                    (subject: any, index: number) => (
                      <option key={index} value={subject.value}>
                        {subject.label}
                      </option>
                    ),
                  )
                ) : (
                  <option value="general">General Comment or Inquiry</option>
                )}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your message here..."
            />
          </div>

          <Button type="submit" className="bg-primary">
            {" "}
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </div>
  );
}

function RichTextRenderer({ content }: { content: any }) {
  if (!content) return null;

  // Handle Strapi RichText format
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
                <p key={index} className="mb-4">
                  {renderChildren(node.children)}
                </p>
              );
            case "heading":
              const HeadingTag =
                `h${node.level}` as keyof JSX.IntrinsicElements;
              return (
                <HeadingTag key={index} className={`mb-4 font-bold`}>
                  {renderChildren(node.children)}
                </HeadingTag>
              );
            case "list":
              const ListTag = node.format === "unordered" ? "ul" : "ol";
              return (
                <ListTag key={index} className="list-disc pl-6 mb-4 space-y-2">
                  {node.children?.map((item: any, itemIndex: number) => (
                    <li key={itemIndex}>{renderChildren(item.children)}</li>
                  ))}
                </ListTag>
              );
            case "quote":
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-primary pl-4 italic my-4"
                >
                  {renderChildren(node.children)}
                </blockquote>
              );
            default:
              return <div key={index}>{renderChildren(node.children)}</div>;
          }
        })}
      </div>
    );
  }

  return null;
}

function renderChildren(children: any[]): React.ReactNode {
  if (!children) return null;
  return children.map((child: any, index: number) => {
    if (child.type === "text") {
      let text = child.text;
      if (child.bold) text = <strong key={index}>{text}</strong>;
      if (child.italic) text = <em key={index}>{text}</em>;
      if (child.underline) text = <u key={index}>{text}</u>;
      return text;
    }
    if (child.type === "link") {
      return (
        <a
          key={index}
          href={child.url}
          target={child.target || "_self"}
          className="text-primary hover:underline"
        >
          {renderChildren(child.children)}
        </a>
      );
    }
    return renderChildren(child.children);
  });
}

function getImageUrl(image: any): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (image.url) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  }
  if (image.data?.attributes?.url) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    return `${baseUrl}${image.data.attributes.url}`;
  }
  return "";
}
