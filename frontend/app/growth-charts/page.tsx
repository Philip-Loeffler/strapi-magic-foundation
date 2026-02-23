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
      <div className="mx-auto max-w-4xl">
        {/* {attrs ? (
          <GenericGrowthChartContentRenderer content={attrs} />
        ) : ( */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Growth Charts</h1>
          <p className="text-muted-foreground">
            Content is managed in Strapi. Add a Generic Growth Charts entry to
            see content here.
          </p>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
