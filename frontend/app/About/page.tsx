import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutContentRenderer } from "@/components/about/AboutContentRenderer";

function buildAboutPopulateQuery(): string {
  const populate: string[] = [
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
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildAboutPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/abouts?${populateQuery}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      console.error("Failed to fetch About data:", res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching About data:", error);
    return null;
  }
}

export default async function AboutPage() {
  const data = await getAboutData();
  const aboutData = data?.data?.[0];

  const tabs = [
    { slug: "overview", title: "Overview" },
    { slug: "history", title: "History" },
    { slug: "team-structure", title: "Team Structure" },
    { slug: "contact-us", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-7xl mb-12">
          <h1 className="text-3xl font-bold text-center">About MAGIC Foundation</h1>
        </div>
        <Tabs defaultValue="overview" className="w-full max-w-7xl flex flex-col">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-4xl grid-cols-4 gap-2">
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
                <p className="text-muted-foreground">History content coming soon...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="team-structure" className="w-full mt-8">
            {aboutData?.teamStructureTab ? (
              <AboutContentRenderer content={aboutData.teamStructureTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Team structure content coming soon...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact-us" className="w-full mt-8">
            {aboutData?.contactTab ? (
              <AboutContentRenderer content={aboutData.contactTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Contact information coming soon...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
