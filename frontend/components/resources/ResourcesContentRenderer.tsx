"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { JSX } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

/** Get YouTube thumbnail URL from a YouTube watch or embed URL. Returns null if not a YouTube URL. */
function getYouTubeThumbnailUrl(
  videoUrl: string | null | undefined,
): string | null {
  if (!videoUrl?.trim()) return null;
  const u = videoUrl.trim();
  const match = u.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );
  if (!match) return null;
  const videoId = match[1];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function ResourcesContentRenderer({
  content,
  tab,
}: {
  content: any;
  tab:
    | "overview"
    | "informational-videos"
    | "social-media"
    | "get-support"
    | "spread-the-word";
}) {
  if (tab === "overview") {
    const hasOverview = content?.content;
    const hasBrochureSection =
      content?.brochureSectionTitle ||
      content?.brochureSectionDescription ||
      content?.brochureSectionBody;
    const hasBrochureAccordion =
      content?.brochureAccordionItems?.length > 0 ||
      content?.adultBrochuresAccordionItems?.length > 0 ||
      content?.additionalInfoAccordionItems?.length > 0;
    const hasInfoSections =
      content?.overviewInfoSections && content.overviewInfoSections.length > 0;
    const hasSocial =
      content?.parentsGroups?.length > 0 || content?.adultsGroups?.length > 0;
    const hasAny =
      hasOverview ||
      hasBrochureSection ||
      hasBrochureAccordion ||
      hasInfoSections ||
      hasSocial;
    if (!hasAny) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          Content coming soon...
        </div>
      );
    }
    return (
      <div className="space-y-8">
        {hasOverview && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <ResourcesRichText content={content.content} />
            </div>
          </div>
        )}
        {hasBrochureSection && <BrochureSectionBlock content={content} />}
        {hasBrochureAccordion && (
          <BrochureAccordionsSection content={content} />
        )}
        {hasInfoSections && (
          <OverviewInfoSections sections={content.overviewInfoSections} />
        )}
        {hasSocial && <SocialMediaAccordions content={content} />}
      </div>
    );
  }

  if (tab === "get-support") {
    return <GetSupportTab content={content} />;
  }

  if (tab === "spread-the-word") {
    return <SpreadTheWordTab content={content} />;
  }

  if (!content) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Content coming soon...
      </div>
    );
  }

  if (tab === "informational-videos") {
    const intro = content?.intro;
    const secondDescription = content?.secondDescription;
    const youtubeUrl = content?.youtubeChannelUrl;
    const videos = content?.videos ?? [];
    const hasIntro = intro || secondDescription || youtubeUrl;
    if (!hasIntro && videos.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          Content coming soon...
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {hasIntro && (
          <div className="space-y-4 mb-6">
            {intro && (
              <div className="prose prose-sm max-w-none">
                <ResourcesRichText content={intro} />
              </div>
            )}
            {secondDescription && (
              <div className="prose prose-sm max-w-none">
                <ResourcesRichText content={secondDescription} />
              </div>
            )}
            {youtubeUrl && (
              <p className="text-sm">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline font-medium"
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
                : getYouTubeThumbnailUrl(video.videoUrl);
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

/** Brochure section: title, description, and body (One Free Complimentary / Multiple Copies text). */
function BrochureSectionBlock({ content }: { content: any }) {
  const title = content?.brochureSectionTitle;
  const description = content?.brochureSectionDescription;
  const body = content?.brochureSectionBody;
  if (!title && !description && !body) return null;
  return (
    <div className="space-y-4">
      {title && <h2 className="text-lg font-bold">{title}</h2>}
      {description && (
        <div className="prose prose-sm max-w-none">
          <ResourcesRichText content={description} />
        </div>
      )}
      {body && (
        <div className="prose prose-sm max-w-none">
          <ResourcesRichText content={body} />
        </div>
      )}
    </div>
  );
}

/** Three accordions: Brochures, Adult Brochures, Additional Info (each: title + list of label/PDF link). */
function BrochureAccordionsSection({ content }: { content: any }) {
  const items: { title: string; links: any[] }[] = [];
  if (
    content?.brochureAccordionTitle ||
    content?.brochureAccordionItems?.length
  ) {
    items.push({
      title: content.brochureAccordionTitle || "Brochures",
      links: content.brochureAccordionItems ?? [],
    });
  }
  if (
    content?.adultBrochuresAccordionTitle ||
    content?.adultBrochuresAccordionItems?.length
  ) {
    items.push({
      title: content.adultBrochuresAccordionTitle || "Adult Brochures",
      links: content.adultBrochuresAccordionItems ?? [],
    });
  }
  if (
    content?.additionalInfoAccordionTitle ||
    content?.additionalInfoAccordionItems?.length
  ) {
    items.push({
      title: content.additionalInfoAccordionTitle || "Additional Info",
      links: content.additionalInfoAccordionItems ?? [],
    });
  }
  if (items.length === 0) return null;
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`accordion-${index}`}>
          <AccordionTrigger className="text-left">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="pl-4">
            {item.links.length > 0 ? (
              <ul className="list-disc pl-6 space-y-2">
                {item.links.map((link: any, i: number) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No links yet.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Repeatable info sections (MedAngel, TSA, Southwest, GINA, etc.): title, description, links. */
function OverviewInfoSections({ sections }: { sections: any[] }) {
  if (!sections?.length) return null;
  return (
    <div className="space-y-6">
      {sections.map((section: any, index: number) => (
        <section key={index} className="space-y-2">
          {section.title && (
            <h3 className="text-base font-semibold">{section.title}</h3>
          )}
          {section.description && (
            <div className="prose prose-sm max-w-none">
              <ResourcesRichText content={section.description} />
            </div>
          )}
          {section.links?.length > 0 && (
            <ul className="list-disc pl-6 space-y-1">
              {section.links.map((link: any, i: number) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

/** Accordion trigger styling for Get Support: blue banner + visible chevron on the right. */
const getSupportTriggerClassName =
  "bg-primary text-primary-foreground px-4 py-3 font-semibold text-lg rounded-t-lg w-full hover:no-underline hover:bg-primary/95 [&>svg]:text-primary-foreground [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:ml-auto";

const inputClassName =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm";
const textareaClassName =
  "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm";
const fileClassName =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium";

function CollegeScholarshipForm() {
  const [agreed, setAgreed] = React.useState(false);
  return (
    // <form
    //   className="space-y-6 pt-6 border-t border-border"
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     // TODO: wire to API / server action
    //   }}
    // >
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Applicant&apos;s First Name <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipApplicantFirstName" required className={inputClassName} />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Applicant&apos;s Last Name <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipApplicantLastName" required className={inputClassName} />
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Disorder/Diagnosis <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipDisorder" required className={inputClassName} />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Date of Birth <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipDob" type="date" required className={inputClassName} />
    //     </div>
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Street Address <span className="text-destructive">*</span>
    //     </label>
    //     <Input name="scholarshipStreetAddress" required className={inputClassName} />
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         City <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipCity" required className={inputClassName} />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         State <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipState" required className={inputClassName} />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Zip Code <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipZipCode" required className={inputClassName} />
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Phone Number <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipPhone" type="tel" required className={inputClassName} />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Applicant&apos;s Email Address <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipApplicantEmail" type="email" required className={inputClassName} />
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Parent/Guardian Name <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipParentGuardianName" required className={inputClassName} />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">
    //         Parent/Guardian Email Address <span className="text-destructive">*</span>
    //       </label>
    //       <Input name="scholarshipParentGuardianEmail" type="email" required className={inputClassName} />
    //     </div>
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">Name of Current High School</label>
    //     <Input name="scholarshipHighSchool" className={inputClassName} />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       List of Extracurricular Activities and/or Club Associations{" "}
    //       <span className="text-destructive">*</span>
    //     </label>
    //     <textarea
    //       name="scholarshipExtracurriculars"
    //       rows={3}
    //       required
    //       className={textareaClassName}
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       What are your career goals? <span className="text-destructive">*</span>
    //     </label>
    //     <textarea
    //       name="scholarshipCareerGoals"
    //       rows={3}
    //       required
    //       className={textareaClassName}
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Other Awards/Scholarships Received (include names and amounts){" "}
    //       <span className="text-destructive">*</span>
    //     </label>
    //     <textarea
    //       name="scholarshipOtherAwards"
    //       rows={3}
    //       required
    //       className={textareaClassName}
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       How did you hear about this scholarship?{" "}
    //       <span className="text-destructive">*</span>
    //     </label>
    //     <Input name="scholarshipHowDidYouHear" required className={inputClassName} />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       What school do you plan to attend? <span className="text-destructive">*</span>
    //     </label>
    //     <Input name="scholarshipPlannedSchool" required className={inputClassName} />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please upload documentation of an endocrine disorder{" "}
    //       <span className="text-destructive">*</span>
    //     </label>
    //     <input
    //       type="file"
    //       name="scholarshipDisorderDocumentation"
    //       required
    //       className={fileClassName}
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please upload proof of college acceptance{" "}
    //       <span className="text-destructive">*</span>
    //     </label>
    //     <input
    //       type="file"
    //       name="scholarshipCollegeAcceptance"
    //       required
    //       className={fileClassName}
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please upload your personal reference <span className="text-destructive">*</span>
    //     </label>
    //     <input
    //       type="file"
    //       name="scholarshipPersonalReference"
    //       required
    //       className={fileClassName}
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please upload your essay <span className="text-destructive">*</span>
    //     </label>
    //     <input type="file" name="scholarshipEssay" required className={fileClassName} />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please upload a recent photo of you <span className="text-destructive">*</span>
    //     </label>
    //     <input type="file" name="scholarshipPhoto" required className={fileClassName} />
    //   </div>
    //   <label className="flex items-start gap-2 cursor-pointer">
    //     <input
    //       type="checkbox"
    //       name="scholarshipAgreement"
    //       required
    //       checked={agreed}
    //       onChange={(e) => setAgreed(e.target.checked)}
    //       className="mt-1 rounded border-input"
    //     />
    //     <span className="text-sm">
    //       By submitting this application you agree to and acknowledge that all
    //       information provided with the application is accurate and true.
    //     </span>
    //   </label>
    //   <div className="pt-2">
    //     <Button type="submit" className="bg-primary" disabled={!agreed}>
    //       Submit
    //     </Button>
    //   </div>
    // </form>
    <a
      href="https://fs3.formsite.com/denoandrews/jwehgexapm/index
"
      target="_blank"
      rel="noopener noreferrer"
    >
      Fill Out Our Refer a Specialist Form
    </a>
  );
}

/** Get Support tab: three sections (College Scholarships, Find a Specialist, Refer a Specialist) with blue banners. */
function GetSupportTab({ content }: { content: any }) {
  const hasCollege =
    content?.collegeScholarshipsTitle ||
    content?.collegeScholarshipsContent ||
    true; // always show College Scholarships section (form + optional CMS content)
  const hasFind =
    content?.findASpecialistTitle || content?.findASpecialistContent || true; // always show Find a Specialist section (form + optional CMS content)
  const hasRefer =
    content?.referASpecialistTitle || content?.referASpecialistContent;
  if (!hasCollege && !hasFind && !hasRefer) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Content coming soon...
      </div>
    );
  }
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {hasCollege && (
        <AccordionItem
          value="college-scholarships"
          className="rounded-lg border border-border overflow-hidden"
        >
          <AccordionTrigger className={getSupportTriggerClassName}>
            {content.collegeScholarshipsTitle || "College Scholarships"}
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0 bg-card">
            <div className="prose prose-sm max-w-none space-y-4">
              {content.collegeScholarshipsContent ? (
                <ResourcesRichText
                  content={content.collegeScholarshipsContent}
                />
              ) : null}
              <CollegeScholarshipForm />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
      {hasFind && (
        <AccordionItem
          value="find-a-specialist"
          className="rounded-lg border border-border overflow-hidden"
        >
          <AccordionTrigger className={getSupportTriggerClassName}>
            {content.findASpecialistTitle || "Find a Specialist"}
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0 bg-card">
            <div className="prose prose-sm max-w-none space-y-4">
              {content.findASpecialistContent && (
                <ResourcesRichText content={content.findASpecialistContent} />
              )}
              {content.referSpecialistLinkUrl && (
                <p>
                  <Link
                    href={content.referSpecialistLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline font-medium"
                  >
                    {content.referSpecialistLinkText ||
                      "If you have a specialist you would like to refer to MAGIC, please click here."}
                  </Link>
                </p>
              )}
              <FindASpecialistForm />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
      {hasRefer && (
        <AccordionItem
          value="refer-a-specialist"
          className="rounded-lg border border-border overflow-hidden"
        >
          <AccordionTrigger className={getSupportTriggerClassName}>
            {content.referASpecialistTitle || "Refer a Specialist"}
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0 bg-card">
            <div className="prose prose-sm max-w-none space-y-4">
              {content.referASpecialistContent ? (
                <ResourcesRichText content={content.referASpecialistContent} />
              ) : null}
              <ReferASpecialistForm />
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}

/** Spread the Word tab: intro description + cards (image, title, description, button) matching homepage design. */
function SpreadTheWordTab({ content }: { content: any }) {
  const description = content?.description;
  const items = content?.items ?? [];
  const hasDescription = !!description;
  const hasItems = items.length > 0;
  if (!hasDescription && !hasItems) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Content coming soon...
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {hasDescription && (
        <div className="prose prose-sm max-w-none">
          <ResourcesRichText content={description} />
        </div>
      )}
      {hasItems && (
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 w-full">
          {items.map((item: any, index: number) => {
            const imageUrl = item.image ? getImageUrl(item.image) : null;
            const href = item.buttonLink || "#";
            return (
              <Card
                key={index}
                className="w-full max-w-[360px] overflow-hidden"
              >
                {imageUrl && (
                  <div className="relative w-full aspect-[360/265] bg-muted">
                    <Image
                      src={imageUrl}
                      alt={item.title || ""}
                      width={360}
                      height={265}
                      className="w-full h-auto object-cover"
                    />
                    {/* <Image
                      src={imageUrl}
                      alt={item.title || ""}
                      fill
                      className="object-cover"
                      sizes="360px"
                    /> */}
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{item.title || "Spread the Word"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description || ""}
                  </p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild size="lg" variant="outline">
                    <Link href={href}>{item.buttonLabel || "Learn More"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

const FIND_A_SPECIALIST_DISORDERS = [
  "Adult Growth Hormone Deficiency",
  "Congenital Adrenal Hyperplasia",
  "Cushing Syndrome",
  "Growth Hormone Deficiency",
  "Idiopathic Short Stature",
  "Insulin-like Growth Factor Deficiency",
  "Intrauterine Growth Restriction",
  "McCune-Albright Syndrome/Fibrous Dysplasia",
  "Optic Nerve Hypoplasia/Septo Optic Dysplasia",
  "Panhypopituitarism/Tumor",
  "Precocious Puberty",
  "Russell-Silver Syndrome",
  "Small for Gestational Age",
  "Temple Syndrome",
  "Thyroid Disorder",
  "Other (please list)",
] as const;

function FindASpecialistForm() {
  const [otherDisorder, setOtherDisorder] = React.useState("");
  return (
    // <form
    //   className="space-y-6 pt-6 border-t border-border"
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     // TODO: wire to API / server action
    //   }}
    // >
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">First name</label>
    //       <Input name="firstName" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Last name</label>
    //       <Input name="lastName" required />
    //     </div>
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">Street address</label>
    //     <Input name="streetAddress" required />
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">City</label>
    //       <Input name="city" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">State</label>
    //       <Input name="state" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Zip code</label>
    //       <Input name="zipCode" required />
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Phone number</label>
    //       <Input name="phone" type="tel" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Email</label>
    //       <Input name="email" type="email" required />
    //     </div>
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Are you looking for a pediatric or adult endocrinologist?
    //     </label>
    //     <select
    //       name="endocrinologistType"
    //       className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
    //       required
    //     >
    //       <option value="">Select...</option>
    //       <option value="pediatric">Pediatric</option>
    //       <option value="adult">Adult</option>
    //     </select>
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       What major cities are you willing to travel to?
    //     </label>
    //     <textarea
    //       name="citiesWillingToTravel"
    //       rows={2}
    //       className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
    //     />
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please list the disorder you or your child is seeking an
    //       endocrinologist to treat/evaluate
    //     </label>
    //     <textarea
    //       name="disorderDescription"
    //       rows={3}
    //       className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
    //     />
    //   </div>
    //   <div className="space-y-3">
    //     <span className="text-sm font-medium block">Disorder (select one)</span>
    //     <div className="space-y-2">
    //       {FIND_A_SPECIALIST_DISORDERS.map((value) => (
    //         <label
    //           key={value}
    //           className="flex items-center gap-2 cursor-pointer"
    //         >
    //           <input
    //             type="radio"
    //             name="disorder"
    //             value={value}
    //             className="rounded-full border-input"
    //           />
    //           <span className="text-sm">{value}</span>
    //         </label>
    //       ))}
    //       <div className="pl-6 pt-1">
    //         <Input
    //           placeholder="If Other, please list"
    //           className="max-w-md"
    //           value={otherDisorder}
    //           onChange={(e) => setOtherDisorder(e.target.value)}
    //           name="disorderOther"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="pt-2">
    //     <Button type="submit" className="bg-primary">
    //       Submit
    //     </Button>
    //   </div>
    // </form>
    <a
      href="https://fs3.formsite.com/denoandrews/c5e1grlrgc/index"
      target="_blank"
      rel="noopener noreferrer"
    >
      Fill Out Our Refer a Specialist Form
    </a>
  );
}

function ReferASpecialistForm() {
  const [otherDisorder, setOtherDisorder] = React.useState("");
  return (
    // <form
    //   className="space-y-6 pt-6 border-t border-border"
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     // TODO: wire to API / server action
    //   }}
    // >
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">First name</label>
    //       <Input name="referFirstName" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Last name</label>
    //       <Input name="referLastName" required />
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Email address</label>
    //       <Input name="referEmail" type="email" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label className="text-sm font-medium">Phone number</label>
    //       <Input name="referPhone" type="tel" required />
    //     </div>
    //   </div>
    //   <div className="space-y-2">
    //     <label className="text-sm font-medium">
    //       Please list the disorder you or your child is seeking an
    //       endocrinologist to treat/evaluate
    //     </label>
    //     <textarea
    //       name="referDisorderDescription"
    //       rows={3}
    //       className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
    //     />
    //   </div>
    //   <div className="space-y-3">
    //     <span className="text-sm font-medium block">Disorder (select one)</span>
    //     <div className="space-y-2">
    //       {FIND_A_SPECIALIST_DISORDERS.map((value) => (
    //         <label
    //           key={value}
    //           className="flex items-center gap-2 cursor-pointer"
    //         >
    //           <input
    //             type="radio"
    //             name="referDisorder"
    //             value={value}
    //             className="rounded-full border-input"
    //           />
    //           <span className="text-sm">{value}</span>
    //         </label>
    //       ))}
    //       <div className="pl-6 pt-1">
    //         <Input
    //           placeholder="If Other, please list"
    //           className="max-w-md"
    //           value={otherDisorder}
    //           onChange={(e) => setOtherDisorder(e.target.value)}
    //           name="referDisorderOther"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="pt-2">
    //     <Button type="submit" className="bg-primary">
    //       Submit
    //     </Button>
    //   </div>
    // </form>
    <a
      href="https://fs3.formsite.com/denoandrews/specialist/index"
      target="_blank"
      rel="noopener noreferrer"
    >
      Fill Out Our Refer a Specialist Form
    </a>
  );
}

/** Two accordion sections for parents and adults FB groups (Overview tab). */
function SocialMediaAccordions({ content }: { content: any }) {
  if (!content) return null;
  const parentsTitle =
    content.parentsSectionTitle ||
    "PARENTS of affected children, connect to our closed division specific FB groups through the links below:";
  const parentsGroups = content.parentsGroups ?? [];
  const adultsTitle =
    content.adultsSectionTitle ||
    "Affected Adults - connect to our closed division specific FB groups through the links below:";
  const adultsGroups = content.adultsGroups ?? [];
  if (parentsGroups.length === 0 && adultsGroups.length === 0) {
    return <p className="text-muted-foreground">No links added yet.</p>;
  }
  return (
    <Accordion type="single" collapsible className="w-full">
      {parentsGroups.length > 0 && (
        <AccordionItem value="parents">
          <AccordionTrigger className="text-left">
            {parentsTitle}
          </AccordionTrigger>
          <AccordionContent className="pl-4">
            <ul className="list-disc pl-6 space-y-2">
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
          </AccordionContent>
        </AccordionItem>
      )}
      {adultsGroups.length > 0 && (
        <AccordionItem value="adults">
          <AccordionTrigger className="text-left">
            {adultsTitle}
          </AccordionTrigger>
          <AccordionContent className="pl-4">
            <ul className="list-disc pl-6 space-y-2">
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
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
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
