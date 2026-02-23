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
  tab:
    | "overview"
    | "faq"
    | "appeal-process"
    | "follow-up-procedure"
    | "patient-assistance";
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
    case "follow-up-procedure":
      return <FollowUpProcedureTab content={content} />;
    case "patient-assistance":
      return <PatientAssistanceTab content={content} />;
    default:
      return null;
  }
}

function OverviewTab({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.intro && (
        <div className="prose max-w-none">
          <RichTextRenderer content={content.intro} />
        </div>
      )}
      {content.videoEmbedUrl && (
        <div className="flex justify-end">
          <div className="w-full max-w-xl aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src={content.videoEmbedUrl}
              title="Insurance Appeals Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      {content.accordionSections && content.accordionSections.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            External Appeal Process Information
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {content.accordionSections.map((section: any, index: number) => (
              <AccordionItem key={index} value={`section-${index}`}>
                <AccordionTrigger className="text-left">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  {section.content && (
                    <RichTextRenderer content={section.content} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
                <RichTextRenderer content={item.answer} />
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
    </div>
  );
}

function FollowUpProcedureTab({ content }: { content: any }) {
  const hipaaUrl = content
    ? content.hipaaFormUrl ||
      (content.hipaaFormFile?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${content.hipaaFormFile.url}`
        : null)
    : null;

  return (
    <div className="space-y-6">
      {content?.intro && (
        <div className="prose max-w-none">
          <RichTextRenderer content={content.intro} />
        </div>
      )}
      {content?.instructions && (
        <div className="prose max-w-none text-sm text-muted-foreground">
          <RichTextRenderer content={content.instructions} />
        </div>
      )}
      {hipaaUrl && (
        <div className="pt-2">
          <Button
            asChild
            variant="outline"
            className="bg-primary/10 border-primary"
          >
            <Link href={hipaaUrl} target="_blank" rel="noopener noreferrer">
              Download MAGIC HIPAA Form
            </Link>
          </Button>
        </div>
      )}
      <FollowUpProcedureForm />
    </div>
  );
}

function FollowUpProcedureForm() {
  return (
    <form className="space-y-8 pt-6 border-t">
      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-primary">
          1. External Appeal For Pediatric Patient
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Applicant&apos;s Last Name
            </label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Applicant&apos;s First Name
            </label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Address</label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option value="">Select</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Zip Code</label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Daytime Phone</label>
            <input type="tel" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Patient&apos;s Name</label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Patient&apos;s Birthday
            </label>
            <input type="date" className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Diagnoses</label>
          <div className="flex flex-col gap-2">
            {[
              "Growth Hormone Deficiency (GHD)",
              "Russell-Silver Syndrome (RSS)",
              "Small for Gestational Age (SGA)",
              "Turner Syndrome (TS)",
              "Idiopathic Short Stature",
              "Other",
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" name="diagnoses" value={opt} />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Drug Name</label>
          <div className="flex flex-col gap-2">
            {[
              "Humatrope",
              "Norditropin",
              "Omnitrope",
              "Genotropin",
              "Saizen",
              "Zorbtive",
              "Other",
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" name="drug" value={opt} />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium block">Current Situation</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="situation" value="starting" />
              <span className="text-sm">Just starting therapy</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="situation" value="discontinued" />
              <span className="text-sm">
                Had therapy discontinued (drugs and how long)
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="situation" value="other" />
              <span className="text-sm">Other (please write in below)</span>
            </label>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-bold text-primary">
          2. Denial Letter Information
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Denial code / reference</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            placeholder="KMCGSHYW"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Add final determination denial letter
          </label>
          <input type="file" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Add copy of insurance card (front and back)
          </label>
          <input type="file" className="w-full border rounded-md px-3 py-2" />
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-bold text-primary">3. Medical History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              GH or IGF-1 highest number (albumin)
            </label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">IGF-1 Level</label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Date when growth hormone therapy did NOT manage to work
            </label>
            <input type="date" className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Most recent Height and Weight
            </label>
            <input type="text" className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Family history of GHD?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="familyHistory" value="yes" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="familyHistory" value="no" /> No
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Did your child ever have an MRI?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="mri" value="yes" /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="mri" value="no" /> No
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Upload IGFR-1 Report (if applicable)
          </label>
          <input type="file" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Upload most recent Growth Chart
          </label>
          <input type="file" className="w-full border rounded-md px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Upload signed HIPAA (within two weeks of submission)
          </label>
          <input type="file" className="w-full border rounded-md px-3 py-2" />
        </div>
      </section>

      <div className="pt-6">
        <Button type="submit" className="bg-primary">
          Submit
        </Button>
      </div>
    </form>
  );
}

function PatientAssistanceTab({ content }: { content: any }) {
  return (
    <div className="space-y-6">
      {content.intro && (
        <div className="prose max-w-none">
          <RichTextRenderer content={content.intro} />
        </div>
      )}
      {content.testimonials && content.testimonials.length > 0 && (
        <div className="space-y-6">
          {content.testimonials.map((t: any, index: number) => (
            <blockquote
              key={index}
              className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground"
            >
              <RichTextRenderer content={t.quote} />
              {(t.author || t.location) && (
                <footer className="mt-2 not-italic text-sm">
                  — {[t.author, t.location].filter(Boolean).join(", ")}
                </footer>
              )}
            </blockquote>
          ))}
        </div>
      )}
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
                <p key={index} className="mb-2">
                  {renderChildren(node.children)}
                </p>
              );
            case "heading": {
              const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
              return (
                <Tag key={index} className="font-bold mb-2">
                  {renderChildren(node.children)}
                </Tag>
              );
            }
            case "list":
              const ListTag = node.format === "unordered" ? "ul" : "ol";
              return (
                <ListTag key={index} className="list-disc pl-6 mb-2">
                  {node.children?.map((item: any, j: number) => (
                    <li key={j}>{renderChildren(item.children)}</li>
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
                  {renderChildren(node.children)}
                </a>
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
          {renderChildren(child.children)}
        </a>
      );
    }
    return renderChildren(child.children);
  });
}
