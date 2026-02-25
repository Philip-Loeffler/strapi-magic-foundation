import { ResourcesTabsClient } from "./ResourcesTabsClient";
import { PageContainer } from "@/components/layout/PageContainer";

function buildResourcesPopulateQuery(): string {
  const populate = [
    "overviewTab",
    "informationalVideosTab",
    "informationalVideosTab.videos",
    "informationalVideosTab.videos.thumbnail",
    "socialMediaTab",
    "socialMediaTab.parentsGroups",
    "socialMediaTab.adultsGroups",
    "getSupportTab",
    "spreadTheWordTab",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getResourcesData() {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildResourcesPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/resources?${populateQuery}`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? data;
  } catch {
    return null;
  }
}

export default async function ResourcesPage() {
  const data = await getResourcesData();

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Resources</h1>
      <ResourcesTabsClient data={data} />
    </PageContainer>
  );
}
