import { GrowthChartContentRenderer } from "@/components/growth-chart/GrowthChartContentRenderer";

export default async function GrowthChartsPage() {
  // Static for deploy; restore API fetch when ready for dynamic data
  const growthChartData = null;

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
