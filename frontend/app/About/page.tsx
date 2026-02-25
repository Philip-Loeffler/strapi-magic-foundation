import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutContentRenderer } from "@/components/about/AboutContentRenderer";
import { PageContainer } from "@/components/layout/PageContainer";

function buildPopulateQuery(): string {
  const populate = [
    "overviewTab",
    "overviewTab.introParagraphs",
    "overviewTab.goalsForChildren",
    "overviewTab.goalsForChildren.goals",
    "overviewTab.goalsForAdults",
    "overviewTab.goalsForAdults.goals",
    "overviewTab.disclaimer",

    "overviewTab.heightMeasurementInstructions",
    "overviewTab.heightMeasurementInstructions.instructions",
    "overviewTab.testimonial",
    "historyTab",
    "historyTab.founders",
    "historyTab.founders.image",
    "historyTab.founders.profileBlocks",
    "historyTab.founders.profileBlocks.image",
    "historyTab.historySections",
    "teamStructureTab",
    "teamStructureTab.boardMembers",
    "teamStructureTab.boardMembers.image",
    "teamStructureTab.divisionConsultants",
    "teamStructureTab.divisionConsultants.consultants",
    "teamStructureTab.staffMembers",
    "teamStructureTab.staffMembers.image",
    "teamStructureTab.medicalAdvisoryBoard",
    "teamStructureTab.medicalAdvisoryBoard.image",
    "contactTab",
    "contactTab.phoneNumbers",
    "contactTab.contactFormSubjects",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getAboutData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildPopulateQuery();
    const res = await fetch(`${strapiUrl}/api/abouts?${populateQuery}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.data ?? data;
    // About is a collection type: use first entry or match by slug
    const list = Array.isArray(raw) ? raw : [raw];
    const about =
      list.find(
        (a: { attributes?: { slug?: string } }) =>
          a?.attributes?.slug === "about",
      ) ?? list[0];
    return about?.attributes ?? about ?? null;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  type AboutData = {
    overviewTab: any;
    historyTab: any;
    teamStructureTab: any;
    contactTab: any;
  };
  const aboutData = (await getAboutData()) as AboutData | null;

  const tabs = [
    { slug: "overview", title: "Overview" },
    { slug: "history", title: "History" },
    { slug: "team-structure", title: "Team Structure" },
    { slug: "contact-us", title: "Contact Us" },
  ];

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">
        About MAGIC Foundation
      </h1>
      <Tabs defaultValue="overview" className="w-full flex flex-col">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.slug}
                value={tab.slug}
                className="text-sm md:text-base"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="w-full mt-8">
            {aboutData?.overviewTab ? (
              <AboutContentRenderer content={aboutData.overviewTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content coming soon...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="w-full mt-8">
            {aboutData?.historyTab ? (
              <AboutContentRenderer content={aboutData.historyTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  History content coming soon...
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="team-structure" className="w-full mt-8">
            {aboutData?.teamStructureTab ? (
              <AboutContentRenderer content={aboutData.teamStructureTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Team structure content coming soon...
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact-us" className="w-full mt-8">
            {aboutData?.contactTab ? (
              <AboutContentRenderer content={aboutData.contactTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Contact information coming soon...
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
    </PageContainer>
  );
}
