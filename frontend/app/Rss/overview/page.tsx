import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RSSContentRenderer } from "@/components/rss/RSSContentRenderer";

const OVERVIEW_CONTENT_SECTIONS = [
  "whatIsRss",
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

function buildRSSPopulateQuery(): string {
  const populate: string[] = [
    "overviewTab",
    "overviewTab.heroSection",
    "overviewTab.heroSection.image",
    "overviewTab.faqSection",
    "overviewTab.faqSection.faqs",
  ];
  OVERVIEW_CONTENT_SECTIONS.forEach((section) => {
    populate.push(`overviewTab.${section}`);
    populate.push(`overviewTab.${section}.subsections`);
    populate.push(`overviewTab.${section}.subsections.listItems`);
  });
  populate.push(
    "personalStoriesTab",
    "personalStoriesTab.stories",
    "personalStoriesTab.stories.image",
    "resourcesTab",
    "resourcesTab.resourceCategories",
    "resourcesTab.resourceCategories.resources",
    "resourcesTab.resourceCategories.resources.file",
    "divisionLeadersTab",
    "divisionLeadersTab.leaders",
    "divisionLeadersTab.leaders.image",
  );

  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getRSSData() {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const populateQuery = buildRSSPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/russell-silver-syndromes?${populateQuery}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      console.error("Failed to fetch RSS data:", res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching RSS data:", error);
    return null;
  }
}

export default async function RSSOverviewPage() {
  const data = await getRSSData();
  console.log(data, "data");
  const rssData = data?.data?.[0];
  console.log(rssData, "rssData");

  const tabs = [
    { slug: "overview", title: "Overview" },
    { slug: "personal-stories", title: "Personal Stories" },
    { slug: "resources", title: "Resources" },
    { slug: "division-leaders", title: "Division Leaders" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-7xl mb-12">
          <h1 className="text-3xl font-bold">Russel Silver Syndrome</h1>
        </div>
        <Tabs defaultValue="overview" className="w-full max-w-7xl">
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
            {rssData?.overviewTab ? (
              <RSSContentRenderer content={rssData.overviewTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content coming soon...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="personal-stories" className="w-full mt-0">
            <div className="h-[50px] mb-8 bg-[#B0C3FF] p-[12px_24px] gap-[10px] rounded-[12px] font-bold">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Personal Stories
              </h2>
            </div>
            {rssData?.personalStoriesTab ? (
              <RSSContentRenderer content={rssData.personalStoriesTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Personal stories coming soon...
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="w-full mt-8">
            {rssData?.resourcesTab ? (
              <RSSContentRenderer content={rssData.resourcesTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Resources coming soon...
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="division-leaders" className="w-full mt-0">
            <div className="h-[50px] bg-[#B0C3FF] p-[12px_24px] gap-[10px] rounded-[12px] font-bold mb-8">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Division Leaders
              </h2>
            </div>
            {rssData?.divisionLeadersTab ? (
              <RSSContentRenderer content={rssData.divisionLeadersTab} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Division leaders coming soon...
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
