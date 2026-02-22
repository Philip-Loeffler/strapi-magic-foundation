import { GrowthChartContentRenderer } from "@/components/growth-chart/GrowthChartContentRenderer";

function buildGrowthChartPopulateQuery(): string {
  const populate: string[] = [
    "introSection",
    "chartCategories",
    "chartCategories.charts",
    "chartCategories.charts.file",
    "instructionsSections",
    "instructionsSections.steps",
  ];

  return populate.map((p, i) => `populate[${i}]=${p}`).join("&");
}

async function getGrowthChartData() {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const populateQuery = buildGrowthChartPopulateQuery();
    const res = await fetch(`${strapiUrl}/api/growth-charts?${populateQuery}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(
        "Failed to fetch growth chart data:",
        res.status,
        res.statusText,
      );
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching growth chart data:", error);
    return null;
  }
}

export default async function GrowthChartsPage() {
  const data = await getGrowthChartData();
  const growthChartData = data?.data?.[0];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full max-w-7xl">
          {growthChartData ? (
            <GrowthChartContentRenderer content={growthChartData} />
          ) : (
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold mb-4">Growth Charts</h1>
              <p className="text-muted-foreground">Content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
