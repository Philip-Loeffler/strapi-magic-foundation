"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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

interface TempleContentRendererProps {
  content: any;
}

const TEMPLE_OVERVIEW_SECTIONS = [
  "whatIsTemple",
  "diagnosis",
  "phenotype",
  "cognitiveAbilities",
  "firstSteps",
  "hypoglycemia",
  "treatments",
  "weightManagement",
  "boneAge",
  "puberty",
  "heightImprovement",
  "growthHormoneTherapy",
  "insuranceCoverage",
  "factorsAffectingGht",
  "adulthoodHealthIssues",
] as const;

export function TempleContentRenderer({ content }: TempleContentRendererProps) {
  if (!content) return null;

  // Handle Overview Tab
  if (content.heroSection || content.whatIsTemple) {
    return <TempleOverviewRenderer content={content} />;
  }

  // Handle Personal Stories Tab
  if (content.stories) {
    return <PersonalStoriesTabRenderer content={content} />;
  }

  // Handle Resources Tab
  if (content.resourceCategories) {
    return <ResourcesTabRenderer content={content} />;
  }

  // Handle Division Leaders Tab
  if (content.leaders) {
    return <DivisionLeadersTabRenderer content={content} />;
  }

  return null;
}

function TempleOverviewRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-12">
      {content.heroSection && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: heading content */}
          <div className="space-y-4">
            {content.heroSection.title && (
              <h1 className="font-bold">{content.heroSection.title}</h1>
            )}

            {content.heroSection.subtitle && (
              <RichTextRenderer content={content.heroSection.subtitle} />
            )}
          </div>

          {/* Right: image */}
          {content.heroSection.image && (
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
              <img
                src={getImageUrl(content.heroSection.image)}
                alt={content.heroSection.title || "Temple Syndrome Hero"}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Full-width rich text below */}
          {content.heroSection.description && (
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <RichTextRenderer content={content.heroSection.description} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Sections - Accordion */}
      {(() => {
        const sections = TEMPLE_OVERVIEW_SECTIONS.map(
          (key) => content[key],
        ).filter(Boolean);

        if (sections.length === 0) return null;

        return (
          <Accordion className="w-full" type="single" collapsible>
            {sections.map((section: any, index: number) => (
              <AccordionItem key={index} value={`section-${index}`}>
                <AccordionTrigger className="text-left font-bold">
                  {section.title || `Section ${index + 1}`}
                </AccordionTrigger>
                <AccordionContent className="pl-6 space-y-2">
                  <ContentSectionBody section={section} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        );
      })()}

      {/* FAQ Section */}
      {content.faqSection && (
        <div className="space-y-6">
          {content.faqSection.title && (
            <h2 className="font-bold mb-6">{content.faqSection.title}</h2>
          )}
          {content.faqSection.faqs && content.faqSection.faqs.length > 0 && (
            <div className="space-y-6 text-left">
              {content.faqSection.faqs.map((faq: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="font-semibold">{faq.question}</div>
                  <div className="pl-0">
                    <RichTextRenderer content={faq.answer} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const PLACEHOLDER_STORY_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M4 4h16v16H4V4zm2 2v12h12V6H6z'/%3E%3C/svg%3E";

function PersonalStoriesTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {content.description && (
        <div className="prose max-w-none text-center mb-8">
          <RichTextRenderer content={content.description} />
        </div>
      )}
      {content.stories && content.stories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {content.stories.map((story: any, index: number) => {
            const imageUrl = story.image
              ? getImageUrl(story.image)
              : PLACEHOLDER_STORY_IMAGE;
            return (
              <MorphingDialog
                key={index}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                }}
              >
                <MorphingDialogTrigger className="cursor-pointer text-left w-[264px]">
                  <div
                    className="w-[264px] h-[200px] overflow-hidden bg-gray-200"
                    style={{ borderRadius: "4px" }}
                  >
                    <MorphingDialogImage
                      src={imageUrl}
                      alt={story.title || "Story"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start text-left mt-2 space-y-0.5 w-[264px]">
                    <MorphingDialogTitle className="text-base font-semibold text-black">
                      {story.title}
                    </MorphingDialogTitle>
                    <MorphingDialogSubtitle className="text-sm text-gray-600">
                      {story.author ? `By ${story.author}` : ""}
                    </MorphingDialogSubtitle>
                    {story.date && (
                      <span className="text-xs text-gray-500">
                        {new Date(story.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent
                    style={{ borderRadius: "12px" }}
                    className="relative h-auto max-h-[90vh] w-full max-w-[500px] border border-gray-100 bg-white overflow-hidden"
                  >
                    <div className="overflow-y-auto max-h-[90vh]">
                      <div className="relative p-6">
                        <div className="flex justify-center py-6">
                          <MorphingDialogImage
                            src={imageUrl}
                            alt={story.title || "Story"}
                            className="h-80 w-80 object-cover"
                            style={{ borderRadius: "12px" }}
                          />
                        </div>
                        <div className="space-y-2">
                          <MorphingDialogTitle className="text-xl font-semibold text-black text-center">
                            {story.title}
                          </MorphingDialogTitle>
                          <MorphingDialogSubtitle className="font-light text-gray-500 text-center">
                            {story.author ? `By ${story.author}` : ""}
                          </MorphingDialogSubtitle>
                          {story.date && (
                            <p className="text-sm text-gray-500 text-center">
                              {new Date(story.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="mt-6 prose prose-sm max-w-none text-gray-700">
                          {story.content && (
                            <RichTextRenderer content={story.content} />
                          )}
                        </div>
                      </div>
                    </div>
                    <MorphingDialogClose className="text-zinc-500" />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ResourcesTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {content.title && (
        <h1 className="text-4xl font-bold text-center">{content.title}</h1>
      )}
      {content.description && (
        <div className="prose max-w-none text-center">
          <RichTextRenderer content={content.description} />
        </div>
      )}
      {content.resourceCategories && content.resourceCategories.length > 0 && (
        <div className="space-y-8">
          {content.resourceCategories.map((category: any, index: number) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold">{category.title}</h2>
              {category.description && (
                <p className="text-muted-foreground">{category.description}</p>
              )}
              {category.resources && category.resources.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource: any, resIndex: number) => (
                    <Card key={resIndex}>
                      <CardHeader>
                        <CardTitle>{resource.title}</CardTitle>
                        {resource.description && (
                          <CardDescription>
                            {resource.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        {resource.url && (
                          <Link
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View Resource →
                          </Link>
                        )}
                        {resource.file && (
                          <Link
                            href={getImageUrl(resource.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Download File →
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PLACEHOLDER_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

function DivisionLeadersTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-8">
      {content.description && (
        <div className="prose max-w-none text-center mb-8">
          <RichTextRenderer content={content.description} />
        </div>
      )}
      {content.leaders && content.leaders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {content.leaders.map((leader: any, index: number) => {
            const imageUrl = leader.image
              ? getImageUrl(leader.image)
              : PLACEHOLDER_AVATAR;
            return (
              <MorphingDialog
                key={index}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                }}
              >
                <MorphingDialogTrigger className="cursor-pointer text-left w-[264px]">
                  <div
                    className="w-[264px] h-[200px] overflow-hidden bg-gray-200"
                    style={{ borderRadius: "4px" }}
                  >
                    <MorphingDialogImage
                      src={imageUrl}
                      alt={leader.name || "Leader"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start text-left mt-2 space-y-0.5 w-[264px]">
                    <MorphingDialogTitle className="text-base font-semibold text-black">
                      {leader.name}
                    </MorphingDialogTitle>
                    <MorphingDialogSubtitle className="text-sm text-gray-600">
                      {leader.title || leader.specializations || ""}
                    </MorphingDialogSubtitle>
                  </div>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent
                    style={{ borderRadius: "12px" }}
                    className="relative h-auto max-h-[90vh] w-full max-w-[500px] border border-gray-100 bg-white overflow-hidden"
                  >
                    <div className="overflow-y-auto max-h-[90vh]">
                      <div className="relative p-6">
                        <div className="flex justify-center py-6">
                          <MorphingDialogImage
                            src={imageUrl}
                            alt={leader.name || "Leader"}
                            className="h-80 w-80 object-cover"
                            style={{ borderRadius: "12px" }}
                          />
                        </div>
                        <div className="space-y-2">
                          <MorphingDialogTitle className="text-xl font-semibold text-black text-center">
                            {leader.name}
                          </MorphingDialogTitle>
                          <MorphingDialogSubtitle className="font-light text-gray-500 text-center">
                            {leader.title || ""}
                          </MorphingDialogSubtitle>
                          {leader.specializations && (
                            <p className="text-sm text-gray-500 text-center">
                              {leader.specializations}
                            </p>
                          )}
                        </div>
                        <div className="mt-6 prose prose-sm max-w-none text-gray-700">
                          {leader.bio && (
                            <RichTextRenderer content={leader.bio} />
                          )}
                        </div>
                        <div className="mt-6 space-y-2">
                          {leader.email && (
                            <p className="text-sm">
                              <strong>Email:</strong>{" "}
                              <a
                                href={`mailto:${leader.email}`}
                                className="text-primary hover:underline"
                              >
                                {leader.email}
                              </a>
                            </p>
                          )}
                          {leader.phone && (
                            <p className="text-sm">
                              <strong>Phone:</strong>{" "}
                              <a
                                href={`tel:${leader.phone}`}
                                className="text-primary hover:underline"
                              >
                                {leader.phone}
                              </a>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <MorphingDialogClose className="text-zinc-500" />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getListItems(items: any): any[] {
  if (!items) return [];
  const arr = Array.isArray(items) ? items : items?.data;
  return Array.isArray(arr) ? arr : [];
}

function getListItemText(item: any): string {
  return item?.text ?? item?.attributes?.text ?? "";
}

function getListItemHighlighted(item: any): boolean {
  return item?.isHighlighted ?? item?.attributes?.isHighlighted ?? false;
}

function ListItems({ items }: { items: any }) {
  const listItems = getListItems(items);
  if (listItems.length === 0) return null;
  return (
    <ul className="list-disc pl-6 space-y-2 my-4">
      {listItems.map((item: any, itemIndex: number) => (
        <li
          key={itemIndex}
          className={getListItemHighlighted(item) ? "font-semibold" : ""}
        >
          {getListItemText(item)}
        </li>
      ))}
    </ul>
  );
}

function ContentSectionBody({ section }: { section: any }) {
  if (!section) return null;

  return (
    <div className="space-y-4">
      {section.content && (
        <div className="prose max-w-none">
          <RichTextRenderer content={section.content} />
        </div>
      )}
      <ListItems items={section.listItems} />
      {section.subsections && section.subsections.length > 0 && (
        <div className="space-y-6 mt-6">
          {section.subsections.map((subsection: any, index: number) => (
            <div key={index} className="space-y-3">
              {subsection.title && (
                <h3 className="text-md font-semibold">{subsection.title}</h3>
              )}
              {subsection.content && (
                <div className="prose max-w-none">
                  <RichTextRenderer content={subsection.content} />
                </div>
              )}
              <ListItems items={subsection.listItems} />
            </div>
          ))}
        </div>
      )}
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
      let text: React.ReactNode = child.text;
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
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL;
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  }
  if (image.data?.attributes?.url) {
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL;
    return `${baseUrl}${image.data.attributes.url}`;
  }
  return "";
}
