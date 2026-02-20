import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisorderContentRenderer } from "@/components/disorder/DisorderContentRenderer";
import { RSSContentRenderer } from "@/components/rss/RSSContentRenderer";
import { SGAContentRenderer } from "@/components/sga/SGAContentRenderer";
import { TempleContentRenderer } from "@/components/temple/TempleContentRenderer";
import {
  getDisorderConfig,
  buildPopulateQueryForSlug,
  type DisorderRendererType,
} from "@/lib/disorders";

async function getDisorderData(apiPath: string, slug: string, type: DisorderRendererType) {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const populateQuery = buildPopulateQueryForSlug(slug, type);
    const res = await fetch(
      `${strapiUrl}/api/${apiPath}?${populateQuery}`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function ContentRenderer({
  type,
  content,
}: {
  type: DisorderRendererType;
  content: any;
}) {
  if (!content) return null;
  switch (type) {
    case "rss":
      return <RSSContentRenderer content={content} />;
    case "sga":
      return <SGAContentRenderer content={content} />;
    case "temple":
      return <TempleContentRenderer content={content} />;
    default:
      return <DisorderContentRenderer content={content} />;
  }
}

export default async function DisorderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getDisorderConfig(slug);
  if (!config) notFound();

  const data = await getDisorderData(config.apiPath, slug, config.type);
  const entry = data?.data?.[0];

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
          <h1 className="text-3xl font-bold">{config.title}</h1>
          {config.type === "temple" && (
            <p className="text-muted-foreground mt-2">
              A rare imprinting disorder involving chromosome 14 that affects
              growth, development, and puberty.
            </p>
          )}
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
            {entry?.overviewTab ? (
              <ContentRenderer type={config.type} content={entry.overviewTab} />
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
            {entry?.personalStoriesTab ? (
              <ContentRenderer
                type={config.type}
                content={entry.personalStoriesTab}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Personal stories coming soon...
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="w-full mt-8">
            {entry?.resourcesTab ? (
              <ContentRenderer
                type={config.type}
                content={entry.resourcesTab}
              />
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
            {entry?.divisionLeadersTab ? (
              <ContentRenderer
                type={config.type}
                content={entry.divisionLeadersTab}
              />
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
