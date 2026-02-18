"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface GrowthChartContentRendererProps {
  content: any;
}

export function GrowthChartContentRenderer({
  content,
}: GrowthChartContentRendererProps) {
  if (!content) return null;

  return (
    <div className="space-y-12">
      {/* Intro Section */}
      {content.introSection && (
        <IntroSectionRenderer section={content.introSection} />
      )}

      {/* Chart Categories */}
      {content.chartCategories && content.chartCategories.length > 0 && (
        <div className="space-y-8">
          {content.chartCategories.map((category: any, index: number) => (
            <ChartCategoryRenderer key={index} category={category} />
          ))}
        </div>
      )}

      {/* Instructions Sections */}
      {content.instructionsSections &&
        content.instructionsSections.length > 0 && (
          <div className="space-y-8">
            {content.instructionsSections.map(
              (instructions: any, index: number) => (
                <InstructionsSectionRenderer
                  key={index}
                  instructions={instructions}
                />
              ),
            )}
          </div>
        )}
    </div>
  );
}

function IntroSectionRenderer({ section }: { section: any }) {
  return (
    <div className="space-y-4">
      {section.title && (
        <h1 className="text-4xl font-bold">{section.title}</h1>
      )}
      {section.description && (
        <div className="prose max-w-none">
          <RichTextRenderer content={section.description} />
        </div>
      )}
      {section.instructionLink && (
        <div className="mt-4">
          <Link
            href={section.instructionLink}
            className="text-primary hover:underline font-semibold"
          >
            {section.instructionLinkText || "at home instructions"} →
          </Link>
        </div>
      )}
    </div>
  );
}

function ChartCategoryRenderer({ category }: { category: any }) {
  return (
    <div className="space-y-6">
      {category.title && (
        <h2 className="text-3xl font-semibold">{category.title}</h2>
      )}
      {category.description && (
        <div className="prose max-w-none">
          <RichTextRenderer content={category.description} />
        </div>
      )}
      {category.charts && category.charts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.charts.map((chart: any, index: number) => (
            <ChartItemRenderer key={index} chart={chart} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChartItemRenderer({ chart }: { chart: any }) {
  const getChartUrl = () => {
    if (chart.file) {
      return getImageUrl(chart.file);
    }
    if (chart.url) {
      return chart.url;
    }
    return null;
  };

  const chartUrl = getChartUrl();
  const isExcel = chart.chartType === "excel" || chart.file?.mime?.includes("excel") || chart.file?.mime?.includes("spreadsheet");

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{chart.title}</CardTitle>
        {chart.description && (
          <CardDescription>{chart.description}</CardDescription>
        )}
        {(chart.ageRange || chart.gender) && (
          <div className="flex gap-2 mt-2">
            {chart.ageRange && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {chart.ageRange}
              </span>
            )}
            {chart.gender && chart.gender !== "both" && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {chart.gender}
              </span>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow flex items-end">
        {chartUrl ? (
          <Link
            href={chartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            {isExcel ? "Download Excel File →" : "View Chart →"}
          </Link>
        ) : (
          <span className="text-muted-foreground text-sm">
            No chart available
          </span>
        )}
      </CardContent>
    </Card>
  );
}

function InstructionsSectionRenderer({
  instructions,
}: {
  instructions: any;
}) {
  return (
    <div className="space-y-6">
      {instructions.title && (
        <h2 className="text-3xl font-semibold">{instructions.title}</h2>
      )}
      {instructions.content && (
        <div className="prose max-w-none">
          <RichTextRenderer content={instructions.content} />
        </div>
      )}
      {instructions.steps && instructions.steps.length > 0 && (
        <div className="space-y-4">
          {instructions.steps.map((step: any, index: number) => (
            <div key={index} className="flex gap-4">
              {step.stepNumber && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step.stepNumber}
                </div>
              )}
              <div className="flex-grow">
                {step.title && (
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                )}
                {step.content && (
                  <div className="prose max-w-none">
                    <RichTextRenderer content={step.content} />
                  </div>
                )}
              </div>
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
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  }
  if (image.data?.attributes?.url) {
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return `${baseUrl}${image.data.attributes.url}`;
  }
  return "";
}
