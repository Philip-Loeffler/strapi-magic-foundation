import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ConversionCalculator from "@/components/growth-chart/ConversionCalculator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageContainer } from "@/components/layout/PageContainer";

/** Normalize Strapi component/relation response to an array (handles populate and raw array). */
function getArray(value: unknown): any[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && Array.isArray((value as any).data))
    return (value as any).data.map((d: any) => d.attributes ?? d);
  return [];
}

function buildPopulateQuery(): string {
  const populate = [
    "generalTab",
    "generalTab.measuringSection",
    "generalTab.measuringSection.bullets",
    "generalTab.measuringSection.bullets.subBullets",
    "generalTab.understandingItems",
    "generalTab.exampleImage",
    "generalTab.generalGrowthChartsItems",
    "generalTab.generalGrowthChartsItems.image",
    "generalTab.otherSpecialtyLinks",
    "rssTab",
    "rssTab.rssGrowthCharts",
    "rssTab.rssGrowthCharts.file",
    "rssTab.rssSgaSpreadsheets",
    "rssTab.rssSgaSpreadsheets.file",
    "rssTab.rssSgaCharts",
    "rssTab.rssSgaCharts.file",
    "rssTab.instructionSections",
    "rssTab.instructionSections.steps",
    "rssTab.instructionSections.steps.subBullets",
    "sgaTab",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getGrowthChartsData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildPopulateQuery();
    const res = await fetch(`${strapiUrl}/api/growth-charts?${populateQuery}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.data ?? data;
    const list = Array.isArray(raw) ? raw : [raw];
    // Prefer slug === "growth-charts", otherwise first entry
    const entry =
      list.find(
        (item: { attributes?: { slug?: string } }) =>
          item?.attributes?.slug === "growth-charts",
      ) ?? list[0];
    return entry?.attributes ?? entry ?? null;
  } catch {
    return null;
  }
}

export default async function GrowthChartsPage() {
  type GrowthChartsData = {
    generalTab: any;
    rssTab: any;
    sgaTab: any;
  };

  const growthChartsData =
    (await getGrowthChartsData()) as GrowthChartsData | null;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Growth Charts</h1>
      <Tabs defaultValue="general" className="w-full flex flex-col">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-2 gap-2">
            <TabsTrigger value="general" className="text-sm md:text-base">
              General
            </TabsTrigger>
            <TabsTrigger value="rss" className="text-sm md:text-base">
              RSS/SGA
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="w-full mt-8">
          {growthChartsData?.generalTab ? (
            <GeneralTabRenderer tab={growthChartsData.generalTab} />
          ) : (
            <EmptyTabPlaceholder label="General" />
          )}
        </TabsContent>

        <TabsContent value="rss" className="w-full mt-8">
          {growthChartsData?.rssTab ? (
            <RssTabRenderer tab={growthChartsData.rssTab} />
          ) : (
            <EmptyTabPlaceholder label="RSS/SGA" />
          )}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

function GeneralTabRenderer({ tab }: { tab: any }) {
  if (!tab) return null;

  return (
    <div className="space-y-10">
      {/* Intro description */}
      {tab.introDescription && (
        <div className="prose max-w-none">
          <RichTextRenderer content={tab.introDescription} />
        </div>
      )}

      {/* Measuring Your Child at Home */}
      {tab.measuringSection && (
        <section className="space-y-4">
          {tab.measuringSection.title && (
            <h2 className="text-2xl font-bold">{tab.measuringSection.title}</h2>
          )}
          {tab.measuringSection.subtitle && (
            <div className="prose max-w-none">
              <RichTextRenderer content={tab.measuringSection.subtitle} />
            </div>
          )}
          {Array.isArray(tab.measuringSection.bullets) &&
            tab.measuringSection.bullets.length > 0 && (
              <ul className="list-disc pl-6 space-y-2">
                {tab.measuringSection.bullets.map(
                  (bullet: any, index: number) => (
                    <li key={index}>
                      {bullet.text && (
                        <span className="block">
                          <RichTextRenderer content={bullet.text} />
                        </span>
                      )}
                      {Array.isArray(bullet.subBullets) &&
                        bullet.subBullets.length > 0 && (
                          <ul className="list-disc pl-6 space-y-1 mt-1">
                            {bullet.subBullets.map(
                              (sub: any, subIndex: number) => (
                                <li key={subIndex}>
                                  {sub.text && (
                                    <RichTextRenderer content={sub.text} />
                                  )}
                                </li>
                              ),
                            )}
                          </ul>
                        )}
                    </li>
                  ),
                )}
              </ul>
            )}
        </section>
      )}

      {/* Accordions: Understanding & Example */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="understanding">
          <AccordionTrigger className="text-left">
            {tab.understandingTitle || "Understanding Growth Charts"}
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            {tab.understandingDescription && (
              <div className="prose max-w-none">
                <RichTextRenderer content={tab.understandingDescription} />
              </div>
            )}
            {Array.isArray(tab.understandingItems) &&
              tab.understandingItems.length > 0 && (
                <div className="space-y-4">
                  {tab.understandingItems.map((item: any, index: number) => (
                    <div key={index} className="space-y-1">
                      {item.title && (
                        <h3 className="text-md font-semibold">{item.title}</h3>
                      )}
                      {item.description && (
                        <div className="prose max-w-none">
                          <RichTextRenderer content={item.description} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="example">
          <AccordionTrigger className="text-left">
            {tab.exampleTitle || "Growth Chart Example"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                {tab.exampleDescription && (
                  <div className="prose max-w-none">
                    <RichTextRenderer content={tab.exampleDescription} />
                  </div>
                )}
                {tab.exampleChildTitle && (
                  <h3 className="text-lg font-semibold">
                    {tab.exampleChildTitle}
                  </h3>
                )}
              </div>
              {tab.exampleImage && (
                <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center">
                  <img
                    src={getImageUrl(tab.exampleImage)}
                    alt={tab.exampleChildTitle || "Growth chart example"}
                    className="max-h-96 w-auto object-contain"
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* General Growth Charts (boy/girl cards) */}
      {(tab.generalGrowthChartsTitle || tab.generalGrowthChartsDescription) && (
        <section className="space-y-4">
          {tab.generalGrowthChartsTitle && (
            <h2 className="text-2xl font-bold">
              {tab.generalGrowthChartsTitle}
            </h2>
          )}
          {tab.generalGrowthChartsDescription && (
            <div className="prose max-w-none">
              <RichTextRenderer content={tab.generalGrowthChartsDescription} />
            </div>
          )}
        </section>
      )}

      {Array.isArray(tab.generalGrowthChartsItems) &&
        tab.generalGrowthChartsItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tab.generalGrowthChartsItems.map((item: any, index: number) => (
              <Card
                key={index}
                className="flex flex-col md:flex-row items-center gap-4 p-4"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title || "Growth chart"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl" aria-hidden="true">
                      📈
                    </span>
                  )}
                </div>
                <div className="flex-1 space-y-2 text-left">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  {item.description && (
                    <CardContent className="p-0">
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                    {item.gender && (
                      <span className="rounded bg-gray-100 px-2 py-0.5 capitalize">
                        {item.gender}
                      </span>
                    )}
                  </div>
                  {item.url && (
                    <div className="mt-2">
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline font-medium"
                      >
                        {item.linkLabel || "View chart"} →
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

      {/* Other Specialty Growth Charts */}
      {(tab.otherSpecialtyTitle || tab.otherSpecialtyDescription) && (
        <section className="space-y-4">
          {tab.otherSpecialtyTitle && (
            <h2 className="text-2xl font-bold">{tab.otherSpecialtyTitle}</h2>
          )}
          {tab.otherSpecialtyDescription && (
            <div className="prose max-w-none">
              <RichTextRenderer content={tab.otherSpecialtyDescription} />
            </div>
          )}
        </section>
      )}

      {Array.isArray(tab.otherSpecialtyLinks) &&
        tab.otherSpecialtyLinks.length > 0 && (
          <ul className="list-disc pl-6 space-y-2">
            {tab.otherSpecialtyLinks.map((link: any, index: number) => {
              const title = link.title;
              const links: { label: string; url?: string }[] = [];
              if (link.linkTitle || link.url) {
                links.push({
                  label: link.linkTitle || link.title,
                  url: link.url,
                });
              }
              if (link.secondLinkTitle || link.secondUrl) {
                links.push({
                  label: link.secondLinkTitle || link.secondUrl,
                  url: link.secondUrl,
                });
              }
              return (
                <li key={index}>
                  {title && <span className="font-semibold">{title}: </span>}
                  {links.map((item, i) => {
                    const content = item.url ? (
                      <Link
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-900 underline"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span key={i} className="text-blue-900 underline">
                        {item.label}
                      </span>
                    );
                    return (
                      <span key={i}>
                        {i > 0 && " & "}
                        {content}
                      </span>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
}

function RssTabRenderer({ tab }: { tab: any }) {
  if (!tab) return null;

  const rssGrowthChartsTitle =
    tab.rssGrowthChartsTitle || "Russell-Silver Syndrome Growth Charts";

  const rssSgaCurvesTitle = tab.rssSgaCurvesTitle || "RSS/SGA Growth Curves";

  const rssSgaChartsTitle = tab.rssSgaChartsTitle || "Charts";

  return (
    <div className="space-y-10">
      {/* Russell-Silver Syndrome Growth Charts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">{rssGrowthChartsTitle}</h2>
        {tab.rssGrowthChartsDescription && (
          <div className="prose max-w-none">
            <RichTextRenderer content={tab.rssGrowthChartsDescription} />
          </div>
        )}
        {Array.isArray(tab.rssGrowthCharts) &&
          tab.rssGrowthCharts.length > 0 && (
            <ul className="list-disc pl-6 space-y-2">
              {tab.rssGrowthCharts.map((item: any, index: number) => {
                const fileUrl = item.file ? getImageUrl(item.file) : "";
                const href = fileUrl || item.url || "";
                const isClickable = !!href;
                return (
                  <li key={index}>
                    {isClickable ? (
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${navigationMenuTriggerStyle()} flex flex-row items-center text-blue-900 transition-colors underline`}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span className="text-blue-900 underline">
                        {item.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
      </section>

      {/* RSS/SGA Growth Curves */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">{rssSgaCurvesTitle}</h2>
        {tab.rssSgaCurvesDescription && (
          <div className="prose max-w-none">
            <RichTextRenderer content={tab.rssSgaCurvesDescription} />
          </div>
        )}
        {Array.isArray(tab.rssSgaSpreadsheets) &&
          tab.rssSgaSpreadsheets.length > 0 && (
            <ul className="list-disc pl-6 space-y-2">
              {tab.rssSgaSpreadsheets.map((item: any, index: number) => {
                const fileUrl = item.file ? getImageUrl(item.file) : "";
                const href = fileUrl || item.url || "";
                const isClickable = !!href;
                return (
                  <li key={index}>
                    {isClickable ? (
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${navigationMenuTriggerStyle()} flex flex-row items-center text-blue-900 transition-colors underline`}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span className="text-blue-900 underline">
                        {item.title}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
      </section>

      {/* Charts under RSS/SGA */}
      {Array.isArray(tab.rssSgaCharts) && tab.rssSgaCharts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{rssSgaChartsTitle}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {tab.rssSgaCharts.map((item: any, index: number) => {
              const fileUrl = item.file ? getImageUrl(item.file) : "";
              const href = fileUrl || item.url || "";
              const isClickable = !!href;
              return (
                <li key={index}>
                  {isClickable ? (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${navigationMenuTriggerStyle()} flex flex-row items-center text-blue-900 transition-colors underline`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="text-blue-900 underline">
                      {item.title}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Instruction sections */}
      {(() => {
        const sections = getArray(tab.instructionSections);
        if (sections.length === 0) return null;
        return (
          <section className="space-y-8">
            {sections.map((section: any, index: number) => {
              const steps = getArray(section.steps);
              return (
                <div key={index} className="space-y-3">
                  {section.title && (
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  )}
                  {steps.length > 0 ? (
                    <ol className="list-decimal pl-6 space-y-2">
                      {steps.map((step: any, stepIndex: number) => {
                        const subBullets = getArray(step.subBullets);
                        return (
                          <li key={stepIndex}>
                            {step.text != null && (
                              <div className="prose max-w-none">
                                <RichTextRenderer content={step.text} />
                              </div>
                            )}
                            {subBullets.length > 0 && (
                              <ul className="list-disc pl-6 space-y-1 mt-1">
                                {subBullets.map(
                                  (sub: any, subIndex: number) => (
                                    <li key={subIndex}>
                                      {sub.text != null && (
                                        <RichTextRenderer content={sub.text} />
                                      )}
                                    </li>
                                  ),
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  ) : section.content != null ? (
                    <div className="prose max-w-none">
                      <RichTextRenderer content={section.content} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </section>
        );
      })()}

      {/* Conversion calculator (under "How to add your child's information") */}
    </div>
  );
}

function TabContentRenderer({ tab }: { tab: any }) {
  if (!tab) return null;
  return (
    <div className="space-y-6">
      {tab.title && <h2 className="text-2xl font-bold">{tab.title}</h2>}
      {tab.content && (
        <div className="prose max-w-none">
          <RichTextRenderer content={tab.content} />
        </div>
      )}
    </div>
  );
}

function EmptyTabPlaceholder({ label }: { label: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{label} content coming soon...</p>
    </div>
  );
}

function RichTextRenderer({ content }: { content: any }) {
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
                <p key={index} className="mb-4">
                  {renderChildren(node.children)}
                </p>
              );
            case "heading":
              const HeadingTag =
                `h${node.level}` as keyof JSX.IntrinsicElements;
              return (
                <HeadingTag key={index} className="mb-4 font-bold">
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
          className="text-primary underline"
        >
          {renderChildren(child.children)}
        </a>
      );
    }
    return renderChildren(child.children);
  });
}
