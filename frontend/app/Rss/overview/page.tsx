import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RSSContentRenderer } from "@/components/rss/RSSContentRenderer";

async function getRSSData() {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const res = await fetch(
      `${strapiUrl}/api/russell-silver-syndromes?populate[overviewTab][populate]=*&populate[personalStoriesTab][populate]=*&populate[resourcesTab][populate]=*&populate[divisionLeadersTab][populate]=*`,
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
    <div className="flex flex-col w-full items-center justify-center min-h-screen py-8 px-4">
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

        <TabsContent value="personal-stories" className="w-full mt-8">
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
              <p className="text-muted-foreground">Resources coming soon...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="division-leaders" className="w-full mt-8">
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
  );
}
