import { ResourcesTabsClient } from "./ResourcesTabsClient";

function buildResourcesPopulateQuery(): string {
  const populate = [
    "overviewTab",
    "informationalVideosTab",
    "informationalVideosTab.videos",
    "informationalVideosTab.videos.thumbnail",
    "socialMediaTab",
    "socialMediaTab.parentsGroups",
    "socialMediaTab.adultsGroups",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getResourcesData() {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
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
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold">Resources</h1>
        </div>
        <ResourcesTabsClient data={data} />
      </div>
    </div>
  );
}
