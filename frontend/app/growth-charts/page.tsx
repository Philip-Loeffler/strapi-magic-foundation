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
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold">Growth Charts</h1>
        </div>
        {/* <GenericGrowthChartContentRenderer content={attrs} /> */}
      </div>
    </div>
  );
}
