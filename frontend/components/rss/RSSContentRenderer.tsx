"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface RSSContentRendererProps {
  content: any;
}

export function RSSContentRenderer({ content }: RSSContentRendererProps) {
  if (!content) return null;

  // Handle Overview Tab
  if (content.heroSection || content.whatIsRss) {
    return <OverviewTabRenderer content={content} />;
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

function OverviewTabRenderer({ content }: { content: any }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {content.heroSection && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            {content.heroSection.title && (
              <h1 className="text-4xl font-bold">{content.heroSection.title}</h1>
            )}
            {content.heroSection.subtitle && (
              <p className="text-xl text-muted-foreground">{content.heroSection.subtitle}</p>
            )}
            {content.heroSection.description && (
              <div className="prose max-w-none">
                <RichTextRenderer content={content.heroSection.description} />
              </div>
            )}
          </div>
          {content.heroSection.image && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={getImageUrl(content.heroSection.image)}
                alt={content.heroSection.title || "RSS Hero"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      )}

      {/* What is RSS Section */}
      {content.whatIsRss && (
        <ContentSectionRenderer section={content.whatIsRss} />
      )}

      {/* Diagnosis Section */}
      {content.diagnosis && (
        <ContentSectionRenderer section={content.diagnosis} />
      )}

      {/* Phenotype Section */}
      {content.phenotype && (
        <ContentSectionRenderer section={content.phenotype} />
      )}

      {/* Cognitive Abilities Section */}
      {content.cognitiveAbilities && (
        <ContentSectionRenderer section={content.cognitiveAbilities} />
      )}

      {/* First Steps Section */}
      {content.firstSteps && (
        <ContentSectionRenderer section={content.firstSteps} />
      )}

      {/* Hypoglycemia Section */}
      {content.hypoglycemia && (
        <ContentSectionRenderer section={content.hypoglycemia} />
      )}

      {/* Treatments Section */}
      {content.treatments && (
        <ContentSectionRenderer section={content.treatments} />
      )}

      {/* Weight Management Section */}
      {content.weightManagement && (
        <ContentSectionRenderer section={content.weightManagement} />
      )}

      {/* Bone Age Section */}
      {content.boneAge && (
        <ContentSectionRenderer section={content.boneAge} />
      )}

      {/* Puberty Section */}
      {content.puberty && (
        <ContentSectionRenderer section={content.puberty} />
      )}

      {/* Height Improvement Section */}
      {content.heightImprovement && (
        <ContentSectionRenderer section={content.heightImprovement} />
      )}

      {/* Growth Hormone Therapy Section */}
      {content.growthHormoneTherapy && (
        <ContentSectionRenderer section={content.growthHormoneTherapy} />
      )}

      {/* Insurance Coverage Section */}
      {content.insuranceCoverage && (
        <ContentSectionRenderer section={content.insuranceCoverage} />
      )}

      {/* Factors Affecting GHT Section */}
      {content.factorsAffectingGht && (
        <ContentSectionRenderer section={content.factorsAffectingGht} />
      )}

      {/* Adulthood Health Issues Section */}
      {content.adulthoodHealthIssues && (
        <ContentSectionRenderer section={content.adulthoodHealthIssues} />
      )}

      {/* FAQ Section */}
      {content.faqSection && (
        <div className="space-y-4">
          {content.faqSection.title && (
            <h2 className="text-3xl font-bold mb-6">{content.faqSection.title}</h2>
          )}
          {content.faqSection.faqs && content.faqSection.faqs.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {content.faqSection.faqs.map((faq: any, index: number) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pl-6">
                    <RichTextRenderer content={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}
    </div>
  );
}

function PersonalStoriesTabRenderer({ content }: { content: any }) {
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
      {content.stories && content.stories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.stories.map((story: any, index: number) => (
            <Card key={index} className="h-full">
              {story.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={getImageUrl(story.image)}
                    alt={story.title || "Story image"}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
                {story.author && (
                  <CardDescription>By {story.author}</CardDescription>
                )}
                {story.date && (
                  <CardDescription>
                    {new Date(story.date).toLocaleDateString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <RichTextRenderer content={story.content} />
              </CardContent>
            </Card>
          ))}
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
                          <CardDescription>{resource.description}</CardDescription>
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

function DivisionLeadersTabRenderer({ content }: { content: any }) {
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
      {content.leaders && content.leaders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.leaders.map((leader: any, index: number) => (
            <Card key={index} className="h-full">
              {leader.image && (
                <div className="relative w-full h-64">
                  <Image
                    src={getImageUrl(leader.image)}
                    alt={leader.name || "Leader"}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{leader.name}</CardTitle>
                {leader.title && (
                  <CardDescription>{leader.title}</CardDescription>
                )}
                {leader.specializations && (
                  <CardDescription className="text-sm">
                    {leader.specializations}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {leader.bio && (
                  <RichTextRenderer content={leader.bio} />
                )}
                <div className="mt-4 space-y-2">
                  {leader.email && (
                    <p className="text-sm">
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${leader.email}`} className="text-primary hover:underline">
                        {leader.email}
                      </a>
                    </p>
                  )}
                  {leader.phone && (
                    <p className="text-sm">
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${leader.phone}`} className="text-primary hover:underline">
                        {leader.phone}
                      </a>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentSectionRenderer({ section }: { section: any }) {
  if (!section) return null;

  return (
    <div className="space-y-4">
      {section.title && (
        <h2 className="text-3xl font-bold">{section.title}</h2>
      )}
      {section.content && (
        <div className="prose max-w-none">
          <RichTextRenderer content={section.content} />
        </div>
      )}
      {section.subsections && section.subsections.length > 0 && (
        <div className="space-y-6 mt-6">
          {section.subsections.map((subsection: any, index: number) => (
            <div key={index} className="space-y-3">
              {subsection.title && (
                <h3 className="text-2xl font-semibold">{subsection.title}</h3>
              )}
              {subsection.content && (
                <div className="prose max-w-none">
                  <RichTextRenderer content={subsection.content} />
                </div>
              )}
              {subsection.listItems && subsection.listItems.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {subsection.listItems.map((item: any, itemIndex: number) => (
                    <li
                      key={itemIndex}
                      className={item.isHighlighted ? "font-semibold" : ""}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
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
              const HeadingTag = `h${node.level}` as keyof JSX.IntrinsicElements;
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
                <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4">
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
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  }
  if (image.data?.attributes?.url) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return `${baseUrl}${image.data.attributes.url}`;
  }
  return "";
}
