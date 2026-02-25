import { PageContainer } from "@/components/layout/PageContainer";

function buildPopulateQuery(): string {
  const populate = [
    "growthChartExampleImage",
    "generalGrowthChartsItems",
    "generalGrowthChartsItems.image",
    "otherSpecialtyChartsLinks",
    "rssSilverSyndromeChartsLinks",
    "rssSgaChartsLinks",
  ];
  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getGenericGrowthChartData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const populateQuery = buildPopulateQuery();
    const res = await fetch(
      `${strapiUrl}/api/generic-growth-chart?${populateQuery}`,
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

export default async function GrowthChartsPage() {
  const content = await getGenericGrowthChartData();
  const attrs = content?.attributes ?? content;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-left mb-8">Growth Charts</h1>
      {/* <GenericGrowthChartContentRenderer content={attrs} /> */}
    </PageContainer>
  );
}
